const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const clear   = document.querySelector('.clear');
let order = [], lval;
let isReady = false;
let isError = false;
let hit = false;

/* display */
numbers.forEach(function(number){
    number.addEventListener('click', ()=>{
        if (isError) {display.textContent = number.textContent; isError = false; order = [];    return;}
        if (isReady) {display.textContent = number.textContent; isReady = false; return;}
        if (display.textContent === '0') {display.textContent = number.textContent; return;}
        display.textContent += number.textContent;
    })
})

/* display-2 
   when you pressed operand button then press number, all previous number that was diplayed gone 
*/
operators.forEach(function(operator) {
    operator.addEventListener('click', function() {
        if(operator.textContent === '+') {
            isReady = true;
            order.push(display.textContent);
            order.push(operator.textContent);
            console.log(order);
            if(order.length > 3) { 
                operate(order[1], parseInt(order[0]), parseInt(order[2])); 
            }
        }
        if(operator.textContent === '-') {
            isReady = true;
            order.push(display.textContent);
            order.push(operator.textContent);
            console.log(order);
            if(order.length > 3) { 
                operate(order[1], parseInt(order[0]), parseInt(order[2])); 
            }
        }
        if(operator.textContent === '×') {
            console.log('×');
            isReady = true;
            order.push(display.textContent);
            order.push(operator.textContent);
            console.log(order);
            if(order.length > 3) { 
                operate(order[1], parseInt(order[0]), parseInt(order[2])); 
            }
        }
        if(operator.textContent === '÷') {
            console.log('÷');
            isReady = true;
            order.push(display.textContent);
            order.push(operator.textContent);
            console.log(order);
            if(order.length > 3) { 
                operate(order[1], parseInt(order[0]), parseInt(order[2])); 
            }
        }
        if(operator.textContent === '=') {
            order.push(display.textContent);
            console.log(order);
            operate(order[1], parseInt(order[0]), parseInt(order[2]));
            order.shift();
        }
    })
})

clear.addEventListener('click', function() {
    order = [];
    display.textContent = 0;
})


/*--------------------------------------------------*/

function operate(operator, lval, rval) {
    switch (operator) {
        case '+':
            result = adding(lval, rval);
            order.shift();
            order.shift();
            display.textContent = result;
            order[0] = display.textContent;
            console.log('from operate',order);
            break;
        case '-':
            result = substract(lval, rval);
            order.shift();
            order.shift();
            display.textContent = result;
            order[0] = display.textContent;
            break;
        case '×':
            result = multiply(lval, rval);
            order.shift();
            order.shift();
            display.textContent = result;
            order[0] = display.textContent;
            break;
        case '÷':
            if(rval === 0) {
                display.textContent = 'Error'; 
                isError = true;
                break;
            }
            result = divide(lval, rval);
            order.shift();
            order.shift();
            display.textContent = result;
            order[0] = display.textContent;
            break;
        default:
            console.log('operator is not defined');
    }
}

/*--------------------------------------------------*/

function adding(lval, rval) {
    return lval + rval;
}

function substract(lval, rval) {
    return lval - rval;
}

function multiply(lval, rval) {
    return lval * rval;
}

function divide(lval, rval) {
    return lval / rval;
}

