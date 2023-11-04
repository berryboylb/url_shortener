import LinkModel, { ILinkSchema } from "../schemas/link.schema";
import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { QueryDto } from "../constants";
import { randomBytes } from "crypto";
const exportResult = {
  generateRandomSlug(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomBytesCount = Math.ceil((length * 3) / 4); // Adjust to ensure enough randomness

    let slug = "";
    while (slug.length < length) {
      const randomBytesBuffer = randomBytes(randomBytesCount);
      for (let i = 0; i < randomBytesCount; i++) {
        if (slug.length < length) {
          const randomIndex =
            randomBytesBuffer.readUInt8(i) % characters.length;
          slug += characters.charAt(randomIndex);
        }
      }
    }

    return slug;
  },
  async create(reqBody: any) {
    const createdSample = new LinkModel(reqBody);
    return createdSample.save();
  },

  async find(condition: FilterQuery<ILinkSchema>, query: QueryDto) {
    const page = query.page ? query.page : 1;
    const perPage = query.perPage ? query.perPage : 12;
    const skip = (page - 1) * perPage;

    const filter: FilterQuery<ILinkSchema> = {
      ...condition,
    };

    if (query.from) filter.createdAt = { $gte: new Date(query.from) };

    if (query.to)
      filter.createdAt = { ...filter.createdAt, $lte: new Date(query.to) };

    const [records, total] = await Promise.all([
      await LinkModel.find(filter).limit(perPage).skip(skip).exec(),
      await LinkModel.countDocuments().exec(),
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
  },
  async findOne(
    condition: FilterQuery<ILinkSchema>,
    options?: { select: string }
  ) {
    const record = await LinkModel.findOne(condition, options?.select);
    return record;
  },
  async findById(
    id: string,
    select?: ProjectionType<ILinkSchema>,
    options?: QueryOptions<ILinkSchema>
  ) {
    const record = await LinkModel.findById(id, select, options);
    return record;
  },
  async findOneAndUpdate(
    condition: FilterQuery<ILinkSchema>,
    fields: UpdateQuery<ILinkSchema>,
    options?: QueryOptions<ILinkSchema>
  ): Promise<any | undefined> {
    return LinkModel.findOneAndUpdate(condition, fields, options);
  },
  async removeOne(
    _id: string,
    options?: QueryOptions<ILinkSchema>
  ): Promise<boolean> {
    const res = await LinkModel.deleteOne({ _id }, options);
    return res ? true : false;
  },
};
export default exportResult;
