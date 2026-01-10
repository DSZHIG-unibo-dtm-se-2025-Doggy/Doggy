import importlib
import os

from fastapi import FastAPI
from fastapi.testclient import TestClient

import backend.Features.DogRecognition.dog_recognition as dr_module
import backend.Features.LLM.llm_engine as llm_module


def test_router_predict(monkeypatch):
    # Avoid real HF token/model loading
    monkeypatch.setenv("HF_TOKEN", "dummy-token")

    def fake_pipeline(*_, **__):
        return lambda *_, **__: [{"label": "husky", "score": 0.9}]

    class FakeInferenceClient:
        def __init__(self, token=None):
            self.token = token

        def chat_completion(self, *_, **__):
            class Choice:
                def __init__(self):
                    self.message = {"content": "ok"}

            class Response:
                def __init__(self):
                    self.choices = [Choice()]

            return Response()

    monkeypatch.setattr("transformers.pipeline", fake_pipeline)
    monkeypatch.setattr(dr_module, "pipeline", fake_pipeline)
    monkeypatch.setattr(llm_module, "InferenceClient", FakeInferenceClient)

    import backend.Core.router as router

    importlib.reload(router)

    class FakeModel:
        def predict(self, path: str):
            return [{"label": "husky", "score": 0.9}]

    monkeypatch.setattr(router, "ml_model", FakeModel())

    app = FastAPI()
    app.include_router(router.router)

    client = TestClient(app)
    resp = client.post("/predict", files={"file": ("test.jpg", b"fake", "image/jpeg")})

    assert resp.status_code == 200
    assert resp.json()["predictions"][0]["label"] == "husky"

    uploaded_path = "uploaded_test.jpg"
    if os.path.exists(uploaded_path):
        os.remove(uploaded_path)
