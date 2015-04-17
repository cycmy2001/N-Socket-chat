"use strict";
var Lodash = require('lodash');
var ByteBuffer = require('ByteBuffer');
var ProtocolUtil = require('./protocolUtil');
module.exports = exports = protocol;

function protocol (EnumCommand, dataBuffer){

    var kdProUtil = new ProtocolUtil();

    this.Version = 0x53;
    this.SourceCode = 0x59;
    this.TargetCode = 0x4E;
    this.SN = 0x43;
    this.TotalPackageNo = 0;
    this.PackageNo = 1;
    this.PackageAmount = 1;
    this.MachineNo = 1;
    this.CRC = 0;
    this.End = [0x4F, 0x4E, 0x45, 0x53];
    this.Command1 = EnumCommand;
    this.Command2 = (this.Command1)-0x5;
    this.Command3 = (this.Command1 ^ this.Command2);
    this.Data = kdProUtil.bufferToBytes(dataBuffer);

    this.toBuffer = function(IsHandshake){
        var sbuf = new ByteBuffer().littleEndian();
        var buffer = sbuf.byte(this.Version)
            .byte(this.SourceCode)
            .byte(this.TargetCode)
            .byte(this.SN)
            .short(this.TotalPackageNo)
            .short(this.PackageNo)
            .short(this.PackageAmount)
            .byte(this.MachineNo)
            .short(kdProUtil.int32ToShort(this.Data.length+kdProUtil.PacketLen))
            .byte(this.Command1)
            .byte(this.Command2)
            .byte(this.Command3)
            .short(this.CRC)
            .byteArray(this.Data,(this.Data).length)
            .byteArray(this.End,(this.End).length)
            .pack();
        var bytes = kdProUtil.bufferToBytes(buffer);
        var crc16 = [];
        if (IsHandshake){
            crc16 = kdProUtil.bufferToBytes(kdProUtil.synCrc16(this.Data));
        }else{
            //crc16 = kdProUtil.bufferToBytes(kdProUtil.synCrc16(bytes.slice(0,(kdProUtil.PacketLen-2))));
            crc16 = kdProUtil.bufferToBytes(kdProUtil.synCrc16(Lodash.take(bytes,kdProUtil.PacketLen-2)));
        }
        bytes[16] = crc16[0];
        bytes[17] = crc16[1];
        //console.log(bytes);
        return kdProUtil.bytesToBuffer(bytes);
    };
}

