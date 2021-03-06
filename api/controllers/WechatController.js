/**
 * WechatController
 *
 * @description :: Server-side logic for managing wechats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var wechat = require('wechat');
var config = {
    token: 'exorics',
    appid: 'wxee589af12e8907a9',
    encodingAESKey: 'GCRRoGYSMirSCQkxbTIPdg4F4oE0jlRddCtBtHcucjj',
    appsecret: '183ccffb841f9f20bae3027ef9e63647'
};


module.exports = {
    index: wechat(config, function(req, res, next) {
        // 微信输入信息都在req.weixin上
        var message = req.weixin;
        if (message.FromUserName === 'diaosi') {
            // 回复屌丝(普通回复)
            res.reply('hehe');
        } else if (message.FromUserName === 'text') {
            //你也可以这样回复text类型的信息
            res.reply({
                content: 'text object',
                type: 'text'
            });
        } else if (message.FromUserName === 'hehe') {
            // 回复一段音乐
            res.reply({
                type: "music",
                content: {
                    title: "来段音乐吧",
                    description: "一无所有",
                    musicUrl: "http://mp3.com/xx.mp3",
                    hqMusicUrl: "http://mp3.com/xx.mp3",
                    thumbMediaId: "thisThumbMediaId"
                }
            });
        } else {
            // 回复高富帅(图文回复)
            res.reply([{
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }]);
        }
    }),
    send: function(req, res) {

        var WechatAPI = require('wechat-api');

        var api = new WechatAPI(config.appid, config.appsecret);

        console.log(api);

        api.massSendText('你好', ['owriatyR-39JKfuzKlEj7FjYXtQ4'], function(err, result) {
            console.log(result);
            return res.ok("ok" + result);
        });


    }

};
