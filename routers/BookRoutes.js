import * as BookController from '../controllers/BookControllers.js';
import express from 'express';

const bookRoutes = express.Router();

bookRoutes.get('/all', BookController.fetchAllBooks);

export default bookRoutes;