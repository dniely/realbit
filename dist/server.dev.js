"use strict";

var _express = _interopRequireDefault(require("express"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 3000; // 클라이언트 파일 서빙 설정

app.use(_express["default"]["static"]('public')); // 기본 라우트로 HTML 파일 제공

app.get('/', function (req, res) {
  res.sendFile(_path["default"].join(process.cwd(), 'public', 'index.html'));
}); // Upbit API 프록시 라우트

app.get('/api/upbit', function _callee(req, res) {
  var response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-DOGE'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          res.json(data);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching data from Upbit API:', _context.t0);
          res.status(500).json({
            error: 'Failed to fetch data from Upbit API'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // 서버 실행

app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
