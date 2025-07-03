from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer
import tensorflow as tf

model_name = "Zabihin/Symptom_to_Diagnosis"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = TFAutoModelForSequenceClassification.from_pretrained(model_name, from_pt=False)

app = FastAPI()

origins = [
    "http://localhost:4200",
    "https://sage-medic-ai.vercel.app/" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    inputs = data.get("inputs", "")
    tokens = tokenizer(inputs, return_tensors="tf", truncation=True, padding=True)
    predictions = model(**tokens).logits
    probs = tf.nn.softmax(predictions, axis=-1).numpy()[0]
    label_id = probs.argmax()
    confidence = probs[label_id]
    label = model.config.id2label[label_id]
    return {"label": label, "confidence": float(confidence)}
