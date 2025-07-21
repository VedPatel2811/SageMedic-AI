# SageMedic-AI Frontend

This is the frontend for SageMedic-AI, built with Angular. It provides a modern, responsive user interface for interacting with the AI-powered medical diagnosis backend.

## Features

- Chat-based interface for describing symptoms and receiving AI-powered diagnosis
- Modern UI with Angular Material and Tailwind CSS
- Auth0 authentication for secure login
- Responsive and mobile-friendly design

## Requirements

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Angular CLI (`npm install -g @angular/cli`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:4200](http://localhost:4200)

## Available Scripts

- `npm start` — Start the development server
- `npm run build` — Build the app for production
- `npm test` — Run unit tests

## Angular CLI Commands

Here are some useful Angular CLI commands for working with this project:

- `ng serve` — Start the development server (same as `npm start`)
- `ng build` — Build the app for production
- `ng test` — Run unit tests
- `ng generate component <name>` — Generate a new component
- `ng generate service <name>` — Generate a new service
- `ng add @angular/material` — Add Angular Material to your project

For more commands, see the [Angular CLI documentation](https://angular.io/cli).

## Connecting to the Backend

- The frontend expects the backend API to be running at `http://localhost:8080` (see backend setup).
- Update the API URL in the Angular environment files if your backend runs elsewhere: `src/environments/environment.ts`

## Project Structure

- `src/app/pages/` — Main pages (chat, landing, updates)
- `src/app/components/` — Reusable UI components (header, footer, sidebar)
- `src/app/services/` — API integration and business logic
- `public/` — Static assets (logo, background)

## License

See [LICENSE](../LICENSE) for details.
