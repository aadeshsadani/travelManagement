const routes = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth = require('../authentication/userAuth');
//
const userController = require('../controllers/userController');
const weatherController = require('../controllers/weatherController');
//

let userAray = [
    body('name','name should have char length >=5').isLength({ min: 5 }), 
    body('email',"please type correct email").isEmail(),
    body('password','password length should be >=5 char').isLength({ min: 5 })
]

let loginArray = [
    body('email',"Email not provided.").notEmpty(),
    body('email',"please type correct email").isEmail(),
    body('password',"Password not provided.").notEmpty(),
    body('password','password length should be >=5 char').isLength({ min: 5 })
]

routes.get('/', auth ,userController.getUsers);
routes.post('/add', userAray, userController.addUser);
routes.post('/login', loginArray, userController.login);
routes.get('/deleteWeather/:index', auth, weatherController.deleteWeather)
routes.get('/getWeatherAgainstUser', auth, weatherController.getWeatherAgainstUser)
routes.get('/getWeather', weatherController.getData);
routes.post('/addWeather', auth, weatherController.addWeather);
module.exports = routes;



