(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"primary\">\n      <ion-button\n        (click)=\"play()\"\n        [color]=\"selectItem === 'play' ? 'success' : 'danger'\"\n      >\n        <ion-icon name=\"play\"></ion-icon>\n      </ion-button>\n      <ion-button\n        (click)=\"pause()\"\n        [color]=\"selectItem === 'pause' ? 'success' : 'danger'\"\n      >\n        <ion-icon name=\"pause\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"reset()\" [color]=\"'medium'\">\n        <ion-icon name=\"refresh\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"prev()\" [color]=\"'medium'\">\n        <ion-icon name=\"rewind\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"next()\" [color]=\"'medium'\">\n        <ion-icon name=\"fastforward\"></ion-icon>\n      </ion-button>\n\n      <ion-button (click)=\"fast()\" [color]=\"'medium'\">\n        <ion-icon name=\"trending-up\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"slow()\" [color]=\"'medium'\">\n        <ion-icon name=\"trending-down\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n\n    <!-- <ion-buttons slot=\"end\">\n      <ion-menu-button autoHide=\"false\"></ion-menu-button>\n    </ion-buttons> -->\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!-- <div class=\"controls\" *ngIf=\"markerDate\">\n    <ion-text>Last Observation: {{ markerDate }}</ion-text>\n  </div> -->\n  <div class=\"controls\" *ngIf=\"markerDates.length\">\n    <div class=\"timeline\">\n      <div class=\"container right\" *ngFor=\"let markers of markerDates\">\n        <div class=\"content\">\n          <div>\n            {{ markers.Season}} {{ markers.Display_Date.split(\" \")[1] }}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <agm-map\n    [style.height.px]=\"height\"\n    [latitude]=\"lat\"\n    [longitude]=\"lng\"\n    (mapReady)=\"onMapReady($event)\"\n    [maxZoom]=\"14\"\n  >\n  </agm-map>\n</ion-content>\n"

/***/ }),

/***/ "./node_modules/rxjs/internal/Observable.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/internal/Observable.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canReportError_1 = __webpack_require__(/*! ./util/canReportError */ "./node_modules/rxjs/internal/util/canReportError.js");
var toSubscriber_1 = __webpack_require__(/*! ./util/toSubscriber */ "./node_modules/rxjs/internal/util/toSubscriber.js");
var observable_1 = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/internal/symbol/observable.js");
var pipe_1 = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/internal/util/pipe.js");
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var Observable = (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            sink.add(operator.call(sink, this.source));
        }
        else {
            sink.add(this.source || (config_1.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            if (canReportError_1.canReportError(sink)) {
                sink.error(err);
            }
            else {
                console.warn(err);
            }
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config_1.config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Observer.js":
/*!************************************************!*\
  !*** ./node_modules/rxjs/internal/Observer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var hostReportError_1 = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/internal/util/hostReportError.js");
exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError_1.hostReportError(err);
        }
    },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Scheduler.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/internal/Scheduler.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = function () { return Date.now(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Subscriber.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/internal/Subscriber.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/internal/util/isFunction.js");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./node_modules/rxjs/internal/Observer.js");
var Subscription_1 = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/internal/Subscription.js");
var rxSubscriber_1 = __webpack_require__(/*! ../internal/symbol/rxSubscriber */ "./node_modules/rxjs/internal/symbol/rxSubscriber.js");
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var hostReportError_1 = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/internal/util/hostReportError.js");
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        _this.destination = destinationOrNext;
                        destinationOrNext.add(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config_1.config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError_1.hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError_1.hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError_1.hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError_1.hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
exports.SafeSubscriber = SafeSubscriber;
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Subscription.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/internal/Subscription.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = __webpack_require__(/*! ./util/isArray */ "./node_modules/rxjs/internal/util/isArray.js");
var isObject_1 = __webpack_require__(/*! ./util/isObject */ "./node_modules/rxjs/internal/util/isObject.js");
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/internal/util/isFunction.js");
var UnsubscriptionError_1 = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/internal/util/UnsubscriptionError.js");
var Subscription = (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parentOrParents = _a._parentOrParents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription) {
            _parentOrParents.remove(this);
        }
        else if (_parentOrParents !== null) {
            for (var index = 0; index < _parentOrParents.length; ++index) {
                var parent_1 = _parentOrParents[index];
                parent_1.remove(this);
            }
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            try {
                _unsubscribe.call(this);
            }
            catch (e) {
                errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    try {
                        sub.unsubscribe();
                    }
                    catch (e) {
                        errors = errors || [];
                        if (e instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                        }
                        else {
                            errors.push(e);
                        }
                    }
                }
            }
        }
        if (errors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        var subscription = teardown;
        if (!teardown) {
            return Subscription.EMPTY;
        }
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (!(subscription instanceof Subscription)) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default: {
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
        }
        var _parentOrParents = subscription._parentOrParents;
        if (_parentOrParents === null) {
            subscription._parentOrParents = this;
        }
        else if (_parentOrParents instanceof Subscription) {
            if (_parentOrParents === this) {
                return subscription;
            }
            subscription._parentOrParents = [_parentOrParents, this];
        }
        else if (_parentOrParents.indexOf(this) === -1) {
            _parentOrParents.push(this);
        }
        else {
            return subscription;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions === null) {
            this._subscriptions = [subscription];
        }
        else {
            subscriptions.push(subscription);
        }
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/config.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/internal/config.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _enable_super_gross_mode_that_will_cause_bad_things = false;
exports.config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = new Error();
            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/observable/fromArray.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/internal/observable/fromArray.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/internal/Observable.js");
var subscribeToArray_1 = __webpack_require__(/*! ../util/subscribeToArray */ "./node_modules/rxjs/internal/util/subscribeToArray.js");
var scheduleArray_1 = __webpack_require__(/*! ../scheduled/scheduleArray */ "./node_modules/rxjs/internal/scheduled/scheduleArray.js");
function fromArray(input, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToArray_1.subscribeToArray(input));
    }
    else {
        return scheduleArray_1.scheduleArray(input, scheduler);
    }
}
exports.fromArray = fromArray;
//# sourceMappingURL=fromArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/observable/of.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/internal/observable/of.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isScheduler_1 = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/internal/util/isScheduler.js");
var fromArray_1 = __webpack_require__(/*! ./fromArray */ "./node_modules/rxjs/internal/observable/fromArray.js");
var scheduleArray_1 = __webpack_require__(/*! ../scheduled/scheduleArray */ "./node_modules/rxjs/internal/scheduled/scheduleArray.js");
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
        args.pop();
        return scheduleArray_1.scheduleArray(args, scheduler);
    }
    else {
        return fromArray_1.fromArray(args);
    }
}
exports.of = of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/observable/timer.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/internal/observable/timer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/internal/Observable.js");
var async_1 = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/internal/scheduler/async.js");
var isNumeric_1 = __webpack_require__(/*! ../util/isNumeric */ "./node_modules/rxjs/internal/util/isNumeric.js");
var isScheduler_1 = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/internal/util/isScheduler.js");
function timer(dueTime, periodOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    var period = -1;
    if (isNumeric_1.isNumeric(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
    }
    else if (isScheduler_1.isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!isScheduler_1.isScheduler(scheduler)) {
        scheduler = async_1.async;
    }
    return new Observable_1.Observable(function (subscriber) {
        var due = isNumeric_1.isNumeric(dueTime)
            ? dueTime
            : (+dueTime - scheduler.now());
        return scheduler.schedule(dispatch, due, {
            index: 0, period: period, subscriber: subscriber
        });
    });
}
exports.timer = timer;
function dispatch(state) {
    var index = state.index, period = state.period, subscriber = state.subscriber;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    }
    else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/scheduled/scheduleArray.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/internal/scheduled/scheduleArray.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/internal/Observable.js");
var Subscription_1 = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/internal/Subscription.js");
function scheduleArray(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var sub = new Subscription_1.Subscription();
        var i = 0;
        sub.add(scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
                return;
            }
            subscriber.next(input[i++]);
            if (!subscriber.closed) {
                sub.add(this.schedule());
            }
        }));
        return sub;
    });
}
exports.scheduleArray = scheduleArray;
//# sourceMappingURL=scheduleArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/scheduler/Action.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/internal/scheduler/Action.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Subscription_1 = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/internal/Subscription.js");
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/scheduler/AsyncAction.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/internal/scheduler/AsyncAction.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = __webpack_require__(/*! ./Action */ "./node_modules/rxjs/internal/scheduler/Action.js");
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/scheduler/AsyncScheduler.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/internal/scheduler/AsyncScheduler.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Scheduler_1 = __webpack_require__(/*! ../Scheduler */ "./node_modules/rxjs/internal/Scheduler.js");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler_1.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, function () {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        }
        else {
            return _super.prototype.schedule.call(this, work, delay, state);
        }
    };
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/scheduler/async.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/internal/scheduler/async.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AsyncAction_1 = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/internal/scheduler/AsyncAction.js");
var AsyncScheduler_1 = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/internal/scheduler/AsyncScheduler.js");
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=async.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/symbol/observable.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/internal/symbol/observable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/symbol/rxSubscriber.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/internal/symbol/rxSubscriber.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rxSubscriber = (function () {
    return typeof Symbol === 'function'
        ? Symbol('rxSubscriber')
        : '@@rxSubscriber_' + Math.random();
})();
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/UnsubscriptionError.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/internal/util/UnsubscriptionError.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UnsubscriptionErrorImpl = (function () {
    function UnsubscriptionErrorImpl(errors) {
        Error.call(this);
        this.message = errors ?
            errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
        return this;
    }
    UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
    return UnsubscriptionErrorImpl;
})();
exports.UnsubscriptionError = UnsubscriptionErrorImpl;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/canReportError.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/canReportError.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/internal/Subscriber.js");
function canReportError(observer) {
    while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
            return false;
        }
        else if (destination && destination instanceof Subscriber_1.Subscriber) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}
exports.canReportError = canReportError;
//# sourceMappingURL=canReportError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/hostReportError.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/internal/util/hostReportError.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function hostReportError(err) {
    setTimeout(function () { throw err; }, 0);
}
exports.hostReportError = hostReportError;
//# sourceMappingURL=hostReportError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isArray.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();
//# sourceMappingURL=isArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isFunction.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isNumeric.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isNumeric.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = __webpack_require__(/*! ./isArray */ "./node_modules/rxjs/internal/util/isArray.js");
function isNumeric(val) {
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
exports.isNumeric = isNumeric;
//# sourceMappingURL=isNumeric.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isObject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return x !== null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isScheduler.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isScheduler.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/noop.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/internal/util/noop.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/pipe.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/internal/util/pipe.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var noop_1 = __webpack_require__(/*! ./noop */ "./node_modules/rxjs/internal/util/noop.js");
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/subscribeToArray.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/internal/util/subscribeToArray.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToArray = function (array) { return function (subscriber) {
    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
        subscriber.next(array[i]);
    }
    subscriber.complete();
}; };
//# sourceMappingURL=subscribeToArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/toSubscriber.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/toSubscriber.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/internal/Subscriber.js");
var rxSubscriber_1 = __webpack_require__(/*! ../symbol/rxSubscriber */ "./node_modules/rxjs/internal/symbol/rxSubscriber.js");
var Observer_1 = __webpack_require__(/*! ../Observer */ "./node_modules/rxjs/internal/Observer.js");
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),

/***/ "./node_modules/travel-marker/dist/travel-marker.es2015.js":
/*!*****************************************************************!*\
  !*** ./node_modules/travel-marker/dist/travel-marker.es2015.js ***!
  \*****************************************************************/
/*! exports provided: TravelMarker, DefaultMarker, CustomOverlayMarker, TravelEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TravelMarker", function() { return TravelMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultMarker", function() { return DefaultMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomOverlayMarker", function() { return CustomOverlayMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TravelEvents", function() { return TravelEvents; });
var latlngDistance = function (p1, p2) {
    var EarthRadiusMeters = 6378137.0; // meters
    var dLat = (p2.lat - p1.lat) * Math.PI / 180;
    var dLon = (p2.lng - p1.lng) * Math.PI / 180;
    var angle = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));
    var distance = EarthRadiusMeters * c;
    return distance;
};
var getAngle = function (p1, p2) {
    var f1 = Math.PI * p1.lat() / 180;
    var f2 = Math.PI * p2.lat() / 180;
    var dl = Math.PI * (p2.lng() - p1.lng()) / 180;
    return Math.atan2(Math.sin(dl) * Math.cos(f2), Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl));
};

var DefaultMarker = /** @class */ (function () {
    function DefaultMarker(markerOptions, speed, interval, speedMultiplier, path, cameraOnMarker) {
        this.marker = null;
        this.path = [];
        this.playing = false;
        this.numDelta = 0;
        this.delta = null;
        this.index = 0;
        this.deltaIndex = 0;
        this.deltaCurr = null;
        this.deltaLast = null;
        this.angle = 0;
        this.speed = 0;
        this.interval = 0;
        this.speedMultiplier = 1;
        this.cameraOnMarker = false;
        this.markerOptions = {};
        this.eventEmitter = null;
        // console.log(markerOptions, speed, interval, path, cameraOnMarker);
        this.marker = new google.maps.Marker(markerOptions);
        // console.log(this.marker);
        this.markerOptions = markerOptions;
        this.speed = speed;
        this.interval = interval;
        this.speedMultiplier = speedMultiplier;
        this.path = path;
        this.cameraOnMarker = cameraOnMarker;
        return this;
    }
    DefaultMarker.prototype.setEventEmitter = function (eventEmitter) {
        this.eventEmitter = eventEmitter;
    };
    DefaultMarker.prototype.getAnimation = function () {
        return this.marker.getAnimation();
    };
    DefaultMarker.prototype.getCursor = function () {
        return this.marker.getCursor();
    };
    DefaultMarker.prototype.getClickable = function () {
        return this.marker.getClickable();
    };
    DefaultMarker.prototype.getDraggable = function () {
        return this.marker.getDraggable();
    };
    DefaultMarker.prototype.getIcon = function () {
        return this.marker.getDraggable();
    };
    DefaultMarker.prototype.getLabel = function () {
        return this.marker.getLabel();
    };
    DefaultMarker.prototype.getMap = function () {
        return this.marker.getMap();
    };
    DefaultMarker.prototype.getOpacity = function () {
        return this.marker.getOpacity();
    };
    DefaultMarker.prototype.getPosition = function () {
        return this.marker.getPosition();
    };
    DefaultMarker.prototype.getShape = function () {
        return this.marker.getShape();
    };
    DefaultMarker.prototype.getTitle = function () {
        return this.marker.getTitle();
    };
    DefaultMarker.prototype.getVisible = function () {
        return this.marker.getVisible();
    };
    DefaultMarker.prototype.getZIndex = function () {
        return this.marker.getZIndex();
    };
    DefaultMarker.prototype.setMap = function (map) {
        this.marker.setMap(map);
    };
    DefaultMarker.prototype.setPosition = function (latLng) {
        if (this.cameraOnMarker) {
            this.getMap().panTo(latLng);
        }
        this.marker.setPosition(latLng);
    };
    DefaultMarker.prototype.setTitle = function (title) {
        this.marker.setTitle(title);
    };
    DefaultMarker.prototype.setLabel = function (label) {
        this.marker.setLabel(label);
    };
    DefaultMarker.prototype.setDraggable = function (draggable) {
        this.marker.setDraggable(draggable);
    };
    DefaultMarker.prototype.setIcon = function (icon) {
        this.marker.setIcon(icon);
    };
    DefaultMarker.prototype.setOpacity = function (opacity) {
        this.marker.setOpacity(opacity);
    };
    DefaultMarker.prototype.setVisible = function (visible) {
        this.marker.setVisible(visible);
    };
    DefaultMarker.prototype.setZIndex = function (zIndex) {
        this.marker.setZIndex(zIndex);
    };
    DefaultMarker.prototype.setAnimation = function (animation) {
        this.marker.setAnimation(animation);
    };
    DefaultMarker.prototype.setClickable = function (clickable) {
        this.marker.setClickable(clickable);
    };
    DefaultMarker.prototype.setOptions = function (options) {
        this.marker.setOptions(options);
    };
    DefaultMarker.prototype.addListener = function (eventName, handler) {
        var _this = this;
        if (!this.marker) {
            setTimeout(function () { return _this.addListener(eventName, handler); }, 300);
        }
        else {
            return this.marker.addListener(eventName, handler);
        }
    };
    DefaultMarker.prototype.setSpeed = function (speed) {
        if (speed === void 0) { speed = this.speed; }
        this.speed = speed;
    };
    DefaultMarker.prototype.setInterval = function (interval) {
        if (interval === void 0) { interval = this.interval; }
        this.interval = interval;
    };
    DefaultMarker.prototype.setSpeedMultiplier = function (multiplier) {
        this.speedMultiplier = multiplier;
    };
    DefaultMarker.prototype.addLocation = function (locationArray) {
        var _this = this;
        if (locationArray === void 0) { locationArray = []; }
        locationArray.forEach(function (location) {
            if (location.lat && location.lng) {
                _this.path.push(location);
            }
        });
    };
    DefaultMarker.prototype.updateOptions = function (markerOptions) {
        this.markerOptions = Object.assign(this.markerOptions, markerOptions);
        this.setOptions(this.markerOptions);
    };
    // animation
    DefaultMarker.prototype.play = function () {
        this.playing = true;
        this.eventEmitter.emitEvent('play', {
            location: this.marker.getPosition(),
            status: 'playing',
            playing: this.playing,
            index: this.index
        });
        this.animate();
    };
    DefaultMarker.prototype.pause = function () {
        this.playing = false;
        this.eventEmitter.emitEvent('paused', {
            location: this.marker.getPosition(),
            status: 'paused',
            playing: this.playing,
            index: this.index
        });
        this.animate();
    };
    DefaultMarker.prototype.reset = function () {
        this.playing = false;
        this.index = 0;
        this.delta = null;
        this.setPosition(this.path[this.index]);
        this.eventEmitter.emitEvent('reset', {
            location: this.marker.getPosition(),
            status: 'reset',
            playing: this.playing,
            index: this.index
        });
    };
    DefaultMarker.prototype.next = function () {
        if (this.index === this.path.length - 1) { // last index
            return;
        }
        this.index++;
        this.delta = null;
        this.setPosition(this.path[this.index]);
        this.eventEmitter.emitEvent('next', {
            location: this.marker.getPosition(),
            status: 'playing',
            playing: this.playing,
            index: this.index
        });
    };
    DefaultMarker.prototype.prev = function () {
        if (!this.index) { // first Index
            return;
        }
        this.index--;
        this.delta = null;
        this.setPosition(this.path[this.index]);
        this.eventEmitter.emitEvent('previous', {
            location: this.marker.getPosition(),
            status: 'playing',
            playing: this.playing,
            index: this.index
        });
    };
    DefaultMarker.prototype.updateMarker = function () {
        var _this = this;
        if (this.index >= this.path.length - 1) {
            this.eventEmitter.emitEvent('finished', {
                location: this.marker.getPosition(),
                status: 'finished',
                playing: this.playing,
                index: this.index
            });
            return 'no more points to show';
        }
        if (!this.playing) {
            return 'paused';
        }
        if (!this.marker) {
            setTimeout(function () { return _this.updateMarker(); }, 100);
        }
        this.eventEmitter.emitEvent('checkpoint', {
            location: this.marker.getPosition(),
            status: 'playing',
            playing: this.playing,
            index: this.index
        });
        var curr = this.marker.getPosition();
        var next = this.path[this.index + 1];
        var distance = latlngDistance({ lat: curr.lat(), lng: curr.lng() }, { lat: next.lat(), lng: next.lng() });
        // console.log('update car', next.lat(), next.lng(), distance, this.index);
        this.angle = getAngle(curr, next) * 180 / Math.PI;
        // console.log('angle', this.angle);
        this.numDelta = Math.floor((distance * (1000 / this.interval)) / this.speed);
        // console.log(this.numDelta);
        this.index++;
        if (!this.numDelta) {
            // console.log('skip to next marker');
            setTimeout(function () { return _this.updateMarker(); }, this.interval * Math.ceil(1 / this.speedMultiplier));
        }
        else {
            var deltaLat = (next.lat() - curr.lat()) / this.numDelta;
            var deltaLng = (next.lng() - curr.lng()) / this.numDelta;
            this.delta = { lat: deltaLat, lng: deltaLng };
            this.deltaIndex = 0;
            this.deltaCurr = { lat: curr.lat(), lng: curr.lng() };
            this.deltaLast = { lat: next.lat(), lng: next.lng() };
            // console.log(this.delta, this.deltaCurr, this.deltaLast, this.deltaIndex);
            setTimeout(function () { return _this.animate(); }, this.interval * Math.ceil(1 / this.speedMultiplier));
        }
    };
    DefaultMarker.prototype.animate = function () {
        var _this = this;
        if (!this.deltaCurr || !this.delta || !this.deltaLast) {
            // console.log('update marker');
            this.updateMarker();
            return;
        }
        if (!this.playing) {
            // console.log('paused');
            return 'paused';
        }
        this.deltaCurr.lat += this.delta.lat * Math.ceil(this.speedMultiplier);
        this.deltaCurr.lng += this.delta.lng * Math.ceil(this.speedMultiplier);
        var newPos = { lat: this.deltaCurr.lat, lng: this.deltaCurr.lng };
        // console.log('new pos', newPos, this.deltaIndex);
        this.setPosition(newPos);
        var nextIndex = this.deltaIndex + Math.ceil(this.speedMultiplier);
        // console.log('nextIndex', nextIndex,  Math.ceil(1 / this.speedMultiplier));
        if (nextIndex < this.numDelta) {
            this.deltaIndex = nextIndex;
            setTimeout(function () { return _this.animate(); }, this.interval * Math.ceil(1 / this.speedMultiplier));
        }
        else {
            // console.log('last', this.deltaLast);
            setTimeout(function () {
                _this.setPosition(_this.deltaLast);
                _this.updateMarker();
            }, this.interval * Math.ceil(1 / this.speedMultiplier));
        }
    };
    return DefaultMarker;
}());

var CustomOverlayMarker = /** @class */ (function () {
    function CustomOverlayMarker(map, overlayOptions, speed, interval, speedMultiplier, path, cameraOnMarker) {
        this.marker = null;
        this.overlayOptions = {
            offsetX: 0,
            offsetY: 0,
            offsetAngle: 0,
            imageUrl: '',
            imageWidth: 0,
            imageHeight: 0
        };
        this.map = null;
        this.angle = 0;
        this.path = [];
        this.playing = false;
        this.numDelta = 0;
        this.delta = null;
        this.index = 0;
        this.deltaIndex = 0;
        this.deltaCurr = null;
        this.deltaLast = null;
        this.speed = 0;
        this.interval = 0;
        this.speedMultiplier = 1;
        this.cameraOnMarker = false;
        this.eventEmitter = null;
        this.map = map;
        this.overlayOptions = overlayOptions;
        this.speed = speed;
        this.interval = interval;
        this.speedMultiplier = speedMultiplier;
        this.path = path;
        this.cameraOnMarker = cameraOnMarker;
        var position = path[0];
        this.angle = path.length > 1 ? getAngle(path[0], path[1]) * 180 / Math.PI : 0;
        // this.div_ = null;
        var marker = new google.maps.OverlayView();
        marker.setMap(map);
        marker.div_ = null;
        marker.overlayOptions = this.overlayOptions;
        marker.angle = this.angle;
        marker.position = position;
        marker.cameraOnMarker = cameraOnMarker;
        marker.onAdd = function () {
            var div = document.createElement('DIV');
            div.style.borderStyle = 'none';
            div.style.borderWidth = '0px';
            div.style.position = 'absolute';
            // Create the img element and attach it to the div.
            var img = document.createElement('img');
            img.src = marker.overlayOptions.imageUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            div.appendChild(img);
            marker.div_ = div;
            // Add the element to the "overlayLayer" pane.
            var panes = marker.getPanes();
            panes.overlayMouseTarget.appendChild(div);
        };
        marker.setOverlayOptions = function (options) {
            marker.overlayOptions = options;
            marker.draw();
        };
        marker.setPosition = function (pos) {
            if (marker.cameraOnMarker) {
                marker.getMap().panTo(pos);
            }
            if (typeof pos.lat === 'function' || typeof pos.lng === 'function') {
                marker.position = pos;
            }
            else {
                marker.position = new google.maps.LatLng(pos.lat, pos.lng);
            }
            marker.draw();
        };
        marker.getPosition = function () {
            return marker.position;
        };
        marker.setAngle = function (angle) {
            marker.angle = angle;
            marker.draw();
        };
        marker.draw = function () {
            // We use the south-west and north-east
            // coordinates of the overlay to peg it to the correct position and size.
            // To do this, we need to retrieve the projection from the overlay.
            // overlayProjection = this.getProjection();
            var div = marker.div_;
            var point = null;
            // if (this.position) {
            //   console.log('this.position', this.position);
            // }
            // var myPos = this.position !== undefined ? this.position : pos;
            // console.log('myPos', myPos);
            if (marker.position) {
                point = marker.getProjection().fromLatLngToDivPixel(marker.position);
            }
            if (point) {
                div.style.left = point.x - (marker.overlayOptions.imageWidth / 2) + marker.overlayOptions.offsetX + 'px';
                div.style.top = point.y - (marker.overlayOptions.imageHeight / 2) + marker.overlayOptions.offsetY + 'px';
                div.style.width = marker.overlayOptions.imageWidth + "px";
                div.style.height = marker.overlayOptions.imageHeight + "px";
                div.style.transform = 'rotate(' + marker.angle + marker.overlayOptions.offsetAngle + 'deg)';
                // div.style.zIndex = '9999999';
                // marker.div_ = div;
            }
            // google.maps.event.addDomListener(marker.div_, 'click', function(event) {
            //   console.log('overlay');
            // });
            /*
            // Retrieve the south-west and north-east coordinates of this overlay
            // in LatLngs and convert them to pixel coordinates.
            // We'll use these coordinates to resize the div.
            var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
            var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
      
            // Resize the image's div to fit the indicated dimensions.
            var div = this.div_;
            div.style.left = sw.x + 'px';
            div.style.top = ne.y + 'px';
            div.style.width = (ne.x - sw.x) + 'px';
            div.style.height = (sw.y - ne.y) + 'px';
            */
        };
        marker.addListener = function (eventName, handler) {
            if (!marker.div_) {
                setTimeout(function () { return marker.addListener(eventName, handler); }, 300);
            }
            else {
                google.maps.event.addDomListener(marker.div_, eventName, handler);
            }
        };
        // The onRemove() method will be called automatically from the API if
        // we ever set the overlay's map property to 'null'.
        marker.onRemove = function () {
            marker.div_.parentNode.removeChild(this.div_);
            marker.div_ = null;
        };
        this.marker = marker;
        return this;
    }
    CustomOverlayMarker.prototype.equalLatLng = function (loc1, loc2) {
        return loc1.lat() === loc2.lat() && loc1.lng() === loc2.lng();
    };
    CustomOverlayMarker.prototype.addListener = function (eventName, handler) {
        this.marker.addListener(eventName, handler);
    };
    CustomOverlayMarker.prototype.getPosition = function () {
        return this.marker.getPosition();
    };
    CustomOverlayMarker.prototype.setMap = function (map) {
        this.marker.setMap(map);
    };
    CustomOverlayMarker.prototype.setEventEmitter = function (eventEmitter) {
        this.eventEmitter = eventEmitter;
    };
    CustomOverlayMarker.prototype.addLocation = function (locationArray) {
        var _this = this;
        if (locationArray === void 0) { locationArray = []; }
        locationArray.forEach(function (location) {
            if (location.lat && location.lng) {
                _this.path.push(location);
            }
        });
    };
    CustomOverlayMarker.prototype.setSpeed = function (speed) {
        if (speed === void 0) { speed = this.speed; }
        this.speed = speed;
    };
    CustomOverlayMarker.prototype.setInterval = function (interval) {
        if (interval === void 0) { interval = this.interval; }
        this.interval = interval;
    };
    CustomOverlayMarker.prototype.setSpeedMultiplier = function (multiplier) {
        this.speedMultiplier = multiplier;
    };
    CustomOverlayMarker.prototype.updateOptions = function (overlayOptions) {
        this.overlayOptions = Object.assign(this.overlayOptions, overlayOptions);
        this.marker.setOverlayOptions(this.overlayOptions);
    };
    // animation
    CustomOverlayMarker.prototype.play = function () {
        this.playing = true;
        this.eventEmitter.emitEvent('play', {
            location: this.marker.getPosition(),
            status: 'playing',
            playing: this.playing,
            index: this.index
        });
        this.animate();
    };
    CustomOverlayMarker.prototype.pause = function () {
        this.playing = false;
        this.eventEmitter.emitEvent('paused', {
            location: this.marker.getPosition(),
            status: 'paused',
            playing: this.playing,
            index: this.index
        });
        this.animate();
    };
    CustomOverlayMarker.prototype.reset = function () {
        this.playing = false;
        this.index = 0;
        this.delta = null;
        this.angle = this.path.length > 1 ? getAngle(this.path[0], this.path[1]) * 180 / Math.PI : 0;
        this.marker.setPosition(this.path[this.index]);
        this.marker.setAngle(this.angle);
        this.eventEmitter.emitEvent('reset', {
            location: this.marker.getPosition(),
            status: 'reset',
            playing: this.playing,
            index: this.index
        });
    };
    CustomOverlayMarker.prototype.next = function () {
        if (this.index === this.path.length - 1) { // last index
            return;
        }
        this.index++;
        this.delta = null;
        this.marker.setPosition(this.path[this.index]);
        if (this.index < (this.path.length - 2)) {
            var currentLoc = this.path[this.index];
            var nextLoc = this.path[this.index + 1];
            if (this.equalLatLng(currentLoc, nextLoc)) {
                return;
            }
            this.angle = getAngle(currentLoc, nextLoc) * 180 / Math.PI;
            this.marker.setAngle(this.angle);
        }
    };
    CustomOverlayMarker.prototype.prev = function () {
        if (!this.index) { // first Index
            return;
        }
        this.index--;
        this.delta = null;
        this.marker.setPosition(this.path[this.index]);
        if (this.index < (this.path.length - 2)) {
            var currentLoc = this.path[this.index];
            var nextLoc = this.path[this.index + 1];
            if (this.equalLatLng(currentLoc, nextLoc)) {
                return;
            }
            this.angle = getAngle(this.path[this.index], this.path[this.index + 1]) * 180 / Math.PI;
            this.marker.setAngle(this.angle);
        }
    };
    CustomOverlayMarker.prototype.updateMarker = function () {
        var _this = this;
        if (this.index === this.path.length - 1) {
            this.eventEmitter.emitEvent('finished', {
                location: this.marker.getPosition(),
                status: 'finished',
                playing: this.playing,
                index: this.index
            });
            return 'no more points to show';
        }
        if (!this.playing) {
            return 'paused';
        }
        if (!this.marker) {
            setTimeout(function () { return _this.updateMarker(); }, 100);
        }
        this.eventEmitter.emitEvent('checkpoint', {
            location: this.marker.getPosition(),
            status: 'playing',
            playing: this.playing,
            index: this.index
        });
        var curr = this.marker.getPosition();
        var next = this.path[this.index + 1];
        var distance = latlngDistance({ lat: curr.lat(), lng: curr.lng() }, { lat: next.lat(), lng: next.lng() });
        // console.log('update car', next.lat(), next.lng(), distance, this.index);
        this.numDelta = Math.floor((distance * (1000 / this.interval)) / this.speed);
        // console.log(this.numDelta);
        this.index++;
        if (!this.numDelta) {
            // console.log('skip to next marker');
            this.updateMarker();
        }
        else {
            this.angle = getAngle(curr, next) * 180 / Math.PI;
            // console.log('angle', this.angle);
            this.marker.setAngle(this.angle);
            var deltaLat = (next.lat() - curr.lat()) / this.numDelta;
            var deltaLng = (next.lng() - curr.lng()) / this.numDelta;
            this.delta = { lat: deltaLat, lng: deltaLng };
            this.deltaIndex = 0;
            this.deltaCurr = { lat: curr.lat(), lng: curr.lng() };
            this.deltaLast = { lat: next.lat(), lng: next.lng() };
            // console.log(this.delta, this.deltaCurr, this.deltaLast, this.deltaIndex);
            setTimeout(function () { return _this.animate(); }, this.interval * Math.ceil(1 / this.speedMultiplier));
        }
    };
    CustomOverlayMarker.prototype.animate = function () {
        var _this = this;
        if (!this.deltaCurr || !this.delta || !this.deltaLast) {
            // console.log('update marker');
            this.updateMarker();
            return;
        }
        if (!this.playing) {
            // console.log('paused');
            return 'paused';
        }
        this.deltaCurr.lat += this.delta.lat * Math.ceil(this.speedMultiplier);
        this.deltaCurr.lng += this.delta.lng * Math.ceil(this.speedMultiplier);
        var newPos = { lat: this.deltaCurr.lat, lng: this.deltaCurr.lng };
        // console.log('new pos', newPos, this.deltaIndex);
        this.marker.setPosition(newPos);
        var nextIndex = this.deltaIndex + Math.ceil(this.speedMultiplier);
        if (nextIndex < this.numDelta) {
            this.deltaIndex = nextIndex;
            setTimeout(function () { return _this.animate(); }, this.interval * Math.ceil(1 / this.speedMultiplier));
        }
        else {
            // console.log('last', this.deltaLast);
            setTimeout(function () {
                _this.marker.setPosition(_this.deltaLast);
                _this.updateMarker();
            }, this.interval * Math.ceil(1 / this.speedMultiplier));
        }
    };
    return CustomOverlayMarker;
}());

// https://github.com/tenry92/typed-event-emitter
/******************************************************************************
 * The MIT License (MIT)                                                      *
 *                                                                            *
 * Copyright (c) 2016 Simon "Tenry" Burchert                                  *
 *                                                                            *
 * Permission is hereby granted, free of charge, to any person obtaining a    *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction, including without limitation  *
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,   *
 * and/or sell copies of the Software, and to permit persons to whom the      *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included in *
 * all copies or substantial portions of the Software.                        *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR *
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,   *
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL    *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER *
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING    *
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER        *
 * EALINGS IN THE SOFTWARE.                                                   *
 ******************************************************************************/
var Listener = /** @class */ (function () {
    function Listener(owner, event, listener) {
        this.owner = owner;
        this.event = event;
        this.listener = listener;
    }
    Listener.prototype.unbind = function () {
        this.owner.removeListener(this);
    };
    return Listener;
}());
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.eventListeners = new Map();
    }
    EventEmitter.prototype.on = function (event, listener) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, [listener]);
        }
        else {
            this.eventListeners.get(event).push(listener);
        }
        return new Listener(this, event, listener);
    };
    EventEmitter.prototype.addListener = function (event, listener) {
        return this.on(event, listener);
    };
    EventEmitter.prototype.removeListener = function () {
        if (arguments.length === 0) {
            this.eventListeners.clear();
        }
        else if (arguments.length === 1 && typeof arguments[0] === 'object') {
            var id = arguments[0];
            this.removeListener(id.event, id.listener);
        }
        else if (arguments.length >= 1) {
            var event_1 = arguments[0];
            var listener = arguments[1];
            if (this.eventListeners.has(event_1)) {
                var listeners = this.eventListeners.get(event_1);
                var idx = void 0;
                while (!listener || (idx = listeners.indexOf(listener)) !== -1) {
                    listeners.splice(idx, 1);
                }
            }
        }
    };
    /**
     * Emit event. Calls all bound listeners with args.
     */
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.eventListeners.has(event)) {
            for (var _a = 0, _b = this.eventListeners.get(event); _a < _b.length; _a++) {
                var listener = _b[_a];
                listener.apply(void 0, args);
            }
        }
    };
    /**
     * @typeparam T The event handler signature.
     */
    EventEmitter.prototype.registerEvent = function () {
        var _this = this;
        var eventBinder = function (handler) {
            return _this.addListener(eventBinder, handler);
        };
        return eventBinder;
    };
    return EventEmitter;
}());

var __extends = (undefined && undefined.__extends) || (function () {
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
var TravelEvents = /** @class */ (function (_super) {
    __extends(TravelEvents, _super);
    function TravelEvents(marker) {
        var _this = _super.call(this) || this;
        _this.onEvent = _this.registerEvent();
        _this.marker = marker;
        _this.marker.setEventEmitter(_this);
        return _this;
    }
    TravelEvents.prototype.emitEvent = function (event, data) {
        this.emit(this.onEvent, event, data);
    };
    return TravelEvents;
}(EventEmitter));

/**
 * A google maps library to replay gps locations with animations.
 * @author Manpreet Singh
 * @description A google maps library to replay gps locations with animations.
 * @class TravelMarker
 * * **npm package**: `travel-marker`
 */
var TravelMarker = /** @class */ (function () {
    /**
     * Creates an instance of TravelMarker.
     *
     *   ### Example
     *
     * Create default marker
     *
     *  ```ts
     *   // options
     *   const options = {
     *     map: map,  // map object
     *     speed: 50,  // default 10 , animation speed
     *     interval: 30, // default 10, marker refresh time
     *     speedMultiplier: 1, // default 1, for fast-forward/rewind
     *     cameraOnMarker: false,  // default false, move camera with marker
     *     markerOptions: { title: "Travel Marker" }
     *   };
     *   let marker = new TravelMarker(options);
     *   ```
     *
     *   Create Overlay marker
     *
     *   ```ts
     *   // options
     *   const options = {
     *     map: map,  // map object
     *     speed: 50,  // default 10 , animation speed
     *     interval: 30, // default 10, marker refresh time
     *     speedMultiplier: 1, // default 1, for fast-forward/rewind
     *     cameraOnMarker: false,  // default false, move camera with marker
     *     markerType: 'overlay',  // default: 'default'
     *     overlayOptions: {
     *       offsetX: 0, // default: 0, x-offset for overlay
     *       offsetY: 0, // default: 0, y-offset for overlay
     *       offsetAngle: 0, // default: 0, rotation-offset for overlay
     *       imageUrl: 'https://i.stack.imgur.com/lDrin.png', // image used for overlay
     *       imageWidth: 36, // image width of overlay
     *       imageHeight: 58, // image height of overlay
     *     }
     *   };
     *   let marker = new TravelMarker(options);
     *   ```
     * @param {TravelMarkerOptions} options
     */
    function TravelMarker(options) {
        /**
         * Defaults for TravelMarkerOptions for constructor
         * @private
        */
        this.defaultOptions = {
            map: null,
            speed: 35,
            interval: 20,
            speedMultiplier: 1,
            markerType: 'default',
            cameraOnMarker: false,
            markerOptions: {
                position: { lat: 0, lng: 0 }
            },
            overlayOptions: {
                offsetX: 0,
                offsetY: 0,
                offsetAngle: 0,
                imageUrl: 'https://i.stack.imgur.com/lDrin.png',
                imageWidth: 36,
                imageHeight: 58,
            },
            line: null
        };
        this.defaultMarkerOptions = {
            draggable: false,
        };
        this.path = [];
        this.marker = null;
        /** Tells whether animation is playing or not */
        this.playing = false;
        this.numDelta = 0;
        this.delta = null;
        this.index = 0;
        this.deltaIndex = 0;
        this.deltaCurr = null;
        this.deltaLast = null;
        this.angle = 0;
        /**
         * Use events to subscribe to animation events
         *
         * ### Example
         * ```ts
         * //  EventType = 'play' | 'paused' | 'finished' | 'reset' | 'checkpoint';
         * // checkpoint - when marker arrives on a location present in locationArray
         * // TravelData = {
         * //  location: LatLng; // marker current location
         * //  playing: boolean; // is animation playing?
         * //  index: number;  // index in locationArray
         * //  status: 'reset' | 'playing' | 'paused' | 'finished';  // animation status
         * // }
         * marker.event.onEvent((event: EventType, data: TravelData) => {
         *   // .... do something
         *  });
         * ```
         */
        this.event = null;
        if (options.map === null) {
            console.error('map cannot be null');
            return;
        }
        options = Object.assign(this.defaultOptions, options);
        options.markerOptions = Object.assign(options.markerOptions, this.defaultMarkerOptions);
        options.markerOptions.map = options.map;
        // check all parmas
        if (this.isValidOptions) {
            this.options = options;
        }
        else {
            console.error('Invalid options');
        }
        return this;
    }
    TravelMarker.prototype.isValidOptions = function (options) {
        return !isNaN(options.speed) && !isNaN(options.interval) &&
            (options.markerType === 'default' || options.markerType === 'symbol' || options.markerType === 'overlay') &&
            typeof options.line === 'object';
    };
    TravelMarker.prototype.setListener = function () {
        var _this = this;
        this.event = new TravelEvents(this.marker);
        this.event.onEvent(function (event, data) {
            _this.playing = data.playing;
        });
    };
    /**
     * Get TravelMarkerOptions used at creation
     * ### Example
     * ```ts
     *  marker.getOptions();
     * ```
     * @returns {TravelMarkerOptions}
     */
    TravelMarker.prototype.getOptions = function () {
        return JSON.parse(JSON.stringify(this.options));
    };
    /**
     * Return Current position of the marker aa LatLng object.
     * ### Example
     * ```ts
     * marker.getPosition(); // returns LatLng object
     * ```
     * @returns {(LatLng)} returns LatLng object
     */
    TravelMarker.prototype.getPosition = function () {
        return this.marker ? this.marker.getPosition() : null;
    };
    /**
     * Add Location points for animation
     * ### Example
     * ```ts
     * const locationArray = [new google.maps.Latlng(74,23), new google.maps.LatLng(74.02,23.02), new google.maps.LatLng(74.04, 23.04)];
     *
     * marker.addLocation(locationArray);
     * ```
     * @param {LatLng[]} [locationArray=[]]
     */
    TravelMarker.prototype.addLocation = function (locationArray) {
        var _this = this;
        if (locationArray === void 0) { locationArray = []; }
        locationArray.forEach(function (location) {
            if (location.lat && location.lng) {
                _this.path.push(location);
            }
        });
        if (!this.marker && this.path.length) {
            if (this.options.markerType === 'default') {
                var markerOptions = Object.assign(this.options.markerOptions, { position: { lat: this.path[0].lat(), lng: this.path[0].lng() } });
                this.marker = new DefaultMarker(markerOptions, this.options.speed, this.options.interval, this.options.speedMultiplier, this.path, this.options.cameraOnMarker);
            }
            else if (this.options.markerType === 'overlay') {
                this.marker = new CustomOverlayMarker(this.options.map, this.options.overlayOptions, this.options.speed, this.options.interval, this.options.speedMultiplier, this.path, this.options.cameraOnMarker);
            }
            this.setListener();
        }
        else if (this.marker) {
            this.marker.addLocation(locationArray);
        }
        else {
            console.error('Please insert valid location Array');
        }
    };
    /**
     * Play Animation
     * ### Example
     * ```ts
     *   marker.play();
     * ```
     */
    TravelMarker.prototype.play = function () {
        this.playing = true;
        this.marker.play();
    };
    /**
     * Pause Animation
     * ### Example
     * ```ts
     *   marker.pause();
     * ```
     */
    TravelMarker.prototype.pause = function () {
        this.playing = false;
        this.marker.pause();
    };
    /**
     * Reset marker to the starting point
     * ### Example
     * ```ts
     *   marker.reset();
     * ```
     */
    TravelMarker.prototype.reset = function () {
        this.playing = false;
        this.marker.reset();
    };
    /**
     * Go to next location
     * ### Example
     * ```ts
     *   marker.next();
     * ```
     */
    TravelMarker.prototype.next = function () {
        this.marker.next();
    };
    /**
     * Go to Previous location
     * ### Example
     * ```ts
     *   marker.prev();
     * ```
     */
    TravelMarker.prototype.prev = function () {
        this.marker.prev();
    };
    /**
     * Set Maker Update interval
     * ### Example
     * ```ts
     *   marker.setInterval(30);
     * ```
     * @param {number} [interval=this.options.interval]
     */
    TravelMarker.prototype.setInterval = function (interval) {
        if (interval === void 0) { interval = this.options.interval; }
        this.options.interval = interval;
        this.marker.setInterval(interval);
    };
    /**
     * Set speed multiplier to control animation speed
     * ### Example
     * Fast-Forward by 2X
     * ```ts
     * marker.setSpeedMultiplier(2);
     * ```
     *
     * Rewind/Slow by 0.5X
     * ```ts
     * marker.setSpeedMultiplier(0.5);
     * ```
     * @param {number} multiplier
     */
    TravelMarker.prototype.setSpeedMultiplier = function (multiplier) {
        this.options.speedMultiplier = multiplier;
        this.marker.setSpeedMultiplier(multiplier);
    };
    /**
     * Set Animation Speed
     * ### Example
     * ```ts
     *   marker.setSpeed(100);
     * ```
     * @param {number} [speed=this.options.speed]
     */
    TravelMarker.prototype.setSpeed = function (speed) {
        if (speed === void 0) { speed = this.options.speed; }
        this.options.speed = speed;
        this.marker.setSpeed(speed);
    };
    /**
     * Set Marker options like opacity etc. Only applicable for default marker types.
     * Returns false if not applicable
     *  ### Example
     * ```ts
     *  marker.setMarkerOptions({ opacity: 0.8 });
     * ```
     * @param {MarkerOptions} [options=this.options.markerOptions]
     * @returns {boolean}  returns false if not applicable
     */
    TravelMarker.prototype.setMarkerOptions = function (options) {
        if (options === void 0) { options = this.options.markerOptions; }
        if (this.options.markerType === 'default') {
            this.options.markerOptions = Object.assign(this.options.markerOptions, options);
            this.marker.updateOptions(this.options.markerOptions);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Set Overlay Options like offsets. Only applicable for overlay.
     * Returns false if not applicable
     * ### Example
     * ```ts
     *   marker.setOverlayOptions({ offsetAngle: 90 });
     * ```
     * @param {OverlayOptions} options  Overlay Options
     * @returns {boolean}  returns false if not applicable
     */
    TravelMarker.prototype.setOverlayOptions = function (options) {
        if (this.options.markerType === 'overlay') {
            this.options.overlayOptions = Object.assign(this.options.overlayOptions, options);
            this.marker.updateOptions(this.options.overlayOptions);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Set map of marker. Useful for show/hide and deletion.
     * ### Example
     * ```ts
     *   marker.setMap(null);
     * ```
     * @param {GoogleMap} map
     */
    TravelMarker.prototype.setMap = function (map) {
        this.marker.setMap(map);
    };
    /**
     * Add Listener to maker events like click, mouseover etc.
     *
     * ### Example - Listen for click events
     * ```ts
     * marker.addListener('click', () => {
     *     // do something...
     *   })
     * ```
     * @param {string} eventName - click,mousover,mouseout etc.
     * @param {Function} handler handler function
     */
    TravelMarker.prototype.addListener = function (eventName, handler) {
        var _this = this;
        if (!this.marker) {
            setTimeout(function () { return _this.addListener(eventName, handler); }, 300);
        }
        else {
            this.marker.addListener(eventName, handler);
        }
    };
    return TravelMarker;
}());




/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");








var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _agm_core__WEBPACK_IMPORTED_MODULE_6__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDgp1DcuImkkO2DFxdi4EVhxbC7fZqfABI',
                }),
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_7__["HomePage"],
                    },
                ]),
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_7__["HomePage"]],
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".controls {\n  position: absolute;\n  z-index: 999;\n  top: 10px;\n  left: 25px;\n  width: 25%;\n  font-size: 1.2em;\n}\n\n.blue {\n  background-color: blue;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Helvetica, sans-serif;\n}\n\n/* The actual timeline (the vertical ruler) */\n\n.timeline {\n  position: relative;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n/* The actual timeline (the vertical ruler) */\n\n.timeline::after {\n  content: \"\";\n  position: absolute;\n  width: 6px;\n  background-color: white;\n  top: 0;\n  bottom: 0;\n  left: 20%;\n  margin-left: -3px;\n}\n\n/* Container around content */\n\n.container {\n  padding: 10px;\n  position: relative;\n  background-color: inherit;\n  width: 20%;\n}\n\n/* The circles on the timeline */\n\n.container::after {\n  content: \"\";\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  right: -17px;\n  background-color: white;\n  border: 2px solid #ff9f55;\n  top: 15px;\n  border-radius: 50%;\n  z-index: 1;\n}\n\n/* Place the container to the left */\n\n.left {\n  left: 0;\n}\n\n/* Place the container to the right */\n\n.right {\n  left: 20%;\n}\n\n/* Add arrows to the left container (pointing right) */\n\n.left::before {\n  content: \" \";\n  height: 0;\n  position: absolute;\n  top: 22px;\n  width: 0;\n  z-index: 1;\n  right: 30px;\n  border: medium solid white;\n  border-width: 10px 0 10px 10px;\n  border-color: transparent transparent transparent white;\n}\n\n/* Add arrows to the right container (pointing left) */\n\n.right::before {\n  content: \" \";\n  height: 0;\n  position: absolute;\n  top: 22px;\n  width: 0;\n  z-index: 1;\n  left: 30px;\n  border: medium solid white;\n  border-width: 10px 10px 10px 0;\n  border-color: transparent white transparent transparent;\n}\n\n/* Fix the circle for containers on the right side */\n\n.right::after {\n  left: -16px;\n}\n\n/* The actual content */\n\n.content {\n  padding: 10px 10px;\n  background-color: white;\n  position: relative;\n  border-radius: 6px;\n  width: 140px;\n  font-size: 12pt;\n  opacity: 0.5;\n}\n\n@media screen and (max-width: 2000px) {\n  /* Place the timelime to the left */\n  .timeline::after {\n    left: 31px;\n  }\n\n  /* Full-width containers */\n  .container {\n    width: 100%;\n    padding-left: 70px;\n    padding-right: 5px;\n  }\n\n  /* Make sure that all arrows are pointing leftwards */\n  .container::before {\n    left: 60px;\n    border: medium solid white;\n    border-width: 10px 10px 10px 0;\n    border-color: transparent white transparent transparent;\n  }\n\n  /* Make sure all circles are at the same spot */\n  .left::after,\n.right::after {\n    left: 15px;\n  }\n\n  /* Make all right containers behave like the left ones */\n  .right {\n    left: 0%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rYmFuYXNoZWsvc291cmNlL0JUVC1GaXNoVHJhY2tlci1DbGllbnQvc3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBRUEsZ0JBQUE7QUNBRjs7QURNQTtFQUNFLHNCQUFBO0FDSEY7O0FETUE7RUFDRSxzQkFBQTtBQ0hGOztBRE1BO0VBQ0Usa0NBQUE7QUNIRjs7QURNQSw2Q0FBQTs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FDSEY7O0FETUEsNkNBQUE7O0FBQ0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsdUJBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQ0hGOztBRE1BLDZCQUFBOztBQUNBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxVQUFBO0FDSEY7O0FETUEsZ0NBQUE7O0FBQ0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQ0hGOztBRE1BLG9DQUFBOztBQUNBO0VBQ0UsT0FBQTtBQ0hGOztBRE1BLHFDQUFBOztBQUNBO0VBQ0UsU0FBQTtBQ0hGOztBRE1BLHNEQUFBOztBQUNBO0VBQ0UsWUFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSwwQkFBQTtFQUNBLDhCQUFBO0VBQ0EsdURBQUE7QUNIRjs7QURNQSxzREFBQTs7QUFDQTtFQUNFLFlBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsMEJBQUE7RUFDQSw4QkFBQTtFQUNBLHVEQUFBO0FDSEY7O0FETUEsb0RBQUE7O0FBQ0E7RUFDRSxXQUFBO0FDSEY7O0FETUEsdUJBQUE7O0FBQ0E7RUFDRSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ0hGOztBRE1BO0VBQ0UsbUNBQUE7RUFDQTtJQUNFLFVBQUE7RUNIRjs7RURNQSwwQkFBQTtFQUNBO0lBQ0UsV0FBQTtJQUNBLGtCQUFBO0lBQ0Esa0JBQUE7RUNIRjs7RURNQSxxREFBQTtFQUNBO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0lBQ0EsOEJBQUE7SUFDQSx1REFBQTtFQ0hGOztFRE1BLCtDQUFBO0VBQ0E7O0lBRUUsVUFBQTtFQ0hGOztFRE1BLHdEQUFBO0VBQ0E7SUFDRSxRQUFBO0VDSEY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udHJvbHMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDk5OTtcbiAgdG9wOiAxMHB4O1xuICBsZWZ0OiAyNXB4O1xuICB3aWR0aDogMjUlO1xuICAvLyBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMS4yZW07XG4gIC8vIGJhY2tncm91bmQ6IGJsYWNrO1xuICAvLyBvcGFjaXR5OiAwLjU7XG4gIC8vIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5ibHVlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbn1cblxuKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xufVxuXG4vKiBUaGUgYWN0dWFsIHRpbWVsaW5lICh0aGUgdmVydGljYWwgcnVsZXIpICovXG4udGltZWxpbmUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1heC13aWR0aDogMTIwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLyogVGhlIGFjdHVhbCB0aW1lbGluZSAodGhlIHZlcnRpY2FsIHJ1bGVyKSAqL1xuLnRpbWVsaW5lOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiA2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMjAlO1xuICBtYXJnaW4tbGVmdDogLTNweDtcbn1cblxuLyogQ29udGFpbmVyIGFyb3VuZCBjb250ZW50ICovXG4uY29udGFpbmVyIHtcbiAgcGFkZGluZzogMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xuICB3aWR0aDogMjAlO1xufVxuXG4vKiBUaGUgY2lyY2xlcyBvbiB0aGUgdGltZWxpbmUgKi9cbi5jb250YWluZXI6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDI1cHg7XG4gIGhlaWdodDogMjVweDtcbiAgcmlnaHQ6IC0xN3B4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmOWY1NTtcbiAgdG9wOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHotaW5kZXg6IDE7XG59XG5cbi8qIFBsYWNlIHRoZSBjb250YWluZXIgdG8gdGhlIGxlZnQgKi9cbi5sZWZ0IHtcbiAgbGVmdDogMDtcbn1cblxuLyogUGxhY2UgdGhlIGNvbnRhaW5lciB0byB0aGUgcmlnaHQgKi9cbi5yaWdodCB7XG4gIGxlZnQ6IDIwJTtcbn1cblxuLyogQWRkIGFycm93cyB0byB0aGUgbGVmdCBjb250YWluZXIgKHBvaW50aW5nIHJpZ2h0KSAqL1xuLmxlZnQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjJweDtcbiAgd2lkdGg6IDA7XG4gIHotaW5kZXg6IDE7XG4gIHJpZ2h0OiAzMHB4O1xuICBib3JkZXI6IG1lZGl1bSBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLXdpZHRoOiAxMHB4IDAgMTBweCAxMHB4O1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHdoaXRlO1xufVxuXG4vKiBBZGQgYXJyb3dzIHRvIHRoZSByaWdodCBjb250YWluZXIgKHBvaW50aW5nIGxlZnQpICovXG4ucmlnaHQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjJweDtcbiAgd2lkdGg6IDA7XG4gIHotaW5kZXg6IDE7XG4gIGxlZnQ6IDMwcHg7XG4gIGJvcmRlcjogbWVkaXVtIHNvbGlkIHdoaXRlO1xuICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAxMHB4IDA7XG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgd2hpdGUgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG59XG5cbi8qIEZpeCB0aGUgY2lyY2xlIGZvciBjb250YWluZXJzIG9uIHRoZSByaWdodCBzaWRlICovXG4ucmlnaHQ6OmFmdGVyIHtcbiAgbGVmdDogLTE2cHg7XG59XG5cbi8qIFRoZSBhY3R1YWwgY29udGVudCAqL1xuLmNvbnRlbnQge1xuICBwYWRkaW5nOiAxMHB4IDEwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgd2lkdGg6IDE0MHB4O1xuICBmb250LXNpemU6IDEycHQ7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMjAwMHB4KSB7XG4gIC8qIFBsYWNlIHRoZSB0aW1lbGltZSB0byB0aGUgbGVmdCAqL1xuICAudGltZWxpbmU6OmFmdGVyIHtcbiAgICBsZWZ0OiAzMXB4O1xuICB9XG5cbiAgLyogRnVsbC13aWR0aCBjb250YWluZXJzICovXG4gIC5jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctbGVmdDogNzBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG4gIH1cblxuICAvKiBNYWtlIHN1cmUgdGhhdCBhbGwgYXJyb3dzIGFyZSBwb2ludGluZyBsZWZ0d2FyZHMgKi9cbiAgLmNvbnRhaW5lcjo6YmVmb3JlIHtcbiAgICBsZWZ0OiA2MHB4O1xuICAgIGJvcmRlcjogbWVkaXVtIHNvbGlkIHdoaXRlO1xuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDEwcHggMDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50IHdoaXRlIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xuICB9XG5cbiAgLyogTWFrZSBzdXJlIGFsbCBjaXJjbGVzIGFyZSBhdCB0aGUgc2FtZSBzcG90ICovXG4gIC5sZWZ0OjphZnRlcixcbiAgLnJpZ2h0OjphZnRlciB7XG4gICAgbGVmdDogMTVweDtcbiAgfVxuXG4gIC8qIE1ha2UgYWxsIHJpZ2h0IGNvbnRhaW5lcnMgYmVoYXZlIGxpa2UgdGhlIGxlZnQgb25lcyAqL1xuICAucmlnaHQge1xuICAgIGxlZnQ6IDAlO1xuICB9XG59XG4iLCIuY29udHJvbHMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDk5OTtcbiAgdG9wOiAxMHB4O1xuICBsZWZ0OiAyNXB4O1xuICB3aWR0aDogMjUlO1xuICBmb250LXNpemU6IDEuMmVtO1xufVxuXG4uYmx1ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbn1cblxuLyogVGhlIGFjdHVhbCB0aW1lbGluZSAodGhlIHZlcnRpY2FsIHJ1bGVyKSAqL1xuLnRpbWVsaW5lIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi8qIFRoZSBhY3R1YWwgdGltZWxpbmUgKHRoZSB2ZXJ0aWNhbCBydWxlcikgKi9cbi50aW1lbGluZTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiA2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMjAlO1xuICBtYXJnaW4tbGVmdDogLTNweDtcbn1cblxuLyogQ29udGFpbmVyIGFyb3VuZCBjb250ZW50ICovXG4uY29udGFpbmVyIHtcbiAgcGFkZGluZzogMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xuICB3aWR0aDogMjAlO1xufVxuXG4vKiBUaGUgY2lyY2xlcyBvbiB0aGUgdGltZWxpbmUgKi9cbi5jb250YWluZXI6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMjVweDtcbiAgaGVpZ2h0OiAyNXB4O1xuICByaWdodDogLTE3cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmY5ZjU1O1xuICB0b3A6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgei1pbmRleDogMTtcbn1cblxuLyogUGxhY2UgdGhlIGNvbnRhaW5lciB0byB0aGUgbGVmdCAqL1xuLmxlZnQge1xuICBsZWZ0OiAwO1xufVxuXG4vKiBQbGFjZSB0aGUgY29udGFpbmVyIHRvIHRoZSByaWdodCAqL1xuLnJpZ2h0IHtcbiAgbGVmdDogMjAlO1xufVxuXG4vKiBBZGQgYXJyb3dzIHRvIHRoZSBsZWZ0IGNvbnRhaW5lciAocG9pbnRpbmcgcmlnaHQpICovXG4ubGVmdDo6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIGhlaWdodDogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDIycHg7XG4gIHdpZHRoOiAwO1xuICB6LWluZGV4OiAxO1xuICByaWdodDogMzBweDtcbiAgYm9yZGVyOiBtZWRpdW0gc29saWQgd2hpdGU7XG4gIGJvcmRlci13aWR0aDogMTBweCAwIDEwcHggMTBweDtcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB3aGl0ZTtcbn1cblxuLyogQWRkIGFycm93cyB0byB0aGUgcmlnaHQgY29udGFpbmVyIChwb2ludGluZyBsZWZ0KSAqL1xuLnJpZ2h0OjpiZWZvcmUge1xuICBjb250ZW50OiBcIiBcIjtcbiAgaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjJweDtcbiAgd2lkdGg6IDA7XG4gIHotaW5kZXg6IDE7XG4gIGxlZnQ6IDMwcHg7XG4gIGJvcmRlcjogbWVkaXVtIHNvbGlkIHdoaXRlO1xuICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAxMHB4IDA7XG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgd2hpdGUgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG59XG5cbi8qIEZpeCB0aGUgY2lyY2xlIGZvciBjb250YWluZXJzIG9uIHRoZSByaWdodCBzaWRlICovXG4ucmlnaHQ6OmFmdGVyIHtcbiAgbGVmdDogLTE2cHg7XG59XG5cbi8qIFRoZSBhY3R1YWwgY29udGVudCAqL1xuLmNvbnRlbnQge1xuICBwYWRkaW5nOiAxMHB4IDEwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgd2lkdGg6IDE0MHB4O1xuICBmb250LXNpemU6IDEycHQ7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMjAwMHB4KSB7XG4gIC8qIFBsYWNlIHRoZSB0aW1lbGltZSB0byB0aGUgbGVmdCAqL1xuICAudGltZWxpbmU6OmFmdGVyIHtcbiAgICBsZWZ0OiAzMXB4O1xuICB9XG5cbiAgLyogRnVsbC13aWR0aCBjb250YWluZXJzICovXG4gIC5jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctbGVmdDogNzBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG4gIH1cblxuICAvKiBNYWtlIHN1cmUgdGhhdCBhbGwgYXJyb3dzIGFyZSBwb2ludGluZyBsZWZ0d2FyZHMgKi9cbiAgLmNvbnRhaW5lcjo6YmVmb3JlIHtcbiAgICBsZWZ0OiA2MHB4O1xuICAgIGJvcmRlcjogbWVkaXVtIHNvbGlkIHdoaXRlO1xuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDEwcHggMDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50IHdoaXRlIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xuICB9XG5cbiAgLyogTWFrZSBzdXJlIGFsbCBjaXJjbGVzIGFyZSBhdCB0aGUgc2FtZSBzcG90ICovXG4gIC5sZWZ0OjphZnRlcixcbi5yaWdodDo6YWZ0ZXIge1xuICAgIGxlZnQ6IDE1cHg7XG4gIH1cblxuICAvKiBNYWtlIGFsbCByaWdodCBjb250YWluZXJzIGJlaGF2ZSBsaWtlIHRoZSBsZWZ0IG9uZXMgKi9cbiAgLnJpZ2h0IHtcbiAgICBsZWZ0OiAwJTtcbiAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var travel_marker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! travel-marker */ "./node_modules/travel-marker/dist/travel-marker.es2015.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _state_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state.service */ "./src/app/state.service.ts");
/* harmony import */ var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/internal/observable/of */ "./node_modules/rxjs/internal/observable/of.js");
/* harmony import */ var rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_internal_observable_timer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/internal/observable/timer */ "./node_modules/rxjs/internal/observable/timer.js");
/* harmony import */ var rxjs_internal_observable_timer__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_observable_timer__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");











var HomePage = /** @class */ (function () {
    function HomePage(platform, http, state) {
        var _this = this;
        this.platform = platform;
        this.http = http;
        this.state = state;
        this.title = 'BTT - FishTracker';
        this.height = 0;
        this.zoom = 9;
        this.lat = 25;
        this.lng = -80.627836399999983;
        this.travelRoute = null;
        this.speedMultiplier = 1;
        this.markerDates = [];
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_10__["Subject"]();
        this.caller = new _state_service__WEBPACK_IMPORTED_MODULE_5__["RepeatingServiceCall"](2000);
        this.markerDate = '';
        this.hexColor = '#000000';
        this.selectItem = '';
        this.clearMap = function () {
            _this.routePath.setMap(null);
            _this.startMarker.setMap(null);
            _this.endMarker.setMap(null);
            _this.travelRoute.setMap(null);
        };
        this.onMapReady = function (map) {
            _this.map = map;
            _this.map.mapTypeId = google.maps.MapTypeId.HYBRID;
            _this.map.zoomControl = true;
            _this.map.zoomControlOptions = {
                position: google.maps.ControlPosition.RIGHT_TOP,
            };
            _this.map.addListener('dragend', function () {
                if (_this.travelRoute) {
                    _this.activeNow('pause');
                    _this.travelRoute.pause();
                    _this.subject.next();
                }
            });
        };
        this.loadLayerData = function (layerId) {
            _this.http
                .get(_app_component__WEBPACK_IMPORTED_MODULE_7__["serviceURL"] + '?ID=' + layerId)
                .subscribe(function (layerData) { return _this.loadMap(layerData); }); // TODO: Error handling
        };
        this.loadMap = function (points) {
            _this.clearMapLayerData();
            _this.pointData = points;
            _this.createRoutePath(points);
            _this.setStartEndPoints(points);
            _this.initRoute();
        };
        this.createRoutePath = function (layerPoints) {
            _this.routePath = new google.maps.Polyline({
                strokeOpacity: 0.5,
                strokeColor: 'yellow',
                path: [],
                map: _this.map,
            });
            layerPoints.forEach(function (x) {
                return _this.routePath
                    .getPath()
                    .push(new google.maps.LatLng(x.Latitude, x.Longitude), x.ID);
            });
        };
        this.setStartEndPoints = function (points) {
            var initialPoint = new google.maps.LatLng(points[0].Latitude, points[0].Longitude);
            var endPoint = new google.maps.LatLng(points[points.length - 1].Latitude, points[points.length - 1].Longitude);
            _this.startMarker = _this.getRouteStartStopMarker(initialPoint, 'General Location', 100);
            _this.endMarker = _this.getRouteStartStopMarker(endPoint, 'Last Location');
            _this.map.panTo(initialPoint);
            _this.map.setZoom(12);
            // const maxZoomService = new google.maps.MaxZoomService();
            // this.map.addListener('click', showMaxZoom);
        };
        this.initRoute = function () {
            var routePoints = _this.routePath.getPath();
            var travelMarkerOptions = _this.getTravelMarkers();
            _this.travelRoute = new travel_marker__WEBPACK_IMPORTED_MODULE_3__["TravelMarker"](travelMarkerOptions);
            _this.travelRoute.addListener('click', function (e) {
                _this.placeMarkerAndPanTo(e.latLng, _this.map);
            });
            _this.travelRoute.addLocation(routePoints);
            _this.travelRoute.setSpeedMultiplier(1); // reset to initial play time upon selection of new layer source
            _this.timer
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(_this.subject))
                .subscribe(function () { return _this.onMapUpdate(); });
            setTimeout(function () { return _this.play(); }, 2000);
        };
        this.closest = function (latLong, listData) {
            var arr = listData;
            var pnt = latLong;
            var distArr = [];
            var dist = google.maps.geometry.spherical.computeDistanceBetween;
            // tslint:disable-next-line: forin
            for (var index in arr) {
                var currentPoint = new google.maps.LatLng(arr[index].Latitude, arr[index].Longitude);
                distArr.push([arr[index], dist(pnt, currentPoint)]);
            }
            return distArr.sort(function (a, b) {
                return a[1] - b[1];
            })[0][0];
        };
        this.findClosestMarker = function (latLng) {
            var distances = [];
            var closest = -1;
            // const filteredPointData = this.pointData.filter(
            //   x => x.RecordID >= this.currentRecordID,
            // );
            _this.pointData.forEach(function (point, i) {
                if (point.Latitude && point.Longitude) {
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(point.Latitude, point.Longitude), latLng);
                    distances[i] = distance;
                    if (closest === -1 || distance < distances[closest]) {
                        closest = i;
                    }
                }
            });
            if (_this.pointData[closest].RecordID === 894) {
                console.log(distances);
            }
            return _this.pointData[closest] ? _this.pointData[closest] : null;
        };
        this.clearMapLayerData = function () {
            _this.markerDate = '';
            _this.currentRecordID = null;
            _this.currentLatLong = null;
            _this.markerDates = [];
        };
        this.addToMarkersDates = function (markerDate) {
            _this.markerDates.push(markerDate);
            if (_this.markerDates.length > 7) {
                _this.markerDates.shift();
            }
        };
        this.placeMarkerAndPanTo = function (latLng, map) {
            _this.getEmptyMarker(latLng, map);
            google.maps.event.addListener(_this.emptyMarker, 'click', function () {
                _this.pauseAndShowInfoWindow(latLng, map);
            });
            google.maps.event.trigger(_this.emptyMarker, 'click');
            map.panTo(latLng);
        };
        this.getRouteStartStopMarker = function (initialPoint, labelText, scale) {
            if (scale === void 0) { scale = 14; }
            return new google.maps.Marker({
                position: initialPoint,
                map: _this.map,
                label: labelText,
                labelOptions: {
                    color: 'white',
                    fontFamily: '',
                    fontSize: '18px',
                    fontWeight: 'normal',
                },
                icon: {
                    scale: scale,
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'silver',
                    fillOpacity: 0.65,
                    strokeWeight: 0.5,
                    scaledSize: {
                        width: 60,
                        height: 60,
                    },
                    color: 'black',
                    fontFamily: '',
                    fontSize: '18px',
                    fontWeight: 'normal',
                },
            });
        };
        this.getInfoWindowContent = function (closestMarker) {
            var contentWindowContent = '<div>' +
                '<div style="padding:5px"><strong>Fish ID:</strong> ' +
                closestMarker.ID +
                '</div>' +
                '<div style="padding:5px"><strong>Area Caught: </strong>' +
                closestMarker['General.Location'] +
                '</div>' +
                '<div style="padding:5px"><strong>Fork Length:</strong> ' +
                closestMarker['FL.in'] +
                '</div>' +
                '<div style="padding:5px" ><strong>Weight:</strong> ' +
                closestMarker['WT.lb'] +
                'lbs</div>';
            if (closestMarker.Guide !== '') {
                var guideInfo = '<div style="padding:5px"><strong>Guide:</strong> ' +
                    closestMarker.Guide +
                    '</div>';
                contentWindowContent += guideInfo;
            }
            return contentWindowContent + '</div>';
        };
        this.getTravelMarkers = function () {
            return {
                map: _this.map,
                speed: 1000,
                interval: 10,
                speedMultiplier: 1,
                markerOptions: {
                    title: _this.pointData[0].Fish,
                    clickable: true,
                    map: _this.map,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        url: 'assets/tarpon.png',
                        animation: google.maps.Animation.DROP,
                        scaledSize: new google.maps.Size(94, 47),
                    },
                },
            };
        };
        this.removeMarkers = function () {
            if (_this.previousMarker && _this.previousMarker.setMap) {
                _this.previousMarker.setMap(null);
            }
        };
        this.pause = function () {
            _this.activeNow('pause');
            Object(rxjs_internal_observable_of__WEBPACK_IMPORTED_MODULE_6__["of"])(_this.placeMarkerAndPanTo(_this.travelRoute.getPosition(), _this.map)).subscribe(function () {
                _this.caller.stop();
                _this.subject.next();
            });
        };
        this.height = platform.height();
        this.stateService = this.state;
    }
    HomePage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.timer = Object(rxjs_internal_observable_timer__WEBPACK_IMPORTED_MODULE_9__["timer"])(1000, 1000);
                this.stateService.getSelectedLayer.subscribe(function (selectedLayer) {
                    if (selectedLayer) {
                        if (_this.routePath) {
                            _this.clearMap();
                        }
                        _this.loadLayerData(selectedLayer.ID);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.toggleBackgroundColor = function () {
        if (this.hexColor === '#000000') {
            this.hexColor = '#dddddd';
        }
        else {
            this.hexColor = '#000000';
        }
    };
    HomePage.prototype.inRange = function (x, min, max) {
        return (x - min) * (x - max) <= 0;
    };
    HomePage.prototype.onMapUpdate = function () {
        var _this = this;
        var currentMarker = this.travelRoute.marker;
        var closestMarkerIndex = currentMarker.index;
        console.log(closestMarkerIndex);
        if (!this.markerDates.some(function (x) {
            return x.Display_Date.split(' ')[1] ===
                _this.pointData[closestMarkerIndex].Display_Date.split(' ')[1] &&
                x.Season === _this.pointData[closestMarkerIndex].Season;
        })) {
            this.addToMarkersDates(this.pointData[closestMarkerIndex]);
        }
        this.currentRecordID = currentMarker.RecordID;
        this.markerDate = this.pointData[closestMarkerIndex].Display_Date;
        this.map.panTo(this.travelRoute.getPosition());
    };
    HomePage.prototype.getEmptyMarker = function (latLng, map) {
        this.emptyMarker = new google.maps.Marker({
            position: latLng,
            map: map,
        });
        this.emptyMarker.setVisible(false);
    };
    HomePage.prototype.pauseAndShowInfoWindow = function (latLng, map) {
        var _this = this;
        this.travelRoute.pause();
        this.activeNow('pause');
        this.removeMarkers();
        var closestMarker = this.findClosestMarker(latLng);
        var infoWindowContent = this.getInfoWindowContent(closestMarker);
        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(infoWindow, 'closeclick', function () {
            _this.emptyMarker.setMap(null);
            _this.play();
        });
        infoWindow.setContent(infoWindowContent);
        infoWindow.open(map, this.emptyMarker);
        this.previousMarker = this.emptyMarker;
    };
    HomePage.prototype.activeNow = function (item) {
        this.selectItem = item;
    };
    HomePage.prototype.play = function () {
        var _this = this;
        this.activeNow('play');
        this.removeMarkers();
        this.travelRoute.play();
        this.timer
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.subject))
            .subscribe(function () { return _this.onMapUpdate(); });
    };
    HomePage.prototype.reset = function () {
        this.clearMapLayerData();
        this.removeMarkers();
        this.travelRoute.reset();
    };
    HomePage.prototype.next = function () {
        this.travelRoute.pause();
        this.travelRoute.next();
        console.log(this.travelRoute.getPosition().toString()); // TODO USE THIS TO LOOK UP POINTDATE.DATETIME
        this.removeMarkers();
    };
    HomePage.prototype.prev = function () {
        this.travelRoute.pause();
        this.travelRoute.prev();
        this.removeMarkers();
    };
    HomePage.prototype.fast = function () {
        this.speedMultiplier *= 2;
        this.travelRoute.setSpeedMultiplier(this.speedMultiplier);
        this.removeMarkers();
    };
    HomePage.prototype.slow = function () {
        this.speedMultiplier /= 2;
        this.travelRoute.setSpeedMultiplier(this.speedMultiplier);
        this.removeMarkers();
    };
    HomePage.prototype.initEvents = function () {
        // if (this.marker) {
        //   this.marker.event.onEvent((event: EventType, data: TravelData) => {
        //     console.log(event, data);
        //   });
        // }
    };
    HomePage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: _state_service__WEBPACK_IMPORTED_MODULE_5__["StateService"] }
    ]; };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"],
            _state_service__WEBPACK_IMPORTED_MODULE_5__["StateService"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module-es5.js.map