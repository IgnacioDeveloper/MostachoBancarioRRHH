window.onload=function(){
	var boton = document.getElementById("boton");
	var input = document.getElementsByTagName("INPUT")[0];
	var errorMessage = document.getElementsByTagName("P")[0];
	var reExpression = /^[\w]+$/;
	var reVacio =/^[ ]*$/;
	var mensaje =" Hey there ";
	var elemento = new ElementoHTML(input,errorMessage);
	var lblValidacion = document.getElementById("lblValidacion");
	var tabla = document.getElementById("tabla");
	var elemento;
	var filtro = document.getElementById("filtroApellidos");
	var btnMensaje = document.getElementById("btnMensaje");
	var inputMensaje = document.getElementById('inputRespuestaMensaje');
	var btnSubirArchivo = document.getElementById('btnSubirArchivo');
	var inputFile = document.getElementById('inputFile');
	this.events(inputFile);

	lblValidacion.innerHTML="Validacion: "+reExpression;

	elemento.input.oninput=function(){
		elemento.errorMessage="";
	}

	boton.onclick=function(){
		alert(elemento.errorMessage);
		if(reVacio.test(input.value))alert("Cuadro de texto vacio");
		else{
		var resultadoValidacionTest = reExpression.test(elemento.input.value);
		//var resultadoValidacionMatch = input.value.match(reExpression);
		alert("Usando test :'"+input.value+"'"+": resultado de Validacion = "+resultadoValidacionTest);
		//alert("Usando .match :'"+input.value+"'"+": resultado de Validacion = "+resultadoValidacionMatch);
		if(!resultadoValidacionTest)setErrorMessage(elemento.errorMessage);else elemento.errorMessage = "";
		}
	}

	tabla.onclick=function(e){
		elemento.className = 'none';
		elemento = e.target.parentNode;
		elemento.className = 'selected';
		console.log(e.target.parentNode.getAttribute('data-value'));
	}

	btnMensaje.onclick=function(){
		new Mensaje(this,'Entonces cual es tu respuesta?','condicion');
		
	}


	
}

function events(inputFile){
		inputFile.onchange=function(){
		console.log(inputFile.files[0]);
		if(inputFile.files[0].type !== 'image/png'){
			var x=inputFile.parentNode;
			var elemento = x.firstChild.nextSibling.nextSibling.nextSibling;
			var elementoReferencia = elemento.nextSibling;
			x.removeChild(elemento);
			elemento = document.createElement('input');
			elemento.type = 'file';
			elemento.id = 'inputFile';
			inputFile = elemento;
			events(inputFile);
			x.insertBefore(elemento,elementoReferencia);
			return 0;
		}
		var formData = new FormData();
		var fileName = inputFile.files[0].name.split('.')[0].toUpperCase();
		console.log(fileName);
		formData.append('nombreArchivo',fileName);
		formData.append('file',inputFile.files[0]);
		var ajax_request = new XMLHttpRequest();
		ajax_request.open('POST','http://localhost/MostachoRRHH/Test/TestFiles.php',true);
		//ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		console.log(formData.get('file'));
		ajax_request.send(formData);
		ajax_request.onreadystatechange=function(){
			if(ajax_request.readyState == 4 && ajax_request.status == 200){
				console.log(ajax_request.responseText);
			}
		}
	}
}

function ElementoHTML(input,errorMessage){
	this.input = input;
	this.errorMessage = errorMessage;
}

function setErrorMessage(valErrorMessage){alert(valErrorMessage);valErrorMessage.innerHTML="Ha ocurrido un error durante la validacion";};

function loadScript(url){    
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    body.appendChild(script);
}

