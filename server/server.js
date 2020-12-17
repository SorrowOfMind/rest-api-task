const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const todosRoutes = require('./routes/todosRoutes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));