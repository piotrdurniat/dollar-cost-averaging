from flask import Flask
import yfinance as yf

app = Flask(__name__)


@app.get("/")
def home():
    # get stock info
    msft = yf.Ticker("MSFT")
    print(msft)
    return "hello there."


@app.get("/ping")
def ping():
    return "Pong."


# get historical market data
# hist = msft.history(period="1mo")
# print(hist)
