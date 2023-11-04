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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const cors_1 = __importDefault(require("cors"));
const ratelimiter_1 = __importDefault(require("./middleware/ratelimiter"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./middleware");
const link_service_1 = __importDefault(require("./services/link.service"));
const error_1 = __importDefault(require("./utils/error"));
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
//  Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use((0, cors_1.default)());
app.use(express_1.default.json({ extended: false }));
app.use((0, ratelimiter_1.default)());
app.use(middleware_1.logger);
//connect to db
(0, database_1.default)(() => console.log("check anything"));
//these are our routes
app.use("/api/v1", routes_1.default);
app.get("/", (_req, res) => {
    res.send("Hello from express + ts");
});
/**
 * @swagger
 * /{slug}:
 *   get:
 *     summary: Redirect.
 *     description: Redirect to the link
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the record
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully found the link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description:  link detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get("/:slug", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = _req.params;
    try {
        const link = yield link_service_1.default.findOne({ slug });
        if (!link)
            throw new error_1.default(404, "link record not found");
        return res.redirect(link.originalUrl);
    }
    catch (error) {
        next(error);
    }
}));
app.use(middleware_1.errorResponder);
app.use(middleware_1.invalidPathHandler);
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
