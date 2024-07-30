// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; 

app.use(cors());
app.use(bodyParser.json());

// app route
app.get('/api/menu', (req, res) => {
    // Example data
    const menu = [
        { id: 1, name: 'Espresso', price: 3.00 },
        { id: 2, name: 'Latte', price: 4.00 }
    ];
    res.json(menu);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
