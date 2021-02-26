const adminController = require("../../../controllers/adminController");
const pool = require("../../../config/database");
const request = require("supertest");
const { post } = require("../../../routes");

let server;

describe("/Admin tests", () => {
  const res = {
    render: null,
    redirect: null,
  };

  beforeEach(async () => {
    server = await require("../../../index").server;
    res.render = jest.fn();
    res.redirect = jest.fn();
  });
  afterEach(async () => {
    await server.close();
    res.render = null;
    res.redirect = null;
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("GET /admin Admin page view render test", () => {
    it("should return admin Page", async () => {
      const req = {
        query: {},
        Session: {
          cookie: {},
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
      };
    });

    it("should redirect to admin loginPage if validation fails", async () => {
      req.body.email = "nothing";
      await adminController.loginAdmin(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `admin?error="EMAIL" MUST BE A VALID EMAIL&email=${req.body.email}`
      );
    });

    it("should redirect to admin loginPage if Email is not correct", async () => {
      req.body.email = "notadmin@gmail.com";
      console.log(req);
      await adminController.loginAdmin(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `admin?error="EMAIL" MUST BE A VALID EMAIL&email=${req.body.email}`
      );
    });
  });
});
