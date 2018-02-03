function MenuAreas(parent,sector,dataHandler){
	this.parent = parent;
	this.sector = sector;
	this.dataHandler=dataHandler;
	this.areas = null;
	this.sectorAreas;this.sectorInfoAreas,this.sectorPuestos;this.registroPuestos,this.registroAreas;this.listaPuestos;

	this.startMenu=function(){
		this.renderMenu();
		this.renderRegistroAreas();
		this.renderRegistroPuestos();
	}

	this.renderRegistroAreas=function(){
		parent.addElement(this.sectorAreas,'div','searchBar-areas','searchBar')
		parent.addElement(this.sectorAreas,'table','tabla-areas','table');
		parent.addElement(this.sectorAreas,'div','dataBar-areas','dataBar');
		var searchBar = document.getElementById('searchBar-areas');
		var tabla = document.getElementById('tabla-areas');
		var dataBar = document.getElementById('dataBar-areas');
		this.registroAreas = new Registro(this.sectorAreas,this.dataHandler,new TableModelArea(tabla,this.sectorInfoAreas));
	}

	this.renderRegistroPuestos=function(){
		this.listaPuestos = new ListaPuestos(this.sectorPuestos,this.dataHandler);
		this.registroAreas.modeloTabla.setListaPuestos(this.listaPuestos);
	}



	this.renderMenu = function(){
		this.sectorAreas=document.createElement('DIV');
		this.sectorInfoAreas=document.createElement('DIV');
		this.sectorPuestos=document.createElement('DIV');
		var sectorDerecho = document.createElement('DIV');
		this.sectorAreas.classList.add('lateral-izquierdo');
		sectorDerecho.classList.add('lateral-derecho');
		this.sectorInfoAreas.classList.add('lateral-derecho-superior');
		this.sectorPuestos.classList.add('lateral-derecho-inferior');
		sectorDerecho.appendChild(this.sectorInfoAreas);
		sectorDerecho.appendChild(this.sectorPuestos);
		this.sector.appendChild(this.sectorAreas);
		this.sector.appendChild(sectorDerecho);
		//Sector Areas
		var tituloAreas = document.createElement('p');
		tituloAreas.id='titulo';
		tituloAreas.innerHTML = 'Registro de Areas en el Sistema'
		this.sectorAreas.appendChild(tituloAreas);
		//Sector InfoAreas
		var tituloInfoAreas = document.createElement('p');
		tituloInfoAreas.id='titulo';
		tituloInfoAreas.innerHTML = 'Informacion de Areas del Sistema';
		this.sectorInfoAreas.appendChild(tituloInfoAreas);
		//Sector Puestos
		var tituloPuestos = document.createElement('p');
		tituloPuestos.id='titulo';
		tituloPuestos.innerHTML = 'Todos los puestos';
		this.sectorPuestos.appendChild(tituloPuestos);
	}

	this.startMenu();
}