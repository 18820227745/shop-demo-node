var sha1 = require('sha1');
module.exports = function(app){
    //登录页面
    app.get('/login',function(req,res){
        res.render('login');
    });
    //登录
    app.post('/login',function(req,res){
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        //查询数据库
        User.findOne({name: uname}, function(error,doc){
            if(error){
                res.send(500);
                console.log(error);
            }else if(!doc){
                req.session.error = "用户名不存在！";
                res.send(404);
            }else{
                if(req.body.upwd !== doc.password ){
                    req.session.error = "密码错误！";
                    res.send(404);
                }else{
                    req.session.user = doc;
                    res.send(200);
                }
            }
        });
    });
}