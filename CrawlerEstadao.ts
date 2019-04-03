import { ICrawler } from "./ICrawler";
import { IImagem } from "./IImagem";
import { INoticia } from "./INoticia";

export class CrawlerEstadao implements ICrawler {

    public get host(): string {
        return 'pme.estadao.com.br';
    }

    public get path(): string {
        return '/ultimas-noticias/';
    }

    obterLinks($: any): any {
        var links = $('.box-content .titulo a').map(function () {
            return this.href;
        }).toArray();

        return links;
    }

    obterNoticia($: any, link: string): INoticia {
        var titulo = $('.box-content .titulo').text();
        var subTitulo = $('.box-content .chamada').text();
        var autor = $('.box-content #nome_editor').text();
        var dataNoticia = $('.box-content .tit-secao span').text();

        var imagens = $('.box-content .corpo img');

        let imagensDaNoticia = new Array<IImagem>();

        if (imagens && imagens.length > 0) {
            for (var indexImagem = 0; indexImagem < imagens.length; indexImagem++) {
                var imagem = imagens[indexImagem];
                var caminhoSrc = imagem.attributes['src'].value;
                var caminhoDataImg = imagem.attributes['data-img'];

                var caminho = caminhoSrc;
                if (caminhoDataImg) {
                    caminho = caminhoDataImg.value;
                }

                var alt = imagem.attributes['alt'];
                var legenda = '';
                if (alt) {
                    legenda = alt.value;
                }

                var dataCredito = imagem.attributes['data-credito'];

                var credito = '';
                if (dataCredito) {
                    credito = dataCredito.value;
                }

                let imagemNoticia = {
                    url: caminho,
                    legenda: legenda,
                    credito: credito
                }

                imagensDaNoticia.push(imagemNoticia);
            }
        }

        $('.box-content .corpo .bb-md-noticia-foto').remove();
        $('p:contains("::: Saiba tudo sobre :::")').remove();
        $('p:contains("::: Leia também :::")').remove();
        var conteudo = $('.box-content .corpo').text();

        let noticia = {
            conteudo: conteudo,
            autor: autor,
            titulo: titulo,
            subTitulo: subTitulo,
            url: link,
            data: dataNoticia,
            imagens: imagensDaNoticia
        }

        return noticia;
    }
}