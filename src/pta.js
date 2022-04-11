'use strict';
var ping = require("ping");
var http = require("http");
var fs = require("fs");

var globalHosts = {
    alibaba: require("./targets/alibaba.json"),
    aws: require("./targets/aws.json"),
    debianBig: require("./targets/debianBig.json"),
    debianSmall: require("./targets/debianSmall.json"),
    digitalocean: require("./targets/digitalocean.json"),
    google: require("./targets/google.json"),
    ovh: require("./targets/ovh.json")
};

function getMyLocation() {
    return new Promise(function(resolve, reject) {
        http.get("http://ip-api.com/json/?fields=218", function(resp) {
            var data = "";
            resp.on("data", function(chunk) {
                data += chunk;
            });
            resp.on("end", function() {
                resolve(data);
            });
        }).on("error", function(err) {
            reject(err);
        });
    });
}

function getPingPromise(host, config) {
    return ping.promise.probe(host, config).then(function(res) {
        if (res.alive) {
            process.stdout.write("O");
            return {
                "host": res.inputHost,
                "ip": res.numeric_host,
                "min": res.min,
                "max": res.max,
                "avg": res.avg
            };
        } else {
            process.stdout.write("X");
            return {
                "host": res.inputHost,
                "ip": null,
                "min": Number.POSITIVE_INFINITY,
                "max": Number.POSITIVE_INFINITY,
                "avg": Number.POSITIVE_INFINITY
            };
        }
    });
}

function getPings(hosts, config) {
    var results = [];
    return hosts.map(function(host) {
        return function() {
            return getPingPromise(host, config).then(function(r) {
                results.push(r);
            });
        };
    }).reduce(function(prev, curr) {
        return prev.then(curr);
    }, Promise.resolve()).then(function() {
        return results;
    });
}

function tryLoadCustomHosts(fileName) {
    try {
        return JSON.parse(fs.readFileSync(fileName, "utf-8"));
    } catch (e) {
        console.log(e);
        return [];
    }
}

function prepareHosts(args) {
    var hosts = [];
    args.forEach(function(v) {
        if (v === "all") {
            Object.keys(globalHosts).forEach(function(k) {
                hosts = hosts.concat(globalHosts[k]);
            });
        } else if (v === "cloud") {
            hosts = hosts.concat(globalHosts.alibaba, globalHosts.aws, globalHosts.digitalocean, globalHosts.google, globalHosts.ovh);
        } else if (v === "debian") {
            hosts = hosts.concat(globalHosts.debianBig, globalHosts.debianSmall);
        } else if (v in globalHosts) {
            hosts = hosts.concat(globalHosts[v]);
        } else {
            hosts = hosts.concat(tryLoadCustomHosts(v));
        }
    });

    return hosts.filter(function(v, i, s) {
        return s.indexOf(v) === i;
    });
}

function main(args, cwd) {

    if (args.length === 0) {
        console.log("use: ./pta <targets>\n");
        console.log("available targets:");
        console.log("  * 'debianSmall' - subset of major debian mirrors - 35 targets");
        console.log("  * 'debianBig' - most of remaining debian mirrors - 255 targets");
        console.log("  * 'debian' - debianBig+debianSmall - 290 targets\n");
        console.log("  * 'alibaba' - 20 targets");
        console.log("  * 'aws' - 26 targets");
        console.log("  * 'digitalocean' - 13 targets");
        console.log("  * 'google' - 15 targets");
        console.log("  * 'ovh' - 10 targets");
        console.log("  * 'cloud' - alibaba+aws+digitalocean+google+ovh - 84 targets\n");
        console.log("  * 'all' - debian+cloud - 374 targets");
        console.log("  * <your path here> - you may as well create custom target list - it just need to be json file with array of domains to ping\n\n");
        console.log("note: more targets to ping means more time to wait to get results");
        console.log("examples:");
        console.log("  * './pta ovh google' - will collect pings to ovh and google cloud");
        console.log("  * './pta debianSmall aws ./myList.json' - will collect pings to subset of debian mirrors, aws and hosts listed in myList.json file\n");
        console.log("example custom list file content: [\"google.com\", \"wikipedia.org\"]");
    } else {
        var hosts = prepareHosts(args);
        var pingConfig = {
            min_reply: 4
        };

        var result = {};

        getMyLocation().then(function(myLocation) {
            process.stdout.write("O->");
            result.myLocation = JSON.parse(myLocation);
        }).catch(function() {
            process.stdout.write("X->");
        }).then(function() {
            return getPings(hosts, pingConfig);
        }).then(function(pings) {
            result.pings = pings;
            console.log("\n\n%s", JSON.stringify(result, null, 4));
        }).catch(function(e) {
            console.log("Something wrong happened:");
            console.log(e);
        });
    }
}

module.exports = main;