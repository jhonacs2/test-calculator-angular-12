import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {timer} from "rxjs";

@Component({
  selector: 'calculator-button',
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize',
    '[class.is-command]': 'isCommand',
    '[class.w-1/4]': '!isDoubleSize',
  }
})
export class CalculatorButtonComponent {
  @ViewChild('button') public contentValue!: ElementRef<HTMLButtonElement>;

  @Input() public isCommand: boolean;
  @Input() public isDoubleSize: boolean;


  @Output() public onClick: EventEmitter<string>;

  public isPressed: boolean;

  constructor(private _cdr: ChangeDetectorRef) {
    this.onClick = new EventEmitter<string>();
    this.isPressed = false;
    this.isCommand = false;
    this.isDoubleSize = false;
  }

  public handleClick(): void {
    const contentButton = this.contentValue.nativeElement.innerText || '';
    this.onClick.emit(contentButton);
  }

  public keyboardPressedStyle(key: string): void {
    if (!this.contentValue) return;

    const buttonValue = this.contentValue.nativeElement.innerText;
    if (buttonValue !== key) return;

    this.isPressed = true;
    this._cdr.markForCheck();
    timer(100).subscribe(() => {
      this.isPressed = false
      this._cdr.markForCheck();
    });
  }
}
