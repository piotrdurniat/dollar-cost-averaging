from datetime import datetime, timedelta
from pandas.core.frame import DataFrame
from flask import Flask, request
from flask_cors import CORS
from pandas._libs.tslibs.timestamps import Timestamp
from flask_pymongo import PyMongo

import re
import yfinance as yf
import os
import logging


DB_NAME = os.environ["MONGO_INITDB_DATABASE"]
DB_USER = os.environ["DB_USERNAME"]
DB_PASS = os.environ["DB_PASSWORD"]
DB_HOST = os.environ["DB_HOST"]
DB_PORT = os.environ["DB_PORT"]
app = Flask(__name__)

app.config["MONGO_URI"] = f"mongodb://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

mongo = PyMongo(app)

cors = CORS(app, resources={r"/*": {"origins": os.environ["FRONTEND_URL"]}})

# Logger setup
logger = logging.getLogger("werkzeug")
handler = logging.FileHandler("backend.log")
logger.addHandler(handler)


def format_hist_data(hist_data: DataFrame):
    hist_data.reset_index(inplace=True)
    hist_data.rename(
        columns={
            "Date": "time",
            "Open": "open",
            "Close": "close",
            "Low": "low",
            "High": "high",
            "Volume": "volume",
            "Stock Splits": "stockSplits",
            "Dividends": "dividends",
        },
        inplace=True,
    )
    hist_data["time"] = hist_data["time"].map(
        lambda x: x.isoformat(timespec="milliseconds") + "Z"
    )
    hist_data_dict = hist_data.to_dict(orient="records")

    return hist_data_dict


def parse_iso(iso_date: str) -> datetime:
    return datetime.fromisoformat(iso_date.replace("Z", "+00:00"))


def get_financial_results(
    price_hist: DataFrame,
    amount: float,
    start_date: datetime,
    end_date: datetime,
    interval: timedelta,
):
    target_date = start_date

    number_of_investments = 0
    number_of_shares: float = 0
    total_investment_value: float = 0
    final_price: float = 0
    dividends: float = 0
    transactions = []

    for (index, row) in price_hist.iterrows():
        date: Timestamp = index  # type: ignore
        open_price: float = row["Open"].item()
        dividend: float = row["Dividends"].item()

        if dividend != 0 and number_of_shares != 0:
            dividends += dividend * number_of_shares

        if date.timestamp() >= target_date.timestamp():
            target_date += interval
            number_of_investments += 1
            number_of_shares_new = amount / open_price
            number_of_shares += number_of_shares_new
            total_investment_value += amount
            transactions.append(
                {
                    "time": date,
                    "numberOfShares": number_of_shares_new,
                }
            )

    final_price = price_hist["Close"].values[-1].item()

    final_investment_value = number_of_shares * final_price
    price_change = final_investment_value - total_investment_value

    return_absolute = price_change + dividends
    return_relative = return_absolute / total_investment_value

    date_diff_days = (end_date - start_date).days
    annualized_return = pow(1.0 + return_relative, 365 / date_diff_days) - 1.0
    annualized_return_abs = annualized_return * total_investment_value

    return {
        "totalInvestmentValue": total_investment_value,
        "finalInvestmentValue": final_investment_value,
        "numberOfInvestments": number_of_investments,
        "numberOfShares": number_of_shares,
        "priceChange": price_change,
        "dividends": dividends,
        "return": {
            "absolute": return_absolute,
            "relative": return_relative,
        },
        "annualizedReturn": {
            "absolute": annualized_return_abs,
            "relative": annualized_return,
        },
    }, transactions


@app.get("/price-history")
def price_history():
    ticker = request.args["ticker"]
    start_date = parse_iso(request.args["startDate"])
    end_date = parse_iso(request.args["endDate"])

    stock = yf.Ticker(ticker)

    hist = stock.history(start=start_date, end=end_date, interval="1d")
    hist_dict = format_hist_data(hist)

    return hist_dict, 200, {"Content-Type": "application/json"}


@app.get("/dca-results")
def dca_result():
    ticker = request.args["ticker"]
    amount = float(request.args["amount"])
    start_date = parse_iso(request.args["startDate"])
    end_date = parse_iso(request.args["endDate"])
    interval = timedelta(milliseconds=int(request.args["interval"]))

    stock = yf.Ticker(ticker)

    price_hist = stock.history(start=start_date, end=end_date, interval="1d")

    if price_hist.empty:
        return {}, 200

    financial_results, transactions = get_financial_results(
        price_hist, amount, start_date, end_date, interval
    )
    price_hist_dict = format_hist_data(price_hist)

    res = {
        "financialResults": financial_results,
        "priceHistory": price_hist_dict,
        "transactions": transactions,
    }

    return res, 200, {"Content-Type": "application/json"}


@app.get("/stocks")
def get_stocks():
    query = request.args["query"]
    limit = int(request.args["limit"])

    query_regex = re.compile(query, re.IGNORECASE)

    stocks = mongo.db.stocks.find(
        {
            "$or": [
                {"symbol": {"$regex": query_regex}},
                {"name": {"$regex": query_regex}},
            ]
        },
        {"_id": 0},
    ).limit(limit)

    return list(stocks)


@app.get("/ping")
def ping():
    return "Pong."
