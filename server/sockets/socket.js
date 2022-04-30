const Users = require('../classes/users');
const { io } = require('../server');
const {crearMensaje}=require('../utils/utils');

const users=new Users();
io.on('connection', (socket) => {

    socket.on('entrarChat',(data,callback)=>{
        if(!data.nombre){
            return callback({
                error:true,
                msg:'El nombre es necesario'
            });
        }
        let personas=users.agregarPersona(socket.id,data.nombre);

        socket.broadcast.emit('listaPersonas',users.getPersonas());
        callback(personas);
    })

    socket.on('disconnect',()=>{
        let personaBorrada= users.borrarPersona(socket.id);
        
        socket.broadcast.emit('crearMensaje',crearMensaje('Admin',`${personaBorrada.nombre} abandono el chat`));
        socket.broadcast.emit('listaPersonas',users.getPersonas());

    })

    socket.on('crearMensaje',(data)=>{
        let persona=users.getPersona(socket.id);

        let mensjae= crearMensaje(persona.nombre,data.mensaje);

        socket.broadcast.emit('crearMensaje',mensjae);
    })
    
});