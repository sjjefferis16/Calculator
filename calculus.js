var exp = "";
var ans = 0.0
var lexemes = [];

document.getElementById("(").addEventListener("click", function () { appendFun("(") });
document.getElementById(")").addEventListener("click", function () { appendFun(")") });
document.getElementById("pi").addEventListener("click", function () { appendFun("π") });
document.getElementById("^").addEventListener("click", function () { appendFun("^") });
document.getElementById("1").addEventListener("click", function () { appendFun("1") });
document.getElementById("2").addEventListener("click", function () { appendFun("2") });
document.getElementById("3").addEventListener("click", function () { appendFun("3") });
document.getElementById("+").addEventListener("click", function () { appendFun("+") });
document.getElementById("4").addEventListener("click", function () { appendFun("4") });
document.getElementById("5").addEventListener("click", function () { appendFun("5") });
document.getElementById("6").addEventListener("click", function () { appendFun("6") });
document.getElementById("-").addEventListener("click", function () { appendFun("-") });
document.getElementById("7").addEventListener("click", function () { appendFun("7") });
document.getElementById("8").addEventListener("click", function () { appendFun("8") });
document.getElementById("9").addEventListener("click", function () { appendFun("9") });
document.getElementById("*").addEventListener("click", function () { appendFun("*") });
document.getElementById(".").addEventListener("click", function () { appendFun(".") });
document.getElementById("0").addEventListener("click", function () { appendFun("0") });
document.getElementById("e").addEventListener("click", function () { appendFun("e") });
document.getElementById("/").addEventListener("click", function () { appendFun("/") });
document.getElementById("=").addEventListener("click", function () { calcFun() });
document.getElementById("clear").addEventListener("click", function () { clearFun() });

function calcFun() {
	LexicalAnalyzer(exp);
	console.log(lexemes);

	if (lexemes != []) {
		// parser goes here
	}
}

/****************BEGIN LEXICAL ANALYSIS********/
function LexicalAnalyzer(str) {
	i = str.length;
	c = 0;

	myNumStr = "";
	hasDecimal = false;
	invalid = false;

	//Keeps track of whether the parenthesis are balanced
	parenStack = 0;
	//Checks to see whether or not the previous value is valid
	prevVal = 0;
	preName = "";

	while (c < i) {

		switch (str[c]) {

			//keep doing this till end of number (frameworks)
			case '1': myNumStr += '1'; break;
			case '2': myNumStr += '2'; break;
			case '3': myNumStr += '3'; break;
			case '4': myNumStr += '4'; break;
			case '5': myNumStr += '5'; break;
			case '6': myNumStr += '6'; break;
			case '7': myNumStr += '7'; break;
			case '8': myNumStr += '8'; break;
			case '9': myNumStr += '9'; break;
			case '0': myNumStr += '0'; break;
			case '.':
				myNumStr += '.';
				if (hasDecimal === true) {
					invalid = true
				}
				hasDecimal = true;
				break;

			//symbol
			case 'e': appendLexemes("E", "S"); break;
			case 'π': appendLexemes("PI", "S"); break;

			//Operations
			case '^': appendLexemes("POWER", "O"); break;
			case '/': appendLexemes("DIVIDES", "O"); break;
			case '*': appendLexemes("TIMES", "O"); break;
			case '+': appendLexemes("PLUS", "O"); break;
			case '-': appendLexemes("MINUS", "O"); break;
			//PARENS
			case '(': appendLexemes("LPAREN", "P"); break;
			case ')': appendLexemes("RPAREN", "P"); break;
		}
		c++;
	}

	//checks if num there. if so add to end 
	if (myNumStr != "") {
		if (!hasDecimal) {
			appendLexemes("NUMBER", parseInt(myNumStr));
		}
		else {
			appendLexemes("NUMBER", parseFloat(myNumStr));
		}
		myNumStr = "";
		hasDecimal = false;
	}

	errorLog();

}


function appendLexemes(name, val) {
	//check for double opperations, and fail
	if (val == prevVal && (prevVal == "O")) {
		invalid = true;
	}

	//If an operator or paren is added, add the preceeding number and reset the appropriate values
	if (val == "O" || val == "P") {
		if (val == "O" && exp[c - 1] == "(") {
			invalid = true;
		}
		if (myNumStr != "") {
			if (!hasDecimal) {
				appendLexemes("NUMBER", parseInt(myNumStr));
			}
			else {
				appendLexemes("NUMBER", parseFloat(myNumStr));
			}
			myNumStr = "";
			hasDecimal = false;
		}
	}

	//match l r parens,
	if (name == "LPAREN") {
		parenStack += 1;
	}

	if (name == "RPAREN") {
		parenStack -= 1;
		if (preName == "LPAREN") {
			invalid = true;
		}
	}

	if (parenStack < 0) {
		invalid = true;
	}

	//Create an object that has a tag and describes the object, adding it to the list
	let lexObject = {
		"name": name,
		"val": val
	}
	lexemes.push(lexObject);

	prevVal = val;
	preName = name;

}

//match l r parens,
//check for double opperations, and fail
function errorLog() {
	if (parenStack != 0) {
		invalid = true;
	}

	if (invalid) {
		clearFun();
		document.getElementById("display").innerHTML = "Syntax ERROR";
	}
}


/**********************END LEXICAL ANALYSIS*************/

/**********************Expression Parser*************/


expr (prev_precedence=-1):
 lhs <- term()
 while (true){
 op <- nextLexeme(); // ensure that it’s an operator
 curr_precedence <- precedence(op)
 if (curr_precedence < prev_precedence){
 break;
 }
 if (association(op) == left_to_right){
 rhs <- expr(curr_precedence + 1);
 }
 else{
	rhs <- expr(curr_precedence);
	lhs = ExpressionNode (lhs, op, rhs);
 }
}
 return lhs;
term():
 val <- nextLexeme()
 if (val is NUMBER){
 return NumberNode (val.value);
 }
 else if (val is PI){
 return NumberNode (3.141592653589793238462643383279502884197169399375105820974944592307816406286);
 }
 else if (val is E){
 return NumberNode (2.7182818284590452353602874713527);
 }
 else if (val is LPAREN){
 node ß expr();
 assert (nextLexeme() is RPAREN);
 return node;
 }
 else{
	// return -0;
	 // failure – expected number but got something else
 }
 
*/
/**********************End Expression Parser*************/

/**********************Expression Evaluator*************/
/*
Evalutates the parser tree to return the answer.
*/
/*
function evaluate(node) {
	if (node is ExpressionNode) { //node type is exprsion node.
		lhs = evaluate(node.lhs);
		rhs = evaluate(node.rhs);
		return
		lhs(node.op) rhs;
	}
 else {
		return node.value;
	}
}
*/
/**********************End Expression Evaluator*************/
function clearFun() {
	exp = "";
	ans = 0.0
	lexemes = [];
	document.getElementById("display").innerHTML = "|";
	console.log(exp);
}

function appendFun(val) {
	exp += val;
	document.getElementById("display").innerHTML = exp;
	console.log(exp);
}
