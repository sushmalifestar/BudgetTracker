const bcrypt = require('bcrypt');
const sql = require('mssql');
const { config } = require('../config/db.config');
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
    try {
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const pool = await sql.connect(config);
        const existingUser = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(`
            SELECT * FROM Users
            WHERE email = @email
        `);

        if (existingUser.recordset.length > 0) {
            throw new Error('Email already exists');
        }
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('passwordHash', sql.NVarChar, hashedPassword)
            .query(`
                INSERT INTO Users (name, email, passwordHash)
                VALUES (@name, @email, @passwordHash)
            `);
        return {
            message: 'User registered successfully'
        };

    } catch (err) {
        console.log(err);
        throw err;
    }
};

const loginUser = async (usersData) => {
    try {
        const { email, password } = usersData;
        const pool = await sql.connect(config)
        const userResult = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(`
        SELECT * FROM Users
        WHERE email = @email
        `)
        if (userResult.recordset.length === 0) {
            throw new Error('Invalid email or password');
        }
        const user = userResult.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign(
            {
                userId: user.userId,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        return {
            message: 'Login successful',
            token
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    registerUser,
    loginUser
};