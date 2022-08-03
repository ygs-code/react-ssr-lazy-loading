var map = require('map-stream');
var fs = require('vinyl-fs');
const stream = require('stream');
var watch = require('glob-watcher');

// 编写中间件转换代码
const transformCode = ($callback = (data, path) => data) => {
    return new stream.Transform({
        objectMode: true,
        transform(file, encoding, callback) {
            if (file.isStream()) {
                return callback(new Error('Streaming is not supported.'));
            }
            if (file.isNull() || !file.contents) {
                return callback(undefined, file);
            }
            if (!file.path) {
                return callback(
                    new Error(
                        'Received file with no path. Files must have path to be resolved.'
                    )
                );
            }

            if (file.contents.toString() === '') {
                return callback(undefined, file);
            }

            file.contents = Buffer.from(
                $callback(file.contents.toString(), file.path)
            );
            callback(undefined, file);
        },
    });
};
// var log = function (file, cb) {
//     console.log(file);
//     cb(null, file);
// };

module.exports = ({ from, to, transform, isWatch = true }) => {
    if (isWatch) {
        watch(from, {}, function () {
            fs.src(from)
                // .pipe(map(log))
                .pipe(
                    transformCode((contents, path) => {
                        return transform(contents, path);
                    })
                )
                .pipe(fs.dest(to));
        });
      console.log('from==============',from)

        fs.src(from)
        // .pipe(map(log))
        .pipe(
            transformCode((contents, path) => {
                return transform(contents, path);
            })
        )
        .pipe(fs.dest(to));
    } else {
        fs.src(from)
            // .pipe(map(log))
            .pipe(
                transformCode((contents, path) => {
                    return transform(contents, path);
                })
            )
            .pipe(fs.dest(to));
    }
};
