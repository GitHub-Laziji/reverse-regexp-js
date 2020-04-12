import { BaseNode } from "./BaseNode";
import { Node } from "./Node";
import { SingleNode } from "./SingleNode";
import { RegexpIllegalException } from "../exception/RegexpIllegalException";

export class RepeatNode extends BaseNode {

  private static MAX_REPEAT: number = 16;

  private node: Node;
  private minRepeat: number = 1;
  private maxRepeat: number = 1;

  public constructor(expression: string | null, expressionFragments: string[] | null, initialize = true) {
    super(expression, expressionFragments, initialize);
  }

  protected baseTest(expression: string, expressionFragments: string[]): boolean {
    if (expressionFragments.length == 2) {
      let token: string = expressionFragments[1];
      return token != null
        && ("+" == token || "?" == token || "*" == token || token.indexOf("{") == 0);
    }
    return false;
  }

  protected baseInit(expression: string, expressionFragments: string[]): void {
    this.node = new SingleNode(expressionFragments[0], null);
    let token: string = expressionFragments[1];
    if ("+" == token) {
      this.maxRepeat = RepeatNode.MAX_REPEAT;
    } else if ("?" == token) {
      this.minRepeat = 0;
    } else if ("*" == token) {
      this.minRepeat = 0;
      this.maxRepeat = RepeatNode.MAX_REPEAT;
    } else if (token.indexOf("{") == 0) {
      let numbers: string[] = token.substring(1, token.length - 1).split(",", 2);
      this.minRepeat = this.maxRepeat = parseInt(numbers[0]);
      if (numbers.length > 1) {
        this.maxRepeat = !numbers[1] ? Math.max(RepeatNode.MAX_REPEAT, this.minRepeat) : parseInt(numbers[1]);
        if (this.maxRepeat < this.minRepeat) {
          throw new Error("Invalid regular expression: "
            + this.getExpression() + " : Numbers out of order in {} quantifier");
        }
      }
    }
  }

  protected baseRandom(expression: string, expressionFragments: string[]): string {
    let repeat: number = Math.floor(Math.random() * (this.maxRepeat - this.minRepeat + 1)) + this.minRepeat;
    let value: string = "";
    while (repeat-- > 0) {
      value += this.node.random();
    }
    return value;
  }
}