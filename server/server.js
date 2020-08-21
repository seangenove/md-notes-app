const express = require('express');

// load .env variables
require('dotenv').config();

const PORT = process.env.PORT || 5000; 

const app = express();

// Init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.send('API Running');
});

// Define routes 
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});