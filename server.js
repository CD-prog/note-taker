const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];


app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`));