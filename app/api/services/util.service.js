

function getRandomDateLastTwoMonths(){
    const today = new Date()
    const twoMonthsAgo = new Date(today)
    twoMonthsAgo.setMonth(today.getMonth() - 2)
    const randomMilliseconds = Math.random() * (today - twoMonthsAgo)
    const randomDate = new Date(today - randomMilliseconds)
    return randomDate.toISOString().slice(0, 19).replace("T", " ");
}

function getCurrDate(){
    const currDate = new Date();
    return currDate.toISOString().slice(0, 19).replace('T', ' ')
}

export const utilService = {
    getCurrDate,
    getRandomDateLastTwoMonths
}