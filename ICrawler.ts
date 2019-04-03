import { INoticia } from "./INoticia";

export interface ICrawler {
    host: string;
    path: string;
    obterLinks($: any): any;
    obterNoticia($: any, link: string): INoticia;
}