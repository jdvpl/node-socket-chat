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
      renderizarMensaje(mensaje,true);
      scrollBottom();
  });

})


const renderizarMensaje=(mensaje,yo) => {
  let html = '';

  var fecha=new Date(mensaje.fecha);
  var hora=fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
  var adminClass = 'info';

  if(mensaje.nombre=='Admin') {
    adminClass = 'danger';
  }
  if(yo){

    html +=
  `
  <li class="reverse">
  <div class="chat-content">
    <h5>${mensaje.nombre}</h5>
    <div class="box bg-light-inverse">
      ${mensaje.mensaje}
    </div>
  </div>
  <div class="chat-img">
    <img src="assets/images/users/5.jpg" alt="user" />
  </div>
  <div class="chat-time">${hora}</div>
</li>
  `;


  }else{
    html +=
    `<li class="animated fadeIn">`

    if(mensaje.nombre !=='Admin'){
      html+=  '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }

    html+=`<div class="chat-content">
      <h5>${mensaje.nombre}</h5>
      <div class="box bg-light-${adminClass}">
        ${mensaje.mensaje}
      </div>
    </div>
    <div class="chat-time">${hora}</div>
  </li>`;
  }

divChatbox.append(html)
}


const scrollBottom =()=> {

  // selectors
  var newMessage = divChatbox.children('li:last-child');

  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      divChatbox.scrollTop(scrollHeight);
  }
}