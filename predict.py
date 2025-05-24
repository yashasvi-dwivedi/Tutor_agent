from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load("subject_classifier.joblib")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    question = data.get("question", "")
    if not question:
        return jsonify({"error": "No questions provided"}), 400
    subject = model.predict([question])[0]
    return jsonify({"subject": subject})


if __name__ == "__main__":
    print(model.predict([""]))
    print(model.predict(["What is the Newton's secondlaw?"]))
    app.run(port=5000)
