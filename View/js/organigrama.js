function Organigrama(parent,sector,dataHandler){
	this.parent = parent;
	this.sector=sector;
	this.dataHandler=dataHandler;
	this.organigramaContainer=null;
	this.entregramas = [];
	this.idSeleccionado = null;
	this.descripcionSeleccionado = null;

	this.startOrganigrama=function(){
		this.renderOrganigramaContainer();
		this.requestAreas();	
	}

	this.renderOrganigramaContainer=function(){
		this.organigramaContainer = document.createElement('div');
		this.organigramaContainer.id='organigrama';
		this.organigramaContainer.className='organigrama';
		this.sector.appendChild(this.organigramaContainer);
	}

	this.requestAreas=function(){
		var params = 'metodo=getAreas&params={"condicion":"1"}'
		this.dataHandler.ejecutarOperacionAJAX(this,'getAreas',params);
	}

	this.updateAreas=function(areas){
		console.log(areas);
		this.renderOrganigrama(JSON.parse(areas));
	}

	this.renderOrganigrama=function(areas){
		var self = this;
		console.log(areas);
		google.charts.load('current', {packages:["orgchart"]});
      	google.charts.setOnLoadCallback(drawChart);
		function drawChart() {
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Name');
			data.addColumn('string', 'Manager');
			data.addColumn('string', 'ToolTip');

			// For each orgchart box, provide the name, manager, and tooltip to show.
			for(i=0;i<areas.length;i++){
	        	var idArea = areas[i].idArea;
	        	var name =areas[i].descripcion;
	        	var managerId = (areas[i].Area_idAreaSuperior==='0')?'':areas[i].Area_idAreaSuperior;
	        	var tooltip = name;
	        	var entregrama = [{v:idArea,f:name},managerId,tooltip];
	        	self.entregramas.push(entregrama);
	        }
	        console.log(self.entregramas);
	         data.addRows(self.entregramas);

			// Create the chart.
			var chart = new google.visualization.OrgChart(self.organigramaContainer);
			// Draw the chart, setting the allowHtml option to true for the tooltips.
			chart.draw(data, {allowHtml:true});

			google.visualization.events.addListener(chart, 'select', function(){
				var selection = chart.getSelection();
			    if (selection.length > 0) {
			        var c = selection[0];
			        self.idSeleccionado = data.getValue(c.row, 0);
			        self.descripcionSeleccionado = data.getFormattedValue(c.row, 0);
			    }
			    self.returnUpdateResponse('update');
			});
		}
    }

    this.returnUpdateResponse=function(){
    	this.parent.updatedValues();
    }
      	

	this.startOrganigrama();
    
}
