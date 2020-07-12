"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchUtils = void 0;
var svelte_persistent_store_1 = require("svelte-persistent-store");
var writable = svelte_persistent_store_1.local.writable, readable = svelte_persistent_store_1.local.readable, derived = svelte_persistent_store_1.local.derived;
var FetchUtils = /** @class */ (function () {
    function FetchUtils(API_URL, token, user, store, tokenstore) {
        this.API_URL = API_URL;
        this.token = token;
        this.store = store;
        this.tokenstore = tokenstore;
        this.token = localStorage.getItem("token") || "";
        this.store = localStorage.getItem("token");
    }
    FetchUtils.prototype.get = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var request, myInit;
            return __generator(this, function (_a) {
                request = 'http://' + this.API_URL + route;
                myInit = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                    method: 'GET',
                    mode: 'cors',
                };
                return [2 /*return*/, fetch(request, myInit).then(function (response) {
                        return response.json().then(function (data) {
                            return data;
                        });
                    })];
            });
        });
    };
    FetchUtils.prototype.is_token_valid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                request = 'http://' + this.API_URL + '/auth/is-token-valid';
                return [2 /*return*/, fetch(request, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.token
                        },
                        method: "GET",
                        mode: 'cors'
                    }).then(function (response) {
                        return response.ok;
                    })];
            });
        });
    };
    FetchUtils.prototype.post = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                request = 'http://' + this.API_URL + route;
                return [2 /*return*/, fetch(request, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.token
                        },
                        method: "POST",
                        body: JSON.stringify(data),
                        mode: 'cors'
                    }).then(function (response) {
                        return response;
                    })];
            });
        });
    };
    FetchUtils.prototype.upload_music = function (file, name) {
        return __awaiter(this, void 0, void 0, function () {
            var request, formData;
            return __generator(this, function (_a) {
                request = 'http://' + this.API_URL + '/music/';
                formData = new FormData();
                formData.append("file", file);
                formData.append("name", name);
                return [2 /*return*/, fetch(request, { method: "POST", body: formData }).then(function (response) {
                        return response;
                    })];
            });
        });
    };
    FetchUtils.prototype.setToken = function (token) {
        localStorage.setItem("token", token);
        this.token = token;
    };
    FetchUtils.prototype.disconnect = function () {
        this.setToken("");
    };
    return FetchUtils;
}());
exports.FetchUtils = FetchUtils;
