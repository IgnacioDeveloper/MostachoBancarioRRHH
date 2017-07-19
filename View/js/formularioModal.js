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
				case "p": node = document.createElement("p"); node.id = elementId; node.innerHTML = elementInsideText; modalSector.appendChild(node); break;
				case "input_text": node = document.createElement("input"); node.id = elementId; node.type="text"; node.innerHTML = elementInsideText; modalSector.appendChild(node); break;
				case "textarea": node = document.createElement("textArea"); node.rows = "4"; node.cols = "50"; node.resize = "none" ;node.id = elementId; node.innerHTML = elementInsideText; modalSector.appendChild(node); break;
				case "select": node = document.createElement("select"); node.id = elementId;  modalSector.appendChild(node); break;
				case "button": node = document.createElement("button"); node.id = elementId;  node.innerHTML = elementInsideText; modalSector.appendChild(node); break;
				case "error_text": node = document.createElement("p"); node.id = elementId;node.className="error";node.innerHTML = elementInsideText;  modalSector.appendChild(node); break;
			}
			resultado.push(document.getElementById(elementId));
			if(i == elements.length-1 && modalSector==this.modalBody){
				for(j=0;j<3;j++)
					modalSector.appendChild(document.createElement("br"));
			}
		}
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
				console.log(this.bodyElements[i]);
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

function FormUsuario(dataHandler,conf){
	//Elementos del Formulario
	Formulario.call(this,conf.modal);
	this.dataHandler = dataHandler;
	this.dialogResponse;
	this.txtNombre;this.txtUsername;this.txtPassword;this.selectUsertype;this.selectEstado;
	this.bodyNodes=[new Node("lblNombre","p","Nombre y Apellido"),
			new Node("txtNombre","input_text",""),
			new Node("errorNombre","error_text",""),
			new Node("lblUsername","p","Nombre de Usuario"),
			new Node("txtUsername","input_text",""),
			new Node("errorUsername","error_text",""),
			new Node("lblPassword","p","Password"),
			new Node("txtPassword","input_text",""),
			new Node("errorPassword","error_text",""),
			new Node("lblUserType","p","Tipo de Usuario"),
			new Node("selectUsertype","select",""),
			new Node("errorUsertype","error_text",""),
			new Node("lblEstado","p","Estado"),
			new Node("comboEstado","select",""),
			new Node("errorEstado","error_text","")];
	this.conf=conf;
	

	//End Elementos del Formulario

	this.startUserForm=function(){
		//Maquetacion y referenciacion de Elementos del Formulario
		console.log(conf);
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
		this.button1.innerHTML = "Guardar Usuario";
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
			self.modificarDatos(this.conf.idBuscado);
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
			this.dataHandler.ejecutarOperacionAJAX(this,"modifyUsuario",params);
		}
	}

	this.mutarConf=function(){
		this.setConfModificacion(true);
	}

	this.confirmacion=function(resultado,tipo){
		if(resultado){
			this.operacionExitosa(tipo);
		}
		else{
			this.operacionFallida();
		}
	}

	this.operacionExitosa = function(tipo){
		var messageContent;
		switch(tipo){ 
			case 1: messageContent = "Los datos del Usuario han sido guardados con exito";break;
			case 2: messageContent = "Los datos del Usuario han sido modificados con exito";break;
		}
		new Mensaje(this,messageContent,"confirmacion")
		this.closeForm();
	}

	this.operacionFallida=function(){
		new Mensaje(this,"Ha ocurrido un error y la operacion no pudo realizarse.\nIntente realizarla nuevamente en un rato.\nSi el problema persiste contactese con el Area de Informatica e informe de la situacion.",confirmacion);
	}

	this.getJSonData=function(){
		var password = '';
		var regExp = /^[*]*$/;//Expresion regular de contraseña secreta sin modificaciones
		if(!regExp.test(this.txtPassword.element.value))
			password = '"password":"'+this.txtPassword.element.value+'",';
		return '{"nombre":"'+this.txtNombre.element.value+'","username":"'+this.txtUsername.element.value+'",'+password+'""usertype":"'+this.selectUsertype.element.value.charAt(0)+'","estado":"'+this.selectEstado.element.value.charAt(0)+'"}';
	}

	this.getData=function(idBuscado){
		var params="metodo=getUsuario&params="+idBuscado;
		this.dataHandler.ejecutarOperacionAJAX(this,"getUsuario",params);
	}

	this.setFormData=function(usuario){
		usuario = JSON.parse(usuario);
		this.txtNombre.element.value=usuario.nombre; 
		this.txtUsername.element.value=usuario.username; 
		this.txtPassword.element.value='***';
		this.selectUsertype.element.value=usuario.usertype;
		this.selectEstado.element.value=usuario.estado;
	}

	this.closeForm = function(){
		this.setWindow(this,false);
	}


	this.startUserForm();
}

