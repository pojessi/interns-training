import {Calculator, Operation} from "./Calculator"
const calculator = new Calculator ();
calculator.input(121);
calculator.operation(Operation.MUL);
calculator.input(14);
console.log(calculator.result);