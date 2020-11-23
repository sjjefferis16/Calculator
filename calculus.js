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

/*
Takes in a stirng *it's fuckign RAW*.
looks at each char to turn into a object, if it's a number then it isolates it. 
/ mini
->gets next thing. makes it a object, appends it, and moves on. 
-> checks whole contrsturct for lexical correctness

objects: 
L paren
R paren
symbol
number
operation

theese are appened then string like to an array or stream(>>what do stieams so)

//for futher specs insert lexems into array at start of the lexem, then shrink array by removing all white space..(helper funct by javascript)

*/
function analysises(str) {
    i = str.length;
    c = 0;

	myNumStr;        
	perBool = false;
while (c < i) {
		//read in c(string pos)
		
    switch(str[c]){

		//keep doing this till end of number (frameworks)
		case '0': 		
		case '1': 
		case '2':
		case '3': 
		case '4':
		case '5':
		case '6': 
		case '7': 
		case '8': 
		case '9':
        case '.':// while (str[c].isNum()) 
	   {

            switch (str[c]) {  //next c //if nan or ws exit this 
				case '.': if (perBool == true) { throw console.error("NaN error: multiple '.'s." ); }
						  perBool = true;
                          myNumStr.append('.'); break;
                case '1': myNumStr.append('1'); break;
                case '2': myNumStr.append('2'); break;
                case '3': myNumStr.append('3'); break;
                case '4': myNumStr.append('4'); break;
                case '5': myNumStr.append('5'); break;
                case '6': myNumStr.append('6'); break;
                case '7': myNumStr.append('7'); break;
                case '8': myNumStr.append('8'); break;
                case '9': myNumStr.append('9'); break;
                case '0': myNumStr.append('0'); break;
                default:
					if(!perBool){
						appendNumber(stringToInt(myNumStr));
						myNumStr = "";
					}
					else{
						appendNumber(stringToFloat(myNumStr));
						myNumStr = "";
					  }
                    break;//to get out of thing (if this was no hte last it would qork with the rest, by asdding the number to the lexigram)

            }
            c++;
		
		}
		//symbol
        case 'e': appendSymbolE(); break;
		case 'π': appendSymbolPi(); break;

		//Operations
		case '^': appendOperatorPower(); break;
		case '/': appendOperatorDiv(); break;
		case '*': appendOperatorTimes(); break;
		case '+': appendOperatorPlus(); break;
		case '-': appendOperatorMinus(); break;
	
		//PARENS
		case '(': appendParenR(); break;
		case ')': appendParenL(); break;
	}
	c++;
    
//new num added to lex and other stuff is skipped

}


//checks if num there. sif so add to end ?? >>extra.
}
//match l r parens, basicly )( , (().  should fail but ( ) pass   also if we shall allow for haning ()
//check for double opperations, and fail
//operation and ) should fail but oper and ( is ok

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
