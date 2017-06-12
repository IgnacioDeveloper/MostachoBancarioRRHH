var lblReloj,serverTime;
(function(){
	iniciarReloj();
})();

function iniciarReloj(){
lblReloj=document.getElementById("lblReloj");
 obtenerHoraServidor();
}

function ejecutarReloj(resultado){
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
		mostrarHora(serverTime);
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

function mostrarHora(serverTime){
	var reloj = "Fecha y Hora del Servidor: "+serverTime.getDate()+"/"+(serverTime.getMonth()+1)+"/"+serverTime.getFullYear()+" "+serverTime.getHours()+":"+serverTime.getMinutes()+":"+serverTime.getSeconds();
	lblReloj.innerHTML=reloj;
}


function obtenerHoraServidor(){
	var resultado = "";
	var ajax_url  = "http://localhost/MostachoRRHH/Model/Reloj/Reloj.php";
	var ajax_request = new XMLHttpRequest();
	ajax_request.open("POST",ajax_url,true);
	ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax_request.send();
	ajax_request.onreadystatechange=function(){
		if(ajax_request.readyState == 4 && ajax_request.status == 200){
			resultado = ajax_request.responseText;
			ejecutarReloj(resultado);
		}
	}
}