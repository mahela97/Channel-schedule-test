const adminController = require("../../../controllers/adminController");
const request = require("supertest");
const { post } = require("../../../routes");
const { getChannel } = require("../../../models/adminModel");

let server;
let pool;

describe("/Admin tests", () => {
  const res = {
    render: null,
    redirect: null,
  };

  beforeEach(async () => {
    server = await require("../../../index").server;
    pool = require("../../../config/database");
    res.render = jest.fn();
    res.redirect = jest.fn();
  });
  afterEach(async () => {
    await server;
    res.render = null;
    res.redirect = null;
  });

  afterAll(async () => {
    //await pool.end();
  });

  describe("GET /admin Admin page view render test", () => {
    it("Should return admin Page", async () => {
      const req = {
        query: {},
        session: {
          user_id: null,
          type: null,
        },
      };

      const expected = {
        error: undefined,
        email: undefined,
      };

      await adminController.loginPageAdmin(req, res);
      expect(res.render).toHaveBeenCalledWith("admin/login", expected);
    });
  });

  describe("/POST Admin Signin Functionality test", () => {
    let req;
    beforeEach(() => {
      req = {
        body: {
          email: "admin@gmail.com",
          password: "123456",
        },
        query: {},
        session: {
          user_id: null,
          type: null,
        },
      };
    });

    it("Should redirect to admin loginPage if validation fails", async () => {
      req.body.email = "nothing";
      await adminController.loginAdmin(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `admin?error="EMAIL" MUST BE A VALID EMAIL&email=${req.body.email}`
      );
    });

    it("Should redirect to admin loginPage if Email is incorrect", async () => {
      req.body.email = "notadmin@gmail.com";
      await adminController.loginAdmin(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `admin?error=Incorrect email=${req.body.email}`
      );
    });

    it("Should redirect to admin loginPage if Email or password is incorrect", async () => {
      req.body.email = "admin@gmail.com";
      req.body.password = "123456789";

      await adminController.loginAdmin(req, res);

      expect(res.redirect).toHaveBeenCalledWith(
        `admin?error=Email or Password is incorrect &email=${req.body.email}`
      );
    });

    it("Should redirect to admin/home if email and password are correct", async () => {
      await adminController.loginAdmin(req, res);

      expect(res.redirect).toHaveBeenCalledWith("admin/home");
    });
  });

  describe("GET /admin/home-admin Admin home-page view render test", () => {
    it("Should render admin home Page", async () => {
      const req = {
        query: {},
        Session: {
          user_id: "admin@gmail.com",
          type: "admin",
        },
      };

      await adminController.adminHomepage(req, res);
      expect(res.render).toHaveBeenCalledWith("admin/home-admin");
    });
  });

  describe("GET /admin/addchannel Admin addchannel view render test", () => {
    it("Should render admin addchannel", async () => {
      const req = {
        query: {},
        Session: {
          user_id: "admin@gmail.com",
          type: "admin",
        },
      };

      await adminController.addChannelPage(req, res);
      expect(res.render).toHaveBeenCalledWith("admin/addchannel");
    });
  });

  describe("/POST Admin add channel Functionality test", () => {
    let req;
    beforeEach(() => {
      req = {
        body: {
          channelname: "test",
        },
        query: {},
        session: {
          user_id: "admin@gmail.com",
          type: "admin",
        },
      };
    });

    afterEach(async () => {
      await pool.query("DELETE FROM CHANNEL WHERE CHANNEL_ID=?;", ["test123"]);
    });

    it("Should redirect to admin add channel page with success", async () => {
      await adminController.adminAddChannel(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`addchannel?Success`);
    });

    it("Should redirect to admin add channel page with error code", async () => {
      req.body.channelname = "test1";
      await adminController.adminAddChannel(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`addchannel?error`);
    });
  });

  describe("GET admin/accountupdates Admin update account page view render test", () => {
    it("Should render admin update account page", async () => {
      const req = {
        query: {},
        Session: {
          user_id: "admin@gmail.com",
          type: "admin",
        },
      };

      await adminController.accountUpdatePage(req, res);
      expect(res.render).toHaveBeenCalledWith("admin/accountupdates");
    });
  });

  describe("GET admin/addStaffPage Admin add staff page view render", () => {
    it("Should render Admin add staff page", async () => {
      const req = {
        query: {},
        Session: {
          user_id: "admin@gmail.com",
          type: "admin",
        },
      };
      const expected = {
        error: undefined,
        email: undefined,
        status: undefined,
      };

      res.locals = jest.fn();

      await adminController.addStaffPage(req, res);
      expect(res.render).toHaveBeenCalledWith("admin/account", expected);
    });
  });

  describe("POST Admin adding staff functionality test", () => {
    let req;
    beforeEach(async () => {
      req = {
        body: {
          firstname: "testFirstName",
          lastname: "testLastName",
          channel_id: "test123",
          email: "test@gmail.com",
          password: "test123",
          password_repeat: "test123",
        },
        query: {},
        Session: {
          user_id: "admin@gmail.com",
          type: "admin",
        },
      };

      await pool.query(
        "INSERT INTO CHANNEL (CHANNEL_ID,CHANNEL_NAME) VALUES (?,?);",
        ["test123", "test"]
      );
    });

    afterEach(async () => {
      await pool.query("DELETE FROM CHANNEL WHERE CHANNEL_ID=?", ["test123"]);
    });
    it("Should give error if validation fails", async () => {
      req.body.password = "123";

      await adminController.addStaff(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `addstaff?error="PASSWORD" LENGTH MUST BE AT LEAST 6 CHARACTERS LONG
        &email=${req.body.email}`
      );
    });

    it("Should redirect to add staff page with error if the email already exist", async () => {
      req.body.email = "test1@gmail.com";
      await adminController.addStaff(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `addstaff?error=Email is already exist&email=${body.email}&user_id=${undefined}`
      );
    });
  });
});
