const linkedIn = require('./link');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const crypto = require('crypto');

// Define the path for the CSV file
const CSV_FILE_PATH = path.join(__dirname, 'job_postings.csv');
const PROCESSED_JOBS_PATH = path.join(__dirname, 'processed_jobs.json');

// Initialize the CSV writer
const csvWriter = createCsvWriter({
  path: CSV_FILE_PATH,
  header: [
    { id: 'position', title: 'Position' },
    { id: 'company', title: 'Company' },
    { id: 'location', title: 'Location' },
    { id: 'date', title: 'Date' },
    { id: 'jobUrl', title: 'Job URL' }
  ],
  append: true // Append to the file if it exists
});

const queryOptions = {
  keyword: 'software engineer',
  location: 'Bangalore',
  dateSincePosted: '1hr',
  jobType: 'full time',
  limit: '100'
};

// Load processed jobs from file or initialize an empty set
let processedJobs = new Set();
if (fs.existsSync(PROCESSED_JOBS_PATH)) {
  const data = fs.readFileSync(PROCESSED_JOBS_PATH);
  processedJobs = new Set(JSON.parse(data));
}

// Function to save processed jobs set to file
function saveProcessedJobs() {
  fs.writeFileSync(PROCESSED_JOBS_PATH, JSON.stringify(Array.from(processedJobs)));
}

// Create a unique identifier for a job
function createJobIdentifier(job) {
  const dataToHash = `${job.position.toLowerCase().trim()}-${job.company.toLowerCase().trim()}-${job.location.toLowerCase().trim()}-${job.date.trim()}`;
  return crypto.createHash('sha256').update(dataToHash).digest('hex');
}


async function writeJobsToCsv(jobs) {
  try {
    await csvWriter.writeRecords(jobs);
    console.log('Jobs successfully written to CSV.');
  } catch (err) {
    console.error('Error writing to CSV:', err);
  }
}

function pollJobs() {
  linkedIn.query(queryOptions).then(async response => {
    const newJobs = response?.filter(job => {
      const jobIdentifier = createJobIdentifier(job);
      return !processedJobs.has(jobIdentifier);
    });
    if (newJobs?.length > 0) {
      // Add new jobs to the set of processed jobs
      console.log("Found new jobs")
      newJobs.forEach(job => {
        const jobIdentifier = createJobIdentifier(job);
        processedJobs.add(jobIdentifier);
      });

      saveProcessedJobs();

      // Write new jobs to the CSV file
      await writeJobsToCsv(newJobs);
    }
  }).catch(error => {
    console.error('Error fetching jobs:', error);
  });
}

// Poll every 15 minutes (900000 milliseconds)
setInterval(pollJobs, 10000);

// Initial call to pollJobs
pollJobs();
