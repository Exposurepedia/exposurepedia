/* eslint camelcase: 0 */
/**
 * All the controller functions containing the logic for routes relating to
 * admin users such as getting all users, deleting users and upgrading users.
 */
import express from 'express';
import ApiError from '../util/apiError';
import {
  createHierarchy,
  getHierarchiesByUser,
  updateHierarchy,
  deleteHierarchy,
  getHierarchyById,
} from '../services/hierarchy.service';
import { getUserByEmail } from '../services/user.service';
import StatusCode from '../util/statusCode';

/**
 * Get all hierarchies created by a user. The id of the user is expected to be in the request body.
 * Upon success, return a list of all hierarchies in the res body with 200 OK status code.
 */
const getUserHierarchies = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { user_email } = req.params;
  const user = await getUserByEmail(user_email);
  const user_id = user?.id;

  if (!user_id) {
    next(ApiError.missingFields(['user_id']));
    return;
  }

  try {
    const hierarchies = await getHierarchiesByUser(user_id);
    res.status(StatusCode.OK).json(hierarchies);
  } catch (err) {
    next(ApiError.internal("Unable to retrieve a user's hierarchies"));
  }
};

const getHierarchy = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { hierarchy_id, user_email } = req.params;
  const user = await getUserByEmail(user_email);
  const user_id = user?.id;
  if (!hierarchy_id || !user_id) {
    next(ApiError.missingFields(['hierarchy_id', 'user_id']));
    return;
  }

  try {
    const hierarchy = await getHierarchyById(hierarchy_id, user_id);
    res.status(StatusCode.OK).json(hierarchy);
  } catch (err) {
    next(ApiError.internal('Unable to find the hierarchy'));
  }
};

const createHierarchyHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email, title, description } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound('User not found'));
    return;
  }

  if (!title || !description) {
    next(ApiError.missingFields(['title', 'description']));
    return;
  }

  createHierarchy(user.id, title, description)
    .then((hierarchy) => {
      res.status(StatusCode.OK).json(hierarchy);
    })
    .catch((e) => {
      next(ApiError.internal(e.toString().split('\n')[0]));
    });
};

const updateHierarchyHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { user_email, hierarchy_id } = req.params;
  const { title, description, exposureTriplets } = req.body;

  const user = await getUserByEmail(user_email);
  const user_id = user?.id;
  if (!user_id || !hierarchy_id) {
    next(ApiError.missingFields(['user_id', 'hierarchy_id']));
    return;
  }

  try {
    await updateHierarchy(
      user_id,
      hierarchy_id,
      title,
      description,
      exposureTriplets,
    );
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to update hierarchy'));
  }
};

const deleteHierarchyHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { user_email, hierarchy_id } = req.params;
  if (!hierarchy_id) {
    next(ApiError.missingFields(['hierarchy_id']));
    return;
  }

  const user = await getUserByEmail(user_email);
  const user_id = user?.id;

  try {
    await deleteHierarchy(user_id, hierarchy_id);
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to delete hierarchy'));
  }
};

export {
  getUserHierarchies,
  createHierarchyHandler,
  updateHierarchyHandler,
  deleteHierarchyHandler,
  getHierarchy,
};
