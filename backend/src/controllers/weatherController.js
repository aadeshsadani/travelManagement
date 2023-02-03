const weather = require('../model/weather');
const request = require('request');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();
var api_key = process.env.Weather_API;
const bulkCity = {"locations": [
    {
        "q": "Karachi"
    },
    {
        "q": "Sukkur"
    },
    {
        "q": "Larkana",
    },
    {
        "q" : "Lahore"
    },
    {
        "q" : "Islamabad"
    }
]}
var options = {
    method : "GET",
    url: `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=bulk`,
    headers: {
        'Content-Type':'application/json'
    },
    data : bulkCity,
    json: true
  };

async function getWeatherData() {
    try{
        let resp = await axios(options)
        let resp2 = await resp.data;
        let insertData = await weather.findOneAndUpdate({ status: 'default' }, {$set : {
                    locations : bulkCity.locations,
                    weather : resp2.bulk
                }}, {upsert:true}).then((response) => {
                    console.log('Data is Updated!');
                }).catch((e) => {
                    console.log("err=>",e)
                })
    }catch(e){
        console.log("error occurred in reading axios...",e)
    }
  }

    setTimeout(() => {
        getWeatherData();
    },1000)
    setInterval(() => {
        getWeatherData();
    },900000)
exports.getData = async (req, res) => {
    try {
        const getWeatherData = await weather.find({status : 'default'}).then((response) =>{
            res.status(200).json({
                data : response
            });
        }).catch((e) => {
            console.log('err',e);
        })
    } catch (e) {
        res.json({
            error : e
        })
    }
};
exports.getWeatherAgainstUser = async (req, res) =>{
    res.send(`${req.userInfo.userId}`);
}
exports.addWeather = async (req, res) => {
    const user_Id = req.userInfo.userId;
    let cityName = req.body.cityName.charAt(0).toUpperCase() + req.body.cityName.slice(1)
    async function getWeatherFunc(funcData) {
        let city = funcData
        const optionsGetWeather = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json'
            },
            json : true
        }
        const getWeatherInfo = await axios(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`,optionsGetWeather)
        let weatherObject = {
            "query": {
                "custom_id": "",
                "q": city,
                "location" : getWeatherInfo.data.location,
                "current"  : getWeatherInfo.data.current
            }
        }
        return weatherObject;
    }
    try {
        const response =  await weather.find({user_id : user_Id}).select(['weather', 'locations']).exec();
        
        const checkAvailability = response[0].locations.find((e,index) => {
            return  e.q === cityName
        })
        if(checkAvailability === undefined){
            const weatherObject =  await getWeatherFunc(cityName)
            const updatedWeatherObject = [...response[0].weather, weatherObject];
            const updatedLocationsObject = [...response[0].locations,{"q":cityName}];
            weather.findOneAndUpdate({user_id : user_Id}, { $set :  {weather : updatedWeatherObject, locations : updatedLocationsObject} }, {new : true}, (err, result) => {
                if(result){
                    res.json({
                        result : result
                    });
                }
            })
            
        }else if(checkAvailability !== undefined){
            res.status(409).json({
                existingError : `Alredy available against this city ${checkAvailability.q}.`
            })
        }
        
    } catch (error) {
        console.log(error)
    }

}

exports.deleteWeather = async (req, res) => {
    const index = req.params.index;
    const id = req.userInfo.userId;
    console.log('index',index)
    const findData = await weather.findOne({user_id : id}).select(['weather', 'locations']).exec();
    // console.log(findData);
    await findData.weather.splice(index, 1);
    await findData.locations.splice(index, 1);
    await weather.findOneAndUpdate({user_id: id}, {$set : {weather : findData.weather, locations : findData.locations}}, {new : true}).then
    ((result)=>{
        res.status(200).json({
            result : result
        })
    }).catch((e)=>{
        res.json({
            error: e
        })
    })
    
}