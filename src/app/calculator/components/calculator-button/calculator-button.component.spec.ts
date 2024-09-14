import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculatorButtonComponent} from './calculator-button.component';
import {timer} from "rxjs";
import {Component} from "@angular/core";

@Component({
  template: `
    <calculator-button>
      <span class="project-content underline">Test Content</span>
    </calculator-button>
  `
})
class TestHostComponent {
}


describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let component: CalculatorButtonComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
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

  it('should apply w-1/4 double is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(component.isDoubleSize).toBeFalsy();
    expect(hostCssClasses).toContain('w-1/4');
  });

  it('should apply w-2/4 doubleSize is true', () => {
    component.isDoubleSize = true
    fixture.detectChanges()
    const hostCssClasses: string[] = fixture.debugElement.nativeElement.classList.value.split(' ');
    expect(component.isDoubleSize).toBeTrue();
    expect(hostCssClasses).toContain('w-2/4');
  });

  it('should emit onClick when handle is called', () => {
    spyOn(component.onClick, 'emit');

    component.handleClick()

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when keyboardPress', (done) => {
    component.contentValue!.nativeElement.innerText = "1";
    component.keyboardPressedStyle('1');
    expect(component.isPressed).toBe(true);

    timer(101).subscribe(() => {
      expect(component.isPressed).toBe(false);
      done();
    })
  });

  it('should not set isPressed to true if key is not matching', () => {
    component.contentValue.nativeElement.innerText = "1";
    component.keyboardPressedStyle('2');

    expect(component.isPressed).toBeFalse();
  });

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-content')).not.toBeNull()
  });
});
