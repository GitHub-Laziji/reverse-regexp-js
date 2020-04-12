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
var SingleNode_1 = require("./SingleNode");
var RepeatNode = /** @class */ (function (_super) {
    __extends(RepeatNode, _super);
    function RepeatNode(expression, expressionFragments, initialize) {
        if (initialize === void 0) { initialize = true; }
        var _this = _super.call(this, expression, expressionFragments, initialize) || this;
        _this.minRepeat = 1;
        _this.maxRepeat = 1;
        return _this;
    }
    RepeatNode.prototype.baseTest = function (expression, expressionFragments) {
        if (expressionFragments.length == 2) {
            var token = expressionFragments[1];
            return token != null
                && ("+" == token || "?" == token || "*" == token || token.indexOf("{") == 0);
        }
        return false;
    };
    RepeatNode.prototype.baseInit = function (expression, expressionFragments) {
        this.node = new SingleNode_1.SingleNode(expressionFragments[0], null);
        var token = expressionFragments[1];
        if ("+" == token) {
            this.maxRepeat = RepeatNode.MAX_REPEAT;
        }
        else if ("?" == token) {
            this.minRepeat = 0;
        }
        else if ("*" == token) {
            this.minRepeat = 0;
            this.maxRepeat = RepeatNode.MAX_REPEAT;
        }
        else if (token.indexOf("{") == 0) {
            var numbers = token.substring(1, token.length - 1).split(",", 2);
            this.minRepeat = this.maxRepeat = parseInt(numbers[0]);
            if (numbers.length > 1) {
                this.maxRepeat = !numbers[1] ? Math.max(RepeatNode.MAX_REPEAT, this.minRepeat) : parseInt(numbers[1]);
                if (this.maxRepeat < this.minRepeat) {
                    throw new Error("Invalid regular expression: "
                        + this.getExpression() + " : Numbers out of order in {} quantifier");
                }
            }
        }
    };
    RepeatNode.prototype.baseRandom = function (expression, expressionFragments) {
        var repeat = Math.floor(Math.random() * (this.maxRepeat - this.minRepeat + 1)) + this.minRepeat;
        var value = "";
        while (repeat-- > 0) {
            value += this.node.random();
        }
        return value;
    };
    RepeatNode.MAX_REPEAT = 16;
    return RepeatNode;
}(BaseNode_1.BaseNode));
exports.RepeatNode = RepeatNode;
