var utf8 = require('utf8');
var request = require('request');

module.exports = {
    video1_1: 'https://goo.gl/u5mqca',//http://видео.атм-мотивация.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video1_1&utm_term=video+lesson+1',
    video1_2: 'https://goo.gl/v8AFJJ',//http://видео.атм-мотивация.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video1_2&utm_term=video+lesson+2',
    video1_3: 'https://goo.gl/6CnkkL',//http://видео.атм-мотивация.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video1_3&utm_term=video+lesson+3',
    video5_about: 'https://goo.gl/iJau6M',//http://атм-гденьги.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video5_about&utm_term=about+gdengi+1',
    video4_1: 'https://goo.gl/CwVYKT',//http://видео.атм-статистики.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video4_1&utm_term=video+lesson+1',
    video4_2: 'https://goo.gl/vp1Lbg',//http://видео.атм-статистики.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video4_2&utm_term=video+lesson+2',
    video4_3: 'https://goo.gl/vG2poq',//http://видео.атм-статистики.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video4_3&utm_term=video+lesson+3',
    video5: 'https://goo.gl/ycDBgT',//http://видео.атм-гденьги.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video5&utm_term=gdengi_watch',
    video5_1_about: 'https://goo.gl/LSFF2Q',//http://атм-гденьги.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video5_1_about&utm_term=about+gdengi+2',
    video6_about: 'https://goo.gl/rCmiMk',//http://атм-интенсив.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video6_about&utm_term=about_intensiv+1',
    video3_1: 'https://goo.gl/imv5Nx',//http://видео.атм-фонды.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video3_1&utm_term=video+lesson+1',
    video6: 'https://goo.gl/gvnwob',//http://видео.атм-гденьги.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video6&utm_term=intensiv_watch',
    video3_2: 'https://goo.gl/SJ2LVD',//http://видео.атм-фонды.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video3_2&utm_term=video+lesson+2',
    video6_1_about: 'https://goo.gl/DqxVu5',//http://атм-интенсив.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video6_1_about&utm_term=about_intensiv+2',
    video2_1: 'https://goo.gl/h26rZG',//http://видео.атм-фонды.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video2_1&utm_term=video+lesson+1',
    video6_2_about: 'https://goo.gl/i9Cf8m',//http://атм-интенсив.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video6_2_about&utm_term=about_intensiv+3',
    video7_about: 'https://goo.gl/1kqtPY',//http://финансовое-планирование.рф/?utm_source=vk&utm_medium=message&utm_campaign=funnel_1&utm_content=video7_about&utm_term=about_fp',


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