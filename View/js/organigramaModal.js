function OrganigramaModal(parent){
	this.parent = parent;
	this.modal = document.getElementById("mensajeModal");
	this.modalBody = this.modal.getElementsByClassName("modal-content")[0];
	this.entregramas = [];
	this.organigrama = null;
	this.lblArea=null;

	this.show=function(){
		this.modal.style.display = "block";
	}

	this.startOrganigramaModal=function(){
		this.clearModalContent();
		this.prepareModal();
		this.show();
	}

	this.clearModalContent=function(){
		while(this.modalBody.firstChild){
			this.modalBody.removeChild(this.modalBody.firstChild);
		}
	}

	this.closeModal=function(){
		this.modal.style.display="none";
	}

	this.prepareModal=function(){
		var self = this;
		var tituloContent = (this.parent instanceof FormArea)?"Seleccione el Area Superior":
			"Seleccione el Area en que esta comprendido el puesto";
		var titulo = document.createElement('p');
		titulo.innerHTML = tituloContent;
		this.modalBody.appendChild(titulo);
		this.drawModalContent();
		this.lblArea = document.createElement('p');
		this.modalBody.appendChild(this.lblArea);
		var boton1 = document.createElement("button");
		boton1.id = "boton1";
		boton1.innerHTML = "Ok";
		this.modalBody.appendChild(boton1);
		var boton2 = document.createElement("button");
		boton2.id = "boton2";
		boton2.innerHTML = "Cancelar";
		this.modalBody.appendChild(boton2);
		boton1.onclick=function(){self.returnResponse(true);self.closeModal();}
		boton2.onclick=function(){self.returnResponse(false);self.closeModal();}
	}

	this.drawModalContent=function(){
		this.organigrama = new Organigrama(this,this.modalBody,this.parent.dataHandler);
    }

    this.selectedAreaValues=function(){
    	this.lblArea.innerHTML = 'Area Seleccionada: '+this.organigrama.descripcionSeleccionado;
    	this.lblArea.style.color = 'blue';
    }

    this.returnResponse=function(response){
    	if(response){
    		//ENVIAR EL VALOR SELECCIONADO A FORMULARIOS AREA O PUESTO
    		if(this.organigrama.idSeleccionado!==null){
    			this.parent.getAreaValues({id:this.organigrama.idSeleccionado,descripcion:this.organigrama.descripcionSeleccionado});
    		}
    	}
    }

    this.startOrganigramaModal();
}