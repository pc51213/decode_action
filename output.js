//Thu Oct 03 2024 13:23:41 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("华住会"),
  axios = require("axios"),
  {
    wrapper
  } = require("axios-cookiejar-support"),
  tough = require("tough-cookie"),
  {
    sendNotify
  } = require("./sendNotify"),
  FormData = require("form-data");
let notifyStr = "";
var userToken = undefined;
(async () => {
  const _0x2fec52 = process.env.hzh_url;
  if (!_0x2fec52) {
    logAndNotify("请设置 hzh_url");
    return;
  }
  let _0x133bbe = _0x2fec52.split("\n");
  for (let _0x2a316c = 0; _0x2a316c < _0x133bbe.length; _0x2a316c++) {
    const _0x3fbcbe = _0x133bbe[_0x2a316c];
    let _0x190d81 = getInstance();
    userToken = undefined;
    userToken = getParameterByName(_0x3fbcbe, "sk");
    const _0x1ce830 = await _0x190d81.get(_0x3fbcbe);
    if (_0x1ce830.status !== 200) {
      logAndNotify("账号【" + (_0x2a316c + 1) + "】 url失效");
      continue;
    }
    const _0x451f39 = await _0x190d81.get("https://hweb-mbf.huazhu.com/api/singInIndex");
    if (_0x451f39.data.businessCode !== "1000") {
      logAndNotify("账号【" + (_0x2a316c + 1) + "】 url失效 singInfoResp");
      continue;
    }
    logAndNotify("账号【" + (_0x2a316c + 1) + "】 累计签到【" + _0x451f39.data.content.signInCount + "】天");
    let _0x586229 = [];
    for (const _0x1d1833 in _0x451f39.data.content.signInfos) {
      const _0x3e4b4d = _0x451f39.data.content.signInfos[_0x1d1833];
      if (_0x3e4b4d.time === _0x451f39.data.content.today) {
        if (_0x3e4b4d.isSign) {
          logAndNotify("账号【" + (_0x2a316c + 1) + "】 今日已签到");
        } else {
          const _0x379e20 = new FormData();
          _0x379e20.append("state", 1);
          _0x379e20.append("day", new Date().getDate());
          const _0x506b62 = await _0x190d81.post("https://hweb-mbf.huazhu.com/api/signIn", _0x379e20, {
            headers: {
              ..._0x379e20.getHeaders()
            }
          });
          if (_0x506b62.data.businessCode !== "1000") {
            const _0x3ef04c = JSON.stringify(_0x506b62.data);
            logAndNotify("账号【" + (_0x2a316c + 1) + "】 签到失败：【" + _0x3ef04c + "】");
          } else {
            logAndNotify("账号【" + (_0x2a316c + 1) + "】 签到成功");
          }
        }
        break;
      } else {
        if (!_0x3e4b4d.isSign) {
          _0x586229.push(_0x3e4b4d.time);
        }
      }
    }
    if (_0x586229.length > 0) {
      logAndNotify("账号【" + (_0x2a316c + 1) + "】 本周未签到【" + _0x586229 + "】");
    } else {
      logAndNotify("账号【" + (_0x2a316c + 1) + "】 本周都已签到");
    }
    const _0x358338 = await _0x190d81.post("https://hweb-mbf.huazhu.com/api/getPoint");
    if (_0x358338.data.businessCode !== "1000") {
      logAndNotify("账号【" + (_0x2a316c + 1) + "】 积分查询失败：【" + _0x358338.data + "】");
      continue;
    }
    logAndNotify("账号【" + (_0x2a316c + 1) + "】 积分查询成功：【" + _0x358338.data.content.point + "】");
  }
})().catch(_0x12761e => {
  logAndNotify(_0x12761e);
}).finally(() => {
  sendNotify("华住会", notifyStr);
  $.done();
});
function logAndNotify(_0x118e2a) {
  $.log(_0x118e2a);
  notifyStr += _0x118e2a;
  notifyStr += "\n";
}
function getParameterByName(_0x3b2d0b, _0x3d784a) {
  const _0x2a7b41 = decodeURIComponent(_0x3b2d0b),
    _0x4381eb = new RegExp("[?&]" + _0x3d784a + "=([^&#]*)"),
    _0x2eac00 = _0x4381eb.exec(_0x2a7b41);
  return _0x2eac00 ? _0x2eac00[1] : null;
}
var headersTemp = {
  "content-type": "application/json",
  "Client-Platform": "WX-MP",
  "Accept-Encoding": "gzip,compress,br,deflate",
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003130) NetType/WIFI Language/zh_CN",
  Referer: "https://servicewechat.com/wx286efc12868f2559/489/page-frame.html",
  version: "",
  "User-Token": "" + userToken
};
function sendPostRequest(_0x2fb89e, _0x4889f5, _0x52cc50) {
  let _0x50e053 = {};
  if (_0x4889f5) {
    _0x50e053 = {
      ...headersTemp,
      ...{
        sId: "" + _0x4889f5
      }
    };
  } else {
    _0x50e053 = headersTemp;
  }
  const _0x6e1124 = axios.create({
    headers: _0x50e053
  });
  return _0x6e1124.post(_0x2fb89e, _0x52cc50);
}
function getInstance() {
  const _0x446aea = new tough.CookieJar();
  return wrapper(axios.create({
    jar: _0x446aea,
    withCredentials: true,
    maxRedirects: 5
  }));
}
function Env(_0x275db0, _0x4d3e29) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x15f459 {
    constructor(_0x25d0ee) {
      this.env = _0x25d0ee;
    }
    send(_0x57749e, _0x32b826 = "GET") {
      _0x57749e = "string" == typeof _0x57749e ? {
        url: _0x57749e
      } : _0x57749e;
      let _0x4e8674 = this.get;
      "POST" === _0x32b826 && (_0x4e8674 = this.post);
      return new Promise((_0x4fcb37, _0x1451cd) => {
        _0x4e8674.call(this, _0x57749e, (_0x46750f, _0x101b89, _0x4c0372) => {
          _0x46750f ? _0x1451cd(_0x46750f) : _0x4fcb37(_0x101b89);
        });
      });
    }
    get(_0xc9fc9e) {
      return this.send.call(this.env, _0xc9fc9e);
    }
    post(_0x425c1a) {
      return this.send.call(this.env, _0x425c1a, "POST");
    }
  }
  return new class {
    constructor(_0x5eef09, _0x5643c9) {
      this.name = _0x5eef09;
      this.http = new _0x15f459(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x5643c9);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(_0x5d5bd0, _0x2f46bc = null) {
      try {
        return JSON.parse(_0x5d5bd0);
      } catch {
        return _0x2f46bc;
      }
    }
    toStr(_0x22e8da, _0x3beee7 = null) {
      try {
        return JSON.stringify(_0x22e8da);
      } catch {
        return _0x3beee7;
      }
    }
    getjson(_0x59f296, _0x2b8550) {
      let _0x48496a = _0x2b8550;
      const _0x7416f4 = this.getdata(_0x59f296);
      if (_0x7416f4) {
        try {
          _0x48496a = JSON.parse(this.getdata(_0x59f296));
        } catch {}
      }
      return _0x48496a;
    }
    setjson(_0x16021a, _0x5b090f) {
      try {
        return this.setdata(JSON.stringify(_0x16021a), _0x5b090f);
      } catch {
        return !1;
      }
    }
    getScript(_0x535684) {
      return new Promise(_0x450e92 => {
        this.get({
          url: _0x535684
        }, (_0x1195ac, _0x43ce62, _0x5c7a59) => _0x450e92(_0x5c7a59));
      });
    }
    runScript(_0x41362e, _0x5c3e65) {
      return new Promise(_0xdece3e => {
        let _0x480cd2 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x480cd2 = _0x480cd2 ? _0x480cd2.replace(/\n/g, "").trim() : _0x480cd2;
        let _0x34a353 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x34a353 = _0x34a353 ? 1 * _0x34a353 : 20;
        _0x34a353 = _0x5c3e65 && _0x5c3e65.timeout ? _0x5c3e65.timeout : _0x34a353;
        const [_0x158eda, _0x3d002d] = _0x480cd2.split("@"),
          _0x542e19 = {
            url: "http://" + _0x3d002d + "/v1/scripting/evaluate",
            body: {
              script_text: _0x41362e,
              mock_type: "cron",
              timeout: _0x34a353
            },
            headers: {
              "X-Key": _0x158eda,
              Accept: "*/*"
            }
          };
        this.post(_0x542e19, (_0x3722ea, _0x1c6f73, _0x5dcce7) => _0xdece3e(_0x5dcce7));
      }).catch(_0x54a86b => this.logErr(_0x54a86b));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x162f92 = this.path.resolve(this.dataFile),
          _0x36ef92 = this.path.resolve(process.cwd(), this.dataFile),
          _0x1706e2 = this.fs.existsSync(_0x162f92),
          _0x288c27 = !_0x1706e2 && this.fs.existsSync(_0x36ef92);
        if (!_0x1706e2 && !_0x288c27) {
          return {};
        }
        {
          const _0x945dcf = _0x1706e2 ? _0x162f92 : _0x36ef92;
          try {
            return JSON.parse(this.fs.readFileSync(_0x945dcf));
          } catch (_0x2632f0) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x5762d3 = this.path.resolve(this.dataFile),
          _0x5b943b = this.path.resolve(process.cwd(), this.dataFile),
          _0x4a5cab = this.fs.existsSync(_0x5762d3),
          _0x401381 = !_0x4a5cab && this.fs.existsSync(_0x5b943b),
          _0x17aa04 = JSON.stringify(this.data);
        _0x4a5cab ? this.fs.writeFileSync(_0x5762d3, _0x17aa04) : _0x401381 ? this.fs.writeFileSync(_0x5b943b, _0x17aa04) : this.fs.writeFileSync(_0x5762d3, _0x17aa04);
      }
    }
    lodash_get(_0x135ece, _0x1e70f8, _0x6ea51c) {
      const _0x19d8f7 = _0x1e70f8.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x3c38fb = _0x135ece;
      for (const _0x359bd0 of _0x19d8f7) if (_0x3c38fb = Object(_0x3c38fb)[_0x359bd0], void 0 === _0x3c38fb) {
        return _0x6ea51c;
      }
      return _0x3c38fb;
    }
    lodash_set(_0x2400fb, _0x42e8bc, _0x157483) {
      return Object(_0x2400fb) !== _0x2400fb ? _0x2400fb : (Array.isArray(_0x42e8bc) || (_0x42e8bc = _0x42e8bc.toString().match(/[^.[\]]+/g) || []), _0x42e8bc.slice(0, -1).reduce((_0x23429c, _0x27ee86, _0x2562c3) => Object(_0x23429c[_0x27ee86]) === _0x23429c[_0x27ee86] ? _0x23429c[_0x27ee86] : _0x23429c[_0x27ee86] = Math.abs(_0x42e8bc[_0x2562c3 + 1]) >> 0 == +_0x42e8bc[_0x2562c3 + 1] ? [] : {}, _0x2400fb)[_0x42e8bc[_0x42e8bc.length - 1]] = _0x157483, _0x2400fb);
    }
    getdata(_0x318cb9) {
      let _0x15e001 = this.getval(_0x318cb9);
      if (/^@/.test(_0x318cb9)) {
        const [, _0x507905, _0x1c67bf] = /^@(.*?)\.(.*?)$/.exec(_0x318cb9),
          _0x31fd65 = _0x507905 ? this.getval(_0x507905) : "";
        if (_0x31fd65) {
          try {
            const _0xb92756 = JSON.parse(_0x31fd65);
            _0x15e001 = _0xb92756 ? this.lodash_get(_0xb92756, _0x1c67bf, "") : _0x15e001;
          } catch (_0x3529) {
            _0x15e001 = "";
          }
        }
      }
      return _0x15e001;
    }
    setdata(_0x4c3d23, _0x45a0ce) {
      let _0x1f4fb8 = !1;
      if (/^@/.test(_0x45a0ce)) {
        const [, _0x91fc04, _0x5ce2aa] = /^@(.*?)\.(.*?)$/.exec(_0x45a0ce),
          _0x92e108 = this.getval(_0x91fc04),
          _0x39426c = _0x91fc04 ? "null" === _0x92e108 ? null : _0x92e108 || "{}" : "{}";
        try {
          const _0x120c5e = JSON.parse(_0x39426c);
          this.lodash_set(_0x120c5e, _0x5ce2aa, _0x4c3d23);
          _0x1f4fb8 = this.setval(JSON.stringify(_0x120c5e), _0x91fc04);
        } catch (_0x225b05) {
          const _0x151ad7 = {};
          this.lodash_set(_0x151ad7, _0x5ce2aa, _0x4c3d23);
          _0x1f4fb8 = this.setval(JSON.stringify(_0x151ad7), _0x91fc04);
        }
      } else {
        _0x1f4fb8 = this.setval(_0x4c3d23, _0x45a0ce);
      }
      return _0x1f4fb8;
    }
    getval(_0x42997f) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x42997f) : this.isQuanX() ? $prefs.valueForKey(_0x42997f) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x42997f]) : this.data && this.data[_0x42997f] || null;
    }
    setval(_0x4464de, _0x550e69) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x4464de, _0x550e69) : this.isQuanX() ? $prefs.setValueForKey(_0x4464de, _0x550e69) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x550e69] = _0x4464de, this.writedata(), !0) : this.data && this.data[_0x550e69] || null;
    }
    initGotEnv(_0x5be6b7) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x5be6b7 && (_0x5be6b7.headers = _0x5be6b7.headers ? _0x5be6b7.headers : {}, void 0 === _0x5be6b7.headers.Cookie && void 0 === _0x5be6b7.cookieJar && (_0x5be6b7.cookieJar = this.ckjar));
    }
    get(_0x37ea25, _0x233f3d = () => {}) {
      _0x37ea25.headers && (delete _0x37ea25.headers["Content-Type"], delete _0x37ea25.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x37ea25.headers = _0x37ea25.headers || {}, Object.assign(_0x37ea25.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x37ea25, (_0x32d702, _0x50fcdb, _0x28a6c2) => {
        !_0x32d702 && _0x50fcdb && (_0x50fcdb.body = _0x28a6c2, _0x50fcdb.statusCode = _0x50fcdb.status);
        _0x233f3d(_0x32d702, _0x50fcdb, _0x28a6c2);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x37ea25.opts = _0x37ea25.opts || {}, Object.assign(_0x37ea25.opts, {
        hints: !1
      })), $task.fetch(_0x37ea25).then(_0x514247 => {
        const {
          statusCode: _0x1d5c3d,
          statusCode: _0x414a9a,
          headers: _0x1a54cb,
          body: _0x3bfdd8
        } = _0x514247;
        _0x233f3d(null, {
          status: _0x1d5c3d,
          statusCode: _0x414a9a,
          headers: _0x1a54cb,
          body: _0x3bfdd8
        }, _0x3bfdd8);
      }, _0x8d9ab6 => _0x233f3d(_0x8d9ab6))) : this.isNode() && (this.initGotEnv(_0x37ea25), this.got(_0x37ea25).on("redirect", (_0x236629, _0x41fcc9) => {
        try {
          if (_0x236629.headers["set-cookie"]) {
            const _0x25c579 = _0x236629.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x25c579 && this.ckjar.setCookieSync(_0x25c579, null);
            _0x41fcc9.cookieJar = this.ckjar;
          }
        } catch (_0x2e9e58) {
          this.logErr(_0x2e9e58);
        }
      }).then(_0x4725dc => {
        const {
          statusCode: _0x263593,
          statusCode: _0x906472,
          headers: _0x3a86e9,
          body: _0x376fb9
        } = _0x4725dc;
        _0x233f3d(null, {
          status: _0x263593,
          statusCode: _0x906472,
          headers: _0x3a86e9,
          body: _0x376fb9
        }, _0x376fb9);
      }, _0x53c229 => {
        const {
          message: _0x2277b7,
          response: _0x2592ad
        } = _0x53c229;
        _0x233f3d(_0x2277b7, _0x2592ad, _0x2592ad && _0x2592ad.body);
      }));
    }
    post(_0x477842, _0x1339d = () => {}) {
      if (_0x477842.body && _0x477842.headers && !_0x477842.headers["Content-Type"] && (_0x477842.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x477842.headers && delete _0x477842.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x477842.headers = _0x477842.headers || {}, Object.assign(_0x477842.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(_0x477842, (_0x5634f2, _0x4cb86e, _0x565449) => {
          !_0x5634f2 && _0x4cb86e && (_0x4cb86e.body = _0x565449, _0x4cb86e.statusCode = _0x4cb86e.status);
          _0x1339d(_0x5634f2, _0x4cb86e, _0x565449);
        });
      } else {
        if (this.isQuanX()) {
          _0x477842.method = "POST";
          this.isNeedRewrite && (_0x477842.opts = _0x477842.opts || {}, Object.assign(_0x477842.opts, {
            hints: !1
          }));
          $task.fetch(_0x477842).then(_0x451f02 => {
            const {
              statusCode: _0x5f4c6f,
              statusCode: _0x1f66da,
              headers: _0x4e5d54,
              body: _0x7c282c
            } = _0x451f02;
            _0x1339d(null, {
              status: _0x5f4c6f,
              statusCode: _0x1f66da,
              headers: _0x4e5d54,
              body: _0x7c282c
            }, _0x7c282c);
          }, _0x2597b9 => _0x1339d(_0x2597b9));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0x477842);
            const {
              url: _0x22e02c,
              ..._0xda5303
            } = _0x477842;
            this.got.post(_0x22e02c, _0xda5303).then(_0x2c75f3 => {
              const {
                statusCode: _0x18d3aa,
                statusCode: _0x4f5110,
                headers: _0x4bbdbc,
                body: _0x379057
              } = _0x2c75f3;
              _0x1339d(null, {
                status: _0x18d3aa,
                statusCode: _0x4f5110,
                headers: _0x4bbdbc,
                body: _0x379057
              }, _0x379057);
            }, _0x28fd9d => {
              const {
                message: _0x2d3a51,
                response: _0x5327be
              } = _0x28fd9d;
              _0x1339d(_0x2d3a51, _0x5327be, _0x5327be && _0x5327be.body);
            });
          }
        }
      }
    }
    time(_0x3a303b, _0x4c5d12 = null) {
      const _0x3a09ac = _0x4c5d12 ? new Date(_0x4c5d12) : new Date();
      let _0x3cd71d = {
        "M+": _0x3a09ac.getMonth() + 1,
        "d+": _0x3a09ac.getDate(),
        "H+": _0x3a09ac.getHours(),
        "m+": _0x3a09ac.getMinutes(),
        "s+": _0x3a09ac.getSeconds(),
        "q+": Math.floor((_0x3a09ac.getMonth() + 3) / 3),
        S: _0x3a09ac.getMilliseconds()
      };
      /(y+)/.test(_0x3a303b) && (_0x3a303b = _0x3a303b.replace(RegExp.$1, (_0x3a09ac.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x58618b in _0x3cd71d) new RegExp("(" + _0x58618b + ")").test(_0x3a303b) && (_0x3a303b = _0x3a303b.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x3cd71d[_0x58618b] : ("00" + _0x3cd71d[_0x58618b]).substr(("" + _0x3cd71d[_0x58618b]).length)));
      return _0x3a303b;
    }
    msg(_0x10cec8 = _0x275db0, _0x53d722 = "", _0x5b2f2d = "", _0x5f0868) {
      const _0x2bd87e = _0x1c713c => {
        if (!_0x1c713c) {
          return _0x1c713c;
        }
        if ("string" == typeof _0x1c713c) {
          return this.isLoon() ? _0x1c713c : this.isQuanX() ? {
            "open-url": _0x1c713c
          } : this.isSurge() ? {
            url: _0x1c713c
          } : void 0;
        }
        if ("object" == typeof _0x1c713c) {
          if (this.isLoon()) {
            let _0x40c92c = _0x1c713c.openUrl || _0x1c713c.url || _0x1c713c["open-url"],
              _0x424f0f = _0x1c713c.mediaUrl || _0x1c713c["media-url"];
            return {
              openUrl: _0x40c92c,
              mediaUrl: _0x424f0f
            };
          }
          if (this.isQuanX()) {
            let _0x195738 = _0x1c713c["open-url"] || _0x1c713c.url || _0x1c713c.openUrl,
              _0x9f4be8 = _0x1c713c["media-url"] || _0x1c713c.mediaUrl;
            return {
              "open-url": _0x195738,
              "media-url": _0x9f4be8
            };
          }
          if (this.isSurge()) {
            let _0x8373f6 = _0x1c713c.url || _0x1c713c.openUrl || _0x1c713c["open-url"];
            return {
              url: _0x8373f6
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x10cec8, _0x53d722, _0x5b2f2d, _0x2bd87e(_0x5f0868)) : this.isQuanX() && $notify(_0x10cec8, _0x53d722, _0x5b2f2d, _0x2bd87e(_0x5f0868))), !this.isMuteLog) {
        let _0x3f6245 = ["", "==============📣系统通知📣=============="];
        _0x3f6245.push(_0x10cec8);
        _0x53d722 && _0x3f6245.push(_0x53d722);
        _0x5b2f2d && _0x3f6245.push(_0x5b2f2d);
        console.log(_0x3f6245.join("\n"));
        this.logs = this.logs.concat(_0x3f6245);
      }
    }
    log(..._0x58a957) {
      _0x58a957.length > 0 && (this.logs = [...this.logs, ..._0x58a957]);
      console.log(_0x58a957.join(this.logSeparator));
    }
    logErr(_0x541cf2, _0x5bb24d) {
      const _0x360cf6 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x360cf6 ? this.log("", "❗️" + this.name + ", 错误!", _0x541cf2.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x541cf2);
    }
    wait(_0x20aba8) {
      return new Promise(_0x2b21bd => setTimeout(_0x2b21bd, _0x20aba8));
    }
    done(_0x742118 = {}) {
      const _0x194849 = new Date().getTime(),
        _0x47fc16 = (_0x194849 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x47fc16 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x742118);
    }
  }(_0x275db0, _0x4d3e29);
}