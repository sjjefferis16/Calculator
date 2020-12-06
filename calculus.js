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

class ExpressionNode {
	constructor(lhs, rhs, operator) {
		this.lhs = lhs
		this.rhs = rhs
		this.operator = operator
	}
}

class NumberNode {
	constructor(val) {
		this.val = val;
	}
}

function calcFun() {
	LexicalAnalyzer(exp);
	console.log(lexemes);

	if (lexemes == []) {
		return;
	}

	var mt = ExpressionParser();
	var ans = evaluate(mt);
	console.log(ans);
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

	for(var i = 0; i < (lexemes.length - 1); i++){
		if(lexemes[i].val == "O"&&lexemes[i+1].val == "O"){
			invalid = true;
		}
	}

	if (invalid) {
		clearFun();
		document.getElementById("display").innerHTML = "Syntax ERROR";
	}
}


/**********************END LEXICAL ANALYSIS*************/

/**********************Expression Parser*************/

function ExpressionParser() {


	//before we do anything, create a spot to store prevSymbol, number data, and the expression tree. 
	//precVal will be used to determine where we add expressions.

	
	prevSymbol = "", curSymbol = "";
	var numNode = new NumberNode(0);
	var mainTree = new ExpressionNode(0, 0, 0);
	var nullTree = new ExpressionNode(0, 0, 0);
	precVal = true;

	//go through the lexemes assigning values and operators
	for (var i = 0; i < lexemes.length; i++) {
		var loclex = lexemes[i];
		console.log(mainTree.operator);

		//we're only adding one number at a time, so store it as an unmatch number node by default if its not an opperator.
		switch (loclex.name) {
			case "PLUS":
				updateTree("PLUS");  //maybe +  ect
				prevSymbol = "PLUS";
				break;
			case "MINUS":
				updateTree("MINUS");
				prevSymbol = "MINUS";
				break;
			case "TIMES":
				updateTree("TIMES");
				prevSymbol = "TIMES";
				break;
			case "DIVIDES":
				updateTree("DIVIDES");
				prevSymbol = "DIVIDES";
				break;
			case "POWER":
				updateTree("POWER");
				prevSymbol = "POWER";
				break;

			case "LPAREN":
				updateTree("LPAREN");  //--  something with prec values later forces a new subbranch into the tree. setting next real operator
				//                            on the trees right then going back op to the main tree and adding the newe operator
				//															as the parent () +  = + as parent for the new tree... focous on rhs operator managemnet i geuss
				prevSymbol = "LPAREN";
				break;
			case "RPAREN":
				updateTree("RPAREN");
				prevSymbol = "RPAREN";
				break;

			case "PI":
				numNode.val = 3.141592653589793238462643383279502884197169399375105820974944592307816406286;
				break;
			case "E":
				numNode.val = 2.7182818284590452353602874713527;
				break;
			default:
				numNode.val = loclex.val;
			//console.log(loclex.name);

		}

	}


	//to put the last number on, travel down the tree to the final null node
	var rnode = mainTree.rhs;
	
		if(rnode.hasOwnProperty('operator')){
			while(rnode.operator != 0){
				rnode = rnode.rhs;
			}
		}

	mainTree.rhs = JSON.parse(JSON.stringify(numNode));


	console.log(mainTree);

	return mainTree;

	//get precedence, then add to tree
	//also, this function is inside the expression parser function so that it can access maintree
	//and numnode as local variables.
	function updateTree(operator) {
		precVal = precedence(mainTree.operator, operator);


		//JSON.parse(JSON.stringify performs deep copies
			
			var mainTreeClone = JSON.parse(JSON.stringify(mainTree));
		if (precVal) {
			//this makes it so  expr OldOper nmNode  then next num
			//so that if + is lower prescidence it will be higher on the tree happening later
			//currently presidence is measured -1, -+ 1,  and */ 2 ect. OOOR inverse prec val?idk
			//may need to change prec func 
			var rnode = mainTree;
	
			if(rnode.hasOwnProperty('operator')){
				while(rnode.operator != 0){
					rnode = rnode.rhs;
				}
			}

			rnode.lhs = JSON.parse(JSON.stringify(numNode));
			rnode.operator = operator;
			rnode.rhs = mainTreeClone;
		}
		else {
			//push the current number to the far right side, then add on top
			var rnode = mainTree.rhs;
	
			if(rnode.hasOwnProperty('operator')){
				while(rnode.operator != 0){
					rnode = rnode.rhs;
				}
			}

			mainTree.rhs = JSON.parse(JSON.stringify(numNode));

			//make a new clone thats updated			
			mainTreeClone = JSON.parse(JSON.stringify(mainTree));

			

			mainTree.lhs = mainTreeClone;
			mainTree.operator = operator;
			mainTree.rhs = JSON.parse(JSON.stringify(nullTree));

			//mainTree.lhs = expresionNode(JSON.parse(JSON.stringify(numNode)), 0 , operator);
			//operator.rhs = JSON.parse(JSON.stringify(numNode)); ?
			//TODO if prec value falwse
		}
		/*
		if(precVal == 100){
			mainTree.lhs = numNode;
			mainTree.operator = operator;
		}
		else{
			if(precVal < 0){//not sure what to do but lower on the tree (main - new op)
				mainTree.lhs = operator;
				operator.rhs = numNode;
				//mainTree = new ExpressionNode(numNode, mainTree, operator);
			} else {//as above but on uper on the tree
				old = mainTree;
				mainTree.operator = operator;
				mainTree.lhs = old;
				//hnmmn??\/
				mainTree.rhs = numNode;
			}
		}
		/*
		if(precVal >= 0){
			//top node operator should become the * or / to evalute later
			mainTree.lhs = ExpressionNode(numNode, null, operator);
		} else { //evaluate sooner so make it the parent with the number on rhs
			//var = mainTree;
			if(operator == "POWER"){
				mainTree = ExpressionNode(numNode, null, operator);  //?? lh Associativity
			}
			else{
				mainTree = ExpressionNode(null, numNode, operator); 
			}
			//mainTree.rhs = ExpresionNode(var, NumberNode , operator);
			//or maybe good old tree.add(nodecreation )
		}
		mainTree.operator = prevSymbol;*/

	}

	// this is now a boolean statement, if next operator is greater than the root, it returns true
	function precedence(rootOperator, nextOperator) {
		r = precedenceValFun(rootOperator);
		n = precedenceValFun(nextOperator);
		// may need to be flipped to r > n
		return Boolean(r < n);
	}

	function precedenceValFun(operator) {

		switch (operator) {
			case 0:
				return -1;
			case "PLUS":
				return 0;
			case "MINUS":
				return 0;
			case "DIVIDES":
				return 1;
			case "TIMES":
				return 1;
			case "POWER":
				return 2;
				
			case "LPAREN":
				return 3;
			case "RPAREN":
				return 3;
		}

	}

}

//update the tree based on precedence, 			adding nodes to it.?  numb nodes?

//associativity shoudl come into play here  could check if oper is power manually?

/*
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

/*Evalutates the parser tree to return the answer.*/


function evaluate(treem) {
	//only number nodes have vals, so check for that
	//if it does, return the number.
	//if it doesnt send the left and right hand sides for their number 
	if (treem.hasOwnProperty('val')) {
		return treem.val;
	} else {
		var lhs = evaluate(treem.lhs);
		var rhs = evaluate(treem.rhs);
		var ans = exprApp(lhs, rhs, treem.operator);
		return ans;
	}

}

function exprApp(l, r, op) {
	switch (op) {
		case "PLUS":
			return l + r;
		case "MINUS":
			return l - r;
		case "DIVIDES":
			return l / r;
		case "TIMES":
			return l * r;
		case "POWER":
			return Math.pow(l, r);
	}
}

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