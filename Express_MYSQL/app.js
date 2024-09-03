const express=require("express")
const exphbs=require("express-handlebars")
const bodyPaser=require("body-parser")
const mysql=require("mysql")
require("dotenv").config()

//----------------------------------------------------------

const app=express();

app.use(bodyPaser.urlencoded({extended:false}))
app.use(bodyPaser.json())

//Static Files for CSS
app.use(express.static("public"))

//Template Engine
const handlebars=exphbs.create({extname:".hbs"})
app.engine("hbs",handlebars.engine)
app.set("view engine","hbs")

//MySql
// const con=mysql.createConnection({
//     connectionLimit:10,
//     host: 'localhost',
//     user: 'root',
//     password: '1234', 
//     database: 'Chandru'
// })

// //Create DataBase Connect
//     con.connect((err, connection) => {
//         if (err) {
//           console.error('Error connecting to the database:', err);
//           return;
//         }else{
//             console.log('DB connected')
//         }
//     });

// // Router
// app.get("/",(req,res)=>{
//    res.render("home")
// })

const routes=require("./server/routers/students")
app.use("/",routes)

app.listen(3007, () => {
    console.log('Server is running on port 3000');
  });