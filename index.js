const PORT = process.env.PORT || 5000;
const TOKEN = process.env.TOKEN || '1c895e91714abb108a4482c8c93241aeda0b7d14a6346d57a4e1a2c7d4601641c46a924ed6bb62f15fef1';
const CONFIRMATION = process.env.CONFIRMATION || '52b0f97b';
//https://salty-plateau-34840.herokuapp.com/
const frases = require('./frases')
// const helpers = require('./helpers')
// const schedule = require('node-schedule');
const database = require('./database')
// const videos = require('./videos')

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const {Botact} = require('botact');


const bot = new Botact({
    confirmation: CONFIRMATION,
    token: TOKEN
});

//=====================INIT==================================

// bot.command('start', function (ctx) {
//
// });

bot.hears(/(start|Start|Старт|старт|Поехали!|поехали|Поехали|поехали!|Начинаем|Го|Go|go|го|Он сказал поехали и махнул рукой)/, function (ctx) {
    database.updateData(`users/${ctx.user_id}`, {state: 'video1_2'});
    ctx.reply(frases.video1_1);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 5000)//900000)
})

bot.hears(/(привет|Привет|Добрый день|Здравствуйте)/, function (ctx) {
    console.log(ctx.body);
    ctx.reply('Здравствуйте!\n Напишите start')
})

bot.event('group_join', ({reply}) => reply(frases.start))


//=====================TEST==================================

bot.command('getMyId', ctx => {
    ctx.reply(ctx.user_id)
})

bot.command('test', function (ctx) {
    ctx.sendMessage(ctx.user_id, frases.homeTrigger)
})


//=====================7am==================================

bot.command('7am', ctx => {
    //console.log(ctx)
    database.getData(`users/${ctx.user_id}`, function (data, error) {
        if (!error && data.state !== undefined) {
            var flag = false;
            if (data.state === 'video1_2') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video1_3'});
                ctx.reply(frases[data.state]);
            } else if (data.state === 'video1_3') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_pay'});
                ctx.reply(frases[data.state]);
            } else if (data.state === 'video5_pay') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_1'});
                ctx.reply(frases.video5_pay(ctx.user_id));
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video4_1') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video4_2'});
                            ctx.reply(frases[data.state]);
                        }
                    })
                }, 30000)//172800000)
            } else if (data.state === 'video4_2') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_3'});
                ctx.reply(frases[data.state]);
            } else if (data.state === 'video4_3') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_1_pay'});
                ctx.reply(frases[data.state]);
            } else if (data.state === 'video5_1_pay') {
                database.updateData(`users/${ctx.user_id}`, {state: 'none'});
                ctx.reply(frases.video5_1_pay(ctx.user_id));
            } else if (data.state === 'video3_2') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video6_1_pay'});
                ctx.reply(frases[data.state]);
            } else if (data.state === 'video6_1_pay') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video2_1'});
                ctx.reply(frases.video6_1_pay(ctx.user_id));
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video2_1') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video6_2_pay'});
                            ctx.reply(frases[state]);
                            setTimeout(function () {
                                ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                            }, 200)//900000);

                            setTimeout(function () {
                                database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                                    if (!error && state === 'video6_2_pay') {
                                        database.updateData(`users/${ctx.user_id}`, {state: 'none'});
                                        ctx.reply(frases.video6_1_pay(ctx.user_id));
                                    }
                                })
                            }, 30000)//172800000)

                        }
                    })
                }, 30000)//43500000 )
            }
            if (flag) {
                setTimeout(function () {
                    ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                }, 5000)//900000)
            }


        } else {
            console.log(error)
        }
    })

})


bot.command('1', function (ctx) {
    ctx.reply(frases.plan);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 5000)
})
bot.command('2', function (ctx) {
    ctx.reply(frases.aboutAuthor);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 5000)
})
bot.command('3', function (ctx) {
    ctx.reply(frases.aboutCompany);
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 5000)
})
bot.command('4', function (ctx) {
    console.log('call')
})
bot.command('stop', function (ctx) {
    ctx.sendMessage(ctx.user_id, 'bot has been stopped');
    database.updateData(`users/${ctx.user_id}`, {state: 'none'});
})

//===============================================
bot.command('onpay1', function (ctx) {
    bot.reply(ctx.user_id, frases.video5);
})
bot.command('onwatch1', function (ctx) {
    bot.reply(ctx.user_id, frases.video6_pay(ctx.user_id));
    database.updateData(`users/${ctx.user_id}`, {state: 'video3_1'});
    setTimeout(function () {
        database.getData(`users/${ctx.user_id}/state`, function (state, error) {
            if (!error && state === 'video3_1') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video3_2'});
                ctx.reply(frases[state]);
                setTimeout(function () {
                    ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                }, 5000)//900000)
            }
        })
    }, 30000)//129600000)
})
bot.command('onpay2', function (ctx) {
    bot.reply(ctx.user_id, frases.video6);
})
bot.command('onwatch2', function (ctx) {
    bot.reply(ctx.user_id, frases.video7_about);
})
//===============================================


bot.on(({reply}) => reply(frases.error))
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
//


app.use(bodyParser.json());
app.post("/", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    else if (req.body.salesjet_request) {
        // console.log(req.body);
        var ctx = req.body.data;
        switch (req.body.data.event) {
            case 'pay1':
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_1'})
                bot.reply(ctx.user_id, frases.video4)
                break;
            case 'pay2':
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_1'})
                bot.reply(ctx.user_id, frases.video5)
                break;
            case 'youtube1':
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_2'})
                bot.reply(ctx.user_id, frases.video4_1)
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video4_2') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video4_3'});
                            bot.reply(ctx.user_id, frases.video4_2);
                            setTimeout(function () {
                                ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                            }, 900000)
                        }
                    })
                }, 30000)//86400000)/
                break;
            case 'youtube2':
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_1'})
                ctx.reply(frases.video5_1)
                break;
        }
        return res.sendStatus(200)
    }
    else {
        bot.listen(req, res)
    }
});


// app.post('/', bot.listen);
app.listen(PORT);
console.log('\nbot has been started');
