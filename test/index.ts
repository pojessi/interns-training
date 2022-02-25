import {Calculator, Operation} from "../src/Calculator"
import { describe } from 'mocha';
import { expect } from "chai";
import { error } from "node:console";

const calculator = new Calculator

describe('Calculator', () => {
    describe('ADD', () => {
        it('1 + 1 should be equals to 2', () => {
            calculator.input(1)
            calculator.operation(Operation.ADD);
            calculator.input(1);
            expect(calculator.result).to.equal(2);
        })
        it('should sum two numbers', () => {
            calculator.input(121);
            calculator.operation(Operation.ADD);
            calculator.input(14);
            expect(calculator.result).to.equal(135);
		})
        
    })  
    describe('SUB', () => {
        it('1 - 1 should be equals to 0', () => {
            calculator.input(1)
            calculator.operation(Operation.SUB);
            calculator.input(1)
            console.log(calculator.result);
        })
        it('should subtract two numbers', () => {
            calculator.input(9329);
            calculator.operation(Operation.SUB);
            calculator.input(603);
            console.log(calculator.result);
        })
    })
    describe('MUL', () => {
        it('1 * 1 should be equals to 1', () => {
            calculator.input(1);
            calculator.operation(Operation.MUL);
            calculator.input(1);
            console.log(calculator.result);
        })
        it('should multiply two numbers', () => {
            calculator.input(94);
            calculator.operation(Operation.MUL);
            calculator.input(2);
            console.log(calculator.result);
        })    
    })
    describe('DIV', () => {
        it('1 / 1 should be equals to 1', () => {
            calculator.input(1),
            calculator.operation(Operation.DIV);
            calculator.input(1);
            console.log(calculator.result);
        })
        it('should divide two numbers', () => {
            calculator.input(60);
            calculator.operation(Operation.DIV);
            calculator.input(4);
            expect(calculator.result).to.equal(15);
        })
    })    
           	
    describe('Error', () => {
        it('it should throw an error when we set two operation', () => {
            calculator.operation(Operation.ADD);
            expect(() => {calculator.operation(Operation.SUB)}).to.throw();
        })
    })


})











