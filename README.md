# Angular Calculator - Testing Focus

This project is an Angular 12 calculator app. The focus of this documentation is on the unit testing strategy and implementation using Jasmine and Karma.
> Are you taking fernando herrera's Angular Pro course? Well this repo will help you how to do unit tests in angular 12.

## Features of the Calculator

- **Basic Arithmetic Operations**: Supports addition, subtraction, multiplication, and division.
- **Keyboard Support**: Handles keyboard events for operations and special keys (`Enter`, `Escape`, etc.).
- **Component-based Architecture**: Built using Angular components and services.

## Testing Strategy

The calculator project emphasizes thorough unit testing of both components and services to ensure functionality, correctness, and maintainability. Below are the key testing strategies and examples used in the project.

### Tools and Libraries

- **Jasmine**: Test framework used to write unit tests.
- **Karma**: Test runner for executing the tests.
- **SpyObj**: Used to mock services and track method calls.
- **RxJS**: Used to handle observables, which are tested with operators like `of()` and `first()`.

### Unit Tests Overview

1. **Component Testing**: Focus on the interaction between the `CalculatorComponent` and its child components like `CalculatorButtonComponent`.
  - Mocking the `CalculatorService` to simulate the behavior of the service without invoking actual logic.
  - Verifying that the correct number of calculator buttons (`CalculatorButtonComponent`) is rendered.
  - Testing the behavior of keyboard events to ensure they trigger the appropriate service methods.

2. **Service Testing**: The `CalculatorService` is tested separately to verify the correct logic for handling operations, managing state, and handling special keys like `C` (clear) and `Backspace`.
  - Observables such as `getResultText()`, `getSubResultText()`, and `getLastOperator()` are mocked and tested to ensure correct values are emitted.
  - Complex calculations (e.g., addition, subtraction) are tested by simulating multiple operations.

### Key Tests Implemented

#### Component Tests (`CalculatorComponent`)

- **Initialization Test**: Verifies that the component is created successfully and the service methods are called.

  ```typescript
  it('should create', () => {
    expect(component).toBeTruthy();
  });
