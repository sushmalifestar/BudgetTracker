const { sql, config } = require('../config/db.config');

exports.getAllIncomes = async (userId) => {
    try {
        await sql.connect(config);
        const result = await sql.query(`
            SELECT * FROM Income
            WHERE userId = ${userId}
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
        await sql.connect(config);
        const { title, amount, incomeDate,userId } = incomeData;
        await sql.query(`
            INSERT INTO Income (title, amount, incomeDate,userId)
            VALUES (
                '${title}',
                ${amount},
                '${incomeDate}',
                ${userId}
            )
        `);
    } catch (err) {
        console.error('Error adding income:', err);
        throw err;
    }
};

exports.updateIncome = async (id,userId, incomeData)=>{
    try{
        await sql.connect(config);
        const {title,amount,incomeDate}=incomeData;
        await sql.query(
            `UPDATE Income SET
            title='${title}',
            amount=${amount},
            incomeDate='${incomeDate}'
            WHERE id ='${id}'
            AND userId = ${userId}
            `)
    }catch(err){
        console.log('Error updating the income', err)
        throw err;
    }
}

exports.deleteIncome=async (id, userId)=>{
    try{
        await sql.connect(config);
        await sql.query(`
            DELETE FROM Income WHERE id= ${id} AND userId = ${userId}
            `)
    }catch(err){
        console.log('Error deleting Income',err)
        throw(err);
    }
}