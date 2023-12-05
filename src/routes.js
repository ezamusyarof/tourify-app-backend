// src/routes.js
const {
  registrationUser,
  verificationUser,
  loginUser,
  logoutUser,
  updateUserPassword,
  updateUserData,
  getUserData,
  getDestinations,
  addFavoritDestination,
  removeFavoritDestination,
  getCulinary,
  getDataHandler,
  addDataHandler,
  updateDataHandler,
} = require('./handlers');

const routes = [
  {
    method: 'POST',
    path: '/user/registration',
    handler: registrationUser,
  },
  {
    method: 'POST',
    path: '/user/verification',
    handler: verificationUser,
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: loginUser,
  },
  {
    method: 'POST',
    path: '/user/logout',
    handler: logoutUser,
  },
  {
    method: 'PUT',
    path: '/user/password/{email}',
    handler: updateUserPassword,
  },
  {
    method: 'PUT',
    path: '/user/{email}',
    handler: updateUserData,
  },
  {
    method: 'GET',
    path: '/user/{email}',
    handler: getUserData,
  },
  {
    method: 'GET',
    path: '/destinations',
    handler: getDestinations,
  },
  {
    method: 'POST',
    path: '/favorites',
    handler: addFavoritDestination,
  },
  {
    method: 'DELETE',
    path: '/favorites/{user_id}/{destination_id}',
    handler: removeFavoritDestination,
  },
  {
    method: 'GET',
    path: '/culinary',
    handler: getCulinary,
  },
  {
    method: 'GET',
    path: '/api/data',
    handler: getDataHandler,
  },
  {
    method: 'POST',
    path: '/api/data',
    handler: addDataHandler,
  },
  {
    method: 'PUT',
    path: '/api/data/{id}',
    handler: updateDataHandler,
  },
];

module.exports = routes;
  