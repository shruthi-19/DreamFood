
const express = require('express');
const connectToMongo = require('./db');
const { head } = require('./Routes/CreateUser');
const app = express();
const PORT = 5000;
 // CommonJS style

// Connect to MongoDB
connectToMongo();

// Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from the React app
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.json());

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
// Routes
app.get('/', (req, res) => {
  res.send("🚀 Express server running without callback-style MongoDB connection!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
