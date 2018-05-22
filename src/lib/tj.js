var sysinfo = {};
var __st_tj = {
  /*初始化*/
  init: function () {
    this.tjUrl = (function () {
      var protocol = location.protocol,pre;
      if (protocol === "https:") {
        pre = "https://dssp.stnts.com:8888";
      } else {
        pre = "http://dssp.stnts.com:8888";
      }
      // pre = process.env.NODE_ENV === 'development' ? "http://10.0.4.46:8888" : pre;
      sysinfo = process.env.NODE_ENV === 'development' ? {} : sysinfo;
      return pre + '/?opt={0}&mq={1}&data={2}gid={3}&mac={4}&pcname={5}&bootid={6}&uid={7}&pid={8}&title={9}&url={10}&text={11}&event={12}&extend={13}&time_stamp={14}';
    })();
    return this;
  },
  /*发送点击统计*/
  sendClick: function (data) {
    var t = this;
    (new Image(1, 1)).src = (t.format(this.tjUrl, t.objVal2Arr(data)));
  },
  /*发送PV统计*/
  sendPV: function (data) {
    var t = this;
    (new Image(1, 1)).src = (t.format(this.tjUrl, t.objVal2Arr(data)));
  },
  objVal2Arr: function (obj) {
    var arr = [];
    $.each(obj, function (i, v) {
      arr.push(v);
    });
    return arr;
  },
  //字符串格式化方法(非ST.format)
  format: function (s, a) {
    if (s) {
      s = s.replace(/{(\d+)}/g, function (b, c) {
        return a[c]
      });
    }
    console.log(s)
    return s
  }
}.init();
//公布至全局
window.__st_tj = __st_tj;
window.__sendPv = function (data) {
  window.__st_tj.sendPV({
    "opt": "put",
    "mq": "steam_lolbox_action",
    "data": "",
    "gid": sysinfo && sysinfo.NetBar && sysinfo.NetBar.UserId || 0,
    "mac": sysinfo && sysinfo.LocalMachine && sysinfo.LocalMachine.ComputerName || "",
    "pcname": sysinfo && sysinfo.LocalMachine && sysinfo.LocalMachine.Network[0] && encodeURIComponent(sysinfo.LocalMachine.Network[0].MACAddress) || "",
    "bootid": sysinfo && sysinfo.LocalMachine && sysinfo.LocalMachine.BootId || "",
    "uid": data.uid || "",
    "pid": data.pid || "",
    "title": encodeURIComponent(document.title),
    "url": encodeURIComponent(window.location.href),
    "text": "",
    "event": 0,
    "extend": "",
    "time_stamp": +(new Date())
  });
}

window.__sendClick = function (data) {
  window.__st_tj.sendClick({
    "opt": "put",
    "mq": "steam_lolbox_action",
    "data": "",
    "gid": sysinfo && sysinfo.NetBar && sysinfo.NetBar.UserId || 0,
    "mac": sysinfo && sysinfo.LocalMachine && sysinfo.LocalMachine.ComputerName || "",
    "pcname": sysinfo && sysinfo.LocalMachine && sysinfo.LocalMachine.Network[0] && encodeURIComponent(sysinfo.LocalMachine.Network[0].MACAddress) || "",
    "bootid": sysinfo && sysinfo.LocalMachine && sysinfo.LocalMachine.BootId || "",
    "uid": data.uid || "",
    "pid": data.pid || "",
    "title": encodeURIComponent(document.title),
    "url": encodeURIComponent(window.location.href),
    "text": encodeURIComponent(data.text) || "",
    "event": 1,
    "extend": "",
    "time_stamp": +(new Date())
  });
}