
Certainly! Here's a `README.md` file summarizing the LinkedIn job scraper project, with a mention of its dependency on the [linkedin-jobs-api](https://github.com/VishwaGauravIn/linkedin-jobs-api).

---

# LinkedIn Job Scraper

This project is a LinkedIn job scraper that periodically polls for job postings matching specified criteria and stores them in a local CSV file. The scraper prevents duplicate entries by generating a unique identifier for each job and tracking processed jobs across sessions. It is built on top of the [linkedin-jobs-api](https://github.com/VishwaGauravIn/linkedin-jobs-api) library.

## Features

- **Fetch Job Postings**: Retrieves job postings from LinkedIn based on customizable query parameters such as keyword, location, job type, and date since posted.
- **Store in CSV**: Writes job details, including position, company, location, date, and job URL, to a local CSV file.
- **Prevent Duplicates**: Utilizes a unique identifier for each job to ensure that duplicate entries are not added to the CSV.
- **Persistent Tracking**: Tracks processed jobs across script restarts using a local JSON file.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Usage

1. **Configure Query Options**:
   Customize the `queryOptions` object in the script to specify your search criteria. For example:
   ```javascript
   const queryOptions = {
     keyword: 'software engineer',
     location: 'Bangalore',
     dateSincePosted: '1hr',
     jobType: 'full time',
     limit: '10'
   };
   ```

2. **Run the Scraper**:
   The scraper runs automatically at intervals (default every 15 minutes). To start it:
   ```bash
   node index.js
   ```

3. **Output**:
   - Job postings are written to `job_postings.csv`.
   - Processed job identifiers are stored in `processed_jobs.json` to avoid duplicates.

## Customization

- **Polling Interval**: Adjust the polling interval by modifying the interval duration in milliseconds in the script:
  ```javascript
  setInterval(pollJobs, 900000); // 15 minutes
  ```

- **CSV File Path**: Change the path for the output CSV file by updating `CSV_FILE_PATH`.

## Dependencies

- [linkedin-jobs-api](https://github.com/VishwaGauravIn/linkedin-jobs-api): A library for accessing LinkedIn job postings.
- [csv-writer](https://www.npmjs.com/package/csv-writer): A library for writing to CSV files.
- [crypto](https://nodejs.org/api/crypto.html): A Node.js module for generating unique identifiers.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

This `README.md` provides a comprehensive overview of the project, including its features, installation instructions, usage, and customization options. Make sure to replace `<repository-url>` and `<repository-directory>` with the appropriate values for your repository
