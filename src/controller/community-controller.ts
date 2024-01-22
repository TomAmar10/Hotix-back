import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { CommunityModel } from "../models/community";

const addCommunity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const community = request.body;
  const newCommunity = new CommunityModel({
    _id: new mongoose.Types.ObjectId(),
    time_create: new Date(),
    ...community,
  });
  return newCommunity
    .save()
    .then((community) => response.status(201).json(community))
    .catch((err) => next(err));
};

const getCommunity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const CommunityId = request.params.communityId;
  return CommunityModel.findById(CommunityId)
    .populate([
      "members",
      "join_request",
      { path: "events", populate: { path: "tags" } },
    ])
    .then((community) =>
      community
        ? response.status(200).json(community)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const getAllCommunities = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return CommunityModel.find()
  .populate([
    "members",
    "join_request",
    { path: "events", populate: { path: "tags" } },
  ])
    .then((communitys) => {
      communitys
        ? response.status(200).json(communitys)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateCommunity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const CommunityId = request.params.communityId;
  return CommunityModel.findById(CommunityId)
    .then((community) => {
      if (community) {
        community.set(request.body);
        return community
          .save()
          .then((community) => response.status(201).json(community))
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const requestToJoin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestMemberID = request.body;
  const communityID = request.params.communityId;
  try {
    const community = await CommunityModel.findById(communityID);
    if (!community) {
      return response.status(404).json({ message: "Community not found" });
    }
    community.join_request.push(requestMemberID);
    await community.save();
    response.status(200).json({ message: "Request to join sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const deleteCommunity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const CommunityId = request.params.communityId;
  return CommunityModel.findByIdAndDelete(CommunityId)
    .then((community) =>
      community
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getCommunity,
  getAllCommunities,
  addCommunity,
  updateCommunity,
  deleteCommunity,
  requestToJoin,
};
