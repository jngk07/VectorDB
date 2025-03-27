# Vector DB Demo (ChromaDB)

This demo shows how simple sentences are embedded into vectors and stored in a vector database (ChromaDB), with a mini dashboard to interact.

## 🛠 Backend Setup (FastAPI)

1. Create and activate a virtual environment (optional but recommended):

```
python3 -m venv venv
source venv/bin/activate
```

2. Install backend dependencies:

```
cd backend
pip install -r requirements.txt
```

3. Run the FastAPI server:

```
uvicorn main:app --reload --port 8000
```

## 💻 Frontend (React dashboard)

Use the provided React frontend (separate zip or source). It connects to `http://localhost:8000` to:

- Add sentences to the vector DB
- Query similar sentences
- View stored sentences and their embeddings

## ✨ Demo Use Case

1. Add:
   - "This is mat"
   - "This is cat"
2. Query:
   - "This is bat"
3. Watch how it returns semantically similar documents.
