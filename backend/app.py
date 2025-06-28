from fastapi import FastAPI, Request
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer
import tensorflow as tf

model_name = "Zabihin/Symptom_to_Diagnosis"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = TFAutoModelForSequenceClassification.from_pretrained(model_name, from_pt=False)

app = FastAPI()

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
