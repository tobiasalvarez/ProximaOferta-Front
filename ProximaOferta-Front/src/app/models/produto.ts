import { Supermercado } from "./supermercado";

export class Produto {
    id!: number;
    nome!: string;
    validade!: string;
    precoOriginal!: number;
    precoAtual!: number;
    supermercado!: Supermercado;
}
