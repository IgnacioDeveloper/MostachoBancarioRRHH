function Mensaje(parent,contenidoMensaje,tipo){
	this.parent = parent;
	this.contenidoMensaje = contenidoMensaje;
	this.tipo = tipo;
	this.modal = document.getElementById("mensajeModal");
	this.modalBody = this.modal.getElementsByClassName("modal-content")[0];
	this.botones = [];

	this.openMessage=function(){
		this.clearPreviousMessage();
		var ans;
		switch(this.tipo){
			case "confirmacion": this.startConfirmationMessage(); break;
			case "error": this.startErrorMessage();break;
			case "condicion": this.startConditionMessage();break;
		}
		
	}

	this.createMessageContent=function(contenido){
		var mensaje = document.createElement("p");
		mensaje.id = "contenidoMensaje";
		mensaje.innerHTML = contenido;
		this.modal.appendChild(mensaje);
	}


	this.startConfirmationMessage=function(){
		var mensaje = this;
		this.createMessageContent(this.contenidoMensaje);
		var botonOk = document.createElement("button");
		botonOk.id = "botonOk";
		botonOk.innerHTML = "OK";
		this.modal.appendChild(botonOk);
		botonOk.onclick=function(){mensaje.closeMessage();}
	}

	this.startErrorMessage=function(){
		var botonOk = document.createElement("button");
		botonOk.id = "botonOk";
		botonOk.innerHTML = "OK";
		this.modal.appendChild(botonOk);
		botonOk.onclick=function(){mensaje.closeMessage();}
	}

	this.startConditionMessage=function(){
		var botonYes = document.createElement("button");
		botonYes.id = "botonYes";
		botonYes.innerHTML = "Si";
		this.modal.appendChild(botonYes);
		var botonNo = document.createElement("button");
		botonNo.id = "botonNo";
		botonNo.innerHTML = "No";
		this.modal.appendChild(botonNo);
		botonYes.onclick=function(){mensaje.returnResponse(true);mensaje.closeMessage();}
		botonNo.onclick=function(){mensaje.returnResponse(false);mensaje.closeMessage();}
	}

	this.clearPreviousMessage=function(){
		while(this.modalBody.firstChild){
			this.modalBody.removeChild(this.modalBody.firstChild);
		}
	}

	this.closeMessage=function(){
		this.modal.style.display="none";
	}

	this.returnResponse=function(ans){
		this.parent.dialogResponse = ans;
	}

	this.openMessage();

}