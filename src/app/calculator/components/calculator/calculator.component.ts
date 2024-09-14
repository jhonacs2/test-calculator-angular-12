import {Component, QueryList, ViewChildren} from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {CalculatorButtonComponent} from "../calculator-button/calculator-button.component";
import {Observable} from "rxjs";

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {
  @ViewChildren(CalculatorButtonComponent) public calculatorButtonRef!: QueryList<CalculatorButtonComponent>;

  public resultText: Observable<string>;
  public subResultText: Observable<string>;
  public lastOperator: Observable<string>;


  constructor(private _calculatorService: CalculatorService) {
    this.resultText = this._calculatorService.resultText.asObservable()
    this.subResultText = this._calculatorService.subResultText.asObservable()
    this.lastOperator = this._calculatorService.lastOperator.asObservable()
  }

  public handleClick(key: string) {
    this._calculatorService.constructNumber(key);
  }

  public handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event)
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      X: '*',
      '/': '÷',
      Enter: '=',
    };
    console.log('test0');
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtonRef.forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
