import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators: string[] = ['+', '-', '*', '/', '%'];
const specialOperators: string[] = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private _resultText: BehaviorSubject<string>;
  private _subResultText: BehaviorSubject<string>;
  private _lastOperator: BehaviorSubject<string>;

  constructor() {
    this._resultText = new BehaviorSubject<string>('0');
    this._subResultText = new BehaviorSubject<string>('0');
    this._lastOperator = new BehaviorSubject<string>('+');
  }


  public get resultText(): BehaviorSubject<string> {
    return this._resultText;
  }

  set resultText(value: BehaviorSubject<string>) {
    this._resultText = value;
  }

  public get subResultText(): BehaviorSubject<string> {
    return this._subResultText;
  }

  set subResultText(value: BehaviorSubject<string>) {
    this._subResultText = value;
  }

  public get lastOperator(): BehaviorSubject<string> {
    return this._lastOperator;
  }

  set lastOperator(value: BehaviorSubject<string>) {
    this._lastOperator = value;
  }

  public constructNumber(value: string): void {
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      return;
    }

    if (value === '=') {
      this.calculateResult();
      return;
    }

    if (value === 'C') {
      this._resultText.next('0');
      this._subResultText.next('0');
      this._lastOperator.next('+');
      return;
    }

    // Backspace
    // TODO: revisar cuando tengamos números negativos
    if (value === 'Backspace') {
      if (this._resultText.value === '0') return;
      if (this._resultText.value.includes('-') && this._resultText.value.length === 2) {
        this._resultText.next('0');
        return;
      }

      if (this._resultText.value.length === 1) {
        this._resultText.next('0');
        return;
      }

      this._resultText.next(this._resultText.value.slice(0, -1));
      return;
    }

    // Aplicar operador
    if (operators.includes(value)) {
      // this.calculateResult();

      this._lastOperator.next(value);
      this._subResultText.next(this._resultText.value);
      this._resultText.next('0');
      return;
    }

    // Limiter número de caracteres
    if (this._resultText.value.length >= 10) {
      return;
    }

    // Validar punto decimal
    if (value === '.' && !this._resultText.value.includes('.')) {
      if (this._resultText.value === '0' || this._resultText.value === '') {
        this._resultText.next('0.');
        return;
      }
      this._resultText.next(this._resultText.value + '.');
      return;
    }

    // Manejo de el cero inicial
    if (
      value === '0' &&
      (this._resultText.value === '0' || this._resultText.value === '-0')
    ) {
      return;
    }

    // Cambiar signo
    if (value === '+/-') {
      if (this._resultText.value.includes('-')) {
        this._resultText.next(this._resultText.value.slice(1));
        return;
      }

      this._resultText.next('-' + this._resultText.value);
      return;
    }

    // Números
    if (numbers.includes(value)) {
      if (this._resultText.value === '0') {
        this._resultText.next(value);
        return;
      }

      if (this._resultText.value === '-0') {
        this._resultText.next('-' + value);
        return;
      }

      this._resultText.next(this._resultText.value + value);
      return;
    }
  }


  public calculateResult() {
    const number1 = parseFloat(this._subResultText.value);
    const number2 = parseFloat(this._resultText.value);

    let result = 0;

    switch (this._lastOperator.value) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case 'X':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this._resultText.next(result.toString());
    this._subResultText.next('0');
  }

}
