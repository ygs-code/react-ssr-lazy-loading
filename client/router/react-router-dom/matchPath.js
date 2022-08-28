import pathToRegexp from "path-to-regexp";

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

const compilePath = (path, options) => {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache[cacheKey] || (cache[cacheKey] = {});
  if (pathCache[path]) {
    return pathCache[path];
  }
  var keys = [];
  var regexp = pathToRegexp(path, keys, options);
  var result = {
    regexp: regexp,
    keys: keys
  };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
};

export const matchPath = (pathname, options) => {
  if (options === void 0) {
    options = {};
  }

  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }

  var _options = options,
    path = _options.path,
    _options$exact = _options.exact,
    exact = _options$exact === void 0 ? false : _options$exact,
    _options$strict = _options.strict,
    strict = _options$strict === void 0 ? false : _options$strict,
    _options$sensitive = _options.sensitive,
    sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function (matched, path) {
    if (!path && path !== "") {
      return null;
    }
    if (matched) {
      return matched;
    }

    var _compilePath = compilePath(path, {
        end: exact,
        strict: strict,
        sensitive: sensitive
      }),
      regexp = _compilePath.regexp,
      keys = _compilePath.keys;

    var match = regexp.exec(pathname);
    if (!match) {
      return null;
    }
    var url = match[0],
      values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) {
      return null;
    }
    return {
      path: path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact: isExact,
      // whether or not we matched exactly
      params: keys.reduce(function (memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
};
