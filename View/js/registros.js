function TableModel(tableElement,headers,widths){
	this.titulo = 'there';
	this.headers = headers;
	this.tableElement = tableElement;
	this.widths=widths;
	this.columns=[];
	this.rows=[];
	this.selectedRow=null;

	this.startTableModel = function(){
		this.renderTableModel();
		this.eventos();
	}

	this.renderTableModel = function(){
		this.clearTableModel();
		this.addColumns();
		this.setColumnsWidth(widths);
	}

	this.updateRows = function(rows,isId){
		this.removeAllDataRows();
		if(isId){	
			for(i=0;i<rows.length;i++){
				this.appendRow(rows[i].splice(1));
				this.rows[i].setAttribute('data-value',rows[i][0]);
			}	
		}
		else{
			for(i=0;i<rows.length;i++){
				this.appendRow(rows[i]);
			}	
		}
	}

	this.clearTableModel = function(){
		this.columns=[];
		this.rows=[];
		while(this.tableElement.hasChildNodes()){
			this.tableElement.removeChild(this.tableElement.lastChild);
		}
	}

	this.removeAllDataRows = function(){
		for(i=this.rows.length;i>0;i--){
			this.tableElement.deleteRow(i);
		}
		this.rows=[];
	}

	this.addColumns=function(){
		var rowNode = this.tableElement.insertRow(0);
		rowNode.className='headers';
		var cellNode;
		for(i=0;i<headers.length;i++){
			cellNode = rowNode.insertCell(i);
			cellNode.className = 'header-cell';
			cellNode.innerHTML=headers[i];
			this.columns.push(cellNode);
		}
	}

	this.appendRow=function(row){
		//alert(row);
		var rowNode = this.tableElement.insertRow(this.tableElement.length);
		var cellNode,start;
		for(j=0;j<row.length;j++){
			cellNode = rowNode.insertCell(j);
			cellNode.innerHTML=row[j];
			//rowNode.append(cellNode);
		}
		this.rows.push(rowNode);
		//this.tableElement.appendChild(rowNode);
	}

	this.getSelectedRow=function(e){
		this.selectedRow = e.target.parentNode;
		return this.selectedRow;
	}

	//En los siguientes metodos el parametro row en la funcion hace referencia al objeto del DOM y n al numero de fila. El parametro column sigue siendo el numero de la columna.

	this.getValueAt=function(row,column){
		return row.getElementsByTagName('td')[column].innerHTML;
	}

	this.setValueAt=function(value,row,column){
		row.getElementsByTagName('td')[column].innerHTML = value;
	}

	this.setSelectedRow=function(row){
		if(this.selectedRow!=null)this.clearSelectedRow();
		this.selectedRow = row;
		row.classList.add('selected');
	}

	this.clearSelectedRow=function(){
		this.selectedRow.classList.remove('selected');
		this.selectedRow = null
	}

	this.getColumnCount=function(){
		return this.headers.length;
	}

	this.getRowCount=function(){
		return this.rows.length;
	}

	this.getVisibleRowCount=function(){
		var countRowsVisibles=0;
		for(i=0;i<this.rows.length;i++){
			if(this.rows[i].style.display==='table-row'){
				countRowsVisibles++;
			}
		}
		return countRowsVisibles;
	}

	//width es un string que puede estar en pixeles o en porcentajes.

	this.setColumnWidth=function(width,column){
		this.columns[column].style.width=width;
	}

	this.setColumnsWidth=function(widths){
		//Padres en el siguiente orden --> fila, tbody, table, main;
		for(i=0;i<widths.length;i++)
			this.columns[i].style.width=widths[i];
	}

	this.checkSelected=function(){
		if(this.selectedRow!==null && this.selectedRow.nodeName === 'TR' && !this.selectedRow.classList.contains('headers')){
			return true;
		}
		return false;
	}

	this.notSelected=function(){
		var messageContent = 'Debe seleccionar un registro para poder realizar esta operacion';
		new Mensaje(this,messageContent,"confirmacion");
	}

	this.eventos=function(){
		console.log(this.tableElement.firstChild);
		this.tableElement.addEventListener('click',function(e){
			console.log(e.target.parentNode);
			this.setSelectedRow(e.target.parentNode);
		}.bind(this));
	}

}


function Registro(sector,dataHandler,modeloTabla){
	this.sector = sector;
	this.dataHandler = dataHandler;
	this.modeloTabla=modeloTabla;
	this.searchBar=new SearchBar(this,this.modeloTabla.tableElement.previousSibling);
	this.dataBar=new DataBar(this,this.modeloTabla.tableElement.nextSibling);
	this.all = false;

	this.startRegistro=function(){
		this.searchBar.modeloSearchBar.startSearchBarModel();
		this.modeloTabla.startTableModel();
		this.dataBar.modeloDataBar.startDataBarModel();
		this.updateFullInfo();
	}

	this.getData=function(campo,criterio){
		var metodo = this.modeloTabla.metodoEntities;
		var condicion;
		if(campo === 1){
			condicion = '1';
			this.all = true;
		} 
		else {
			criterio = criterio.toUpperCase();
			condicion = "UPPER("+campo+") LIKE '"+criterio+"%'";
			this.all=false;
		}
		var params = 'metodo='+metodo+'&params={"condicion":"'+condicion+'"}';
		console.log(params);
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	} 

	this.updateFullInfo=function(){
		this.getData(1);
	}

	this.updateInfo=function(){
		console.log('here');
		this.getData(this.searchBar.modeloSearchBar.selectCampo.options[this.searchBar.modeloSearchBar.selectCampo.selectedIndex].value,this.searchBar.modeloSearchBar.inputCriterio.value);
	}

	this.updateAreas=function(registros){
		if(registros!=='1'){
			registros = JSON.parse(registros);
			this.modeloTabla.updateTable(registros,this.searchBar.modeloSearchBar,this.all);
			this.searchBar.modeloSearchBar.updateResultInfo(registros.length);
		}
		else{
			this.updateInfo();
		}
		
	}

	this.updatePuestos=function(registros){
		console.log(registros);
		if(registros !== '1'){
			registros = JSON.parse(registros);
			this.modeloTabla.updateTable(registros,this.searchBar.modeloSearchBar,this.all);
			this.searchBar.modeloSearchBar.updateResultInfo(registros.length);
		}
		else{
			this.updateInfo();
		}
	}

	this.updateTableInfo=function(registros){
		console.log(registros);
		registros = JSON.parse(registros);
		this.modeloTabla.updateTable(registros,this.searchBar.modeloSearchBar);
		this.searchBar.modeloSearchBar.updateResultInfo(registros.length);
	}

	this.startRegistro();

}

function SearchBar(registro,searchBarElement){
	this.modeloSearchBar = new SearchBarModel(registro,searchBarElement);
}

function SearchBarModel(registro,searchBarElement){
	this.searchBarElement = searchBarElement;
	this.registro = registro;
	this.tabla = registro.tabla;
	this.btnBuscar;
	this.btnUpdate;
	this.inputCriterio;
	this.selectCampo;
	this.lblFiltro;
	this.selectFiltro;
	this.selectValores;
	this.lblTotal;

	this.startSearchBarModel=function(){
		this.clearSearchBarModel();
		this.renderSearchBarModel();
		this.prepareFiltro()
		this.eventos();
	}

	this.clearSearchBarModel=function(){
		this.btnBuscar=null;
		this.btnUpdate=null;
		this.selectCampo=null;
		this.lblTotal=null;
		while(this.searchBarElement.hasChildNodes()){
			this.searchBarElement.removeChild(searchBarElement.lastChild);
		}
	}

	this.prepareFiltro=function(){
		for(i=0;i<this.registro.modeloTabla.optionsFilter.length;i++){
			this.selectFiltro.options[i] = new Option(this.registro.modeloTabla.optionsFilter[i],this.registro.modeloTabla.optionsFilter[i]);
		}
	}

	this.updateResultInfo=function(cantFilas){
		this.lblTotal.innerHTML = 'Resultados: '+cantFilas;
	}

	this.renderSearchBarModel=function(){
		var sector1 = document.createElement('div');
		var sector2 = document.createElement('div');
		var subSector1 = document.createElement('div');
		var subSector2 = document.createElement('div');
		sector1.id='sbUpper';
		sector2.id='sbLower';
		subSector1.id = 'sblLeft';
		subSector2.id = 'sblRight';
		this.btnBuscar = document.createElement('button');
		this.btnUpdate = document.createElement('button');
		this.selectCampo = document.createElement('select');
		this.inputCriterio = document.createElement('input');
		var lblCriterio = document.createElement('p');
		var lblCampo = document.createElement('p');
		this.lblFiltro = document.createElement('p');
		this.selectFiltro=document.createElement('select');
		this.selectValores=document.createElement('select');
		this.lblTotal = document.createElement('p');
		this.lblFiltro.innerHTML = 'Filtrar por: ';
		this.lblFiltro.id = 'lbl-filtro';
		this.selectFiltro.id = 'select-filtro';
		this.selectValores.id = 'select-valores';
		lblCriterio.id = 'lblCriterio-'+this.registro.modeloTabla.modulo;;
		this.inputCriterio.id = 'inputCriterio-'+this.registro.modeloTabla.modulo;
		this.btnBuscar.id = 'btnBuscar-'+this.registro.modeloTabla.modulo;
		this.btnBuscar.innerHTML = 'Buscar';
		this.btnUpdate.id = 'btnUpdate';
		this.btnUpdate.innerHTML = 'Actualizar';
		this.selectCampo.id = 'selectCampo-'+this.registro.modeloTabla.modulo;
		var options=this.registro.modeloTabla.options;
		var optionsValue=this.registro.modeloTabla.optionsValue;
		console.log(optionsValue);
		var option;
		for(i=0;i<options.length;i++){
			option = document.createElement('option');
			option.text = options[i];
			option.value = optionsValue[i];
			this.selectCampo.add(option);
		}
		lblCriterio.innerHTML = 'Criterio de Busqueda:';
		lblCampo.innerHTML = 'Buscar por:';
		this.lblTotal.innerHTML = 'Resultados:';
		sector1.appendChild(lblCriterio);
		sector1.appendChild(this.inputCriterio);
		sector1.appendChild(this.btnBuscar);
		sector1.appendChild(this.lblFiltro);
		sector1.appendChild(this.selectValores);
		sector1.appendChild(this.selectFiltro);
		subSector1.appendChild(lblCampo);
		subSector1.appendChild(this.selectCampo);
		subSector2.appendChild(this.lblTotal);
		subSector2.appendChild(this.btnUpdate);
		sector2.appendChild(subSector1);
		sector2.appendChild(subSector2);
		this.searchBarElement.appendChild(sector1);
		this.searchBarElement.appendChild(sector2);
		}

	this.eventos=function(){
		var self = this;
		this.btnUpdate.onclick=function(){
			self.registro.getData(self.selectCampo.options[self.selectCampo.selectedIndex].value,self.inputCriterio.value);
		}
		this.btnBuscar.onclick=function(){
			self.registro.getData(self.selectCampo.options[self.selectCampo.selectedIndex].value,self.inputCriterio.value);
		}
		this.registro.modeloTabla.eventosSelects(this);
	}
}

function DataBar(registro,dataBarElement){
	this.modeloDataBar = new DataBarModel(registro,dataBarElement);
}

function DataBarModel(registro,dataBarElement){
	this.dataBarElement = dataBarElement;
	this.registro = registro;
	this.modeloTabla = registro.modeloTabla;
	this.buttons=[];

	this.startDataBarModel=function(){
		this.clearDataBarModel();
		this.renderDataBarModel();
		this.eventos();
	}

	this.clearDataBarModel=function(){
		this.buttons = [];
		while(this.dataBarElement.hasChildNodes()){
			this.dataBarElement.removeChild(dataBarElement.lastChild);
		}
	}

	this.renderDataBarModel=function(){
		var button;
		var sector1 = document.createElement('div');
		var sector2 = document.createElement('div');
		sector1.id='dbUpper';
		sector2.id='dbLower';
		buttonIds=['btnAdd','btnModify','btnConsult','btnDelete'];
		buttonTextInside=[this.modeloTabla.dataAdd,this.modeloTabla.dataModify,this.modeloTabla.dataConsult,this.modeloTabla.dataDelete];
		for(i=0;i<4;i++){
			button=document.createElement('button');
			button.id = buttonIds[i];
			button.className='button-general';
			button.innerHTML = buttonTextInside[i];
			this.buttons.push(button);
		}
		sector1.appendChild(this.buttons[0]);
		sector1.appendChild(this.buttons[1]);
		sector2.appendChild(this.buttons[2]);
		sector2.appendChild(this.buttons[3]);
		this.dataBarElement.appendChild(sector1);
		this.dataBarElement.appendChild(sector2);
	}

	this.eventos=function(){
		var modal = document.getElementById('formularioModal');
		this.registro.modeloTabla.eventosBotones(this,modal);
	}

}

function TableModelUsuario(tableElement){
	TableModel.call(this,tableElement,
		['Nro','Nombre','Nombre de Usuario','Tipo de Usuario','Estado'],
		['7%','53%','20%','15%','8%']);
	this.modulo = 'Usuarios';
	this.titulo = 'Registros de Usuarios del Sistema'
	this.metodoEntities = 'getUsuarios';
	this.metodoEntity = 'getUsuario';
	this.dataAdd = 'Agregar Nuevo Usuario';
	this.dataModify = 'Modificar Usuario Seleccionado';
	this.dataDelete = 'Habilitar/Deshabilitar Usuario Seleccionado';
	this.dataConsult = 'Consultar Usuario Seleccionado';
	this.options = ['Nombre','Username'];
	this.optionsValue = ['NOMBRE','USERNAME'];
	this.optionsFilter = ['Tipo de Usuario','Estado'];
	this.searchBarModel = null;

	this.setRows=function(usuarios){
		var i=0,j=0;
		var rows=[];
		for(i=0;i<usuarios.length;i++){
			rows[i]=new Array(6);
			rows[i][0]=usuarios[i].idUsuario;
			rows[i][1]=++j;
			rows[i][2]=usuarios[i].nombre;
			rows[i][3]=usuarios[i].username;
			rows[i][4]=(usuarios[i].usertype==='J')?'Jefe de RRHH.' : 'Empleado RRHH.';
			rows[i][5]=(usuarios[i].estado==='H')?'Hab.':'Deshab.';
		}
		return rows;
	}

	this.updateTable=function(usuarios,searchBarModel){
		this.updateRows(this.setRows(usuarios),true);
		this.searchBarModel = searchBarModel;
		this.setSelectValores();
	}

	this.setSelectValores=function(){
		this.searchBarModel.selectValores.options[0] = new Option('Todos',0);
		if(this.searchBarModel.selectFiltro.value === "Tipo de Usuario"){
			this.searchBarModel.selectValores.options[1] = new Option('Jefe de RRHH','J');
			this.searchBarModel.selectValores.options[2] = new Option('Empleado de RRHH','E');
		}
		if(this.searchBarModel.selectFiltro.value === "Estado"){
			this.searchBarModel.selectValores.options[1] = new Option('Habilitado','H');
			this.searchBarModel.selectValores.options[2] = new Option('Deshabilitado','D');
		}
	}

	this.filter=function(columnaFiltro,condicion){
		console.log(condicion);
		if(condicion === "0"){
			for(i=1;i<this.tableElement.rows.length;i++){
				this.tableElement.rows[i].style.display = 'table-row';
			}
		}
		else if(columnaFiltro === 0){
			for(i=1;i<this.tableElement.rows.length;i++){
				console.log(this.tableElement.rows[i].lastChild.previousSibling.innerHTML.charAt(0));
				if(this.tableElement.rows[i].lastChild.previousSibling.innerHTML.charAt(0) === condicion){
					this.tableElement.rows[i].style.display = 'table-row';
				}
				else{
					this.tableElement.rows[i].style.display = 'none';
				}
			}
		} else{
			if(columnaFiltro === 1){
				for(i=1;i<this.tableElement.rows.length;i++){
				console.log(this.tableElement.rows[i].lastChild.innerHTML.charAt(0));
				if(this.tableElement.rows[i].lastChild.innerHTML.charAt(0) === condicion){
					this.tableElement.rows[i].style.display = 'table-row';
				}
				else{
					this.tableElement.rows[i].style.display = 'none';
				}
			}
			}
		}
	}

	this.confirmDeleteOperation=function(registro){
		if(this.selectedRow.cells[4].innerHTML==='Hab.')
			this.deshabilitarUsuario(this.selectedRow.getAttribute('data-value'),registro);
		else 
			this.habilitarUsuario(this.selectedRow.getAttribute('data-value'),registro);
	}

	this.habilitarUsuario=function(id,registro){
		var params='metodo=setUsuarioPermit&params={"idUsuario":'+id+',"permit":1}';
		registro.dataHandler.ejecutarOperacionAJAX(registro,'setUsuarioPermit',params);
	}

	this.deshabilitarUsuario=function(id,registro){
		console.log(registro);
		var params='metodo=setUsuarioPermit&params={"idUsuario":'+id+',"permit":0}';
		registro.dataHandler.ejecutarOperacionAJAX(registro,'setUsuarioPermit',params);
	}

	this.eventosSelects=function(searchBarModel){
		var self = this;
		searchBarModel.selectFiltro.onchange=function(){
			self.setSelectValores();
		}
		searchBarModel.selectValores.onchange=function(){
			var columna = (searchBarModel.selectFiltro.value === 'Estado')? 1 : 0;
			self.filter(columna,this.value);
			searchBarModel.updateResultInfo(self.getVisibleRowCount());
		}
	}

	this.eventosBotones=function(dataBarModel,modal){
		var self = this;
		dataBarModel.buttons[0].onclick=function(){
			new FormUsuario(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:1},dataBarModel.registro);
		}
		dataBarModel.buttons[1].onclick=function(){
			if(self.checkSelected()){
				new FormUsuario(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:2,
					idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value')},
					dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
			
		}
		dataBarModel.buttons[2].onclick=function(){
			if(self.checkSelected()){
				new FormUsuario(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:3,
					idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value')},
					dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
			
		}
		dataBarModel.buttons[3].onclick=function(){
			if(self.checkSelected()){
				self.confirmDeleteOperation(dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
			
		}
	}

}

function TableModelPersona(tableElement,usuario){
	TableModel.call(this,tableElement,
		['Nro','Legajo','Cuil','Apellido','Nombre','Puesto','Area'],
		['2%','2%','2%','5%','5%','8%','8%']);
	this.usuario = usuario;
	this.modulo = 'Persona';
	this.titulo = 'Registros de Personas del Sistema'
	this.metodoEntities = 'getPersonas';
	this.metodoEntity = 'getPersona';
	this.dataAdd = 'Agregar Nueva Persona';
	this.dataModify = 'Modificar Persona Seleccionada';
	this.dataDelete = 'Eliminar Persona Seleccionada';
	this.dataConsult = 'Consultar Persona Seleccionada';
	this.options = ['Legajo','Cuil','Apellido','Nombre'];
	this.optionsValue = ['LEGAJO','CUIL','APELLIDO','NOMBRE'];
	this.optionsFilter = ['Puesto','Area'];
	this.personas=null;
	this.puestos=null;
	this.areas=null;
	this.searchBarModel = null;

	this.setSelectValores=function(){
		if(this.searchBarModel.selectFiltro.value === "Puesto"){
			this.searchBarModel.selectValores.options[0] = new Option('Todos',0);
			this.searchBarModel.selectValores.options[1] = new Option('No Asignado','No Asignado');
			console.log(this.puestos.length)
			for(i=0;i<this.puestos.length;i++){
				this.searchBarModel.selectValores.options[i+2] = new Option(this.puestos[i].nombrePuesto,this.puestos[i].nombrePuesto);
			}
		}
		if(this.searchBarModel.selectFiltro.value === "Area"){
			this.searchBarModel.selectValores.options[0] = new Option('Todas',0);
			this.searchBarModel.selectValores.options[1] = new Option('No Asignada','No Asignada');
			for(i=0;i<this.areas.length;i++){
				this.searchBarModel.selectValores.options[i+2] = new Option(this.areas[i].descripcion,this.areas[i].descripcion);
			}
		}
	}

	this.getAllAreas=function(){
		var params = 'metodo=getAreas&params={"condicion":"1"}';
		var metodo = 'getAreas';
		new DataHandler().ejecutarOperacionAJAX(this,metodo,params);
	}

	this.updateAreas=function(areas){
		areas = JSON.parse(areas);
		this.areas = areas;
		this.getAllPuestos();
	}

	this.getAllPuestos=function(){
		var params = 'metodo=getPuestos&params={"condicion":"1"}';
		var metodo = 'getPuestos';
		new DataHandler().ejecutarOperacionAJAX(this,metodo,params);
	}

	this.updatePuestos=function(puestos){
		puestos = JSON.parse(puestos);
		this.puestos = puestos;
		this.setSelectValores();
		this.updateRows(this.setRows(this.personas),true);
	}

	this.traducirIdArea=function(id){
		var puestoTarget=null;
		id = id.toString();
		for(k in this.puestos){
			if(this.puestos[k].idPuesto === id){
				puestoTarget=this.puestos[k];
				break;
			}
		}
		if(puestoTarget !== null){
			for(k in this.areas){
				if(this.areas[k].idArea === puestoTarget.Area_idArea){
					return this.areas[k].descripcion;
				}
			}	
		}
		return 'No Asignada';
	}

	this.traducirIdPuesto=function(id){
		for(k in this.puestos){
			if(this.puestos[k].idPuesto === id){
				return this.puestos[k].nombrePuesto;
			}
		}
		return 'No Asignado';
	}

	this.setRows=function(personas){
		var i=0,j=0;
		var rows=[];
		for(i=0;i<personas.length;i++){
			rows[i]=new Array(8);
			rows[i][0]=personas[i].idPersona;
			rows[i][1]=++j;
			rows[i][2]=personas[i].legajo;
			rows[i][3]=personas[i].cuil;
			rows[i][4]=personas[i].apellido;
			rows[i][5]=personas[i].nombre;
			rows[i][6]=this.traducirIdPuesto(personas[i].Puesto_idPuesto);
			rows[i][7]=this.traducirIdArea(personas[i].Puesto_idPuesto);
		}
		return rows;
	}

	this.updateTable=function(personas,searchBarModel,all){
		this.personas=personas;
		this.searchBarModel = searchBarModel;
		if(this.areas=== null)this.getAllAreas();
		else this.updateRows(this.setRows(this.personas),true);
	}

	this.getSelectedPuesto=function(){
		var idPersona = this.selectedRow.getAttribute('data-value');
		var idPuesto;
		for(i in this.personas){
			if(this.personas[i].idPersona === idPersona ){
				idPuesto = this.personas[i].Puesto_idPuesto;
				break;
			}
		}
		for(i in this.puestos){
			console.log(idPuesto);
			console.log(this.puestos[i]);
			if(this.puestos[i].idPuesto === idPuesto){
				console.log(this.puestos[i]);
				return this.puestos[i];
			}
		}
	}

	this.filter=function(columnaFiltro,condicion){
		console.log(condicion);
		if(condicion === "0"){
			for(i=1;i<this.tableElement.rows.length;i++){
				this.tableElement.rows[i].style.display = 'table-row';
			}
		}
		else if(columnaFiltro === 0){
			for(i=1;i<this.tableElement.rows.length;i++){
				console.log(this.tableElement.rows[i].lastChild.previousSibling.innerHTML);
				if(this.tableElement.rows[i].lastChild.previousSibling.innerHTML === condicion){
					this.tableElement.rows[i].style.display = 'table-row';
				}
				else{
					this.tableElement.rows[i].style.display = 'none';
				}
			}
		} else{
			if(columnaFiltro === 1){
				for(i=1;i<this.tableElement.rows.length;i++){
					console.log(this.tableElement.rows[i].lastChild.innerHTML);
					if(this.tableElement.rows[i].lastChild.innerHTML === condicion){
						this.tableElement.rows[i].style.display = 'table-row';
					}
					else{
						this.tableElement.rows[i].style.display = 'none';
					}
				}
			}
		}
	}

	this.confirmDelete=function(extra){
		new Mensaje(this,'¿Esta seguro que desea borrar este registro?','condicion','delete',extra);
	}

	this.delete=function(registro){
		var id = this.selectedRow.getAttribute('data-value')
		var params = 'metodo=deletePersona&params={"idPersona":'+id+'}';
		registro.dataHandler.ejecutarOperacionAJAX(registro,'deletePersona',params);
		registro.dataHandler.ejecutarOperacionArchivoAJAX(registro,'deleteFile',id);
	}

	this.eventosSelects=function(searchBarModel){
		var self = this;
		searchBarModel.selectFiltro.onchange=function(){
			self.setSelectValores();
		}
		searchBarModel.selectValores.onchange=function(){
			var columna = (searchBarModel.selectFiltro.value === 'Area')? 1 : 0;
			self.filter(columna,this.value);
			searchBarModel.updateResultInfo(self.getVisibleRowCount());
		}
	}

	this.eventosBotones=function(dataBarModel,modal){
		var self = this;
		dataBarModel.buttons[0].onclick=function(){
			new FormPersona(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:1,dateActions:new DateActions(),usuario:self.usuario},dataBarModel.registro);
		}
		dataBarModel.buttons[1].onclick=function(){
			if(self.checkSelected()){
				new FormPersona(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:2,
					idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value'),dateActions:new DateActions(),usuario:self.usuario,puesto:self.getSelectedPuesto()},
					dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
		dataBarModel.buttons[2].onclick=function(){
			if(self.checkSelected()){
				new FormPersona(dataBarModel.registro.dataHandler,
					{modal:modal,tipo:3,
						idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value'),dateActions:new DateActions(),usuario:self.usuario,puesto:self.getSelectedPuesto()},
						dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
		dataBarModel.buttons[3].onclick=function(){
			if(self.checkSelected()){
					self.confirmDelete(dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
	}

}

function TableModelArea(tableElement,sectorInfo){
	TableModel.call(this,tableElement,
		['Nro','Codigo','Descripcion','Area Superior'],
		['2%','2%','8%','8%']);
	this.modulo = 'Area';
	this.titulo = 'Registros de Areas del Sistema'
	this.metodoEntities = 'getAreas';
	this.metodoEntity = 'getArea';
	this.dataAdd = 'Agregar Nueva Area';
	this.dataModify = 'Modificar Area';
	this.dataDelete = 'Eliminar Area';
	this.dataConsult = 'Consultar Area';
	this.options = ['Codigo','Descripcion'];
	this.optionsValue = ['CODIGO','DESCRIPCION'];
	this.optionsFilter = ['Area Superior'];
	this.areas = null;
	this.listaPuestos = null;
	this.sectorInfo=sectorInfo;
	this.searchBarModel=null;
	this.lblCountPuestos=null;
	this.lblSubAreas=null;

	this.setListaPuestos=function(listaPuestos){
		this.listaPuestos = listaPuestos;
	}

	this.startListaPuestos=function(){
		this.listaPuestos.areas = this.areas;
		console.log(this.listaPuestos.areas);
		this.listaPuestos.startLista();
		this.eventosLista();
	}

	this.setDimensions=function(){
		var searchBar = this.tableElement.previousSibling;
		var dataBar = this.tableElement.nextSibling;
		searchBar.style.width="95%";
		dataBar.style.width="95%"
		this.tableElement.style.height="70%";
		this.tableElement.style.width="95%"
		this.tableElement.style.marginBottom="1%";
	}

	this.getSubAreas=function(id){
		var subAreas = [];
		for(i=0;i<this.areas.length;i++){
			if(this.areas[i].Area_idAreaSuperior === id){
				subAreas.push(this.areas[i].descripcion);
			}
		}
		if(subAreas.length > 0)
			return subAreas.toString();
		else{
			return 'Sin SubAreas';
		}
	}

	this.setRows=function(areas){
		var i=0,j=0;
		var rows=[];
		for(i=0;i<areas.length;i++){
			rows[i]=new Array(5);
			rows[i][0]=areas[i].idArea;
			rows[i][1]=++j;
			rows[i][2]=areas[i].codigo;
			rows[i][3]=areas[i].descripcion;
			rows[i][4]=this.traducirIdArea(areas[i].Area_idAreaSuperior);		
		}
		return rows;
	}

	this.setSelectValores=function(){
		this.searchBarModel.selectValores.options[0] = new Option('Todas',0);
		for(i=0;i<this.areas.length;i++){
			this.searchBarModel.selectValores.options[i+1] = new Option(this.areas[i].descripcion,this.areas[i].descripcion);
		}
	}

	this.traducirIdArea=function(id){
		if(id==='0') return '-';
		for(i in this.areas){
			if(this.areas[i].idArea === id){
				return this.areas[i].descripcion;
			}
		}
	}

	this.updateTable=function(areas,searchBarModel,all){
		this.searchBarModel=searchBarModel;
		if(all){this.areas=areas;this.startListaPuestos()};
		this.updateRows(this.setRows(areas),true);
		this.setFullAreaInfo();
	}

	this.setFullAreaInfo=function(id){
		if(this.sectorInfo.hasChildNodes()){
			var titulo = this.sectorInfo.firstChild;
			while(this.sectorInfo.hasChildNodes()){
				this.sectorInfo.removeChild(this.sectorInfo.lastChild);
			}
			this.sectorInfo.appendChild(titulo);
		}
		if(id===undefined)id=null;
		var cantAreas = document.createElement('p');
		if(id===null){
			this.sectorInfo.firstChild.innerHTML = 'Informacion de Areas del Sistema';
			cantAreas.innerHTML = '<b>Cantidad de Areas de Mostacho Bancario:<b> '+this.areas.length;
			this.sectorInfo.nextSibling.firstChild.innerHTML = 'Todos los puestos';
			this.listaPuestos.filter('');
			this.setSelectValores();
			this.sectorInfo.appendChild(cantAreas);
			this.lblCountPuestos = cantAreas;
		}
	}

	this.filter=function(columnaFiltro,condicion){
		console.log(condicion);
		if(condicion === "0"){
			console.log('hi');
			for(i=1;i<this.tableElement.rows.length;i++){
				this.tableElement.rows[i].style.display = 'table-row';
			}
		}else{
			for(i=1;i<this.tableElement.rows.length;i++){
			console.log(this.tableElement.rows[i].lastChild.innerHTML);
				if(this.tableElement.rows[i].lastChild.innerHTML === condicion){
					this.tableElement.rows[i].style.display = 'table-row';
				}
				else{
					this.tableElement.rows[i].style.display = 'none';
				}
			}
		}
	}

	this.confirmDelete=function(extra){
		new Mensaje(this,'¿Esta seguro que desea borrar este registro?','condicion','delete',extra);
	}

	this.delete=function(registro){
		var id = this.selectedRow.getAttribute('data-value')
		var params = 'metodo=deleteArea&params={"idArea":'+id+'}';
		registro.dataHandler.ejecutarOperacionAJAX(registro,'deleteArea',params);
		registro.dataHandler.ejecutarOperacionArchivoAJAX(registro,'deleteFile',id);
	}

	this.eventosSelects=function(searchBarModel){
		var self = this;
		searchBarModel.selectFiltro.onchange=function(){
			self.setSelectValores();
		}
		searchBarModel.selectValores.onchange=function(){
			self.filter(1,this.value);
			searchBarModel.updateResultInfo(self.getVisibleRowCount());
		}
	}

	this.eventosBotones=function(dataBarModel,modal){
		var self = this;
		dataBarModel.buttons[0].onclick=function(){
			new FormArea(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:1},dataBarModel.registro);
		}
		dataBarModel.buttons[1].onclick=function(){
			console.log('Hi');
			console.log(dataBarModel.registro.modeloTabla.selectedRow.lastChild.innerHTML);
			if(self.checkSelected()){
				new FormArea(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:2,
					idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value'),descripcionAreaSuperior:dataBarModel.registro.modeloTabla.selectedRow.lastChild.innerHTML},
					dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
		dataBarModel.buttons[2].onclick=function(){
			if(self.checkSelected()){
				new FormArea(dataBarModel.registro.dataHandler,
					{modal:modal,tipo:3,
						idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value'),descripcionAreaSuperior:dataBarModel.registro.modeloTabla.selectedRow.lastChild.innerHTML},
						dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
		dataBarModel.buttons[3].onclick=function(){
			if(self.checkSelected()){
					self.confirmDelete(dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
	}

	this.eventosLista=function(){
		this.tableElement.addEventListener('click',function(e){
			if(this.checkSelected()){
				console.log(this.lblSubAreas);
				if(this.lblSubAreas!=undefined) this.sectorInfo.removeChild(this.lblSubAreas);
				var areaTarget = e.target.parentNode.lastChild.previousSibling.innerHTML;
				this.sectorInfo.firstChild.innerHTML = 'Informacion del Area: '+ areaTarget;
				this.listaPuestos.barraBusqueda.lastChild.previousSibling.value='';
				this.listaPuestos.areaTarget = areaTarget;
				var cantPuestos = this.listaPuestos.filterArea();
				this.lblCountPuestos.innerHTML = '<b>Cantidad de Puestos comprendidos:</b> '+ cantPuestos;
				this.lblSubAreas = document.createElement('p');
				this.lblSubAreas.innerHTML = '<b>SubAreas inmediatas:</b> '+this.getSubAreas(e.target.parentNode.getAttribute('data-value'));
				this.sectorInfo.appendChild(this.lblSubAreas);
				this.sectorInfo.nextSibling.firstChild.innerHTML = 'Puestos que componen esta Area';
			}
			
		}.bind(this));
	}

	this.setDimensions();
	
}

function TableModelPuesto(tableElement){
	TableModel.call(this,tableElement,
		['Nro','Codigo','Nombre','Area'],
		['2%','2%','8%','8%']);
	this.modulo = 'Puesto';
	this.titulo = 'Registros de Puestos del Sistema'
	this.metodoEntities = 'getPuestos';
	this.metodoEntity = 'getPuesto';
	this.dataAdd = 'Agregar Nuevo Puesto';
	this.dataModify = 'Modificar Puesto';
	this.dataDelete = 'Eliminar Puesto';
	this.dataConsult = 'Consultar Puesto';
	this.options = ['Codigo','Nombre'];
	this.optionsValue = ['CODIGO','NOMBREPUESTO'];
	this.optionsFilter = ['Area'];
	this.puestos = null;
	this.areas = null;
	this.searchBarModel=null;
	//this.sectorInfo=sectorInfo;

	this.startModeloTabla = function(){
		this.setDimensions();
	}

	this.getAllAreas=function(){
		var params = 'metodo=getAreas&params={"condicion":"1"}';
		var metodo = 'getAreas';
		new DataHandler().ejecutarOperacionAJAX(this,metodo,params);
	}

	this.updateAreas=function(areas){
		areas = JSON.parse(areas);
		this.areas = areas;
		this.updateRows(this.setRows(this.puestos),true);
		this.setSelectValores();
	}

	this.setDimensions=function(){
		if(tableElement.parentNode.classList.contains('lateral-derecho-inferior')){
			var searchBar = this.tableElement.previousSibling;
			var dataBar = this.tableElement.nextSibling;
			searchBar.style.width="95%";
			dataBar.style.width="95%"
			this.tableElement.style.height="60%";
			this.tableElement.style.width="95%"
			this.tableElement.style.marginBottom="1%";
		}
	}

	this.setRows=function(puestos){
		var i=0,j=0;
		var rows=[];
		for(i=0;i<puestos.length;i++){
			rows[i]=new Array(5);
			rows[i][0]=puestos[i].idPuesto;
			rows[i][1]=++j;
			rows[i][2]=puestos[i].codigo;
			rows[i][3]=puestos[i].nombrePuesto;
			rows[i][4]=this.traducirIdArea(puestos[i].Area_idArea);		
		}
		return rows;
	}

	this.setSelectValores=function(){
		this.searchBarModel.selectValores.options[0] = new Option('Todas',0);
		for(i=0;i<this.areas.length;i++){
			this.searchBarModel.selectValores.options[i+1] = new Option(this.areas[i].descripcion,this.areas[i].descripcion);
		}
	}

	this.traducirIdArea=function(id){
		for(i in this.areas){
			if(this.areas[i].idArea === id){
				return this.areas[i].descripcion;
			}
		}
	}

	this.updateTable=function(puestos,searchBarModel,all){
		this.searchBarModel = searchBarModel;
		if(all)this.puestos=puestos;
		if(this.areas=== null)this.getAllAreas();
		else this.updateRows(this.setRows(puestos),true);
	}

	this.setFullAreaInfo=function(id){
		if(this.sectorInfo.hasChildNodes()){
			var titulo = this.sectorInfo.firstChild;
			while(this.sectorInfo.hasChildNodes()){
				this.sectorInfo.removeChild(this.sectorInfo.lastChild);
			}
			this.sectorInfo.appendChild(titulo);
		}
		if(id===undefined)id=null;
		var cantAreas = document.createElement('p');
		if(id===null){
			cantAreas.innerHTML = 'Cantidad de Areas de Mostacho Bancario: '+this.areas.length;
			this.sectorInfo.appendChild(cantAreas);
		}
	}

	this.filter=function(columnaFiltro,condicion){
		console.log(condicion);
		if(condicion === "0"){
			console.log('hi');
			for(i=1;i<this.tableElement.rows.length;i++){
				this.tableElement.rows[i].style.display = 'table-row';
			}
		}else{
			for(i=1;i<this.tableElement.rows.length;i++){
			console.log(this.tableElement.rows[i].lastChild.innerHTML);
				if(this.tableElement.rows[i].lastChild.innerHTML === condicion){
					this.tableElement.rows[i].style.display = 'table-row';
				}
				else{
					this.tableElement.rows[i].style.display = 'none';
				}
			}
		}
	}

	this.confirmDelete=function(extra){
		new Mensaje(this,'¿Esta seguro que desea borrar este registro?','condicion','delete',extra);
	}

	this.delete=function(registro){
		var id = this.selectedRow.getAttribute('data-value')
		var params = 'metodo=deletePuesto&params={"idPuesto":'+id+'}';
		registro.dataHandler.ejecutarOperacionAJAX(registro,'deletePuesto',params);
	}

	this.eventosSelects=function(searchBarModel){
		var self = this;
		searchBarModel.selectFiltro.onchange=function(){
			self.setSelectValores();
		}
		searchBarModel.selectValores.onchange=function(){
			self.filter(1,this.value);
			searchBarModel.updateResultInfo(self.getVisibleRowCount());
		}
	}

	this.eventosBotones=function(dataBarModel,modal){
		var self = this;
		dataBarModel.buttons[0].onclick=function(){
			new FormPuesto(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:1},dataBarModel.registro);
		}
		dataBarModel.buttons[1].onclick=function(){
			if(self.checkSelected()){
				new FormPuesto(dataBarModel.registro.dataHandler,
				{modal:modal,tipo:2,
					idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value'),descripcionArea:dataBarModel.registro.modeloTabla.selectedRow.lastChild.innerHTML},
					dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
		dataBarModel.buttons[2].onclick=function(){
			if(self.checkSelected()){
				new FormPuesto(dataBarModel.registro.dataHandler,
					{modal:modal,tipo:3,
						idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value'),descripcionArea:dataBarModel.registro.modeloTabla.selectedRow.lastChild.innerHTML},
						dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
		dataBarModel.buttons[3].onclick=function(){
			if(self.checkSelected()){
					self.confirmDelete(dataBarModel.registro);
			}
			else{
				self.notSelected();
			}
		}
	}

	this.startModeloTabla();
	
}


