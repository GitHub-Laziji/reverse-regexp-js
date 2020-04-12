import { BaseNode } from "./BaseNode";
import { Node } from "./Node";
import { OrdinaryNode } from "./OrdinaryNode";
import { RegexpIllegalException } from "../exception/RegexpIllegalException";

class Interval {
  public start: string;
  public end: string;

  public constructor(start: string, end: string) {
    this.start = start;
    this.end = end;
  }
}

export class SingleNode extends BaseNode {

  private node: Node;

  private intervals: Interval[];

  public constructor(expression: string | null, expressionFragments: string[] | null, initialize = true) {
    super(expression, expressionFragments, initialize);
  }

  protected baseTest(expression: string, expressionFragments: string[]): boolean {
    return expressionFragments != null && expressionFragments.length == 1;
  }

  protected baseInit(expression: string, expressionFragments: string[]): void {
    if (expression.indexOf("(") == 0) {
      this.node = new OrdinaryNode(expression.substring(1, expression.length - 1), null);
      return;
    }
    if (expression.indexOf("[") == 0) {
      let i: number = 1;
      let preChar: string = null;
      while (i < expression.length - 1) {
        if (expression.charAt(i) == '\\') {
          if (i + 1 >= expression.length - 1) {
            throw new RegexpIllegalException(expression, i);
          }
          if (preChar != null && "dws".indexOf(expression.charAt(i + 1) + "") != -1) {
            this.addIntervals(preChar, null, '-', null);
            preChar = null;
          }
          if (expression.charAt(i + 1) == 'd') {
            this.addIntervals('0', '9');
          } else if (expression.charAt(i + 1) == 'w') {
            this.addIntervals('0', '9', 'A', 'Z', 'a', 'z', '_', null);
          } else if (expression.charAt(i + 1) == 's') {
            this.addIntervals(' ', null, '\t', null);
          } else {
            if (preChar != null) {
              this.addIntervals(preChar, expression.charAt(i + 1));
              preChar = null;
            } else if (i + 2 < expression.length && expression.charAt(i + 2) == '-') {
              preChar = expression.charAt(i + 1);
              i++;
            } else {
              this.addIntervals(expression.charAt(i + 1), null);
            }
          }
          i++;
        } else if (preChar != null) {
          this.addIntervals(preChar, expression.charAt(i));
          preChar = null;
        } else if (i + 1 < expression.length && expression.charAt(i + 1) == '-') {
          preChar = expression.charAt(i);
          i++;
        } else {
          this.addIntervals(expression.charAt(i), null);
        }
        i++;
      }
      if (preChar != null) {
        this.addIntervals(preChar, null, '-', null);
      }
    } else if ("." == expression) {
      this.addIntervals(
        String.fromCharCode(0), String.fromCharCode('\n'.charCodeAt(0) - 1),
        String.fromCharCode('\n'.charCodeAt(0) + 1), String.fromCharCode('\r'.charCodeAt(0) - 1),
        String.fromCharCode('\r'.charCodeAt(0) + 1), String.fromCharCode(255));
    } else if ("\\s" == expression) {
      this.addIntervals(' ', null, '\t', null);
    } else if ("\\d" == expression) {
      this.addIntervals('0', '9');
    } else if ("\\w" == expression) {
      this.addIntervals('0', '9', 'A', 'Z', 'a', 'z', '_', null);
    } else if (expression.indexOf("\\") == 0) {
      this.addIntervals(expression.charAt(1), null);
    }
  }

  protected baseRandom(expression: string, expressionFragments: string[]): string {
    if (this.node != null) {
      return this.node.random();
    }
    if (this.intervals != null && this.intervals.length > 0) {
      let value: string = this.randomCharFromInterval(...this.intervals);
      return value == null ? "" : value.toString();
    }
    return expression;
  }

  private randomCharFromInterval(...intervals: Interval[]): string {
    let count: number = 0;
    for (let interval of intervals) {
      count += interval.end.charCodeAt(0) + 1 - interval.start.charCodeAt(0);
    }
    let randomValue: number = Math.floor(Math.random() * count);
    for (let interval of intervals) {
      if (randomValue < interval.end.charCodeAt(0) + 1 - interval.start.charCodeAt(0)) {
        return String.fromCharCode(interval.start.charCodeAt(0) + randomValue);
      }
      randomValue -= interval.end.charCodeAt(0) + 1 - interval.start.charCodeAt(0);
    }
    return null;
  }

  private addIntervals(...chars: string[]): void {
    if (this.intervals == null) {
      this.intervals = [];
    }
    for (let i: number = 0; i + 1 < chars.length; i += 2) {
      let start: string = chars[i];
      let end: string = chars[i + 1] == null ? start : chars[i + 1];
      if (start == null) {
        throw new Error("Invalid regular expression: "
          + this.getExpression() + " : Character class is null");
      }
      if (end < start) {
        throw new Error("Invalid regular expression: "
          + this.getExpression() + " : Range out of order in character class");
      }
      this.intervals.push(new Interval(start, end));
    }
  }


}