"use strict";
var
    ByteBuffer = require('ByteBuffer'),
    ProtocolUtil = require('./protocolUtil'),
    Protocol = require('./protocol');

module.exports = exports = Receive;

function Receive(BufferStream,client){

    console.log(BufferStream.getBuffer());

    var _protocolUtil = new ProtocolUtil();
    var bufferEnd = _protocolUtil.createByteBuffer().byteArray([0x4F, 0x4E, 0x45, 0x53], 4).pack();
    BufferStream.split(bufferEnd);
    BufferStream.on('split', function (chunk, token) {
        console.log("*****************************");
        console.log(token);
        console.log(chunk);
        console.log("*****************************");
    });

    client.on('sendbuffer',function(buffer){
        console.log(buffer);
    });
}