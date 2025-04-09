import { Comprador } from "./comprador";
import { Produto } from "./produto";
export class Comanda {
    id!: number;
    produtos!: Produto[];
    comprador!: Comprador;
    dataCriacao!: Date;
}
