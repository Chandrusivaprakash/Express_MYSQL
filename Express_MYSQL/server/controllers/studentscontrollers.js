const mysql=require("mysql")

//MySql
const con=mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'Chandru'
})

//Show all Records
exports.view=(req,res)=>{

    con.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          return;
        }else{
            console.log('DB connected')
        }
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(! err){
                // console.log("No err"+rows)
                res.render("home", { rows: rows });
            }else{
                console.log("Error : "+err)
            }
        })
    });

}

//------------------after click Add user button open adduser page-------------------
exports.adduser=(req,res)=>{
    res.render("adduser")
}

//after click Add New User in form (This is post method)
exports.addedsave=(req,res)=>{

    con.getConnection((err, connection) => {
        
        const{name,age,city}=req.body

        connection.query("insert into users (NAME,AGE,CITY) values (?,?,?)"
            ,[name,age,city]
            ,(err,rows)=>{
            connection.release();
            if(! err){
                // console.log("No err"+rows)
                res.redirect("/");
                
            }else{
                console.log("Error : "+err)
            }
        })
    });
    // res.render("adduser")
}

//--------------after click Edit button open adduser page and load particular id records in value ---------------
exports.edituser=(req,res)=>{

    con.getConnection((err, connection) => {
        let id=req.params.id
        connection.query("select * from users where id=?",
            [id],
            (err,rows)=>{
            connection.release();
            if(! err){
                res.render("edituser", { rows: rows });
            }
        })
    });
}

//After click update button (This is post method)
exports.editeduser=(req,res)=>{
    con.getConnection((err, connection) => {
        
        const{name,age,city}=req.body
        let editedid=req.params.id

        connection.query("update users set NAME=?,AGE=?,CITY=? where ID=?"
            ,[name,age,city,editedid]
            ,(err,rows)=>{
            connection.release();
            if(!err){
                console.log(rows);
                res.redirect("/");
            }
        })
    });
}

//----------After Click Delete button Delete user---------------
exports.Deleteuser=(req,res)=>{
    
    con.getConnection((err, connection) => {
        let deletededid=req.params.id
        connection.query("delete from users where id=?",
            [deletededid],
            (err,rows)=>{
            connection.release();
            if(! err){
                res.redirect("/");
            }
        })
    });
    
}