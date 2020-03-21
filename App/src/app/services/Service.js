"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var angular_1 = require("@ionic/angular");
var Base64Model_1 = require("../models/Base64Model");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../environment/environment");
var SqlStorage_1 = require("./SqlStorage");
var Service = /** @class */ (function () {
    function Service(http, Store) {
        this.http = http;
        this.Store = Store;
    }
    Service.prototype.GetToken = function (user) {
        var body = JSON.stringify(user);
        return this.http.post("" + environment_1.environment.urlGetToken, body).pipe(operators_1.timeout(30000), operators_1.map(function (result) { return result.Token; }));
    };
    Service.prototype.CheckToken = function (user) {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Authorization': user.Token
            })
        };
        return this.http.post("" + environment_1.environment.urlCheckToken, null, httpOptions).pipe(operators_1.timeout(30000));
    };
    Service.prototype.GetManifest = function (user) {
        //const body = JSON.stringify(user.Company);
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Authorization': user.Token
            })
        };
        return this.http.post("" + environment_1.environment.urlGetManifest, null, httpOptions).pipe(operators_1.timeout(30000), operators_1.map(function (result) { return result; }));
    };
    Service.prototype.SendDataToServer = function (item, user) {
        var body = JSON.stringify(item);
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Authorization': user.Token
            })
        };
        return this.http.post("" + environment_1.environment.urlSendManifest, body, httpOptions).pipe(operators_1.timeout(30000));
    };
    Service.prototype.UpdateToken = function () {
        var _this = this;
        //return this.Store.GetUser().then((user) => {
        return SqlStorage_1.SqlStorage.GetUser().then(function (user) {
            return _this.CheckToken(user).subscribe(function () {
                return true;
            }, function () {
                return _this.GetToken(user).subscribe(function (token) {
                    //this.Store.RewriteNewToken(user, token);
                    SqlStorage_1.SqlStorage.RewriteNewToken(user, token);
                    return true;
                }, function () {
                    return false;
                });
            });
        }, function () {
            return false;
        });
    };
    Service.prototype.SendSoundToServer = function (base64File, user, fileName, id) {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Authorization': user.Token
            })
        };
        var audioBase64 = base64File.replace('data:image/*;charset=utf-8;base64,', '');
        var base64 = new Base64Model_1.Base64Model(id, fileName, audioBase64);
        var body = JSON.stringify(base64);
        return this.http.post("" + environment_1.environment.urlSendSoundMobile, body, httpOptions).pipe(operators_1.timeout(30000));
    };
    Service.prototype.SendPhotoToServer = function (base64File, user, fileName, id) {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Authorization': user.Token
            })
        };
        var photoBase64 = base64File.replace('data:image/*;charset=utf-8;base64,', '');
        var base64 = new Base64Model_1.Base64Model(id, fileName, photoBase64);
        var body = JSON.stringify(base64);
        return this.http.post("" + environment_1.environment.urlSendPhotoMobile, body, httpOptions).pipe(operators_1.timeout(30000));
    };
    Service.prototype.ParseError = function (error) {
        switch (error.status) {
            case 401: {
                return "401 Unauthorized";
            }
            case 400: {
                return "400 Bad Request";
            }
            case 200: {
                return "200 OK";
            }
            case 412: {
                return "412 Precondition Failed";
            }
            case 500: {
                return "500 Internal Server Error";
            }
            case 503: {
                return "503 Service Unavailable";
            }
            case 504: {
                return "504 Gateway Timeout";
            }
            case 520: {
                return "520 Unknown Error";
            }
            case 522: {
                return "522 Connection Timed Out";
            }
            case 523: {
                return "523 Origin Is Unreachable ";
            }
            case 524: {
                return "524 A Timeout Occurred ";
            }
        }
        return null;
    };
    Service.events = new angular_1.Events();
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=Service.js.map