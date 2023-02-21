const PORT = process.env.PORT ? process.env.PORT : 8080;
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHanlingMinddleware');
const seqelize = require('./models/db');
const eventClearing = require("./helpers/eventCleaning");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

const start = async () =>{
    try{
        await seqelize.authenticate();
        await seqelize.sync();
        app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}`));
    }
    catch(err){
        console.log("Error: " + err);
    }
}
start();
setInterval(
    () => eventClearing(), 
    8 * 60 * 60 * 1000 //vremya =kajdie 8 chasov
);


module.exports = app;