import User from '../class/userClass.js';
import { userSessions } from './session.js';

export const addUser = (uuid, socket, payload) => {
  const user = new User(uuid, socket, payload);
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

export const getUuidBySocket = (socket) => {
  return userSessions.find((user) => user.socket === socket);
};
