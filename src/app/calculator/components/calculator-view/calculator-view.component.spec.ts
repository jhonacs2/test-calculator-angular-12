import {ComponentFixture, TestBed} from "@angular/core/testing";

import {CalculatorViewComponent} from "./calculator-view.component";
import {CalculatorComponent} from "../calculator/calculator.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe("CalculatorViewComponent", () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let calculatorViewComponent: CalculatorViewComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorViewComponent, CalculatorComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    calculatorViewComponent = fixture.componentInstance;
  });

  it("should create", () => {
    expect(calculatorViewComponent).toBeTruthy();
  });

  it("should contain calculator component ", () => {
    const calculatorComponentHtml = compiled.querySelector("calculator");
    expect(calculatorComponentHtml).toBeTruthy();
  });
});
