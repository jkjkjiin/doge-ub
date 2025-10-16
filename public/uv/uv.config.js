/*global Ultraviolet*/

const blocked = [
  "trk.pinterest.com", "widgets.pinterest.com", "events.reddit.com", "events.redditmedia.com", 
  "ads.youtube.com", "ads-api.tiktok.com", "analytics.tiktok.com", "ads-sg.tiktok.com", 
  "analytics-sg.tiktok.com", "business-api.tiktok.com", "ads.tiktok.com", "log.byteoversea.com",
  "ads.yahoo.com", "analytics.yahoo.com", "geo.yahoo.com", "udc.yahoo.com",
  "udcm.yahoo.com", "advertising.yahoo.com", "analytics.query.yahoo.com", "partnerads.ysm.yahoo.com",
  "log.fc.yahoo.com", "gemini.yahoo.com", "adtech.yahooinc.com", "extmaps-api.yandex.net",
  "appmetrica.yandex.ru", "adfstat.yandex.ru", "metrika.yandex.ru", "google-analytics.com",
  "advertising.yandex.ru", "offerwall.yandex.net", "adfox.yandex.ru", "auction.unityads.unity3d.com",
  "webview.unityads.unity3d.com", "config.unityads.unity3d.com", "adserver.unityads.unity3d.com", "iot-eu-logser.realme.com",
  "iot-logser.realme.com", "bdapi-ads.realmemobile.com", "bdapi-in-ads.realmemobile.com", "api.ad.xiaomi.com",
  "data.mistat.xiaomi.com", "data.mistat.india.xiaomi.com", "data.mistat.rus.xiaomi.com", "sdkconfig.ad.xiaomi.com",
  "sdkconfig.ad.intl.xiaomi.com", "globalapi.ad.xiaomi.com", "tracking.rus.miui.com", "adsfs.oppomobile.com",
  "adx.ads.oppomobile.com", "ck.ads.oppomobile.com", "data.ads.oppomobile.com", "metrics.data.hicloud.com",
  "metrics2.data.hicloud.com", "grs.hicloud.com", "logservice.hicloud.com", "logservice1.hicloud.com",
  "logbak.hicloud.com", "click.oneplus.cn", "open.oneplus.net", "samsungads.com",
  "smetrics.samsung.com", "nmetrics.samsung.com", "samsung-com.112.2o7.net", "analytics-api.samsunghealthcn.com",
  "advertising.apple.com", "tr.iadsdk.apple.com", "iadsdk.apple.com", "metrics.icloud.com",
  "metrics.apple.com", "metrics.mzstatic.com", "api-adservices.apple.com", "books-analytics-events.apple.com",
  "weather-analytics-events.apple.com", "notes-analytics-events.apple.com", "fwtracks.freshmarketer.com", "adtago.s3.amazonaws.com",
  "analytics.s3.amazonaws.com", "advice-ads.s3.amazonaws.com", "advertising-api-eu.amazon.com", "pagead2.googlesyndication.com",
  "adservice.google.com", "afs.googlesyndication.com", "mediavisor.doubleclick.net", "ads30.adcolony.com", 
  "adc3-launch.adcolony.com", "events3alt.adcolony.com", "wd.adcolony.com", "adservetx.media.net",
  "app-measurement.com", "analytics.google.com", "click.googleanalytics.com", "identify.hotjar.com",
  "events.hotjar.io", "o2.mouseflow.com", "gtm.mouseflow.com", "api.mouseflow.com",
  "realtime.luckyorange.com", "upload.luckyorange.net", "cs.luckyorange.net", "an.facebook.com",
  "static.ads-twitter.com", "ads-api.twitter.com",
];

const blockedsites = [
  "pornhub.com", "xvideos.com",
  "xnxx.com", "pornmate.com",
  "bestpornsites.net"
];

var adblock = 1;

const k = new TextEncoder().encode(btoa(new Date().toISOString().slice(0, 10) + location.host).split('').reverse().join('').slice(6.7));
self.__uv$config = {
    prefix: "/uv/service/",
	encodeUrl: s => {
        if (!s) return s;
        try {
            const d = new TextEncoder().encode(s), o = new Uint8Array(d.length);
            for (let i = 0; i < d.length; i++) o[i] = d[i] ^ k[i % 8];
            return Array.from(o, b => b.toString(16).padStart(2, "0")).join("");
        } catch { return s; }
    },
    decodeUrl: s => {
        if (!s) return s;
        try {
            const n = Math.min(s.indexOf('?') + 1 || s.length + 1, s.indexOf('#') + 1 || s.length + 1, s.indexOf('&') + 1 || s.length + 1) - 1;
            let h = 0;
            for (let i = 0; i < n && i < s.length; i++) {
                const c = s.charCodeAt(i);
                if (!((c >= 48 && c <= 57) || (c >= 65 && c <= 70) || (c >= 97 && c <= 102))) break;
                h = i + 1;
            }
            if (h < 2 || h % 2) return decodeURIComponent(s);
            const l = h >> 1, o = new Uint8Array(l);
            for (let i = 0; i < l; i++) {
                const x = i << 1;
                o[i] = parseInt(s[x] + s[x + 1], 16) ^ k[i % 8];
            }
            return new TextDecoder().decode(o) + s.slice(h);
        } catch { return decodeURIComponent(s); }
    },
    handler: '/uv/uv.handler.js',
    client: '/uv/uv.client.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
  },

   self.__uv$config.middleware = (request) => {
    const url = new URL(request.url);
    let host = url.origin;
    let other = url.href.substring(url.origin.length, url.href.length);

    if (url.href.includes("defrgthyju")) {
      other = other.substring(0, other.length - 10);
      adblock = 0;
    }
    if (url.href.includes("lokijuhygt")) {
      other = other.substring(0, other.length - 10);
      adblock = 1;
    }
    if (url.href.includes("?wfryhktgb")) {
      host = self.location.origin;
    }

    // Blocking logic for blockedsites
    if (blockedsites.includes(url.host) ||
      url.href.toLocaleLowerCase().includes("porn") ||
      url.href.toLocaleLowerCase().includes("18+") ||
      url.href.toLocaleLowerCase().includes("xvideos") ||
      url.href.toLocaleLowerCase().includes("xxx")) {
      // Redirect to a blocked page if the site is in blockedsites
      if (!url.href.includes("?wfryhktgb")) {
        return new Request(self.location.origin + "/Checkfailed.html", request);
      }
    }

    // Ad blocking logic
    if (adblock === 1) {
       if (blockedsites.includes(url.host)) {
        return new Response(null, {});
      }
      if (url.pathname.includes("ads.js") ||
        url.pathname.includes("pagead.js") ||
		url.pathname.includes("ad.status.js") ||
        url.pathname.includes("partner.ads.js")) {
        return new Response(null, {});
      }
    }

    // Redirect requests
    if (request.method === "GET") {
       return fetch(host + other, request);
    }

    return request;
  }
