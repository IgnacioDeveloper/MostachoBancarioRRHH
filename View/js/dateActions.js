function DateActions(){
	this.prepareSelects=function(selectDia,selectMes,selectAnio){
		selectDia = this.getDayRange(31);
		selectMes = this.getMesRange();
		selectAnio = this.getAnioRange();
	}

	this.correctSelects=function(selectDia,selectMes,selectAnio){
		var mes = selectMes.value;
		var anio = selectAnio.value;
		var dias = getDaysCount(mes,anio);
		if(selectDia[selectDia.length-1] !== dias){
			selectDia=[];
			selectDia=getDayRange(dias);
		}
	}

	this.getDaysCount=function(mes,anio){
		switch(mes){
			case 1:
			case 3:
			case 7:
			case 8:
			case 10:
			case 12: return 31;
			case 2: if(anio % 4 === 0) return 29 else return 28;
			default: return 30;
		}
	}

	this.getDayRange=function(numero){
		var range=['Dia'];
		for(i=0;i<numero;i++){
			range.push(++i);
		}
		return range;
	}

	this.getMesRange=function(){
		return ['Mes','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	}

	this.getAnioRange = function(){
		var anioActual = 2017;
		var range = ['Año'];
		for(i=anioActual;i>1899;i--){
			range.push(i);
		}
		return range;
	}

	this.dateToSQL=function(dia,mes,año){
		
	}

	this.SQLtoDate=function(date){

	}

	this.getNow=function(){

	}
}