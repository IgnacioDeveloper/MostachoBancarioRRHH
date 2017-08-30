function ChooserPuesto(parent){
	this.parent = parent;
	this.dataHandler = this.parent.dataHandler;
	this.modal = document.getElementById("mensajeModal");
	this.modalBody = this.modal.getElementsByClassName("modal-content")[0];
	this.areas;
	this.puestos;
	this.selectorArea;
	this.selectorPuesto;
	this.idSeleccionado = null;
	this.descripcionSeleccionada = null;
	this.boton1;
	this.boton2;

	this.startLista=function(){
		this.renderModal();
		this.getAreas();
		this.getPuestos();
		this.eventos();
		this.show();
	}

	this.getPuestos=function(){
		var params = 'metodo=getPuestos&params={"condicion":"1"}';
		var metodo = 'getPuestos';
		console.log(this.dataHandler);
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	}

	this.getAreas=function(){
		var params = 'metodo=getAreas&params={"condicion":"1"}';
		var metodo = 'getAreas';
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	}

	this.updatePuestos=function(puestos){
		puestos = JSON.parse(puestos);
		this.puestos = puestos;
		this.prepareSelectPuestos();
	}

	this.clearModal=function(){
		while(this.modalBody.hasChildNodes()){
			this.modalBody.removeChild(this.modalBody.lastChild);
		}
	}

	this.updateAreas=function(areas){
		areas = JSON.parse(areas);
		this.areas = areas;
		this.prepareSelectAreas();
	}

	this.setSelectPuestos=function(idArea){
		this.clearSelectPuestos();
		this.prepareSelectPuestos();
		if(idArea!=='0'){
			this.filter(idArea);
		}
	};

	this.prepareSelectAreas=function(){
		this.selectAreas.options[0] = new Option('Todas las areas','0');
		for(i=1;i<=this.areas.length;i++){
			this.selectAreas.options[i] = new Option(this.areas[i-1].descripcion,this.areas[i-1].idArea);
		}
	}

	this.prepareSelectPuestos=function(){
		this.selectPuestos.options[0]=new Option('No Asignado','0');
		for(i=1;i<=this.puestos.length;i++){
			this.selectPuestos.options[i] = new Option(this.puestos[i-1].nombrePuesto,this.puestos[i-1].idPuesto);
			this.selectPuestos.options[i].setAttribute('id-area',this.puestos[i-1].Area_idArea);
		}
	}

	this.clearSelectPuestos=function(){
		while(this.selectPuestos.hasChildNodes()){
			this.selectPuestos.removeChild(this.selectPuestos.lastChild);
		}
	}

	this.filter=function(idArea){
		for(i=this.selectPuestos.options.length-1;i>0;i--){
			console.log(this.selectPuestos.options[i].getAttribute('id-area'))
			if(this.selectPuestos.options[i].getAttribute('id-area') !== idArea){
				this.selectPuestos.remove(i);
			}
		}
	}

	this.show=function(){
		this.modal.style.display = "block";
	}

	this.closeModal=function(){
		this.modal.style.display="none";
	}	

	this.renderModal = function(){
		this.clearModal();
		lblArea = document.createElement('p');
		lblArea.innerHTML = 'Filtrar por Area';
		this.modalBody.appendChild(lblArea);
		this.selectAreas = document.createElement('select')
		this.modalBody.appendChild(this.selectAreas);
		lblPuesto = document.createElement('p');
		lblPuesto.innerHTML = 'Seleccionar Puesto';
		this.modalBody.appendChild(lblPuesto);
		this.selectPuestos = document.createElement('select')
		this.modalBody.appendChild(this.selectPuestos);
		this.modalBody.appendChild(document.createElement('br'));
		this.modalBody.appendChild(document.createElement('br'));
		this.modalBody.appendChild(document.createElement('br'));
		this.boton1 = document.createElement('button');
		this.boton1.innerHTML = 'Ok';
		this.modalBody.appendChild(this.boton1);
		this.boton2 = document.createElement('button');
		this.boton2.innerHTML = 'Cancelar';
		this.modalBody.appendChild(this.boton2);
	}

	this.eventos=function(){
		var self = this;
		this.boton1.onclick=function(){
			self.idSeleccionado = self.selectPuestos.value;
			if(self.idSeleccionado !== '0'){
				self.descripcionSeleccionada = self.selectPuestos.options[self.selectPuestos.selectedIndex].innerHTML;
				self.parent.setPuestoSeleccionado({idPuesto:self.idSeleccionado,descripcion:self.descripcionSeleccionada});
			}
			self.closeModal();
		}
		this.boton2.onclick=function(){
			self.closeModal();
		}
		this.selectAreas.onchange=function(){
			self.setSelectPuestos(this.value);
		}
	}

	this.startLista();
}