from flask import Flask
from flask_restful import Api, Resource, abort, reqparse
from flask_cors import CORS
from model import predict_image

import tensorflow as tf

    
    
#FLASK SETUP
app = Flask(__name__)
api = Api(app)
CORS(app)


#THERAPY DIAGNOSER
ingredient_classifier_post_args = reqparse.RequestParser()
ingredient_classifier_post_args.add_argument("user_images", help="Please Add Images", required=True, location='form')


class ingredient_classifier(Resource): 
    def post(self):
        
        user_input = ingredient_classifier_post_args.parse_args()
        ingredients = predict_image(user_input['user_images'])
      
        return ingredients
    
    def get(self):
        return {"output": "SUCCESS"}


api.add_resource(ingredient_classifier, '/classifier')

if __name__ == "__main__":
    app.run(debug=True, port=3001)