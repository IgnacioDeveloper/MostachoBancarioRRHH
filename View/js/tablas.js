function TableModel(table,headers){
	this.headers = headers;
	this.tableModel = table;
	this.columns=[];
	this.rows=[];
	this.selectedRow=undefined;

	this.startTableModel = function(rows){
		this.renderTableModel(rows);
		this.eventos();
		this.show(true);
	}

	this.show=function(value){
		if(value) this.tableModel.style.display='table';
		else this.tableModel.style.display='none';
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
		while(this.tableModel.hasChildNodes()){
			this.tableModel.removeChild(this.tableModel.lastChild);
		}
	}

	this.removeAllRows = function(){
		while(this.tableModel.hasChildNodes()){
			if(this.tableModel.lastChild.className != 'header')
				this.tableModel.removeChild(this.tableModel.lastChild);
		}
	}

	this.addColumns=function(){
		this.columns=[];
		var rowNode = document.createElement('tr');
		rowNode.className='headers'
		var cellNode;
		for(r in row){
			cellNode = document.createElement('td');
			cellNode.className = 'headerCell';
			cellNode.innerHTML=r.textInside;
			rowNode.append(cellNode);
			this.columns.push(cellNode);
		}
		this.tableModel.appendChild(rowNode);
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
		this.tableModel.appendChild(rowNode);
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
		this.tableModel.getElementsByClassName('selected')[0].classList.remove('selected');
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
			clearSelectedRow();
			getSelectedRow(e);
		}
	}

}

function TableHandler(tabla,dataHandler){
	this.tabla=tabla;
	this.dataBar;
	this.modeloTabla = this.tabla.modeloTabla;
	this.dataHandler = dataHandler;

	this.setTable=function(tabla){
		this.tabla=tabla;
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

}

function DataBarModel(dataHandler,dataBarElement){
	this.dataBarModel = dataBarElement;
	this.tabla = dataHandler.tabla;
	this.buttons=[]

	this.startDataBar=function(){
		this.clearDataBar();
		this.renderDataBar();
		this.eventos(){
		}
	}

	this.clearDataBar=function(){
		this.buttons = [];
		while(this.dataBarModel.hasChildNodes()){
			this.dataBarModel.removeChild(dataBarModel.lastChild);
		}
	}

	this.renderDataBar=function(){
		var button;
		buttonIds=['buttonAdd','buttonModify','buttonConsult','buttonDelete'];
		buttonTextInside=[this.tabla.dataAdd,this.tabla.dataModify,this.dataConsult,this.tabla.Delete];
		for(i=0;i<4;i++){
			button=document.createElement('button');
			button.id = buttonIds[i];
			button.innerHTML = buttonTextInside[i];
			this.buttons.push(button);
			dataBarModel.appendChild(button);
			button=undefined;
		}
	}

	this.eventos=function(){
		this.buttons[0].onclick=function(){
			//var Configuracion = {modal:this.modal,tipo:tipo};
			new FormUsuario(this.dataHandler,Configuracion);
		}
		this.buttons[1].onclick=function(){
			new FormUsuario(this.dataHandler,Configuracion);
		}
		this.buttons[2].onclick=function(){
			//new FormUsuario(this.dataHandler,Configuracion);
		}
		this.buttons[3].onclick=function(){
			//new FormUsuario(this.dataHandler,Configuracion);
		}
	}
}

function TablaUsuario(table){
	this.modeloTabla = new TableModel(table,
		['ID','Nro','Nombre','Apellido','Nombre de Usuario','Tipo de Usuario','Estado']
		,['0','7%','25%','25%','20%','15%','8%']);
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
		this.modeloTabla.updateRows(this.setRows(usuarios));
	}

}


