const Users = require('../classes/users');
const { io } = require('../server');
const {crearMensaje}=require('../utils/utils');

const users=new Users();
io.on('connection', (socket) => {

    socket.on('entrarChat',(data,callback)=>{
        if(!data.nombre || !data.sala){
            return callback({
                error:true,
                msg:'El nombre/sala es necesario'
            });
        }
        socket.join(data.sala);

        let personas=users.agregarPersona(socket.id,data.nombre,data.sala);

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

    // mensaje privados
    socket.on('mensajePrivado',data=>{
        let persona=users.getPersona(socket.id);
        socket.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));
    })
    
});