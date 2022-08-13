module.exports = function (string) {
  const regex = /(?<=\{)(.+?)(?=\})/g; // {} 花括号，大括号
  string = string.match(regex);
  let obj={}
  if (string) {
    string = string[0];
    let stringArr = string.split(",");
    for (let item of stringArr) {
      let [key, value] = item.split(":");
      obj[`${key}`] = value;
    }
  }  
  return obj;
};
