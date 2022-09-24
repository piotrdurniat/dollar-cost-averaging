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
    start_date = request.args["startDate"]
    end_date = request.args["endDate"]

    start_date = parse_iso(start_date)
    end_date = parse_iso(end_date)

    stock = yf.Ticker(ticker)
    hist = stock.history(start=start_date, interval="1d")
    hist = format_hist_data(hist)
    res_json = hist.to_json(orient="records", date_format="iso")

    return app.response_class(
        response=res_json, status=200, mimetype="application/json"
    )


@app.get("/dca-result")
def dca_result():
    ticker = request.args["ticker"]
    amount = request.args["amount"]
    start_date = parse_iso(request.args["startDate"])
    end_date = parse_iso(request.args["endDate"])
    interval = request.args["interval"]

    res = {
        "totalInvestmentValue": 100,
        "finalInvestmentValue": 200,
        "return": {"absolute": 100, "relative": 0.5},
        "annualizedReturn": {"absolute": 50, "relative": 0.25},
    }
    res_json = json.dumps(res)

    return app.response_class(
        response=res_json, status=200, mimetype="application/json"
    )


@app.get("/ping")
def ping():
    return "Pong."
