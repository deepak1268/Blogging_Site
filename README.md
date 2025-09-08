# Blogging Site

A simple blogging platform with basic **CRUD (Create, Read, Update, Delete)** functionality. Users can create blog posts, edit them, view all blogs, and delete blogs when no longer needed.

---

## Features

- Create new blog posts  
- View all posts  
- View your own blogs
- Edit existing posts  
- Delete posts  
- Clean and simple interface  
- Comment on blogs

---

## Tech Stack

- **Frontend:** React (JavaScript, HTML, CSS)  
- **Backend:** Node.js with Express  
- **Database:** MongoDB   

---

## Installation and Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```
git clone https://github.com/deepak1268/Blogging_Site.git
cd Blogging_Site
```

### 2. Setup Backend

```
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```
npm start
```

By default, it will run on **http://localhost:5000**

---

### 3. Setup Frontend

```
cd ../frontend
npm install
npm start
```

By default, it will run on **http://localhost:3000**

---

## Contributing

Feel free to fork this repo and submit pull requests with improvements or new features.  

---

