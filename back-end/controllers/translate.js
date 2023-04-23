const express = require('express');
const router = express.Router();
// parse requests of content-type - application/json
router.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));
const axios = require('axios');



