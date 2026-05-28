const { sql, config } = require('../config/db.config');

exports.getAllIncomes = async (userId) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('userId', sql.Int, userId);
        const result = await request.query(`
            SELECT * FROM Income
            WHERE userId = @userId
            ORDER BY createdAt DESC
        `);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching income:', err);
        throw err;
    }
};

exports.addIncome = async (incomeData) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        const { title, amount, incomeDate,userId } = incomeData;
        request.input('title',sql.VarChar, title);
        request.input ('amount', sql.Int, amount);
        request.input('incomeDate', sql.Date, incomeDate);
        request.input('userId', sql.Int, userId);
        await request.query(`
            INSERT INTO Income (title, amount, incomeDate,userId)
            VALUES (@title, @amount, @incomeDate, @userId)
        `);
    } catch (err) {
        console.error('Error adding income:', err);
        throw err;
    }
};

exports.updateIncome = async (id,userId, incomeData)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        const {title,amount,incomeDate}=incomeData;
        request.input('title',sql.VarChar, title);
        request.input('amount',sql.Int, amount);
        request.input('incomeDate', sql.Date, incomeDate);
        request.input('id',sql.Int,id);
        request.input('userId',sql.Int,userId);
        await request.query(
            `UPDATE Income SET
            title=@title,
            amount=@amount,
            incomeDate=@incomeDate
            WHERE id =@id
            AND userId = @userId
            `)
    }catch(err){
        console.log('Error updating the income', err)
        throw err;
    }
}

exports.deleteIncome=async (id, userId)=>{
    try{
        
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('id',sql.Int, id);
        request.input('userId', sql.Int, userId);
        await request.query(`
            DELETE FROM Income WHERE id= @id AND userId = @userId
            `)
    }catch(err){
        console.log('Error deleting Income',err)
        throw(err);
    }
}