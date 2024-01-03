const DBService = require('./db.service')


function query(criteria={}) {
    const namePart = criteria.name || ''
    const query = `SELECT * FROM bug  
                 WHERE bug.name LIKE '%${namePart}%' OR
                 bug.description LIKE '%${namePart}%'`

    return DBService.runSQL(query)
}

async function getById(bugId) {
    const query = `SELECT * FROM bug WHERE bug._id = ${bugId}`

    const bugs = await DBService.runSQL(query)
    if (bugs.length === 1) return bugs[0]
    throw new Error(`bug id ${bugId} not found`)
}


function add(bug) {
    const sqlCmd = `INSERT INTO bug (name, description, severity, creator) 
                VALUES ("${bug.name}",
                        "${bug.description}",
                        "${bug.severity}",
                        "${bug.creator}")`
    
    return DBService.runSQL(sqlCmd)
}


async function update(bug) {
    const query = `UPDATE bug set name = "${bug.name}",
                                description = "${bug.description}",
                                severity = ${bug.severity}
                    WHERE bug._id = ${bug._id}`

    const okPacket = await DBService.runSQL(query)
    if (okPacket.affectedRows !== 0) return okPacket
    throw new Error(`No bug updated - bug id ${bug._id}`)
}


function remove(bugId) {
    var query = `DELETE FROM bug WHERE bug._id = ${bugId}`

    return DBService.runSQL(query)
            .then(okPacket => okPacket.affectedRows === 1
                ? okPacket
                : Promise.reject(new Error(`No bug deleted - bug id ${bugId}`)))
}


module.exports = {
    query,
    getById,
    add,
    update,
    remove
}