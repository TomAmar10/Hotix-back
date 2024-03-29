"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var event_1 = require("../models/event");
var addEvent = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var event, newEvent;
    return __generator(this, function (_a) {
        event = request.body;
        newEvent = new event_1.EventModel(__assign({ _id: new mongoose_1.default.Types.ObjectId(), time_create: new Date() }, event));
        return [2 /*return*/, newEvent
                .save()
                .then(function (event) { return response.status(201).json(event); })
                .catch(function (err) { return next(err); })];
    });
}); };
var getEvent = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var EventId;
    return __generator(this, function (_a) {
        EventId = request.params.eventId;
        return [2 /*return*/, event_1.EventModel.findById(EventId)
                .populate("id_category")
                .then(function (event) {
                return event
                    ? response.status(200).json(event)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllEvents = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, event_1.EventModel.find()
                .populate(["id_category", "tags"])
                .then(function (events) {
                events
                    ? response.status(200).json(events)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var updateEvent = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var EventId;
    return __generator(this, function (_a) {
        EventId = request.params.eventId;
        return [2 /*return*/, event_1.EventModel.findById(EventId)
                .then(function (event) {
                if (event) {
                    event.set(request.body);
                    return event
                        .save()
                        .then(function (event) { return response.status(201).json(event); })
                        .catch(function (err) { return next(err); });
                }
                else {
                    response.status(404).json({ message: "not found" });
                }
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var deleteEvent = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var EventId;
    return __generator(this, function (_a) {
        EventId = request.params.eventId;
        return [2 /*return*/, event_1.EventModel.findByIdAndDelete(EventId)
                .then(function (event) {
                return event
                    ? response.status(201).json({ message: "deleted" })
                    : response.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getEvent: getEvent,
    getAllEvents: getAllEvents,
    addEvent: addEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
};
