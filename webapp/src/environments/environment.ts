// The environment is an object in your Angular application that holds configuration variables.
// Using environment files helps to separate configuration and logic. This way, we can easily switch between 
// different configurations without modifying the main codebase. For example:
// In development, you might use a local server for API calls.
// In production, you might use a remote server for API calls.

// src/environments/environment.ts – This is used for development.
// src/environments/environment.prod.ts – This is used for production.

export const environment = {
    production: false,
    baseUrl: 'http://localhost:3000'  // Local API server for development
  };
  