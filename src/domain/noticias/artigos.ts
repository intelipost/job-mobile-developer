import { Fonte } from "./fonte";

export class Artigos {    filter: any;
    

    constructor(
        public source: Fonte,
        public author: string,   
        public title: string,
        public description: string,
        public url: string,
        public urlToImage: string,
        public publishedAt: string
    ) {}                
    
}