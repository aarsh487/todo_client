<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MERN Todo App Documentation</title>
  <title>Anand Patel</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: auto;">

  <h1>🛠️ MERN Todo App (React + Vite & Express + MongoDB)</h1>
  <p>
    A full-stack Todo management app with authentication using JWT stored in HTTP-only cookies. The project is split into two folders:
  </p>
  <ul>
    <li><strong>/backend</strong>: Node.js + Express API with MongoDB</li>
    <li><strong>/frontend</strong>: React app built with Vite</li>
  </ul>

  <h2>📁 Project Structure</h2>
  <pre><code>
.
├── backend        # Express backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.ts / index.js
│
├── frontend       # React frontend
│   ├── src
│   │   ├── components
│   │   ├── contexts
│   │   ├── pages
│   │   ├── routes
│   │   └── App.tsx / main.tsx
│   └── vite.config.ts
│
└── README.md      # This file
  </code></pre>

  <h2>⚙️ Setup Instructions</h2>

  <h3>1. Clone the Repo</h3>
  <pre><code>
git clone https://github.com/aarsh487/todo_client.git
cd your-repo-name
  </code></pre>

  <h2>🔧 Backend Setup (/backend)</h2>
  <h4>Prerequisites:</h4>
  <ul>
    <li>Node.js</li>
    <li>MongoDB (local or Atlas)</li>
  </ul>

  <h4>Install dependencies:</h4>
  <pre><code>
cd backend
npm install
  </code></pre>

  <h4>Environment Variables:</h4>
  <p>Create a <code>.env</code> file in the <code>/backend</code> folder:</p>
  <pre><code>
PORT=3000
DATABASE_URL=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
  </code></pre>

  <h4>Run the server:</h4>
  <pre><code>npm run dev</code></pre>
  <p><strong>Server runs on:</strong> <code>http://localhost:3000</code></p>

  <h2>🖼️ Frontend Setup (/frontend)</h2>
  <h4>Prerequisites:</h4>
  <ul>
    <li>Node.js</li>
  </ul>

  <h4>Install dependencies:</h4>
  <pre><code>
cd frontend
npm install
  </code></pre>
  </code></pre>

  <h4>Axios should send cookies:</h4>
  <pre><code>axios.defaults.withCredentials = true;</code></pre>

  <h4>Run the frontend:</h4>
  <pre><code>npm run dev</code></pre>
  <p><strong>Frontend runs on:</strong> <code>http://localhost:5173</code></p>

  <h2>🔐 Authentication</h2>
  <ul>
    <li>JWT is stored in HTTP-only cookies.</li>
    <li>Login sets the token via <code>res.cookie</code> in Express.</li>
    <li>Protected routes are accessed by verifying the cookie using middleware.</li>
    <li>React context manages the auth state.</li>
  </ul>

  <h2>📦 Features</h2>
  <ul>
    <li>✅ Register & Login</li>
    <li>✅ Protected routes</li>
    <li>✅ Role-based access (admin/client)</li>
    <li>✅ Paginated Todo list</li>
    <li>✅ Logout and session persistence</li>
    <li>✅ Responsive UI</li>
  </ul>

  <h2>🧪 Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React + Vite, TypeScript, Axios, Tailwind CSS</li>
    <li><strong>Backend:</strong> Node.js, Express, Mongoose, JWT, Cookie-parser</li>
    <li><strong>Database:</strong> MongoDB</li>
    <li><strong>Auth:</strong> JSON Web Token via HTTP-only cookies</li>
  </ul>
 

  <h2>📌 Notes</h2>
  <ul>
    <li>CORS is configured with <code>credentials: true</code> to support cookies.</li>
    <li>Make sure both frontend and backend run on separate ports but with proper proxying or CORS settings.</li>
  </ul>

  <h2>📝 License</h2>
  <p>MIT License</p>

</body>
</html>
