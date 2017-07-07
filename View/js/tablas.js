function TableModel(table,headers){
	this.headers = headers;
	this.tableModel = table;
	this.rows=[];

	this.showTableModel = function(rows){
		this.tableModel.style.display='table';
	}

	this.updateTableModel = function(rows){
		this.rows = rows;
		this.clearTableModel();
		this.loadTableModel();
	}

	this.clearTableModel = function(){
		while(this.tableModel.hasChildNodes()){
			this.tableModel.removeChild(tableModel.lastChild);
		}
	}

	this.loadTableModel = function(){
		var encabezados = [];
		for(i=0;i<this.headers.length;i++){
			encabezado[i] = {textInside:this.headers[i],tipo:'headerCell'};
		}
		this.appendRow(encabezado);
		if(this.dataRows.length==0) break;

	}

	this.appendRow=function(row){
		//rowNode se usa como fila de encabezado como para el resto de las filas de la tabla.
		var rowNode = document.createElement("tr");
		var cellNode;
		for(r in row){
			cellNode = document.createElement('td');
			cellNode.className = r.tipo;
			cellNode.innerHTML=r.textInside;
			rowNode.append(cellNode);
		}
		this.tableModel.appendChild(rowNode);
	}
}

function TablaUsuario(table){
	this.headers=['ID','Nro','Nombre','Apellido','Nombre de Usuario','Tipo de Usuario','Estado'];
	TableModel.call(this,headers,table);

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
	}

	this.clearRows=function(){
		this.clearTableModel();
	}
}

