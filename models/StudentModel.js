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

export const insertStudent = async (name, age, grade, status) => {
    const [result] = await pool.query(
        "INSERT INTO studentsdb(name, age, grade, status) VALUES(?, ?, ?, ?)",
        [name, age, grade, status]
    );
    return result.insertId; 
}

export const updateStudent = async (name, age, grade, status, studentId) => {
    const [result] = await pool.query(
        "UPDATE studentsdb SET name=?, age=?, grade=?, status=? WHERE id=?",
        [name, age, grade, status, studentId]
    );
    return result.affectedRows; d
}

export const deleteStudent = async (studentId) => {
    const [result] = await pool.query(
        "DELETE FROM studentsdb WHERE id=?", [studentId]
    );
    return result.affectedRows; 
}

export const fetchAllStudentsFromDB = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM studentsdb"); 
    return result; 
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching students from the database");
  }
};

