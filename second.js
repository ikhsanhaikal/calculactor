const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers");
const operators_btn = document.querySelectorAll(".operators");
const clear = document.querySelector(".clear");
let order = [];
let stack1 = [],
  stack2 = [];
let tmp = "";
let isReady = false;
let divisionByZero = false;

numbers.forEach(function (number) {
  number.addEventListener("click", () => {
    if (divisionByZero) {
      display.textContent = number.textContent;
      divisionByZero = false;
      order = [];
      return;
    }
    if (isReady) {
      display.textContent = number.textContent;
      console.log("ready: ", display.textContent);
      tmp = display.textContent;
      isReady = false;
      return;
    }
    if (display.textContent === "0") {
      display.textContent = number.textContent;
      tmp = display.textContent;
      return;
    }
    display.textContent += number.textContent;
    tmp = display.textContent;
  });
});

operators_btn.forEach(function (operator) {
  operator.addEventListener("click", function () {
    isReady = true;
    if (stack1.length < 1) {
      stack1.push(display.textContent);
      stack2.push(operator.textContent);
    } else {
      if (tmp === "") {
        stack2.shift();
        stack2.push(operator.textContent);
      } else {
        stack1.push(tmp);
        stack2.push(operator.textContent);
        operate(stack2.shift(), stack1.shift(), stack1.shift());
      }
    }
    tmp = "";
  });
});

clear.addEventListener("click", function () {
  stack1 = [];
  stack2 = [];
  display.textContent = 0;
});

/*--------------------------------------------------*/

function operate(operator, lval, rval) {
  lval = Number.parseInt(lval);
  rval = Number.parseInt(rval);
  switch (operator) {
    case "+":
      display.textContent = lval + rval;
      stack1.push(display.textContent);
      break;
    case "-":
      display.textContent = lval - rval;
      stack1.push(display.textContent);
      break;
    case "×":
      display.textContent = lval * rval;
      stack1.push(display.textContent);
      break;
    case "÷":
      if (rval === 0) {
        display.textContent = "Nope!";
        divisionByZero = true;
        stack2.pop();
        isReady = false;
        break;
      }
      display.textContent = lval / rval;
      stack1.push(display.textContent);
      break;
    default:
      console.log("operator is not defined");
  }
  if (stack2[0] == "=") {
    stack1.pop();
    stack2.pop();
  }
}
