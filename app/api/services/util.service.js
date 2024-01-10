import { addMonths, format }  from 'date-fns';

function getRandomDateWithinMonths(m){
    const today = new Date();
    const monthsAgo = addMonths(today, -m);
    const randomMilliseconds = Math.random() * (today - monthsAgo);
    const randomDate = new Date(today - randomMilliseconds);
    return format(randomDate, 'yyyy-MM-dd HH:mm:ss');
}

function getCurrDate(){
    const currDate = new Date();
    return format(currDate, 'yyyy-MM-dd HH:mm:ss');
}

export const utilService = {
    getCurrDate,
    getRandomDateWithinMonths
}