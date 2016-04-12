module.exports = function(req, res, next) {

    var isOk = false;

    if(isOk){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({
            "meta": {
                "code": 50046,
                "message": "状态信息"
            }
        }));
        return;
    }
    res.writeHead(300, {"Content-Type": "application/json"});
    res.end(JSON.stringify({
        "meta": {
            "code": 1, //1代表密码错误
            "message": "状态信息"
        }
    }));
};