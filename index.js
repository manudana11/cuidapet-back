const express = require("express")
const { dbConnection } = require("./config/config")
const app = express()
const PORT = 3000;
const cors = require('cors');
const path = require("path");

app.use(cors());
dbConnection()
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/users', require('./routes/users'));
app.use("/pets", require("./routes/pets"));
app.use("/medications", require("./routes/medications"));
app.use("/food", require("./routes/foods"));

app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}`));
module.exports = app;