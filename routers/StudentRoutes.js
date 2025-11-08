import { Router } from 'express';

import { getAllStudents } from '../controllers/Student.Controller.js';

const router = Router();

router.get('/all    ', getAllStudents);

export default router;