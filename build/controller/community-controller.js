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
var community_1 = require("../models/community");
var addCommunity = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var community, newCommunity;
    return __generator(this, function (_a) {
        community = request.body;
        newCommunity = new community_1.CommunityModel(__assign({ _id: new mongoose_1.default.Types.ObjectId(), time_create: new Date() }, community));
        return [2 /*return*/, newCommunity
                .save()
                .then(function (community) { return response.status(201).json(community); })
                .catch(function (err) { return next(err); })];
    });
}); };
var getCommunity = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var CommunityId;
    return __generator(this, function (_a) {
        CommunityId = request.params.communityId;
        return [2 /*return*/, community_1.CommunityModel.findById(CommunityId)
                .populate(["members", "events", "join_request"])
                .then(function (community) {
                return community
                    ? response.status(200).json(community)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllCommunities = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, community_1.CommunityModel.find()
                .populate(["members", "events", "join_request"])
                .then(function (communitys) {
                communitys
                    ? response.status(200).json(communitys)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var updateCommunity = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var CommunityId;
    return __generator(this, function (_a) {
        CommunityId = request.params.communityId;
        return [2 /*return*/, community_1.CommunityModel.findById(CommunityId)
                .then(function (community) {
                if (community) {
                    community.set(request.body);
                    return community
                        .save()
                        .then(function (community) { return response.status(201).json(community); })
                        .catch(function (err) { return next(err); });
                }
                else {
                    response.status(404).json({ message: "not found" });
                }
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var requestToJoin = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var requestMemberID, communityID, community, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestMemberID = request.body;
                communityID = request.params.communityId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, community_1.CommunityModel.findById(communityID)];
            case 2:
                community = _a.sent();
                if (!community) {
                    return [2 /*return*/, response.status(404).json({ message: "Community not found" })];
                }
                community.join_request.push(requestMemberID);
                return [4 /*yield*/, community.save()];
            case 3:
                _a.sent();
                response.status(200).json({ message: "Request to join sent successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error:", error_1);
                response.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteCommunity = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var CommunityId;
    return __generator(this, function (_a) {
        CommunityId = request.params.communityId;
        return [2 /*return*/, community_1.CommunityModel.findByIdAndDelete(CommunityId)
                .then(function (community) {
                return community
                    ? response.status(201).json({ message: "deleted" })
                    : response.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getCommunity: getCommunity,
    getAllCommunities: getAllCommunities,
    addCommunity: addCommunity,
    updateCommunity: updateCommunity,
    deleteCommunity: deleteCommunity,
    requestToJoin: requestToJoin,
};