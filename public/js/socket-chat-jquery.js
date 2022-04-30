// referencias
const divUsuarios=$('#divUsuarios');

// funciones para renderizar usuarios


var params = new URLSearchParams(window.location.search);

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