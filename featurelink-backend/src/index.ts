// src/app.ts
import express from 'express';

const app = express();
const port = 3000;

// Basic GET API
app.get('/', (req, res) => {
  res.send('Hello, World 3!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});