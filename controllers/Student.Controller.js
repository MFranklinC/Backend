import {getStudents} from '../models/StudentModel.js';

export const getAllStudents = async (req, res) => {
    try {
        const students =  await getStudents();
        res.status(200).json(book);
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Internal Server Error' });
    }
};