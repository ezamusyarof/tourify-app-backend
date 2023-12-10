// src/handlers.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const queryDatabase = require('./db');

const registrationUser = async (request, h) => {
  try {
    const { email } = JSON.parse(request.payload);
    const query1 = 'SELECT * FROM data_pengguna WHERE email=?';
    const results1 = await queryDatabase(query1, [email]);
    if(Object.keys(results1).length === 0){
      const usernameByEmail = email.split('@')[0];
      const username = usernameByEmail.replace(/\./g, '-');
      // generate id
      const queryId = 'SELECT MAX(id % 1000) AS lastId FROM data_pengguna;';
      const resultsId = await queryDatabase(queryId);
      const randomNum = Math.floor(Math.random() * 9) + 1;
      const currentYear = new Date().getFullYear() % 100;
      const formattedYear = String(currentYear).padStart(2, '0');
      const currentMonth = new Date().getMonth() + 1;
      const formattedMonth = String(currentMonth).padStart(2, '0');
      const currentId = resultsId[0].lastId + 1;
      const formattedId = String(currentId).padStart(3, '0');
      const finalId = `${randomNum}${formattedYear}${formattedMonth}${1}${formattedId}`;
      console.log(finalId);
      // send code
      const query2 = 'SELECT codeVerif FROM data_pengguna';
      const results2 = await queryDatabase(query2);
      const existingCodes = results2.map(row => row.code_verif);
      let code_verif;
      do {
        code_verif = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      } while (existingCodes.includes(code_verif));
      console.log(code_verif);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'ezaelmusya@gmail.com',
          pass: 'djkvnderqzoklguh'
        }
      });
      let message = "Hello "+username+", your verification code is "+code_verif+"."
      const mailOptions = {
        from: 'ezaelmusya@gmail.com',
        to: email,
        subject: 'Tourify Account Verification',
        text: message
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      const query3 = 'INSERT INTO data_pengguna (id, email, username, codeVerif) VALUES (?, ?, ?, ?)';
      const results3 = await queryDatabase(query3, [finalId, email, username, code_verif]);
      const query4 = 'UPDATE data_pengguna SET registrationDate = CURRENT_TIMESTAMP WHERE email=?';
      const results4 = await queryDatabase(query4, [email]);
      return h.response({
        statusCode: 200,
        message: 'User registration successfully'
      }).code(200);
    }
    return h.response({
      statusCode: 400,
      error: 'User registration failed',
      message: 'Email already exists'
    }).code(400);
  } catch (err) {
    return h.response({ 
      statusCode: 500, 
      error: "Internal Server Error",
      message: err.message
    }).code(500);
  }
};

const verificationUser = async (request, h) => {
  try {
    const { email, codeVerif } = JSON.parse(request.payload);
    const query1 = 'SELECT * FROM data_pengguna WHERE email=? AND codeVerif=?';
    const results1 = await queryDatabase(query1, [email, codeVerif]);
    if(Object.keys(results1).length !== 0){
      const query2 = 'UPDATE data_pengguna SET verificationDate = CURRENT_TIMESTAMP WHERE email=?';
      const results2 = await queryDatabase(query2, [email]);
      return h.response({
        statusCode: 200,
        message: 'User verification successfully'
      }).code(200);
    }
    return h.response({
      statusCode: 400,
      error: 'User verification failed',
      message: 'Incorrect verification code'
    }).code(400);
  } catch (err) {
    return h.response({
      statusCode: 500, 
      error: "Internal Server Error", 
      message: err.message 
    }).code(500);
  }
};

const loginUser = async (request, h) => {
  try {
    const { email, password } = JSON.parse(request.payload);
    const passwordSecured = crypto.createHash('md5').update(password).digest('hex');
    const query1 = 'SELECT * FROM data_pengguna WHERE email=? AND password=?';
    const results1 = await queryDatabase(query1, [email, passwordSecured]);
    console.log(passwordSecured);
    if(Object.keys(results1).length !== 0){
      const query2 = 'UPDATE data_pengguna SET lastLoginDate = CURRENT_TIMESTAMP WHERE email=?';
      const results2 = await queryDatabase(query2, [email]);
      const query3 = 'SELECT id FROM data_pengguna WHERE email = ?';
      const results3 = await queryDatabase(query3, [email]);
      return h.response({
        statusCode: 200,
        message: 'Login succesfully',
        data: { 
          userId: results3[0].id,
          email: email 
        }
      }).code(200);
    }
    return h.response({
      statusCode: 400,
      error: 'Login failed',
      message: 'Incorrect password'
    }).code(400);
  } catch (err) {
    return h.response({
      statusCode: 500, 
      error: "Internal Server Error", 
      message: err.message 
    }).code(500);
  }
};

const logoutUser = async (request, h) => {
  try {
    const { email } = JSON.parse(request.payload);
    const query = 'UPDATE data_pengguna SET lastLogoutDate = CURRENT_TIMESTAMP WHERE email=?';
    const results = await queryDatabase(query, [email]);
    console.log(results.changedRows);
    if (results.changedRows !== 0){
      return h.response({
        statusCode: 200,
        message: 'Logout succesfully'
      }).code(200);
    } else{
      return h.response({
        statusCode: 400,
        error: 'Logout failed'
      }).code(400);
    }
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const updateUserPassword = async (request, h) => {
  try {
    const { email } = request.params;
    const { password } = JSON.parse(request.payload);
    const passwordSecured = crypto.createHash('md5').update(password).digest('hex');
    console.log(passwordSecured);
    const query1 = 'UPDATE data_pengguna SET password = ? WHERE email = ?';
    const results1 = await queryDatabase(query1, [passwordSecured, email]);
    const query2 = 'SELECT id FROM data_pengguna WHERE email = ?';
    const results2 = await queryDatabase(query2, [email]);
    return h.response({
      statusCode: 200,
      message: 'Update password succesfully',
      data: { 
        userId: results2[0].id,
        email: email 
      }
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const updateUserData = async (request, h) => {
  try {
    const { email } = request.params;
    const { 
      gender, birth_date, photo, telephone, whatsapp, lon, lat
    } = JSON.parse(request.payload);
    const query = 'UPDATE data_pengguna SET gender = ?, birth_date = ?, photo = ?, telephone = ?, whatsapp = ?, lon = ?, lat = ? WHERE email = ?';
    const results = await queryDatabase(query, [gender, birth_date, photo, telephone, whatsapp, lon, lat, email]);
    console.log(results);
    return h.response({
      statusCode: 200,
      message: 'Update data succesfully',
      data: { email: email }
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const getUserData = async (request, h) => {
  try {
    const { email } = request.params;
    const query = 'SELECT * FROM data_pengguna WHERE email = ?;';
    const results = await queryDatabase(query, [email]);
    console.log(Object.keys(results).length, results);
    return h.response({
      statusCode: 200,
      message: 'Success',
      data: results
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const getDestinations = async (request, h) => {
  try {
    const query = 'SELECT * FROM data_wisata';
    const results = await queryDatabase(query);
    const totalCulinary = 3;
    return h.response({
      statusCode: 200,
      message: 'Success',
      data: results
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const getFavoriteDestinations = async (request, h) => {
  try {
    const { userId } = request.params;
    const query = 'SELECT destinationId FROM data_wisata_favorit WHERE userId = ?';
    const results = await queryDatabase(query, [userId]);
    const data = results.map(item => item.destinationId);
    return h.response({
      statusCode: 200,
      message: 'Success',
      data: data
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const addFavoritDestination = async (request, h) => {
  try {
    const { userId, destinationId } = JSON.parse(request.payload);
    const query1 = 'SELECT * FROM data_wisata_favorit WHERE userId=? AND destinationId=?';
    const results1 = await queryDatabase(query1, [userId, destinationId]);
    console.log(userId, destinationId, results1);
    const query2 = 'INSERT INTO data_wisata_favorit (destinationId, userId) VALUES (?, ?)'
    await queryDatabase(query2, [destinationId, userId]);
    return h.response({
      statusCode: 200,
      message: 'Added destination to favorites succesfully'
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const removeFavoritDestination = async (request, h) => {
  try {
    const { userId, destinationId } = request.params;
    const query1 = 'DELETE FROM data_wisata_favorit WHERE userId=? AND destinationId=?';
    const results1 = await queryDatabase(query1, [userId, destinationId]);
    return h.response({
      statusCode: 200,
      message: 'Removed destination from favorites succesfully'
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const getCulinary = async (request, h) => {
  try {
    const query = 'SELECT * FROM data_kuliner';
    const results = await queryDatabase(query);
    return h.response({
      statusCode: 200,
      message: 'Success',
      data: results
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const bookingNewTrip = async (request, h) => {
  try {
    const { 
      userId, 
      destinationId,
      tourGuideId,
      name,
      email,
      telephone,
      tripDate,
      note
    } = JSON.parse(request.payload);
    const now = new Date();
    const bookingCode = `TRF${now.getFullYear().toString().slice(-2)}${('0' + (now.getMonth() + 1)).slice(-2)}${('0' + now.getDate()).slice(-2)}${('0' + now.getHours()).slice(-2)}${('0' + now.getMinutes()).slice(-2)}${('0' + now.getSeconds()).slice(-2)}${userId}`;
    console.log(bookingCode);
    const query3 = 'SELECT ticketPrice FROM data_wisata WHERE id = ?'
    const results3 = await queryDatabase(query3, [destinationId]);
    const totalPayment = results3[0].ticketPrice;
    const query1 = 'INSERT INTO data_booking (userId, destinationId, tourGuideId, bookingCode, tripDate, totalPayment, ordererNote, bookingDate) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
    await queryDatabase(query1, [userId, destinationId, tourGuideId, bookingCode, tripDate, totalPayment, note]);
    const query2 = 'SELECT * FROM data_booking WHERE bookingCode = ?'
    await queryDatabase(query2, [bookingCode]);
    let withTourGuide = true;
    if(tourGuideId == 0){ withTourGuide = false; }
    return h.response({
      statusCode: 200,
      message: 'Trip booked',
      data: {
        id: 1,
        code: bookingCode,
        total: totalPayment,
        withTourGuide: withTourGuide,
        statusPayment: 0
      }
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

module.exports = { 
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
};
