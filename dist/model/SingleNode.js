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
var RegexpIllegalException_1 = require("../exception/RegexpIllegalException");
var Interval = /** @class */ (function () {
    function Interval(start, end) {
        this.start = start;
        this.end = end;
    }
    return Interval;
}());
var SingleNode = /** @class */ (function (_super) {
    __extends(SingleNode, _super);
    function SingleNode(expression, expressionFragments, initialize) {
        if (initialize === void 0) { initialize = true; }
        return _super.call(this, expression, expressionFragments, initialize) || this;
    }
    SingleNode.prototype.baseTest = function (expression, expressionFragments) {
        return expressionFragments != null && expressionFragments.length == 1;
    };
    SingleNode.prototype.baseInit = function (expression, expressionFragments) {
        if (expression.indexOf("(") == 0) {
            this.node = new OrdinaryNode_1.OrdinaryNode(expression.substring(1, expression.length - 1), null);
            return;
        }
        if (expression.indexOf("[") == 0) {
            var i = 1;
            var preChar = null;
            while (i < expression.length - 1) {
                if (expression.charAt(i) == '\\') {
                    if (i + 1 >= expression.length - 1) {
                        throw new RegexpIllegalException_1.RegexpIllegalException(expression, i);
                    }
                    if (preChar != null && "dws".indexOf(expression.charAt(i + 1) + "") != -1) {
                        this.addIntervals(preChar, null, '-', null);
                        preChar = null;
                    }
                    if (expression.charAt(i + 1) == 'd') {
                        this.addIntervals('0', '9');
                    }
                    else if (expression.charAt(i + 1) == 'w') {
                        this.addIntervals('0', '9', 'A', 'Z', 'a', 'z', '_', null);
                    }
                    else if (expression.charAt(i + 1) == 's') {
                        this.addIntervals(' ', null, '\t', null);
                    }
                    else {
                        if (preChar != null) {
                            this.addIntervals(preChar, expression.charAt(i + 1));
                            preChar = null;
                        }
                        else if (i + 2 < expression.length && expression.charAt(i + 2) == '-') {
                            preChar = expression.charAt(i + 1);
                            i++;
                        }
                        else {
                            this.addIntervals(expression.charAt(i + 1), null);
                        }
                    }
                    i++;
                }
                else if (preChar != null) {
                    this.addIntervals(preChar, expression.charAt(i));
                    preChar = null;
                }
                else if (i + 1 < expression.length && expression.charAt(i + 1) == '-') {
                    preChar = expression.charAt(i);
                    i++;
                }
                else {
                    this.addIntervals(expression.charAt(i), null);
                }
                i++;
            }
            if (preChar != null) {
                this.addIntervals(preChar, null, '-', null);
            }
        }
        else if ("." == expression) {
            this.addIntervals(String.fromCharCode(0), String.fromCharCode('\n'.charCodeAt(0) - 1), String.fromCharCode('\n'.charCodeAt(0) + 1), String.fromCharCode('\r'.charCodeAt(0) - 1), String.fromCharCode('\r'.charCodeAt(0) + 1), String.fromCharCode(255));
        }
        else if ("\\s" == expression) {
            this.addIntervals(' ', null, '\t', null);
        }
        else if ("\\d" == expression) {
            this.addIntervals('0', '9');
        }
        else if ("\\w" == expression) {
            this.addIntervals('0', '9', 'A', 'Z', 'a', 'z', '_', null);
        }
        else if (expression.indexOf("\\") == 0) {
            this.addIntervals(expression.charAt(1), null);
        }
    };
    SingleNode.prototype.baseRandom = function (expression, expressionFragments) {
        if (this.node != null) {
            return this.node.random();
        }
        if (this.intervals != null && this.intervals.length > 0) {
            var value = this.randomCharFromInterval.apply(this, this.intervals);
            return value == null ? "" : value.toString();
        }
        return expression;
    };
    SingleNode.prototype.randomCharFromInterval = function () {
        var intervals = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            intervals[_i] = arguments[_i];
        }
        var count = 0;
        for (var _a = 0, intervals_1 = intervals; _a < intervals_1.length; _a++) {
            var interval = intervals_1[_a];
            count += interval.end.charCodeAt(0) + 1 - interval.start.charCodeAt(0);
        }
        var randomValue = Math.floor(Math.random() * count);
        for (var _b = 0, intervals_2 = intervals; _b < intervals_2.length; _b++) {
            var interval = intervals_2[_b];
            if (randomValue < interval.end.charCodeAt(0) + 1 - interval.start.charCodeAt(0)) {
                return String.fromCharCode(interval.start.charCodeAt(0) + randomValue);
            }
            randomValue -= interval.end.charCodeAt(0) + 1 - interval.start.charCodeAt(0);
        }
        return null;
    };
    SingleNode.prototype.addIntervals = function () {
        var chars = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            chars[_i] = arguments[_i];
        }
        if (this.intervals == null) {
            this.intervals = [];
        }
        for (var i = 0; i + 1 < chars.length; i += 2) {
            var start = chars[i];
            var end = chars[i + 1] == null ? start : chars[i + 1];
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
    };
    return SingleNode;
}(BaseNode_1.BaseNode));
exports.SingleNode = SingleNode;
