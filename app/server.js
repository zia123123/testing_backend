const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
const errorHandler = require("./middlewares/errorHandler");
const passport = require('passport');

// Settings
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes'));
app.use(errorHandler);
app.use(passport.initialize());

app.listen(PORT, function () {
  console.log(`Example app listening on http://localhost:${PORT}!`);

  sequelize.authenticate().then(() => {
      console.log('Database konnek');
  })
});