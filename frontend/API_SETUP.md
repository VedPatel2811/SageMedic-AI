# API Setup Guide

## Environment Configuration

To connect to your Google Cloud API endpoint, you have several options:

### Option 1: Update API Config File (Recommended)

Edit `src/app/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  // Update this URL with your Google Cloud endpoint
  BASE_URL: "https://your-google-cloud-endpoint.com",

  // API endpoints
  ENDPOINTS: {
    PREDICT: "/predict",
  },
};
```

### Option 2: Environment Files

Edit the environment files directly:

**Development** (`src/environments/environment.ts`):

```typescript
export const environment = {
  production: false,
  apiUrl: "https://your-google-cloud-endpoint.com",
};
```

**Production** (`src/environments/environment.prod.ts`):

```typescript
export const environment = {
  production: true,
  apiUrl: "https://your-google-cloud-endpoint.com",
};
```

### Option 3: Environment Variables (Advanced)

If you want to use environment variables, you can set them before building:

```bash
export API_URL=https://your-google-cloud-endpoint.com
ng build
```

## Expected API Response Format

The API should return responses in this format:

```json
{
  "label": "drug reaction",
  "confidence": 0.21236485242843628
}
```

## Features Added

1. **Real API Integration**: Replaced placeholder responses with actual API calls
2. **Confidence Visualization**: Added visual confidence bars and severity indicators
3. **Smart Recommendations**: Different recommendations based on confidence levels
4. **Error Handling**: Graceful error handling for API failures
5. **Flexible Configuration**: Easy API endpoint configuration via config file

## Confidence Levels

- **High (≥70%)**: Green indicator with strong recommendation
- **Medium (40-69%)**: Orange indicator with moderate recommendation
- **Low (<40%)**: Red indicator with cautious recommendation

## Usage

1. **Update the API URL** in `src/app/config/api.config.ts`
2. **Run the application**: `ng serve`
3. **Enter symptoms** in the chat interface
4. **View AI analysis** with confidence indicators

## Quick Setup

1. Open `frontend/src/app/config/api.config.ts`
2. Replace `'https://your-google-cloud-endpoint.com'` with your actual Google Cloud endpoint
3. Save the file
4. Restart your development server
