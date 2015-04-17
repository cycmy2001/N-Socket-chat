"use strict";
var net = require('net');
var ByteBuffer = require('ByteBuffer');
var command = require('./command');

var common = require('./protocolUtil');
var protocol = require('./protocol');

module.exports = function (socketio,namespace) {

    namespace.on("connection",function(socket){
        var kdglClient = getDataStream(socket, 7001);
        socket.on("message",function(data){

            console.log("afaf"+data);
            kdglClient.write(data);

            //var kdCommon = new common();
            //var kdPro = new protocol(command.EnumCmmand.CERTMD,buffer);
            //console.log(kdCommon.bufferToBytes(kdPro.toBuffer(false)));

            //var b1 = new Buffer('abc123');
            //var rbuf = new ByteBuffer(b1).littleEndian();
            //var arr = rbuf.byteArray(null,b1.length).unpack();
            //console.log(arr);

        });
        console.log("连接");
        socket.on("disconnect",function(){
           kdglClient.destroy();
           console.log("断开");
        });

    });

    function getDataStream(socket, port) {
        var dataStream = net.createConnection(port);
        dataStream.setEncoding("utf8");
        dataStream.setKeepAlive(true);

        dataStream.on('error', function(error){
            socket.emit('tcp_error',{message:"Data Connection Error "+ error});
        });

        dataStream.on('connect', function(){
            socket.emit('tcp_connected',{message:"Data Source Connected"});
        });

        dataStream.on('timeout', function(){
            socket.emit('tcp_timeout',{message:"timeout"});
        });

        dataStream.on('data', function(data) {
            //console.log(data);
            socket.emit('tcp_data', data);
        });
        return dataStream;
    }


};
