import {getStudents} from '../models/StudentModel.js';
import * as StudentModels from "../models/StudentModel.js";
import { fetchAllStudentsFromDB } from "../models/StudentModel.js"; 

export const getAllStudents = async (req, res) => {
    try {
        const students =  await getStudents();
        res.status(200).json(book);
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const createStudent = async (req, res) => {
    const { name, srcode, course } = req.body;
    console.log(`Received student data: ${name}, ${srcode}, ${course}`);
    try {
        const studentId = await StudentModels.insertStudent(name, srcode, course);
        res.status(200).json({ success: true, message: `Student created with ID: ${studentId}` });
    } catch (error) {
        console.error('Error in createStudent:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const fetchAllStudents = async (req, res) => {
  try {
    const students = await fetchAllStudentsFromDB(); 
    res.status(200).json({ success: true, students });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const insertStudent = async (name, srcode, course) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO students (name, srcode, course) VALUES (?, ?, ?)",
            [name, srcode, course]
        );
        return result.insertId;
    } catch (error) {
        throw new Error("Error inserting student: " + error.message);
    }
};


export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    
    const deletedId = await deleteStudentFromDB(studentId);
    if (deletedId === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, message: `Student with ID ${studentId} deleted` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const editStudent = async (req, res) => {
  const { name, age, grade, status } = req.body;
  const { studentId } = req.params; 
  try {
    const updatedId = await updateStudentInDB(studentId, name, age, grade, status);
    
    if (updatedId === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    
    res.status(200).json({ success: true, message: `Student with ID ${studentId} updated` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};