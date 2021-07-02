const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors'); 

const {userRoute} = require("./UserRoutes/userRoutes.js");

const app = express();
app.use(express.json());
//app.use(bodyParser.json());

app.use(cors());

app.use('/user',userRoute);
app.listen(5000);

