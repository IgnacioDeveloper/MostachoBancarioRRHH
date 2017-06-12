function Validacion(formulario){
	"use strict";
	if(Validacion.singleInstance) return Validacion.singleInstance;  
   	Validacion.singleInstance = this;
   	this.reExpVacio =/^[ ]*$/;
	this.reExpTextOnly = /^[A-Za-z][A-Za-z ,.]*[A-Za-z. ]*$/;
	this.reExpAlphanumeric = /^[[A-Za-z0-9. ]+$/;
	this.reExpAlphanumericSc = /^[A-Za-z0-9,.()/ ]+$/;
	this.reExpAlphanumericSs = /^[\w]+$/;
	this.reExpMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	this.reExpPhone = /^([0-9]{2}[-]?)?[0-9]{8}$|^([0-9]{3}[-]?)?[0-9]{7}$|^([0-9]{4}[-]?)?[0-9]{6}$/;
	this.reExpCuil = /^[0-9]{2}[-][0-9]{8}[-][0-9]$/;
	this.reExpInteger = /^[0-9]+$/;
	this.rePassword = /(.){8,}/
	this.reExpDouble = /^[0-9]+([.][0-9]+)?$/;

	this.formulario = formulario;
	this.formBodyElements;
	//ValValues
	this.txts=new Array();
	this.selects=new Array();
	this.submitButton;
	//End ValValues

	this.setVal=function(){	
		this.clearValValues();
		this.setValValues();
		if(this.txts.length != 0) this.aplicarLostFocusTxtVal();
		if(this.selects.length != 0) this.setAutoRecSelects();
	}

	this.setValValues=function(){
		for(i in this.formBodyElements){
			var node = this.formBodyElements[i].element.nodeName;
			switch(node){
				case "INPUT":this.txts.push(this.formBodyElements[i]);break;
				case "SELECT": this.selects.push(this.formBodyElements[i]);break;
			}
		}
		this.submitButton=this.formulario.button1;
	}

	this.clearValValues=function(){
		this.txts = [];
		this.selects = [];
		this.submitButton = undefined;
	}

	this.aplicarLostFocusTxtVal = function(){
		var validacion = this;
		for(i in this.txts){
			var txt = this.txts[i];
			switch(txt.valType){
				case "textOnly" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valTextOnly(this);else validacion.setNormal(this);},false);break;
				case "alphanumeric" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valAlphanumeric(this);else validacion.setNormal(this);},false);break;
				case "alphanumericSc" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valAlphanumericSc(this);else validacion.setNormal(this);},false);break;
				case "alphanumericSs" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valAlphanumericSs(this);else validacion.setNormal(this);},false);break;
				case "password" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valPassword(this);else validacion.setNormal(this);},false);break;
				case "mail" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valMail(this);else validacion.setNormal(this);},false);break;
				case "phone" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valPhone(this);else validacion.setNormal(this);},false);break;
				case "cuil" : txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valCuil(this);else validacion.setNormal(this);},false);break;
				case "integer": txt.element.addEventListenener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valInteger(this);else validacion.setNormal(this);},false);break;
				case "double": txt.element.addEventListener("blur",function(){if(!validacion.reExpVacio.test(this.value))validacion.valDouble(this);else validacion.setNormal(this);},false);break;
			}
		}
	}

	this.setAutoRecSelects=function(){
		var validacion = this;
		for(i in this.selects){
			this.selects[i].element.onblur=function(){
				validacion.setNormal(this);
			}
		}
	}
	
	this.setNormal = function(txt){
		txt.style.borderColor="black";
		txt.style.borderWidth="1px";
		txt.nextSibling.innerHTML="";
	}

	this.setError = function(txt){
		txt.style.borderColor="red";
		txt.style.borderWidth="medium";
	}

	this.valTextOnly=function(txt){
		var valor = txt.value;
		if(this.checkTextOnly(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe contener solo texto; ',' o '.'";
			return false;
		}
	}

	this.valAlphanumeric=function(txt){
		var valor = txt.value;
		if(this.checkAlphanumeric(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe contener solo caracteres alfanumericos";
			return false;
		}
	}

	this.valAlphanumericSc=function(txt){
		var valor = txt.value;
		if(this.checkAlphanumericSc(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe contener solo caracteres alfanumericos; '.'; ','; '()' y '/'";
			return false;
		}
	}

	this.valAlphanumericSs=function(txt){
		var valor = txt.value;
		if(this.checkAlphanumericSs(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe contener solo caracteres alfanumericos o '_'";
			return false;
		}
	}

	this.valPassword=function(txt){
		var valor = txt.value;
		if(this.checkPassword(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe contener al menos 8 caracteres";
			return false;
		}
	}

	this.valMail=function(txt){
		var valor = txt.value;
		if(this.checkMail(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe debe tener formato de email. Ej:example@gmail.com";
			return false;
		}
	}

	this.valPhone=function(txt){
		var valor = txt.value;
		if(this.checkPhone(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe ser numero de telefono";
			return false;
		}
	}

	this.valCuil=function(txt){
		var valor = txt.value;
		if(this.checkCuil(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe tener formato de CUIL: XX-XXXXXXXX-X";
			return false;
		}
	}
	this.valInteger=function(txt){
		var valor = txt.value;
		if(this.checkInteger(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe ser numero entero positivo";
			return false;
		}
	}

	this.valDouble=function(txt){
		var valor = txt.value;
		if(this.checkDouble(valor)){
			this.setNormal(txt);
			return true;
		}
		else{
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo debe ser numero entero o decimal positivo";
			return false;
		}
	}

	this.valEmpty=function(txt,must){
		var valor = txt.value;
		if(this.checkEmpty(valor) && must){
			this.setError(txt);
			txt.nextSibling.innerHTML="Este campo es obligatorio";
			return true;
		}
		else{
			this.setNormal(txt);
			return false;
		}
	}

	this.checkTextOnly=function(valor){
		if(this.reExpTextOnly.test(valor))return true;
		return false;
	}

	this.checkAlphanumeric=function(valor){
		if(this.reExpAlphanumeric.test(valor))return true;
		return false;
	}

	this.checkAlphanumericSc=function(valor){
		if(this.reExpAlphanumericSc.test(valor))return true;
		return false;
	}

	this.checkAlphanumericSs=function(valor){
		if(this.reExpAlphanumericSs.test(valor))return true;
		return false;
	}

	this.checkPassword=function(valor){
		if(this.rePassword.test(valor))return true;
		return false;
	}

	this.checkMail=function(valor){
		if(this.reExpMail.test(valor))return true;
		return false;
	}

	this.checkPhone=function(valor){
		if(this.reExpPhone.test(valor))return true;
		return false;
	}

	this.checkCuil=function(valor){
		if(this.reExpCuil.test(valor))return true;
		return false;
	}

	this.checkInteger=function(valor){
		if(this.reExpInteger.test(valor))return true;
		return false;
	}

	this.checkDouble=function(valor){
		if(this.reExpDouble.test(valor))return true;
		return false;
	}

	this.checkEmpty=function(valor){
		if(this.reExpVacio.test(valor))return true;
		return false;
	}
	
	this.fullTxtsCheck=function(){
		var ans= true;
		function invBool(bool){
			if(bool) return false; else return true;
		}
		for(i in this.txts){
			var sbans;
			var txt = this.txts[i];
			switch(txt.valType){
				case "textOnly" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valTextOnly(txt.element); else sbans=invBool(this.must);break;
				case "alphanumeric" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valAlphanumeric(txt.element); else sbans=invBool(this.must);break;
				case "alphanumericSc" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valAlphanumericSc(txt.element); else sbans=invBool(this.must);break;
				case "alphanumericSs" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valAlphanumericSs(txt.element); else sbans=invBool(this.must);break;
				case "password" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valPassword(txt.element); else sbans=invBool(this.must);;break;
				case "mail" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valMail(txt.element); else sbans=invBool(this.must);break;
				case "phone" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valPhone(txt.element); else sbans=invBool(this.must);break;
				case "cuil" : if(!this.valEmpty(txt.element,txt.must))sbans = this.valCuil(txt.element); else sbans=invBool(this.must);break;
				case "integer": if(!this.valEmpty(txt.element,txt.must))sbans = this.valInteger(txt.element); else sbans=invBool(this.must);break;
				case "double": if(!this.valEmpty(txt.element,txt.must))sbans = this.valDouble(txt.element); else sbans=invBool(this.must);break;
			}
			if(sbans == false)ans=false;
		}
		//alert("La respuesta del check de los cuadros de texto es: "+ ans);
		return ans;
	}

	this.fullSelectsCheck=function(){
		var ans = true;
		for(i in this.selects){
			var select = this.selects[i].element;
			if(select.selectedIndex == 0){
				ans = false;
				this.setError(select);
				select.nextSibling.innerHTML="Debe seleccionar una opcion";
			}
			else{
				this.setNormal(select);
			}
		}
		//alert("La respuesta del check de las opciones es: "+ ans);
		return ans;
	}
	

	this.fullCheck=function(){
		var ans = true;
		var sbans = [];
		if(this.txts.length!=0) sbans.push(this.fullTxtsCheck());
		if(this.selects.length!=0) sbans.push(this.fullSelectsCheck());
		for(i in sbans){if(!sbans[i]){ans=false;break;}}
		return ans;
	}

}