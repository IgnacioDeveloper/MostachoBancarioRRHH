function ModalWindowModel(modal){
	//Atributos del Modelo de la Ventana Modal
	this.modal=modal;
	this.modalContent = modal.getElementsByClassName("modal-content")[0];
	this.modalHeader = this.modalContent.getElementsByClassName("modal-header")[0];
	this.modalBody = this.modalContent.getElementsByClassName("modal-body")[0];
	this.modalFooter = this.modalContent.getElementsByClassName("modal-footer")[0];
	this.title = this.modalHeader.getElementsByClassName("titulo-window")[0];
	this.close = this.modalHeader.getElementsByClassName("close")[0];
	this.bodyElements=[];
	this.footerElements=[];
	//End Atributos del Modelo de la Ventana Modal
	this.startModel=function(){
		this.clearWindow();
		this.setCloseButton(this,this.close);
	}

	this.show=function(){
		this.setWindow(this,true);
		this.goTop();
	}

	this.goTop=function(){
		this.modalBody.scrollTop=0;
	}

	this.appendElements=function(elements,modalSector){
		var elementType;
		var elementId;
		var elementInsideText;
		var node;
		var resultado = [];
		for(i=0;i<elements.length;i++){
			elementType = elements[i].tipo;
			elementId = elements[i].id;
			elementInsideText = elements[i].textoInside;
			switch(elementType){
				case "p": 
					node = document.createElement("p");
					node.id = elementId; 
					node.innerHTML = elementInsideText; 
					modalSector.appendChild(node); break;
				case "input_text": 
					node = document.createElement("input"); 
					node.id = elementId; 
					node.type="text"; 
					node.innerHTML = elementInsideText; 
					modalSector.appendChild(node); break;
				case "text_area": node = document.createElement("textArea"); 
					node.rows = "4"; 
					node.cols = "50"; 
					node.resize = "none" ;
					node.id = elementId; 
					node.innerHTML = elementInsideText; 
					modalSector.appendChild(node); break;
				case "select": 
					node = document.createElement("select"); 
					node.id = elementId;  
					modalSector.appendChild(node); break;
				case "button": 
					node = document.createElement("button"); 
					node.id = elementId;  
					node.innerHTML = elementInsideText; 
					modalSector.appendChild(node); break;
				case "error_text": 
					node = document.createElement("p"); 
					node.id = elementId;
					node.className="error";
					node.innerHTML = elementInsideText;  
					modalSector.appendChild(node); break;
				case "date_select":
					node[0] = document.createElement("div");
					node[0].id = elementId;
					node[0].className="dates" ;
					node[1] = document.createElement("select");
					node[1].id = 'select-dia';
					node[2] = document.createElement("select");
					node[2].id = 'select-mes';
					node[3] = document.createElement("select");
					node[3].id = 'select-anio';
					node[0].appendChild(node[1]);
					node[0].appendChild(node[2]);
					node[0].appendChild(node[3]);
					node=node[0];
					modalSector.appendChild(node);break;
				case "chooser":
					node[0]=document.createElement("div");
					node[0].id=elementId;
					node[0].className = "chooser";
					node[1]=document.createElement("p");
					node[1].innerHTML = "Ninguna Area Seleccionada";
					node[2]=document.createElement("button");
					node[2].innerHTML = "Seleccione un Area";
					node[0].appendChild(node[1]);
					node[0].appendChild(node[2]);
					node=node[0];
					modalSector.appendChild(node);break;
				case "file": 
					node[0]=document.createElement("div");
					node[0].id=elementId;
					node[0].className = "file";
					node[1]=document.createElement("p");
					node[1].id = 'texto-archivo';
					node[2]=document.createElement("p");
					node[2].id = "texto-boton";
					node[2].innerHTML = "Agregar Archivo";
					node[3]=document.createElement("input");
					node[3].id="inputFile";
					node[3].type="file";
					node[3].innerHTML="Archivo Subido";
					node[0].appendChild(node[2]);
					node[0].appendChild(node[3]);
					modalSector.appendChild(node[1]);
					modalSector.appendChild(node[0]);break;
			}
			resultado.push(document.getElementById(elementId));
			if(i == elements.length-1 && modalSector==this.modalBody){
				for(j=0;j<3;j++)
					modalSector.appendChild(document.createElement("br"));
			}
		}
		////console.log(modalSector);
		return resultado;
	}

	this.clearWindow=function(){
		//this.title.innerHTML="";
		this.clearSector(this.modalBody);
		this.clearSector(this.modalFooter);
	}

	this.clearSector=function(modalSector){
		while(modalSector.firstChild){
			modalSector.removeChild(modalSector.firstChild);
		}
	}

	this.setCloseButton=function(modalWindowModel,button){
		button.onclick=function(){
			modalWindowModel.modal.style.display="none";
		}
	}

	this.setWindow=function(modalWindowModel,flag){
		if(flag){
			this.modal.style.display = "block";
			this.close.onclick=function(){
				modalWindowModel.setWindow(modalWindowModel,false);};
			}
		else{
			this.modal.style.display = "none";
			}
	}

	this.startModel();
}

function Node(id, tipo, textoInside){
	this.id = id;
	this.tipo = tipo;
	this.textoInside = textoInside;
}

function FormBodyElement(element, errorMessage, valType, must){
	this.element = element;
	this.errorMessage = errorMessage;
	this.valType = valType;
	this.must;
	(must != undefined)? this.must = must : this.must = false; 
}

function Formulario(modal){
	//Elementos del Formulario
	ModalWindowModel.call(this,modal);
	this.button1;
	this.button2;
	this.formBodyElements;
	this.footerNodes = [new Node("button1","button",""),new Node("button2","button","")];
	this.validacion = new Validacion(this);


	this.startForm=function(){
		this.lockInfo();
		this.setButtons();
	}

	this.setButtons=function(){
		this.footerElements = this.appendElements(this.footerNodes,this.modalFooter);
		this.button1=this.footerElements[0];
		this.button2=this.footerElements[1];
	}

	this.startValidacion=function(){
		this.validacion.formBodyElements = this.formBodyElements;
		this.validacion.setVal();
	}

	this.unlockInfo=function(node){
		if(node==undefined){
			for(i=0;i<this.bodyElements.length;i++){
				if(this.bodyElements[i].nodeName!=='P')this.bodyElements[i].disabled=false;
			}
		}
		else if(node instanceof FormBodyElement){
				node.element.disabled=false;
		}
		else{
			node.disabled=false;
		}
	}

	this.lockInfo=function(node){
		if(node==undefined){
			for(i=0;i<this.bodyElements.length;i++){
				if(this.bodyElements[i].nodeName!=='P')this.bodyElements[i].disabled=true;
			}
		}
		else if(node instanceof FormBodyElement){
				node.element.disabled=true;
		}
		else{
			node.disabled=true;
		}
	}

	
	//End elementos del Formulario

	this.startForm();

}

function FormUsuario(dataHandler,conf,registro){
	//Elementos del Formulario
	Formulario.call(this,conf.modal);
	this.dataHandler = dataHandler;
	this.txtNombre;this.txtUsername;this.txtPassword;this.selectUsertype;this.selectEstado;
	this.bodyNodes=[new Node("lblNombre","p","Nombre y Apellido"),
			new Node("txtNombre","input_text",""),
			new Node("errorNombre","error_text",""),
			//
			new Node("lblUsername","p","Nombre de Usuario"),
			new Node("txtUsername","input_text",""),
			new Node("errorUsername","error_text",""),
			//
			new Node("lblPassword","p","Password"),
			new Node("txtPassword","input_text",""),
			new Node("errorPassword","error_text",""),
			//
			new Node("lblUserType","p","Tipo de Usuario"),
			new Node("selectUsertype","select",""),
			new Node("errorUsertype","error_text",""),
			//
			new Node("lblEstado","p","Estado"),
			new Node("comboEstado","select",""),
			new Node("errorEstado","error_text","")];
	this.conf=conf;
	this.registro=registro;
	

	//End Elementos del Formulario

	this.startUserForm=function(){
		//Maquetacion y referenciacion de Elementos del Formulario
		this.bodyElements = this.appendElements(this.bodyNodes,this.modalBody);
		this.txtNombre = new FormBodyElement(this.bodyElements[1],this.bodyElements[2],"textOnly",true);
		this.txtUsername = new FormBodyElement(this.bodyElements[4],this.bodyElements[5],"alphanumericSs",true);
		this.txtPassword = new FormBodyElement(this.bodyElements[7],this.bodyElements[8],"password",true);
		this.selectUsertype = new FormBodyElement(this.bodyElements[10],this.bodyElements[11],undefined,true);
		this.selectEstado = new FormBodyElement(this.bodyElements[13],this.bodyElements[14],undefined,true);
		this.button1 = this.footerElements[0];
		this.button2 = this.footerElements[1];
		this.formBodyElements = [this.txtNombre,this.txtUsername,this.txtPassword,this.selectUsertype, this.selectEstado];
		//End Maquetacion y referenciacion de ELementos del Formulario
		this.prepareSelects();
		this.startValidacion();
		this.setConf();
		this.show();
	}

	this.prepareSelects=function(){
		var optionsUsertype = ["Seleccione una Opcion:","Jefe de Recursos Humanos","Empleado de Recursos Humanos"];
		var optionsEstado = ["Seleccione una Opcion:","Habilitado","Deshabilitado"];
		for(i=0;i<optionsUsertype.length;i++){
			this.selectUsertype.element.options[i] = new Option(optionsUsertype[i],optionsUsertype[i].charAt(0));
		}
		for(i=0;i<optionsEstado.length;i++){
			this.selectEstado.element.options[i] = new Option(optionsEstado[i],optionsEstado[i].charAt(0));
		}
	}

	this.setConf=function(){
		var tipo = this.conf.tipo;
		switch(tipo){
			case 1: this.setConfAlta(); break;
			case 2: this.setConfModificacion(); break;
			case 3: this.setConfConsulta(); break;
		}
	}

	this.setConfAlta=function(){
		var self = this;
		this.title.innerHTML = "Nuevo Usuario";
		this.button1.innerHTML = "Guardar Informacion de Usuario";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.guardarDatos();
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfModificacion=function(flag){
		var self = this;
		if(!flag)this.getData(this.conf.idBuscado);
		this.unlockInfo();
		this.title.innerHTML = "Modificar Informacion de Usuario";
		this.button1.innerHTML = "Guardar cambios";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.modificarDatos(self.conf.idBuscado);
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfConsulta=function(){
		var self = this;
		this.lockInfo();
		this.getData(this.conf.idBuscado);
		this.title.innerHTML = "Consulta de Informacion de Usuario";
		this.button1.innerHTML = "Habilitar Modificaciones";
		this.button2.innerHTML = "Ok";
		this.button1.onclick=function(){
			self.mutarConf();
		}
		this.setCloseButton(this,this.button2);
	}

	this.guardarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var usuario = this.getJSonData();
			var params="metodo=saveUsuario&params="+usuario;
			this.dataHandler.ejecutarOperacionAJAX(this,"saveUsuario",params);
		}
	}

	this.modificarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var usuario = this.getJSonData();
			var params="metodo=modifyUsuario&params="+usuario;
			//console.log(params);
			this.dataHandler.ejecutarOperacionAJAX(this,"modifyUsuario",params);
		}
	}

	this.mutarConf=function(){
		this.setConfModificacion(true);
	}

	this.confirmacion=function(resultado,tipo){
		//console.log(resultado);
		if(resultado==1){
			this.operacionExitosa(tipo);
		}
		else{
			this.operacionFallida();
		}
	}

	this.operacionExitosa = function(tipo){
		this.registro.updateInfo();
		var messageContent;
		switch(tipo){ 
			case 1: messageContent = "Los datos del Usuario han sido guardados con exito";break;
			case 2: messageContent = "Los datos del Usuario han sido modificados con exito";break;
		}
		new Mensaje(this,messageContent,"confirmacion");
		this.closeForm();
	}

	this.operacionFallida=function(){
		new Mensaje(this,"Ha ocurrido un error y la operacion no pudo realizarse.\nIntente realizarla nuevamente en un rato.\nSi el problema persiste contactese con el Area de Informatica e informe de la situacion.","confirmacion");
		this.closeForm();
	}

	this.getJSonData=function(){
		var idUsuario = '';
		var password = '';
		var regExp = /^[*]*$/;//Expresion regular de contraseña secreta sin modificaciones
		if(this.conf.tipo!==1){
			idUsuario = '"idUsuario":'+this.conf.idBuscado+',';
		}
		if(!regExp.test(this.txtPassword.element.value))
			password = '"password":"'+this.txtPassword.element.value+'",';
		return '{'+idUsuario+'"nombre":"'+this.txtNombre.element.value+'","username":"'+this.txtUsername.element.value+'",'+password+'"usertype":"'+this.selectUsertype.element.value.charAt(0)+'","estado":"'+this.selectEstado.element.value.charAt(0)+'"}';
	}

	this.getData=function(idBuscado){
		var params="metodo=getUsuario&params="+idBuscado;
		////console.log(params);
		this.dataHandler.ejecutarOperacionAJAX(this,"getUsuario",params);
	}

	this.setFormData=function(usuario){
		//console.log(usuario);
		usuario = JSON.parse(usuario);
		this.txtNombre.element.value=usuario.nombre; 
		this.txtUsername.element.value=usuario.username; 
		this.txtPassword.element.value='**************';
		this.selectUsertype.element.value=usuario.usertype;
		this.selectEstado.element.value=usuario.estado;
	}

	this.closeForm = function(){
		this.setWindow(this,false);
	}


	this.startUserForm();
}

function FormPersona(dataHandler,conf,registro){
	//Elementos del Formulario
	Formulario.call(this,conf.modal);
	this.dataHandler = dataHandler;
	this.txtLegajo;this.txtCuil;this.txtNombre,this.txtApellido;this.dateFechaNac;this.txtMail;this.txtTelefono;this.txtDomicilio; this.txtLocalidad;this.txtProvincia;this.cv;
	this.bodyNodes=[new Node("lblLegajo","p","Legajo"),
			new Node("txtLegajo","input_text",""),
			new Node("errorLegajo","error_text",""),
			//
			new Node("lblCuil","p","Cuil"),
			new Node("txtCuil","input_text",""),
			new Node("errorCuil","error_text",""),
			//
			new Node("lblNombre","p","Nombre"),
			new Node("txtNombre","input_text",""),
			new Node("errorNombre","error_text",""),
			//
			new Node("lblApellido","p","Apellido"),
			new Node("txtApellido","input_text",""),
			new Node("errorApellido","error_text",""),
			//
			new Node("lblFechaNac","p","Fecha de Nacimiento"),
			new Node("selectsFechaNac","date_select",""),
			new Node("errorFechaNac","error_text",""),
			//
			new Node("lblMail","p","Mail"),
			new Node("txtMail","input_text",""),
			new Node("errorMail","error_text",""),
			//
			new Node("lblTelefono","p","Telefono"),
			new Node("txtTelefono","input_text",""),
			new Node("errorTelefono","error_text",""),
			//
			new Node("lblDomicilio","p","Domicilio"),
			new Node("txtDomicilio","input_text",""),
			new Node("errorDomicilio","error_text",""),
			//
			new Node("lblLocalidad","p","Localidad"),
			new Node("txtLocalidad","input_text",""),
			new Node("errorLocalidad","error_text",""),
			//
			new Node("lblProvincia","p","Provincia"),
			new Node("txtProvincia","input_text",""),
			new Node("errorProvincia","error_text",""),
			//
			new Node("lblUrlCV","p","Curriculum Vitae"),
			new Node("inputFileArea","file",""),
			new Node("errorCV","error_text","")];

	this.conf=conf;
	this.fileName;
	this.registro=registro;
	this.uploadFileOption;
	

	//End Elementos del Formulario

	this.startUserForm=function(){
		//Maquetacion y referenciacion de Elementos del Formulario
		this.bodyElements = this.appendElements(this.bodyNodes,this.modalBody);
		////console.log(this.bodyElements[13]);
		this.txtLegajo = new FormBodyElement(this.bodyElements[1],this.bodyElements[2],"integer",true);
		this.txtCuil = new FormBodyElement(this.bodyElements[4],this.bodyElements[5],"cuil",true);
		this.txtNombre = new FormBodyElement(this.bodyElements[7],this.bodyElements[8],"textOnly",true);
		this.txtApellido = new FormBodyElement(this.bodyElements[10],this.bodyElements[11],"textOnly",true);
		this.dateFechaNac =	new FormBodyElement(this.bodyElements[13],this.bodyElements[14],"date-selects",true);  
		this.txtMail = new FormBodyElement(this.bodyElements[16],this.bodyElements[17],"mail",true);
		this.txtTelefono = new FormBodyElement(this.bodyElements[19],this.bodyElements[20],"phone",true); 
		this.txtDomicilio = new FormBodyElement(this.bodyElements[22],this.bodyElements[23],"alphanumeric",true); 
		this.txtLocalidad = new FormBodyElement(this.bodyElements[25],this.bodyElements[26],"textOnly",true); 
		this.txtProvincia = new FormBodyElement(this.bodyElements[28],this.bodyElements[29],"textOnly",true); 
		this.cv = new FormBodyElement(this.bodyElements[31],this.bodyElements[32],"PDF",true);
		this.button1 = this.footerElements[0];
		this.button2 = this.footerElements[1];
		this.formBodyElements = [this.txtLegajo,this.txtCuil,this.txtNombre,this.txtApellido,this.dateFechaNac,this.txtMail,this.txtTelefono,this.txtDomicilio, this.txtLocalidad,this.txtProvincia,this.cv];
		this.uploadFileOption = this.cv.element.lastChild;
		this.fileLink = this.cv.element.previousSibling;
		//End Maquetacion y referenciacion de ELementos del Formulario
		this.prepareSelects();
		this.startValidacion();
		this.setConf();
		this.show();
		this.eventosFormulario();
	}

	this.setConf=function(){
		var tipo = this.conf.tipo;
		switch(tipo){
			case 1: this.setConfAlta(); break;
			case 2: this.setConfModificacion(); break;
			case 3: this.setConfConsulta(); break;
		}
	}

	this.prepareSelects=function(){
		////console.log(this.dateFechaNac.element);
		this.conf.dateActions.prepareSelects(this.dateFechaNac.element);
	}

	this.setConfAlta=function(){
		var self = this;
		this.title.innerHTML = "Nueva Persona";
		this.button1.innerHTML = "Guardar Informacion de Persona";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.guardarDatos();
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfModificacion=function(flag){
		var self = this;
		if(!flag)this.getData(this.conf.idBuscado);
		this.unlockInfo();
		this.conf.dateActions.unlockDateSelects(this.dateFechaNac.element);
		this.cv.element.firstChild.innerHTML='Cambiar Archivo';
		this.title.innerHTML = "Modificar Informacion de Persona";
		this.button1.innerHTML = "Guardar cambios";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.modificarDatos(self.conf.idBuscado);
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfConsulta=function(){
		var self = this;
		this.lockInfo();
		this.conf.dateActions.lockDateSelects(this.dateFechaNac.element);
		this.cv.element.style.display='none';
		this.getData(this.conf.idBuscado);
		this.title.innerHTML = "Consulta de Informacion de Persona";
		this.button1.innerHTML = "Habilitar Modificaciones";
		this.button2.innerHTML = "Ok";
		this.button1.onclick=function(){
			self.mutarConf();
		}
		this.setCloseButton(this,this.button2);
	}

	this.guardarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var persona = this.getJSonData();
			var params="metodo=savePersona&params="+persona;
			//console.log(params);
			this.dataHandler.ejecutarOperacionAJAX(this,"savePersona",params);
		}
	}

	this.subirCV=function(id){
		if(this.cv.element.lastChild.files.length!==0){
			var file = this.cv.element.lastChild.files[0];
			this.dataHandler.ejecutarOperacionArchivoAJAX(this,'saveFile',id,file);
		}
		else{
			this.confirmacion(1,this.conf.tipo);
		}
	}

	this.modificarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var persona = this.getJSonData();
			var params="metodo=modifyPersona&params="+persona;
			this.dataHandler.ejecutarOperacionAJAX(this,"modifyPersona",params);
		}
	}

	this.mutarConf=function(){
		this.setConfModificacion(true);
	}

	this.confirmacion=function(resultado,tipo){
		if(resultado==1){
			this.operacionExitosa(tipo);
		}
		else{
			this.operacionFallida();
		}
	}

	this.operacionExitosa = function(tipo){
		if(this.registro!==undefined)this.registro.updateInfo();
		var messageContent;
		switch(tipo){ 
			case 1: messageContent = "Los datos de la Persona han sido guardados con exito";break;
			case 2: messageContent = "Los datos de la Persona han sido modificados con exito";break;
		}
		new Mensaje(this,messageContent,"confirmacion");
		this.closeForm();
	}

	this.operacionFallida=function(){
		new Mensaje(this,"Ha ocurrido un error y la operacion no pudo realizarse.\nIntente realizarla nuevamente en un rato.\nSi el problema persiste contactese con el Area de Informatica e informe de la situacion.","confirmacion");
		this.closeForm();
	}

	this.getJSonData=function(){
		var idPersona = '';
		var password = '';
		if(this.conf.tipo!==1){
			idPersona = '"idPersona":'+this.conf.idBuscado+',';
		}
		return '{'+idPersona+'"legajo":"'+this.txtLegajo.element.value+'","cuil":"'+this.txtCuil.element.value+'","nombre":"'+this.txtNombre.element.value+'","apellido":"'+this.txtApellido.element.value+'","fechaNacimiento":"'+this.conf.dateActions.getDateString(this.dateFechaNac.element)+'","mail":"'+this.txtMail.element.value+'","telefono":"'+this.txtTelefono.element.value+'","domicilio":"'+this.txtDomicilio.element.value+'","localidad":"'+this.txtLocalidad.element.value+'","provincia":"'+this.txtProvincia.element.value+'"}';
	}

	this.getData=function(idBuscado){
		var params="metodo=getPersona&params="+idBuscado;
		this.dataHandler.ejecutarOperacionAJAX(this,"getPersona",params);
	}

	this.setFormData=function(persona){
		//console.log(persona);
		var self = this;
		persona = JSON.parse(persona);
		this.txtLegajo.element.value = persona.legajo;
		this.txtCuil.element.value = persona.cuil;
		this.txtNombre.element.value = persona.nombre;
		this.txtApellido.element.value = persona.apellido;
		this.conf.dateActions.setDateSelects(this.dateFechaNac.element,persona.fechaNacimiento);
		this.txtMail.element.value = persona.mail;
		this.txtTelefono.element.value = persona.telefono;
		this.txtDomicilio.element.value = persona.domicilio;
		this.txtLocalidad.element.value = persona.localidad;
		this.txtProvincia.element.value = persona.provincia;
		this.fileName=persona.cv;
		var a = document.createElement('a');
		a.innerHTML='Consultar CV Cargado en el Sistema.';
		a.href="#";
		this.fileLink.appendChild(a);

		this.fileLink.onclick=function(){
			var tab = window.open('../../CurriculumsVitaes/'+self.fileName);
		}
	}

	this.eventosFormulario=function(){

	}

	this.closeForm = function(){
		this.setWindow(this,false);
	}

	this.startUserForm();
}

function FormArea(dataHandler,conf,registro){
	//Elementos del Formulario
	Formulario.call(this,conf.modal);
	this.dataHandler = dataHandler;
	this.txtCodigo;this.txtDescripcion;this.chooserAreaSuperior;
	this.bodyNodes=[new Node("lblCodigo","p","Codigo"),
			new Node("txtCodigo","input_text",""),
			new Node("errorCodigo","error_text",""),
			//
			new Node("lblDescripcion","p","Descripcion"),
			new Node("txtDescripcion","input_text",""),
			new Node("errorDescripcion","error_text",""),
			//
			new Node("lblAreaSuperior","p","Area Superior Inmediata"),
			//new Node("lblWhich","input-text","No se ha seleccionado un area"),
			//new Node("buttonAreaSuperior","button","Seleccione el Area"),
			new Node("chooserAreaSuperior","chooser",""),
			new Node("errorAreaSuperior","error_text","")];

	this.conf=conf;
	this.registro=registro;
	this.areaSuperior;
	

	//End Elementos del Formulario

	this.startUserForm=function(){
		//Maquetacion y referenciacion de Elementos del Formulario
		this.bodyElements = this.appendElements(this.bodyNodes,this.modalBody);
		//this.txtCodigo;this.txtDescripcion;this.txtCantidadPersonas;this.txtAreaSuperior;
		this.txtCodigo = new FormBodyElement(this.bodyElements[1],this.bodyElements[2],"integer",true);
		this.txtDescripcion = new FormBodyElement(this.bodyElements[4],this.bodyElements[5],"alphanumeric",true);
		this.chooserAreaSuperior = new FormBodyElement(this.bodyElements[7],this.bodyElements[8],"chooser",true);
		this.button1 = this.footerElements[0];
		this.button2 = this.footerElements[1];
		this.formBodyElements = [this.txtCodigo,this.txtDescripcion,this.chooserAreaSuperior];
		//End Maquetacion y referenciacion de ELementos del Formulario
		this.prepareChooser();
		this.startValidacion();
		this.setConf();
		this.show();
	}

	this.prepareChooser=function(){
		this.chooserAreaSuperior.element.firstChild.style.fontStyle='italic';
		this.chooserAreaSuperior.element.lastChild.onclick=function(){
			new OrganigramaModal(this);
		}.bind(this);
	}

	this.getAreaValues=function(area){
		this.areaSuperior=area;
		this.chooserAreaSuperior.element.firstChild.innerHTML=area.descripcion;
		this.chooserAreaSuperior.element.firstChild.style.color='blue';
	}

	this.setConf=function(){
		var tipo = this.conf.tipo;
		switch(tipo){
			case 1: this.setConfAlta(); break;
			case 2: this.setConfModificacion(); break;
			case 3: this.setConfConsulta(); break;
		}
	}

	this.setConfAlta=function(){
		var self = this;
		this.title.innerHTML = "Nueva Area";
		this.button1.innerHTML = "Guardar Informacion de Area";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.guardarDatos();
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfModificacion=function(flag){
		var self = this;
		this.chooserAreaSuperior.element.lastChild.disabled=false;
		if(!flag)this.getData(this.conf.idBuscado);
		this.unlockInfo();
		this.title.innerHTML = "Modificar Informacion de Area";
		this.button1.innerHTML = "Guardar cambios";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.modificarDatos(self.conf.idBuscado);
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfConsulta=function(){
		var self = this;
		this.lockInfo();
		this.chooserAreaSuperior.element.lastChild.disabled=true;
		this.getData(this.conf.idBuscado);
		this.title.innerHTML = "Consulta de Informacion de Area";
		this.button1.innerHTML = "Habilitar Modificaciones";
		this.button2.innerHTML = "Ok";
		this.button1.onclick=function(){
			self.mutarConf();
		}
		this.setCloseButton(this,this.button2);
	}

	this.guardarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var area = this.getJSonData();
			var params="metodo=saveArea&params="+area;
			console.log(params);
			this.dataHandler.ejecutarOperacionAJAX(this,"saveArea",params);
		}
	}

	this.modificarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var area= this.getJSonData();
			var params="metodo=modifyArea&params="+area;
			console.log(params);
			this.dataHandler.ejecutarOperacionAJAX(this,"modifyArea",params);
		}
	}

	this.mutarConf=function(){
		this.setConfModificacion(true);
	}

	this.confirmacion=function(resultado,tipo){
		console.log(resultado);
		if(resultado==1){
			this.operacionExitosa(tipo);
		}
		else{
			this.operacionFallida();
		}
	}

	this.operacionExitosa = function(tipo){
		if(this.registro!==undefined)this.registro.updateInfo();
		var messageContent;
		switch(tipo){ 
			case 1: messageContent = "Los datos del Area han sido guardados con exito";break;
			case 2: messageContent = "Los datos del Area han sido modificados con exito";break;
		}
		new Mensaje(this,messageContent,"confirmacion");
		this.closeForm();
	}

	this.operacionFallida=function(){
		new Mensaje(this,"Ha ocurrido un error y la operacion no pudo realizarse.\nIntente realizarla nuevamente en un rato.\nSi el problema persiste contactese con el Area de Informatica e informe de la situacion.","confirmacion");
		this.closeForm();
	}


	this.getJSonData=function(){
		//this.txtCodigo;this.txtDescripcion;this.txtCantidadPersonas;this.txtAreaSuperior;
		var idArea = '';	
		if(this.conf.tipo!==1){
			idArea = '"idArea":'+this.conf.idBuscado+',';
		}
		return '{'+idArea+'"codigo":"'+this.txtCodigo.element.value+'","descripcion":"'+this.txtDescripcion.element.value+'","idAreaSuperior":"'+this.areaSuperior.id+'"}';
	}

	this.getData=function(idBuscado){
		var params="metodo=getArea&params="+idBuscado;
		this.dataHandler.ejecutarOperacionAJAX(this,"getArea",params);
	}

	this.setFormData=function(area){
		console.log(area);
		area = JSON.parse(area);
		this.txtCodigo.element.value = area.codigo;
		this.txtDescripcion.element.value = area.descripcion;
		this.getAreaValues({id:area.idAreaSuperior,descripcion:this.conf.descripcionAreaSuperior});
	}

	this.closeForm = function(){
		this.setWindow(this,false);
	}


	this.startUserForm();
}

function FormPuesto(dataHandler,conf,registro){
	//Elementos del Formulario
	Formulario.call(this,conf.modal);
	this.dataHandler = dataHandler;
	this.txtCodigo;this.txtNombre; this.txtDescripcion; this.txtObjetivo; this.txtFunciones; this.txtCompetencias; this.txtConocimientos; this.chooserAreaSuperior;
	this.bodyNodes=[new Node("lblCodigo","p","Codigo"),
			new Node("txtCodigo","input_text",""),
			new Node("errorCodigo","error_text",""),
			//
			new Node("lblNombre","p","Nombre del Puesto"),
			new Node("txtNombre","input_text",""),
			new Node("errorNombre","error_text",""),
			//
			new Node("lblAreaSuperior","p","Area del Puesto"),
			new Node("chooserAreaSuperior","chooser",""),
			new Node("errorAreaSuperior","error_text",""),
			//
			new Node("lblDescripcion","p","Descripcion"),
			new Node("txtDescripcion","text_area",""),
			new Node("errorDescripcion","error_text",""),
			//
			new Node("lblObjetivo","p","Objetivo General"),
			new Node("txtObjetivoGeneral","text_area",""),
			new Node("errorObjetivo","error_text",""),
			//
			new Node("lblFunciones","p","Funciones Especificas"),
			new Node("txtFunciones","text_area",""),
			new Node("errorFunciones","error_text",""),
			//
			new Node("lblCompetencias","p","Conpetencias Requeridas"),
			new Node("txtCompetencias","text_area",""),
			new Node("errorCompetencias","error_text",""),
			//
			new Node("lblConocimientos","p","Conocimientos Requeridos"),
			new Node("txtConocimientos","text_area",""),
			new Node("errorConocimientos","error_text","")]
			//
			

	this.conf=conf;
	this.registro=registro;
	this.areaSeleccionada;
	

	//End Elementos del Formulario

	this.startUserForm=function(){
		//Maquetacion y referenciacion de Elementos del Formulario
		this.bodyElements = this.appendElements(this.bodyNodes,this.modalBody);
		this.txtCodigo = new FormBodyElement(this.bodyElements[1],this.bodyElements[2],"integer",true);
		this.txtNombre = new FormBodyElement(this.bodyElements[4],this.bodyElements[5],"textOnly",true);
		this.chooserAreaSuperior = new FormBodyElement(this.bodyElements[7],this.bodyElements[8],"chooser",true);
		this.txtDescripcion = new FormBodyElement(this.bodyElements[10],this.bodyElements[11],undefined,true);
		this.txtObjetivo = new FormBodyElement(this.bodyElements[13],this.bodyElements[14],undefined,true);
		this.txtFunciones = new FormBodyElement(this.bodyElements[16],this.bodyElements[17],undefined,true);
		this.txtCompetencias = new FormBodyElement(this.bodyElements[19],this.bodyElements[20],undefined,true);
		this.txtConocimientos = new FormBodyElement(this.bodyElements[21],this.bodyElements[22],undefined,true);
		
		this.button1 = this.footerElements[0];
		this.button2 = this.footerElements[1];
		this.formBodyElements = [this.txtCodigo,this.txtNombre, this.txtDescripcion, this.txtObjetivo, this.txtFunciones, this.txtCompetencias, this.txtConocimientos, this.chooserAreaSuperior];
		//End Maquetacion y referenciacion de ELementos del Formulario
		this.prepareChooser();
		this.startValidacion();
		this.setConf();
		this.show();
	}

	this.prepareChooser=function(){
		this.chooserAreaSuperior.element.firstChild.style.fontStyle='italic';
		this.chooserAreaSuperior.element.lastChild.onclick=function(){
			new OrganigramaModal(this);
		}.bind(this);
	}

	this.getAreaValues=function(area){
		this.areaSeleccionada=area;
		this.chooserAreaSuperior.element.firstChild.innerHTML=area.descripcion;
		this.chooserAreaSuperior.element.firstChild.style.color='blue';
	}

	this.setConf=function(){
		var tipo = this.conf.tipo;
		switch(tipo){
			case 1: this.setConfAlta(); break;
			case 2: this.setConfModificacion(); break;
			case 3: this.setConfConsulta(); break;
		}
	}

	this.setConfAlta=function(){
		var self = this;
		this.title.innerHTML = "Nuevo Puesto";
		this.button1.innerHTML = "Guardar Informacion de Puesto";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.guardarDatos();
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfModificacion=function(flag){
		var self = this;
		if(!flag)this.getData(this.conf.idBuscado);
		this.unlockInfo();
		this.title.innerHTML = "Modificar Informacion de Puesto";
		this.button1.innerHTML = "Guardar cambios";
		this.button2.innerHTML = "Cancelar";
		this.button1.onclick=function(){
			self.modificarDatos(self.conf.idBuscado);
		}
		this.setCloseButton(this,this.button2);
	}

	this.setConfConsulta=function(){
		var self = this;
		this.lockInfo();
		this.getData(this.conf.idBuscado);
		this.title.innerHTML = "Consulta de Informacion de Puesto";
		this.button1.innerHTML = "Habilitar Modificaciones";
		this.button2.innerHTML = "Ok";
		this.button1.onclick=function(){
			self.mutarConf();
		}
		this.setCloseButton(this,this.button2);
	}

	this.guardarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var puesto = this.getJSonData();
			var params="metodo=savePuesto&params="+puesto;
			console.log(params);
			this.dataHandler.ejecutarOperacionAJAX(this,"savePuesto",params);
		}
	}

	this.modificarDatos=function(){
		var val = this.validacion.fullCheck();
		if(val){
			var persona = this.getJSonData();
			var params="metodo=modifyPuesto&params="+area;
			//console.log(params);
			this.dataHandler.ejecutarOperacionAJAX(this,"modifyPuesto",params);
		}
	}

	this.mutarConf=function(){
		this.setConfModificacion(true);
	}

	this.confirmacion=function(resultado,tipo){
		//console.log(resultado);
		if(resultado==1){
			this.operacionExitosa(tipo);
		}
		else{
			this.operacionFallida();
		}
	}

	this.operacionExitosa = function(tipo){
		if(this.registro!==undefined)this.registro.updateInfo();
		var messageContent;
		switch(tipo){ 
			case 1: messageContent = "Los datos del Puesto han sido guardados con exito";break;
			case 2: messageContent = "Los datos del Puesto han sido modificados con exito";break;
		}
		new Mensaje(this,messageContent,"confirmacion");
		this.closeForm();
	}

	this.operacionFallida=function(){
		new Mensaje(this,"Ha ocurrido un error y la operacion no pudo realizarse.\nIntente realizarla nuevamente en un rato.\nSi el problema persiste contactese con el Area de Informatica e informe de la situacion.","confirmacion");
		this.closeForm();
	}


	this.getJSonData=function(){
		//this.txtCodigo;this.txtDescripcion;this.txtCantidadPersonas;this.txtAreaSuperior;
		var idPuesto = '';	
		if(this.conf.tipo!==1){
			idPuesto = '"idPuesto":'+this.conf.idBuscado+',';
		}
		return '{'+idPuesto+'"codigo":"'+this.txtCodigo.element.value+'","nombre":"'+this.txtNombre.element.value+'","idArea":"'+this.areaSeleccionada.id+'","descripcion":"'+this.txtDescripcion.element.value+'","objetivoGeneral":"'+this.txtObjetivo.element.value+'","funcionesEspecificas":"'+this.txtFunciones.element.value+'","competenciasRequeridas":"'+this.txtCompetencias.element.value+'","conocimientosRequeridos":"'+this.txtConocimientos.element.value+'"}';
	}

	this.getData=function(idBuscado){
		var params="metodo=getPuesto&params="+idBuscado;
		this.dataHandler.ejecutarOperacionAJAX(this,"getPuesto",params);
	}

	this.setFormData=function(puesto){
		puesto = JSON.parse(puesto);
		this.txtCodigo.element.value = puesto.codigo,
		this.txtNombre.element.value = puesto.nombre, 
		this.txtDescripcion.element.value = puesto.descripcion, 
		this.txtObjetivo.element.value = puesto.objetivoGeneral, 
		this.txtFunciones.element.value = puesto.funcionesEspecificas, 
		this.txtCompetencias.element.value = puesto.competenciasRequeridas, 
		this.txtConocimientos.element.value = puesto.conocimientosRequeridos, 
		this.areaSeleccionada = puesto.idArea;
	}

	this.closeForm = function(){
		this.setWindow(this,false);
	}


	this.startUserForm();
}
