require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;
const authRoutes = require('./routes/auth.js');
const adminRoutes = require('./routes/admin.js');
const bookRoutes = require('./routes/book.js');

app.use(express.json());
app.use(cors());

//Routes

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/book', bookRoutes);
//Server

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})