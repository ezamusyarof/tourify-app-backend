// src/handlers.js
const nodemailer = require('nodemailer');
const queryDatabase = require('./db');

const registrationUser = async (request, h) => {
  try {
    const { email } = JSON.parse(request.payload);
    const query1 = 'SELECT * FROM data_pengguna WHERE email=?';
    const results1 = await queryDatabase(query1, [email]);
    if(Object.keys(results1).length === 0){
      const usernameByEmail = email.split('@')[0];
      const username = usernameByEmail.replace(/\./g, '-');
      const query2 = 'SELECT code_verif FROM data_pengguna';
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
      const query3 = 'INSERT INTO data_pengguna (email, username, code_verif) VALUES (?, ?, ?)';
      const results3 = await queryDatabase(query3, [email, username, code_verif]);
      const query4 = 'UPDATE data_pengguna SET registration_date = CURRENT_TIMESTAMP WHERE email=?';
      const results4 = await queryDatabase(query4, [emal]);
      return h.response({
        statusCode: 200,
        message: 'User registration successfully',
        data: { email: email }
      }).code(200);
    }
    return h.response({
      statusCode: 400,
      error: 'User registration failed',
      message: 'Email already exists'
    }).code(400);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const verificationUser = async (request, h) => {
  try {
    const { email, code_verif } = JSON.parse(request.payload);
    const query1 = 'SELECT * FROM data_pengguna WHERE email=? AND code_verif=?';
    const results1 = await queryDatabase(query1, [email, code_verif]);
    if(Object.keys(results1).length !== 0){
      const query2 = 'UPDATE data_pengguna SET verification_date = CURRENT_TIMESTAMP WHERE email=?';
      const results2 = await queryDatabase(query2, [email]);
      return h.response({
        statusCode: 200,
        message: 'User verification successfully',
        data: { email: email }
      }).code(200);
    }
    return h.response({
      statusCode: 400,
      error: 'User verification failed',
      message: 'Incorrect verification code'
    }).code(400);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const loginUser = async (request, h) => {
  try {
    const { email, password } = JSON.parse(request.payload);
    const query1 = 'SELECT * FROM data_pengguna WHERE email=? AND password=?';
    const results1 = await queryDatabase(query1, [email, password]);
    if(Object.keys(results1).length !== 0){
      const query2 = 'UPDATE data_pengguna SET last_login_date = CURRENT_TIMESTAMP WHERE email=?';
      const results2 = await queryDatabase(query2, [email]);
      return h.response({
        statusCode: 200,
        message: 'Login succesfully',
        data: { email: email }
      }).code(200);
    }
    return h.response({
      statusCode: 400,
      error: 'Login failed',
      message: 'Incorrect password'
    }).code(400);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const logoutUser = async (request, h) => {
  try {
    const { email } = JSON.parse(request.payload);
    const query = 'UPDATE data_pengguna SET last_logout_date = CURRENT_TIMESTAMP WHERE email=?';
    const results = await queryDatabase(query, [email]);
    console.log(results.changedRows);
    return h.response({
      statusCode: 200,
      message: 'Logout succesfully',
      data: { email: email }
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const updateUserPassword = async (request, h) => {
  try {
    const { email } = request.params;
    const { password } = JSON.parse(request.payload);
    const query = 'UPDATE data_pengguna SET password = ? WHERE email = ?';
    const results = await queryDatabase(query, [password, email]);
    return h.response({
      statusCode: 200,
      message: 'Update password succesfully',
      data: { email: email }
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
    return h.response({
      statusCode: 200,
      message: 'Success',
      data: results
    }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const addFavoritDestination = async (request, h) => {
  try {
    const { user_id, destination_id } = JSON.parse(request.payload);
    const query1 = 'SELECT * FROM data_wisata_favorit WHERE user_id=? AND destination_id=?';
    const results1 = await queryDatabase(query1, [user_id, destination_id]);
    console.log(user_id, destination_id, results1);
    const query2 = 'INSERT INTO data_wisata_favorit (destination_id, user_id, date_update) VALUES (?, ?, CURRENT_TIMESTAMP)'
    await queryDatabase(query2, [destination_id, user_id]);
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
    const { user_id, destination_id } = request.params;
    const query1 = 'DELETE FROM data_wisata_favorit WHERE user_id=? AND destination_id=?';
    const results1 = await queryDatabase(query1, [user_id, destination_id]);
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

const getDataHandler = async (request, h) => {
  try {
    const query = 'SELECT * FROM data_wisata';
    const results = await queryDatabase(query);
    return results;
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const addDataHandler = async (request, h) => {
  try {
    const { field1, field2 } = request.payload;
    const query = 'INSERT INTO nama_tabel (field1, field2) VALUES (?, ?)';
    const results = await queryDatabase(query, [field1, field2]);
    return { message: 'Data added successfully' };
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const updateDataHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const { field1, field2 } = request.payload;
    const query = 'UPDATE nama_tabel SET field1 = ?, field2 = ? WHERE id = ?';
    const results = await queryDatabase(query, [field1, field2, id]);
    return { message: 'Data updated successfully' };
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
  addFavoritDestination,
  removeFavoritDestination,
  getCulinary,
  getDataHandler, 
  addDataHandler, 
  updateDataHandler 
};
