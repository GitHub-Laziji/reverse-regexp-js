import { BaseNode } from "./BaseNode";
import { Node } from "./Node";
import { OptionalNode } from "./OptionalNode";
import { SingleNode } from "./SingleNode";
import { RepeatNode } from "./RepeatNode";
import { LinkNode } from "./LinkNode";


export class OrdinaryNode extends BaseNode {

  private proxyNode: Node;

  public constructor(expression: string | null, expressionFragments: string[] | null, initialize = true) {
    super(expression, expressionFragments, initialize);
  }

  protected baseInit(expression: string, expressionFragments: string[]): void {
    if (expressionFragments.length == 0) {
      return;
    }
    let nodes: Node[] = [
      new OptionalNode(null, expressionFragments, false),
      new SingleNode(null, expressionFragments, false),
      new RepeatNode(null, expressionFragments, false),
      new LinkNode(null, expressionFragments, false)
    ];
    for (let node of nodes) {
      if (node.test()) {
        this.proxyNode = node;
        this.proxyNode.init();
        break;
      }
    }
  }

  protected baseRandom(expression: string, expressionFragments: string[]): string {
    if (this.proxyNode == null) {
      return "";
    }
    return this.proxyNode.random();
  }

}