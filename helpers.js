// const request = require('request');
// const kb = require('./keyboard-buttons')
// const frases = require('./frases');
// const keyboards = require('./keyboard.js');
// const database = require('./database');
const frases = require('./frases');

// const PORT = '80';
const TOKEN = '1c895e91714abb108a4482c8c93241aeda0b7d14a6346d57a4e1a2c7d4601641c46a924ed6bb62f15fef1';
// const CONFIRMATION = '52b0f97b';

const vkapi = require('node-vkapi');
const vkapiBot = new vkapi({
    accessToken: TOKEN,// <String> Ключ доступа
    apiVersion: '5.68',         // <String> Версия API
    appId: null,           // <Number> ID приложения ВКонтакте
    appSecret: null,           // <String> Секретный ключ приложения ВКонтакте
    captchaApiKey: null,           // <String> API ключ сервиса по распознаванию капчи
    captchaService: 'anti-captcha', // <String> Сервис по распознаванию капчи (anti-captcha, antigate, rucaptcha)
    userLogin: null,           // <String> Логин пользователя
    userPassword: null            // <String> Пароль пользователя
});

/*git rm -r --cached FolderName
git commit -m "Removed folder from repository"
git push origin master*/

module.exports = {
    getLastMessages(id, count, callback) {
        vkapiBot.call('messages.getHistory', {
            count: count,
            user_id: id
        }).then(msg => {
            var out = [];
            console.log(msg)

            for (var i = 0; i < msg.items.length; i++)
                out.push(msg.items[i].body);
            callback(out, null);
        }).catch(error => {
            callback(null, error)
        })
    },
    getBotMessages(id, count, callback) {
        vkapiBot.call('messages.getHistory', {
            count: count,
            user_id: id
        }).then(msg => {
            var out = [];
            // console.log(msg)
            for (var i = 0; i < msg.items.length; i++) {
                if (msg.items[i].user_id !== msg.items[i].from_id)
                    out.push(msg.items[i].body);
            }
            // console.log(out)
            callback(out, null);
        }).catch(error => {
            callback(null, error)
        })
    },
    getNewCode(state) {
        return 'video' + (+state.substr(5, 1) + 1)
    }
    // warmingUp(bot,firebase,id,delay,message,data,next) {
    //      setTimeout( function () {
    //              firebase.database().ref('users/' + id+'/state').once("value", function (snapshot) {
    //                  var state = snapshot.val();
    //                  // console.log('-'+state+'-'+data)
    //                  if(state === data){
    //
    //                      if(data === 'video4' || data === 'video5' || data === 'video6'){
    //                          bot.sendMessage(id,message,{
    //                              reply_markup: {
    //                                  inline_keyboard: [
    //                                      [{
    //                                          text: 'Да',
    //                                          callback_data:  'HaveYouWatched_'+next
    //                                      }],
    //                                      [{
    //                                          text: 'Нет',
    //                                          callback_data: data
    //                                      }]
    //                                  ]
    //                              }
    //                          })
    //                      }else{
    //                          bot.sendMessage(id,message,keyboard.getWarmingTemplate(next,data))
    //                      }
    //                  }
    //              }, function (errorObject) {
    //                  console.log("The read failed: " + errorObject);
    //              });
    //          },
    //          delay,
    //          data,
    //          message,
    //          next
    //      );
    //  },
    // sendTriggerVideo(bot, id, callback) {
    //     database.getData(`users/${id}`, function (data, error) {
    //         if (!error && data.state !== undefined) {
    //             var newCode = getNewCode(data.state);
    //             database.updateData(`users/${id}`, {state: newCode});
    //             bot.sendMessage(id, frases[data.state], keyboards[data.state]);
    //             callback(newCode, null)
    //         } else {
    //             callback(null, true)
    //         }
    //     })
    // },
    // setWarmingUp(bot, id, state, time, text, key) {
    //     database.updateData(`users/${id}`, {state: state})
    //     setTimeout(function () {
    //         database.getData(`users/${id}`, function (data, error) {
    //             if (!error && data.state == state) {
    //                 console.log(state)
    //                 bot.sendMessage(id, text, key)
    //             } else {
    //                 console.log('warming up is not sended state: ' + state)
    //             }
    //         })
    //     }, time)
    // },
    // onPay(bot,id){
    //     database.getData(`users/${id}`, function (data, error) {
    //         if (!error && data.state !== undefined) {
    //             var newCode = getNewCode(data.state);
    //             database.updateData(`users/${id}`, {state: newCode});
    //             bot.sendMessage(id, frases[data.state], keyboards[data.state]);
    //             callback(newCode, null)
    //         } else {
    //             callback(null, true)
    //         }
    //     })
    // }
}

function getNewCode(state) {
    return 'video' + (+state.substr(5, 1) + 1)
}
