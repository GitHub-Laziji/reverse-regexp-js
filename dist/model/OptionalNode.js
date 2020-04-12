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
var OrdinaryNode_1 = require("./OrdinaryNode");
var OptionalNode = /** @class */ (function (_super) {
    __extends(OptionalNode, _super);
    function OptionalNode(expression, expressionFragments, initialize) {
        if (initialize === void 0) { initialize = true; }
        return _super.call(this, expression, expressionFragments, initialize) || this;
    }
    OptionalNode.prototype.baseTest = function (expression, expressionFragments) {
        for (var _i = 0, expressionFragments_1 = expressionFragments; _i < expressionFragments_1.length; _i++) {
            var fragment = expressionFragments_1[_i];
            if ("|" == fragment) {
                return true;
            }
        }
        return false;
    };
    OptionalNode.prototype.baseInit = function (expression, expressionFragments) {
        this.children = [];
        var subFragments = [];
        for (var _i = 0, expressionFragments_2 = expressionFragments; _i < expressionFragments_2.length; _i++) {
            var fragment = expressionFragments_2[_i];
            if ("|" == fragment) {
                this.children.push(new OrdinaryNode_1.OrdinaryNode(null, subFragments));
                subFragments = [];
                continue;
            }
            subFragments.push(fragment);
        }
        this.children.push(new OrdinaryNode_1.OrdinaryNode(null, subFragments));
    };
    OptionalNode.prototype.baseRandom = function (expression, expressionFragments) {
        return this.children[Math.floor(Math.random() * this.children.length)].random();
    };
    return OptionalNode;
}(BaseNode_1.BaseNode));
exports.OptionalNode = OptionalNode;
