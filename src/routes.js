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
  getFavoriteDestinations,
  addFavoritDestination,
  removeFavoritDestination,
  getCulinary,
  bookingNewTrip
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
    method: 'GET',
    path: '/favorites/{userId}',
    handler: getFavoriteDestinations,
  },
  {
    method: 'POST',
    path: '/favorites',
    handler: addFavoritDestination,
  },
  {
    method: 'DELETE',
    path: '/favorites/{userId}/{destinationId}',
    handler: removeFavoritDestination,
  },
  {
    method: 'GET',
    path: '/culinary',
    handler: getCulinary,
  },
  {
    method: 'POST',
    path: '/booking',
    handler: bookingNewTrip,
  },
];

module.exports = routes;
  