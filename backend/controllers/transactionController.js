const Transaction = require('../models/transactionModel');

exports.getAllTransactions = (req, res) => {
    Transaction.getAll((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

exports.createTransaction = (req, res) => {
    const newTransaction = req.body;
    Transaction.create(newTransaction, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id: result.insertId, ...newTransaction });
        }
    });
};
