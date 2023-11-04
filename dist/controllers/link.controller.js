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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_service_1 = __importDefault(require("../services/link.service"));
const error_1 = __importDefault(require("../utils/error"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const exportResult = {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originalUrl, slug } = req.body;
            try {
                const slugExist = slug ? yield link_service_1.default.findOne({ slug }) : null;
                if (slugExist)
                    throw new error_1.default(400, "custom name already exist");
                let newSlug;
                do {
                    newSlug = link_service_1.default.generateRandomSlug(7);
                } while (yield link_service_1.default.findOne({ slug: newSlug }));
                const newRecord = yield link_service_1.default.create({
                    originalUrl,
                    shortUrl: `${process.env.SERVER_URL}/${slug ? slug : newSlug}`,
                    slug: slug ? slug : newSlug,
                });
                return res.status(201).json({
                    status: "Success",
                    message: "Successfully shortened the link ",
                    data: newRecord,
                });
            }
            catch (error) {
                console.log("Error shortening link " + error);
                next(error);
            }
        });
    },
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield link_service_1.default.find(req.body, req.query);
                return res.status(201).json({
                    status: "Success",
                    message: "Successfully shortened the link ",
                    data: record,
                });
            }
            catch (error) {
                console.log("Error fetching all the links " + error);
                next(error);
            }
        });
    },
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const record = yield link_service_1.default.findById(id);
                if (!record)
                    throw new error_1.default(404, "link record not found");
                return res.status(201).json({
                    status: "Success",
                    message: "Successfully found the link ",
                    data: record,
                });
            }
            catch (error) {
                console.log("Error finding link " + error);
                next(error);
            }
        });
    },
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const record = yield link_service_1.default.findById(id);
                if (!record)
                    throw new error_1.default(404, "link record not found");
                const deleteRecord = yield link_service_1.default.removeOne(id);
                return res.status(201).json({
                    status: "Success",
                    message: "Successfully deleted the link ",
                    data: deleteRecord,
                });
            }
            catch (error) {
                console.log("Error deleting link " + error);
                next(error);
            }
        });
    },
    UpdatedOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { originalUrl } = req.body;
            try {
                const record = yield link_service_1.default.findById(id);
                if (!record)
                    throw new error_1.default(404, "link record not found");
                const updateRecord = yield link_service_1.default.findOneAndUpdate({ _id: record._id }, { originalUrl, updated_at: new Date() }, { new: true });
                return res.status(201).json({
                    status: "Success",
                    message: "Successfully updating the link ",
                    data: updateRecord,
                });
            }
            catch (error) {
                console.log("Error updating link " + error);
                next(error);
            }
        });
    },
};
exports.default = exportResult;
