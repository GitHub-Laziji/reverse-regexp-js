import { Node } from "./Node";
import { UninitializedException } from "../exception/UninitializedException";
import { RegexpIllegalException } from "../exception/RegexpIllegalException";
import { TypeNotMatchException } from "../exception/TypeNotMatchException";

export abstract class BaseNode implements Node {

  private expression: string;
  private expressionFragments: string[];
  private initialized: boolean;

  constructor(expression: string | null, expressionFragments: string[] | null, initialize = true) {
    if (expression == null && expressionFragments == null) {
      throw new Error();
    }
    if (expression == null) {
      expression = "";
      for (let fragment of expressionFragments) {
        expression += fragment;
      }
    }
    if (expressionFragments == null) {
      expressionFragments = this.spliceExpression(expression);
    }
    this.expression = expression;
    this.expressionFragments = expressionFragments;
    if (initialize) {
      this.init();
    }
  }

  public getExpression(): string {
    return this.expression;
  }

  public random(): string {
    if (!this.isInitialized()) {
      throw new UninitializedException();
    }
    return this.baseRandom(this.expression, this.expressionFragments);
  }

  public test(): boolean {
    return this.baseTest(this.expression, this.expressionFragments);
  }

  public init(): void {
    if (!this.initialized) {
      if (!this.test()) {
        throw new TypeNotMatchException();
      }
      this.baseInit(this.expression, this.expressionFragments);
      this.initialized = true;
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  protected baseRandom(expression: string, expressionFragments: string[]): string {
    return null;
  }

  protected baseInit(expression: string, expressionFragments: string[]): void {

  }

  protected baseTest(expression: string, expressionFragments: string[]): boolean {
    return true;
  }

  private spliceExpression(expression: string): string[] {
    let l: number = 0;
    let r: number = expression.length;
    let fragments: string[] = [];
    while (true) {
      let result: string = this.findFirst(expression, l, r);
      if (!result) {
        break;
      }
      fragments.push(result);
      l += result.length;
    }
    return fragments;
  }

  private findFirst(expression: string, l: number, r: number): string {
    if (l == r) {
      return null;
    }
    if (expression.charAt(l) == '\\') {
      if (l + 1 >= r) {
        throw new RegexpIllegalException(expression, l + 1);
      }
      return expression.substring(l, l + 2);
    }
    if (expression.charAt(l) == '[') {
      let i: number = l + 1;
      while (i < r) {
        if (expression.charAt(i) == ']') {
          return expression.substring(l, i + 1);
        }
        if (expression.charAt(i) == '\\') {
          i++;
        }
        i++;
      }
      throw new RegexpIllegalException(expression, r);
    }
    if (expression.charAt(l) == '{') {
      let i: number = l + 1;
      let hasDelimiter: boolean = false;
      while (i < r) {
        if (expression.charAt(i) == '}') {
          return expression.substring(l, i + 1);
        }
        if (expression.charAt(i) == ',') {
          if (hasDelimiter) {
            throw new RegexpIllegalException(expression, i);
          }
          hasDelimiter = true;
          i++;
          continue;
        }
        if (expression.charAt(i) < '0' || expression.charAt(i) > '9') {
          throw new RegexpIllegalException(expression, i);
        }
        i++;
      }
      throw new RegexpIllegalException(expression, r);
    }
    if (expression.charAt(l) == '(') {
      let i: number = l + 1;
      while (true) {
        let result: string = this.findFirst(expression, i, r);
        if (result == null || result.length == 0 || result.length + i >= r) {
          throw new RegexpIllegalException(expression, i);
        }
        i += result.length;
        if (expression.charAt(i) == ')') {
          return expression.substring(l, i + 1);
        }
      }
    }
    return expression.substring(l, l + 1);
  }
}