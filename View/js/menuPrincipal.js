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
	this.lblReloj;
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
	this.main;
	this.dataHandler=null;
	this.organigrama = null;
	this.registers=[];

	this.startMenuPrincipal=function(){
		this.initComponents();
		this.loadAllScripts();
		this.startDataHandlerMainOperations(); //Enlaza con el archivo servidor.js y setea los eventos
		this.lblUser.innerHTML = 'Nombre de Usuario: '+this.usuario.nombre+' // Tipo de Usuario: '+this.translateProfile(this.usuario.usertype);
		if(this.usuario.usertype !== 'J') this.hideUsuariosOperations();
		this.renderMainMenu('organigrama');
	}

	this.loadAllScripts=function(){
		this.loadScript('http://localhost/MostachoRRHH/View/js/reloj.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/dataHandler.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/registros.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/listas.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/chooserPuesto.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/organigrama.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/menuAreas.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/dateActions.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/organigramaModal.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/mensajeModal.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/validacion.js');
		this.loadScript('http://localhost/MostachoRRHH/View/js/formularioModal.js');
	}

	this.loadScript=function(url){    
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
	    this.body.appendChild(script);
	}

	this.hideUsuariosOperations=function(){
		this.menuUsuarios.style.display = 'none';
	}

	this.initComponents=function(){
		this.iOrganigrama=document.getElementById('iOrganigrama');
		this.menuAreas = document.getElementById('mAreas');
		this.menuPuestos=document.getElementById('mPuestos');
		this.menuPersonas=document.getElementById('mPersonas');
		this.menuUsuarios=document.getElementById('mUsuarios');
		this.iNuevaArea = document.getElementById('iNuevaArea');
		this.iNuevoPuesto=document.getElementById('iNuevoPuesto');
		this.iNuevaPersona=document.getElementById('iNuevaPersona');
		this.iNuevoUsuario=document.getElementById('iNuevoUsuario');
		this.iAreas = document.getElementById('iAreas');
		this.iPuestos=document.getElementById('iPuestos');
		this.iPersonas=document.getElementById('iPersonas');
		this.iUsuarios=document.getElementById('iUsuarios');
		this.iCerrarSesion=document.getElementById('iCerrarSesion');
		this.lblUser = document.getElementById('lblUserInfo');
		this.lblReloj=document.getElementById('lblReloj');
		this.body = document.getElementsByTagName('body')[0];
		this.modal = document.getElementById('formularioModal');
		this.content = document.getElementById('content');
		this.main = document.getElementById('main');
		if(this.usuario!=null)this.content.style.visibility='visible';
	}

	this.setEvents=function(){
		var self = this;
		this.iCerrarSesion.onclick=function(){self.solicitudServidorAJAX('metodo=destroySession',2);};
		this.iOrganigrama.onclick=function(){self.renderMainMenu('organigrama');};
		this.iNuevaArea.onclick=function(){self.openAddForm('areas');};
		this.iNuevoPuesto.onclick=function(){self.openAddForm('puestos');};
		this.iNuevaPersona.onclick=function(){self.openAddForm('personas');};
		this.iNuevoUsuario.onclick=function(){self.openAddForm('usuarios');};
		this.iAreas.onclick=function(){self.renderMainMenu('areas');};
		this.iPuestos.onclick=function(){self.renderMainMenu('puestos');};
		this.iPersonas.onclick=function(){self.renderMainMenu('personas');};
		this.iUsuarios.onclick=function(){self.renderMainMenu('usuarios');};
	}

	this.openAddForm=function(modulo){
		var Configuracion = {modal:this.modal,tipo:1};
		if(modulo === 'personas') {
			Configuracion.dateActions = new DateActions();
			Configuracion.usuario = this.usuario;
		}
		switch(modulo){
			case 'areas': new FormArea(this.dataHandler,Configuracion,this.organigrama);break;
			case 'puestos':new FormPuesto(this.dataHandler,Configuracion);break;
			case 'personas':new FormPersona(this.dataHandler,Configuracion);break;
			case 'usuarios':new FormUsuario(this.dataHandler,Configuracion);break;
		}
	}

	this.clearMain=function(){
		while(this.main.hasChildNodes()){
			this.main.removeChild(this.main.lastChild);
		}
	}

	this.renderTabla=function(sector,modulo){
		this.addElement(sector,'div','searchBar-'+modulo,'searchBar');
		this.addElement(sector,'table','tabla-'+modulo,'table');
		this.addElement(sector,'div','dataBar-'+modulo,'dataBar');
		var searchBar = document.getElementById('searchBar-'+modulo);
		var tabla = document.getElementById('tabla-'+modulo);
		var dataBar = document.getElementById('dataBar-'+modulo);
		switch(modulo){
			case 'puestos':this.registers.push(new Registro(this.main,
							this.dataHandler,
							new TableModelPuesto(tabla))); break;
			case 'personas':this.registers.push(new Registro(this.main,
							this.dataHandler,
							new TableModelPersona(tabla,this.usuario))); break;
			case 'usuarios':this.registers.push(new Registro(this.main,
							this.dataHandler,				
							new TableModelUsuario(tabla))); break;
		}
		this.addElement(sector,'p','titulo',
			undefined,this.registers[this.registers.length-1].modeloTabla.titulo,{where:'before',from:'searchBar-'+modulo});
	}

	this.renderMainMenu=function(modulo){
		this.clearMain();
		switch(modulo){
			case 'organigrama':
			this.addElement(this.main,'p','titulo',
				undefined,'Organigrama de Mostacho Bancario');
			try{
				this.organigrama = new Organigrama(this,this.main,this.dataHandler);
			}catch(e){
				if(e instanceof ReferenceError){
					console.log(e);
					setTimeout(function(){this.renderMainMenu('organigrama');}.bind(this),100);
				}
				else{
					console.log(e);
				}
			};
			break;
			case 'puestos':
			case 'personas':
			case 'usuarios':this.renderTabla(this.main,modulo);break;
			case 'areas':new MenuAreas(this,this.main,this.dataHandler);break;
		}
	}

	this.addElement = function(contexto,elementType,id,className,elementContent,position){
		var elemento = document.createElement(elementType);
		var elementoReferencia;
		if(id!=undefined)elemento.id=id;
		if(className!=undefined)elemento.className=className;
		if(elementContent!=undefined)elemento.innerHTML=elementContent;
		if(position!=undefined){
			elementoReferencia = document.getElementById(position.from)
			switch(position.where){
				case 'before': contexto.insertBefore(elemento,elementoReferencia);
				case 'after': this.insertAfter(elemento,elementoReferencia);
			}
		}
		else contexto.appendChild(elemento);
	}

	this.addTitle=function(textInside){
		var titulo = document.createElement('p');
		titulo.id='titulo';
		titulo.innerHTML=textInside;
		this.addMain(titulo);
	}

	this.insertAfter=function(elemento,elementoReferencia){
		var contexto = elementoReferencia.parentNode;
		if(elementoReferencia.nextSibling){
			contexto.insertBefore(elemento,elementoReferencia);
		}
		else{
			contexto.appendChild(elemento);
		}
	}

	this.translateProfile=function(profile){
		if(profile == 'J') return "Jefe de RRHH";
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
		if(resultado == 'true')
			this.goIndex();
		else
			alert('No se pudo cerrar la Sesion!');
	}

	this.goIndex=function(){
		location.href = 'index.html';
	}	

	this.solicitudServidorAJAX=function(params,postFuncion){
		var resultado = '';
		var ajax_url  = 'http://localhost/MostachoRRHH/Controller/Controlador.php';
		var ajax_request = new XMLHttpRequest();
		ajax_request.open('POST',ajax_url,true);
		ajax_request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
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

	this.selectedAreaValues=function(){
		var idAreaSeleccionada = this.organigrama.idSeleccionado;
		var descripcionAreaSuperior = this.organigrama.descripcionManagerSeleccionado; 
		new FormArea(this.dataHandler,
					{modal:this.modal,tipo:3,
						idBuscado:idAreaSeleccionada,descripcionAreaSuperior:descripcionAreaSuperior},
						this.organigrama);
	}

	this.startDataHandlerMainOperations=function(){
		//Intervalo de para esperar la carga del archivo script que tiene nuestro DataHandler.
		try{
			this.dataHandler=new DataHandler();
			this.setEvents();
		}catch(e){
			if(e instanceof ReferenceError){
				setTimeout(function(){this.startDataHandlerMainOperations();}.bind(this),100);
			}
			else{
				alert('Error');
			}
		}
	}

	this.solicitudServidorAJAX('metodo=getNowUser',1);

}