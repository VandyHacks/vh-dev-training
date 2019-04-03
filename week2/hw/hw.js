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
var request = require('request');
var node_fetch_1 = require("node-fetch");
var sha1 = require('sha1');
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
var makeOpenStreetMapUrl = function (location, email) { return "https://nominatim.openstreetmap.org/?format=json&q=" + location + "&format=json&limit=3&email=" + email; };
var makeDarkSkyUrl = function (token, lat, lon) { return "https://api.darksky.net/forecast/" + token + "/" + lat + "," + lon; };
var makeSlackUrl = function (data, slackUsername) { return "https://send-to-slack-nfp4cc31q.now.sh/?user=" + slackUsername + "&data=" + JSON.stringify(data); };
var initWeatherInfo = function (location, name) {
    var weatherInfo = {
        location: location,
        weather: '',
        lat: 0,
        lon: 0,
        name: ''
    };
    if (process.env.NAME)
        weatherInfo.name = process.env.NAME;
    return weatherInfo;
};
var callbacks = function (location, slackUsername, callback) {
    var weatherInfo = initWeatherInfo(location, process.env.NAME);
    request(
    // this is just the first call to request. You'll need multiple
    makeOpenStreetMapUrl(weatherInfo.location, process.env.EMAIL), function (error, response, geocodeBody) {
        if (error) {
            console.log(error);
        }
        else {
            var latlon = JSON.parse(geocodeBody);
            weatherInfo.lat = parseFloat(latlon[0].lat);
            weatherInfo.lon = parseFloat(latlon[0].lon);
            request(makeDarkSkyUrl(process.env.DARK_SKY_TOKEN, weatherInfo.lat, weatherInfo.lon), function (error, response, darkSkyBody) {
                if (error) {
                    console.log(error);
                }
                else {
                    var weatherData = JSON.parse(darkSkyBody);
                    weatherInfo.weather = "It's " + weatherData.currently.summary + " and it's " + weatherData.currently.temperature + " degrees.";
                    request(makeSlackUrl(weatherInfo, slackUsername), function (error, response, slackBody) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            callback(JSON.parse(slackBody));
                        }
                    });
                }
            });
        }
    });
};
// change Promise<object> to Promise<TheTypeThatYouAreMaking> for both functions
var promises = function (location, slackUsername) {
    var weatherInfo = initWeatherInfo(location, process.env.NAME);
    var result = node_fetch_1["default"](makeOpenStreetMapUrl(location, process.env.EMAIL))
        .then(function (data) {
        return data.json();
    }).then(function (latlon) {
        weatherInfo.lat = parseFloat(latlon[0].lat);
        weatherInfo.lon = parseFloat(latlon[0].lon);
        return node_fetch_1["default"](makeDarkSkyUrl(process.env.DARK_SKY_TOKEN, weatherInfo.lat, weatherInfo.lon));
    }).then(function (data) {
        return data.json();
    }).then(function (weatherData) {
        weatherInfo.weather = "It's " + weatherData.currently.summary + " and it's " + weatherData.currently.temperature + " degrees.";
        return node_fetch_1["default"](makeSlackUrl(weatherInfo, slackUsername));
    }).then(function (data) {
        return data.json();
    })["catch"](function (err) { return console.log(err); });
    return result;
};
exports.asyncAwait = function (location, slackUsername) { return __awaiter(_this, void 0, void 0, function () {
    var weatherInfo, latlon, currWeather;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                weatherInfo = initWeatherInfo(location, process.env.NAME);
                return [4 /*yield*/, node_fetch_1["default"](makeOpenStreetMapUrl(location, process.env.EMAIL))];
            case 1: return [4 /*yield*/, (_a.sent()).json()];
            case 2:
                latlon = _a.sent();
                weatherInfo.lat = parseFloat(latlon[0].lat);
                weatherInfo.lon = parseFloat(latlon[0].lon);
                return [4 /*yield*/, node_fetch_1["default"](makeDarkSkyUrl(process.env.DARK_SKY_TOKEN, weatherInfo.lat, weatherInfo.lon))];
            case 3: return [4 /*yield*/, (_a.sent()).json()];
            case 4:
                currWeather = _a.sent();
                weatherInfo.weather = "It's " + currWeather.currently.summary + " and it's " + currWeather.currently.temperature + " degrees.";
                return [4 /*yield*/, node_fetch_1["default"](makeSlackUrl(weatherInfo, slackUsername))];
            case 5: 
            // console.log(`Data sha1: ${sha1(JSON.stringify(weatherInfo))}`)
            return [2 /*return*/, (_a.sent()).json()];
        }
    });
}); };
// all the console.logs should log what the send-to-slack API returns
// callbacks('Vanderbilt University', 'C9S0DF3BR', body => {
// 	console.log(body);
// }); // feel free to change the place. It'll be more interesting if everyone's not doing the same place.
// promises('Vanderbilt University', 'C9S0DF3BR').then(data => console.log(data));
// (async () => {
// 	console.log(`Slack sha1: ${(await asyncAwait('Vanderbilt University', 'C9S0DF3BR')).sha1}`);
// })();
