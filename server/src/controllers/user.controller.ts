import express from 'express';
import StatusCode from '../config/StatusCode';
import { IUser } from '../models/user';
import {
  toggleAdmin,
  getUserByEmail,
  getAllUsersFromDB,
  deleteUserById,
} from '../services/user.service';

const getAllUsers = async (req: express.Request, res: express.Response) => {
  // return all users
  return getAllUsersFromDB()
    .then((userList) => {
      res.status(StatusCode.OK).send(userList);
    })
    .catch((e) => {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: e });
    });
};

const upgradePrivilege = async (
  req: express.Request,
  res: express.Response,
) => {
  // Check if user exists
  console.log('here');
  const { email } = req.body;
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    return res.status(StatusCode.NOT_FOUND).send({
      message: `User with email ${email} does not exist.`,
    });
  }

  if (user.admin) {
    return res.status(StatusCode.BAD_REQUEST).send({
      message: `user is already admin`,
    });
  }
  // Upgrade's the user's admin status
  return toggleAdmin(user._id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    .catch((e) => {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: e });
    });
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const { email } = req.params;
  // check if user to delete is an admin
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    return res.status(StatusCode.NOT_FOUND).send({
      message: `User to delete does not exist`,
    });
  }
  const reqUser: IUser | undefined = req.user as IUser;

  // TODO: check if this is the right response code
  if (!reqUser || !reqUser.email) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .send({ message: 'error in auth' });
  }

  if (reqUser.email === user.email) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .send({ message: 'Cannot delete self' });
  }

  if (user.admin) {
    return res
      .status(StatusCode.FORBIDDEN)
      .send({ message: 'Cannot delete an admin' });
  }
  // Delete user
  return deleteUserById(user._id)
    .then(() => res.sendStatus(StatusCode.OK))
    .catch((e) => {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: e });
    });
};

export { getAllUsers, upgradePrivilege, deleteUser };
