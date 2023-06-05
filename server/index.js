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
    res.json(result);
  });
});

app.get("/products/:offset", (req, res) => {
  const offset = parseInt(req.params.offset);
  const query = `CALL GetProductsPerPage(${offset})`;
  db.query(query, (error, result) => {
    if (error) throw error;
    const prev = offset == 1 ? 0 : offset - 1;
    const next = result[0].length < 10 ? 0 : offset + 1;
    res.send({
      prev: prev,
      next: next,
      data: result[0],
    });
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

app.get("/searchById/:id", (req, res) => {
  const id = req.params.id;

  const query = `CALL SearchProductById(${id})`;

  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
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

  db.beginTransaction((err) => {
    if (err) throw err;

    // insert in totalAmount in transaction table
    const totalAmountQuery = `INSERT INTO transactions(total_amount) VALUES (${ttlAmount})`;
    db.query(totalAmountQuery, (error, result) => {
      if (error) {
        return db.rollback(() => {
          throw error;
        });
      }

      const latestId = result.insertId;

      data.forEach((d) => {
        // query to subtract the quantity to order quantity
        const subtractQuantityQuery = `CALL AddToCart(${d.id}, ${d.quantity})`;
        db.query(subtractQuantityQuery, (error, result) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          // insert all the products in cart to transaction_details table
          const transactionDetailsQuery = `INSERT INTO transaction_details(transaction_id, product_id, quantity, amount)
            VALUES (${latestId}, ${d.id}, ${d.quantity}, ${d.amount})`;

          db.query(transactionDetailsQuery, (error, results) => {
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  throw err;
                });
              }
              res.send({ status: 1 });
            });
          });
        });
      }); // end foreach
    });
  }); // end transaction
});

app.listen(3000, () => {
  console.log("Server is ready");
});
