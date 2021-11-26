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
        `Hello ${msg.chat.first_name}, welcome...\n
        click /show_url`
    );
});

bot.onText(/\/show_url/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
            url data sensor :\nhttps://radenesp-tele1.herokuapp.com/api/sensor
        `
    );
});

bot.on('message', (msg) => {
  console.log(msg);
});


/* GET users listing. */
// https://radenesp-tele1.herokuapp.com/api/sensor/125/50/300/23/34
router.get('/sensor/:sensor1/:sensor2/:sensor3/:sensor4/:sensor5/', (req, res, next) => {
  try {
      bot.sendMessage(
            global_msg_id, //msg.id
            `Pembacaan Data Sensor :\n 
            Sensor 1 = ${req.params.sensor1}\n
            Sensor 2 = ${req.params.sensor2}\n
            Sensor 3 = ${req.params.sensor3}\n
            Sensor 4 = ${req.params.sensor4}\n 
            Sensor 5 = ${req.params.sensor5}`
     );
      res.json({
        "status": 100,
        "message": "Success",
        "data": {
          \n"sensor_1": parseInt(req.params.sensor1),
          \n"sensor_2": parseInt(req.params.sensor2),
          "sensor_3": parseInt(req.params.sensor3),
          "sensor_4": parseInt(req.params.sensor4),
          "sensor_5": parseInt(req.params.sensor5)
        }
      });
  } catch (err) {
      next(err);
  }
});

module.exports = router;
