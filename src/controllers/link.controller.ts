import { Request, Response, NextFunction } from "express";
import LinkService from "../services/link.service";
import AppError from "../utils/error";
import dotenv from "dotenv";
dotenv.config();
const exportResult = {
  async create(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, slug } = req.body;
    try {
      const slugExist = slug ? await LinkService.findOne({ slug }) : null;
      if (slugExist) throw new AppError(400, "custom name already exist");
      let newSlug;
      do {
        newSlug = LinkService.generateRandomSlug(7);
      } while (await LinkService.findOne({ slug: newSlug }));
      const newRecord = await LinkService.create({
        originalUrl,
        shortUrl: `${process.env.SERVER_URL}/${slug ? slug : newSlug}`,
        slug: slug ? slug : newSlug,
      });
      return res.status(201).json({
        status: "Success",
        message: "Successfully shortened the link ",
        data: newRecord,
      });
    } catch (error) {
      console.log("Error shortening link " + error);
      next(error);
    }
  },
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const record = LinkService.find(req.body, req.query);
      return res.status(201).json({
        status: "Success",
        message: "Successfully shortened the link ",
        data: record,
      });
    } catch (error) {
      console.log("Error fetching all the links " + error);
      next(error);
    }
  },
  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const record = await LinkService.findById(id);
      if (!record) throw new AppError(404, "link record not found");
      return res.status(201).json({
        status: "Success",
        message: "Successfully found the link ",
        data: record,
      });
    } catch (error) {
      console.log("Error finding link " + error);
      next(error);
    }
  },

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const record = await LinkService.findById(id);
      if (!record) throw new AppError(404, "link record not found");
      const deleteRecord = await LinkService.removeOne(id);
      return res.status(201).json({
        status: "Success",
        message: "Successfully deleted the link ",
        data: deleteRecord,
      });
    } catch (error) {
      console.log("Error deleting link " + error);
      next(error);
    }
  },

  async UpdatedOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { originalUrl } = req.body;
    try {
      const record = await LinkService.findById(id);
      if (!record) throw new AppError(404, "link record not found");
      const updateRecord = await LinkService.findOneAndUpdate(
        { _id: record._id },
        { originalUrl, updated_at: new Date() },
        { new: true }
      );
      return res.status(201).json({
        status: "Success",
        message: "Successfully updating the link ",
        data: updateRecord,
      });
    } catch (error) {
      console.log("Error updating link " + error);
      next(error);
    }
  },
};
export default exportResult;
