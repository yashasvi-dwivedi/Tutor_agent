from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

# 1. Load data
df = pd.read_csv("questions-new.csv")
df = df.dropna(subset=["question", "subject"])

# 2. Split data
X_train, X_test, y_train, y_test = train_test_split(
    df["question"], df["subject"], test_size=0.2
)

# 3. Create pipeline with Logistic Regression
model = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2)), LogisticRegression(max_iter=1000)
)

# 4. Train
model.fit(X_train, y_train)

# 5. Test
print("Accuracy:", model.score(X_test, y_test))

# 6. Save model
joblib.dump(model, "subject_classifier.joblib")
