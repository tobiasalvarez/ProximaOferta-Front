import { Comanda } from "./comanda";
import { Sexo } from "./sexo";

export class Comprador {

    constructor(
    public id: number = 1,
    public nome: string = '',
    public rua: string,
    public bairro: string,
    public idade: number
    )   {}



}
