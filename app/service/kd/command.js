"use strict";
exports.EnumCmmand = {
    Pause:0x01,
    RECV_RIGHT:0xC0,   //接收正确
    RECV_ERROR:0xC1,   //接收错误
    CJDYHBSS:0x1E,  //采集多用户表示数
    CJDYHBZT:0x2D,  //采集多用户表状态
    FXDBSS:0x3C,  //反写电表示数
    DYHBTD:0x5A,  //多用户表通电
    DYHBDD:0x69,  //多用户表断电
    QDYHBTD:0x7A,  //所有用户表通电
    QDYHBDD:0x8B,  //所有用户表断电
    XZFJXX:0x78,  //下载房间信息
    CJDYHBGL:0x96,  //读多用户表功率
    XZDYHBYJSS:0xA5,  //下载多用户表预计示数
    XGDYHBSJ:0xB4,  //修改多用户表时间
    XZDSTDSJB:0xC3,  //下载定时通断电时间表
    TXCS:0xD2,  //通讯测试
    XZDYJH:0xE1,  //下载单元号与单元机号之间对应关系
    F2Result:0xF2,
    CERTMD:0xF3
};

