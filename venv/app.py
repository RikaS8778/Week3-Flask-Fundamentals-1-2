from flask import Flask, request, jsonify, render_template, redirect
from  data.categories import categories
from data.posts import posts
from data.users import users
from datetime import datetime as dt

app = Flask(__name__, template_folder='templates')

#set user session to empty
logged_in_user = {}

#copy categories to categories_copy for add 'All' in the dropdown
categories_copy = categories.copy()
categories_copy.insert(0, {"id": '', "name": "All"})



def getPostsWithAuthurNameAndCategoryName(getCategoryID=None):
    posts_copy = posts.copy()
    if getCategoryID:
        posts_copy = [post for post in posts_copy if post['category_id'] == int(getCategoryID)]
        
    for post in posts_copy:
        post['author'] = [user for user in users if user['id'] == post['created_by']][0]['name']
        post['category'] = [category for category in categories if category['id'] == post['category_id']][0]['name']
        post['date'] = dt.strptime(post['created_at'], '%Y-%m-%d %H:%M:%S').strftime('%Y/%m/%d')
    return posts_copy

#home page
@app.route('/')
def home():
    postList = getPostsWithAuthurNameAndCategoryName()
    return render_template('index.html', categories=categories_copy, logged_in_user=logged_in_user, posts=postList)

#logout
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    global logged_in_user
    #session clear
    logged_in_user = {}
    return redirect('/')

#login: for Add post, Edit post, Delete post
@app.route('/login', methods=['POST'])
def login():
    global logged_in_user
    email = request.form.get('email')
    password = request.form.get('password')
    print(email, password)
    for user in users:
        if user['email'] == email and user['password'] == password:
            logged_in_user = {
                "id": user.get('id'),
                "name": user.get('name')
            }
            return redirect('/')
    error_message = "Invalid email or password. Please try again."
    return render_template('index.html', categories=categories_copy, logged_in_user=logged_in_user, error_message=error_message)

#show user register form
@app.route('/register-form', methods=['GET'])
def register():
    return render_template('register.html')

#register user
@app.route('/register', methods=['POST'])
def register_user():
    global users
    global logged_in_user
    email = request.form.get('email')
    password = request.form.get('password')
    name = request.form.get('name')
    for user in users:
        if user['email'] == email:
            error_message = "Email already exists. Please login as existing account."
            return render_template('index.html', categories=categories_copy, error_message=error_message)
    nextId = max(user["id"] for user in users) + 1
    users.append({"id": nextId, "name": name, "email": email, "password": password})
    logged_in_user = {
        "id": nextId,
        "name": name
    }
    return redirect('/')

@app.route('/posts', methods=['GET'])
def category_posts():
    category_id = request.args.get('category_id')
    if(category_id != ''):
        postList = getPostsWithAuthurNameAndCategoryName(category_id)
        posts_list = [post for post in postList if post['category_id'] == int(category_id)]
        return render_template('index.html', posts=posts_list, categories=categories_copy, logged_in_user=logged_in_user, selected_category_id=int(category_id))
    else:
        return redirect('/')
    
    


if __name__ == "__main__":
    app.run(debug=True)  # Run the Flask app in debug mode