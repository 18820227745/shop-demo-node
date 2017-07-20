var sha1 = require('sha1');
module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render("register");
    });
    //解析表单，并写入数据库
    app.post("/register", function (req, res) {
        var User = global.dbHelper.getModel('user');
        var uname = req.body.username;
        // 校验参数
        try {
            if (!(uname.length >= 1 && uname.length <= 10)) {
                throw new Error('名字请限制在 1-10 个字符');
            }
            if (req.body.password !== req.body.confirmpwd) {
                throw new Error('两次输入密码不一致');
            }
        } catch (e) {
            // 注册失败
            console.log("e.message_----------",e.message);
            req.session.error = e.message;
            return res.redirect('/register');
        }
        User.findOne({ name: uname }, function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
                console.log(error);
            } else if (doc) {
                req.session.error = "用户已存在！";
                res.send(500);
            } else {
                User.create({
                    name: uname,
                    password: req.body.upwd
                }, function (error, doc) {
                    if (error) {
                        res.send(500);
                        console.log(error);
                    } else {
                        req.session.error = "用户创建成功！";
                        res.redirect("login");
                        res.send(200);
                    }
                });
            }
        });
    });
}