/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */
var mime = function(req) {
  var str = req.headers['content-type'] || ''
    , i = str.indexOf(';');
  return ~i ? str.slice(0, i) : str;
};

module.exports.http = {

    /****************************************************************************
     *                                                                           *
     * Express middleware to use for every Sails request. To add custom          *
     * middleware to the mix, add a function to the middleware config object and *
     * add its key to the "order" array. The $custom key is reserved for         *
     * backwards-compatibility with Sails v0.9.x apps that use the               *
     * `customMiddleware` config option.                                         *
     *                                                                           *
     ****************************************************************************/

    middleware: {

        /***************************************************************************
         *                                                                          *
         * The order in which middleware should be run for HTTP request. (the Sails *
         * router is invoked by the "router" middleware below.)                     *
         *                                                                          *
         ***************************************************************************/

        order: [
            'startRequestTimer',
            'cookieParser',
            'session',
            'myRequestLogger',
            'reqquestWrap',
            'bodyParser',
            'handleBodyParserError',
            'compress',
            'methodOverride',
            'poweredBy',
            '$custom',
            'router',
            'www',
            'favicon',
            '404',
            '500'
        ],

        /****************************************************************************
         *                                                                           *
         * Example custom middleware; logs each request to the console.              *
         *                                                                           *
         ****************************************************************************/

        myRequestLogger: function(req, res, next) {
            console.log("Requested :: ", req.method, req.url);

            return next();
        },

        reqquestWrap : function(req, res, next){
            console.log(req.headers['content-length']);
            if ('GET' == req.method || 'HEAD' == req.method) return next();
            if ('text/xml' != mime(req)) return next();
            var reqData = [];
            var size = 0;
            req.on('data', function(data) {
                console.log('>>>req on'+data);
                reqData.push(data);
                size += data.length;
                
                if(size == req.headers['content-length']){
                    req.rawBody = Buffer.concat(reqData, size);
                    return next();
                }
                
            });
            req.on('end', function() {
                req.rawBody = Buffer.concat(reqData, size);
                return next();
            });
        },

        /***************************************************************************
         *                                                                          *
         * The body parser that will handle incoming multipart HTTP requests. By    *
         * default as of v0.10, Sails uses                                          *
         * [skipper](http://github.com/balderdashy/skipper). See                    *
         * http://www.senchalabs.org/connect/multipart.html for other options.      *
         *                                                                          *
         ***************************************************************************/

        // bodyParser: {
        //      fn: function(req, res, next) {
        //          console.log(arguments);
        //          var reqData = [];
        //          var size = 0;
        //          // req.addListener('data', function(data) {
        //          //     console.log('>>>req on');
        //          //     reqData.push(data);
        //          //     req.rawBody = data;
        //          //     size += data.length;
        //          //     return next();
        //          // });
        //          // req.addListener('end', function() {
        //          //     req.reqData = Buffer.concat(reqData, size);
        //          //     return next();
        //          // });

        //      }
        // }


    } ,

    /***************************************************************************
     *                                                                          *
     * The number of seconds to cache flat files on disk being served by        *
     * Express static middleware (by default, these files are in `.tmp/public`) *
     *                                                                          *
     * The HTTP static cache is only active in a 'production' environment,      *
     * since that's the only time Express will cache flat-files.                *
     *                                                                          *
     ***************************************************************************/

    // cache: 31557600000
    // customMiddleware: function(app) {
    //     console.log(arguments);
    //     var wechat = require('wechat');
    //     var config = {
    //         token: 'exorics',
    //         appid: 'wxee589af12e8907a9',
    //         encodingAESKey: 'GCRRoGYSMirSCQkxbTIPdg4F4oE0jlRddCtBtHcucjj'
    //     };

    //     app.use(function(req,res,next){

    //         var reqData = [];
    //         var size = 0;
    //         req.on('data', function(data) {
    //             console.log('>>>req on'+data);
    //             reqData.push(data);
    //             size += data.length;
    //             req.rawBody = data;
    //             return next();
    //         });
    //         req.on('end', function() {
    //             req.reqData = Buffer.concat(reqData, size);
    //             return next();
    //         });

    //     });
    //     app.use('/wechat',wechat(config, function(req, res, next) {
    //         console.log(111112);
    //         // 微信输入信息都在req.weixin上
    //         var message = req.weixin;
    //         if (message.FromUserName === 'diaosi') {
    //             // 回复屌丝(普通回复)
    //             res.reply('hehe');
    //         } else if (message.FromUserName === 'text') {
    //             //你也可以这样回复text类型的信息
    //             res.reply({
    //                 content: 'text object',
    //                 type: 'text'
    //             });
    //         } else if (message.FromUserName === 'hehe') {
    //             // 回复一段音乐
    //             res.reply({
    //                 type: "music",
    //                 content: {
    //                     title: "来段音乐吧",
    //                     description: "一无所有",
    //                     musicUrl: "http://mp3.com/xx.mp3",
    //                     hqMusicUrl: "http://mp3.com/xx.mp3",
    //                     thumbMediaId: "thisThumbMediaId"
    //                 }
    //             });
    //         } else {
    //             // 回复高富帅(图文回复)
    //             res.reply([{
    //                 title: '你来我家接我吧',
    //                 description: '这是女神与高富帅之间的对话',
    //                 picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
    //                 url: 'http://nodeapi.cloudfoundry.com/'
    //             }]);
    //         }
    //     }));
    // },

};
