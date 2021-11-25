
let minDataValue = Math.min(mostNegativeValue, options.suggestedMin);
let maxDataValue = Math.max(mostPositiveValue, options.suggestedMax);

let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Monthly water usage history',
            data: [7100, 7000, 6500, 7400, 7000, 6000, 6900, 7000, 7300, 7200, 7250, 7500]
        }],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    options: {
        scales: {
            y: {
                suggestedMin: 5000,
                suggestedMax: 8000
            }
        }
    }
});