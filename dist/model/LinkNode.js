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
var RepeatNode_1 = require("./RepeatNode");
var SingleNode_1 = require("./SingleNode");
var LinkNode = /** @class */ (function (_super) {
    __extends(LinkNode, _super);
    function LinkNode(expression, expressionFragments, initialize) {
        if (initialize === void 0) { initialize = true; }
        return _super.call(this, expression, expressionFragments, initialize) || this;
    }
    LinkNode.prototype.baseTest = function (expression, expressionFragments) {
        for (var _i = 0, expressionFragments_1 = expressionFragments; _i < expressionFragments_1.length; _i++) {
            var fragment = expressionFragments_1[_i];
            if ("|" == fragment) {
                return false;
            }
        }
        return true;
    };
    LinkNode.prototype.baseInit = function (expression, expressionFragments) {
        this.children = [];
        for (var i = 0; i < expressionFragments.length; i++) {
            var node = void 0;
            if (i + 1 < expressionFragments.length) {
                node = new RepeatNode_1.RepeatNode(null, [expressionFragments[i], expressionFragments[i + 1]], false);
                if (node.test()) {
                    node.init();
                    this.children.push(node);
                    i++;
                    continue;
                }
            }
            node = new SingleNode_1.SingleNode(null, [expressionFragments[i]]);
            this.children.push(node);
        }
    };
    LinkNode.prototype.baseRandom = function (expression, expressionFragments) {
        var value = "";
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var node = _a[_i];
            value += node.random();
        }
        return value;
    };
    return LinkNode;
}(BaseNode_1.BaseNode));
exports.LinkNode = LinkNode;
