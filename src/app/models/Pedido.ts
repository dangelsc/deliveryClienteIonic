export class Pedido{
    id?:String|null;
    cliente?={
        /*id:String,
        nombre:String,
        apellidos:String*/
    };
    detalle=[];
    //cantidad?:Number;
    fecha?:Date;
    total?:Number
    //constructor(){}
}