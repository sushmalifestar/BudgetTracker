const { sql, config } = require('../config/db.config');

exports.getAllExpenses=async(userId)=>{
    try{
        await sql.connect(config);
        const result = await sql.query(`
            SELECT * FROM Expenses
            WHERE userId = ${userId}
            ORDER BY createdAt DESC
        `);
        return result.recordset;
    }catch(err){
        console.error('Error fetching expenses:', err);
        throw err;
    }
}

exports.addExpense=async(expenseData)=>{
    try{
        await sql.connect(config);
        const { title, amount, expenseDate,userId } = expenseData;
        await sql.query(`
            INSERT INTO Expenses (title, amount, expenseDate,userId)
            VALUES (
                '${title}',
                ${amount},
                '${expenseDate}',
                ${userId}
            )
        `);
    }catch(err){
        console.error('Error adding expense:', err);
        throw err;
    }
}

exports.updateExpense=async(id, userId, expenseData)=>{
    try{
        await sql.connect(config);
        const {title,amount,expenseDate}=expenseData;
        await sql.query(
            `UPDATE Expenses SET
            title='${title}',
            amount=${amount},
            expenseDate='${expenseDate}'
            WHERE id =${id}
            AND userId = ${userId}
            `)
    }catch(err){
        console.error('Error updating expense:', err);
        throw err;
    }
}

exports.deleteExpense=async(id, userId)=>{
    try{
        await sql.connect(config);
        await sql.query(`
            DELETE FROM Expenses
            WHERE id = ${id}
            AND userId = ${userId}
            `)
    }catch(err){
        console.error('Error deleting expense:', err);
        throw err;
    }
}