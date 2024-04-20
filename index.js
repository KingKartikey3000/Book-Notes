import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookNotes",
  password: "H3ll#*23",
  port: 5432,
});
db.connect();

let books = [
    { id: 1, bookname: "Harry Potter and the Philosophers Stone", bookauthor: "J.K. Rowling", readyear:"2023"},
];
let notes = [
    {id: 1, bookname: "Harry Potter and the Philosophers Stone", points: "sfsfrsgfew", rating: "5"},
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const result = await db.query("SELECT book.id, book.readyear, book.bookname, book.bookauthor, notes.rating, notes.points FROM book JOIN notes ON book.bookname = notes.bookname ORDER BY id ASC")
    let books=[];
    result.rows.forEach((book) =>{
        books.push(book);
    });
    res.render("index.ejs",{bookList:books});
});

app.post("/addbook", (req,res)=>{
    res.render("addbook.ejs");
});


app.post("/new", async (req,res)=>{
    const bookname = req.body["bookname"];
    console.log(bookname);
    const bookauthor = req.body["bookauthor"];
    console.log(bookauthor);
    const readyear = req.body["readyear"];
    console.log(readyear);
    
    const points = req.body["notes"];
    console.log(points);
    const rating = req.body["rating"];
    console.log(rating);

    try{
        await db.query("INSERT INTO book(bookname, bookauthor, readyear) VALUES($1,$2,$3)",[bookname,bookauthor,readyear])
    }catch(err){
        console.log(err);
    }

    try{
        await db.query("INSERT INTO notes(bookname, points, rating) VALUES($1,$2,$3)",[bookname,points,rating])
    }catch(err){
        console.log(err);
    }

    res.redirect("/");
});


app.post("/updatebook", async (req,res)=>{
    const bookname = req.body["bookname"]
    const result = await db.query("SELECT book.id, book.bookname, book.bookauthor, notes.rating, notes.points FROM book JOIN notes ON book.bookname = notes.bookname WHERE LOWER(book.bookname) LIKE '%' || $1 || '%'; ",
    [bookname.toLowerCase()]);
    let books=[];
    // let notes=[];
    result.rows.forEach((book) =>{
        books.push(book);
    });
    res.render("updatebook.ejs",{bookList:books});
});

app.post("/update", async (req, res)=>{
    const book_id = req.body.updatedItemId;
    const new_points = req.body.updatedItemTitle
    console.log(new_points);
    console.log(book_id);
    try {
        await db.query("UPDATE notes SET points = ($1) WHERE id = $2 ;",[new_points,book_id]);
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");

});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });