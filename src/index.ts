import { Node } from "./model/Node";
import { OrdinaryNode } from "./model/OrdinaryNode";

export default {
  compile(expression: string): Node {
    return new OrdinaryNode(expression, null);
  }
}