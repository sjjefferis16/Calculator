var exp = "";
var ans = 0.0

document.getElementById("(").addEventListener("click", function(){ appendFun("(") });
document.getElementById(")").addEventListener("click", function(){ appendFun(")") });
document.getElementById("pi").addEventListener("click", function(){ appendFun("π") });
document.getElementById("^").addEventListener("click", function(){ appendFun("^") });
document.getElementById("1").addEventListener("click", function(){ appendFun("1") });
document.getElementById("2").addEventListener("click", function(){ appendFun("2") });
document.getElementById("3").addEventListener("click", function(){ appendFun("3") });
document.getElementById("+").addEventListener("click", function(){ appendFun("+") });
document.getElementById("4").addEventListener("click", function(){ appendFun("4") });
document.getElementById("5").addEventListener("click", function(){ appendFun("5") });
document.getElementById("6").addEventListener("click", function(){ appendFun("6") });
document.getElementById("-").addEventListener("click", function(){ appendFun("-") });
document.getElementById("7").addEventListener("click", function(){ appendFun("7") });
document.getElementById("8").addEventListener("click", function(){ appendFun("8") });
document.getElementById("9").addEventListener("click", function(){ appendFun("9") });
document.getElementById("*").addEventListener("click", function(){ appendFun("*") });
document.getElementById(".").addEventListener("click", function(){ appendFun(".") });
document.getElementById("0").addEventListener("click", function(){ appendFun("0") });
document.getElementById("e").addEventListener("click", function(){ appendFun("e") });
document.getElementById("/").addEventListener("click", function(){ appendFun("/") });
document.getElementById("=").addEventListener("click", function(){ calcFun()});
document.getElementById("clear").addEventListener("click", function(){ clearFun()});

function calcFun(){
	// parser goes here

}

function clearFun(){
	exp = "";
	ans = 0.0
	document.getElementById("display").innerHTML = "|";
	console.log(exp);
}

function appendFun(val){
	exp += val;
	document.getElementById("display").innerHTML = exp;
	console.log(exp);
}
