
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "handloom",
    database: "node_db"
})


async function getAllDate() {
    try {
        const [rows] = await pool.execute(`SELECT * FROM employee`, [])
        return rows;
    } catch (error) {
        console.log(error)
    }

}

// console.log( await getAllDate());

async function getEmployeeById(id) {
    try {
        const [rows] = await pool.execute(`SELECT * from employee where emp_id = ?`, [id])
        return rows[0]
    } catch (error) {
        console.log(error)
    }

}


async function insertData(obj) {
    try {
        const { name, role } = obj;
        const allData = await getAllDate()

        const [rows] = await pool.execute(`INSERT INTO employee(emp_id,name,role) VALUES(?,?,?)`, [Number(allData.length + 1), name, role])
        const createdRow = await getEmployeeById(rows.insertId);
        console.log(createdRow)

    } catch (error) {
        console.log(error)
    }
}

async function deleteData(id){
    try {
        const [rows] = await pool.execute(`DELETE FROM employee WHERE emp_id = ?` ,[id])
        if(rows.affectedRows){
            console.log("data deleted...")
        }

        
        
    } catch (error) {
        console.log(error)
    }
}

