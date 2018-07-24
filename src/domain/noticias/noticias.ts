import { Artigos } from "./artigos";

export class Noticias {    filter: any;
    

    constructor(
        public status: string,
        public totalResults: number,   
        public articles: Artigos
    ) {}                
    
}
