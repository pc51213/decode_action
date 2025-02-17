//Mon Feb 17 2025 06:41:03 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("霸王茶姬");
const axios = require("axios");
const axiosRetry = require("axios-retry").default;
const {
  sendNotify
} = require("./sendNotify");
const SyncRequest = require("sync-request");
const CryptoJS = require("crypto-js");
let notifyStr = "";
let appid = atob("d3hhZmVjNmY4NDIyY2IzNTdi");
(async () => {
  axiosRetry(axios, {
    retries: 3
  });
  checkVersion("bwcj.js", "893ecd30968d2922bdb1ebf2b9fc16f4");
  const _0x2da264 = process.env.bwcj_ck;
  if (!_0x2da264) {
    {
      logAndNotify("bwcj_ck");
      return;
    }
  }
  let _0x492613 = _0x2da264.replaceAll("&", "\n").split("\n");
  for (let _0x1e33c9 = 0; _0x1e33c9 < _0x492613.length; _0x1e33c9++) {
    await delay(5000);
    if (_0x492613[_0x1e33c9].indexOf("#") === -1) {
      logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 ck格式有变化，新版本需要有userId☹");
      continue;
    }
    const _0x5a2498 = _0x492613[_0x1e33c9].split("#")[0];
    const _0x4820a4 = _0x492613[_0x1e33c9].split("#")[1];
    logAndNotify("🧐" + _0x4820a4 + "🧐");
    const _0x957c8d = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x5a2498);
    if (!_0x957c8d.data.status) {
      {
        logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 登录失败☹");
        continue;
      }
    }
    const _0x5baa1c = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userSignStatistics", _0x5a2498, {
      activityId: "947079313798000641",
      appid: appid
    });
    if (_0x5baa1c.data.status) {
      logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 连续签到" + _0x5baa1c.data.data.signDays + "天");
      if (_0x5baa1c.data.data.signStatus != 1) {
        const _0x22201b = new Date().getTime();
        const _0x54cecb = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/takePartInSign", _0x5a2498, {
          activityId: "947079313798000641",
          appid: appid,
          storeId: 49006,
          timestamp: _0x22201b,
          signature: sgin(_0x22201b, _0x4820a4),
          store_id: 49006
        });
        if (!_0x54cecb.data.status) {
          {
            _0x54cecb.data.message.indexOf("已签到") !== -1 && logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 签到失败：【" + _0x54cecb.data.message + "】");
            if (_0x54cecb.data.message.indexOf("请重试") !== -1) {
              logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 签到失败：【" + _0x54cecb.data.message + "】");
              logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 触发ip限制 本次不再执行脚本，号多的每天多运行几次脚本，间隔2小时以上");
              break;
            } else {
              {
                logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 签到失败☹：【" + _0x54cecb.data.message + "】");
              }
            }
          }
        } else {
          logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 签到成功");
        }
      } else {
        logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 已签到");
      }
    }
    const _0x4753c9 = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x5a2498);
    _0x4753c9.data.status && logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 积分：【" + _0x4753c9.data.data.customerAssertInfo.integral + "】");
    const _0x37003b = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userReward", _0x5a2498, {
      activityId: "947079313798000641",
      appid: appid,
      pageNo: 1,
      pageSize: 30
    });
    if (_0x37003b.data.status) {
      const _0xb6fb12 = _0x37003b.data.data.list;
      for (let _0xb50659 = 0; _0xb50659 < _0xb6fb12.length; _0xb50659++) {
        {
          _0xb6fb12[_0xb50659].rewardType === 1 && logAndNotify("账号【" + (_0x1e33c9 + 1) + "】 奖品领取时间【" + _0xb6fb12[_0xb50659].date + "】【" + _0xb6fb12[_0xb50659].rewardName + "】");
        }
      }
    }
  }
})().catch(_0x583e5b => {
  logAndNotify(_0x583e5b);
}).finally(() => {
  pushLog("bwcj.js", notifyStr);
  sendNotify("霸王茶姬", notifyStr);
  $.done();
});
async function sendPostRequest(_0x47af3d, _0x2b391f, _0x157b9b) {
  try {
    const _0x18b324 = {
      scene: 1027,
      "Qm-From": "wechat",
      "store-id": 49006,
      "Qm-From-Type": "catering",
      Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
    };
    const _0x54084a = {
      ..._0x18b324,
      ...{
        "Qm-User-Token": _0x2b391f
      }
    };
    const _0x1326f7 = axios.create({
      headers: _0x54084a,
      timeout: 60000
    });
    return _0x1326f7.post(_0x47af3d, _0x157b9b);
  } catch (_0x584fea) {
    {
      if (axios.isAxiosError(_0x584fea)) {
        {
          if (_0x584fea.code === "ECONNABORTED" && _0x584fea.message.includes("timeout")) {
            {
              console.error("请求超时：", _0x584fea.message);
            }
          } else {
            console.error("其他错误：", _0x584fea.message);
          }
        }
      } else {
        console.error("未知错误：", _0x584fea);
      }
      throw _0x584fea;
    }
  }
}
async function sendGetRequest(_0x46632b, _0xcf9c4c) {
  try {
    const _0x4fbfb3 = {
      scene: 1027,
      "Qm-From": "wechat",
      "store-id": 49006,
      "Qm-From-Type": "catering",
      Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
    };
    const _0x1b09c6 = {
      ..._0x4fbfb3,
      ...{
        "Qm-User-Token": _0xcf9c4c
      }
    };
    const _0x419c91 = axios.create({
      headers: _0x1b09c6,
      timeout: 60000
    });
    return _0x419c91.get(_0x46632b);
  } catch (_0x2aac4e) {
    {
      if (axios.isAxiosError(_0x2aac4e)) {
        if (_0x2aac4e.code === "ECONNABORTED" && _0x2aac4e.message.includes("timeout")) {
          console.error("请求超时：", _0x2aac4e.message);
        } else {
          {
            console.error("其他错误：", _0x2aac4e.message);
          }
        }
      } else {
        console.error("未知错误：", _0x2aac4e);
      }
      throw _0x2aac4e;
    }
  }
}
function delay(_0x4ddcea) {
  return new Promise(_0x257ebc => setTimeout(_0x257ebc, _0x4ddcea));
}
function logAndNotify(_0x651f35) {
  1;
  $.log(_0x651f35);
  notifyStr += _0x651f35;
  notifyStr += "\n";
}
function sgin(_0x1087f2, _0x5bd9de) {
  var _0x49e9d7 = "947079313798000641";
  var _0xd658cd = 49006;
  var _0x2bbdf0 = _0xd658cd ? _0xd658cd.toString() : undefined;
  var _0x1998a8 = {
    activityId: _0x49e9d7,
    sellerId: _0x2bbdf0,
    timestamp: _0x1087f2,
    userId: _0x5bd9de
  };
  var _0x2808d1 = Object.keys(_0x1998a8).sort();
  var _0x20a740 = _0x2808d1.reduce(function (_0x24a310, _0x32f0dc) {
    _0x24a310[_0x32f0dc] = _0x1998a8[_0x32f0dc];
    return _0x24a310;
  }, {});
  var _0x1f4e2c = Object.entries(_0x20a740).map(function (_0x37fab7) {
    var [_0xabea89, _0x5a0789] = _0x37fab7;
    return _0xabea89 + "=" + _0x5a0789;
  }).join("&") + "&key=" + _0x49e9d7.split("").reverse().join("");
  var _0x148766 = CryptoJS.MD5(_0x1f4e2c).toString(CryptoJS.enc.Hex).toUpperCase();
  return _0x148766;
}
function Env(_0x384062, _0x19e9a1) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x165840 {
    constructor(_0xbe40e3) {
      this.env = _0xbe40e3;
    }
    send(_0x37afd4, _0x25d0fb = "GET") {
      {
        _0x37afd4 = "string" == typeof _0x37afd4 ? {
          url: _0x37afd4
        } : _0x37afd4;
        let _0x38fad9 = this.get;
        "POST" === _0x25d0fb && (_0x38fad9 = this.post);
        return new Promise((_0x5abfd8, _0x1ba227) => {
          _0x38fad9.call(this, _0x37afd4, (_0x3080ab, _0x1ddfa0, _0x49e6e8) => {
            _0x3080ab ? _0x1ba227(_0x3080ab) : _0x5abfd8(_0x1ddfa0);
          });
        });
      }
    }
    get(_0x3e534f) {
      {
        return this.send.call(this.env, _0x3e534f);
      }
    }
    post(_0xcfdb82) {
      return this.send.call(this.env, _0xcfdb82, "POST");
    }
  }
  return new class {
    constructor(_0x3af9d0, _0x552c21) {
      this.name = _0x3af9d0;
      this.http = new _0x165840(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = false;
      this.isNeedRewrite = false;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x552c21);
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
    toObj(_0x54a3c5, _0x2a4f7d = null) {
      try {
        return JSON.parse(_0x54a3c5);
      } catch {
        return _0x2a4f7d;
      }
    }
    toStr(_0x55963d, _0x41f0ef = null) {
      try {
        return JSON.stringify(_0x55963d);
      } catch {
        {
          return _0x41f0ef;
        }
      }
    }
    getjson(_0x2ed2dd, _0x4ff01b) {
      {
        let _0x1df540 = _0x4ff01b;
        const _0x4fbfaa = this.getdata(_0x2ed2dd);
        if (_0x4fbfaa) {
          try {
            _0x1df540 = JSON.parse(this.getdata(_0x2ed2dd));
          } catch {}
        }
        return _0x1df540;
      }
    }
    setjson(_0x2acef4, _0x30bd0c) {
      try {
        {
          return this.setdata(JSON.stringify(_0x2acef4), _0x30bd0c);
        }
      } catch {
        return false;
      }
    }
    getScript(_0xeb3544) {
      return new Promise(_0x569133 => {
        this.get({
          url: _0xeb3544
        }, (_0x34f182, _0x4967a9, _0x54a29a) => _0x569133(_0x54a29a));
      });
    }
    runScript(_0x30adde, _0x65f1e6) {
      return new Promise(_0x3f30cb => {
        {
          let _0x2f7dd2 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
          _0x2f7dd2 = _0x2f7dd2 ? _0x2f7dd2.replace(/\n/g, "").trim() : _0x2f7dd2;
          let _0x18084c = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
          _0x18084c = _0x18084c ? 1 * _0x18084c : 20;
          _0x18084c = _0x65f1e6 && _0x65f1e6.timeout ? _0x65f1e6.timeout : _0x18084c;
          const [_0xbf487c, _0x44620e] = _0x2f7dd2.split("@");
          const _0x1c1f8e = {
            url: "http://" + _0x44620e + "/v1/scripting/evaluate",
            body: {
              script_text: _0x30adde,
              mock_type: "cron",
              timeout: _0x18084c
            },
            headers: {
              "X-Key": _0xbf487c,
              Accept: "*/*"
            }
          };
          this.post(_0x1c1f8e, (_0x425e47, _0x4be679, _0x407e7a) => _0x3f30cb(_0x407e7a));
        }
      }).catch(_0x23a3b7 => this.logErr(_0x23a3b7));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        {
          this.fs = this.fs ? this.fs : require("fs");
          this.path = this.path ? this.path : require("path");
          const _0x31dd59 = this.path.resolve(this.dataFile);
          const _0x37a875 = this.path.resolve(process.cwd(), this.dataFile);
          const _0x2bca6e = this.fs.existsSync(_0x31dd59);
          const _0x241667 = !_0x2bca6e && this.fs.existsSync(_0x37a875);
          if (!_0x2bca6e && !_0x241667) {
            return {};
          }
          {
            const _0x461ddb = _0x2bca6e ? _0x31dd59 : _0x37a875;
            try {
              return JSON.parse(this.fs.readFileSync(_0x461ddb));
            } catch (_0x35a13e) {
              return {};
            }
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x267811 = this.path.resolve(this.dataFile);
        const _0x5be9f2 = this.path.resolve(process.cwd(), this.dataFile);
        const _0x2358a6 = this.fs.existsSync(_0x267811);
        const _0x5deef0 = !_0x2358a6 && this.fs.existsSync(_0x5be9f2);
        const _0x551581 = JSON.stringify(this.data);
        _0x2358a6 ? this.fs.writeFileSync(_0x267811, _0x551581) : _0x5deef0 ? this.fs.writeFileSync(_0x5be9f2, _0x551581) : this.fs.writeFileSync(_0x267811, _0x551581);
      }
    }
    lodash_get(_0x17292e, _0x17d77e, _0x5eabac) {
      {
        const _0x57c3ce = _0x17d77e.replace(/\[(\d+)\]/g, ".$1").split(".");
        let _0x566416 = _0x17292e;
        for (const _0x286e23 of _0x57c3ce) if (_0x566416 = Object(_0x566416)[_0x286e23], undefined === _0x566416) {
          return _0x5eabac;
        }
        return _0x566416;
      }
    }
    lodash_set(_0x13dd30, _0x3cf908, _0x534fb9) {
      return Object(_0x13dd30) !== _0x13dd30 ? _0x13dd30 : (Array.isArray(_0x3cf908) || (_0x3cf908 = _0x3cf908.toString().match(/[^.[\]]+/g) || []), _0x3cf908.slice(0, -1).reduce((_0x599ab6, _0x10916e, _0x5c8c40) => Object(_0x599ab6[_0x10916e]) === _0x599ab6[_0x10916e] ? _0x599ab6[_0x10916e] : _0x599ab6[_0x10916e] = Math.abs(_0x3cf908[_0x5c8c40 + 1]) >> 0 == +_0x3cf908[_0x5c8c40 + 1] ? [] : {}, _0x13dd30)[_0x3cf908[_0x3cf908.length - 1]] = _0x534fb9, _0x13dd30);
    }
    getdata(_0x4a4c98) {
      let _0x502c4b = this.getval(_0x4a4c98);
      if (/^@/.test(_0x4a4c98)) {
        const [, _0x57d065, _0x269895] = /^@(.*?)\.(.*?)$/.exec(_0x4a4c98);
        const _0xdd9c59 = _0x57d065 ? this.getval(_0x57d065) : "";
        if (_0xdd9c59) {
          try {
            {
              const _0x4eee8e = JSON.parse(_0xdd9c59);
              _0x502c4b = _0x4eee8e ? this.lodash_get(_0x4eee8e, _0x269895, "") : _0x502c4b;
            }
          } catch (_0x4ec48b) {
            _0x502c4b = "";
          }
        }
      }
      return _0x502c4b;
    }
    setdata(_0x33c3f1, _0x1120c9) {
      let _0x32c72f = false;
      if (/^@/.test(_0x1120c9)) {
        const [, _0x331977, _0x110c59] = /^@(.*?)\.(.*?)$/.exec(_0x1120c9);
        const _0x554b51 = this.getval(_0x331977);
        const _0x235edc = _0x331977 ? "null" === _0x554b51 ? null : _0x554b51 || "{}" : "{}";
        try {
          const _0x58e925 = JSON.parse(_0x235edc);
          this.lodash_set(_0x58e925, _0x110c59, _0x33c3f1);
          _0x32c72f = this.setval(JSON.stringify(_0x58e925), _0x331977);
        } catch (_0xbd9887) {
          {
            const _0x52771c = {};
            this.lodash_set(_0x52771c, _0x110c59, _0x33c3f1);
            _0x32c72f = this.setval(JSON.stringify(_0x52771c), _0x331977);
          }
        }
      } else {
        _0x32c72f = this.setval(_0x33c3f1, _0x1120c9);
      }
      return _0x32c72f;
    }
    getval(_0x1af1cb) {
      {
        return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x1af1cb) : this.isQuanX() ? $prefs.valueForKey(_0x1af1cb) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x1af1cb]) : this.data && this.data[_0x1af1cb] || null;
      }
    }
    setval(_0x3de221, _0x1fe115) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x3de221, _0x1fe115) : this.isQuanX() ? $prefs.setValueForKey(_0x3de221, _0x1fe115) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x1fe115] = _0x3de221, this.writedata(), true) : this.data && this.data[_0x1fe115] || null;
    }
    initGotEnv(_0x5b5324) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x5b5324 && (_0x5b5324.headers = _0x5b5324.headers ? _0x5b5324.headers : {}, undefined === _0x5b5324.headers.Cookie && undefined === _0x5b5324.cookieJar && (_0x5b5324.cookieJar = this.ckjar));
    }
    get(_0x566900, _0x4f4a06 = () => {}) {
      _0x566900.headers && (delete _0x566900.headers["Content-Type"], delete _0x566900.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x566900.headers = _0x566900.headers || {}, Object.assign(_0x566900.headers, {
        "X-Surge-Skip-Scripting": false
      })), $httpClient.get(_0x566900, (_0x4e0263, _0x18a419, _0x3292e3) => {
        !_0x4e0263 && _0x18a419 && (_0x18a419.body = _0x3292e3, _0x18a419.statusCode = _0x18a419.status);
        _0x4f4a06(_0x4e0263, _0x18a419, _0x3292e3);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x566900.opts = _0x566900.opts || {}, Object.assign(_0x566900.opts, {
        hints: false
      })), $task.fetch(_0x566900).then(_0x587717 => {
        const {
          statusCode: _0x6781d4,
          statusCode: _0x481576,
          headers: _0x7f7f5b,
          body: _0xa169d5
        } = _0x587717;
        _0x4f4a06(null, {
          status: _0x6781d4,
          statusCode: _0x481576,
          headers: _0x7f7f5b,
          body: _0xa169d5
        }, _0xa169d5);
      }, _0x4b87f8 => _0x4f4a06(_0x4b87f8))) : this.isNode() && (this.initGotEnv(_0x566900), this.got(_0x566900).on("redirect", (_0x5dd30c, _0x4557f6) => {
        {
          try {
            if (_0x5dd30c.headers["set-cookie"]) {
              {
                const _0x427748 = _0x5dd30c.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                _0x427748 && this.ckjar.setCookieSync(_0x427748, null);
                _0x4557f6.cookieJar = this.ckjar;
              }
            }
          } catch (_0x3f7762) {
            this.logErr(_0x3f7762);
          }
        }
      }).then(_0x2ba0cf => {
        const {
          statusCode: _0x5ec120,
          statusCode: _0x1ad7bd,
          headers: _0x1c2d6c,
          body: _0x588e0b
        } = _0x2ba0cf;
        _0x4f4a06(null, {
          status: _0x5ec120,
          statusCode: _0x1ad7bd,
          headers: _0x1c2d6c,
          body: _0x588e0b
        }, _0x588e0b);
      }, _0x335adc => {
        const {
          message: _0x1bf538,
          response: _0x278c98
        } = _0x335adc;
        _0x4f4a06(_0x1bf538, _0x278c98, _0x278c98 && _0x278c98.body);
      }));
    }
    post(_0xf10b9d, _0x367601 = () => {}) {
      {
        if (_0xf10b9d.body && _0xf10b9d.headers && !_0xf10b9d.headers["Content-Type"] && (_0xf10b9d.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0xf10b9d.headers && delete _0xf10b9d.headers["Content-Length"], this.isSurge() || this.isLoon()) {
          this.isSurge() && this.isNeedRewrite && (_0xf10b9d.headers = _0xf10b9d.headers || {}, Object.assign(_0xf10b9d.headers, {
            "X-Surge-Skip-Scripting": false
          }));
          $httpClient.post(_0xf10b9d, (_0x52dd41, _0x57e112, _0x8d9011) => {
            !_0x52dd41 && _0x57e112 && (_0x57e112.body = _0x8d9011, _0x57e112.statusCode = _0x57e112.status);
            _0x367601(_0x52dd41, _0x57e112, _0x8d9011);
          });
        } else {
          if (this.isQuanX()) {
            _0xf10b9d.method = "POST";
            this.isNeedRewrite && (_0xf10b9d.opts = _0xf10b9d.opts || {}, Object.assign(_0xf10b9d.opts, {
              hints: false
            }));
            $task.fetch(_0xf10b9d).then(_0x38d3bf => {
              const {
                statusCode: _0x1fec5a,
                statusCode: _0x393e11,
                headers: _0x3e9bc8,
                body: _0x5ecb19
              } = _0x38d3bf;
              _0x367601(null, {
                status: _0x1fec5a,
                statusCode: _0x393e11,
                headers: _0x3e9bc8,
                body: _0x5ecb19
              }, _0x5ecb19);
            }, _0x2e7eec => _0x367601(_0x2e7eec));
          } else {
            if (this.isNode()) {
              {
                this.initGotEnv(_0xf10b9d);
                const {
                  url: _0x791800,
                  ..._0x2e2f61
                } = _0xf10b9d;
                this.got.post(_0x791800, _0x2e2f61).then(_0xdb4c4 => {
                  const {
                    statusCode: _0x230c1c,
                    statusCode: _0x1c8f0a,
                    headers: _0x27bedc,
                    body: _0x95d980
                  } = _0xdb4c4;
                  _0x367601(null, {
                    status: _0x230c1c,
                    statusCode: _0x1c8f0a,
                    headers: _0x27bedc,
                    body: _0x95d980
                  }, _0x95d980);
                }, _0x2a58bb => {
                  {
                    const {
                      message: _0x15d695,
                      response: _0x316faf
                    } = _0x2a58bb;
                    _0x367601(_0x15d695, _0x316faf, _0x316faf && _0x316faf.body);
                  }
                });
              }
            }
          }
        }
      }
    }
    time(_0x31200e, _0x1f64fb = null) {
      {
        const _0x2461fe = _0x1f64fb ? new Date(_0x1f64fb) : new Date();
        let _0x1a7c8c = {
          "M+": _0x2461fe.getMonth() + 1,
          "d+": _0x2461fe.getDate(),
          "H+": _0x2461fe.getHours(),
          "m+": _0x2461fe.getMinutes(),
          "s+": _0x2461fe.getSeconds(),
          "q+": Math.floor((_0x2461fe.getMonth() + 3) / 3),
          S: _0x2461fe.getMilliseconds()
        };
        /(y+)/.test(_0x31200e) && (_0x31200e = _0x31200e.replace(RegExp.$1, (_0x2461fe.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (let _0x89f092 in _0x1a7c8c) new RegExp("(" + _0x89f092 + ")").test(_0x31200e) && (_0x31200e = _0x31200e.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1a7c8c[_0x89f092] : ("00" + _0x1a7c8c[_0x89f092]).substr(("" + _0x1a7c8c[_0x89f092]).length)));
        return _0x31200e;
      }
    }
    msg(_0x443585 = _0x384062, _0x1ec9c3 = "", _0x20570c = "", _0x38fad3) {
      const _0x502bf4 = _0x3a7db3 => {
        if (!_0x3a7db3) {
          return _0x3a7db3;
        }
        if ("string" == typeof _0x3a7db3) {
          return this.isLoon() ? _0x3a7db3 : this.isQuanX() ? {
            "open-url": _0x3a7db3
          } : this.isSurge() ? {
            url: _0x3a7db3
          } : undefined;
        }
        if ("object" == typeof _0x3a7db3) {
          if (this.isLoon()) {
            let _0xf3d12d = _0x3a7db3.openUrl || _0x3a7db3.url || _0x3a7db3["open-url"];
            let _0x1d1319 = _0x3a7db3.mediaUrl || _0x3a7db3["media-url"];
            return {
              openUrl: _0xf3d12d,
              mediaUrl: _0x1d1319
            };
          }
          if (this.isQuanX()) {
            let _0x26fa5d = _0x3a7db3["open-url"] || _0x3a7db3.url || _0x3a7db3.openUrl;
            let _0x7bbbc6 = _0x3a7db3["media-url"] || _0x3a7db3.mediaUrl;
            return {
              "open-url": _0x26fa5d,
              "media-url": _0x7bbbc6
            };
          }
          if (this.isSurge()) {
            let _0xbe5ff6 = _0x3a7db3.url || _0x3a7db3.openUrl || _0x3a7db3["open-url"];
            return {
              url: _0xbe5ff6
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x443585, _0x1ec9c3, _0x20570c, _0x502bf4(_0x38fad3)) : this.isQuanX() && $notify(_0x443585, _0x1ec9c3, _0x20570c, _0x502bf4(_0x38fad3))), !this.isMuteLog) {
        {
          let _0x469dcc = ["", "==============📣系统通知📣=============="];
          _0x469dcc.push(_0x443585);
          _0x1ec9c3 && _0x469dcc.push(_0x1ec9c3);
          _0x20570c && _0x469dcc.push(_0x20570c);
          console.log(_0x469dcc.join("\n"));
          this.logs = this.logs.concat(_0x469dcc);
        }
      }
    }
    log(..._0x162c5e) {
      {
        _0x162c5e.length > 0 && (this.logs = [...this.logs, ..._0x162c5e]);
        console.log(_0x162c5e.join(this.logSeparator));
      }
    }
    logErr(_0x3fc9af, _0x4e727e) {
      {
        const _0x11b662 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
        _0x11b662 ? this.log("", "❗️" + this.name + ", 错误!", _0x3fc9af.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x3fc9af);
      }
    }
    wait(_0x233f01) {
      {
        return new Promise(_0x59ba6a => setTimeout(_0x59ba6a, _0x233f01));
      }
    }
    done(_0x1c421a = {}) {
      const _0x26bcd3 = new Date().getTime();
      const _0x291844 = (_0x26bcd3 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x291844 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x1c421a);
    }
  }(_0x384062, _0x19e9a1);
}
function checkVersion(_0x4eb942, _0x2a03f8) {
  try {
    logAndNotify("文件md5：" + _0x2a03f8);
    const _0x4ad3bc = SyncRequest("GET", "https://bus.yxrong.cn/api/update/check?fileName=" + _0x4eb942 + "&fileMd5=" + _0x2a03f8);
    const _0x2ecd3f = JSON.parse(_0x4ad3bc.getBody("utf8"));
    _0x2ecd3f.code === 301 ? process.exit(0) : logAndNotify(_0x2ecd3f.data);
  } catch (_0x59de21) {
    logAndNotify("版本检查失败:", _0x59de21);
  }
}
function pushLog(_0x4ca516, _0x11fada) {
  try {
    {
      const _0xd226b = "fileName=" + encodeURIComponent(_0x4ca516) + "&log=" + encodeURIComponent(_0x11fada);
      SyncRequest("POST", "https://bus.yxrong.cn/api/update/pushLog", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: _0xd226b
      });
    }
  } catch (_0x4a8e77) {}
}