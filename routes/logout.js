module.exports = function ( app ) {
    //退出登录
    app.get('/logout', function(req, res){
        req.session.user = null;
        req.session.error = null;
        res.redirect('/home');
    });
}