
//  Attempt at deminifying securly.min.js 
//  Sadly it is still hard to read due to crappy variable names.
//  But this is about the best we can get

function ENCRYPT(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }

    function o(e) {
        var t, o = "";
        for (t = 7; t >= 0; t--) o += (e >>> 4 * t & 15).toString(16);
        return o
    }
    var n, r, i, a, s, l, d, u, c, w = new Array(80),
        f = 1732584193,
        h = 4023233417,
        g = 2562383102,
        m = 271733878,
        p = 3285377520,
        b = (e = function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", o = 0; o < e.length; o++) {
                var n = e.charCodeAt(o);
                n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128))
            }
            return t
        }(e)).length,
        O = new Array;
    for (r = 0; r < b - 3; r += 4) i = e.charCodeAt(r) << 24 | e.charCodeAt(r + 1) << 16 | e.charCodeAt(r + 2) << 8 | e.charCodeAt(r + 3), O.push(i);
    switch (b % 4) {
        case 0:
            r = 2147483648;
            break;
        case 1:
            r = e.charCodeAt(b - 1) << 24 | 8388608;
            break;
        case 2:
            r = e.charCodeAt(b - 2) << 24 | e.charCodeAt(b - 1) << 16 | 32768;
            break;
        case 3:
            r = e.charCodeAt(b - 3) << 24 | e.charCodeAt(b - 2) << 16 | e.charCodeAt(b - 1) << 8 | 128
    }
    for (O.push(r); O.length % 16 != 14;) O.push(0);
    for (O.push(b >>> 29), O.push(b << 3 & 4294967295), n = 0; n < O.length; n += 16) {
        for (r = 0; r < 16; r++) w[r] = O[n + r];
        for (r = 16; r <= 79; r++) w[r] = t(w[r - 3] ^ w[r - 8] ^ w[r - 14] ^ w[r - 16], 1);
        for (a = f, s = h, l = g, d = m, u = p, r = 0; r <= 19; r++) c = t(a, 5) + (s & l | ~s & d) + u + w[r] + 1518500249 & 4294967295, u = d, d = l, l = t(s, 30), s = a, a = c;
        for (r = 20; r <= 39; r++) c = t(a, 5) + (s ^ l ^ d) + u + w[r] + 1859775393 & 4294967295, u = d, d = l, l = t(s, 30), s = a, a = c;
        for (r = 40; r <= 59; r++) c = t(a, 5) + (s & l | s & d | l & d) + u + w[r] + 2400959708 & 4294967295, u = d, d = l, l = t(s, 30), s = a, a = c;
        for (r = 60; r <= 79; r++) c = t(a, 5) + (s ^ l ^ d) + u + w[r] + 3395469782 & 4294967295, u = d, d = l, l = t(s, 30), s = a, a = c;
        f = f + a & 4294967295, h = h + s & 4294967295, g = g + l & 4294967295, m = m + d & 4294967295, p = p + u & 4294967295
    }
    return (c = o(f) + o(h) + o(g) + o(m) + o(p)).toLowerCase()
}

function createBlockingRequest(e, t) {
    var o = new XMLHttpRequest;
    return o.open(e, t, !1), o
}

function createNonBlockingRequest(e, t) {
    var o = new XMLHttpRequest;
    return o.open(e, t, !0), o
}

function fetchClusterUrl() {
    var e = window.userEmail.split("@")[1],
        t = createBlockingRequest("get", checkClusterURL + "/crextn/cluster?domain=" + e + "&reasonCode=" + window.clusterFound),
        o = localStorage.getItem("cluster");
    if (o && 2 == (o = o.split(",")).length) {
        var n;
        if ((n = (new Date).getTime() / 1e3 - o[1]) < 31536e3 && "UNKNOWN_SCHOOL" != o[0] && "unknown" != window.ClusterUrl) return window.clusterUrl = o[0], window.clusterFound = window.clusterStatus.FOUND, "UNKNOWN_SCHOOL" !== window.clusterUrl && "AVOID_OS" !== window.clusterUrl && "unknown" !== window.clusterUrl ? (1 == window.needToReloadTabs && (window.needToReloadTabs = 0, checkAllLoadedTabs()), latencyCheck()) : "AVOID_OS" == window.clusterUrl && (window.clusterFound = window.clusterStatus.AVOID_OS), setupIWF(), void getGeolocationStatus();
        if (n < 3600 && ("UNKNOWN_SCHOOL" == o[0] || "unknown" == window.ClusterUrl)) return window.clusterUrl = o[0], "UNKNOWN_SCHOOL" == window.clusterUrl && (window.clusterFound = window.clusterStatus.UNKNOWN_SCHOOL), void setupIWF()
    }
    t.onreadystatechange = function() {
        if (4 == t.readyState && 200 == t.status) {
            var e = t.responseText.trim();
            window.debugIWF = 0, -1 !== e.lastIndexOf("_disableIWF") ? (window.clusterUrl = e.slice(0, e.lastIndexOf("_disableIWF")), window.debugIWF = 1, localStorage.clear()) : -1 !== e.lastIndexOf("_updateIWF") ? (window.clusterUrl = e.slice(0, e.lastIndexOf("_updateIWF")), window.debugIWF = 2, downloadIWFList(), downloadNonCIPA()) : (window.clusterUrl = e, localStorage.setItem("cluster", window.clusterUrl + "," + (new Date).getTime() / 1e3)), window.clusterFound = window.clusterStatus.FOUND, setupIWF(), getGeolocationStatus(), "UNKNOWN_SCHOOL" != window.clusterUrl ? "AVOID_OS" != window.clusterUrl ? "UNKNOWN_SCHOOL" !== window.clusterUrl && "AVOID_OS" !== window.clusterUrl && "unknown" !== window.clusterUrl && latencyCheck() : window.clusterFound = window.clusterStatus.AVOID_OS : window.clusterFound = window.clusterStatus.UNKNOWN_SCHOOL
        } else window.clusterFound = window.clusterStatus.ERROR
    };
    try {
        t.send()
    } catch (e) {
        console.log("Send error uc4")
    }!0 === forceClusterUrl && (window.clusterUrl = DEBUG_clusterUrl, window.clusterFound = 1, getGeolocationStatus()), setupOrReload()
}

function fetchDNS() {
    domainCheck = checkClusterURL.replace(/http:\/\/|https:\/\//gi, "");
    var e = createBlockingRequest("get", "https://dns.google.com/resolve?name=" + domainCheck + "&type=A");
    e.onreadystatechange = function() {
        if (200 == e.status) {
            var t = JSON.parse(e.responseText.trim());
            "object" == typeof t && (t.Answer.length >= 2 ? (window.checkClusterURL = "https://" + t.Answer[1].data, fetchClusterUrl()) : 1 == t.Answer.length && (window.checkClusterURL = "https://" + t.Answer[0].data, fetchClusterUrl()))
        }
    }, e.send()
}

function fetchUserAPI() {
    chrome.identity.getProfileUserInfo(function(e) {
        var t = e.email;
        !0 === forceUserEmail && (t = DEBUG_userEmail), "" !== t ? (window.userEmail = t, window.userFound = window.userStatus.FOUND, fetchClusterUrl()) : (window.clusterFound = window.clusterStatus.AVOID_OS, window.clusterUrl = "AVOID_OS")
    })
}

function skipCacheAndLogAlways(e, t) {
    return -1 != e.indexOf("twitter.com") ? 1 : -1 != e.indexOf("facebook.com") ? 1 : -1 != e.indexOf("google.co") && -1 == e.indexOf("mail.google.co") && -1 == e.indexOf("drive.google.co") ? 1 : -1 != e.indexOf("bing.co") ? 1 : -1 != e.indexOf("search.yahoo.co") ? 1 : -1 != e.indexOf("wikipedia.org") ? 1 : -1 != e.indexOf("youtube.co") ? 1 : 0
}

function isBlockingInProgress(e) {
    return new Promise(function(t, o) {
        chrome.tabs.get(e, function(e) {
            if (e && "loading" == e.status) {
                var o = e.url;
                void 0 !== e.pendingUrl && (o = e.pendingUrl);
                var n = getLocation(o).hostname;
                if (-1 != n.indexOf("securly.com") || -1 != n.indexOf("iheobagjkfklnlikgihanlhcddjoihkg")) return void t(!0)
            }
            t(!1)
        })
    })
}

function getLocation(e) {
    var t = document.createElement("a");
    return t.href = e, t
}

function interceptOrNot(e) {
    var t = 0,
        o = e.type,
        n = e.url,
        r = getLocation(n).hostname,
        i = getLocation(n).pathname;
    if (window.clusterFound == window.clusterStatus.AVOID_OS || "AVOID_OS" == window.clusterUrl || "UNKNOWN_SCHOOL" == window.clusterUrl) return t = 0;
    if (0 === e.url.indexOf("file")) return 0;
    var a = n.replace(/^https?\:\/\//i, ""),
        s = (a = a.replace(/^www\.\b/i, "")).length;
    "/" === a.charAt(s - 1) && (a = a.slice(0, -1));
    var l = ENCRYPT(a);
    if (null !== localStorage.getItem(l)) return takeDenyActionTabs("G", "BL", "", window.btoa(a), e.tabId), t = 0;
    if (window.failedOpenObj && window.failedOpenObj.isFailedOpen()) {
        if (window.failedOpenObj.isWideOpenMode()) t = 0;
        else {
            0 == r.indexOf("www.") && (r = r.substr(4));
            var d = ENCRYPT(r),
                u = localStorage.getItem("NC:" + d);
            null == u || "main_frame" != o && "sub_frame" != o || takeToFailedOpenBlockedPage(e.tabId, r, u)
        }
        return t
    }
    if (-1 == n.indexOf("youtube.com") && (n = n.toLowerCase()), -1 != r.indexOf("google.co") && -1 != i.indexOf("/maps/") && -1 != i.indexOf("/place/")) return t = 1;
    if ("main_frame" !== o && "sub_frame" !== o && "xmlhttprequest" !== o) return t = 0;
    if (-1 != r.indexOf("securly.com")) {
        if (t = 0, -1 != i.indexOf("crextn/debug") && "xmlhttprequest" != o) {
            var c = getDebugInfo();
            c.sourceFunction = "interceptOrNot", sendDebugInfo(c)
        }
        return t
    }
    return -1 != r.indexOf("twitter.com") && (-1 != i.indexOf(window.twitterMessageURI) || -1 != i.indexOf("api/graphql") && -1 != i.indexOf("CreateTweet") || -1 != n.indexOf(window.twitterPrefetchTimestamp) && -1 == e.tabId) && "xmlhttprequest" == o ? t = 1 : !r.indexOf("facebook.com") || -1 == i.indexOf("updatestatus") && -1 == i.indexOf("webgraphql") && -1 == i.indexOf("api/graphql") || "xmlhttprequest" != o ? -1 != r.indexOf("google.co") && -1 != i.indexOf("/plusappui/mutate") && "xmlhttprequest" == o ? t = 1 : -1 != r.indexOf("google.co") ? (t = 0, "xmlhttprequest" != o && "main_frame" != o ? t = 0 : -1 != r.indexOf("accounts.google.co") || -1 != r.indexOf("docs.google.co") || -1 != i.indexOf("/calendar/") || -1 != r.indexOf("code.google.co") || -1 != i.indexOf("/cloudprint") || -1 != i.indexOf("/_/chrome/newtab") || -1 != r.indexOf("appengine.google.com") || -1 != i.indexOf("/complete/search") || -1 != i.indexOf("/webhp") ? t = 0 : -1 != r.indexOf("meet.google.co") ? t = 1 : -1 != i.indexOf("/search") || -1 != i.indexOf("/#q") || -1 != r.indexOf("translate.google.co") || -1 != r.indexOf("remotedesktop.google.co") ? t = 1 : -1 != r.indexOf("mail.google.co") && "main_frame" == o ? t = 1 : -1 != r.indexOf("drive.google.co") && "main_frame" == o ? t = 1 : -1 != r.indexOf("sites.google.co") && "main_frame" == o ? t = 1 : -1 != r.indexOf("hangouts.google.co") && "main_frame" == o ? t = 1 : -1 != r.indexOf("plus.google.co") && "main_frame" == o ? t = 1 : 0) : -1 != r.indexOf("youtube.com") && "main_frame" == o ? t = 1 : -1 != r.indexOf("youtube.com") && "sub_frame" == o && -1 != i.indexOf("embed") ? t = 1 : -1 == r.indexOf("youtube.com") || -1 == i.indexOf("watch_fragments_ajax") && -1 == i.indexOf("doubleclick/DARTIframe.html") && -1 == i.indexOf("ad_data_204") && -1 == i.indexOf("annotations_invideo") && -1 == i.indexOf("api/stats/atr") && -1 == i.indexOf("get_video_info") ? -1 != i.indexOf("youtubei/v1/search") || -1 != i.indexOf("youtube.com/results") ? 1 : "main_frame" != o && "sub_frame" != o || -1 == r.indexOf("youtube.com") ? -1 != r.indexOf("facebook.com") && "sub_frame" == o ? t = 0 : -1 != r.indexOf("bing.com") && -1 != i.indexOf("/fd/fb") || -1 != r.indexOf("ssl.bing.com") || -1 != i.indexOf("/passport.aspx") ? t = 0 : -1 != r.indexOf("bing.com") && "sub_frame" === o ? t = 1 : "main_frame" == o || "sub_frame" == o && 1 == window.checkiFrames ? t = 1 : t : -1 != i.indexOf("youtubei/v1/search") ? 1 : "/" == i ? 1 : -1 == i.indexOf("/results") && -1 == i.indexOf("/watch") ? 0 : -1 != n.indexOf("pbj=1") ? 0 : t = 1 : t = 0 : t = 1
}

function getBlockUrl(e, t, o, n, r) {
    var i = "domainblockedforuser",
        a = "";
    "GL" == e && (i = "GEO"), "-1" != o && (i = "safesearch", a = window.btoa(o));
    var s = "";
    if ("BL" != t && "BL_SRCH" != t && "WL" != t && "WL_SRCH" != t || (s = t), "BL" != t && "BL_SRCH" != t || (i = "G" == e ? "globalblacklist" : "policyblacklist", t = "BL"), "WL" != t && "WL_SRCH" != t || (i = "whitelistonly", t = "WL"), "BANNED" == t && (i = "banned"), "unknown" != window.clusterUrl) {
        var l = window.atob(n),
            d = l.substr(l.indexOf("://") + 3);
        n = window.btoa(d);
        var u = "";
        return u = window.clusterUrl.replace("/crextn", "") + "/blocked?useremail=" + window.userEmail + "&reason=" + i + "&categoryid=" + t + "&policyid=" + e + "&keyword=" + a + "&url=" + n + "&ver=" + window.version + (1 == r ? "&subFrame=1" : ""), window.geoLat && window.geoLng && (u += "&lat=" + window.geoLat + "&lng=" + window.geoLng), s && (u += "&listType=" + s), u
    }
}

function takeDenyActionTabs(e, t, o, n, r, i, a) {
    invalidateSkipListCaching(n, !1), clearWebCache(n), window.brokredRequest = [];
    var s = "domainblockedforuser",
        l = "";
    "GL" == e && (s = "GEO"), "-1" != o && (s = "safesearch", l = window.btoa(o));
    var d = "";
    if ("BL" != t && "BL_SRCH" != t && "WL" != t && "WL_SRCH" != t || (d = t), "BL" != t && "BL_SRCH" != t || (s = "G" == e ? "globalblacklist" : "policyblacklist", t = "BL"), "BANNED" == t && (s = "banned"), "WL" != t && "WL_SRCH" != t || (s = "whitelistonly", t = "WL"), "unknown" != window.clusterUrl) {
        var u = window.atob(n),
            c = u.substr(u.indexOf("://") + 3);
        n = window.btoa(c);
        var w = window.clusterUrl.replace("/crextn", ""),
            f = window.userEmail,
            h = "";
        return h = w + "/blocked?useremail=" + f + "&reason=" + s + "&categoryid=" + t + "&policyid=" + e + "&keyword=" + l + "&url=" + n + "&ver=" + window.version + (1 == i ? "&subFrame=1" : ""), window.geoLat && window.geoLng && (h += "&lat=" + window.geoLat + "&lng=" + window.geoLng), d && (h += "&listType=" + d), void 0 !== a && a && (h += "&rebroker=1"), void isBlockingInProgress(r).then(function(e) {
            e || setBlockedPage(r, h)
        }).catch(function(e) {
            console.log("exception in checking blocking progress", r), setBlockedPage(r, h)
        })
    }
}

function setBlockedPage(e, t) {
    -1 == e && (e = null), e > 0 && (window.tabsBeingBlocked[e] = t, chrome.tabs.executeScript(e, {
        code: "window.stop();",
        runAt: "document_start"
    }, function() {})), chrome.tabs.update(e, {
        url: "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/blocked.html"
    }, function() {
        chrome.runtime.lastError
    }), chrome.tabs.update(e, {
        url: t
    }, function() {
        chrome.runtime.lastError && (console.log("some error while redirecting to blocked page", chrome.runtime.lastError), setTimeout(function() {
            chrome.tabs.update(null, {
                url: t
            }, function() {})
        }, 500))
    })
}

function takeDenyAction(e, t, o) {
    invalidateSkipListCaching(b64url, !1), clearWebCache(o);
    var n = "domainblockedforuser";
    if ("0" == e && "-1" == t) return {
        cancel: !0
    };
    var r = "";
    if ("BL" != t && "BL_SRCH" != t && "WL" != t && "WL_SRCH" != t || (r = t), "BL" != t && "BL_SRCH" != t || (n = "G" == e ? "globalblacklist" : "policyblacklist", t = "BL"), "BANNED" == t && (n = "banned"), "unknown" == window.clusterUrl) return {
        cancel: !0
    };
    var i = window.atob(o),
        a = i.substr(i.indexOf("://") + 3);
    o = window.btoa(a);
    var s = window.clusterUrl.replace("/crextn", "") + "/blocked?useremail=" + window.userEmail + "&reason=" + n + "&categoryid=" + t + "&policyid=" + e + "&url=" + o + "&ver=" + window.version + (1 == window.isSubFrame ? "&subFrame=1" : "");
    return window.geoLat && window.geoLng && (s += "&lat=" + window.geoLat + "&lng=" + window.geoLng), r && (s += "&listType=" + r), {
        redirectUrl: s
    }
}

function takeSafeSearchAction(e, t) {
    if (-1 != e.indexOf("google.co") && (-1 != t.indexOf("/search?") || -1 != t.indexOf("/#q=")) && -1 == t.indexOf("safe=active")) {
        var o = new URL(t);
        return o.searchParams.delete("safe"), o.searchParams.set("safe", "active"), o.toString()
    }
    return -1 != e.indexOf("bing.com") && -1 == t.indexOf("adlt=strict") ? -1 != t.indexOf("?") ? t + "&adlt=strict" : t + "?adlt=strict" : -1 != e.indexOf("search.yahoo.com") && -1 == t.indexOf("vm=r") ? -1 != t.indexOf("?") ? t + "&vm=r" : t + "?vm=r" : t
}

function takeCreativeCommonImageSearchAction(e) {
    if (-1 != e.indexOf("google.co") && -1 != e.indexOf("tbm=isch")) {
        var t = new URL(e);
        return t.searchParams.delete("tbs"), t.searchParams.set("tbs", "il:cl"), t.toString()
    }
    if (-1 != e.indexOf("bing.com/images/search") && -1 == e.toLowerCase().indexOf("&qft=+filterui:licensetype-any")) return e + "&qft=+filterui:licenseType-Any";
    return -1 != e.indexOf("search.yahoo.com/search/images") && -1 == e.indexOf("&imgl=fmsuc") ? e + "&imgl=fmsuc" : e
}

function getYtSSRequestHeaders(e, t) {
    if (-1 != e.indexOf("/results") || -1 != e.indexOf("/search") || -1 != e.indexOf("/watch")) {
        for (var o = "", n = 0; n < t.length; ++n)
            if ("Cookie" === t[n].name) {
                o = t[n].value, t.splice(n, 1);
                break
            } if ("" == o) t.push({
            name: "Cookie",
            value: "PREF=f2=8000000"
        });
        else {
            var r = 0,
                i = o.split("; ");
            for (n = 0; n < i.length; ++n) - 1 != i[n].indexOf("PREF") && (-1 == i[n].indexOf("f2=8000000") && (i[n] += "&f2=8000000"), r = 1), -1 != i[n].indexOf("SID=") && (i[n] = "");
            0 == r && i.push("PREF=f2=8000000");
            var a = "";
            for (n = 0; n < i.length; ++n) a += i[n], a += "; ";
            a = a.substring(0, a.length - 2), t.push({
                name: "Cookie",
                value: a
            })
        }
    }
    return t
}

function getPauseAction(e) {
    return invalidateSkipListCaching(e, !0), clearWebCache(e), window.brokredRequest = [], "unknown" == window.clusterUrl ? {
        cancel: !0
    } : {
        redirectUrl: window.clusterUrl.replace("/crextn", "") + "/paused"
    }
}

function takePauseActionTabs(e, t) {
    var o = getPauseAction(e);
    if (void 0 !== o.redirectUrl) {
        var n = o.redirectUrl;
        chrome.tabs.update(t, {
            url: "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/blocked.html"
        }, r), chrome.tabs.update(t, {
            url: n
        }, r), setTimeout(function() {
            chrome.tabs.update(null, {
                url: n
            }, r)
        }, 500)
    }

    function r() {
        chrome.runtime.lastError
    }
}

function takeToFailedOpenBlockedPage(e, t, o) {
    var n = btoa(t);
    r = [], 0 != (Math.pow(2, 3) & o) && r.push("Pornography"), 0 != (Math.pow(2, 4) & o) && r.push("Drugs"), 0 != (Math.pow(2, 5) & o) && r.push("Gambling");
    var r = btoa(r.join(", "));
    window.brokredRequest = [], chrome.tabs.update(e, {
        url: "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/blocked.html?site=" + n + "&category=" + r
    }, function() {
        chrome.runtime.lastError
    })
}

function checkSkipListCaching(e) {
    var t = "",
        o = document.createElement("a");
    o.href = e.url;
    var n = cleanURL(o.hostname.toLowerCase()),
        r = Math.floor(Date.now() / 1e3),
        i = Object.keys(window.skipList);
    if (i && -1 != i.indexOf(n)) {
        if (t = n, ttlForDomain = window.skipList[n].ttl, lastBrokerCall = window.skipList[n].last_broker_call, -1 == ttlForDomain) return 0;
        if (r - lastBrokerCall < ttlForDomain) return 0
    }
    for (var a = 0; a < i.length; a++) {
        if (-1 != i[a].indexOf("*"))
            if (window.skipList[i[a]].regx.test(cleanURL(e.url))) {
                if (t = i[a], ttlForDomain = window.skipList[i[a]].ttl, lastBrokerCall = window.skipList[i[a]].last_broker_call, -1 == ttlForDomain) return 0;
                if (r - lastBrokerCall < ttlForDomain) return 0
            }
    }
    return t.length > 0 && (window.skipList[t].last_broker_call = r), 1
}

function invalidateSkipListCaching(e, t) {
    url = window.atob(e);
    var o = Object.keys(window.skipList);
    if (t)
        for (var n = 0; n < o.length; n++) window.skipList[o[n]].last_broker_call = 0;
    else {
        var r = document.createElement("a");
        r.href = url;
        var i = cleanURL(r.hostname.toLowerCase());
        o && -1 != o.indexOf(i) && (window.skipList[i].last_broker_call = 0);
        for (n = 0; n < o.length; n++) {
            if (-1 != o[n].indexOf("*")) window.skipList[o[n]].regx.test(cleanURL(url)) && (window.skipList[o[n]].last_broker_call = 0)
        }
    }
}

function setupOrReload() {
    window.userFound == window.userStatus.FOUND && window.clusterFound == window.clusterStatus.FOUND ? ("UNKNOWN_SCHOOL" !== window.clusterUrl && "AVOID_OS" !== window.clusterUrl && "unknown" !== window.clusterUrl && 1 == window.needToReloadTabs && (window.needToReloadTabs = 0, checkAllLoadedTabs()), setTimeout(function() {
        fetchClusterUrl()
    }, 18e5), sessionStorage.clear()) : window.clusterFound == window.clusterStatus.AVOID_OS ? (window.needToReloadTabs = 1, setTimeout(function() {
        fetchClusterUrl()
    }, 18e5), sessionStorage.clear()) : (console.log("https://www.securly.com/crextn/blocked?useremail=" + window.userEmail + "&reason=notregistered&cu=" + window.clusterUrl + "&uf=" + window.userFound + "&cf=" + window.clusterFound + "&ver=" + window.version + "&url="), setTimeout(function() {
        fetchClusterUrl()
    }, 18e5))
}

function getGeolocationStatus() {
    if ("unknown" != window.clusterUrl && "AVOID_OS" != window.clusterUrl && "UNKNOWN_SCHOOL" != window.clusterUrl) {
        var e = createBlockingRequest("get", window.clusterUrl + "/getGeoStatus?userEmail=" + window.userEmail);
        e.onload = function() {
            window.geolocation = parseInt(e.responseText.trim()), window.geolocation && (getGeolocation(), null != window.geoIntervalId && clearInterval(window.geoIntervalId), window.geoIntervalId = setInterval(function() {
                getGeolocation()
            }, 6e4))
        };
        try {
            e.send()
        } catch (e) {
            console.log("Geolocation request error.")
        }
    }
}

function getGeolocation() {
    navigator.geolocation.getCurrentPosition(function(e) {
        window.geoLat = e.coords.latitude, window.geoLng = e.coords.longitude
    }, function(e) {
        console.log("Geolocation error occurred. Error code: " + e.code)
    }, {
        timeout: 3e4,
        maximumAge: 3e5
    })
}

function getRemoteIPGeo() {
    if ("unknown" != window.clusterUrl) {
        var e = createBlockingRequest("get", window.clusterUrl + "/getGeoStatus?ip=1");
        e.onload = function() {
            e.responseText.trim() != window.geoLastIP && (getGeolocation(), window.geoLastIP = e.responseText.trim())
        };
        try {
            e.send()
        } catch (e) {
            console.log("Geolocation remote IP request error.")
        }
    }
}

function getVersion(e) {
    var t = createBlockingRequest("GET", "manifest.json");
    t.onload = function(e) {
        var o = JSON.parse(t.responseText);
        window.version = o.version
    };
    try {
        t.send()
    } catch (e) {
        console.log("Send error u2")
    }
}

function getQueryVariable(e, t) {
    var o = document.createElement("a");
    o.href = e;
    for (var n = o.search.replace(/\?/, "").split("&"), r = 0; r < n.length; r++) {
        var i = n[r].split("=");
        if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
    }
    return ""
}

function normalizeHostname(e) {
    var t = e;
    return 0 == e.indexOf("www.") ? t = e.substr(4) : 0 == e.indexOf("m.") && (t = e.substr(2)), t
}

function extractTranslateHostname(e) {
    var t = "translate.google.com",
        o = getQueryVariable(e, "u");
    if ("" != o) {
        var n = (o = (o = (o = (o = decodeURIComponent(o)).toLowerCase()).replace("http://", "")).replace("https://", "")).indexOf("/");
        t = -1 != n ? o.substr(0, n) : o
    }
    return t
}

function sendDebugInfo(e) {
    var t = window.clusterUrl + "/debug",
        o = new XMLHttpRequest;
    o.open("POST", t), o.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    try {
        o.send(JSON.stringify(e))
    } catch (e) {
        console.log("Send error u3")
    }
}

function checkAllLoadedTabs() {
    window.needToReloadTabs = 0, chrome.tabs.query({}, function(e) {
        for (var t = 0; t < e.length; t++) - 1 == e[t].url.indexOf("securly.com") && (-1 == e[t].url.indexOf("http://") && -1 == e[t].url.indexOf("https://") || chrome.tabs.reload(e[t].id))
    })
}

function clearWebCache(e) {
    var t = (new Date).getTime() - 3e5;
    chrome.browsingData.removeCache({
        since: t
    }, function() {
        chrome.runtime.lastError
    });
    try {
        var o = window.atob(e),
            n = new URL(o).hostname.replace("www.", "");
        chrome.browsingData.remove({
            origins: ["https://" + n, "https://www." + n]
        }, {
            cacheStorage: !0,
            fileSystems: !0,
            indexedDB: !0,
            localStorage: !0,
            pluginData: !0,
            serviceWorkers: !0,
            webSQL: !0
        }, function() {})
    } catch (t) {
        console.log("Clearing web cache failed. b64Url" + e)
    }
}

function getDebugInfo() {
    var e = {
            clusterUrl: window.clusterUrl,
            userEmail: window.userEmail
        },
        t = createBlockingRequest("get", window.clusterUrl.replace("crextn", "app/session"));
    t.onerror = function() {
        e.sessionInfo = "Network Error", console.log(e)
    }, t.onload = function() {
        e.sessionInfo = t.responseText
    }, t.send();
    for (var o = ["http://www.maxim.com", "http://www.amazon.com", "http://www.google.com", "http://www.bing.com", "http://search.yahoo.com", "http://www.youtube.com", "http://mail.google.com", "http://plus.google.com", "http://www.facebook.com", "http://docs.google.com", "http://drive.google.com", "http://sites.google.com"], n = 0; n < o.length; n++) {
        e = getFilteringInfo(o[n], e)
    }
    return e
}

function getFilteringInfo(e, t) {
    var o = createBlockingRequest("get", siteUrlToBrokerUrl(e));
    return o.onerror = function() {
        t[e] = "Network Error"
    }, o.onload = function() {
        t[e] = o.responseText.trim()
    }, o.send(), t
}

function siteUrlToBrokerUrl(e) {
    var t = document.createElement("a");
    t.href = e;
    var o = t.hostname.toLowerCase(),
        n = window.btoa(e);
    return window.geolocation ? window.clusterUrl + "/broker?useremail=" + window.userEmail + "&reason=crextn&host=" + o + "&url=" + n + "&msg=&ver=" + window.version + "&cu=" + window.clusterUrl + "&uf=" + window.userFound + "&cf=" + window.clusterFound + "&lat=" + window.geoLat + "&lng=" + window.geoLng : window.clusterUrl + "/broker?useremail=" + window.userEmail + "&reason=crextn&host=" + o + "&url=" + n + "&msg=&ver=" + window.version + "&cu=" + window.clusterUrl + "&uf=" + window.userFound + "&cf=" + window.clusterFound
}

function selfClusterCheckBeforeBroker() {
    ("unknown" === window.clusterUrl || window.clusterFound !== window.clusterStatus.FOUND && window.clusterFound !== window.clusterStatus.AVOID_OS) && (window.needToReloadTabs = 0, fetchClusterUrl())
}

function downloadIWFList() {
    localStorage.clear();
    var e = createNonBlockingRequest("get", "http://cdn1.securly.com/iwf-encode.txt");
    e.onreadystatechange = function() {
        if (4 == e.readyState)
            if (200 == e.status) {
                String.prototype.replaceAll = function(e, t) {
                    return this.split(e).join(t)
                };
                for (var t = e.responseText.replaceAll("\r", "").trim().split("\n"), o = 0; o < t.length; o++) localStorage.setItem(t[o], "1");
                var n = new Date;
                localStorage.setItem("currIWFTime", n)
            } else console.log("iwf error", e.status)
    }, e.send()
}

function downloadNonCIPA() {
    var e = createNonBlockingRequest("get", "http://cdn1.securly.com/non-cipa-encode.txt");
    e.onreadystatechange = function() {
        if (4 == e.readyState)
            if (200 == e.status) {
                String.prototype.replaceAll = function(e, t) {
                    return this.split(e).join(t)
                };
                for (var t = e.responseText.replaceAll("\r", "").trim().split("\n"), o = 0; o < t.length; o++) {
                    var n = t[o].split(",");
                    localStorage.setItem("NC:" + n[0], n[1])
                }
            } else console.log("non-cipa error", e.status)
    }, e.send()
}

function setupIWF() {
    var e = (new Date).getTime(),
        t = Date.parse(localStorage.getItem("currIWFTime"));
    isNaN(t) ? isNaN(t) && 0 === window.debugIWF && (downloadIWFList(), downloadNonCIPA()) : e - t >= window.IWFTimeout && (downloadIWFList(), downloadNonCIPA())
}

function myB64Encode(e, t) {
    for (var o = window.btoa(e).split(""), n = 0; n < o.length; n++) o[n] = myB64EncodeHelper(o[n], t);
    return o.join("")
}

function myB64EncodeHelper(e, t) {
    var o = e.charCodeAt(0);
    return "0" <= e && e <= "9" ? (o += t %= 10) > "9".charCodeAt(0) && (o -= 10) : "A" <= e && e <= "Z" ? (o += t %= 26) > "Z".charCodeAt(0) && (o -= 26) : "a" <= e && e <= "z" && (o += t %= 26) > "z".charCodeAt(0) && (o -= 26), String.fromCharCode(o)
}

function getCookies() {
    for (var e = document.cookie.split(";"), t = {}, o = 0; o < e.length; o++) {
        var n = e[o].split("=");
        t[(n[0] + "").trim()] = unescape(n[1])
    }
    return t
}

function setCookie(e, t, o) {
    var n = 0;
    if (o) {
        var r = new Date;
        r.setTime(r.getTime() + 60 * o * 60 * 1e3), n = "expires=" + r.toUTCString()
    }
    document.cookie = e + "=" + t + ";" + n + ";path=/"
}

function setClassroomCookies() {
    chrome.cookies.getAll({
        domain: "securly.com",
        name: "live_session"
    }, function(e) {
        e && e.length > 0 ? setCookie("live_session", e[0].value, 5) : setCookie("live_session", "0", 5)
    }), chrome.cookies.getAll({
        domain: "securly.com",
        name: "classroom_enabled"
    }, function(e) {
        e && e.length > 0 ? setCookie("classroom_enabled", e[0].value, 1440) : setCookie("classroom_enabled", "0", 1440)
    })
}

function setClearCacheCookie(e) {
    var t = new URL(window.clusterUrl).host;
    chrome.cookies.getAll({
        domain: t,
        name: "crextn_clear_cache_at"
    }, function(t) {
        if (t && t.length > 0) {
            var o = getCookies();
            setCookie("crextn_clear_cache_at", t[0].value), console.debug("[setClearCacheCookie]", "crextn_clear_cache_at cookie updated", t[0].value), void 0 !== o.crextn_clear_cache_at && o.crextn_clear_cache_at != decodeURIComponent(t[0].value) && (console.debug("[setClearCacheCookie]", "session cleared and rebrokering loaded tabs"), sessionStorage.clear(), rebrokerLoadedTabs(e))
        }
    })
}

function clearCacheIfTTLExpired() {
    var e = getCookies();
    void 0 !== e.crextn_clear_cache_at ? (new Date).getTime() >= new Date(e.crextn_clear_cache_at).getTime() && (console.debug("[clearCacheIfTTLExpired]", "session cleared"), sessionStorage.clear()) : console.debug("[clearCacheIfTTLExpired]", "crextn_clear_cache_at cookie not found")
}

function rebrokerLoadedTabs(e) {
    e = void 0 === e ? "" : e, chrome.tabs.query({}, function(t) {
        for (var o = 0; o < t.length; o++) t[o].id != e && -1 == t[o].url.indexOf("securly.com") && (-1 == t[o].url.indexOf("http://") && -1 == t[o].url.indexOf("https://") || (t[o].initiator = "", t[o].type = "main_frame", t[o].method = "GET", t[o].tabId = t[o].id, onBeforeRequestListener(t[o], !0)))
    })
}

function doBrokerForClassroom() {
    var e = getCookies();
    if (1 == e.classroom_enabled && void 0 !== e.classroom_enabled) {
        if (1 == e.live_session && void 0 !== e.live_session) return !0;
        var t = Math.floor(Date.now() / 1e3);
        return void 0 !== e.last_broker_call ? t - e.last_broker_call > 300 : (setCookie("last_broker_call", t, 5), !0)
    }
    return !1
}

function latencyPing() {
    var e = Date.now(),
        t = createNonBlockingRequest("get", "https://" + window.latencyAPI + "/ping");
    t.onreadystatechange = function() {
        if (4 == t.readyState && 200 == t.status) {
            var o = Date.now() - e;
            createNonBlockingRequest("get", "https://" + window.latencyAPI + "/latency_report?fid=" + window.fid + "&user=" + window.userEmail + "&latency=" + o).send()
        }
    }, t.send()
}

function latencyCheck() {
    var e = localStorage.getItem("last_latency_check");
    if (null == e || Math.floor(Date.now() / 1e3) - e >= 86400) {
        var t = createNonBlockingRequest("get", window.clusterUrl + "/internetQualityFeed?userEmail=" + window.userEmail);
        t.onreadystatechange = function() {
            if (4 == t.readyState)
                if (200 == t.status) {
                    var e = JSON.parse(t.responseText);
                    1 == e.is_active ? (window.fid = e.fid, window.latencyFrequency !== e.frequency && null !== window.latencyInterval && (clearInterval(window.latencyInterval), window.latencyInterval = null), window.latencyFrequency = e.frequency, window.latencyAPI = e.api_server, null === window.latencyInterval && (window.latencyInterval = setInterval(function() {
                        latencyPing()
                    }, Math.floor(60 * window.latencyFrequency * 1e3)))) : null !== window.latencyInterval && (clearInterval(window.latencyInterval), window.latencyInterval = null), localStorage.setItem("last_latency_check", Math.floor(Date.now() / 1e3))
                } else localStorage.setItem("last_latency_check", Math.floor(Date.now() / 1e3))
        }, t.send()
    }
}

function downloadConfig() {
    var e = createNonBlockingRequest("get", "http://cdn1.securly.com/config.json");
    e.onreadystatechange = function() {
        if (200 == e.status && 4 == e.readyState) {
            if (0 == e.responseText.trim().length) return void(window.skipList = []);
            var t = JSON.parse(e.responseText);
            if (t.skiplist) {
                var o = [];
                t.skiplist.forEach(function(e) {
                    var t = Object.keys(e)[0];
                    if (void 0 !== t && t.trim().length > 0) {
                        if (o[t] = {
                                ttl: e[t],
                                last_broker_call: 0
                            }, -1 != t.indexOf("*")) {
                            var n = t.replaceAll(".", "\\.").replaceAll("*", ".*").replaceAll("/", "\\/"),
                                r = new RegExp(n);
                            o[t].regx = r
                        }
                        void 0 !== window.skipList[t] && (o[t].last_broker_call = window.skipList[t].last_broker_call)
                    }
                }), window.skipList = o
            }
            void 0 !== t.ttl && 1e3 * t.ttl != window.currentConfigTTL ? (window.currentConfigTTL = 1e3 * t.ttl, updateTTLForCrextnCacheConfig(window.currentConfigTTL)) : void 0 === t.ttl && window.defaultConfigTTL != window.currentConfigTTL && (window.currentConfigTTL = window.defaultConfigTTL, updateTTLForCrextnCacheConfig(window.defaultConfigTTL))
        }
    }, e.send()
}

function updateTTLForCrextnCacheConfig(e) {
    void 0 !== window.cacheIntervalId && clearInterval(window.cacheIntervalId), window.cacheIntervalId = setInterval(function() {
        downloadConfig()
    }, e)
}

function cleanURL(e) {
    return e.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
}

function getSocialPost(e, t) {
    var o = "",
        n = "";
    if (-1 != e.url.indexOf("twitter.com") && (-1 != e.url.indexOf(window.twitterMessageURI) || -1 != e.url.indexOf("api/graphql") && -1 != e.url.indexOf("CreateTweet")) && "POST" == e.method && "xmlhttprequest" == e.type) {
        var r = "";
        void 0 !== e.requestBody.raw ? ("" == (r = extractTweet(n = buff2Str(e.requestBody.raw[0].bytes))) && (r = extractPost(n, "&status=", "&tagged_users")), r = (r = encodeURIComponent(r)).replace(/%0A/gi, "%5Cn"), o = window.btoa(decodeURIComponent(r.toLowerCase()))) : (r = e.requestBody.formData.status[0], r = (r = encodeURIComponent(r)).replace(/%0A/gi, "%5Cn"), o = window.btoa(decodeURIComponent(r.toLowerCase())))
    }
    if (-1 != t.indexOf("facebook.com") && (-1 != t.indexOf("updatestatus") || -1 != t.indexOf("webgraphql")) && "POST" == e.method && "xmlhttprequest" == e.type) {
        n = buff2Str(e.requestBody.raw[0].bytes);
        var i = extractFBPost(decodeURIComponent(n));
        o = window.btoa(i.toLowerCase())
    }
    if (-1 != t.indexOf("facebook.com") && -1 != t.indexOf("api/graphql") && "POST" == e.method && "xmlhttprequest" == e.type) {
        if (!1 === (i = extractFBPostV2(e.requestBody.formData))) return i;
        o = window.btoa(i.toLowerCase())
    }
    if (-1 != t.indexOf("google.co") && -1 != t.indexOf("/PlusAppUi/mutate") && "POST" == e.method && "xmlhttprequest" == e.type) {
        var a = "";
        if (void 0 !== e.requestBody.raw) a = extractPost(n = buff2Str(e.requestBody.raw[0].bytes), "f.req=%5B%22", "%22%2C%22oz"), o = window.btoa(decodeURIComponent(a.toLowerCase()));
        else {
            var s = e.requestBody.formData["f.req"][0]; - 1 !== s.indexOf("79255737") && (a = extractPost(s, '[[[0,"', '"]]],null'), console.log(a), a = a.replace("%", "%25"), o = window.btoa(decodeURIComponent(a.toLowerCase())))
        }
    }
    return o
}

function buff2Str(e) {
    return String.fromCharCode.apply(null, new Uint8Array(e))
}

function extractPost(e, t, o) {
    var n = e.indexOf(t) + t.length,
        r = e.indexOf(o);
    return e.substring(n, r)
}

function extractTweet(e) {
    var t = JSON.parse(e);
    if (t.variables && t.variables.length > 0) {
        var o = JSON.parse(t.variables);
        if (o.tweet_text && o.tweet_text.length > 0) return o.tweet_text
    }
    return ""
}

function extractFBPost(e) {
    var t, o, n;
    for (o = 0, n = (t = e.split("&")).length; o < n; o++)
        if (0 == t[0].indexOf("variables=")) return JSON.parse(t[0].substr(10)).input.message.text
}

function extractFBPostV2(e) {
    var t = JSON.parse(e.variables);
    try {
        if ("feed" == t.input.composer_type && t.input.message.text) return t.input.message.text
    } catch (e) {
        return !1
    }
    return !1
}

function getYoutubeSearchURL(e, t) {
    if (void 0 !== e.requestBody.raw) {
        var o = buff2Str(e.requestBody.raw[0].bytes),
            n = JSON.parse(o);
        void 0 !== n.query && (t = e.initiator + "/results?search_query=" + n.query)
    }
    return t
}

function getRespArrTabs(e, t, o, n, r, i = "", a = !1, s, l = null, d = !1) {
    void 0 !== d && d || (clearCacheIfTTLExpired(), d = !1);
    var u = _getResCode(e, t),
        c = "";
    if ("notloggedin" == userEmail) return (u = "DENY:0:-1:-1:-1:-1:-1").split(":");
    if (doBrokerForClassroom() && (u = ""), u)
        if (-1 != u.indexOf("ALLOW") && 0 == skipCacheAndLogAlways(e, n));
        else {
            let n = null,
                i = null,
                a = null;
            selfClusterCheckBeforeBroker(), null != l && (i = l.channelId, n = l.videoId, a = l.category), c = window.clusterUrl + "/broker?useremail=" + window.userEmail + "&reason=crextn&host=" + e + "&url=" + t + "&msg=" + o + "&ver=" + window.version + "&cu=" + window.clusterUrl + "&uf=" + window.userFound + "&cf=" + window.clusterFound + (null != i ? "&channelID=" + i : "") + (null != n ? "&videoID=" + n : "") + (null != a ? "&category=" + encodeURIComponent(a) : ""), d && (c += "&rebroker=1"), (w = createNonBlockingRequest("get", c)).onerror = function() {
                u = "ERROR:-1:-1:-1:-1:-1:-1"
            }, w.onload = function() {
                if (void 0 !== d && d || setClearCacheCookie(r), 0 != (u = w.responseText.trim()).indexOf("FAILED_OPEN:")) {
                    if (-1 == u.toLowerCase().indexOf("<html")) {
                        var o = u.split(":"),
                            n = o[0],
                            i = o[1],
                            a = o[2],
                            s = o[3],
                            l = o[2],
                            c = !1;
                        if (0 == isNaN(l) && l >= 0) {
                            var f = Long.fromString(l, !0).shiftRight(0).toNumber(),
                                h = Long.fromNumber(Math.pow(2, 36)).shiftRight(0).toNumber();
                            Long.fromNumber(f).and(Math.pow(2, 36)).shiftRight(0).toNumber() == h && (c = !0)
                        }
                        if ("DENY" != n && "PAUSE" != n) try {
                            putURLCache(u, t, e, c)
                        } catch (e) {
                            sessionStorage.clear()
                        } else "DENY" == n ? takeDenyActionTabs(i, a, s, t, r, 0, d) : "PAUSE" == n && takePauseActionTabs(t, r)
                    }
                } else {
                    var g = u.split(":");
                    window.failedOpenObj = new FailedOpen(g[1], g[2])
                }
            };
            try {
                w.send()
            } catch (e) {}
        }
    else {
        let f = null,
            h = null,
            g = null;
        if (selfClusterCheckBeforeBroker(), null != l && (h = l.channelId, f = l.videoId, g = l.category), c = window.clusterUrl + "/broker?useremail=" + window.userEmail + "&reason=crextn&host=" + e + "&url=" + t + "&msg=" + o + "&ver=" + window.version + "&cu=" + window.clusterUrl + "&uf=" + window.userFound + "&cf=" + window.clusterFound + (a ? "&subframe=1" : "") + ("" != i ? "&frameHost=" + i : "") + (null != h ? "&channelID=" + h : "") + (null != f ? "&videoID=" + f : "") + (null != g ? "&category=" + encodeURIComponent(g) : ""), window.geolocation && (c = c + "&lat=" + window.geoLat + "&lng=" + window.geoLng), d && (c += "&rebroker=1"), 0 == a) var w = createNonBlockingRequest("get", c);
        else var w = createBlockingRequest("get", c);
        w.onerror = function() {
            u = "ERROR:-1:-1:-1:-1:-1:-1"
        }, w.onload = function() {
            if (0 != (u = w.responseText.trim()).indexOf("FAILED_OPEN:")) {
                null != window.failedOpenObj && (window.failedOpenObj = null);
                var o = u.split(":")[2];
                findCrextnBasegene(u), window.checkiFrames = u.split(":")[7];
                var n = !1;
                if (0 == isNaN(o) && o >= 0) {
                    var l = Long.fromString(o, !0).shiftRight(0).toNumber(),
                        c = Long.fromNumber(Math.pow(2, 36)).shiftRight(0).toNumber();
                    Long.fromNumber(l).and(Math.pow(2, 36)).shiftRight(0).toNumber() == c && (n = !0)
                }
                if (void 0 !== d && d || setClearCacheCookie(r), setClassroomCookies(), -1 == u.indexOf("DENY") && -1 == u.indexOf("PAUSE")) try {
                        putURLCache(u, t, e, n), setCookie("last_broker_call", Math.floor(Date.now() / 1e3), 5)
                    } catch (e) {
                        sessionStorage.clear()
                    } else if (0 == u.indexOf("PAUSE")) takePauseActionTabs(t, r);
                    else if (-1 == u.toLowerCase().indexOf("<html")) {
                    var f = u.split(":"),
                        h = (f[0], f[1]),
                        g = f[2],
                        m = f[3];
                    f[4], f[5], f[6];
                    0 == a || 0 == window.checkiFrames ? (window.isSubFrame = !1, isSubFrame = !1, takeDenyActionTabs(h, g, m, t, r, isSubFrame, d)) : 1 == window.checkiFrames && (s.iframeResp = f, "" !== i && window.atob(t) !== i ? (isSubFrame = !0, window.isSubFrame = !0, s.iframeBlockUrl = getBlockUrl(h, g, m, t, isSubFrame)) : (window.isSubFrame = !1, isSubFrame = !1, takeDenyActionTabs(h, g, m, t, r, isSubFrame, d)))
                }
            } else {
                var p = u.split(":");
                if (window.failedOpenObj = new FailedOpen(p[1], p[2]), !window.failedOpenObj.isWideOpenMode()) {
                    0 == e.indexOf("www.") && (e = e.substr(4));
                    var b = ENCRYPT(e),
                        O = localStorage.getItem("NC:" + b);
                    null != O && takeToFailedOpenBlockedPage(r, e, O)
                }
            }
        };
        try {
            w.send()
        } catch (e) {
            u = "ERROR:-1:-1:-1:-1:-1:-1"
        }
        u = -1 != n.indexOf("google.c") && -1 == n.indexOf("sites.google.com") && -1 == n.indexOf("docs.google.com") && -1 == n.indexOf("drive.google.com") && -1 == n.indexOf("accounts.google.com") && -1 == n.indexOf("calendar.google.com") && -1 == n.indexOf("code.google.com") || -1 != n.indexOf("bing.com") || -1 != n.indexOf("search.yahoo.c") ? "SS:0:-1:-1:-1:-1:-1" : "ALLOW:0:-1:-1:-1:-1:-1"
    }
    var f = u.split(":");
    return (void 0 === f || null == f || f.length < 7) && (u = "ERROR:-1:-1:-1:-1:-1:-1", sessionStorage.removeItem(e), f = u.split(":")), f
}

function getRespArr(e, t, o, n, r = "", i = !1) {
    var a = _getResCode(e, t),
        s = "";
    if (doBrokerForClassroom() && (a = ""), !a) {
        selfClusterCheckBeforeBroker(), s = window.clusterUrl + "/broker?useremail=" + window.userEmail + "&reason=crextn&host=" + e + "&url=" + t + "&msg=" + o + "&ver=" + window.version + "&cu=" + window.clusterUrl + "&uf=" + window.userFound + "&cf=" + window.clusterFound + (i ? "&subframe=1" : "") + ("" != r ? "&frameHost=" + r : ""), window.geolocation && (s = s + "&lat=" + window.geoLat + "&lng=" + window.geoLng);
        var l = createBlockingRequest("get", s);
        l.onerror = function() {
            a = "ERROR:-1:-1:-1:-1:-1:-1"
        }, l.onload = function() {
            if (setClearCacheCookie(), setClassroomCookies(), 0 != (a = l.responseText.trim()).indexOf("FAILED_OPEN:")) {
                var o = a.split(":")[2];
                window.checkiFrames = a.split(":")[7], findCrextnBasegene(a);
                var r = !1;
                if (0 == isNaN(o) && o >= 0) {
                    var i = Long.fromString(o, !0).shiftRight(0).toNumber(),
                        s = Long.fromNumber(Math.pow(2, 36)).shiftRight(0).toNumber();
                    Long.fromNumber(i).and(Math.pow(2, 36)).shiftRight(0).toNumber() == s && (r = !0)
                }
                if (-1 == a.indexOf("DENY") && 0 == skipCacheAndLogAlways(e, n)) try {
                    -1 == a.indexOf("WL_URL") || void 0 !== window.crextnBasegene_bit0 && window.crextnBasegene_bit0 == window.bit0 ? void 0 !== window.crextnBasegene_bit0 && window.crextnBasegene_bit0 == window.bit0 || sessionStorage.setItem(e, a) : sessionStorage.setItem(window.atob(t).replace(/(^\w+:|^)\/\/|(www\.)/, ""), a), 0 == r && (void 0 !== window.crextnBasegene_bit0 && window.crextnBasegene_bit0 == window.bit0 || sessionStorage.setItem(e, a)), setCookie("last_broker_call", Math.floor(Date.now() / 1e3), 5)
                } catch (e) {
                    sessionStorage.clear()
                }
            } else {
                var d = a.split(":");
                window.failedOpenObj = new FailedOpen(d[1], d[2])
            }
        };
        try {
            l.send()
        } catch (e) {
            a = "ERROR:-1:-1:-1:-1:-1:-1"
        }
    }
    var d = a.split(":");
    return (void 0 === d || null == d || d.length < 7) && (d = (a = "ERROR:-1:-1:-1:-1:-1:-1").split(":"), sessionStorage.removeItem(e)), d
}

function _getResCode(e, t) {
    var o = window.atob(t);
    resultURL = o.replace(/(^\w+:|^)\/\/|(www\.)|(\/$)/, "");
    var n = null,
        r = sessionStorage.getItem(resultURL);
    r ? 2 == (r = r.split(",")).length && (new Date).getTime() / 1e3 - r[1] < 1800 && (n = r[0]) : n = sessionStorage.getItem(e);
    return n
}

function putURLCache(e, t, o, n) {
    -1 == e.indexOf("WL_URL") || void 0 !== window.crextnBasegene_bit0 && window.crextnBasegene_bit0 == window.bit0 ? 0 != n || void 0 !== window.crextnBasegene_bit0 && window.crextnBasegene_bit0 == window.bit0 || sessionStorage.setItem(o, e + "," + (new Date).getTime() / 1e3) : (resultURL = window.atob(t).replace(/(^\w+:|^)\/\/|(www\.)/, ""), sessionStorage.setItem(resultURL, e + "," + (new Date).getTime() / 1e3))
}

function findCrextnBasegene(e) {
    e.split(":").length >= 9 && (window.crextnBasegene = Long.fromString(e.split(":")[8], !0).shiftRight(0).toNumber(), window.bit0 = Long.fromNumber(Math.pow(2, 0)).shiftRight(0).toNumber(), window.crextnBasegene_bit0 = Long.fromNumber(window.crextnBasegene).and(Math.pow(2, 0)).shiftRight(0).toNumber())
}

function setupListener() {
    chrome.tabs.onUpdated.addListener(function(e, t, o) {
        void 0 !== t.status && -1 != o.url.indexOf("blocked") ? "complete" != t.status ? -1 == o.url.indexOf("blocked") || -1 == o.url.indexOf("securly.com") && -1 == o.url.indexOf("iheobagjkfklnlikgihanlhcddjoihkg") || (window.tabsBeingBlocked[e] = o.url) : delete window.tabsBeingBlocked[e] : void 0 !== t.status && "complete" == t.status && void 0 !== window.tabsBeingBlocked[e] && chrome.tabs.update(e, {
            url: window.tabsBeingBlocked[e]
        }, function() {})
    }), chrome.webRequest.onErrorOccurred.addListener(function(e) {
        "net::ERR_ABORTED" == e.error && "main_frame" == e.type && -1 != e.url.indexOf("blocked") && void 0 != typeof window.tabsBeingBlocked[e.tabId] && chrome.tabs.update(e.tabId, {
            url: window.tabsBeingBlocked[e.tabId]
        }, function(e) {})
    }, {
        urls: ["*://*.securly.com/*"]
    }), chrome.webRequest.onBeforeSendHeaders.addListener(function(e) {
        var t = !1;
        if (e.requestHeaders.forEach(function(e) {
                "Purpose" == e.name && "prefetch" == e.value && (t = !0)
            }), !t) {
            if (-1 != e.url.indexOf("suicidepreventionlifeline.org")) return onBeforeRequestListener(e);
            var o = e.url,
                n = interceptOrNot(e);
            if (1 == n && (n = checkSkipListCaching(e)), 1 == n) {
                o.length > 1e3 && (o = o.substring(0, 1e3));
                var r = window.btoa(o),
                    i = document.createElement("a");
                i.href = o;
                var a = i.hostname.toLowerCase();
                a = normalizeHostname(a);
                var s, l = !1,
                    d = new URL(e.initiator);
                s = window.btoa(d.hostname.toLowerCase()), "sub_frame" == e.type ? (l = !0, window.isSubFrame = !0, window.brokredRequest = []) : (window.isSubFrame = !1, l = !1, window.youtubeFrames = []);
                var u = getRespArr(a, r, "", o, s, l),
                    c = u[0],
                    w = (u[1], u[2]),
                    f = (u[3], u[4]),
                    h = u[4];
                u[5], u[6];
                return this.iframeResp.length > 0 && "DENY" == this.iframeResp[0] ? (this.iframeResp = "", {
                    cancel: !0
                }) : (window.checkYouTube = "REFWL" != w, "GM" == c ? (e.requestHeaders.push({
                    name: "X-GoogApps-Allowed-Domains",
                    value: h
                }), {
                    requestHeaders: e.requestHeaders
                }) : "YT" == c ? (2 == f ? e.requestHeaders.push({
                    name: "YouTube-Restrict",
                    value: "Strict"
                }) : 1 == f && e.requestHeaders.push({
                    name: "YouTube-Restrict",
                    value: "Moderate"
                }), {
                    requestHeaders: e.requestHeaders
                }) : {
                    requestHeaders: e.requestHeaders
                })
            }
        }
    }, {
        urls: ["*://suicidepreventionlifeline.org/*", "*://*.youtube.com/*", "*://accounts.google.com/*", "*://mail.google.com/*", "*://drive.google.com/*"]
    }, ["blocking", "requestHeaders"]), chrome.webRequest.onBeforeRequest.addListener(function(e) {
        if (-1 == e.url.indexOf("suicidepreventionlifeline.org")) return onBeforeRequestListener(e)
    }, {
        urls: ["<all_urls>"]
    }, ["blocking", "requestBody"]), chrome.identity.onSignInChanged.addListener(function(e, t) {
        !0 === t && fetchUserAPI()
    }), chrome.idle.onStateChanged.addListener(function(e) {
        lastKnownState != e && ("active" == e && "idle" != lastKnownState && (sessionStorage.clear(), chrome.windows.getAll({
            populate: !0
        }, function(e) {
            for (var t = 0; t < e.length; t++)
                for (var o = 0; o < e[t].tabs.length; o++) "chrome://" != e[t].tabs[o].url.substring(0, 9) && tabCheck.forEach(function(n) {
                    -1 !== e[t].tabs[o].url.indexOf(n) && chrome.tabs.reload(e[t].tabs[o].id, {
                        bypassCache: !0
                    })
                })
        })), lastKnownState = e)
    })
}

function getYTOptions() {
    toSendUrl = window.clusterUrl + "/broker?useremail=" + window.userEmail + "&reason=crextn&url=&ytoptions=true";
    var e = createBlockingRequest("get", toSendUrl);
    e.onload = function() {
        let t = e.responseText.trim();
        window.hideComments = "true" == t.split(":")[0], window.hideThumbnails = "true" == t.split(":")[1], window.hideSidebar = "true" == t.split(":")[2], window.ytOptionsLastCheck = Math.floor(Date.now() / 1e3)
    };
    try {
        e.send()
    } catch (e) {
        console.log("getYTOptions Request Failed")
    }
}

function onBeforeRequestListener(e, t = !1) {
    var o, n = e.url;
    if ("main_frame" == e.type && -1 == e.url.indexOf("securly") && void 0 !== window.tabsBeingBlocked[e.tabId]) return {
        redirectUrl: window.tabsBeingBlocked[e.tabId]
    };
    o = n;
    var r = interceptOrNot(e);
    if ("sub_frame" == e.type && "file://" == e.initiator && 0 === e.url.indexOf("http") && (r = 1), 1 == r && (r = checkSkipListCaching(e)), 1 != r) window.youtubeLastCheck = null, o.indexOf("youtube") && (window.ytURL = o, "UNKNOWN_SCHOOL" != window.clusterUrl && "AVOID_OS" != window.clusterUrl && (null == window.ytOptionsLastCheck || Math.floor(Date.now() / 1e3) - window.ytOptionsLastCheck >= 3600) && getYTOptions(), chrome.runtime.onConnect.addListener(function(t) {
        "yt" == t.name && t.onMessage.addListener(function(n, r) {
            if (window.checkYouTube && o.indexOf("youtube") && "GET" == e.method && "getYoutubeOptions" != n.action && "script" !== e.type && "stylesheet" !== e.type && "image" !== e.type) {
                if (window.youtubeLastCheck = Date.now(), "unknown" != window.clusterUrl && "AVOID_OS" != window.clusterUrl && "UNKNOWN_SCHOOL" != window.clusterUrl && -1 === window.youtubeFrames.indexOf(t.sender.frameId) && (null != n.channelId || null != n.videoId || null != n.category)) {
                    window.youtubeFrames[youtubeFrames.length] = t.sender.frameId;
                    let e = {
                            channelId: n.channelId,
                            videoId: n.videoId,
                            category: n.category
                        },
                        o = window.btoa(r.sender.url),
                        i = document.createElement("a");
                    i.href = r.sender.url, l = normalizeHostname(l = i.hostname.toLowerCase());
                    let a = "",
                        s = n.embedded ? window.btoa(l) : "",
                        d = getRespArrTabs(l, o, a, r.sender.url, r.sender.tab.id, s, n.embedded, this, e),
                        u = d[0],
                        c = d[1];
                    d[2];
                    "DENY" == u ? 0 == n.embedded && chrome.tabs.update(r.sender.tab, takeDenyAction(c, 2, o)) : this.iframeResp.length > 0 && "DENY" == this.iframeResp[0] && (this.iframeResp = "", t.postMessage({
                        hideRecommended: window.hideRecommended,
                        hideComments: window.hideComments,
                        hideSidebar: window.hideSidebar,
                        hideThumbnails: window.hideThumbnails,
                        checkEmbed: !0,
                        action: "deny",
                        url: this.iframeBlockUrl
                    }))
                }
            } else "getYoutubeOptions" == n.action && t.postMessage({
                hideRecommended: window.hideRecommended,
                hideComments: window.hideComments,
                hideSidebar: window.hideSidebar,
                hideThumbnails: window.hideThumbnails
            })
        })
    }), chrome.runtime.onConnect.addListener(function(e) {
        "gmaps" == e.name && e.onMessage.addListener(function(e, t) {
            if (e.url != window.lastMapsUrl) {
                window.lastMapsUrl = e.url;
                let o = window.btoa(e.url),
                    n = document.createElement("a");
                n.href = e.url;
                let r = getRespArrTabs(l = normalizeHostname(l = n.hostname.toLowerCase()), o, "", e.url, t.sender.tab.id, "", !1, this),
                    i = r[0],
                    a = r[1];
                r[2];
                "DENY" == i && chrome.tabs.update(t.sender.tab, takeDenyAction(a, 2, o))
            }
        })
    }));
    else {
        var i = "",
            a = !1;
        (d = document.createElement("a")).href = e.initiator, i = window.btoa(d.hostname.toLowerCase()), "sub_frame" == e.type && (i = window.btoa(d.hostname.toLowerCase()), a = !0, window.isSubFrame = !0, window.brokredRequest = []);
        var s;
        if (o.length > 1e3 && (o = o.substring(0, 1e3)), s = getSocialPost(e, o), -1 != o.indexOf("youtube.com") && -1 != o.indexOf("youtubei/v1/search") && (o = getYoutubeSearchURL(e, o)), !1 === s) return;
        var l, d, u = window.btoa(o),
            c = o.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
        c.endsWith("/") && (c = c.slice(0, -1)), window.brokeredArrIndex++, window.brokeredArrIndex >= 20 && (window.brokeredArrIndex = 0), -1 != window.brokredRequest.indexOf(c) && "" === s || (window.brokredRequest[window.brokeredArrIndex] = c), -1 != o.indexOf("translate.google.com") ? l = extractTranslateHostname(o) : ((d = document.createElement("a")).href = o, l = d.hostname.toLowerCase()), l = normalizeHostname(l), window.geolocation && getRemoteIPGeo();
        var w = getRespArrTabs(l, u, s, o, e.tabId, i, a, this, null, t),
            f = w[0],
            h = w[1],
            g = w[2];
        w[3], w[4], w[5], w[6];
        if (this.iframeResp.length > 0 && "DENY" == this.iframeResp[0]) return this.iframeResp = "", {
            redirectUrl: this.iframeBlockUrl
        };
        if ("DENY" == f) return takeDenyAction(h, g, u);
        if ("PAUSE" == f) return getPauseAction(u);
        var m = !1;
        if ("SS" == f && (n = takeSafeSearchAction(l, n), m = !0), "CC" == g && (n = takeCreativeCommonImageSearchAction(n), m = !0), window.checkYouTube = "REFWL" != g, !0 === m) {
            if (-1 != o.indexOf("google.") && -1 != o.indexOf("/maps/")) return;
            if (-1 != o.indexOf("google.") && -1 == o.indexOf("safe=active")) return {
                redirectUrl: n
            };
            if (-1 != o.indexOf("google.") && -1 != o.indexOf("tbm=isch") && -1 != o.indexOf("safe=active") && -1 == o.indexOf("il:cl")) return {
                redirectUrl: n
            };
            if (-1 != o.indexOf("google.") && -1 != o.indexOf("tbm=isch") && -1 == o.indexOf("safe=active") && -1 == o.indexOf("il:cl")) return {
                redirectUrl: n
            };
            if (-1 == o.indexOf("google.")) return {
                redirectUrl: n
            }
        }
    }
}! function e(t, o, n) {
    function r(a, s) {
        if (!o[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(a, !0);
                if (i) return i(a, !0);
                var d = new Error("Cannot find module '" + a + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var u = o[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                return r(t[a][1][e] || e)
            }, u, u.exports, e, t, o, n)
        }
        return o[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < n.length; a++) r(n[a]);
    return r
}({
    1: [function(e, t, o) {
        ! function(n) {
            "use strict";
            var r = function(e, t, o) {
                this.low = 0 | e, this.high = 0 | t, this.unsigned = !!o
            };
            r.isLong = function(e) {
                return !0 === (e && e instanceof r)
            };
            var i = {},
                a = {};
            r.fromInt = function(e, t) {
                var o, n;
                return t ? 0 <= (e >>>= 0) && e < 256 && (n = a[e]) ? n : (o = new r(e, (0 | e) < 0 ? -1 : 0, !0), 0 <= e && e < 256 && (a[e] = o), o) : -128 <= (e |= 0) && e < 128 && (n = i[e]) ? n : (o = new r(e, e < 0 ? -1 : 0, !1), -128 <= e && e < 128 && (i[e] = o), o)
            }, r.fromNumber = function(e, t) {
                return t = !!t, isNaN(e) || !isFinite(e) ? r.ZERO : !t && e <= -d ? r.MIN_VALUE : !t && d <= e + 1 ? r.MAX_VALUE : t && l <= e ? r.MAX_UNSIGNED_VALUE : e < 0 ? r.fromNumber(-e, t).negate() : new r(e % s | 0, e / s | 0, t)
            }, r.fromBits = function(e, t, o) {
                return new r(e, t, o)
            }, r.fromString = function(e, t, o) {
                if (0 === e.length) throw Error("number format error: empty string");
                if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return r.ZERO;
                if ("number" == typeof t && (o = t, t = !1), (o = o || 10) < 2 || 36 < o) throw Error("radix out of range: " + o);
                var n;
                if (0 < (n = e.indexOf("-"))) throw Error('number format error: interior "-" character: ' + e);
                if (0 === n) return r.fromString(e.substring(1), t, o).negate();
                for (var i = r.fromNumber(Math.pow(o, 8)), a = r.ZERO, s = 0; s < e.length; s += 8) {
                    var l = Math.min(8, e.length - s),
                        d = parseInt(e.substring(s, s + l), o);
                    if (l < 8) {
                        var u = r.fromNumber(Math.pow(o, l));
                        a = a.multiply(u).add(r.fromNumber(d))
                    } else a = (a = a.multiply(i)).add(r.fromNumber(d))
                }
                return a.unsigned = t, a
            }, r.fromValue = function(e) {
                return "number" == typeof e ? r.fromNumber(e) : "string" == typeof e ? r.fromString(e) : r.isLong(e) ? e : new r(e.low, e.high, e.unsigned)
            };
            var s = 4294967296,
                l = s * s,
                d = l / 2,
                u = r.fromInt(1 << 24);
            r.ZERO = r.fromInt(0), r.UZERO = r.fromInt(0, !0), r.ONE = r.fromInt(1), r.UONE = r.fromInt(1, !0), r.NEG_ONE = r.fromInt(-1), r.MAX_VALUE = r.fromBits(-1, 2147483647, !1), r.MAX_UNSIGNED_VALUE = r.fromBits(-1, -1, !0), r.MIN_VALUE = r.fromBits(0, -2147483648, !1), r.prototype.toInt = function() {
                return this.unsigned ? this.low >>> 0 : this.low
            }, r.prototype.toNumber = function() {
                return this.unsigned ? (this.high >>> 0) * s + (this.low >>> 0) : this.high * s + (this.low >>> 0)
            }, r.prototype.toString = function(e) {
                if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix out of range: " + e);
                if (this.isZero()) return "0";
                var t;
                if (this.isNegative()) {
                    if (this.equals(r.MIN_VALUE)) {
                        var o = r.fromNumber(e),
                            n = this.div(o);
                        return t = n.multiply(o).subtract(this), n.toString(e) + t.toInt().toString(e)
                    }
                    return "-" + this.negate().toString(e)
                }
                var i = r.fromNumber(Math.pow(e, 6), this.unsigned);
                t = this;
                for (var a = "";;) {
                    var s = t.div(i),
                        l = (t.subtract(s.multiply(i)).toInt() >>> 0).toString(e);
                    if ((t = s).isZero()) return l + a;
                    for (; l.length < 6;) l = "0" + l;
                    a = "" + l + a
                }
            }, r.prototype.getHighBits = function() {
                return this.high
            }, r.prototype.getHighBitsUnsigned = function() {
                return this.high >>> 0
            }, r.prototype.getLowBits = function() {
                return this.low
            }, r.prototype.getLowBitsUnsigned = function() {
                return this.low >>> 0
            }, r.prototype.getNumBitsAbs = function() {
                if (this.isNegative()) return this.equals(r.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
                for (var e = 0 != this.high ? this.high : this.low, t = 31; 0 < t && 0 == (e & 1 << t); t--);
                return 0 != this.high ? t + 33 : t + 1
            }, r.prototype.isZero = function() {
                return 0 === this.high && 0 === this.low
            }, r.prototype.isNegative = function() {
                return !this.unsigned && this.high < 0
            }, r.prototype.isPositive = function() {
                return this.unsigned || 0 <= this.high
            }, r.prototype.isOdd = function() {
                return 1 == (1 & this.low)
            }, r.prototype.isEven = function() {
                return 0 == (1 & this.low)
            }, r.prototype.equals = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && this.high === e.high && this.low === e.low
            }, r.prototype.notEquals = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), !this.equals(e)
            }, r.prototype.lessThan = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), this.compare(e) < 0
            }, r.prototype.lessThanOrEqual = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), this.compare(e) <= 0
            }, r.prototype.greaterThan = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), 0 < this.compare(e)
            }, r.prototype.greaterThanOrEqual = function(e) {
                return 0 <= this.compare(e)
            }, r.prototype.compare = function(e) {
                if (this.equals(e)) return 0;
                var t = this.isNegative(),
                    o = e.isNegative();
                return t && !o ? -1 : !t && o ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.subtract(e).isNegative() ? -1 : 1
            }, r.prototype.negate = function() {
                return !this.unsigned && this.equals(r.MIN_VALUE) ? r.MIN_VALUE : this.not().add(r.ONE)
            }, r.prototype.add = function(e) {
                r.isLong(e) || (e = r.fromValue(e));
                var t = this.high >>> 16,
                    o = 65535 & this.high,
                    n = this.low >>> 16,
                    i = 65535 & this.low,
                    a = e.high >>> 16,
                    s = 65535 & e.high,
                    l = e.low >>> 16,
                    d = 0,
                    u = 0,
                    c = 0,
                    w = 0;
                return c += (w += i + (65535 & e.low)) >>> 16, u += (c += n + l) >>> 16, d += (u += o + s) >>> 16, d += t + a, r.fromBits((c &= 65535) << 16 | (w &= 65535), (d &= 65535) << 16 | (u &= 65535), this.unsigned)
            }, r.prototype.subtract = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), this.add(e.negate())
            }, r.prototype.multiply = function(e) {
                if (this.isZero()) return r.ZERO;
                if (r.isLong(e) || (e = r.fromValue(e)), e.isZero()) return r.ZERO;
                if (this.equals(r.MIN_VALUE)) return e.isOdd() ? r.MIN_VALUE : r.ZERO;
                if (e.equals(r.MIN_VALUE)) return this.isOdd() ? r.MIN_VALUE : r.ZERO;
                if (this.isNegative()) return e.isNegative() ? this.negate().multiply(e.negate()) : this.negate().multiply(e).negate();
                if (e.isNegative()) return this.multiply(e.negate()).negate();
                if (this.lessThan(u) && e.lessThan(u)) return r.fromNumber(this.toNumber() * e.toNumber(), this.unsigned);
                var t = this.high >>> 16,
                    o = 65535 & this.high,
                    n = this.low >>> 16,
                    i = 65535 & this.low,
                    a = e.high >>> 16,
                    s = 65535 & e.high,
                    l = e.low >>> 16,
                    d = 65535 & e.low,
                    c = 0,
                    w = 0,
                    f = 0,
                    h = 0;
                return f += (h += i * d) >>> 16, w += (f += n * d) >>> 16, f &= 65535, w += (f += i * l) >>> 16, c += (w += o * d) >>> 16, w &= 65535, c += (w += n * l) >>> 16, w &= 65535, c += (w += i * s) >>> 16, c += t * d + o * l + n * s + i * a, r.fromBits((f &= 65535) << 16 | (h &= 65535), (c &= 65535) << 16 | (w &= 65535), this.unsigned)
            }, r.prototype.div = function(e) {
                if (r.isLong(e) || (e = r.fromValue(e)), e.isZero()) throw new Error("division by zero");
                if (this.isZero()) return this.unsigned ? r.UZERO : r.ZERO;
                var t, o, n;
                if (this.equals(r.MIN_VALUE)) return e.equals(r.ONE) || e.equals(r.NEG_ONE) ? r.MIN_VALUE : e.equals(r.MIN_VALUE) ? r.ONE : (t = this.shiftRight(1).div(e).shiftLeft(1)).equals(r.ZERO) ? e.isNegative() ? r.ONE : r.NEG_ONE : (o = this.subtract(e.multiply(t)), n = t.add(o.div(e)));
                if (e.equals(r.MIN_VALUE)) return this.unsigned ? r.UZERO : r.ZERO;
                if (this.isNegative()) return e.isNegative() ? this.negate().div(e.negate()) : this.negate().div(e).negate();
                if (e.isNegative()) return this.div(e.negate()).negate();
                for (n = r.ZERO, o = this; o.greaterThanOrEqual(e);) {
                    t = Math.max(1, Math.floor(o.toNumber() / e.toNumber()));
                    for (var i = Math.ceil(Math.log(t) / Math.LN2), a = i <= 48 ? 1 : Math.pow(2, i - 48), s = r.fromNumber(t), l = s.multiply(e); l.isNegative() || l.greaterThan(o);) l = (s = r.fromNumber(t -= a, this.unsigned)).multiply(e);
                    s.isZero() && (s = r.ONE), n = n.add(s), o = o.subtract(l)
                }
                return n
            }, r.prototype.modulo = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), this.subtract(this.div(e).multiply(e))
            }, r.prototype.not = function() {
                return r.fromBits(~this.low, ~this.high, this.unsigned)
            }, r.prototype.and = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), r.fromBits(this.low & e.low, this.high & e.high, this.unsigned)
            }, r.prototype.or = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), r.fromBits(this.low | e.low, this.high | e.high, this.unsigned)
            }, r.prototype.xor = function(e) {
                return r.isLong(e) || (e = r.fromValue(e)), r.fromBits(this.low ^ e.low, this.high ^ e.high, this.unsigned)
            }, r.prototype.shiftLeft = function(e) {
                return r.isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? r.fromBits(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : r.fromBits(0, this.low << e - 32, this.unsigned)
            }, r.prototype.shiftRight = function(e) {
                return r.isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? r.fromBits(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : r.fromBits(this.high >> e - 32, 0 <= this.high ? 0 : -1, this.unsigned)
            }, r.prototype.shiftRightUnsigned = function(e) {
                if (r.isLong(e) && (e = e.toInt()), 0 == (e &= 63)) return this;
                var t = this.high;
                if (e < 32) {
                    var o = this.low;
                    return r.fromBits(o >>> e | t << 32 - e, t >>> e, this.unsigned)
                }
                return r.fromBits(32 === e ? t : t >>> e - 32, 0, this.unsigned)
            }, r.prototype.toSigned = function() {
                return this.unsigned ? new r(this.low, this.high, !1) : this
            }, r.prototype.toUnsigned = function() {
                return this.unsigned ? this : new r(this.low, this.high, !0)
            }, "function" == typeof e && "object" == typeof t && t && "object" == typeof o && o ? t.exports = r : "function" == typeof define && define.amd ? define(function() {
                return r
            }) : (n.dcodeIO = n.dcodeIO || {}).Long = r
        }(this)
    }, {}],
    2: [function(e, t, o) {
        t.exports = e("./dist/Long.js")
    }, {
        "./dist/Long.js": 1
    }],
    3: [function(e, t, o) {
        window.Long = e("long")
    }, {
        long: 2
    }]
}, {}, [3]), chrome.downloads.onCreated.addListener(function(e) {
    var t = e.url;
    if ("text/html" == e.mime) {
        t.length > 1e3 && (t = t.substring(0, 1e3));
        var o = window.btoa(t),
            n = document.createElement("a");
        n.href = t;
        var r = n.hostname.toLowerCase();
        if ("DENY" == getRespArr(r = normalizeHostname(r), o, "", t)[0]) return chrome.downloads.cancel(e.id), void chrome.downloads.removeFile(e.id)
    }
});
class FailedOpen {
    constructor(e, t) {
        this.wideOpenMode = 0, this.cipaMode = 1, this.mode = e, this.duration = t, void 0 !== this.mode && null != this.mode && -1 != this.mode || (this.mode = 1), void 0 !== this.duration && null != this.duration && -1 != this.duration || (this.duration = 300), this.timeStamp = Math.floor(Date.now() / 1e3)
    }
    isFailedOpen() {
        return Math.floor(Date.now() / 1e3) - this.timeStamp < this.duration
    }
    isWideOpenMode() {
        return this.mode == this.wideOpenMode
    }
}
window.userStatus = {
    NOTFOUND: -1,
    FOUND: 1
}, window.clusterStatus = {
    ERROR: -2,
    NOTFOUND: -1,
    FOUND: 1,
    AVOID_OS: 2,
    UNKNOWN_SCHOOL: 3
}, window.version = "-", window.userFound = window.userStatus.NOTFOUND, window.clusterFound = window.clusterStatus.NOTFOUND, window.userEmail = "notloggedin", window.clusterUrl = "unknown", window.ytpref = "prefnotchecked", window.ytprefnewvalue = "notset", window.hideComments = !1, window.hideRecommended = !1, window.hideThumbnails = !1, window.hideSidebar = !1, window.ytOptionsLastCheck = null, window.youtubeFrames = [], window.checkYouTube = !0, window.lastMapsUrl = "", window.geolocation = !1, window.geoLat = null, window.geoLng = null, window.geoIntervalId = null, window.needToReloadTabs = 1, window.isBlockedYTVideo = !1, window.debugIWF = 0, window.IWFTimeout = 6048e5, window.isSubFrame = !1, window.checkiFrames = 0, window.failedOpenObj = null, window.twitterMessageURI = "/statuses/update.json", window.twitterPrefetchTimestamp = "prefetchtimestamp", window.tabsBeingBlocked = {}, window.brokredRequest = [], window.brokeredArrIndex = 0, window.fid = null, window.latencyFrequency = 6e5, window.latencyAPI = null, window.latencyInterval = null, window.defaultConfigTTL = window.currentConfigTTL = 36e5, window.skipList = [], getVersion(), getGeolocationStatus(), setInterval(function() {
    getGeolocationStatus(), window.brokredRequest = []
}, 36e5), setupListener(), fetchUserAPI(), setupIWF(), downloadConfig(), updateTTLForCrextnCacheConfig(window.defaultConfigTTL);