const { sql, config } = require('../config/db.config');

exports.getAllSavings=async(userId)=>{
    try{
        await sql.connect(config);
        const result = await sql.query(`
            SELECT * FROM Savings
            WHERE userId = ${userId}
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
        await sql.connect(config);
        const { title, amount, savingsDate,userId } = savingData;
        await sql.query(`
            INSERT INTO Savings (title, amount, savingsDate, userId)
            VALUES (
                '${title}',
                ${amount},
                '${savingsDate}',
                ${userId}
            )
        `);
    }catch(err){
        console.error('Error adding saving:', err);
        throw err;
    }
}

exports.updateSavings=async(id,userId,savingData)=>{
    try{
        await sql.connect(config);
        const {title,amount,savingsDate}=savingData;
        await sql.query(
            `UPDATE Savings SET
            title='${title}',
            amount=${amount},
            savingsDate='${savingsDate}'
            WHERE id ='${id}'
            AND userId = ${userId}
            `)
    }catch(err){
        console.error('Error updating saving:', err);
        throw err;
    }
}

exports.deleteSavings=async(id,userId)=>{
    try{
        await sql.connect(config);
        await sql.query(`
            DELETE FROM Savings WHERE id= ${id} AND userId = ${userId}
            `)
    }catch(err){
        console.error('Error deleting saving:', err);
        throw err;
    }
}