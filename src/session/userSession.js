import User from '../class/userClass.js';
import { userSessions } from './session.js';

export const addUser = (uuid, token) => {
  const user = new User(uuid, token);
  userSessions.push(user);
  return user;
};

export const removeUser = (uuid) => {
  let index;
  index = userSessions.findIndex((user) => user.uuid === uuid);
  userSessions.splice(index, 1);
};

export const getUser = (uuid) => {
  return userSessions.find((user) => user.uuid === uuid);
};

export const getAllUserSessions = () => {
  return userSessions;
};

export const clearSession = () => {
  userSessions.splice(0, userSessions.length);
};

export const getUuidByToken = (token) => {
  return userSessions.find((user) => user.token === token);
};
