    const mysql = require('mysql2');

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'handloom',
    //   database: 'nodejs_db'
    });

    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return;
      }
      console.log('Connected to MySQL database!');

      connection.query("CREATE DATABASE IF NOT EXISTS node_db" , (err,res)=> {
        if(err) {throw err}
        console.log("created database named node_db");

      });

    //   end ....
    });


function getAllData(table_name){
    
}
