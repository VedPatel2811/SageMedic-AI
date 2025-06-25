from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Load model
classifier = pipeline("text-classification", model="Zabihin/Symptom_to_Diagnosis", tokenizer="Zabihin/Symptom_to_Diagnosis")

class InputText(BaseModel):
    text: str

@app.post("/predict")
def predict_symptom(input: InputText):
    result = classifier(input.text)
    return {"prediction": result}
