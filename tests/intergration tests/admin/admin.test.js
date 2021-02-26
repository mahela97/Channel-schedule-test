const adminController = require("../../../controllers/adminController");
const pool = require("../../../config/database");
const request = require("supertest");

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

  describe("GET /", () => {
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

      adminController.loginPageAdmin(req, res);
      expect(res.render).toHaveBeenCalledWith("admin/login", expected);
    });
  });
});
