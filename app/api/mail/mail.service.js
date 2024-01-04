import DBService from './db.service.js'

const loggedInUser = {
	email: 'dore@sqmail.com',
	fullName: 'Dore Babaji',
}

async function query(criteria={}) {
    const txt = criteria.txt || '';
    const folder = criteria.folder || '';
    const sortBy = criteria.sortBy || '';
    // const sortDir = criteria.sortDir === -1 ? 'DESC' : 'ASC';

    let sortDir  // asking explicitly to control incoming query
    if (criteria.sortDir === -1) sortDir = 'DESC'
    if (criteria.sortDir === 1) sortDir = 'ASC'

    const values = [`%${txt}%`,`%${txt}%`,`%${txt}%`,`%${txt}%`];

    let filterClause = '';
    let sortByClause = '';

    switch (folder) {
        case 'inbox':
            filterClause = `AND is_draft = false AND removed_at IS NULL AND to_user = '${loggedInUser.email}'`;
            break;
        case 'sent':
            filterClause = `AND is_draft = false AND removed_at IS NULL AND from_user = '${loggedInUser.email}'`;
            break;
        case 'trash':
            filterClause = 'AND removed_at IS NOT NULL';
            break;
        case 'draft':
            filterClause = 'AND is_draft = true';
            break;
        case 'starred':
            filterClause = `AND is_draft = false AND removed_at IS NULL AND is_starred = true`;
            break;
        // Add more cases if needed for other status values
        default:
            break;
    }

    switch (sortBy) {
        case 'date':
            sortByClause = `ORDER BY sent_at ${sortDir}`;
            break;
        case 'starred':
            sortByClause = `ORDER BY is_starred ${sortDir}`;
            break;
        case 'read':
            sortByClause = `ORDER BY is_read ${sortDir}`;
            break;
        case 'subject':
            sortByClause = `ORDER BY subject ${sortDir}`;
            break;
        // Add more cases if needed for other sortBy values
        default:
            break;
    }
    const query = `SELECT * FROM mail  
                 WHERE 
                mail.subject LIKE ? OR
                 mail.from_user LIKE ? OR
                 mail.to_user LIKE ? OR
                 mail.body LIKE ?
                 ${filterClause}
                 ${sortByClause}`
    return DBService.runSQL(query,values)
}

async function getById(mailId) {
    const query = `SELECT * FROM mail WHERE mail.id = ?`
    const values = [mailId]
    const mails = await DBService.runSQL(query,values)
    console.log("🚀 ~ file: mail.service.js:76 ~ getById ~ mails:", mails)
    if (mails.length === 1) return mails[0]
    throw new Error(`mail id ${mailId} not found`)
}


async function add(values) {
    const sqlCmd = `INSERT INTO mail (subject, body, sent_at, from_user, to_user, is_read, is_starred, removed_at, is_draft) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
                // VALUES ("${mail.subject}",
                //         "${mail.body}",
                //         "${mail.sentAt}",
                //         "${mail.from}",
                //         "${mail.to}",
                //         "${mail.isRead}",
                //         "${mail.isStarred}",
                //         "${mail.removedAt}",
                //         "${mail.isDraft}")`
    console.log('inside mail service add');
    return await DBService.runSQL(sqlCmd,values)
}


async function update(values) {
    
    const query = `UPDATE mail set subject = ?,
                                body = ?,
                                sent_at = ?,
                                from_user = ?,
                                to_user = ?,
                                is_read = ?,
                                is_starred = ?,
                                removed_at = ?,
                                is_draft = ?
                    WHERE mail.id = ?`

    const okPacket = await DBService.runSQL(query,values)
    if (okPacket.affectedRows !== 0) return okPacket
    throw new Error(`No bug updated - bug id ${bug._id}`)
}


function remove(mailId) {
    var query = `DELETE FROM mail WHERE mail.id = ?`
    const values = [mailId]
    return DBService.runSQL(query,values)
            .then(okPacket => okPacket.affectedRows === 1
                ? okPacket
                : Promise.reject(new Error(`No mail deleted - mail id ${mailId}`)))
}


// module.exports = {
//     query,
//     getById,
//     add,
//     update,
//     remove
// }

export const mailService = {
    query,
    getById,
    add,
    update,
    remove
}