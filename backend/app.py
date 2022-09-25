from datetime import datetime
import json
import os
from flask import Flask, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": os.environ["FRONTEND_URL"]}})


def format_hist_data(hist_data):
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
    return hist_data


def parse_iso(iso_date: str) -> datetime:
    return datetime.fromisoformat(iso_date.replace("Z", "+00:00"))


@app.get("/price-history")
def price_history():
    ticker = request.args["ticker"]
    start_date = parse_iso(request.args["startDate"])
    end_date = parse_iso(request.args["endDate"])

    stock = yf.Ticker(ticker)
    hist = stock.history(start=start_date, interval="1d")
    hist = format_hist_data(hist)
    res_json = hist.to_json(orient="records", date_format="iso")

    return res_json, 200, {"Content-Type": "application/json"}


@app.get("/dca-result")
def dca_result():
    ticker = request.args["ticker"]
    amount = request.args["amount"]
    start_date = parse_iso(request.args["startDate"])
    end_date = parse_iso(request.args["endDate"])
    interval = int(request.args["interval"])

    date_diff = end_date - start_date
    date_diff_ms = date_diff.total_seconds() * 1000

    investment_count = date_diff_ms / interval

    stock = yf.Ticker(ticker)
    hist = stock.history(start=start_date, interval="1d")

    # TODO: sum of dividends
    res = {
        "totalInvestmentValue": 100,
        "finalInvestmentValue": 200,
        "numberOfInvestments": 12,
        "numberOfShares": 11.98,
        "return": {"absolute": 100, "relative": 0.5},
        "annualizedReturn": {"absolute": 50, "relative": 0.25},
    }

    res_json = json.dumps(res)

    return res_json, 200, {"Content-Type": "application/json"}


@app.get("/ping")
def ping():
    return "Pong."
