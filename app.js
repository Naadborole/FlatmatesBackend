const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors'); 

const {userRoute} = require("./UserRoutes/userRoutes.js");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
//app.use(bodyParser.json());

app.use(cors());

app.use('/user',userRoute);
app.listen(PORT);

