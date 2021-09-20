export function riskLevelCaseDensity(num){
    let number = Math.round(num)
    
    if(number < 1) return "#00d474";
    if(number > 1 && number < 10) return "#ffc900";
    if(number > 10 && number < 25) return "#ff9600";
    if(number > 25 && number < 75) return "#d9002c";
    if(number > 75) return  "#790019";
}

export function riskLevelInfectionRate(num){
    let number = num;

    if(number < 0.9) return '#00d474';
    if(number > 0.9 && number < 1.1) return "#ffc900";
    if(number > 1.1 && number < 1.4) return "#ff9600";
    if(number > 1.4) return "#790019";
}

export function riskLevelPositiveRate(num) {
    let number = Math.round(num * 100);
    console.log(number)
    if(number < 3) return '#00d474';
    if(number > 3 && number < 10) return "#ffc900";
    if(number > 10 && number < 20) return "#ff9600";
    if(number > 20) return "#790019";
}