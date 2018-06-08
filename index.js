const PORT = process.env.PORT || 5000;
const TOKEN = '1c895e91714abb108a4482c8c93241aeda0b7d14a6346d57a4e1a2c7d4601641c46a924ed6bb62f15fef1';
const CONFIRMATION = '52b0f97b';

const frases = require('./frases')
const helpers = require('./helpers')
const schedule = require('node-schedule');
const database = require('./database')
const videos = require('./videos')

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const {Botact} = require('botact');


const bot = new Botact({
    confirmation: CONFIRMATION,
    token: TOKEN
});


bot.command('start', function (ctx) {
    database.updateData(`users/${ctx.user_id}`, {state: 'video2'});
    ctx.reply(frases.video1);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 900000)
});





bot.command('getMyId', ctx => {
    ctx.reply(ctx.user_id)
})

bot.command('7am', ctx => {
    console.log(ctx)
    database.getData(`users/${ctx.user_id}`, function (data, error) {
        if (!error && data.state !== undefined) {
            var flag = false;
            if (data.state === 'video2') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video3'});
                ctx.reply(frases[data.state]);
                flag = true;
            } else if (data.state === 'video3') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video3npPay1'});
                ctx.reply(frases[data.state]);
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video3npPay1') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video3npPay2'});
                            ctx.reply(frases.noPayVideo3_1);

                            setTimeout(function () {
                                database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                                    if (!error && state === 'video3npPay2') {
                                        database.updateData(`users/${ctx.user_id}`, {state: 'video3npPay3'});
                                        ctx.reply(frases.noPayVideo3_2);
                                        setTimeout(function () {
                                            ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                                        }, 900000)
                                    }
                                })
                            }, 5000)//43200000)

                        }
                    })
                }, 5000)//43200000)
            }
            else if (data.state === 'video3npPay3') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video3npPay4'});
                ctx.reply(frases.noPayVideo3_3);
            } else if (data.state === 'video3npPay4') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video3npPay5'});
                ctx.reply(frases.noPayVideo3_4);
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video3npPay5') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video3'});
                            ctx.reply(frases.noPayVideo3_5);
                        }
                    })
                }, 5000)//43200000)
            }


            else if (data.state === 'video4_3') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_4'});
                ctx.reply(frases.video4_3);
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video4_4') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video4_5'});
                            ctx.reply(frases.video4_4);

                            setTimeout(function () {
                                database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                                    if (!error && state === 'video4_5') {
                                        database.updateData(`users/${ctx.user_id}`, {state: 'video4_6'});
                                        ctx.reply(frases.video4_5);
                                        setTimeout(function () {
                                            ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                                        }, 900000)
                                        setTimeout(function () {
                                            database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                                                if (!error && state === 'video4_6') {
                                                    database.updateData(`users/${ctx.user_id}`, {state: 'video4_3'});
                                                    ctx.reply(frases.video4_6);
                                                }
                                            })
                                        }, 5000)//43200000)
                                    }
                                })
                            }, 5000)//43200000)

                        }
                    })
                }, 5000)//43200000)

            } else if (data.state === 'video6') {
                console.log('12 hour timer')
            }
            if (flag) {
                setTimeout(function () {
                    ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                }, 900000)
            }


        } else {
            console.log(error)
        }
    })

})

bot.command('test', function (ctx) {
    ctx.sendMessage(ctx.user_id, frases.homeTrigger)
})

bot.command('1', function (ctx) {
    ctx.reply(frases.plan);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 2000)
})
bot.command('2', function (ctx) {
    ctx.reply(frases.aboutHelp);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 2000)
})
bot.command('3', function (ctx) {
    ctx.reply(frases.difference);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 2000)
})

bot.command('4', function (ctx) {

    console.log('call')
})

bot.hears(/(привет|Привет|Добрый день|Здравствуйте)/, function (ctx) {
    console.log(ctx.body);
    ctx.reply('Здравствуйте!\n Напишите start')
})


bot.event('group_join', ({reply}) => reply(frases.start))
bot.on(({reply}) => reply('К сожалению, я не распознала ваш запрос, только учусь общаться с людьми)\n' +
    '\n' +
    'Ваше сообщение передано менеджеру, часы работы с 9:00 до 19:00 (GMT +3) в рабочи дни. '))


// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
//

app.use(bodyParser.json());
app.post("/", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    else if(req.body.salesjet_request) {
        // console.log(req.body);
       var ctx = req.body.data;
        switch(req.body.data.event){
            case 'pay1':
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_1'})
                bot.reply(ctx.user_id,frases.video4)
                break;
            case 'pay2':
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_1'})
                bot.reply(ctx.user_id,frases.video5)
                break;
            case 'youtube1':
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_2'})
                bot.reply(ctx.user_id,frases.video4_1)
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video4_2') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video4_3'});
                            bot.reply(ctx.user_id,frases.video4_2);
                            setTimeout(function () {
                                ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                            }, 900000)
                        }
                    })
                }, 5000)//86400000)/
                break;
            case 'youtube2':
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_1'})
                ctx.reply(frases.video5_1)
                break;
        }
        bot.command('pay1', ctx => {

        })
        bot.command('pay2', ctx => {

        })
        bot.command('youtube2', ctx => {

        })

        bot.command('youtube', ctx => {

        })
        return res.sendStatus(200)
    }
    else{
        bot.listen(req, res)
    }
});
// app.post('/', bot.listen);
app.listen(PORT);
console.log('\nbot has been started');
