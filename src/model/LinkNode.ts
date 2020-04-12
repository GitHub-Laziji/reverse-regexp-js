import { BaseNode } from "./BaseNode";
import { Node } from "./Node";
import { RepeatNode } from "./RepeatNode";
import { SingleNode } from "./SingleNode";

export class LinkNode extends BaseNode {

  private children: Node[];

  public constructor(expression: string | null, expressionFragments: string[] | null, initialize = true) {
    super(expression, expressionFragments, initialize);
  }

  protected baseTest(expression: string, expressionFragments: string[]): boolean {
    for (let fragment of expressionFragments) {
      if ("|" == fragment) {
        return false;
      }
    }
    return true;
  }

  protected baseInit(expression: string, expressionFragments: string[]): void {
    this.children = [];
    for (let i: number = 0; i < expressionFragments.length; i++) {
      let node: Node;
      if (i + 1 < expressionFragments.length) {
        node = new RepeatNode(null, [expressionFragments[i], expressionFragments[i + 1]], false);
        if (node.test()) {
          node.init();
          this.children.push(node);
          i++;
          continue;
        }
      }
      node = new SingleNode(null, [expressionFragments[i]]);
      this.children.push(node);
    }
  }

  protected baseRandom(expression: string, expressionFragments: string[]): string {
    let value: string = "";
    for (let node of this.children) {
      value += node.random();
    }
    return value;
  }
}