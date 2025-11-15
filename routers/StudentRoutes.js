import { Router } from "express";
import { deleteStudent, fetchAllStudents, createStudent, editStudent } from "../controllers/Student.Controller.js";
const studentRoutes = Router();


studentRoutes.get('/all', fetchAllStudents);  // Correct usage
studentRoutes.post('/new', createStudent);
studentRoutes.put('/edit/:studentId', editStudent);
studentRoutes.delete('/delete/:studentId', deleteStudent);

export default studentRoutes;
