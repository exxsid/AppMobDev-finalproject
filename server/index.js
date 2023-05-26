const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pos",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to database");
});

app.use(express.json());

app.get("/products", (req, res) => {
  const query = "CALL GetProducts()";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/searchByName/:name", (req, res) => {
  const prodName = req.params.name;
  const query = `CALL SearchProductByName("${prodName}")`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.put("/addToCart", (req, res) => {
  const prodId = req.body.id;
  const prodQuantity = req.body.quantity;

  const query = `CALL AddToCart(${prodId}, ${prodQuantity})`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows == 0) {
      res.send({
        status: 0,
      });
    }
    res.send({
      status: 1,
    });
  });
});

app.put("/removeToCart", (req, res) => {
  const prodId = req.body.id;
  const prodQuantity = req.body.quantity;

  const query = `CALL RemoveToCart(${prodId}, ${prodQuantity})`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows == 0) {
      res.send({
        status: 0,
      });
    }
    res.send({
      status: 1,
    });
  });
});

app.post("/saveTransaction", (req, res) => {
  const ttlAmount = req.body.totalAmount;
  const data = req.body.data;

  const query = `CALL SaveTransaction(${ttlAmount}, "${data}")`;

  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Server is ready");
});
