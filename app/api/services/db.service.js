const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

connection.connect(err => {
    console.log('attempt connect');
    if (err) {
        console.error('MySQL connection error: ',err.message)
        throw new Error('mySql failed connection')
    }
    console.log('connected to SQL server')
})

function runSQL(sqlCommand,values) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, values,(error, results) => {
            if (error) reject(error)
            else resolve(results)
        })
    })
}

// connection.end()
module.exports = {
    runSQL
}