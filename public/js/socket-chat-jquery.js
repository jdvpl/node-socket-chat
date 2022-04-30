// referencias
const divUsuarios=$('#divUsuarios');
const formEnviar=$('#formEnviar');
const txtMensaje=$('#txtMensaje');
const divChatbox=$('#divChatbox');

// funciones para renderizar usuarios

var params = new URLSearchParams(window.location.search);

var user={
  nombre:params.get('nombre'),
  sala:params.get('sala')
}

const renderizarUser=(personas)=>{
  var html='';

  html += `<li>
    <a href="javascript:void(0)" class="active">Chat de <span> ${params.get('sala')}</span></a>
  </li>
  `;

  for(var i=0; i<personas.length; i++) {
    html += `
    <li>
    <a data-id="${personas[i].id}" href="javascript:void(0)">
      <img src="assets/images/users/${i+1}.jpg"
        alt="user-img"
        class="img-circle"
      />
      <span>${personas[i].nombre}
        <small class="text-success">online</small></span></a>
    </li>
    `;
  }
  divUsuarios.html(html);

}

// listernets

divUsuarios.on('click','a',function(){
  var id=$(this).data('id');
  if(!id)return;
  console.log(id)
})

formEnviar.on('submit',(e)=>{
  e.preventDefault();
  let mensaje=txtMensaje.val().trim();
  if(mensaje.length===0){
    return;
  }
  // // Enviar información
  socket.emit('crearMensaje', {
      usuario: user.nombre,
      mensaje: mensaje
  }, (mensaje)=>{
      txtMensaje.val('').focus();
      renderizarMensaje(mensaje);
  });

})


const renderizarMensaje=(mensaje) => {
  let html = '';
  html +=
  `<li class="animated fadeIn">
  <div class="chat-img">
    <img src="assets/images/users/1.jpg" alt="user" />
  </div>
  <div class="chat-content">
    <h5>${mensaje.nombre}</h5>
    <div class="box bg-light-info">
      ${mensaje.mensaje}
    </div>
  </div>
  <div class="chat-time">10:56 am</div>
</li>`

divChatbox.append(html)
}