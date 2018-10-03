const PORT = process.env.PORT || 5000;
const TOKEN = process.env.TOKEN || '1c895e91714abb108a4482c8c93241aeda0b7d14a6346d57a4e1a2c7d4601641c46a924ed6bb62f15fef1';
const CONFIRMATION = process.env.CONFIRMATION || '52b0f97b';


// https://nameless-badlands-65161.herokuapp.com/

const frases = require('./frases')
const database = require('./database')

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const {Botact} = require('botact');

const bot = new Botact({
    confirmation: CONFIRMATION,
    token: TOKEN
});

// var cache = require('memory-cache');
// var newCache = new cache.Cache();
//=====================INIT==================================


bot.hears(/(start|Start|Старт|старт|Поехали!|поехали|Поехали|поехали!|Начинаем|Го|Go|go|го|Он сказал поехали и махнул рукой)/, function (ctx) {
    database.updateData(`users/${ctx.user_id}`, {state: 'video1_2'});
    frases.video1_1(ctx.user_id, function (link) {
        ctx.reply(link)
    });
    setTimeout(function () {
        ctx.sendMessage(ctx.user_id, frases.homeTrigger)
    }, 5000)//900000)
})

bot.hears(/(привет|Привет|Добрый день|Здравствуйте)/, function (ctx) {
    // console.log(ctx.body);
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
                frases.video1_2(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
            } else if (data.state === 'video1_3') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_pay'});
                frases.video1_3(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
            } else if (data.state === 'video5_pay') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_1'});
                frases.video5_pay(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
                // ctx.reply('start 30sec timer');
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video4_1') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video4_2'});
                            frases.video4_1(ctx.user_id, function (link) {
                                ctx.reply(link)
                            });
                        }
                    })
                }, 30000)//172800000)
            } else if (data.state === 'video4_2') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video4_3'});
                frases.video4_2(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
            } else if (data.state === 'video4_3') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video5_1_pay'});
                frases.video4_3(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
            } else if (data.state === 'video5_1_pay') {
                database.updateData(`users/${ctx.user_id}`, {state: 'none'});
                frases.video5_1_pay(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
            } else if (data.state === 'video3_2') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video6_1_pay'});
                frases.video3_2(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
            } else if (data.state === 'video6_1_pay') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video2_1'});
                frases.video6_1_pay(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
                setTimeout(function () {
                    database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                        if (!error && state === 'video2_1') {
                            database.updateData(`users/${ctx.user_id}`, {state: 'video6_2_pay'});
                            frases.video2_1(ctx.user_id, function (link) {
                                ctx.reply(link)
                            });
                            setTimeout(function () {
                                ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                            }, 200)//900000);

                            setTimeout(function () {
                                database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                                    if (!error && state === 'video6_2_pay') {
                                        database.updateData(`users/${ctx.user_id}`, {state: 'none'});
                                        frases.video6_2_pay(ctx.user_id, function (link) {
                                            ctx.reply(link)
                                        });
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
    ctx.reply(frases.aboutAuthor);
})
bot.command('2', function (ctx) {
    ctx.reply(frases.aboutCompany);
})

bot.command('3', function (ctx) {
    ctx.reply('Напишите команду call и свой номер телефона в формате (call 89001112233)');
    bot.use(ctx => ctx.phone = true)
})

bot.hears(/(call)/, function (ctx) {
    if (ctx.body.split("call ")[1]) {
        var date = new Date()
        console.log(date.getTimezoneOffset())

        ctx.reply("Вам перезвонят!");
        database.pushData('backCalls/', {
            url: `https://vk.com/id${ctx.user_id}`,
            time: date.getTime(),
            phone: (ctx.body.split("call ")[1] || "-")
        })
    }else {
        ctx.reply("Попробуйте еще раз :c");

    }
})


bot.command('Stop', function (ctx) {
    ctx.sendMessage(ctx.user_id, 'Бот был остановлен');
    database.updateData(`users/${ctx.user_id}`, {state: 'none'});
})

//===============================================
bot.command('onpay1', function (ctx) {
    bot.reply(ctx.user_id, frases.video5);
})
bot.command('onwatch1', function (ctx) {
    frases.video6_pay(ctx.user_id, function (link) {
        ctx.reply(link)
    });
    database.updateData(`users/${ctx.user_id}`, {state: 'video3_1'});
    setTimeout(function () {
        database.getData(`users/${ctx.user_id}/state`, function (state, error) {
            if (!error && state === 'video3_1') {
                database.updateData(`users/${ctx.user_id}`, {state: 'video3_2'});
                frases.video3_1(ctx.user_id, function (link) {
                    ctx.reply(link)
                });
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


app.use(bodyParser.json());
app.post("/", function (req, res) {
    try {
        // console.log(req.body);
        if (!req.body || req.body === {}) return res.sendStatus(400);
        else if (req.body.salesjet_request) {
            var ctx = req.body.data;
            ctx.user_id = +ctx.user_id;
            switch (req.body.data.event) {
                case 'pay1':
                    bot.reply(ctx.user_id, frases.video5);
                    break;
                case 'pay2':
                    bot.reply(ctx.user_id, frases.video6);
                    break;
                case 'watch1':
                    frases.video6_pay(ctx.user_id, function (link) {
                        ctx.reply(link)
                    });
                    database.updateData(`users/${ctx.user_id}`, {state: 'video3_1'});
                    setTimeout(function () {
                        database.getData(`users/${ctx.user_id}/state`, function (state, error) {
                            if (!error && state === 'video3_1') {
                                database.updateData(`users/${ctx.user_id}`, {state: 'video3_2'});
                                frases.video3_1(ctx.user_id, function (link) {
                                    ctx.reply(link)
                                });
                                setTimeout(function () {
                                    ctx.sendMessage(ctx.user_id, frases.homeTrigger)
                                }, 5000)//900000)
                            }
                        })
                    }, 30000)//129600000)
                    break;
                case 'watch2':
                    bot.reply(ctx.user_id, frases.video7_about);
                    break;
            }
            return res.sendStatus(200)
        }
        else {
            bot.listen(req, res)
        }

    }
    catch (e) {
        bot.reply('394439978', e.toString())
    }

});


app.listen(PORT);
console.log('\nbot has been started');





