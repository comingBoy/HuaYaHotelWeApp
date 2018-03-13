const production = {

  //MYSQL数据库配置
  
  MYSQL: {
    host: "172.16.155.63",
    user: "root",
    password: "UGW5Kwjl36540",
    port: "3306",
    database: "cAuth",
    supportBigNumbers: true,
    multipleStatements: true,
    timezone: 'utc'
  }

}

//开发配置
const development = {


  //MYSQL数据库配置
  mysql: {
    host: "localhost",
    user: "root",
    password: "wxaf8344b6f294ff2d",
    port: "3306",
    database: "HuaYaHotel",
    charset: 'utf8mb4',
  }

}

//生产配置
const product = {


  //MYSQL数据库配置
  mysql: {
    host: "gz-cdb-95jq70nn.sql.tencentcdb.com:63053",
    user: "root",
    password: "huayahotel001huayahotel001",
    port: "3306",
    database: "HuaYaHotel",
    charset: 'utf8mb4',
  }

}

const config = development

module.exports = config