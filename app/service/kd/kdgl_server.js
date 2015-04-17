var net = require('net');
var Lodash = require('lodash');
var Crypto = require('crypto');
var CronJob = require("cron").CronJob;
var BufferStream = require('bufferstream');

var Command = require('./command');
var ProtocolUtil = require('./protocolUtil');
var Protocol = require('./protocol');
var Receive = require('./receive');

module.exports = kdglServer;

function kdglServer(port) {
    var server = net.createServer(),
        tankList = [],
        webList = [];
    //启动
    this.start = function () {
        server.on('connection', function (client) {
            new Connection(client);
        }).listen(port, function () {
            console.log("kdgl tcp server 启动");
        });
    };
    function Connection(client) {
        console.log("为客户端连接添加");
        //为客户端连接添加name
        client.name = client.remoteAddress + ':' + client.remotePort;
        cacheClient(client,true);

        //console.log(client);

        client.on('data', function (data) {
            processReceive(this,data);
        });

        //客户端中止与服务端连接的时候发生。
        client.on('end', function () {
            console.log("删除数组中的制定元素。" + client.name);
            cacheClient(this,false);
        });

        //客户端中止与服务端连接的时候发生。
        client.on('error', function (err) {
            console.log(arguments);
            console.log(err.code);
        });


        function processReceive(client,data){
            var cwb = Lodash.find(webList, client);
            ///console.log(cwb.writable);
            if(cwb && cwb.writable){
                console.log("cw "+data);

                Lodash.forEach(tankList, function(t) {
                    if(t && t.writable){
                        t.write("a"+ cwb.name);
                        t.on('data', function (data) {
                            console.log("rev :"+ t.name+":"+data);
                            if(cwb && cwb.writable){
                                cwb.write("rev :"+ t.name+":"+data+":"+cwb.name);
                            }
                        });

                    }
                });

            }else{
                var ct = Lodash.find(tankList, client);
                if(ct && ct.writable){
                    console.log("ct :"+ client.name+":"+data);
                }
            }
        }

        function cacheClient(client,doSave){
            if (Lodash.includes(client.name, "127.0.0.1")) {
                if(doSave){
                    webList.push(client);
                }else{
                    Lodash.remove(webList,client);
                    client.destroy();
                }
            } else {
                if(doSave){
                    tankList.push(client);
                }else{
                    Lodash.remove(tankList,client);
                    client.destroy();
                }
            }
            console.log(webList.length);
            console.log(tankList.length);
        }



    }



}


//////产生随机数4位byte数组
//Crypto.randomBytes(4, function (ex, buf) {
//    var buffer = protocolUtil.createByteBuffer()
//        .byteArray([1, protocolUtil.takeBack(1), 0, 0], 4)
//        .byteArray(protocolUtil.bufferToBytes(buf), 4)
//        .pack();
//    console.log(protocolUtil.bufferToBytes(buffer));
//    var kdPro = new Protocol(Command.EnumCmmand.CERTMD, buffer);
//    var sendBuffer = kdPro.toBuffer(true);
//    //console.log(protocolUtil.bufferToBytes(sendBuffer));
//
//    client.write(sendBuffer);
//    client.emit('sendbuffer', sendBuffer);
//});
