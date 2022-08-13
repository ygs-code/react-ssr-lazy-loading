/*
 * @Date: 2022-08-09 11:24:59
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-10 14:16:33
 * @FilePath: /react-loading-ssr/bin/cmd.js
 * @Description:
 */
import os from "os";
import { spawn, SpawnOptions, exec, execSync } from "child_process";
import moment from "moment";

export default class Cmd {
  text = "";

  runNodeModule(moduleName, params, options) {
    if (os.type() == "Windows_NT" && !moduleName.match(/\.cmd$/)) {
      moduleName += ".cmd";
    }
    return this.run(moduleName, params, options);
  }

  run(command, params, options) {
    this.text = "";
    // options = Object.assign(options || {}, { cwd: this.cfg.cwd });
    return new Promise((resolve, reject) => {
      console.log(`run command: ${command}, params:`, params, options);

      if (!options) {
        options = {
          stdio: "inherit"
        };
      }
      if (!params) {
        params = [];
      }
      options.stdio = "pipe";

      let proc = spawn(command, params, options);
      // console.log('proc===', proc)

      proc.stdout.on("data", (data) => {
        let dataStr = String(data);
        if (options.logPrefix) {
          dataStr = options.logPrefix + dataStr;
        }
        this.text += dataStr;
        if (!options?.silent) {
          process.stdout.write(moment().format("HH:mm:ss:SSS ") + dataStr);
        }
      });

      proc.stderr.on("data", (data) => {
        // 不一定代表进程exitcode != 0，可能只是进程调用了console.error
        let dataStr = String(data);
        if (options?.logPrefix) {
          dataStr = options.logPrefix + dataStr;
        }
        if (!options?.silent) {
          process.stderr.write(moment().format("HH:mm:ss:SSS ") + dataStr);
        }
      });

      // 进程错误
      proc.on("error", (error) => {
        if (!options?.silent) {
          console.error(error);
        }
        reject(error);
      });

      // 进程关闭
      proc.on("close", (code) => {
        console.log(`process closed with exit code: ${code}`);
        if (code === 0) {
          resolve(this.text || "");
        } else {
          let errMsg = `process closed with exit code: ${code}`;
          if (options?.logPrefix) {
            errMsg = options.logPrefix + errMsg;
          }
          reject(new Error(errMsg));
        }
      });

      proc.on("exit", (code, signal) => {
        console.log(`process exits`);
      });
    });
  }
}

// let cmd = new Cmd().runNodeModule(
//   process.platform === 'win32' ? 'npm.cmd' : 'npm',
//   ['run', 'ssr:dev', '--progress', 'bar:force'],
// )

export const execute = (command, options = { stdio: "inherit" }) => {
  command = command.split(" ").filter((item) => item);

  if (os.type() === "Windows_NT" && !command[0].match(/\.cmd$/)) {
    command[0] += ".cmd";
  }

  const proc = spawn(command[0], command.slice(1), options);

  // 进程错误
  proc.on("error", (error) => {
    if (error) {
      console.error("process error:", error);
    }
  });

  // 进程关闭
  proc.on("close", (code) => {
    console.log(`process closed with exit code: ${code}`);
    // process.exit(code);
  });

  // 退出
  proc.on("exit", (code, signal) => {
    console.log(`process exits`);
    // process.exit(code);
  });

  return proc;
};

/**
 * 判断端口是否被占用
 * @param port 端口号
 * @returns 该端口是否被占用
 */
export const iSportTake = (port) => {
  const cmd =
    process.platform === "win32"
      ? `netstat -aon|findstr ${port}`
      : `lsof -i:${port}`;
  try {
    const res = execSync(cmd);
    return true;
  } catch (error) {
    // console.log('error:', error);
    return false;
  }
};
