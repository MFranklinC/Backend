import * as BookModels from "../models/BookModels.js";

export const fetchAllBooks = async (req, res) => {
  try {
    const books = await BookModels.getAllBooks();
    res.status(200).json({sucess: true, message: books});
  } catch(e) {
    console.log(e);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
    }
};