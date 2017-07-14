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
		//this.eventos();
	}

	this.renderTableModel = function(){
		this.clearTableModel();
		this.addColumns();
		this.setColumnsWidth(widths);
	}

	this.updateRows = function(rows){
		this.removeAllDataRows();
		for(i=0;i<rows.length;i++){
			this.appendRow(rows[i]);
		}
	}

	this.clearTableModel = function(){
		while(this.tableElement.hasChildNodes()){
			this.tableElement.removeChild(this.tableElement.lastChild);
		}
	}

	this.removeAllDataRows = function(){
		for(i=this.rows.length;i>0;i--){
			this.tableElement.deleteRow(i);
		}
	}

	this.addColumns=function(){
		this.columns=[];
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
		var rowNode = document.createElement('tr');
		var cellNode;
		for(j=0;j<row.length;j++){
			cellNode = document.createElement('td');
			cellNode.innerHTML=row[j];
			rowNode.append(cellNode);
		}
		this.tableElement.appendChild(rowNode);
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
		this.clearSelectedRow();
		this.selectedRow = row;
		row.classList.add('selected');
	}

	this.clearSelectedRow=function(){
		this.tableElement.getElementsByClassName('selected')[0].classList.remove('selected');
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
		tabla.onclick=function(e){
			this.clearSelectedRow();
			this.getSelectedRow(e);
		}
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
		this.getData();
	}

	this.getData=function(campo,criterio){
		var metodo = this.modeloTabla.metodoEntities;
		var condicion = '1';
		var params = 'metodo='+metodo+'&params='+condicion;
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	} 

	this.updateTableInfo=function(registros){
		registros = JSON.parse(registros);
		this.modeloTabla.updateTable(registros);
	}

	this.startRegistro();

}

function SearchBar(registro,searchBarElement){
	this.modeloSearchBar = new SearchBarModel(registro,searchBarElement);
}

function SearchBarModel(registro,searchBarElement){
	this.searchBarModel = searchBarElement;
	this.registro = registro;
	this.tabla = registro.tabla;
	this.btnBuscar=null;
	this.btnUpdate=null;
	this.selectCampo=null;
	this.lblTotal=null;

	this.startSearchBarModel=function(){
		this.clearSearchBarModel();
		this.renderSearchBarModel();
		//this.eventos();
	}

	this.clearSearchBarModel=function(){
		this.btnBuscar=null;
		this.btnUpdate=null;
		this.selectCampo=null;
		this.lblTotal=null;
		while(this.searchBarModel.hasChildNodes()){
			this.searchBarModel.removeChild(searchBarModel.lastChild);
		}
	}

	this.renderSearchBarModel=function(){
		var elementsType = ['p','input','button','hr','p','select','hr','p','button'];
		var elementsIds = ['lblBusqueda','inputBuscar','btnBuscar','','selectCampo','','lblTotal','','btnUpdate'];
		var elementsTextInside=['Criterio de Busqueda: ', '', 'Buscar','Buscar por: ','','','Resultados','','Actualizar']
		var element;
		for(i=0;i<elementsType.length;i++){
			element=document.createElement(elementsType[i]);
			if(elementsIds[i]!=='')element.id = elementsIds[i];
			if(elementsTextInside[i]!=='')element.innerHTML = elementsTextInside[i];
			this.searchBarModel.appendChild(element);
		}
		this.btnBuscar=document.getElementById('btnBuscar');
		this.btnUpdate=document.getElementById('btnUpdate');
		this.selectCampo  = document.getElementById('selectCampo');
		this.lblTotal = document.getElementById('lblTotal');
	}

	this.eventos=function(){

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
		buttonIds=['btnAdd','btnModify','btnConsult','btnDelete'];
		buttonTextInside=[this.modeloTabla.dataAdd,this.modeloTabla.dataModify,this.modeloTabla.dataConsult,this.modeloTabla.dataDelete];
		for(i=0;i<4;i++){
			button=document.createElement('button');
			button.id = buttonIds[i];
			button.className='button-general';
			button.innerHTML = buttonTextInside[i];
			this.buttons.push(button);
			dataBarElement.appendChild(button);
		}

		
	}

	this.eventos=function(){
		this.buttons[0].onclick=function(){
			new FormUsuario(this.registro.dataHandler,
				{modal:this.registro.menuPrincipal,tipo:1});
		}
		this.buttons[1].onclick=function(){
			new FormUsuario(this.registro.dataHandler,
				{modal:this.registro.menuPrincipal,tipo:2,
					idBuscado:this.registro.tabla.modeloTabla.selectedRow.firstChild.innerHTML});
		}
		this.buttons[2].onclick=function(){
			new FormUsuario(this.registro.dataHandler,
				{modal:this.registro.menuPrincipal,tipo:3,
					idBuscado:this.registro.tabla.modeloTabla.selectedRow.firstChild.innerHTML});
		}
		this.buttons[3].onclick=function(){
			//Eliminar
		}
	}

}



function TableModelUsuario(tableElement){
	TableModel.call(this,tableElement,
		['ID','Nro','Nombre','Nombre de Usuario','Tipo de Usuario','Estado']
		,['0','7%','50%','20%','15%','8%']);
	this.modulo = 'Usuarios';
	this.titulo = 'Registros de Usuarios del Sistema'
	this.metodoEntities = 'getUsuarios';
	this.metodoEntity = 'getUsuario';
	this.dataAdd = 'Nuevo Usuario';
	this.dataModify = 'Modificar Usuario Seleccionado';
	this.dataDelete = 'Eliminar Usuario Seleccionado';
	this.dataConsult = 'Consultar Usuario Seleccionado';

	this.setRows=function(usuarios){
		var i=0,j=0;
		var rows=[];
		for(i=0;i<usuarios.length;i++){
			rows[i]=new Array(6);
			rows[i][0]=usuarios[i].idUsuario;
			rows[i][1]=j;
			rows[i][2]=usuarios[i].nombre;
			rows[i][3]=usuarios[i].username;
			rows[i][4]=usuarios[i].usertype;
			rows[i][5]=usuarios[i].estado;
			j++;
		}
		return rows;
	}

	this.updateTable=function(usuarios){
		this.updateRows(this.setRows(usuarios));
	}

}


