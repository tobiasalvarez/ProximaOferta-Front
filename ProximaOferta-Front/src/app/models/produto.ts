

export class Produto {

    constructor(
    public id: number = 0,
    public nome: string = '',
    public validade: Date = new Date(),  // aqui a data é inicializada com hoj
    public precoOriginal: number = 0){}
   /* precoAtual!: number;
    supermercado!: Supermercado;){}*/ //INSERIR MAIS TARDE
}





