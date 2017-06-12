//Reloj Portada

var lblReloj,lblFecha,serverTime;
(function(){
	iniciarDateTime();
	obtenerDateTime();
})();

function iniciarDateTime(){
	lblReloj=document.getElementById("lblReloj");
	lblFecha=document.getElementById("lblFecha");
}

function ejecutarDateTime(resultado){
	//Fri, 07 Apr 2017 16:53:14 Formato Resultado;
	//April 07, 2017 17:32:42 Formato JS;
	var mes = traductorMes(resultado.substring(8,11));
	var dia = resultado.substring(5,7);
	var ano = resultado.substring(12,16);
	var hora = resultado.substring(17,19);
	var minuto = resultado.substring(20,22);
	var segundo = resultado.substring(23,25);
	var fecha = mes+" "+dia+", "+ano+" "+hora+":"+minuto+":"+segundo;
	serverTime = new Date(fecha);
	setInterval(function(){
		serverTime.setMilliseconds(serverTime.getMilliseconds()+1000);
		mostrarDateTime(serverTime);
	}, 1000);
}

function traductorMes(mes){
	switch(mes){
		case "Jan":return "January";
		case "Feb":return "Febraury";
		case "Mar":return "March";
		case "Apr":return "April";
		case "May":return "May";
		case "Jun":return "June";
		case "Jul":return "Jule";
		case "Aug":return "August";
		case "Sep":return "September";
		case "Oct":return "October";
		case "Nov":return "November";
		case "Dec":return "December";
		default:return "undefined";
	}
}

function traductorSpanishMonths(mes){
	switch(mes){
		case 1 : return "Enero";
		case 2 : return "Febrero";
		case 3 : return "Marzo";
		case 4 : return "Abril";
		case 5 : return "Mayo";
		case 6 : return "Junio";
		case 7 : return "Julio";
		case 8 : return "Agosto";
		case 9 : return "Septiembre";
		case 10 : return "Octubre";
		case 11 : return "Noviembre";
		case 12 : return "Diciembre";
		default:return "undefined";
	}
}

function traductorSpanishDays(dia){
	switch(dia){
		case 0: return "Domingo";
		case 1: return "Lunes";
		case 2: return "Martes";
		case 3: return "Miercoles";
		case 4: return "Jueves";
		case 5: return "Viernes";
		case 6: return "Sabado";
	}
}

function mostrarDateTime(serverTime){
	var reloj = serverTime.getHours()+":"+serverTime.getMinutes()+":"+serverTime.getSeconds();
	var fecha = traductorSpanishDays(serverTime.getDay())+" "+serverTime.getDate()+" "+traductorSpanishMonths(serverTime.getMonth()+1)+" "+serverTime.getFullYear()
	lblReloj.innerHTML = reloj;
	lblFecha.innerHTML = fecha;
}


function obtenerDateTime(){
	var resultado = "";
	var ajax_url  = "http://localhost/MostachoRRHH/Model/Reloj/Reloj.php";
	var ajax_request = new XMLHttpRequest();
	ajax_request.open("POST",ajax_url,true);
	ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax_request.send();
	ajax_request.onreadystatechange=function(){
		if(ajax_request.readyState == 4 && ajax_request.status == 200){
			resultado = ajax_request.responseText;
			ejecutarDateTime(resultado);
		}
	}
}