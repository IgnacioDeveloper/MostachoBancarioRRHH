function ListaPuestos(sector,dataHandler){
	this.sector = sector;
	this.dataHandler = dataHandler;
	this.barraBusqueda = null;
	this.tablaLista = null;
	this.barraOperaciones = null;
	this.columns = [];
	this.rows = [];
	this.selectedRow = null;
	this.puestos = [];
	this.areas = areas;
	this.showPuestos;
	this.indicesInteres = [];
	this.condicion = '1';

	this.startLista=function(){
		this.getAllAreas();
	}

	this.prepareLista=function(){
		this.renderLista();
		this.getDataPuestos(this.condicion);
		this.eventos();
	}

	this.getAllAreas=function(){
		var params = 'metodo=getAreas&params={"condicion":"1"}';
		var metodo = 'getAreas';
		new DataHandler().ejecutarOperacionAJAX(this,metodo,params);
	}

	this.updateAreas=function(areas){
		areas = JSON.parse(areas);
		this.areas = areas;
		this.prepareLista();
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
		this.updateRows(this.setRows(),true);
	}

	this.filter=function(criterio){
		for(i=0;i<this.rows.length;i++){
			if(this.rows[i].lastChild.innerHTML.startsWith(criterio)){
				this.rows[i].style.display = 'table-row';
			} else {
				this.rows[i].style.display = 'none';
			}
		}
	}

	this.appendRow=function(row){
		var rowNode = this.tablaLista.insertRow(this.tablaLista.length);
		var cellNode,start;
		for(j=0;j<row.length;j++){
			cellNode = rowNode.insertCell(j);
			cellNode.innerHTML=row[j];
		}
		this.rows.push(this.tablaLista.firstChild.lastChild);
		console.log(this.rows[this.rows.length-1]);
	}

	this.updateRows = function(rows,isId){
		this.removeAllDataRows();
		if(isId){	
			for(i=0;i<rows.length;i++){
				this.appendRow(rows[i].splice(1));
				this.rows[i].setAttribute('data-value',rows[i][0]);
				this.rows[i].setAttribute('descripcionArea',rows[i][0]);
			}	
		}
		else{
			for(i=0;i<rows.length;i++){
				this.appendRow(rows[i]);
			}	
		}
	}

	this.traducirIdArea=function(id){
		if(id===0) return '-';
		for(i in this.areas){
			if(this.areas[i].idArea === id){
				return this.areas[i].descripcion;
			}
		}
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

	this.setSelectedRow=function(row){
		if(this.selectedRow!=null)this.clearSelectedRow();
		this.selectedRow = row;
		row.classList.add('selected');
	}

	this.clearSelectedRow=function(){
		this.selectedRow.classList.remove('selected');
		this.selectedRow = null
	}

	this.notSelected=function(){
		var messageContent = 'Debe seleccionar un registro para poder realizar esta operacion';
		new Mensaje(this,messageContent,"confirmacion");
	}

	this.checkSelected=function(){
		if(this.selectedRow!==null && this.selectedRow.nodeName === 'TR' && !this.selectedRow.classList.contains('headers')){
			return true;
		}
		return false;
	}

	this.eventos=function(){
		var self = this;
		//Tabla Seleccionar
		this.tablaLista.onclick=function(e){
			self.setSelectedRow(e.target.parentNode);
		};
		//Boton Buscar
		this.barraBusqueda.lastChild.onclick=function(){
			self.filter(this.previousSibling.value);
		}
		//Boton Ejecutar
		this.barraOperaciones.lastChild.onclick=function(){
			var modal = document.getElementById('formularioModal');
			var option = this.previousSibling.value;
			switch(option){
				case '0': new FormPuesto(self.dataHandler,
				{modal:modal,tipo:1}); break;
				case '1': 
					if(self.checkSelected()){
						new FormPuesto(self.dataHandler,
						{modal:modal,tipo:2,
							idBuscado:self.selectedRow.getAttribute('data-value'),descripcionArea:self.selectedRow.lastChild.innerHTML},
							this);
					}
					else{
						self.notSelected();
					}
					break;
				case '2':
					if(self.checkSelected()){
						new FormPuesto(self.dataHandler,
							{modal:modal,tipo:3,
								idBuscado:dataBarModel.registro.modeloTabla.selectedRow.getAttribute('data-value'),descripcionArea:dataBarModel.registro.modeloTabla.selectedRow.lastChild.innerHTML},
								dataBarModel.registro);
					}
					else{
						self.notSelected();
					}break;
				case '3':
					if(self.checkSelected()){
							self.confirmDelete(dataBarModel.registro);
					}
					else{
						self.notSelected();
					}break;
			}
		}
	}

	this.startLista();

}