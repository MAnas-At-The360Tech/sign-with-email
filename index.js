const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const {SingIn} = require('./SingIn');

const port = 3001
const DB_URL = "mongodb+srv://manasthe360tech:5ZbCvRhqZ1DUxe2K@cluster0.gdj6fcm.mongodb.net/?retryWrites=true&w=majority"

// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected...')
})

app.use(express.json())
app.get('/', (req, res) => {
  res.send('App is working')
})

app.post('/SingIn', SingIn)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})