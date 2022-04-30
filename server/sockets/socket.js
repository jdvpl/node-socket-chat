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

        users.agregarPersona(socket.id,data.nombre,data.sala);

        socket.broadcast.to(data.sala).emit('listaPersonas',users.getPersonasPorSala(data.sala));
        callback(users.getPersonasPorSala(data.sala));
    })

    socket.on('disconnect',()=>{
        let personaBorrada= users.borrarPersona(socket.id);
        
        socket.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Admin',`${personaBorrada.nombre} abandono el chat`));
        socket.broadcast.to(personaBorrada.sala).emit('listaPersonas',users.getPersonasPorSala(personaBorrada.sala));

    })

    socket.on('crearMensaje',(data)=>{
        let persona=users.getPersona(socket.id);
        let mensjae= crearMensaje(persona.nombre,data.mensaje);
        socket.broadcast.to(persona.sala).emit('crearMensaje',mensjae);
    })

    // mensaje privados
    socket.on('mensajePrivado',data=>{
        let persona=users.getPersona(socket.id);
        socket.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));
    })
    
});