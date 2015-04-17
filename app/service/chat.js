"use strict";
//参照:http://www.cnblogs.com/Wayou/p/hichat_built_with_nodejs_socket.html
var helper = require('./helper');

module.exports = function (socketio,namespace) {
    var sessions = {};
    var clients = {};
    namespace.on("connection",function(socket){
        //存储连接的信息
        var sid = socket.id;
        var session = {
            socket:socket
        };
        var client = {
            key:sid,
            text:helper.randomString(3)
        };
        session.client = client;

        //存储连接信息集合
        sessions[sid] = session;
        clients[sid] = client;

        //发送广播，通知所有连接的客户端
        namespace.emit("public client connection",client);

        //发送广播，通知所有连接的客户端(所有连接的客户端对象数组)
        namespace.emit("public clients",clients);

        console.log("User connected.sid="+sid);

        socket.on("disconnect",function(){
            var sid = socket.id;
            if (!sid) return;
            console.log("User disconnect.sid="+sid);
            namespace.emit('public client disconnect', clients[sid]);
            delete sessions[sid];
            delete clients[sid];
        });

        socket.on("private message send",function(message,sendSocketKey,fun){
            var session = sessions[sendSocketKey];
            if(session){
                namespace.to(sendSocketKey).emit("private message rev",message);
                fun(message);
            }else{
                fun(session.client.text+" 不在线，发送失败。");
            }
        });
        socket.on("public message send",function(message){
            namespace.emit('public message rev', message);
        });
    });
};

