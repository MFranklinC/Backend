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

export const createBook = async (req, res) => {
  const {title, genre, Status} = req.body
  try{
    const bookId = await BookModels.insertBook(title, genre, Status);
    res.status(200).json({success : true, message : bookId});
  }catch(e){
    console.log(e);
    resizeTo.status(500).json({sucess : false, message : "Internal Server Error"});
  }
}

export const editBook = async (req, res) => {
  const  {title, genre, status} = req.body;
  const {bookId} = req.params;

  try{
    const updatedId = await BookModels.updateBook(title, genre, status, bookId);
    res.status(200).json({sucess: true, message: updatedId});
  }catch(e){
    console.log(e);
    res.status(500).json({success: false, message: "Internal Server Error"})
  }
}

export const deleteBook = async (req, res) => {
  const {bookId} = req.params;
  try{
    const deletedId = await BookModels.deleteBook(bookId);
    res.status(200).json({sucess: true, message: deletedId});
  }catch(e){
    console.log(e);
    res.status(500).json({success: false, message: "Internal Server Error"})
  } 
}