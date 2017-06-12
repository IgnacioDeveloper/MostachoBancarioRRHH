window.onload=function(){
	var boton = document.getElementById("boton");
	var input = document.getElementsByTagName("INPUT")[0];
	var errorMessage = document.getElementsByTagName("P")[0];
	var reExpression = /^[\w]+$/;
	var reVacio =/^[ ]*$/;
	var mensaje =" Hey there ";
	var elemento = new ElementoHTML(input,errorMessage);
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