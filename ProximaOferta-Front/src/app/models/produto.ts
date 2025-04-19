import { Supermercado } from "./supermercado";


export class Produto {

    constructor(
    public id: number = 0,
    public nome: string = '',
    public validade: Date = new Date(),  // aqui a data é inicializada com hoj
    public precoOriginal: number = 0){}
    public precoAtual!: number;
    public supermercado!: Supermercado;
}





