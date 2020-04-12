"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseNode_1 = require("./BaseNode");
var OptionalNode_1 = require("./OptionalNode");
var SingleNode_1 = require("./SingleNode");
var RepeatNode_1 = require("./RepeatNode");
var LinkNode_1 = require("./LinkNode");
var OrdinaryNode = /** @class */ (function (_super) {
    __extends(OrdinaryNode, _super);
    function OrdinaryNode(expression, expressionFragments, initialize) {
        if (initialize === void 0) { initialize = true; }
        return _super.call(this, expression, expressionFragments, initialize) || this;
    }
    OrdinaryNode.prototype.baseInit = function (expression, expressionFragments) {
        if (expressionFragments.length == 0) {
            return;
        }
        var nodes = [
            new OptionalNode_1.OptionalNode(null, expressionFragments, false),
            new SingleNode_1.SingleNode(null, expressionFragments, false),
            new RepeatNode_1.RepeatNode(null, expressionFragments, false),
            new LinkNode_1.LinkNode(null, expressionFragments, false)
        ];
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            if (node.test()) {
                this.proxyNode = node;
                this.proxyNode.init();
                break;
            }
        }
    };
    OrdinaryNode.prototype.baseRandom = function (expression, expressionFragments) {
        if (this.proxyNode == null) {
            return "";
        }
        return this.proxyNode.random();
    };
    return OrdinaryNode;
}(BaseNode_1.BaseNode));
exports.OrdinaryNode = OrdinaryNode;
