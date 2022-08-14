const path = require("path");

module.exports = {
  // 路径配置
  "@": path.join(process.cwd()),
  client: path.join(process.cwd(), "/client"),
  server: path.join(process.cwd(), "/server")
};
