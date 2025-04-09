import { Comanda } from "./comanda";
import { Sexo } from "./sexo";

export class Comprador {
    id!: number;
    nome!: string;
    rua!: string;
    bairro!: string;
    idade!: number;
    genero!: Sexo;
    comanda!: Comanda;
}
