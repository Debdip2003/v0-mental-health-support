# Health Assessment Backend Setup

This document explains how to set up and run the Python backend servers for the Health Assessment tools.

## Prerequisites

- Python 3.7 or higher
- Flask library installed

## Installation

1. Install Flask if not already installed:

```bash
pip install flask
```

## Running the Backend

### Option 1: Using the Startup Script (Recommended)

Run the startup script from the project root:

```bash
python start-backend.py
```

This will start all three assessment servers:

- PHQ-9 Depression Assessment: http://127.0.0.1:5001
- GAD-7 Anxiety Assessment: http://127.0.0.1:5002
- GHQ General Health Assessment: http://127.0.0.1:5003

### Option 2: Manual Startup

Start each server individually in separate terminal windows:

**Terminal 1 - PHQ-9 Server:**

```bash
cd python/Health_Assessment/Health_Assessment
python app_phq9.py
```

**Terminal 2 - GAD-7 Server:**

```bash
cd python/Health_Assessment/Health_Assessment
python app_gad7.py
```

**Terminal 3 - GHQ Server:**

```bash
cd python/Health_Assessment/Health_Assessment
python app_ghq.py
```

## API Endpoints

### PHQ-9 Depression Assessment

- **GET** `/` - Returns the assessment form
- **POST** `/phq9` - Submit assessment score
  - Body: `{"score": 15}`
  - Response: `{"score": 15, "advice": "Moderate depression. Seek institutional counseling assistance."}`

### GAD-7 Anxiety Assessment

- **GET** `/` - Returns the assessment form
- **POST** `/gad7` - Submit assessment score
  - Body: `{"score": 10}`
  - Response: `{"score": 10, "advice": "Moderate anxiety. Seek institutional counseling assistance."}`

### GHQ General Health Assessment

- **GET** `/` - Returns the assessment form
- **POST** `/ghq` - Submit assessment score
  - Body: `{"score": 18}`
  - Response: `{"score": 18, "advice": "Moderate distress. Seek institutional counseling assistance."}`

## Score Interpretation

### PHQ-9 (Depression)

- 0-4: Minimal depression
- 5-9: Mild depression
- 10-14: Moderate depression
- 15-19: Moderately severe depression
- 20-27: Severe depression

### GAD-7 (Anxiety)

- 0-4: Minimal anxiety
- 5-9: Mild anxiety
- 10-14: Moderate anxiety
- 15-21: Severe anxiety

### GHQ (General Health)

- 0-15: Good mental health
- 16-20: Mild concerns
- 21+: Significant mental health concerns

## Troubleshooting

1. **Port already in use**: Make sure no other services are using ports 5001, 5002, or 5003
2. **Module not found**: Ensure you're running from the correct directory and Flask is installed
3. **CORS issues**: The React frontend should be able to connect to localhost:5001-5003

## Integration with React Frontend

The React assessment component automatically connects to these backend services. If the backend is not running, the frontend will fall back to local score calculation.

Make sure to start the backend servers before using the assessment tools in the React application.
