export class Pedido{
    id?:String|null;
    cliente?={
        /*id:String,
        nombre:String,
        apellidos:String*/
    };
    lat:Number;
    lon:Number;
    estado:string='pendiente';
    detalle=[];
    estadoMoto:String;
    idmoto:String;
    fecha?:Date;
    total?:Number
    //constructor(){}
}