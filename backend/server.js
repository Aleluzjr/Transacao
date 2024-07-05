const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '253926373',
  database: 'caixa_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.post('/api/transactions', (req, res) => {
  const { type, amount, description } = req.body;
  const query = 'INSERT INTO transactions (type, amount, description) VALUES (?, ?, ?)';
  db.query(query, [type, amount, description], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/api/transactions', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const countQuery = 'SELECT COUNT(*) as totalCount FROM transactions';
  db.query(countQuery, (err, countResult) => {
    if (err) throw err;
    const query = `SELECT * FROM transactions LIMIT ${limit} OFFSET ${offset}`;
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json({
        transactions: results,
        totalCount: countResult[0].totalCount
      });
    });
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
