/// <reference path="typings/main/ambient/node/index.d.ts" />

import http = require('http');
import { CrawlerEstadao } from "./CrawlerEstadao";
import { Crawler } from "./Crawler";

class Servidor {

    public static main(): void {
        new Servidor();
    }

    constructor() {
        var server = http.createServer(this.atendeRequisicao);
        server.listen(3000);
        console.log('Servidor rodando!');
    }

    private atendeRequisicao(request, response): void {
        response.writeHead(200, { "Content-Type": "text/html" });

        if (request.url == "/") {
            response.write("<h1>Página principal</h1>");
            var estadao = new CrawlerEstadao();
            new Crawler().crawler(estadao);
        } else if (request.url == "/estadao") {

            response.write("<h1>Bem-vindo :)</h1>");
        } else {
            response.write("<h1>Página não encontrada :(</h1>");
        }

        response.end();
    }
}

Servidor.main();