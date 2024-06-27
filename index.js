const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const jobRoutes = require('./routes/job')
const bookMarkRoutes = require('./routes/bookmark')
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/message');


// it will load the .env file and add the values to the process.env object that we can access in our application. 
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
// process.env.MY_SECRET will be available in our application
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...'));
app.use(express.json())
app.use("/api", authRoutes) //localhost:3000/api/
app.use("/api/users", userRoutes) //localhost:3000/api/user/id
app.use("/api/jobs", jobRoutes) //localhost:3000/api/jobs/id
app.use("/api/bookmarks", bookMarkRoutes) //localhost:3000/api/bookmarks
app.use("/api/chats", chatRoute); //localhost:3000/api/chats
app.use("/api/messages", messageRoute); //localhost:3000/api/messages
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || 3000,'0.0.0.0', () => console.log(`Example app listening on port ${process.env.PORT || 3000}!`))