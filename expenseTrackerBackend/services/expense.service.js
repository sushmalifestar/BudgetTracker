const { sql, config } = require('../config/db.config');

exports.getAllExpenses=async(userId)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('userId', sql.Int, userId);
        const result = await request.query(`
            SELECT * FROM Expenses
            WHERE userId = @userId
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
        const pool = await sql.connect(config);
        const request = pool.request();
        const { title, amount, expenseDate,userId } = expenseData;
        request.input('title', sql.VarChar, title);
        request.input('amount', sql.Decimal(10,2), amount);
        request.input('expenseDate', sql.Date, expenseDate);
        request.input('userId', sql.Int, userId);
        await request.query(`
            INSERT INTO Expenses (title, amount, expenseDate,userId)
            VALUES (@title, @amount, @expenseDate, @userId)
        `);
    }catch(err){
        console.error('Error adding expense:', err);
        throw err;
    }
}

exports.updateExpense=async(id, userId, expenseData)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        const {title,amount,expenseDate}=expenseData;
        request.input('title',sql.VarChar, title);
        request.input ('amount', sql.Decimal(10,2), amount);
        request.input ('expenseDate', sql.Date, expenseDate);
        request.input('id', sql.Int, id);
        request.input('userId', sql.Int, userId);
        await request.query(
            `UPDATE Expenses SET
            title=@title,
            amount=@amount,
            expenseDate=@expenseDate
            WHERE id =@id
            AND userId = @userId
            `)
    }catch(err){
        console.error('Error updating expense:', err);
        throw err;
    }
}

exports.deleteExpense=async(id, userId)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input ('id',sql.Int, id);
        request.input('userId',sql.Int, userId);
        await request.query(`
            DELETE FROM Expenses
            WHERE id = @id
            AND userId = @userId
            `)
    }catch(err){
        console.error('Error deleting expense:', err);
        throw err;
    }
}