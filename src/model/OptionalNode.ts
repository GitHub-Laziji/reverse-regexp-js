import { BaseNode } from "./BaseNode";
import { Node } from "./Node";
import { OrdinaryNode } from "./OrdinaryNode";

export class OptionalNode extends BaseNode {

  private children: Node[];

  public constructor(expression: string | null, expressionFragments: string[] | null, initialize = true) {
    super(expression, expressionFragments, initialize);
  }


  protected baseTest(expression: string, expressionFragments: string[]): boolean {
    for (let fragment of expressionFragments) {
      if ("|" == fragment) {
        return true;
      }
    }
    return false;
  }

  protected baseInit(expression: string, expressionFragments: string[]): void {
    this.children = [];
    let subFragments: string[] = [];
    for (let fragment of expressionFragments) {
      if ("|" == fragment) {
        this.children.push(new OrdinaryNode(null, subFragments));
        subFragments = [];
        continue;
      }
      subFragments.push(fragment);
    }
    this.children.push(new OrdinaryNode(null, subFragments));
  }

  protected baseRandom(expression: string, expressionFragments: string[]): string {
    return this.children[Math.floor(Math.random() * this.children.length)].random();
  }
}