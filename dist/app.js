'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
//配置log日志
_log4js2.default.configure({
    appenders: { cheese: { type: 'file', filename: __dirname + '/logs/error.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('cheese');
//配置swig模板引擎
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ["[[", "]]"],
    writeBody: false
}));
//容错机制
_errorHandler2.default.error(app, logger);
//初始化controller
(0, _controllers2.default)(app, _koaSimpleRouter2.default);
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port, () => {
    console.log(`server is ${_config2.default.port}`);
});