import { IImagem } from "./IImagem";

export interface INoticia {
    conteudo: string;
    autor: string;
    titulo: string;
    subTitulo: string;
    url: string;
    data: string;
    imagens: Array<IImagem>;
}