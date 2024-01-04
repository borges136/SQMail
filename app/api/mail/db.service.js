const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'viaduct.proxy.rlwy.net',
    port: 22757,
    user: 'root',
    password: '44dEgf2FBd34H3af5HgDGFAfa-C1ah6e',
    database: 'railway',
    // insecureAuth: true
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
            if (error) {
                console.error('SQL query error:', error.message);
                reject(error);
            } else {
                console.log('SQL query results:', results);
                resolve(results);
            }
            // if (error) reject(error)
            // else resolve(results)
        })
    })
}

// connection.end()
module.exports = {
    runSQL
}