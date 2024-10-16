from flask import Flask, request, jsonify
from function import saved,login

app = Flask(__name__)

data_stock={}

@app.route('/register', methods=['POST'])
def saved_face(names,url):
    saved(names,url)
    print(f"le nom recu est : {names}")
    return jsonify({'message': 'Données reçues avec succès'})

@app.route('/login', methods=['POST'])
def login_face(url):
    name=login()
    return jsonify (name),200

if __name__ == '__main__':
    app.run(debug=True)
