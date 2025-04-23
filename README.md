# CSV Export with Node.js

A demonstration of efficiently exporting large datasets from a PostgreSQL database to CSV format using Node.js streams.

## Overview

This project showcases how to:

- Seed a PostgreSQL database with a large volume of mock product data
- Export specific database records to CSV format using Node.js streams
- Process data in chunks to handle large datasets efficiently

## Prerequisites

- Node.js (v23.11.0 or later recommended)
- PostgreSQL database
- Environment variable `DATABASE_URL` with your PostgreSQL connection string

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

## Usage

### Seeding the Database

Run the seed script to populate your database with product data:

```
npm run seed
```

This will create a `products` table and insert 200,000 mock product records (20 batches of 10,000 records).

### Exporting to CSV

Run the export script to generate a CSV file of products:

```
npm run export
```

The script will:

- Query all products with a price of 1000 cents or higher
- Process the results in batches of 500 records
- Generate an `export.csv` file with ID and Name columns

## How it Works

The export process uses Node.js streams to efficiently handle large datasets:

1. Database cursor creates a readable stream of product records
2. Transform stream processes each batch of records
3. CSV stringify converts the objects to CSV format
4. WriteStream writes the formatted data to a file

This streaming approach allows processing millions of records with minimal memory usage, as data is processed in small chunks rather than loaded entirely into memory.

## Project Structure

- `/src/db/client.ts` - Database connection setup
- `/src/db/seed.ts` - Script to populate the database with test data
- `/src/export.ts` - Script to export database records to CSV
