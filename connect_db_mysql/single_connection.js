
import mysql from "mysql2";

const conn = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "handloom",
  database : "node_db"
})

conn.query("SELECT * from employee" , (err,res)=> {
  if(err) {throw err}
  console.log(res)
});

conn.query(`SELECT * from employee Where name = ? LIMIT 1` , ["Munna"] , (err,res)=> {
  if(err) {throw err}
  console.log(res);
})
