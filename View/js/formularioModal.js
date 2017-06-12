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
	//ModalWindowModel.call(this,modal);

	this.prototype = new ModalWindowModel(modal);
	this.MWM = this.prototype;
	this.title = this.MWM.title;
	this.button1;
	this.button2;
	this.formBodyElements;
	this.footerNodes = [new Node("button1","button",""),new Node("button2","button","")];
	this.validacion = new Validacion(this);


	this.startForm=function(){
		//this.MWM.modal.scroll(0,0);
		this.setButtons();
	}

	this.setButtons=function(){
		this.MWM.footerElements = this.MWM.appendElements(this.footerNodes,this.MWM.modalFooter);
		this.button1=this.MWM.footerElements[0];
		this.button2=this.MWM.footerElements[1];
	}

	this.startValidacion=function(){
		this.validacion.formBodyElements = this.formBodyElements;
		this.validacion.setVal();
	}

	
	//End elementos del Formulario

	this.startForm();

}

function FormUsuario(conf){
	//Elementos del Formulario
	//Formulario.call(this,conf.modal);
	this.prototype = new Formulario(conf.modal);
	this.Form = this.prototype;
	this.FMWM = this.Form.MWM;
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
		this.FMWM.bodyElements = this.FMWM.appendElements(this.bodyNodes,this.FMWM.modalBody);
		this.txtNombre = new FormBodyElement(this.FMWM.bodyElements[1],this.FMWM.bodyElements[2],"textOnly",true);
		this.txtUsername = new FormBodyElement(this.FMWM.bodyElements[4],this.FMWM.bodyElements[5],"alphanumericSs",true);
		this.txtPassword = new FormBodyElement(this.FMWM.bodyElements[7],this.FMWM.bodyElements[8],"password",true);
		this.selectUsertype = new FormBodyElement(this.FMWM.bodyElements[10],this.FMWM.bodyElements[11],undefined,true);
		this.selectEstado = new FormBodyElement(this.FMWM.bodyElements[13],this.FMWM.bodyElements[14],undefined,true);
		this.Form.button1 = this.FMWM.footerElements[0];
		this.Form.button2 = this.FMWM.footerElements[1];
		this.Form.formBodyElements = [this.txtNombre,this.txtUsername,this.txtPassword,this.selectUsertype, this.selectEstado];
		//End Maquetacion y referenciacion de ELementos del Formulario
		this.prepareSelects();
		this.Form.startValidacion();
		this.setConf();
		this.FMWM.show();
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
		var form = this;
		this.Form.title.innerHTML = "Nuevo Usuario";
		this.Form.button1.innerHTML = "Guardar Usuario";
		this.Form.button2.innerHTML = "Cancelar";
		this.Form.button1.onclick=function(){
			form.guardarDatos();
		}
		this.FMWM.setCloseButton(this.FMWM,this.Form.button2);
	}

	this.setConfModificacion=function(){
		this.Form.title.innerHTML = "Modificar Informacion de Usuario";
		this.Form.button1.innerHTML = "Modificar Usuario";
		this.Form.button2.innerHTML = "Cancelar";
		//this.validacion = new Validacion(this);
		this.button1.onclick=function(){
			this.modificarDatos();
		}
	}

	this.setConfConsulta=function(){
		this.title.innerHTML = "Consulta de Informacion de Usuario";
		//this.validacion = undefined;
		this.button1.onclick=function(){
			this.mutarConf();
		}
	}

	this.guardarDatos=function(){
		var val = this.Form.validacion.fullCheck()
		if(val){
			var usuario = this.getJSonData();
			var params="metodo=saveUsuario&params="+usuario;
			new Mensaje(this,"Los datos del Usuario han sido guardados con exito","confirmacion");
		}
	}

	this.modificarDatos=function(){
		var usuario = this.getJSonData();
		var params="metodo=modifyUsuario&params="+usuario;
	}

	this.mutarConf=function(){

	}

	this.operacionExitosa = function(exito,tipo){
		var mensaje;
		switch(tipo){
			case 1: 
			case 2:
		}
	}

	this.getJSonData=function(){
		return '{nombre:"'+this.txtNombre.element.value+'",username:"'+this.txtUsername.element.value+'",password:"'+this.txtPassword.element.value+'",usertype:"'+this.selectUsertype.element.value.charAt(0)+'"estado:"'+this.selectEstado.element.value.charAt(0)+'"}';
	}


	this.startUserForm();
}

