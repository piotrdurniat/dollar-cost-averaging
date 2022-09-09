import os
from flask import Flask, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": os.environ["FRONTEND_URL"]}})


def format_hist_data(hist_data):
    hist_data.index.name = "time"
    hist_data.rename(
        columns={
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
    ticker = request.args.get("ticker")

    stock = yf.Ticker(ticker)
    hist = stock.history(period="1mo")
    hist = format_hist_data(hist)
    res_json = hist.to_json(orient="table")

    return app.response_class(
        response=res_json, status=200, mimetype="application/json"
    )


@app.get("/ping")
def ping():
    return "Pong."
