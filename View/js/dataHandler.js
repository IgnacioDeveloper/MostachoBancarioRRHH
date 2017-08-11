function DataHandler(){
	"use strict";
	if(DataHandler.singleInstance) return DataHandler.singleInstance;  
   	DataHandler.singleInstance = this;

   	this.ejecutarOperacionAJAX=function(callContext,operacion,params){
   		var ajax_request = this.getAjaxRequest("http://localhost/MostachoRRHH/Controller/Controlador.php","POST");
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
					case "savePersona":callContext.subirCV(ajax_request.responseText);break; 
					case "modifyPersona":callContext.subirCV(ajax_request.responseText);break;
					case "deletePersona":callContext.updateInfo();break; 
					case "getPersona":callContext.setFormData(ajax_request.responseText);break;
					case "getPersonas":callContext.updateTableInfo(ajax_request.responseText);break;
				}
			}
		}
   	}


   	this.ejecutarOperacionArchivoAJAX=function(callContext,operacion,id,archivo){
   		var ajax_request = this.getAjaxRequest("http://localhost/MostachoRRHH/Controller/Controlador.php","POST");
   		var formData = new FormData(); //establecida la codificacion "multi-part/form-data por default"
   		formData.append('metodo',operacion);
   		formData.append('params','{"idPersona":'+id+'}');
   		console.log(archivo);
   		if(archivo!==undefined){console.log('El archivo esta definido');formData.append('cvFile',archivo);};
   		/*for (var pair of formData.entries()){
			 console.log(pair[0]+ ', '+ pair[1]); 
		}*/
   		ajax_request.send(formData);
   		ajax_request.onreadystatechange=function(){
   			if(ajax_request.readyState == 4 && ajax_request.status == 200){
				switch(operacion){
					case 'saveFile':callContext.confirmacion(ajax_request.responseText,1);break;
					case 'deleteFile':callContext.updateInfo(ajax_request.responseText);break;
				}
			}
   		}
   	}

   	this.getAjaxRequest=function(ajax_url,method){
   		var ajax_request = new XMLHttpRequest();
		ajax_request.open(method,ajax_url,true);
		return ajax_request;
   	}

}