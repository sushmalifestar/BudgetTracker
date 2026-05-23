const { sql, config } = require('../config/db.config');

exports.getAllExpenses=async()=>{
    try{
        await sql.connect(config);
        const result = await sql.query(`
            SELECT * FROM Expenses
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
        const { title, amount, expenseDate } = expenseData;
        await sql.query(`
            INSERT INTO Expenses (title, amount, expenseDate)
            VALUES (
                '${title}',
                ${amount},
                '${expenseDate}'
            )
        `);
    }catch(err){
        console.error('Error adding expense:', err);
        throw err;
    }
}

exports.updateExpense=async(id, expenseData)=>{
    try{
        await sql.connect(config);
        const {title,amount,expenseDate}=expenseData;
        await sql.query(
            `UPDATE Expenses SET
            title='${title}',
            amount=${amount},
            expenseDate='${expenseDate}'
            WHERE id ='${id}'
            `)
    }catch(err){
        console.error('Error updating expense:', err);
        throw err;
    }
}

exports.deleteExpense=async(id)=>{
    try{
        await sql.connect(config);
        await sql.query(`
            DELETE FROM Expenses WHERE id= ${id}
            `)
    }catch(err){
        console.error('Error deleting expense:', err);
        throw err;
    }
}