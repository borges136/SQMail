import { httpService } from './http.service';

export const mailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getLoggedUser,
	getFilterFromParams,
	toggleSelectedRead,
	getUnreadCount,
	toggleSelectedArchive,
}

const loggedInUser = {
	email: 'dore.zahavy@sqmail.com',
  fullName: 'Dore Babaji',
}

async function query(criteria) {
	return await httpService.get('mail' , criteria)
}

function get(mailId) {
	return httpService.get(`mail/${mailId}`)
}

async function getUnreadCount() {
	const mails = await storageService.query(MAIL_KEY)
	return mails.filter(mail => !mail.isRead).length
}

function remove(mailId) {
	return httpService.delete(`mail/${mailId}`)
}

function save(mail) {
	if (mail.id) {
		return httpService.put(`mail/${mail.id}`, mail)
	} else {
		mail.from = getLoggedUser().email
		return httpService.post('mail', mail)
	}
}

async function toggleSelectedArchive(selectedMailsIds) {
	try {
		const mails = await query()
		const mailsToSave = mails.map(m => {
			if (!selectedMailsIds.includes(m.id)) return m
			return {
				...m,
				removedAt: (m.removedAt) ? null : Date.now()
			}
		})
		return storageService.updateAll(MAIL_KEY, mailsToSave)
	} catch (err) {
		console.log('Had issues updating many');
	}
}

async function toggleSelectedRead(selectedMailsIds, isRead) {
	try {
		const mails = await query()
		const mailsToSave = mails.map(m => {
			if (!selectedMailsIds.includes(m.id)) return m
			return {
				...m,
				isRead
			}
		})
		return storageService.updateAll(MAIL_KEY, mailsToSave)
	} catch (err) {
		console.log('Had issues updating many');
	}
}

function getEmptyMail(
	subject = '',
	body = '',
	sentAt = null,
	from = '',
	to = '',
	isRead = 0,
	isStarred = 0,
	isTrash = 0,
	isDraft = 1
) {
	return {  subject, body, sentAt, from, to, isRead, isStarred, isTrash,isDraft }
}

function getFilterFromParams(searchParams) {
	const filterBy = {
		txt: searchParams.get('txt') || '',	
	}	
	return filterBy
}

function getLoggedUser() {
	return loggedInUser
}
