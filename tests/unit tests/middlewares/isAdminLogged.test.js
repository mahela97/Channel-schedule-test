const { isAdminLogged } = require("../../../middleware/isAdminLogged");
let server;

describe("isAdminLogged Middleware", () => {
  const res = {
    redirect: jest.fn(),
  };

  const next = jest.fn();

  const req = {
    session: {
      type: null,
    },
  };

  beforeEach(() => {
    server = require("../../../index").server;
    req.session.type = null;
  });

  afterEach(() => {
    server.close();
  });

  it("Should call next if session type is admin", () => {
    req.session.type = "admin";
    isAdminLogged(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("Should redirect to /admin if there is no session type", () => {
    isAdminLogged(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/admin");
  });
});
