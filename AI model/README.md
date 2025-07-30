# SageMedic-AI AI Model

This is the base model service for SageMedic-AI, built with FastAPI and utilizing a Hugging Face Transformers model for symptom-to-diagnosis prediction.

## Features

- **/predict** endpoint for medical diagnosis prediction based on symptoms.
- Uses a pre-trained model (`Zabihin/Symptom_to_Diagnosis`) from Hugging Face.
- CORS enabled for `http://localhost:4200` (the frontend).

## Requirements

- Python 3.7+
- FastAPI
- TensorFlow
- transformers
- uvicorn

Install dependencies:

```bash
pip install -r requirements.txt
```

## Running the Model

Start the FastAPI server with:

```bash
uvicorn app:app --reload
```

## Running with Docker

You can also run the model in a Docker container:

1. **Build the Docker image:**
   ```bash
   docker build -t sagemedic-backend .
   ```
2. **Run the Docker container:**
   ```bash
   docker run -p 8080:8080 sagemedic-backend
   ```

This will start the model server at `http://localhost:8080` inside the container.

## API Endpoint

### POST `/predict`

- **Request Body:**
  ```json
  { "inputs": "<symptom description>" }
  ```
- **Response:**
  ```json
  { "label": "<diagnosis>", "confidence": 0.95 }
  ```

## Model

- Model: `Zabihin/Symptom_to_Diagnosis`
- Loaded with Hugging Face Transformers and TensorFlow.

---

For more details, see the code in `app.py`.
