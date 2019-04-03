/// <reference path="typings/main/ambient/node/index.d.ts" />

import http = require('http');
import fs = require('fs');
import { ICrawler } from "./ICrawler";

export class Crawler {

    public crawler(crawlerObject: ICrawler): void {
        var options = {
            host: crawlerObject.host,
            path: crawlerObject.path
        }
        
        var dir = "C:\\Crawler\\" + crawlerObject.host;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        var request = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                var jsdom = require('jsdom').jsdom;
                var document = jsdom(data, {});
                var window = document.defaultView;
                var $ = require('jquery')(window);

                var links = crawlerObject.obterLinks($);

                for (var indexLink = 0; indexLink < links.length; indexLink++) {
                    var link = links[indexLink];
                    new Crawler().salvarNoticia(link, indexLink, crawlerObject);

                    console.log(link);
                }
            });
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    }

    public salvarNoticia(link: any, indexLink: number, crawlerObject: ICrawler): void {
        var url = require('url');
        var urlParts = url.parse(link, true);

        var options = {
            host: urlParts.host,
            path: urlParts.path
        }

        var request = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                var jsdom = require('jsdom').jsdom;
                var document = jsdom(data, {});
                var window = document.defaultView;
                var $ = require('jquery')(window);

                let noticia = crawlerObject.obterNoticia($, link);
                var file = "C:\\Crawler\\" + urlParts.host + "\\noticia" + indexLink + ".txt";
                fs.writeFile(file, JSON.stringify(noticia), function (err, out) {
                    if (err) {
                        console.error("write error:  " + err.message);
                    } else {
                        console.log("Successful Write to " + file);
                    }
                });
            });
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    }
}