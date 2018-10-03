var utf8 = require('utf8');
var request = require('request');

module.exports = {
    video1_1(id, callback){
        var link = `http://видео.атм-мотивация.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video1_1&utm_term=video+lesson+1&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video1_2(id, callback){
        var link = `http://видео.атм-мотивация.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video1_2&utm_term=video+lesson+2&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video1_3(id, callback){
        var link = `http://видео.атм-мотивация.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video1_3&utm_term=video+lesson+3&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video4_1(id, callback){
        var link = `http://видео.атм-статистики.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video4_1&utm_term=video+lesson+1&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video4_2(id, callback){
        var link = `http://видео.атм-статистики.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video4_2&utm_term=video+lesson+2&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video4_3(id, callback){
        var link = `http://видео.атм-статистики.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video4_3&utm_term=video+lesson+3&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video3_1(id, callback){
        var link = `http://видео.атм-фонды.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video3_1&utm_term=video+lesson+1&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video3_2(id, callback){
        var link = `http://видео.атм-фонды.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video3_2&utm_term=video+lesson+2&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video2_1(id, callback){
        var link = `http://видео.атм-фонды.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video2_1&utm_term=video+lesson+1&id=${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },

    video5_about:"https://clck.ru/EV7VK",
    video5:"https://clck.ru/EV7VL",
    video5_1_about:"https://clck.ru/EV7VM",
    video6_about:"https://clck.ru/EV7VK",
    video6:"https://clck.ru/EV7VL",

    video6_1_about:"https://clck.ru/EV7YX",
    video6_2_about:"https://clck.ru/EV7VM",
    video7_about:"https://clck.ru/EV7VM",


    video5_pay(id, callback) {
        var link = `http://оплата.атм-гденьги.рф/checkout/162?p=0a2352e8-2758-e811-a99e-dfcd291211f5&attr=a8134ba7-d794-e811-a9a1-cd0220c5658a:${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })
    },
    video5_1_pay(id, callback) {

        var link = `http://оплата.атм-гденьги.рф/checkout/162?p=0a2352e8-2758-e811-a99e-dfcd291211f5&attr=a8134ba7-d794-e811-a9a1-cd0220c5658a:${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })

    },
    video6_pay(id, callback) {

        var link = `http://оплата.атм-интенсив.рф/checkout/246?p=52a8ba0b-d894-e811-a9a1-cd0220c5658a&attr=a8134ba7-d794-e811-a9a1-cd0220c5658a:${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })


    },
    video6_1_pay(id, callback) {

        var link = `http://оплата.атм-интенсив.рф/checkout/246?p=52a8ba0b-d894-e811-a9a1-cd0220c5658a&attr=a8134ba7-d794-e811-a9a1-cd0220c5658a:${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })

    },
    video6_2_pay(id, callback) {

        var link = `http://оплата.атм-интенсив.рф/checkout/246?p=52a8ba0b-d894-e811-a9a1-cd0220c5658a&attr=a8134ba7-d794-e811-a9a1-cd0220c5658a:${id}`;
        request('https://clck.ru/--?url=' + utf8.encode(link), function (error, response, body) {
            callback((error !== null) ? link : body)
        })


    },

}