import pool from '../config/db.js';

export const getAllBooks = async() => {
    const [rows] = await pool.query('SELECT * FROM librarydb');
    return rows;
}

export const insertBook = async (title, genre, Status) => {
    const [result] = await pool.query(
        "INSERT INTO librarydb(title, genre, Status) VALUES(?, ?, ?)",
        [title, genre, Status]
    );
    return result.insertId;
}

export const updateBook = async (title, genre, Status, bookId) => {
    const [result] = await pool.query (
        "UPDATE librarydb SET title=?, genre=?, Status=? WHERE id=?",
        [title, genre, Status, bookId]
    );
    return result.affectedRows;
}

export const deleteBook = async (bookId) => {
    const [result] = await pool.query(
        "DELETE FROM librarydb WHERE id= ?", [bookId]
    );
    return result.affectedRows;
}