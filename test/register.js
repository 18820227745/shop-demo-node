var path = require('path');
var assert = require('assert');
var request = require('supertest');
var sha1 = require('sha1');
var app = require('../app');
var User = global.dbHelper.getModel('user');

var testName1 = 'testName2';
var testName2 = 'nswbmw2';
describe('login', function () {
    describe('POST /register', function () {
        var agent = request.agent(app);//persist cookie when redirect
        beforeEach(function (done) {
            // 创建一个用户
            User.create({
                name: testName1,
                password: "123456"
            }, function (error, doc) {
                if (error) {
                    done;
                    console.log(error);
                } else {
                    done();
                    console.log("Successfully created user");
                }
            });

        });

        afterEach(function (done) {
            // 删除测试用户
            User.remove({ name: { $in: [testName1, testName2] } }, function (error) {
                if (error) {
                    done;
                    console.log(error);
                } else {
                    done();
                    console.log("Delete success! ");
                }
            });
        });

        // 名户名错误的情况
        it('wrong name', function (done) {
            agent
                .post('/register')
                .type('form')
                .field({ username: '666', password: '666', confirmpwd: '666' })
                .redirects()
                .end(function (err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/名字请限制在 1-10 个字符/));
                    done();
                });
        });

        // 其余的参数测试自行补充
        // 用户名被占用的情况
        // it('duplicate name', function (done) {
        //     agent
        //         .post('/register')
        //         .type('form')
        //         .field({"username":testName1,password:'123456',confirmpwd:'123456'})
        //         .redirects()
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             assert(res.text.match(/用户已存在/));
        //             done();
        //         });
        // });

        // 注册成功的情况
        // it('success', function (done) {
        //     agent
        //         .post('/signup')
        //         .type('form')
        //         .field({"username":testName2,password:'123456',confirmpwd:'123456'})
        //         .redirects()
        //         .end(function (err, res) {
        //             if (err) return done(err);

        //             assert(res.text.match(/用户创建成功/));
        //             done();
        //         });
        // });
    });
});