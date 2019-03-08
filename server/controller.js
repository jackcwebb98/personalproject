const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const { companyName, businessType, username, password } = req.body;
    const db = req.app.get('db');
    const { session } = req;

    if (!username || !companyName || !businessType || !password) {
      return res.sendStatus(409);
    }

    let takenUsername = await db.findUser(username);
    takenUsername = takenUsername[0].count;

    if (takenUsername != 0) {
      return res.sendStatus(409);
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let user = await db.register({
      company_name: companyName,
      business_type: businessType,
      admin_username: username,
      admin_password: hash,
    });
    user = user[0];
    session.user = user;
    res.status(200).send(session.user);
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    const { session } = req;

    let user = await db.login(username);
    user = user[0];
    if (!user) {
      return res.sendStatus(404);
    }
    let authenticated = bcrypt.compareSync(password, user.admin_password);
    if (authenticated) {
      delete user.admin_password;
      session.user = user;
      res.status(200).send(session.user);
    } else {
      res.sendStatus(401);
    }
  },
  getUser: (req, res) => {
    setTimeout(() => {
      const { user } = req.session;
      if (user) {
        res.status(200).send(user);
      } else {
        res.sendStatus(401);
      }
    }, 0);
  },
  logout: (req, res) => {
    req.session.destroy(function() {
      res.sendStatus(200);
    });
  },
  getAllCompanies: async (req, res) => {
    const db = req.app.get('db');

    let companies = await db.getAllCompanies();
    res.status(200).send(companies);
  },
  createCustomer: (req, res) => {
    const db = req.app.get('db');
    const { customerName, plateNumber, vehicle, customerCompanyId } = req.body;

    db.newCustomer({
      real_name: customerName,
      car_make: vehicle,
      plate_number: plateNumber,
      company_id: customerCompanyId,
    });
    res.sendStatus(200);
  },
  getAllCustomers: async (req, res) => {
    const db = req.app.get('db');
    const { companyId } = req.body;

    let list = await db.getAllCustomers(companyId);
    if (list[0]) {
      res.status(200).send(list);
    } else {
      res.sendStatus(404);
    }
  },
  deleteCustomer: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.body;

    db.deleteCustomer(id).then(res.sendStatus(200));
  },
};
