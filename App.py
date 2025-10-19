from flask import Flask, render_template, request, jsonify, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "supersecretkey"  # needed for session storage

# Predefined credentials
VALID_USERNAME = "Sneha"
VALID_PASSWORD = "sneha@123"

@app.route('/')
def home():
    # Check login session
    if not session.get("logged_in"):
        return redirect(url_for('login_page'))
    return render_template('index.html')

@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == VALID_USERNAME and password == VALID_PASSWORD:
        session["logged_in"] = True
        session["username"] = username
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login_page'))

if __name__ == '__main__':
    app.run(debug=True)
