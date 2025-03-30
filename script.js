document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('statsForm');
   
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const numbersInput = document.getElementById('numbers');
        const numbers = parseInput(numbersInput.value);
       
        if (numbers.length > 0) {
            calculateStats(numbers);
        } else {
            alert('Please enter valid numbers separated by commas.');
        }
    });
});

function parseInput(input) {
    return input
        .split(',')
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num));
}

function calculateStats(numbers) {
    const mean = calculateMean(numbers);
    const median = calculateMedian(numbers);
    const mode = calculateMode(numbers);
    const range = calculateRange(numbers);
    const variance = calculateVariance(numbers, mean);
    const standardDeviation = Math.sqrt(variance);

    updateResults({
        mean,
        median,
        mode,
        range,
        variance,
        standardDeviation
    });
}

function calculateMean(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

function calculateMedian(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    return sorted.length % 2 === 0
        ? (sorted[middle - 1] + sorted[middle]) / 2
        : sorted[middle];
}

function calculateMode(numbers) {
    const frequencyMap = numbers.reduce((map, num) => {
        map[num] = (map[num] || 0) + 1;
        return map;
    }, {});

    const maxFrequency = Math.max(...Object.values(frequencyMap));
    const modes = Object.keys(frequencyMap)
        .filter(num => frequencyMap[num] === maxFrequency)
        .map(Number);

    return modes.length === numbers.length ? 'No mode' : modes.join(', ');
}

function calculateRange(numbers) {
    return Math.max(...numbers) - Math.min(...numbers);
}

function calculateVariance(numbers, mean) {
    return numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
}

function updateResults({
    mean,
    median,
    mode,
    range,
    variance,
    standardDeviation
}) {
    document.getElementById('mean').textContent = mean.toFixed(2);
    document.getElementById('median').textContent = median.toFixed(2);
    document.getElementById('mode').textContent = mode;
    document.getElementById('range').textContent = range.toFixed(2);
    document.getElementById('variance').textContent = variance.toFixed(2);
    document.getElementById('standardDeviation').textContent = standardDeviation.toFixed(2);
}