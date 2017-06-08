function generateState(operation, numA, numB, result) {
    var newState = {
      numA: numA || 0,
      numB: numB || 0,
      operation: operation,
      result: result
    };
    return newState;
  }


function setNumber(state, newValue){
  if (state.operation == null){
    return generateState(state.operation, state.numA += newValue, state.numB, state.result);
  }
  else{
    return generateState(state.operation, state.numA, state.numB += newValue, state.result);
  }
}


function setOperator(state, newValue) {
    if (newValue == 'C') {
      return generateState();
    }
    return generateState(newValue, state.numA, state.numB, state.result);
  }


function calculate(state, newValue){
  var numA = parseFloat(state.numA);
  var numB = parseFloat(state.numB);
  var operation = state.operation;
  var result;
  if (numA == NaN || numB == NaN) {
      return generateState(null, null, null, 'Invalid');
    }
    switch (operation) {
        case '+':
          result = (numA + numB).toFixed(5);
          break;
        case '-':
          result = (numA - numB).toFixed(5);
          break;
        case '*':
          result = (numA * numB).toFixed(5);
          break;
        case '/':
          result = (numA / numB).toFixed(5);
          break;
        default:
          result = null;
      }
    return generateState(null,result,null,result);
}


function evaluate(state, newAction, newValue){
  switch(newAction){
    case 'number':
      return setNumber(state, newValue);
    case 'operation':
      return setOperator(state, newValue);
    case 'calculate':
      return calculate(state, newValue);
    default:
      return generateState(state.operator, state.numA, state.numB, state.result);
  }
}


function beautify(num) {
    var n = num
    if (n == undefined || n == NaN) {
      return 0;
    }
    return parseFloat(num);
  }


function printResult(state){
  elemA.innerHTML = parseFloat(state.numA);
  var numB = parseFloat(state.numB);
  if(!numB){
    numB=null;
  }
  elemB.innerHTML = numB;
  elemOperator.innerHTML = state.operation || null;
  elemResult.innerHTML = beautify(state.result);
}


function handleClick(event){
  var target = event.target;
  var action = target.getAttribute('data-action');
  var value = target.getAttribute('data-value');
  calculatorState = evaluate(calculatorState,action,value);
  printResult(calculatorState);
}

/*function handlePress(e){
  var keyCode = e.keyCode;
  var code = ""+String.fromCharCode(keyCode);
  var ele= getElementsByName('code');
  var action = ele.getAttribute('data-action');
  var value = ele.getAttribute('data-value');
  calculatorState = evaluate(calculatorState,action,value);
  printResult(calculatorState);
  alert(code);
}
*/

var calculator = document.getElementById('calc');
var elemA = document.getElementById('num-a');
var elemB = document.getElementById('num-b');
var elemOperator = document.getElementById('operator');
var elemResult = document.getElementById('result');
var calculatorState = generateState();

calculator.addEventListener("click", handleClick);
//calculator.addEventListener("keypress", handlePress;)
