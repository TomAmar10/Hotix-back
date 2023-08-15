import { Request, Response, NextFunction } from "express";
import { TagModel } from "../models/tag";
import mongoose from "mongoose";

const getAllTags = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return TagModel.find()
    .then((categories) => {
      categories
        ? response.status(200).json(categories)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const addTag = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tag = request.body;
  const newTag = new TagModel({
    _id: new mongoose.Types.ObjectId(),
    ...tag,
  });
  return newTag
    .save()
    .then((tag) => response.status(201).json(tag))
    .catch((err) => next(err));
};

export default {
  getAllTags,
  addTag,
};
