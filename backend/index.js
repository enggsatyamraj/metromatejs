const express = require('express');
const { pathController } = require('./controller/pathController');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(cookieParser()); // Invoke the cookie-parser middleware

app.use(express.json());

const PORT = process.env.PORT || 4000;
require('./config/database').connectWithDb();
const user = require('./routes/user');
app.use("/api/v1", user);


app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`);
});
