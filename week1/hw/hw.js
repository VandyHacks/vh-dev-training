"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
// import { async } from 'q';
// to call this function, you'll need to do two things
// 1st, the function that is called in must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like in the below example
var getDataFromAPI = function (url) {
    return new Promise(function (res, rej) {
        node_fetch_1["default"](url)
            .then(function (data) { return data.json(); })
            .then(function (json) {
            // the json variable here is just the stuff you see in the browser
            res(json);
        })["catch"](function (err) { return rej(err); });
    });
};
var objectively = function () {
    var q1 = function () {
        console.log(console);
    };
    q1();
    // @response 1: Console appears to be a JSON object with more functions as the data inside of that object
    // const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
    // @response 2: This object can have values other than numbers for its keys while an array can only be indexed by numbers
    // @response 3i: This is an object that contains other objects, with each object representing a person on the hackerspotted leaderboard
    var q3 = function (n) { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b, _c, _d, person, nTmp;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, getDataFromAPI('https://spot.benc.me/?time=1549939921')];
                case 1:
                    res = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                    res.sort(function (a, b) {
                        if (a.unique > b.unique)
                            return -1;
                        if (a.unique < b.unique)
                            return 1;
                        return 0;
                    });
                    person = res[n - 1];
                    nTmp = n;
                    while (res[nTmp].unique === person.unique) {
                        if (res[nTmp].score > person.score)
                            person = res[nTmp];
                        nTmp += 1;
                    }
                    console.log(person);
                    return [2 /*return*/];
            }
        });
    }); };
    q3(3);
};
objectively();
var awry = function () {
    var docTester = [];
    // fill docTester with 1000 random integers between 0 and 99
    for (var i = 0; i < 1000; i++)
        docTester[i] = Math.floor(Math.random() * 100);
    var q1 = function () {
        var docTesterIndex = [];
        docTester.forEach(function (num, i) {
            docTesterIndex[i] = num + i;
        });
        return docTesterIndex;
    };
    var q2 = function () {
        var docTesterIndex = docTester.map(function (num, i) {
            return num + i;
        });
        return docTesterIndex;
    };
    var q3 = function (arr) {
        return arr.reduce(function (acc, cur) { return acc + cur; });
    };
    var q4 = function (n) { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b, _c, _d, person, nTmp;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, getDataFromAPI('https://spot.benc.me/?time=1549939921')];
                case 1:
                    res = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                    res
                        .filter(function (person) {
                        return person.spotted >= 3 || person.spotted === 0;
                    })
                        .sort(function (a, b) {
                        if (a.unique > b.unique)
                            return -1;
                        if (a.unique < b.unique)
                            return 1;
                        return 0;
                    });
                    person = res[n - 1];
                    nTmp = n;
                    while (res[nTmp].unique === person.unique) {
                        if (res[nTmp].score > person.score)
                            person = res[nTmp];
                        nTmp += 1;
                    }
                    console.log(person);
                    return [2 /*return*/];
            }
        });
    }); };
    console.log(q3(q1()));
    console.log(q3(q2()));
    q4(3);
};
awry();
// console.log(docTester); // uncomment this to see the array logged
