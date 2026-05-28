const { sql, config } = require('../config/db.config');

exports.getAllSavings=async(userId)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('userId', sql.Int, userId);
        const result = await request.query(`
            SELECT * FROM Savings
            WHERE userId = @userId
            ORDER BY createdAt DESC
        `);
        return result.recordset;
    }catch(err){
        console.error('Error fetching savings:', err);
        throw err;
    }
}

exports.addSavings=async(savingData)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        const { title, amount, savingsDate,userId } = savingData;
        request.input('title',sql.VarChar, title);
        request.input ('amount', sql.Int, amount);
        request.input('savingsDate', sql.Date, savingsDate);
        request.input('userId', sql.Int, userId);
        await request.query(`
            INSERT INTO Savings (title, amount, savingsDate, userId)
            VALUES (@title, @amount, @savingsDate, @userId)
        `);
    }catch(err){
        console.error('Error adding saving:', err);
        throw err;
    }
}

exports.updateSavings=async(id,userId,savingData)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        const {title,amount,savingsDate}=savingData;
        request.input('title',sql.VarChar, title);
        request.input('amount',sql.Int, amount);
        request.input('savingsDate', sql.Date, savingsDate);
        request.input('id',sql.Int,id);
        request.input('userId',sql.Int,userId);
        await request.query(
            `UPDATE Savings SET
            title=@title,
            amount=@amount,
            savingsDate=@savingsDate
            WHERE id =@id
            AND userId = @userId
            `)
    }catch(err){
        console.error('Error updating saving:', err);
        throw err;
    }
}

exports.deleteSavings=async(id,userId)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('id',sql.Int, id);
        request.input('userId', sql.Int, userId);
        await request.query(`
            DELETE FROM Savings WHERE id=@id AND userId =@userId
            `)
    }catch(err){
        console.error('Error deleting saving:', err);
        throw err;
    }
}