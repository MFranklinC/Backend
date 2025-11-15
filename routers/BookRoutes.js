import { Router } from "express";
import { deleteBook, createBook, fetchAllBooks, editBook } from "../controllers/BookControllers.js";
const bookRoutes = Router();

bookRoutes.get('/all', fetchAllBooks);
bookRoutes.post('/new', createBook);
bookRoutes.put('/edit/:bookId', editBook);
bookRoutes.delete('/delete/:bookId', deleteBook);

export default bookRoutes;