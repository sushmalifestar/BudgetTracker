const { sql, config } = require('./config/db.config');

async function testConnection() {

    try {

        await sql.connect(config);

        console.log('MSSQL Connected Successfully');

    } catch (err) {

        console.error('Database Connection Failed');
        console.error(err);

    }

}

testConnection();