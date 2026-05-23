const { sql, config } = require('../config/db.config');

exports.getAllIncomes = async () => {
    try {
        await sql.connect(config);
        const result = await sql.query(`
            SELECT * FROM Income
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
        const { title, amount, incomeDate } = incomeData;
        await sql.query(`
            INSERT INTO Income (title, amount, incomeDate)
            VALUES (
                '${title}',
                ${amount},
                '${incomeDate}'
            )
        `);
    } catch (err) {
        console.error('Error adding income:', err);
        throw err;
    }
};

exports.updateIncome = async (id, incomeData)=>{
    try{
        await sql.connect(config);
        const {title,amount,incomeDate}=incomeData;
        await sql.query(
            `UPDATE Income SET
            title='${title}',
            amount=${amount},
            incomeDate='${incomeDate}'
            WHERE id ='${id}'
            `)
    }catch(err){
        console.log('Error updating the income', err)
        throw err;
    }
}

exports.deleteIncome=async (id)=>{
    try{
        await sql.connect(config);
        await sql.query(`
            DELETE FROM Income WHERE id= ${id}
            `)
    }catch(err){
        console.log('Error deleting Income',err)
        throw(err);
    }
}