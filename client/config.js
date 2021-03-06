/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://rltjgqx2.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        uploadHotelPicUrl: `${host}/weapp/uploadHotelPic`,

        getHotelPicUrl: `${host}/weapp/getHotelPic`,

        getUserInfoUrl: `${host}/weapp/getUserInfo`,

        newUserUrl: `${host}/weapp/newUser`,

        getCanBookRoomUrl: `${host}/weapp/getCanBookRoom`,

        getContactUrl: `${host}/weapp/getContact`,

        newContactUrl: `${host}/weapp/newContact`,

        delContactUrl: `${host}/weapp/delContact`,

        modifyContactUrl: `${host}/weapp/modifyContact`,

        getMyRoomBookUrl: `${host}/weapp/getMyRoomBook`,

        delMyRoomBookUrl: `${host}/weapp/delMyRoomBook`,

        cancelMyRoomBookUrl: `${host}/weapp/cancelMyRoomBook`,

        newRoomBookUrl: `${host}/weapp/newRoomBook`,
    }
};

module.exports = config;
