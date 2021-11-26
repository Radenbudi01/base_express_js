var express = require('express');
var router = express.Router();


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '2137801091:AAGnAjM265jvx4Ls8WNI-hroTQwHq-cB4U0';
const bot = new TelegramBot(token, {polling: true});


let global_msg_id;
// Main Menu Bot
bot.onText(/\/start/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /show_url`
    );
});

bot.onText(/\/show_url/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
            https://radenesp-tele1.herokuapp.com/api/sensor/50/100/150
        `
    );
});

bot.on('message', (msg) => {
  console.log(msg);
});


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    "status": 202,
    "messgae": "Success"
  });
}); 

// https://radenesp-tele1.herokuapp.com/api/sensor/125/50/300
router.get('/sensor/:sensor1/:sensor2/:sensor3', (req, res, next) => {
  try {
      bot.sendMessage(
            global_msg_id, //msg.id
            `Pembacaan Sensor 1 : ${req.params.sensor1},\n 
            Pembacaan Sensor 2 : ${req.params.sensor2},\n 
            Pembacaan Sensor 3 : ${req.params.sensor3}`
     );
      res.json({
        "status": 202,
        "message": "Success",
        "data": {
          "sensor_1": parseInt(req.params.sensor3),
          "sensor_2": parseInt(req.params.sensor1),
          "sensor_3": parseInt(req.params.sensor2)
        }
      });
  } catch (err) {
      next(err);
  }
});

// https://esp-telebot.herokuapp.com/api/test/cobacoba
router.get('/test/:key', function(req, res, next){
    bot.sendMessage(
            global_msg_id, //msg.id
            `${req.params.key}`
    );
    res.json(req.params.key);
});


module.exports = router;
