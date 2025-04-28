import { Supermercado } from "./supermercado";


export class Produto {

    
    public id!: number;
    public nome!: string;
    public validade!: string;  // aqui a data é inicializada com hoj
    public precoOriginal!: number ;
    public precoAtual!: number;
    public supermercado!: Supermercado;
}





