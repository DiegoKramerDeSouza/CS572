const isWeekend = _ => {
    const todayDate = new Date();
    const day = todayDate.getDay();
    const weekdays = [
        "weekend",
        "weekday",
        "weekday",
        "weekday",
        "weekday",
        "weekday",
        "weekend"
    ]
    return weekdays[day];
}

console.log(isWeekend());