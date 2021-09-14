export function riskLevelCaseDensity(num){
    let number = Math.round(num)
    
    if(number < 1) return "#00d474";
    if(number > 1 && number < 10) return "#ffc900";
    if(number > 10 && number < 25) return "#ff9600";
    if(number > 25 && number < 75) return "#d9002c";
    if(number > 75) return  "#790019";
}