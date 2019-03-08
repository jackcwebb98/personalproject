require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller');

const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);

const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING,
});

app.use(express.json());
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1010101010394942 },
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('server connected');
  app.listen(SERVER_PORT, () =>
    console.log(`listening on server ${SERVER_PORT}`)
  );
});

app.post(`/auth/register`, ctrl.register);
app.post(`/auth/login`, ctrl.login);
app.post(`/auth/logout`, ctrl.logout);
app.post(`/customer/new`, ctrl.createCustomer);
app.post(`/api/customers`, ctrl.getAllCustomers);
app.post(`/delete/customer`, ctrl.deleteCustomer);

app.get(`/api/current`, ctrl.getUser);
app.get(`/api/companies`, ctrl.getAllCompanies);
