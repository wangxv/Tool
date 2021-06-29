const path = require('path');
const fs = require('fs');

// 遍历配置文件创建文件夹和文件
const formatFile = (fileName, config, filePath, configName) => {
  if (!config || Object.keys(config).length < 1) return;

  for (const key in config) {
    if (typeof config[key] === 'object') {
      const tempPath = path.join(filePath, key.replace('$1', fileName));

      fs.mkdirSync(tempPath);
      formatFile(fileName, config[key], tempPath, configName);
    } else {
      let arr = config[key].split(' ');
      let name = arr[0];
      let template = arr.length > 1 ? arr[1] : '';
      const tempPath = path.join(filePath, name.replace('$1', fileName));
      if (template) {
        const templatePath = path.join(__dirname, `../config/${configName}/${template}.txt`);
        var content = fs.readFileSync(templatePath, 'utf-8');
        fs.writeFileSync(tempPath, content);
        return;
      }

      fs.writeFileSync(tempPath, '');
    }
  }
}

const getConfig = (name, configPath, configName) => {
  console.log('%c 🍮 configName: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', configName);
  // 获取命令执行的路径
  try {
    const str = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(str);
    formatFile(name, config, process.cwd(), configName);
  } catch (e) {
    console.log('读取文件失败!');
  }
}

// 通过配置文件来生成文件夹 json对象
module.exports = (options) => {
  const {fileName = 'test', config = 'config'} = options;
  const configPath = path.join(__dirname, `../config/${config}.json`);
  const filePath = path.join(process.cwd(), fileName);

  if (!fs.existsSync(configPath)) {
    console.log('配置文件不存在，请先创建配置文件！');
    return;
  }

  if (fs.existsSync(filePath)) {
    console.log('文件夹已存在！');
    return;
  }

  getConfig(fileName, configPath, config);
};
