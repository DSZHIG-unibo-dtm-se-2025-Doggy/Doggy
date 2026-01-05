from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from Features.LLM.llm_engine import DogLLMEngine
from Features.DogRecognition.dog_recognition import DogRecognitionModel

import uuid
import os

app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Health Check ----------
@app.get("/")
def root():
    return {"status": "ok", "message": "backend is running"}


# ---------- Init LLM ----------
try:
    llm = DogLLMEngine()
    print("LLM loaded successfully")
except Exception as e:
    print("LLM INIT ERROR:", e)
    llm = None


# ---------- Init Dog Recognition ----------
try:
    dog_model = DogRecognitionModel()
    print("DogRecognition loaded successfully")
except Exception as e:
    print("DOG MODEL INIT ERROR:", e)
    dog_model = None


# ---------- TEXT ENDPOINT ----------
@app.get("/api/dog-advice")
def dog_advice(breed: str):
    if llm is None:
        return {"error": "LLM not initialized"}
    try:
        return {"advice": llm.generate_advice(breed)}
    except Exception as e:
        return {"error": str(e)}


# ---------- PHOTO ENDPOINT ----------
@app.post("/api/dog-from-photo")
async def dog_from_photo(file: UploadFile = File(...)):
    if dog_model is None:
        return {"error": "Dog recognition model not initialized"}
    if llm is None:
        return {"error": "LLM not initialized"}

    # --- 1. Save temp image ---
    temp_path = f"temp_{uuid.uuid4()}.jpg"
    with open(temp_path, "wb") as f:
        f.write(await file.read())

    try:
        # --- 2. Predict breed ---
        preds = dog_model.predict(temp_path)
        top_label = preds[0]["label"]

        # --- 3. Generate LLM advice ---
        advice = llm.generate_advice(top_label)

        return {
            "breed": top_label,
            "raw_predictions": preds,
            "advice": advice
        }

    except Exception as e:
        return {"error": str(e)}

    finally:
        # --- 4. Remove temp file ---
        if os.path.exists(temp_path):
            os.remove(temp_path)