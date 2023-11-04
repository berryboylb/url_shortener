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
const link_schema_1 = __importDefault(require("../schemas/link.schema"));
const crypto_1 = require("crypto");
const exportResult = {
    generateRandomSlug(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const randomBytesCount = Math.ceil((length * 3) / 4); // Adjust to ensure enough randomness
        let slug = "";
        while (slug.length < length) {
            const randomBytesBuffer = (0, crypto_1.randomBytes)(randomBytesCount);
            for (let i = 0; i < randomBytesCount; i++) {
                if (slug.length < length) {
                    const randomIndex = randomBytesBuffer.readUInt8(i) % characters.length;
                    slug += characters.charAt(randomIndex);
                }
            }
        }
        return slug;
    },
    create(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdSample = new link_schema_1.default(reqBody);
            return createdSample.save();
        });
    },
    find(condition, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = query.page ? query.page : 1;
            const perPage = query.perPage ? query.perPage : 12;
            const skip = (page - 1) * perPage;
            const filter = Object.assign({}, condition);
            if (query.from)
                filter.createdAt = { $gte: new Date(query.from) };
            if (query.to)
                filter.createdAt = Object.assign(Object.assign({}, filter.createdAt), { $lte: new Date(query.to) });
            const [records, total] = yield Promise.all([
                yield link_schema_1.default.find(filter).limit(perPage).skip(skip).exec(),
                yield link_schema_1.default.countDocuments().exec(),
            ]);
            const pageCount = Math.ceil(total / perPage);
            const nextPage = page < pageCount ? page + 1 : null;
            const prevPage = page > 1 ? page - 1 : null;
            return {
                pageCount,
                data: records,
                currentPage: query.page,
                nextPage,
                prevPage,
            };
        });
    },
    findOne(condition, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield link_schema_1.default.findOne(condition, options === null || options === void 0 ? void 0 : options.select);
            return record;
        });
    },
    findById(id, select, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield link_schema_1.default.findById(id, select, options);
            return record;
        });
    },
    findOneAndUpdate(condition, fields, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return link_schema_1.default.findOneAndUpdate(condition, fields, options);
        });
    },
    removeOne(_id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield link_schema_1.default.deleteOne({ _id }, options);
            return res ? true : false;
        });
    },
};
exports.default = exportResult;
