const db = require('../config');

const Transaction = {
    getAll: (callback) => {
        const query = 'SELECT * FROM transactions';
        db.query(query, callback);
    },
    create: (data, callback) => {
        const query = 'INSERT INTO transactions SET ?';
        db.query(query, data, callback);
    },
};

module.exports = Transaction;
