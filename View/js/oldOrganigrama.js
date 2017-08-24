function Organigrama(sector,dataHandler){
	this.sector=sector;
	this.dataHandler=dataHandler;
	this.organigramaContainer=null;
	this.entregramas = [];

	this.startOrganigrama=function(){
		this.renderOrganigramaContainer();
		this.requestAreas();	
	}

	this.renderOrganigramaContainer=function(){
		this.organigramaContainer = document.createElement('div');
		this.organigramaContainer.id='organigrama';
		this.organigramaContainer.className='organigrama';
		this.sector.appendChild(this.organigramaContainer);
	}

	this.requestAreas=function(){
		var params = 'metodo=getAreas&params={"condicion":"1"}'
		this.dataHandler.ejecutarOperacionAJAX(this,'getAreas',params);
	}

	this.updateAreas=function(areas){
		console.log(areas);
		this.renderOrganigrama(JSON.parse(areas));
	}

	this.renderOrganigrama=function(areas){
		var self = this;
		console.log(areas);
		var ubicar = function(area,superior){
			superior = (superior)?superior:false;
			console.log(superior);
			var ul,li,a;
			ul = document.createElement('ul');
			li = document.createElement('li');
			a = document.createElement('a');
			a.href="#";
			a.setAttribute('data-value',area.idArea); 
			a.innerHTML = area.descripcion;
			if(!superior){
				self.organigramaContainer.appendChild(ul);
				li.appendChild(a);
				ul.appendChild(li);
				self.entregramas.push(li);
				//console.log(self.entregramas[0]);
			}else{
				var i = self.entregramas.length;
				var parentEntregrama=null;
				//Buscamos el entregrama padre de nuestro entregrama
				do{
					if(i===0)break;
					if(self.entregramas[i-1].firstChild.getAttribute('data-value')===area.Area_idAreaSuperior){
						parentEntregrama=self.entregramas[i-1];
						break;
					}
					i--;
				}while(true);
				if(parentEntregrama===null)return;
				var nuevoEntregrama = li;
				var nivel;
				if(parentEntregrama.querySelector('ul')===null)
					parentEntregrama.appendChild(ul);
				nuevoEntregrama.appendChild(a);
				parentEntregrama.querySelector('ul').appendChild(nuevoEntregrama);
			 	self.entregramas.push(nuevoEntregrama);
			}
		}
		ubicar(areas[0]);
		for(i=1;i<areas.length;i++){
			ubicar(areas[i],true);
		}
		for(i in this.entregramas)
		console.log(this.entregramas[i]);
	}

	this.startOrganigrama();
}
