db.createUser({
  user: process.env.DB_USERNAME,
  pwd: process.env.DB_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

db.createCollection("stocks");

// Allow text search over the 'name' and 'symbol' fields:
db.stocks.createIndex({ name: "text", symbol: "text" });
