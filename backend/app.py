from datetime import datetime
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


@app.get("/price-history")
def price_history():
    ticker = request.args["ticker"]
    startDate = request.args["startDate"]
    endDate = request.args["endDate"]

    startDate = datetime.fromisoformat(startDate.replace("Z", "+00:00"))
    endDate = datetime.fromisoformat(endDate.replace("Z", "+00:00"))

    stock = yf.Ticker(ticker)
    hist = stock.history(start=startDate, interval="1d")
    hist = format_hist_data(hist)
    res_json = hist.to_json(orient="records", date_format="iso")

    return app.response_class(
        response=res_json, status=200, mimetype="application/json"
    )


@app.get("/ping")
def ping():
    return "Pong."
