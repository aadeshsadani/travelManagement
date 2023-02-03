const readData = require("./controllers/weatherController")
const express = require('express');
const app = express();
const weather = require('./model/weather');

const http = require("http")
const httpServer = http.createServer(app)
const {Server} =  require('socket.io')
const io = new Server(httpServer,{cors:{origin:"*"}})




require('dotenv').config();
const database = require('./database');
const routes = require('./router/routes');
const port = process.env.PORT || 5000;
const cors = require('cors');
database();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/', routes);


const getDataFromWeather = async () => {
    try {
        const getWeatherData = await weather.find({status : 'default'}).exec();
        return  { weather : getWeatherData}
    } catch (error) {
        return { error : e }
    }

}

io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    //
    setInterval(async ()=>{
        socket.emit("weatherData","weather is updating...")
        const data = await getDataFromWeather()
        socket.emit("weatherData",data)
    },5000)
  });


httpServer.listen(port, (error) => {
    if(error) console.log(error)
    else console.log(`Server listen at ${port}.`);
});
