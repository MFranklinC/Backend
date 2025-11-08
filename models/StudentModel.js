import pool from '../config/db.js';

export const getStudents = async() => {
    try{
        const [row] = await pool.query('SELECT * FROM tblstudent');
        return row;
    }catch(error){
        console.log(error);
        throw error;
    }
}