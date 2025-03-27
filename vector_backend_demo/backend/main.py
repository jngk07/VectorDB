from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chromadb import PersistentClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = PersistentClient(path="./chroma_store")
collection = client.get_or_create_collection(name="demo_collection")

class TextItem(BaseModel):
    text: str

class QueryItem(BaseModel):
    query: str

@app.post("/add")
def add_text(item: TextItem):
    idx = f"id{len(collection.get()['ids']) + 1}"
    collection.upsert(documents=[item.text], ids=[idx])
    return {"status": "added", "id": idx, "text": item.text}

@app.get("/get_all")
def get_all():
    result = collection.get(include=["embeddings"])

    # Convert NumPy embeddings to lists
    result["embeddings"] = [embedding.tolist() for embedding in result["embeddings"]]

    return result


@app.post("/query")
def query_text(item: QueryItem):
    return collection.query(
        query_texts=[item.query],
        n_results=2,
        include=["distances", "documents", "metadatas"]
    )

@app.post("/reset")
def reset_collection():
    client.delete_collection("demo_collection")
    return {"status": "cleared"}
