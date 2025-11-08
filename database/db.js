import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    port: process.env.HOST,
    user: process.env.USER,
    password: "",
    database: process.env.DATA
});

export default pool;