const waitTime = 5000;
const waitInterval = 500;
let currentTime = 0;

const incTime = () => {
    // precentage of wait time
    currentTime += waitInterval;
    const p = Math.floor((currentTime / waitTime) * 100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`waiting ... ${p}\n`);
};

console.log(`setting a ${waitTime / 1000} second delay`);

const timerFinished = () => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("done");
    clearInterval(interval);
}

const interval = setInterval(incTime, waitInterval);
setTimeout(timerFinished, waitTime);