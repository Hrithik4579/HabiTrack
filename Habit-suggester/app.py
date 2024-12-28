from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import json
import os
from pymongo import MongoClient
from bson import ObjectId
app = Flask(__name__)
CORS(app)
MONGO_URI = "mongodb+srv://hbhagat2053:hbhagat123@cluster1.pw8fq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"  
client = MongoClient(MONGO_URI)
db = client.test  
tasks_collection = db.notes  

DATA_FILE_PATH = os.path.join(os.getcwd(), "data", "habit_recommendations.json")
with open(DATA_FILE_PATH, "r") as file:
    HABIT_DATA = json.load(file)


def recommend_habits(user_categories, num_recommendations=10):
    
    recommendations = []
    for category in user_categories:
        if category in HABIT_DATA:
            recommendations.extend(HABIT_DATA[category])
        else:
            print(f"Category '{category}' not found in HABIT_DATA.")

    if not user_categories:
        for category in HABIT_DATA.values():
            recommendations.extend(category)

    random.shuffle(recommendations)
    return recommendations[:num_recommendations]


def get_user_categories(user_id):
   

   
    try:
        user_object_id = ObjectId(user_id)
    except Exception as e:
        return []
    
    tasks_cursor = tasks_collection.find({"user": user_object_id})

    tasks_list = list(tasks_cursor)  

    
    if not tasks_list:
        return []
    categories = set()
    for task in tasks_list:
        tag = task.get("tag", "").strip().lower() 
        if tag:  
            categories.add(tag) 
    print(categories)
    return list(categories)


@app.route('/generate-habit-suggestions', methods=['GET'])
def generate_habit_suggestions():
    user_id = request.args.get('user_id')  
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    user_categories = get_user_categories(user_id)
    
    recommendations = recommend_habits(user_categories)
    return jsonify({"recommendations": recommendations})


if __name__ == "__main__":
    app.run(debug=True)
