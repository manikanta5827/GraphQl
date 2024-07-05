GraphQl API_Project_Documentation


##Project Overview
This project is a GraphQL-based API for managing books and authors, built with NodeJs and MongoDB and GraphQl. 
The API allows you to fetch, add, update, and delete books and authors.


##Technologies Used
NodeJs 
ExpressJs
GraphQL
MongoDB
Mongoose


##SetUp Instructions
Prerequisites
NodeJs (version 14 or higher)
MongoDB ( MongoDB Atlas)


##Installation
 Clone the repository
 Navigate to the Project directory
 git clone https://github.com/manikanta5827/GraphQl.git

1. cd <project>
2. Install dependencies
   npm install
3. Create a .env file in the root directory and add the following environment variables:
    MONGOURL="mongodb+srv://Manikanta:HPzxabIvsq5N6oLT@manikanta.6qkifax.mongodb.net/GraphQl?retryWrites=true&w=majority&appName=Manikanta"
    PORT=8080
4.start the server
   npm start
5. Running the Application
The server will start on the port specified in the .env file.

Access the GraphQL Playground at http://localhost:8080/graphql .
Access the Swagger documentation at http://localhost:8080/api-docs .


##API Documentation

Use Thunderbolt Extension/ Postman / cUR test GraphQl APIʼs

Tool : cURL | replace Query> with actual Query

   curl --location 'http://localhost:8080/graphql' \
--header 'Content-Type: application/json' \
--data '{
          "query": " <Query> "
        }'
        
##To fetch all books
URL  http://localhost:8080/graphql Tool  POSTMAN
query {
  fetchAllBooks {
    bookId
    bookTitle
    authorId
    authorName
    publishedYear
} }
Response:
{
"data": {
        "fetchAllBooks": [
            {
                "bookId": 871,
                "bookTitle": "C#",
                "authorId": 167,
                "authorName": "Sri Sri",
                "publishedYear": 2031
}, {
"bookId": 1613,
"bookTitle": "Bagavat",
                "authorId": 346,
                "authorName": "K K",
                "publishedYear": 2031
} ]
} }

##To fetch Books by ID
URL  http://localhost:8080/graphql Tool  POSTMAN
query {
  fetchBookById(bookId: 1) {
    bookId
    bookTitle
    authorId
    authorName
    publishedYear
}
Response:
{
"data": {
    "fetchBookById": {
      "bookId": 167,
      "bookTitle": "Kalki",
      "authorId": 346,
      "authorName": "K K",
      "publishedYear": 2031
}
}
}

## To Fetch all Authors
URL  http://localhost:8080/graphql Tool  POSTMAN
query {
  fetchAllAuthors{
    authorId
    authorName
    books{
       bookId
       bookTitle
       publishedYear
} }
}
Response:
{
"data": {
    "fetchAllAuthors": [
      {
        "authorId": 167,
        "authorName": "Sri Sri",
        "books": [
          {
            "bookId": 530,
            "bookTitle": "java",
                        "publishedYear": 2031
          }
] },
      {
        "authorId": 346,
        "authorName": "K K",
        "books": [
          {
            "bookId": 167,
            "bookTitle": "Kalki",
            "publishedYear": 2031
}, {
            "bookId": 1613,
            "bookTitle": "Bagavat",
            "publishedYear": 2031
} ]
} ]
} }

##Fetch authors by ID
URL  http://localhost:8080/graphql Tool  POSTMAN
query {
  fetchAuthorById(authorId:167){
authorId
   authorName
    books
    {
      bookId
      bookTitle
      publishedYear
} }
}
Response :
{
"data": {
    "fetchAuthorById": {
      "authorId": 167,
      "authorName": "Sri Sri",
      "books": [
        {
          "bookId": 871,
          "bookTitle": "C#",
          "publishedYear": 2031
}, {
          "bookId": 532,
          "bookTitle": "Python",
          "publishedYear": 2031
} ]
} }
}

## Add a new Book
URL  http://localhost:8080/graphql Tool  POSTMAN
Query :
mutation{
  addBook(bookId:342,bookTitle:"NodeJS",authorId:321,authorNa
me:"Stephen",publishedYear:1999){
    status
message }
}

Response :
{
"data": {
    "addBook": {
      "status": "success",
      "message": "Book saved successfully with Id 342"
} }
}

## Update Details of a Book
URL  http://localhost:8080/graphql Tool  POSTMAN

mutation{
updateBook(bookId:342,bookTitle:"TsS",authorId:321,authorNam
e:"Stephen",publishedYear:1999){
status
message }
}
Response :
{
"data": {
    "updateBook": {
      "status": "success",
      "message": "Book updated successfully with Id 342"
} }
}

## Delete a Book
URL  http://localhost:8080/graphql Tool  POSTMAN
Query :
mutation{
  deleteBook(bookId:342){
status
message }
}
Response :
{
"data": {
    "deleteBook": {
          "status": "success",
      "message": "Book deleted successfully with Id 342"
    }
} }




##Database Schema
   ##Books Collection
{
  "bookId": Number,
  "bookTitle": String,
  "authorId": Number,
  "authorName": String,
  "publishedYear": Number
}





###Author
Manikanta Thummuri 8309497947 postbox5827@gmail.com
