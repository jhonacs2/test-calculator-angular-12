import {TestBed} from "@angular/core/testing";

import {CalculatorService} from "./calculator.service";
import {first} from "rxjs/operators";

describe("CalculatorService", () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("the resultText should be negative if it starts with -0", (done) => {
    service.constructNumber("+/-");
    service.constructNumber("1");
    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toEqual("-1");
      done();
    });
  });

  it("should be 0 if the resultText has a length 1 and backspace is pressed", (done) => {
    service.constructNumber("1");
    service.constructNumber("Backspace");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toEqual("0");
      done();
    });

  });

  it("should be created with default values", (done) => {
    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("0");
    });

    service.getSubResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("0");
    });

    service.getLastOperator().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("+");
      done();
    });
  });

  it("should set resultTest,subResultText to 0 when C is pressed", (done) => {
    service.constructNumber("1");
    service.constructNumber("2");
    service.constructNumber("+");
    service.constructNumber("1");
    service.constructNumber("2");
    service.constructNumber("5");

    service.constructNumber("C");

    service.getResultText().pipe(first()).subscribe(resultText => expect(resultText).toBe("0"));
    service.getSubResultText().pipe(first()).subscribe(subResultText => {
      expect(subResultText).toBe("0");
      done();
    });
  });

  it("should update resultText with number input", (done) => {
    service.constructNumber("1");
    service.getResultText().pipe(first()).subscribe(resultText => expect(resultText).toBe("1"));

    service.constructNumber("2");
    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("12");
      done();
    });
  });

  it("should handle operator correctly", () => {
    service.constructNumber("1");
    service.constructNumber("+");

    service.getLastOperator().pipe(first()).subscribe(lastOperator => {
      expect(lastOperator).toBe("+");
    });
    service.getSubResultText().pipe(first()).subscribe(subResultText => {
      expect(subResultText).toBe("1");
    });
    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("0");
    });
  });

  it("should calculate result correctly for addition", (done) => {
    service.constructNumber("2");
    service.constructNumber("+");
    service.constructNumber("2");
    service.constructNumber("=");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("4");
      done();
    });
  });

  it("should calculate result correctly for subtraction", (done) => {
    service.constructNumber("2");
    service.constructNumber("-");
    service.constructNumber("2");
    service.constructNumber("=");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("0");
      done();
    });
  });

  it("should calculate result correctly for multiplication", (done) => {
    service.constructNumber("2");
    service.constructNumber("*");
    service.constructNumber("2");
    service.constructNumber("=");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("4");
      done();
    });
  });

  it("should calculate result correctly for division", (done) => {
    service.constructNumber("1");
    service.constructNumber("0");
    service.constructNumber("/");
    service.constructNumber("2");
    service.constructNumber("=");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("5");
      done();
    });
  });

  it("should handle decimal point correctly", (done) => {
    service.constructNumber("1");
    service.constructNumber(".");
    service.constructNumber("5");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("1.5");
    });

    service.constructNumber(".");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("1.5");
      done();
    });
  });

  it("should handle decimal point correctly starting with zero", (done) => {
    service.constructNumber("0");
    service.constructNumber(".");
    service.constructNumber(".");
    service.constructNumber(".");
    service.constructNumber(".");
    service.constructNumber("0");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("0.0");
      done();
    });
  });

  it("should handle sign change correctly", (done) => {
    service.constructNumber("1");
    service.constructNumber("+/-");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("-1");
    });
    service.constructNumber("+/-");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("1");
      done();
    });
  });

  it("should handle backspace correctly", (done) => {
    service.constructNumber("1");
    service.constructNumber("2");
    service.constructNumber("3");
    service.constructNumber("Backspace");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("12");
    });

    service.constructNumber("Backspace");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText).toBe("1");
      done();
    });
  });

  it("should handle max length correctly", (done) => {
    for (let i = 0; i < 10; i++) {
      service.constructNumber("1");
    }

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText.length).toBe(10);
    });

    service.constructNumber("1");

    service.getResultText().pipe(first()).subscribe(resultText => {
      expect(resultText.length).toBe(10);
      done();
    });
  });
});
