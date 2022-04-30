const Users = require('../classes/users');
const { io } = require('../server');

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
        socket.broadcast.emit('crearMensaje',{user:'Admin',mensaje:`${personaBorrada.nombre} abandono el chat`});
        socket.broadcast.emit('listaPersonas',users.getPersonas());

    })
    
});