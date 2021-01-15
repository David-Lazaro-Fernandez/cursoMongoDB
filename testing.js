//insertOne Nos perimte insertar un documento
//use |Nombre de la db| nos permite movernos entre db
//db.getName()c nos permite obtener el nombre de la db en la que estamos trabajando
//insertMany() nos permite insertar más de una coleccion a un documento
//db.nombredeladb.find() nos regresa todos los objetos que existen en la db
var padawan = {
    nombre: "David",
    apellidoPaterno:"Lazaro",
    apellidoMaterno:"Fernandez",
    correo:"davidlazaro20@hotmail.com",
    telefono:9811880331
}
var padawan2 = {
    nombre: "Fernando",
    apellidoPaterno:"Garcia",
    apellidoMaterno:"Gallardo",
    correo:"FerGallardo@hotmail.com",
    telefono:5553444233
}


var user3 ={
    name:"Benjamin",
    lastName: "Lazaro",
    age: 15,
    email: "mecago@hotmail.com"
}

var user4 ={
    name:"Rodolfo",
    lastName: "Ferro",
    age: 24,
    email: "rodo@hotmail.com"
}

var user5 ={
    name:"Fernanda",
    lastName: "Ochoa",
    age: 29,
    email: "ferchoa@hotmail.com"
}

var user6 ={
    name:"Hector",
    lastName: "Marquez",
    age: 20,
    email: "hamglex@hotmail.com"
}


db.users.insertMany([user4,user5,user6])

db.users.find(
    {age:20}, //Criterios, es decir, DONDE "condicion de la consulta"
    {age:false} //Este es el 2do atributo el cual actua como un SELECT
).pretty()  
        //Basta con poner los atributos que queremos mostrar en pantalla
        //Para que podamos verlos, esos los marcaremos con un true o false
        /*Es importante mencionar que en el segundo atributo solo podemos
        realizar 1 operacion a la vez, una INCLUISION o EXCLUSION, es
        decir, solo podermos o poner los campos que queremos ver marcandolos
        con true o simplemente podemos poner los campos que no queremos
        ver, con false como en los siguientes ejemplos*/
 db.users.find(
     {name:"Hector"},
     {name:false}
).pretty()  
/*Esta busqueda mostrara todos los usuarios con nombre Hector
y mostrara todos los campos del documento a excepcion del campo name*/

db.users.find(
    {name:"Hector"},
    {name:true, age:true}
).pretty()  
/*Esta busqueda mostrara todos los usuarios con nombre Hector
y mostrara simplemente los campos name y age*/

/*Si queremos que el resultado que nos arroje
el metodo find sea más bonito al momento de leer, lo que 
podermos hacer es poner al final de la consulta 
la funcion ||.pretty()|| */

//////////Busquedas con el operador $ne - Diferente a...///////////////////////
/*Sintaxis 
db.nombredelaDB.find(
    {
        campo:{
            $ne: valor diferente a 
        }
    }
)
*/

//Ejemplo: Obtengamos todos los usuarios cuya edad sea diferente a 25
db.users.find(
    {
        age:{
            $ne:25
        }    
    }
).pretty()
//////////Busquedas con el operador $eq - Igual a...///////////////////////
/*Sintaxis 
db.nombredelaDB.find(
    {
        campo:{
            $eq: valor diferente a 
        }
    }
)
*/

//Ejemplo: Obtengamos todos los usuarios cuya edad sea igual a 25
db.users.find(
    {
        age:{
            $eq:25
        }    
    }
).pretty()

/*Ahora si solamente queremos encontrar el primer documento que cumpla
con las condiciones de nuestra busqueda utilizaremos el comando 
findOne

NOTA: ESTE METODO NO POSEE LA FUNCION pretty() ya que lo tiene incorborado por defecto
*/

db.users.findOne(
    {
        age:{
            $ne:25
        }    
    }
)
/*Si simplemente ejecutamos el metodo findOne sin argumentos
lo que hara sera regresarnos el primer documento de la colección*/

//////////////Operadores relacionales///////////////////
/** 
 $gt - mayor a
 $gte - mayor o igual a 
 $eq - igual a 
 $ne - no igual 
 $lt - menor a
 $lte - menor o igual a 
*/
db.users.find(
    {
        age:{
            $lte:20
        }
    }
)

//////////Operadores logicos or y and////////
//Obtener todos los usuarios  cuya edad sea mayor a 20 y menor a 25

db.users.find(
    {
        $and:[
            {
                age:{$gt:20}
            },
            {
                age:{$lt:25}
            }
        ]
    }
)

//Obtener todos los usuarios cuyo nombre sea Hector o Fernanda
db.users.find(
    {
        $or:[
            {
                name:{$eq:"David"}
            },
            {
                name:{$eq:"Fernanda"}
            }            
        ]
    }
)
///////////////////// Expresiones generales (LIKE) //////////////////////////

/*Para este apartado incluiremos una nueva coleccion a nuestra base de datos*/

db.books.insertMany(
    [
  
      {title: 'Don quijote de la mancha', sales: 500},
  
      {title: 'Historia de dos ciudades', sales: 200}, 
      {title: 'El señor de los anillos', sales: 150}, 
      {title: 'El principito', sales: 140},
  
      {title: 'El hobbit', sales: 100},
  
      {title: 'Alicia en el país de las maravillas', sales: 100},
  
      {title: 'El código davincci', sales: 80},
  
      {title: 'El alquimista', sales: 65}
    ]
  )
//Ahora que ya tenemos nuestra coleccion de libros veamos un par de ejemplos 
//Obtener todos los libros cuyo titulo empiece con "El" 
db.books.find({
    title: /^El/
    //Esta expresion se asemeja el WHERE title LIKE '%EL' de SQL
}).pretty()

//Obtener todos los libros cuyo titulo termine  con la letra "s" 
db.books.find({
    title:/s$/
    //Esta expresion se asemeja el WHERE title LIKE '%s' de SQL
})

//Obtener todos los libros cuyo titulo incluya la letra "a" en el 
db.books.find({
    title:/a/
    //Esta expresion se asemeja el WHERE title LIKE '%a%' de SQL
})

//Resumen 
// /^palabra, letra o numero/ <- Empieza con 
// /palabra, letra o numero$/ <- Termina con 
// /palabra, letra o numero/ <- Se encuentra en la cadena 

/////////////////////Buscar dentro de una lista/////////////////////////////////////

//Usualmente cuando tenemos muchos datos dentro de una coleccion o lista y 
//queremos hacer consultas más complejas, puede llegar a ser un poco tedioso el usar
//los operadores relacionales, ya que nos pueden crear un codigo gigante y no tan 
//eficiente como el que veremos ahora

// -> $in Esta dentro de la coleccion o de la lista
// -> $nin No esta dentro de la coleccion o de la lista 

//Veamos un ejemplo de como lo usariamos
/*Mostrar todos los usuarios cuyo nombre sea: Fernando o Fernanda o Hector o David*/

db.users.find({
    name: {
        $in: ["Fernanda","Fernando","Hector","David"]
    }
}).pretty()


//////////////// Consultas sobre atributos ////////////////////////////
/*Para poder realizar consultas sobre los atributos de los documentos de nuestra
coleccion podemos realizar distintos procedimientos.
Primero recordemos que en MongoDB podemos tener distintos atributos en cada uno de 
nuestros documentos. Es decir, podemos tener documentos que posean un atributo que 
todos los demas documentos de nuestra coleccion no posean.

Veamos los siguientes ejemplos:*/

//Mostrar todos los usuarios que posean el atributo nombre en la coleccion users

db.users.find({
    name:{
        $exists: true
    }
})

//Veamos que pasa si añadimos un nuevo usuario a la coleccion  que no posea 
//el atributo name en el 

var not_name_user= {
    
    apellidoPaterno:"Fierro",
    apellidoMaterno:"Fernandez",
    correo:"FE@hotmail.com",
    telefono:955444332
}

//Realicemos ahora la siguiente consulta
//Mostrar a todos los usuarios que no contengan el atributo name 

db.users.find(
    {
        name:{
            $exists:false
        }
    }
).pretty()

//Ahora bien, tambien podemos realizar consultas atraves del tipo de dato que posea un 
//atributo

//Obtener todos los usuarios cuyo atributo cratedAt sea de tipo date 

var newUser2 = {
    
    apellidoPaterno:"Fierro",
    apellidoMaterno:"Fernandez",
    correo:"FE@hotmail.com",
    telefono:955444332,
    createdAt: new Date()
}

//Insertaremos este nuevo usuario a nuestra coleccion

//Para realizar esta consulta utilizaremos el operador $type 
//El cual nos permite describir cual es el tipo de dato que estamos buscando

db.users.find({
    createdAt:{
        $type: "date"
    }
}).pretty()

///////////////////////////Tipos de datos en Mongo DB ///////////////////////////
 /**
  *              Listado de los tipos más comunes en MongoDB

                        Tipo	Número	Alías
                        Double	1	'double'
                        String	2	'string'
                        Object	3	'Object'
                        Array	4	'array'
                        ObjectId	7	'objectId'
                        Boolean	8	'boolean'
                        Date	9	'date'
                        Null	10	'null'
                        Regular Expression	11	'regex'
                        Timestamp	17	'timestamp' 
*/


//////////////////////////////Actualizar documentos//////////////////////////////

//Para actualizar los datos los documentos de nuestra coleccion simplemente debemos de 
//hacer uso de algunas de las siguientes funciones: 
//updateOne -> Nos permite actualizar la información de 1 documento 
//updateMany -> Nos permite actualizar la información de una lista de documentos


//Anteriormente agregamos un usuario que poseia el atributo createdAt, el cual 
//no todos los documentos de nuestra coleccion poseen, hagamos que todos los 
//documentos de nuestra coleccion poseean este atributo con el uso de updateMany

db.users.updateMany(
    //Obligatoriamente updateMany recibe 2 atributos 
    {
        createdAt:{
            $exists:false 
        }
    }, //Nuestros criterios de busqueda
    {
        $set:{
            createdAt: new Date()
        }
    }  //Los cambios que vamos a implementar
)

//Como pudimos ver hicimos uso de un nuevo operador, el $set 
//$set nos permite agregar un nuevo atributo a los documentos de nuestra coleccion
//Sin la necesidad de alterar cada uno de ellos paso a paso


////////////////////// Quitar un atributo de multiples documentos//////////////////////

//Para quitar atributos que ya no vamos a necesitar en nuestros documentos 
//simplemente debemos hacer uso del operador $unset, que es la contraparte de 
//$set y este nos permite quitar algun especifico de la colección

//Veamos el siguiente ejemplo 
//Primero crearemos un nuevo atributo a la coleccion con nombre asistencia 

db.users.updateMany(
    {
        name:{
            $exists:true
        }
    },
    {
        $set:{
            asistencia: true
        }
    }
)

//Ahora que hemos añadido este atributo vamos a eliminarlo de la coleccion 
db.users.updateMany(
    {
        asistencia:{
            $exists:true
        }
    },
    {
        $unset:{
            asistencia: true 
        }
    }
)

////Incrementar valores con el operador $inc //////

//En esta ocacion utilizaremos el operador $inc
//Este nos permite aumentar el valor de atributos de tipo number 

//Veamos el siguiente ejemplo 
//Aumentar la edad de todos los usuarios de la colección en 1 

db.users.updateMany(
    {
        age:{
            $exists:true
        }
    },
    {
        $inc:{ 
            age:1
        }
    }
)

//Nos podemos dar cuenta que este operador funciona como los operadores 
//and y or. Otro punto interesante es que tambien podemos 
//decrecer los valores de un atriburo con $inc
//Simplemente debemos de insertar un numero negativo en el atributo que vamos a decrecer

//Veamos el siguiente ejemplo: Decrecer la edad de todos los usuarios de la coleccion en 1 

db.users.updateMany(
    {
        age:{$exists:true}
    },
    {
        $inc:{
            age:-1
        }
    }
)

/////////// Upsert - Modificar documentos sin conocer su existencia///////

//Upsert es un concepto el cual lo utilizaremos cuando 
//querramos actualizar un documento de nuestra coleccion 
//pero no conocemos al 100% de su existencia
db.users.updateOne(
    {
        name:"Sergio"
    },
    {
        $set:{
            age:45
        }
    },
    //Nuevo argumento para la actualización
    {
        upsert:true
    }
)

//Como podemos ver, estamos agregando un nuevo 
//argumento a nuestra funcion de update, este 
//tercer argumento es el upsert, el cual le indica a la funcion 
//que si no existe ningun documento con las condiciones 
//prestablecidas, entonces se creara el documento 