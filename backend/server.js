const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/game');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/audio', express.static(path.join(__dirname, '../audio')));

// Datenbankverbindung
mongoose.connect('mongodb://localhost:27017/dailyminigame', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(err);
});

// Routen
app.use('/api/game', gameRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
