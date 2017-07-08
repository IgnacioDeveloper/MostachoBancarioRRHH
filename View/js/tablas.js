function TableModel(table,headers){
	this.headers = headers;
	this.tableModel = table;
	this.columns=[];
	this.rows=[];
	this.selectedRow=undefined;

	this.startTableModel = function(rows){
		this.clearTableModel();
		this.addColumns();
		this.updateTableModel();
		this.tableModel.style.display='table';
	}

	this.

	this.updateTableModel = function(rows){
		this.rows = rows;
		this.removeAllRows();
		for(r in rows){
			this.appendRow(r);
		}
	}

	this.clearTableModel = function(){
		while(this.tableModel.hasChildNodes()){
			this.tableModel.removeChild(tableModel.lastChild);
		}
	}

	this.removeAllRows = function(){
		while(this.tableModel.hasChildNodes()){
			if(this.tableModel.lastChild.className != 'header')
				this.tableModel.removeChild(tableModel.lastChild);
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
		return e.target.parentNode;
	}

	//En los siguientes metodos el parametro row en la funcion hace referencia al objeto del DOM y n al numero de fila. El parametro column sigue siendo el numero de la columna.

	this.getValueAt=function(row,column){
		return row.getElementsByTagName('td')[column].innerHTML;
	}

	this.setValueAt=function(value,row,column){
		row.getElementsByTagName('td')[column].innerHTML = value;
	}

	this.setSelectedRow=function(row){
		this.tableModel.getElementsByClassName('selected')[0].classList.remove('selected');
		row.classList.add('selected');
	}

	this.unselectRow(){

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

}

function TablaUsuario(table){
	this.modeloTabla = new TableModel(table,
		['ID','Nro','Nombre','Apellido','Nombre de Usuario','Tipo de Usuario','Estado']
		,['0','7%','25%','25%','20%','15%','8%']);


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
		this.modeloTabla.updateTableModel(this.setRows(usuarios));
	}

}

function tableDataHandler(dataHandler){
	this.tabla;
	this.dataHandler = dataHandler;

	this.setTable=function(tabla){
		this.tabla=tabla;
	}

	this.filter=function(condicion){

	}

	
}


