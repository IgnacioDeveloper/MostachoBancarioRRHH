function DataHandler(){
	"use strict";
	if(DataHandler.singleInstance) return DataHandler.singleInstance;  
   	DataHandler.singleInstance = this;

   	this.ejecutarOperacionAJAX=function(callContext,operacion,params){
   		var ajax_request = this.getAjaxRequest("http://localhost/MostachoRRHH/Controller/Controlador.php","POST");
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
					case "savePersona":callContext.confirmacion(ajax_request.responseText,1);break; 
					case "modifyPersona":callContext.confirmacion(ajax_request.responseText,2);break;
					case "deletePersona":callContext.updateInfo();break; 
					case "getPersona":callContext.setFormData(ajax_request.responseText);break;
					case "getPersonas":callContext.updateTableInfo(ajax_request.responseText);break;
				}
			}
		}
   	}


   	this.subirArchivoAJAX=function(archivo){
   		var ajax_request = this.getAjaxRequest("http://localhost/MostachoRRHH/Controller/Controlador.php","POST");
   		formData = new FormData(); //establecida la codificacion "multi-part/form-data por default"
   		formData.append('cvFile',archivo);
   		ajax_request.send(formData);
   	}

   	this.getAjaxRequest=function(ajax_url,method){
   		var ajax_request = new XMLHttpRequest();
		ajax_request.open(method,ajax_url,true);
		ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		return ajax_request;
   	}

}