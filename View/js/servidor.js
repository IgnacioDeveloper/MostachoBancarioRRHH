function Servidor(){
	"use strict";
	if(Servidor.singleInstance) return Servidor.singleInstance;  
   	Servidor.singleInstance = this;

   	this.ejecutarOperacionAJAX=function(operacion,params,postFuncion){
	   	var resultado = "";
		var ajax_url  = "http://localhost/MostachoRRHH/Controller/Controlador.php";
		var ajax_request = new XMLHttpRequest();
		ajax_request.open("POST",ajax_url,true);
		ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax_request.send(params);
		ajax_request.onreadystatechange=function(){
			if(ajax_request.readyState == 4 && ajax_request.status == 200){
				switch(operacion){
					case "getNowUser": setUserInfo(ajax_request.responseText); break;
					case "destroySession": closeMenuPrincipal(ajax_request.responseText); break;
					case "saveUsuario":break; 
					case "modifyUsuario":break;
					case "deleteUsuario":break; 
					case "getUsuario":break;
					case "getUsuarios":break;
					case "saveArea":break; 
					case "modifyArea":break;
					case "deleteArea":break; 
					case "getArea":break;
					case "getAreas":break;
					case "savePuesto":break; 
					case "modifyPuesto":break;
					case "deletePuesto":break; 
					case "getPuesto":break;
					case "getPuestos":break;
					case "savePersona":break; 
					case "modifyPersona":break;
					case "deletePersona":break; 
					case "getPersona":break;
					case "getPersonas":break;
				}
			}
		}
   	}
}