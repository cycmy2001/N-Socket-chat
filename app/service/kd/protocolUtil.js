"use strict";
var ByteBuffer = require('ByteBuffer');
module.exports = exports = protocolUtil;

function protocolUtil() {

    this.PacketLen = 22;

    this.createByteBuffer = function () {
        return new ByteBuffer().littleEndian();
    };
    this.strToBuffer = function (s) {
        return new Buffer(s, 'utf8');
    };
    this.len = function (s) {
        return Buffer.byteLength(s, 'utf8');
    };
    this.bufferToBytes = function (buf) {
        var rbuf = new ByteBuffer(buf).littleEndian();
        var arr = rbuf.byteArray(null,buf.length).unpack();
        return arr[0];
    };
    this.bytesToBuffer = function (bytes) {
        return this.createByteBuffer().byteArray(bytes,bytes.length).pack();
    };

    this.int32ToShort = function (v) {
        var sbuf = this.createByteBuffer();
        var buffer = sbuf.int32(v).pack();
        var rbuf = new ByteBuffer(buffer).littleEndian();
        var arr = rbuf.short().unpack();
        return arr[0];
    };
    this.int32ToUshort = function(v) {
        var sbuf = new ByteBuffer().littleEndian();
        var buffer = sbuf.int32(v).pack();
        var rbuf = new ByteBuffer(buffer).littleEndian();
        var arr = rbuf.ushort().unpack();
        return arr[0];
    };

    this.shortToBuffer = function (v) {
        var sbuf = new ByteBuffer().littleEndian();
        return sbuf.short(v).pack();
    };

    this.ushortToBuffer = function(v) {
        var sbuf = new ByteBuffer().littleEndian();
        return sbuf.ushort(v).pack();
    };

    this.synCrc16 = function (bytes) {
        var data = bytes;
        //console.log(data);
        var crc = 0xC78C;
        data.forEach(function (item) {
            var c = new protocolUtil();
            crc = c.int32ToUshort((crc ^ (item << 8)));
            for (var i = 0; i < 8; i++) {
                if ((crc & 0x8000) != 0) {
                    crc = c.int32ToUshort((crc << 1) ^ 0x1021);
                } else {
                    crc = c.int32ToUshort((crc << 1));
                }
            }
        });
        //console.log(crc);
        return this.ushortToBuffer(crc);
    };

    this.takeBack = function(byte){
        return 255-byte;
    };
}

