export const utilService = {
	getRandomIntInclusive,
	saveToStorage,
	loadFromStorage,
	saveToStorage,
	debounce,
	validateMail,
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}

function debounce(func, timeout = 500) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

function validateMail(mail) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}
