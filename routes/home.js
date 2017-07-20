 var testController=require('../middlewares/testController');
//将检查登录封装成中间件
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: '../public/' });
var checkLogin = require('../middlewares/check').checkLogin;
module.exports = function (app){
    //home页面为登录时可以直接浏览
    app.get('/home',function(req,res){
            var Commodity = global.dbHelper.getModel("commodity");
            var login = {
                href:'/login',
                message: '登 录'
            };
            if (req.session.user) {
                login.href='/logout';
                login.message='退 出';
            }
            Commodity.find({},function(error,docs){
                res.render('home',{Commoditys:docs,login:login});
            });
    });
    //添加商品页
    app.get('/addcommodity',checkLogin,function(req,res){
        //render可以带变量，渲染页面
        res.render("addcommodity");
    });
    //添加商品
    app.post('/addcommodity',checkLogin,multipartMiddleware, function(req,res){
        var Commodity = global.dbHelper.getModel("commodity");
        Commodity.create({
            name: req.body.name,
            price: req.body.price,
            price: req.body.price,
            imgSrc: req.body.imgSrc
        },function(error,doc){
            if(doc){
                res.send(200);
            }else{
                res.send(404);
            }
        })
    });
}