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
	// takes in a string an then analysises it and spits out errors if it doesn check out
function analysises(str) {
    i = str.length;
    c = 0;

while (c < i) {
        //read in c(string pos)

        //find if num before
        mynumstr;        
        perbool = false;
        while (str[c].isNum()) {

            switch (str[c]) {  //next c //if nan or ws exit this 
                case '.': if (perbool == true) { throw "NaN error: multiple '.'s." } perbool = true;
                    mynumstr.append('.'); break;
                case '1': mynumstr.append('1'); break;
                case '2': mynumstr.append('2'); break;
                case '3': mynumstr.append('3'); break;
                case '4': mynumstr.append('4'); break;
                case '5': mynumstr.append('5'); break;
                case '6': mynumstr.append('6'); break;
                case '7': mynumstr.append('7'); break;
                case '8': mynumstr.append('8'); break;
                case '9': mynumstr.append('9'); break;
                case '0': mynumstr.append('0'); break;
                default:
                    break;

            }
            c++;

        }
        
    
//new num added to lex and other stuff is skipped

// is op/ws/sybmbol
 else if (str.hasNextchar()) {
            ' '
        }
        if operation match case

        if symbol  if p get next i

 //eiter π or e
 else if e then good.c
 else end
        //turn to add to string(append)
    }
}

}

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
