const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');  // ✅ Add cors package
const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(express.json());

// ✅ Allow frontend domain(s) via CORS
const allowedOrigins = [
  'http://localhost:3000', // for local dev
  'https://dreamfood.vercel.app', // your deployed frontend (Vercel)
  'https://your-netlify-domain.netlify.app' // if using Netlify
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req, res) => {
  res.send("🚀 Express server running successfully!");
});

// ✅ Use Render's dynamic PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
