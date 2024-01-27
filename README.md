# Soccer League Manager

## Description

Soccer League Manager is a Node.js web application for managing a soccer league. It allows users to input club data, input match scores, and view the league standings updated in real-time based on the match results.

## Features

- Add and view clubs
- Record and view match scores
- View updated league standings

## Tech Stack

- Node.js
- Express.js
- EJS for templating
- SQLite for the database

## Setup and Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/soccer-league-manager.git
```

2. **Install the dependencies**

```bash
cd soccer-league-manager
npm install
```

3. **Set up the database**
   Make sure you have SQLite installed on your system. Once installed, create a new SQLite database and run the SQL script provided to set up the tables and views.

```bash
sqlite3 your-database-name.db < setup.sql
```

4. **Start the application**

```bash
npm start
```

The application should now be running on http://localhost:3000.

## Usage

Navigate to http://localhost:3000 in your web browser to access the Soccer League Manager.

- To add a club, go to the /clubs route and fill out the form.
- To record a match score, go to the /matches route and fill out the form.
- To view the league standings, go to the homepage.

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
