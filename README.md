# JobExpiresIn


[![Vercel Deployment](https://vercelbadge.vercel.app/api/binesh-b0/jobexpiresin)](https://jobexpiresin.vercel.app) [![Next.js](https://img.shields.io/badge/Next.js-14.2.9-blue)](https://nextjs.org) [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-green)](https://tailwindcss.com) [![GitHub](https://img.shields.io/github/license/binesh-b0/jobexpiresin)](https://github.com/binesh-b0/jobexpiresin/blob/main/LICENSE)


**JobExpiresIn** is a web application that predicts when a job title will be replaced by AI. It leverages the Gemini API to generate detailed job descriptions, including similar job roles, key responsibilities, a predicted AI replacement timeframe, and reasons for AI replacement.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=appveyor)](https://jobexpiresin.vercel.app/)

## Features

- **AI-Powered Job Title Prediction**: Get an estimate of when a specific job might be replaced by AI.
- **Similar Jobs**: Discover alternative jobs related to the given job title.
- **Key Responsibilities**: Understand the important responsibilities associated with each job.
- **AI Replacement Insights**: Learn why and when a job might be replaced by AI, based on current trends and technology advancements.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org) - A React framework for building fast web applications.
- **Backend**: [Gemini API](https://cloud.google.com/gemini) for AI-generated predictions.
- **Styling**: [TailwindCSS](https://tailwindcss.com) for rapid UI development and custom styling.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth UI transitions and animations.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/binesh-b0/jobexpiresin.git
   cd JobExpiresIn
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   GEMINI_API_URL=
   GEMINI_API_KEY=
   JOB_PROMPT_STRUCTURE=
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Enter a job title into the search field (e.g., "Software Engineer").
2. Click the **Predict** button.
3. View the generated prediction, including:
   - **Job Title**: The job you searched for.
   - **Similar Jobs**: Related job roles that might be of interest.
   - **Key Responsibilities**: The primary duties of the job.
   - **AI Replacement Timeline**: When the job is predicted to be replaced by AI.
   - **Reasons for AI Replacement**: Factors contributing to the job being replaced by AI.

## Deployment

This app is hosted on Vercel, enabling fast, reliable deployments with build status tracking.


[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=appveyor)](https://jobexpiresin.vercel.app/)
