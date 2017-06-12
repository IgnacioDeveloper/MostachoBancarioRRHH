var iOrganigrama, menuAreas, menuPuestos, menuPersonas, menuUsuarios, iCerrarSesion, lblUser, usuarioSistema, iNuevaArea, iNuevoPuesto, iNuevaPersona, iNuevoUsuario, iAreas, iPuestos, iPersonas, iUsuarios, modal, modalHeader, modalBody, modalFooter, span, formulario;

window.onload=function(){
	solicitudServidorAJAX("metodo=getNowUser",1);
	loadScript("http://localhost/MostachoRRHH/View/js/reloj.js");
	//loadScript("http://localhost/MostachoRRHH/View/js/servidor.js");
	loadScript("http://localhost/MostachoRRHH/View/js/mensajeModal.js");
	loadScript("http://localhost/MostachoRRHH/View/js/validacion.js");
	loadScript("http://localhost/MostachoRRHH/View/js/formularioModal.js");
	initComponents();
}

function initComponents(){
	iOrganigrama=document.getElementById("iOrganigrama");
	menuAreas = document.getElementById("mAreas");
	menuPuestos=document.getElementById("mPuestos");
	menuPersonas=document.getElementById("mPersonas");
	menuUsuarios=document.getElementById("mUsuarios");
	iNuevaArea = document.getElementById("iNuevaArea");
	iNuevoPuesto=document.getElementById("iNuevoPuesto");
	iNuevaPersona=document.getElementById("iNuevaPersona");
	iNuevoUsuario=document.getElementById("iNuevoUsuario");
	iAreas = document.getElementById("iAreas");
	iPuestos=document.getElementById("iPuestos");
	iPersonas=document.getElementById("iPersonas");
	iUsuarios=document.getElementById("iUsuarios");
	iCerrarSesion=document.getElementById("iCerrarSesion");
	lblUser = document.getElementById("lblUserInfo");
	modal = document.getElementById("formularioModal");
	eventos();
}

function eventos(){
	iCerrarSesion.onclick=function(){solicitudServidorAJAX("metodo=destroySession",2);};
	iNuevaArea.onclick=function(){setForm("areas",1);};
	iNuevoPuesto.onclick=function(){setForm("puestos",1);};
	iNuevaPersona.onclick=function(){setForm("personas",1);};
	iNuevoUsuario.onclick=function(){setForm("usuarios",1);};
	iMenuArea.onclick=function(){};
	iMenuPuesto.onclick=function(){};
	iMenuPersona.onclick=function(){};
	iMenuUsuario.onclick=function(){};
}

function Configuracion(modal,tipo){
	this.modal = modal;
	this.tipo = tipo;
}

function setForm(modulo,tipo){
	switch(modulo){
		case "areas":break;
		case "puestos":break;
		case "personas":break;
		case "usuarios":if(tipo == 1)new FormUsuario(new Configuracion(modal,1));break;
	}
}

function translateProfile(profile){
	if(profile == 'J') return "Jefe de RRRHH";
	else "Empleado de RRHH";
}

function loadScript(url){    
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    body.appendChild(script);
}

function setUserInfo(usuario){
	if(usuario == "NSS"){
		goIndex();
	}
	else{
		usuario = JSON.parse(usuario);
		lblUser.innerHTML = "Nombre de Usuario: "+usuario.nombre+" // Tipo de Usuario: "+translateProfile(usuario.usertype);
	}
}

function closeMenuPrincipal(resultado){
	if(resultado == "true")
		goIndex();
	else
		alert("No se pudo cerrar la Sesion!");
}

function solicitudServidorAJAX(params,postFuncion){
	var resultado = "";
	var ajax_url  = "http://localhost/MostachoRRHH/Controller/Controlador.php";
	var ajax_request = new XMLHttpRequest();
	ajax_request.open("POST",ajax_url,true);
	ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax_request.send(params);
	ajax_request.onreadystatechange=function(){
		if(ajax_request.readyState == 4 && ajax_request.status == 200){
			switch(postFuncion){
				case 1: setUserInfo(ajax_request.responseText); break;
				case 2: closeMenuPrincipal(ajax_request.responseText); break;
				case 3: setOrgranigrama(ajax_request.responseText); break;
				case 4: setMainInfo(ajax_request.responseText); break;
			}
		}
	}
}

function goIndex(){
	location.href = "index.html";
}