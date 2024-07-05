const {Books}=require('../mongo/mongoSchema.js')

const { buildSchema } = require("graphql");



const schema = buildSchema(`
    type Status {
      status: String
      message: String
    }
   type authorBookInfo{
      bookId:Int
      bookTitle:String
      publishedYear:Int
   }
    type Book {
          bookId:Int
          bookTitle:String
          authorId:Int
          authorName:String
          publishedYear:Int
    }
    type Author{
      authorId:Int
      authorName:String
      books:[authorBookInfo]
  }
  
    type Query {
          fetchAllBooks:[Book]
          fetchBookById(bookId:Int):Book
          fetchAllAuthors:[Author]
          fetchAuthorById(authorId:Int):Author
    }
  
      type Mutation{
          addBook(bookId:Int, bookTitle:String, authorId:Int,authorName:String, publishedYear:Int):Status
          updateBook(bookId:Int, bookTitle:String, authorId:Int,authorName:String, publishedYear:Int):Status
          deleteBook(bookId:Int):Status
         }
  `);



const root = {
    fetchAllAuthors: () => {
      try {
        const allAuthors=Books.aggregate( [
          {
            $group: {
              _id: { authorId: "$authorId", authorName: "$authorName" },
              books: {
                $push: {
                  bookId: "$bookId",
                  bookTitle: "$bookTitle",
                  publishedYear: "$publishedYear"
                }
              }
            }
          },
          {
            $project: {
              _id: 0,
              authorId: "$_id.authorId",
              authorName: "$_id.authorName",
              books: 1
            }
          }
        ])
        // console.log(allAuthors)
        return allAuthors;
      } catch (error) {
        console.log(error);
       throw new Error('unauthorised')
      }
      // return allAuthors;
    },
    fetchAuthorById: async({ authorId }) => {
     try {
       const author=await Books.aggregate([
        {
          $match: { authorId: authorId }
        },
        {
          $group: {
            _id: { authorId: "$authorId", authorName: "$authorName" },
            books: {
              $push: {
                bookId: "$bookId",
                bookTitle: "$bookTitle",
                publishedYear: "$publishedYear"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            authorId: "$_id.authorId",
            authorName: "$_id.authorName",
            books: 1
          }
        }
      ])
      // console.log(author[0])
      return author[0];
     } catch (error) {
      console.log(error)
      throw new Error('unauthorised')
     }
    },
  
    fetchAllBooks:async () => {
      try {
           const booksList=await Books.find({})
          //  console.log(booksList)
           return booksList;
      } catch (error) {
        console.log(error);
        throw new Error('unauthorised')
      }
     
    },
    fetchBookById: async({ bookId }) => {
      try {
        const book=await Books.findOne({ bookId: bookId})
        return book;
      } catch (error) {
        console.log(error)
        throw new Error('unauthorised')
      }
    },
    addBook: async ({ bookId, bookTitle, authorId, authorName, publishedYear }) => {
    try {
     //check whether book exists in DB or not
     let existingBook=await Books.findOne({bookId:bookId});
     if(existingBook){
      return {status:'Failure',message:'Book already exists'}
     }
     //save it in DB
      let nBook={
        bookId:bookId,
        bookTitle:bookTitle,
        authorId:authorId,
        authorName:authorName,
        publishedYear:publishedYear
      }
  
      let newBook= new Books(nBook)
      await newBook.save();
      return {status:'success',message:`Book saved successfully with Id ${bookId}`}
     
    } catch (error) {
      console.log(error)
      return {status:'Failure',message:'Error saving book with Id ${bookId}'}
    }
    },
    updateBook: async({ bookId, bookTitle, authorId, authorName, publishedYear }) => {
      try {
        // console.log(typeof bookId,typeof bookTitle,typeof authorId,typeof authorName,typeof publishedYear)
         //check whether book exists in DB or not
     let existingBook=await Books.findOne({bookId:bookId});
     if(!existingBook){
      return {status:'Failure',message:'Book Doesnot  exists In DB'}
     }
     //update it in DB
      let nBook={
        bookId:bookId,
        bookTitle:bookTitle,
        authorId:authorId,
        authorName:authorName,
        publishedYear:publishedYear
      }
      // console.log(nBook)
      await Books.updateOne({bookId:bookId}, nBook)
      return {status:'success',message:`Book updated successfully with Id ${bookId}`}
      } catch (error) {
        console.log(error)
        return {status:'Failure',message:`Error saving book with Id ${bookId}`}
      }
    },
  
    deleteBook: async({ bookId }) => {
      try {
        let existingBook=await Books.find({bookId: bookId});
        if(!existingBook){
          return {status:'Failure',message:'Book Doesnot  exists In DB'}
        }
        await Books.deleteOne({bookId:bookId})
        return {status:'success',message:`Book deleted successfully with Id ${bookId}`}
      } catch (error) {
        console.log(error)
        return {status:'Failure',message:`Error deleting book with Id ${bookId}`}
      }
    }
  
     
  };

  module.exports={root,schema};