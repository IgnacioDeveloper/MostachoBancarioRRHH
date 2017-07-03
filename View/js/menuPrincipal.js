window.onload=function(){
	new MenuPrincipal();
}

function MenuPrincipal(){
	this.iOrganigrama;
	this.menuAreas;
	this.menuPuestos;
	this.menuPersonas;
	this.menuUsuarios;
	this.iCerrarSesion;
	this.lblUser;
	this.usuario=null;
	this.iNuevaArea;
	this.iNuevoPuesto;
	this.iNuevaPersona;
	this.iNuevoUsuario;
	this.iAreas;
	this.iPuestos;
	this.iPersonas;
	this.iUsuarios;
	this.body;
	this.modal;
	this.content;
	this.usuario;
	this.servidor;

	this.startMenuPrincipal=function(){
		this.initComponents();
		this.loadAllScripts();
		lblUser.innerHTML = "Nombre de Usuario: "+this.usuario.nombre+" // Tipo de Usuario: "+translateProfile(this.usuario.usertype);
	}

	this.loadAllScripts=function(){
		this.loadScript("http://localhost/MostachoRRHH/View/js/reloj.js");
		//this.loadScript("http://localhost/MostachoRRHH/View/js/servidor.js");
		this.loadScript("http://localhost/MostachoRRHH/View/js/mensajeModal.js");
		this.loadScript("http://localhost/MostachoRRHH/View/js/validacion.js");
		this.loadScript("http://localhost/MostachoRRHH/View/js/formularioModal.js");
	}

	this.loadScript=function(url){    
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
	    this.body.appendChild(script);
	}

	this.initComponents=function(){
		this.iOrganigrama=document.getElementById("iOrganigrama");
		this.menuAreas = document.getElementById("mAreas");
		this.menuPuestos=document.getElementById("mPuestos");
		this.menuPersonas=document.getElementById("mPersonas");
		this.menuUsuarios=document.getElementById("mUsuarios");
		this.iNuevaArea = document.getElementById("iNuevaArea");
		this.iNuevoPuesto=document.getElementById("iNuevoPuesto");
		this.iNuevaPersona=document.getElementById("iNuevaPersona");
		this.iNuevoUsuario=document.getElementById("iNuevoUsuario");
		this.iAreas = document.getElementById("iAreas");
		this.iPuestos=document.getElementById("iPuestos");
		this.iPersonas=document.getElementById("iPersonas");
		this.iUsuarios=document.getElementById("iUsuarios");
		this.iCerrarSesion=document.getElementById("iCerrarSesion");
		this.lblUser = document.getElementById("lblUserInfo");
		this.body = document.getElementsByTagName('body')[0];
		this.modal = document.getElementById("formularioModal");
		this.content = document.getElementById("content");
		if(this.usuario!=null)this.content.style.display="table";
		this.eventos();
	}

	this.eventos=function(){
		var self = this;
		this.iCerrarSesion.onclick=function(){self.solicitudServidorAJAX("metodo=destroySession",2);};
		this.iNuevaArea.onclick=function(){self.setForm("areas",1);};
		this.iNuevoPuesto.onclick=function(){self.setForm("puestos",1);};
		this.iNuevaPersona.onclick=function(){self.setForm("personas",1);};
		this.iNuevoUsuario.onclick=function(){self.setForm("usuarios",1);};
		this.iMenuArea.onclick=function(){};
		this.iMenuPuesto.onclick=function(){};
		this.iMenuPersona.onclick=function(){};
		this.iMenuUsuario.onclick=function(){};
	}

	/*this.Configuracion=function(modal,tipo){
		this.modal = modal;
		this.tipo = tipo;
	}*/

	this.setForm=function(modulo,tipo){
		switch(modulo){
			case "areas":break;
			case "puestos":break;
			case "personas":break;
			case "usuarios":if(tipo == 1)new FormUsuario({modal:this.modal,tipo:1});break;
		}
	}

	this.translateProfile=function(profile){
		if(profile == 'J') return "Jefe de RRRHH";
		else return "Empleado de RRHH";
	}

	this.setUserInfo=function(usuario){
		if(usuario == "NSS"){
			this.goIndex();
		}
		else{
			this.usuario = JSON.parse(usuario);
		}
	}

	this.closeMenuPrincipal=function(resultado){
		if(resultado == "true")
			this.goIndex();
		else
			alert("No se pudo cerrar la Sesion!");
	}

	this.goIndex=function(){
		location.href = "index.html";
	}	

	this.solicitudServidorAJAX=function(params,postFuncion){
		var resultado = "";
		var ajax_url  = "http://localhost/MostachoRRHH/Controller/Controlador.php";
		var ajax_request = new XMLHttpRequest();
		ajax_request.open("POST",ajax_url,true);
		ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax_request.send(params);
		ajax_request.onreadystatechange=function(){
			if(ajax_request.readyState == 4 && ajax_request.status == 200){
				switch(postFuncion){
					case 1: this.setUserInfo(ajax_request.responseText);this.startMenuPrincipal();break;
					case 2: this.closeMenuPrincipal(ajax_request.responseText); break;
				}
			}
		}.bind(this);
	}

	this.solicitudServidorAJAX("metodo=getNowUser",1);

}
/*


var iOrganigrama, menuAreas, menuPuestos, menuPersonas, menuUsuarios, iCerrarSesion, lblUser, usuarioSistema, iNuevaArea, iNuevoPuesto, iNuevaPersona, iNuevoUsuario, iAreas, iPuestos, iPersonas, iUsuarios, modal, modalHeader, modalBody, modalFooter, span, formulario,servidor;

window.onload=function(){
	solicitudServidorAJAX("metodo=getNowUser",1);
	loadScript("http://localhost/MostachoRRHH/View/js/reloj.js");
	loadScript("http://localhost/MostachoRRHH/View/js/servidor.js");
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
	else return "Empleado de RRHH";
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
			}
		}
	}
}

function goIndex(){
	location.href = "index.html";
}

*/