import express from "express"; 
import 'dotenv/config.js';
import bookRoutes from "./routers/BookRoutes.js";
import studentRoutes from "./routers/StudentRoutes.js";
import cors from "cors";
import pool from "./config/db.js"; 
const app = express();


let corsOptions = {
    origin: process.env.ORIGIN,
};

app.use(express.json());
app.use(cors(corsOptions));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.post('/create-database', async (req, res) => {
    try {
    
        const query = `CREATE DATABASE IF NOT EXISTS tblstudent`;
        await pool.query(query);
        res.status(200).json({ success: true, message: 'Database created or already exists.' });
    } catch (error) {
        console.error('Error creating database:', error);
        res.status(500).json({ success: false, message: 'Failed to create database.' });
    }
});

try {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
} catch (e) {
    console.log(e);
}

app.use('/books', bookRoutes);
app.use('/students', studentRoutes);
