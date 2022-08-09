/*
 * @Date: 2022-08-04 09:21:17
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-09 12:07:17
 * @FilePath: /react-loading-ssr/webpack/utils/readWriteFiles.js
 * @Description:
 */
const map = require('map-stream')
const fs = require('vinyl-fs')
const stream = require('stream')
const watch = require('glob-watcher')

// 编写中间件转换代码
const transformCode = ($callback = (data, path) => data) => {
  return new stream.Transform({
    objectMode: true,
    transform(file, encoding, callback) {
      if (file.isStream()) {
        return callback(new Error('Streaming is not supported.'))
      }
      if (file.isNull() || !file.contents) {
        return callback(undefined, file)
      }
      if (!file.path) {
        return callback(
          new Error(
            'Received file with no path. Files must have path to be resolved.',
          ),
        )
      }

      if (file.contents.toString() === '') {
        return callback(undefined, file)
      }

      file.contents = Buffer.from(
        $callback(file.contents.toString(), file.path),
      )
      callback(undefined, file)
    },
  })
}
// var log = function (file, cb) {
//     console.log(file);
//     cb(null, file);
// };
const readWriteFile = ({ from, to, transform }) => {
  fs.src(from)
    // .pipe(map(log))
    .pipe(
      transformCode((contents, path) => {
        return transform(contents, path)
      }),
    )
    .pipe(fs.dest(to))
}

module.exports = ({
  from,
  to,
  transform,
  isWatch = true,
  callback = () => {},
}) => {
  if (isWatch) {
    watch(from, {}, function () { 
      readWriteFile({ from, to, transform, isWatch })
      callback()
    })
  }
  readWriteFile({ from, to, transform, isWatch })
  callback()
}
