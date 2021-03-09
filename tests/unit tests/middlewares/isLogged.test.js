const { isLogged } = require("../../../middleware/isLogged");
let server;

describe("isLogged Middleware", () => {
  const res = {
    redirect: jest.fn(),
  };

  const next = jest.fn();

  const req = {
    session: {
      user_id: null,
    },
  };

  beforeEach(() => {
    server = require("../../../index").server;
    req.session.user_id = null;
  });

  afterEach(() => {
    server.close();
  });

  it("Should redirect to login page if session has no user_id", () => {
    isLogged(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/login");
  });

  it("Should call next if session has user_id staff or user", () => {
    req.session.user_id = "test@gmail.com";
    isLogged(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
