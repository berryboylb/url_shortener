import express from "express";
import LinkController from "../controllers/link.controller";
import { validateSchema, validateQuery } from "../middleware/validator";
import { queryDtoSchema, linkDto, UpdateDto } from "../validators";
const router = express.Router();

router.post("/", validateSchema(linkDto), LinkController.create);

router.get("/", validateQuery(queryDtoSchema), LinkController.find);

router.get("/:id", LinkController.findOne);

router.put("/:id", validateSchema(UpdateDto), LinkController.UpdatedOne);

router.delete("/:id", LinkController.deleteOne);

export default router;
