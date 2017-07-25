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

	//width es un string que puede estar en pixeles o en porcentajes.

	this.setColumnWidth=function(width,column){
		this.columns[column].style.width=width;
	}

	this.setColumnsWidth=function(widths){
		//Padres en el siguiente orden --> fila, tbody, table, main;
		for(i=0;i<widths.length;i++)
			this.columns[i].style.width=widths[i];
	}

	this.eventos=function(){
		console.log(this.tableElement.firstChild);
		this.tableElement.onclick=function(e){
			this.setSelectedRow(e.target.parentNode);
		}.bind(this);
	}

}

function Registro(sector,dataHandler,modeloTabla){
	this.sector = sector;
	this.dataHandler = dataHandler;
	this.modeloTabla=modeloTabla;
	this.searchBar=new SearchBar(this,this.modeloTabla.tableElement.previousSibling);
	this.dataBar=new DataBar(this,this.modeloTabla.tableElement.nextSibling);

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
		} 
		else {
			criterio = criterio.toUpperCase();
			condicion = "UPPER("+campo+") LIKE '"+criterio+"%'";
		}
		var params = 'metodo='+metodo+'&params={"condicion":"'+condicion+'"}';
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	} 

	this.updateFullInfo=function(){
		this.getData(1);
	}

	this.updateInfo=function(){
		this.getData(self.selectCampo.options[selectCampo.selectedIndex].value,self.inputCriterio.value);
	}

	this.updateTableInfo=function(registros){
		registros = JSON.parse(registros);
		this.modeloTabla.updateTable(registros);
		this.searchBar.modeloSearchBar.updateResultInfo(this.modeloTabla.getRowCount());
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
	this.lblTotal;

	this.startSearchBarModel=function(){
		this.clearSearchBarModel();
		this.renderSearchBarModel();
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
		this.lblTotal = document.createElement('p');
		lblCriterio.id = 'lblCriterio';
		this.inputCriterio.id = 'inputCriterio';
		this.btnBuscar.id = 'btnBuscar';
		this.btnBuscar.innerHTML = 'Buscar';
		this.btnUpdate.id = 'btnUpdate';
		this.btnUpdate.innerHTML = 'Actualizar';
		this.selectCampo.id = 'selectCampo';
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
		self = this;
		this.btnUpdate.onclick=function(){
			self.registro.getData(self.selectCampo.options[selectCampo.selectedIndex].value,self.inputCriterio.value);
		}
		this.btnBuscar.onclick=function(){
			self.registro.getData(self.selectCampo.options[selectCampo.selectedIndex].value,self.inputCriterio.value);
		}
	}
}

function DataBar(registro,dataBarElement){
	this.modeloDataBar = new DataBarModel(registro,dataBarElement);
}

function DataBarModel(registro,dataBarElement){
	this.dataBarElement = dataBarElement;
	this.registro = registro;
	this.modeloTabla = registro.modeloTabla;
	this.buttons=[]

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
		var self = this;
		var modal = document.getElementById('formularioModal');
		this.buttons[0].onclick=function(){
			new FormUsuario(self.registro.dataHandler,
				{modal:modal,tipo:1});
		}
		this.buttons[1].onclick=function(){
			new FormUsuario(self.registro.dataHandler,
				{modal:modal,tipo:2,
					idBuscado:self.registro.modeloTabla.selectedRow.getAttribute('data-value')},
					self.registro);
		}
		this.buttons[2].onclick=function(){
			new FormUsuario(self.registro.dataHandler,
				{modal:modal,tipo:3,
					idBuscado:self.registro.modeloTabla.selectedRow.getAttribute('data-value')},
					self.registro);
		}
		this.buttons[3].onclick=function(){
			self.registro.modeloTabla.confirmDeleteOperation(self.registro);
		}
	}

}

function TableModelUsuario(tableElement){
	TableModel.call(this,tableElement,
		['Nro','Nombre','Nombre de Usuario','Tipo de Usuario','Estado']
		,['7%','53%','20%','15%','8%']);
	this.modulo = 'Usuarios';
	this.titulo = 'Registros de Usuarios del Sistema'
	this.metodoEntities = 'getUsuarios';
	this.metodoEntity = 'getUsuario';
	this.dataAdd = 'Agregar Nuevo Usuario';
	this.dataModify = 'Modificar Usuario Seleccionado';
	this.dataDelete = 'Habilitar/Deshabilitar Usuario Seleccionado';
	this.dataConsult = 'Consultar Usuario Seleccionado';
	this.options = ['Nombre','Username','UserType','Estado'];
	this.optionsValue = ['NOMBRE','USERNAME','USERTYPE','ESTADO'];

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

	this.updateTable=function(usuarios){
		this.updateRows(this.setRows(usuarios),true);
	}

	this.confirmDeleteOperation=function(registro){
		console.log(this.selectedRow.cells[4].innerHTML);
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

}


