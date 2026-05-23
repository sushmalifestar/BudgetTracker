const sql = require('mssql');

const config = {
    user: 'budgetadmin',
    password: 'Budget@123',
    server: 'SUSHMA',
    database: 'BudgetTrackerDB',
    options: {
        trustServerCertificate: true
    }
};

module.exports = {
    sql,
    config
};