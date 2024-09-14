import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculatorButtonComponent} from './calculator-button.component';

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let component: CalculatorButtonComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
