var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location='index.html';
    throw new Error('El nombrey y la sala son necesarios')
}

var user={
    nombre:params.get('nombre'),
    sala:params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat',user,(res)=>{
        console.log(res)
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// // Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Jdvpl',
//     mensaje: 'Hola Mundo'
// }, (resp)=> {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', (mensaje) =>{
    console.log(mensaje);
});

// escuchar cuando un usuario entra o sale del hcat
socket.on('listaPersonas', (personas) =>{
    console.log( personas);
});

// mensaje privado

socket.on('mensajePrivado',(mensaje) =>{
    console.log(mensaje);
})