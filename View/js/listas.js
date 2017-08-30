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
	this.areas = null;
	this.showPuestos;
	this.indicesInteres = [];
	this.areaTarget = null;
	this.condicion = '1';

	this.startLista=function(){
		this.clearSector();
		this.getAllAreas();
	}

	this.prepareLista=function(){
		this.renderLista();
		this.getDataPuestos();
		this.eventos();
	}

	this.getAllAreas=function(){
		var params = 'metodo=getAreas&params={"condicion":"1"}';
		var metodo = 'getAreas';
		new DataHandler().ejecutarOperacionAJAX(this,metodo,params);
	}

	this.clearSector=function(){
		while(sector.hasChildNodes){
			if(sector.lastChild.nodeName!== 'P'){
				sector.removeChild(sector.lastChild);
			}
			else{
				break;
			}
		}
	}

	this.updateAreas=function(areas){
		areas = JSON.parse(areas);
		this.areas = areas;
		this.prepareLista();
	}

	this.getDataPuestos=function(){
		var params = 'metodo=getPuestos&params={"condicion":"'+this.condicion+'"}';
		var metodo = 'getPuestos';
		console.log(params)
		this.dataHandler.ejecutarOperacionAJAX(this,metodo,params);
	}

	this.updatePuestos=function(puestos){
		if(puestos!=='1'){
			puestos = JSON.parse(puestos);
			this.puestos = puestos;
			this.updateList();
		}else{
			this.getDataPuestos();
		}
		
	}

	this.updateInfo=function(){
		this.updateList();
	}

	this.updateList=function(){
		this.updateRows(this.setRows(),true);
		if(this.areaTarget!== null)this.filterArea();
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

	this.filterArea=function(){
		var cantPuestos = 0;
		for(i=0;i<this.rows.length;i++){
			if(this.rows[i].getAttribute('descripcion-area').startsWith(this.areaTarget)){
				this.rows[i].style.display = 'table-row';
				cantPuestos++;
			} else {
				this.rows[i].style.display = 'none';
			}
		} 
		return cantPuestos;
	}

	this.updateInfo=function(){
		this.getDataPuestos();
	}

	this.appendRow=function(row){
		var rowNode = this.tablaLista.insertRow(this.tablaLista.length);
		var cellNode,start;
		for(k=0;k<row.length;k++){
			cellNode = rowNode.insertCell(k);
			cellNode.innerHTML=row[k];
		}
		this.rows.push(this.tablaLista.firstChild.lastChild);
		console.log(this.rows[this.rows.length-1]);
	}

	this.updateRows = function(rows,isId){
		this.removeAllDataRows();
		if(isId){	
			console.log(rows);
			for(j=0;j<rows.length;j++){
				this.appendRow(rows[j].splice(1));
				this.rows[j].setAttribute('data-value',rows[j][0].idPuesto);
				this.rows[j].setAttribute('descripcion-area',this.traducirIdArea(rows[j][0].idArea));
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
		var rows=[];
		console.log(this.puestos);
		if(this.condicion === '1'){
			for(i=0;i<this.puestos.length;i++){
				rows[i]=new Array(3);
				rows[i][0]={idPuesto:this.puestos[i].idPuesto,idArea:this.puestos[i].Area_idArea};
				rows[i][1]=this.puestos[i].codigo;
				rows[i][2]=this.puestos[i].nombrePuesto;
			}
		}
		console.log(rows);
		return rows;
	}

	this.removeAllDataRows=function(){
		for(i=this.rows.length;i>0;i--){
			this.tablaLista.deleteRow(i);
		}
		this.rows=[];
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
		btnOperacion.innerHTML='Go';
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

	this.confirmDelete=function(extra){
		new Mensaje(this,'¿Esta seguro que desea borrar este registro?','condicion','delete',extra);
	}

	this.delete=function(registro){
		var id = this.selectedRow.getAttribute('data-value')
		var params = 'metodo=deletePuesto&params={"idPuesto":'+id+'}';
		this.dataHandler.ejecutarOperacionAJAX(this,'deletePuesto',params);
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
				{modal:modal,tipo:1},self); break;
				case '1': 
					if(self.checkSelected()){
						new FormPuesto(self.dataHandler,
						{modal:modal,tipo:2,
							idBuscado:self.selectedRow.getAttribute('data-value'),descripcionArea:self.selectedRow.getAttribute('descripcion-area')},
							self);
					}
					else{
						self.notSelected();
					}
					break;
				case '2':
					if(self.checkSelected()){
						new FormPuesto(self.dataHandler,
							{modal:modal,tipo:3,
								idBuscado:self.selectedRow.getAttribute('data-value'),descripcionArea:self.selectedRow.getAttribute('descripcion-area')},
								self);
					}
					else{
						self.notSelected();
					}break;
				case '3':
					if(self.checkSelected()){
							self.confirmDelete(self);
					}
					else{
						self.notSelected();
					}break;
			}
		}
	}

}
