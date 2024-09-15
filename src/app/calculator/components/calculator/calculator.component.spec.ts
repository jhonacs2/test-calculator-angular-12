import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculatorComponent} from './calculator.component';
import {CalculatorService} from "../../services/calculator.service";
import {of} from "rxjs";
import {first} from "rxjs/operators";
import {CalculatorButtonComponent} from "../calculator-button/calculator-button.component";
import SpyObj = jasmine.SpyObj;

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let mockCalculatorService: SpyObj<CalculatorService>;

  beforeEach(async () => {
    mockCalculatorService = jasmine.createSpyObj('CalculatorService', ['getResultText', 'getSubResultText', 'getLastOperator', 'constructNumber']);
    mockCalculatorService.getResultText.and.returnValue(of('100.00'));
    mockCalculatorService.getSubResultText.and.returnValue(of('0'));
    mockCalculatorService.getLastOperator.and.returnValue(of('+'));

    await TestBed.configureTestingModule({
      /*TODO: we can replace the CalculatorButtonComponent with a mock component*/
      declarations: [CalculatorComponent, CalculatorButtonComponent],
      providers: [
        {
          provide: CalculatorService,
          useValue: mockCalculatorService,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', (done) => {
    fixture.detectChanges();
    component.resultText.pipe(first()).subscribe(resultText => {
      expect(resultText).toBe('100.00');
      done()
    })

    component.subResultText.pipe(first()).subscribe(resultText => {
      expect(resultText).toBe('0');
    })

    component.lastOperator.pipe(first()).subscribe(resultText => {
      expect(resultText).toBe('+');
      done();
    })
  });

  it('should have calculator-button components', () => {
    fixture.detectChanges();
    expect(component.calculatorButtonRef).toBeTruthy();
    expect(component.calculatorButtonRef.length).toBe(19);
  });

  it('should handle keyboard events correctly', () => {
    fixture.detectChanges()
    const eventEnter = new KeyboardEvent('keyup', {key: 'Enter'});
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=')

    const escapeEvent = new KeyboardEvent('keyup', {key: 'Escape'});
    document.dispatchEvent(escapeEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C')
  });
});
