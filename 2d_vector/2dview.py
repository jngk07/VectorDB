from chromadb import PersistentClient
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Connect to local ChromaDB
client = PersistentClient(path="/Users/jng/Documents/YouTubeVideo/vector_backend_demo/backend/chroma_store")
collection = client.get_or_create_collection(name="demo_collection")

# Get stored embeddings and texts
data = collection.get(include=["embeddings", "documents"])

embeddings = [e for e in data["embeddings"]]
texts = data["documents"]

# Reduce dimensionality from 384D to 2D
pca = PCA(n_components=2)
reduced = pca.fit_transform(embeddings)

# Plot in 2D
plt.figure(figsize=(8, 6))
for i, text in enumerate(texts):
    x, y = reduced[i]
    plt.scatter(x, y)
    plt.text(x + 0.01, y + 0.01, text, fontsize=12)

plt.title("2D Visualization of Embeddings (via PCA)")
plt.xlabel("PCA-1")
plt.ylabel("PCA-2")
plt.grid(True)
plt.show()
