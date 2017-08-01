function DateActions(){
	
	this.prepareSelects=function(dateSelects){
		var self = this;
		var selectDia = dateSelects.firstChild;
		var selectMes = selectDia.nextSibling;
		var selectAnio = dateSelects.lastChild;
		var selects = [selectDia,selectMes,selectAnio];
		var optionsDia = this.getNumRange(31,'Dia');
		var optionsMes = this.getMesRange();
		var optionsMesValues = this.getNumRange(12,'Mes');
		var optionsAnio = this.getAnioRange();
		console.log(selectDia);
		console.log(selectMes);
		console.log(selectAnio);
		this.makeSelectReady(selectDia,optionsDia,optionsDia);
		this.makeSelectReady(selectMes,optionsMes,optionsMesValues);
		this.makeSelectReady(selectAnio,optionsAnio,optionsAnio);
		selectMes.addEventListener('blur',function(){self.correctSelects(selects);});
		selectAnio.addEventListener('blur',function(){self.correctSelects(selects);});
	}

	this.correctSelects=function(selects){
		var selectDia = selects[0];
		var selectMes = selects[1];
		var selectAnio = selects[2];
		var mes = selectMes.value;
		var anio = selectAnio.value;
		var dias = this.getDaysCount(mes,anio);
		if(selectDia.options.length-1 !== dias){
			var value = selectDia.value;
			this.clearSelect(selectDia);
			var optionsDia = this.getNumRange(dias,'Dia');
			this.makeSelectReady(selectDia,optionsDia,optionsDia);
			if(selectDia.lastChild.value<value)
				value = selectDia.lastChild.value;
			selectDia.value=value;
		}
	}

	this.clearSelect=function(select){
		while(select.hasChildNodes()){
			select.removeChild(select.lastChild);
		}
	}

	this.makeSelectReady=function(select,options,optionsValue){
		for(i=0;i<options.length;i++){
			select.options[i] = new Option(options[i],optionsValue[i]);
		}
	}

	this.getDaysCount=function(mes,anio){
		if(mes === 'Mes') mes = 0;
		if(anio ==='Año') anio = -1;
		mes = Number(mes);
		anio = Number(anio);
		switch(mes){
			case 1: 
			case 3: 
			case 7: 
			case 8: 
			case 10: 
			case 12: return 31; break;
			case 2: if(anio % 4 === 0) return 29; else return 28; break;
			default: return 30; break;
		}
	}

	this.getNumRange=function(numero,_default){
		var range=[_default];
		for(i=0;i<numero;i++){
			range.push(i+1);
		}
		return range;
	}

	this.getMesRange=function(){
		return ['Mes','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	}

	this.getAnioRange = function(){
		var anioActual = new Date().getFullYear()-17;
		var range = ['Año'];
		for(i=anioActual;i>1899;i--){
			range.push(i);
		}
		return range;
	}

	this.getDateString=function(dateSelects){
		var selectDia = dateSelects.firstChild;
		var selectMes = selectDia.nextSibling;
		var selectAnio = dateSelects.lastChild;
		return selectAnio.value+'-'+selectMes.value+'-'+selectDia.value;
	}

	this.dateToSQL=function(dateSelects){

	}

	this.SQLtoDate=function(date){

	}

	this.getNow=function(){

	}
}