import os
from flask import Flask
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


@app.get("/")
def home():
    msft = yf.Ticker("MSFT")
    hist = msft.history(period="1mo")
    hist = format_hist_data(hist)
    res_json = hist.to_json(orient="table")

    response = app.response_class(
        response=res_json, status=200, mimetype="application/json"
    )
    return response


@app.get("/ping")
def ping():
    return "Pong."
