function DataHandler(){
	"use strict";
	if(DataHandler.singleInstance) return DataHandler.singleInstance;  
   	DataHandler.singleInstance = this;

   	this.response="Ok"

   	this.ejecutarOperacionAJAX=function(callContext,operacion,params){
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
					case "saveUsuario": callContext.confirmacion(ajax_request.responseText,1);break; 
					case "modifyUsuario": callContext.confirmacion(ajax_request.responseText,2);break;
					case "setUsuarioPermit":callContext.updateInfo();break;
					case "getUsuario": callContext.setFormData(ajax_request.responseText);break;
					case "getUsuarios": callContext.updateTableInfo(ajax_request.responseText);break;
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