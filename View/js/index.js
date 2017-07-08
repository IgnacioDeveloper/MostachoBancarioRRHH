var txtUsername, txtPassword, btnAcceso;

function Usuario(username,password){
	this.username=username;
	this.password=password;
}

function loadScript(url){    
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    body.appendChild(script);
}

window.onload=function(){
	loadScript("http://localhost/MostachoRRHH/View/js/relojPortada.js");
	txtUsername = document.getElementById("txtUsername");
	txtPassword = document.getElementById("txtPassword");
	btnAcceso = document.getElementById("btnAcceso");
	eventos();
}

function eventos(){
	btnAcceso.onclick=function(){
		var usuario = new Usuario(txtUsername.value,txtPassword.value);
		var usuarioJSON = JSON.stringify(usuario);
		var params="metodo=startUserSession&params="+usuarioJSON;
		ejecutarOperacionesAJAX(params);
	}
}

function ejecutarOperacionesAJAX(params){
	var resultado = "";
	var ajax_url  = "http://localhost/MostachoRRHH/Controller/Controlador.php";
	var ajax_request = new XMLHttpRequest();
	ajax_request.open("POST",ajax_url,true);
	ajax_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax_request.send(params);
	ajax_request.onreadystatechange=function(){
		if(ajax_request.readyState == 4 && ajax_request.status == 200){
			resultado = ajax_request.responseText;
			if(resultado == 1){
				abrirMenuPrincipal();
			}
			else{
				if(resultado == 0){
					alert("El usuario o la contraseña son incorrectos");
				}
				else if(resultado == 2){
					alert("Este usuario esta deshabilitado. Por favor contacte con el Departamento de TICs para conocer las razones por las que no puede ingresar al Sistema");
				}
			}
		}
	}
}

function abrirMenuPrincipal(){
	location.href = "menuPrincipal.html";
}