function TableModel(tableElement,headers,widths){
	this.headers = headers;
	this.tableElement = tableElement;
	this.widths=widths;
	this.columns=[];
	this.rows=[];
	this.selectedRow=undefined;

	this.startTableModel = function(rows){
		this.renderTableModel(rows);
		this.eventos();
		this.show(true);
	}

	this.show=function(value){
		if(value) this.tableElement.style.display='table';
		else this.tableElement.style.display='none';
	}

	this.renderTableModel = function(rows){
		this.rows = rows;
		this.clearTableModel();
		this.addColumns();
		this.updateRows(rows);
	}

	this.updateRows = function(rows){
		this.removeAllRows();
		for(r in rows){
			this.appendRow(r);
		}
	}

	this.clearTableModel = function(){
		while(this.tableElement.hasChildNodes()){
			this.tableElement.removeChild(this.tableElement.lastChild);
		}
	}

	this.removeAllRows = function(){
		while(this.tableElement.hasChildNodes()){
			if(this.tableElement.lastChild.className != 'header')
				this.tableElement.removeChild(this.tableElement.lastChild);
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

	this.appendRow=function(row,header){
		var rowNode = document.createElement('tr');
		var cellNode;
		for(r in row){
			cellNode = document.createElement('td');
			cellNode.className = r.tipo;
			cellNode.innerHTML=r.textInside;
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
		this.modeloTabla.startTableModel();
	}

	this.filter=function(campo,criterio){
		var condicion = '';
		var metodo = this.tabla.metodoFilter;
		condicion+= campo+ "LIKE '"+criterio+"%' ORDER BY "+campo;
		var params = 'metodo='+metodo+'&params='+condicion;
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	} 

	this.updateTableInfo=function(registros){
		this.tabla.updateTable(registros);
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
	this.botonBuscar=null;
	this.botonUpdate=null;
	this.lblTotal=null;

	this.startSearchBarModel=function(){
		this.clearSearchBarModel();
		this.renderSearchBarModel();
		this.eventos();
	}

	this.clearSearchBarModel=function(){
		this.botonBuscar=null;
		this.botonUpdate=null;
		this.lblTotal=null;
		while(this.searchBarModel.hasChildNodes()){
			this.searchBarModel.removeChild(searchBarModel.lastChild);
		}
	}

	this.renderSearchBarModel=function(){
		var button;
		elementsIds=['lblBusqueda','selectCampo','','buttonBusqueda','buttonUpdate','lblTotalFilas'];
		btnClass = []
		buttonTextInside=['Filtrar resultados por',this.tabla.dataModify];
		for(i<0;i<2;i++){
			button=document.createElement('button');
			button.id = buttonIds[i];
			button.innerHTML = buttonTextInside[i];
			this.buttons.push(button);
			dataBarModel.appendChild(button);
			button=undefined;
		}
		

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
		buttonIds=['buttonAdd','buttonModify','buttonConsult','buttonDelete'];
		buttonTextInside=[this.modeloTabla.dataAdd,this.modeloTabla.dataModify,this.dataConsult,this.modeloTabla.Delete];
		for(i=0;i<4;i++){
			button=document.createElement('button');
			button.id = buttonIds[i];
			button.className='button-general';
			button.innerHTML = buttonTextInside[i];
			this.buttons.push(button);
			dataBarElement.appendChild(button);
			button=undefined;
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

	this.startDataBarModel();
}



function TableModelUsuario(tableElement){
	TableModel.call(this,tableElement,
		['ID','Nro','Nombre','Apellido','Nombre de Usuario','Tipo de Usuario','Estado']
		,['0','7%','25%','25%','20%','15%','8%']);
	console.log('TableElement');
	console.log(this.tableElement);
	this.modulo = 'Usuarios';
	this.titulo = 'Registros de Usuarios del Sistema'
	this.metodoFilter = 'getUsuarios';
	this.metodoEntity = 'getUsuario';
	this.dataAdd = 'Nuevo Usuario';
	this.dataModify = 'Modificar Usuario Seleccionado';
	this.dataDelete = 'Eliminar Usuario Seleccionado';
	this.dataConsult = 'Consultar Usuario Seleccionado';

	this.setRows=function(usuarios){
		var row;
		var rows;
		var j = 1;
		for(u in usuarios){
			row[0]=u.id;
			row[1]=j;
			row[2]=u.nombre;
			row[3]=u.apellido;
			row[4]=u.username;
			row[5]=u.tipo;
			row[6]=u.estado;
			rows[j-1]=row;	
			j++;
			row=[];
		}
		return rows;
	}

	this.updateTable=function(usuarios){
		this.updateRows(this.setRows(usuarios));
	}

}


