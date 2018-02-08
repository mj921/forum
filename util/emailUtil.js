// emailUtil.js
var nodemailer = require('nodemailer');
var EmailUtil = {};
var transporter = nodemailer.createTransport({
    service:"qq",
    port:"465",
    secureConnection: true, // 使用 SSL
    auth: {
        user: '373002712@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'skikytufixgfcbab'
    }
});

// var mailOptions = {
//     from: '373002712@qq.com', // 发件地址
//     to: '1518261999@qq.com', // 收件列表
//     subject: 'Hello Girl', // 标题
//     //text和html两者只支持一种
//     text: 'Hello Girl ?', // 标题
//     html: '<b>Hello Girl ?</b>' // html 内容
// };

EmailUtil.sendMail = function(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log(/*'Message sent: ' + */info/*.response*/);
    });
}
module.exports = EmailUtil;