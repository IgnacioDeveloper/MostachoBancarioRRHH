function ListaPuestos(sector,dataHandler){
	this.sector = sector;
	this.dataHandler = dataHandler;
	this.barraBusqueda = null;
	this.tablaLista = null;
	this.barraOperaciones = null;
	this.columns = [];
	this.rows = [];
	this.puestos = [];
	this.indicesInteres = [];
	this.condicion = '1';

	this.startLista=function(){
		this.renderLista();
		this.getDataPuestos(this.condicion);
	}

	this.getDataPuestos=function(){
		var params = 'metodo=getPuestos&params={"condicion":"1"}';
		var metodo = 'getPuestos';
		console.log(params);
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	}

	this.updatePuestos=function(puestos){
		puestos = JSON.parse(puestos);
		this.puestos = puestos;
		this.updateList();
	}

	this.updateList=function(){
		this.appendRows(this.setRows());
	}

	this.appendRow=function(row){
		var rowNode = this.tablaLista.insertRow(this.tablaLista.length);
		var cellNode,start;
		for(j=0;j<row.length;j++){
			cellNode = rowNode.insertCell(j);
			cellNode.innerHTML=row[j];
		}
		this.rows.push(rowNode);
	}

	this.appendRows=function(rows){
		this.removeAllDataRows();
		for(i=0;i<rows.length;i++){
			this.appendRow(rows[i].splice(1));
			console.log(rows);
			//rows[i].setAttribute('data-value',rows[i][0]);
		}
		this.rows = rows;
	}

	this.setRows=function(){
		var i=0,j=0;
		var rows=[];
		if(this.condicion === '1'){
			for(i=0;i<this.puestos.length;i++){
				rows[i]=new Array(3);
				rows[i][0]=this.puestos[i].idPuesto;
				rows[i][1]=this.puestos[i].codigo;
				rows[i][2]=this.puestos[i].nombrePuesto;
			}
		}
			
		return rows;
	}

	this.removeAllDataRows=function(){
		for(i=this.rows.length;i>0;i--){
			this.tableElement.deleteRow(i);
		}
	}

	this.renderLista=function(){
		this.renderBarraBusqueda();
		this.renderTablaLista();
		this.renderOperaciones();
	}

	this.renderBarraBusqueda=function(){
		this.barraBusqueda = document.createElement('div');
		this.barraBusqueda.className = 'barraBusqueda';
		var lblCriterio = document.createElement('p');
		lblCriterio.innerHTML = 'Buscar por nombre: ';
		var inputCriterio = document.createElement('input');
		inputCriterio.id = 'inputCriterioPuestos';
		var btnBuscar = document.createElement('button');
		btnBuscar.innerHTML = 'Buscar';
		this.barraBusqueda.appendChild(lblCriterio);
		this.barraBusqueda.appendChild(inputCriterio);
		this.barraBusqueda.appendChild(btnBuscar);
		this.sector.appendChild(this.barraBusqueda);
	}

	this.renderTablaLista = function(){
		this.tablaLista = document.createElement('table');
		this.tablaLista.className = 'tablaLista';
		var rowNode = this.tablaLista.insertRow(0);
		var headers = ['Codigo','Nombre'];
		rowNode.className='headers';
		var cellNode;
		for(i=0;i<headers.length;i++){
			cellNode = rowNode.insertCell(i);
			cellNode.className = 'header-cell';
			cellNode.innerHTML=headers[i];
			this.columns.push(cellNode);
		}
		this.setColumnsWidth(['2%','8%']);
		this.sector.appendChild(this.tablaLista);
	}

	this.setColumnsWidth=function(widths){
		//Padres en el siguiente orden --> fila, tbody, table, main;
		for(i=0;i<widths.length;i++)
			this.columns[i].style.width=widths[i];
	}

	this.renderOperaciones=function(){
		this.barraOperaciones = document.createElement('div');
		this.barraOperaciones.className = 'barraOperaciones';
		var lblOperacion = document.createElement('p');
		lblOperacion.innerHTML = 'Operacion a realizar: ';
		var selectOperacion = this.prepareSelectOperacion();
		var btnOperacion = document.createElement('button');
		btnOperacion.innerHTML='Realizar Operacion';
		this.barraOperaciones.appendChild(lblOperacion);
		this.barraOperaciones.appendChild(selectOperacion);
		this.barraOperaciones.appendChild(btnOperacion);
		this.sector.appendChild(this.barraOperaciones);
	}

	this.prepareSelectOperacion=function(){
		var selectOperacion = document.createElement('select');
		var options = ['Añadir Puestos','Modificar Puesto', 'Consultar Puesto', 'Eliminar Puesto'];
		for(i=0;i<options.length;i++){
			selectOperacion.options[i] = new Option(options[i],i);
		}
		return selectOperacion;
	}

	this.startLista();

}