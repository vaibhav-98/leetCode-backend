const submissionQueue = require('./src/queues/submissionQueue');

async function clearQueue() {
    await submissionQueue.drain();   // removes waiting jobs
    await submissionQueue.clean(0, 0, 'completed');
    await submissionQueue.clean(0, 0, 'failed');

    console.log("✅ Queue cleared");
    process.exit(0);
}

clearQueue();