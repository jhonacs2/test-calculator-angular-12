import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let appComponentRef: ComponentFixture<AppComponent>;
  let appComponentElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    appComponentRef = TestBed.createComponent(AppComponent);
    appComponentElement = appComponentRef.nativeElement;
    appComponentRef.detectChanges()
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the calculator title'`, () => {
    const app = appComponentRef.componentInstance;
    expect(app.title).toEqual('angular-calculator');
  });

  it(`should render router-outlet'`, () => {
    expect(appComponentElement.querySelector('router-outlet')).not.toBeNull();
  })

  it('should render router-outlet wrapped with css classes', () => {
    const routerElementParent = appComponentElement.querySelector('div');
    const cssClasses = 'min-w-screen min-h-screen bg-slate-500 flex items-center justify-center px-5 py-5'.split(" ");
    const divClasses = routerElementParent?.classList.value.split(' ');

    cssClasses.forEach(className => expect(divClasses).toContain(className));
  });

  it(`should contain the buy me a beer link`, () => {
    const linkElement = appComponentElement.querySelector('a');

    expect(linkElement).not.toBeNull();
    expect(linkElement?.title).toBeTruthy();
    expect(linkElement?.title).toBe('Buy me a beer');
    expect(linkElement?.href).toBeTruthy();
  })
});
