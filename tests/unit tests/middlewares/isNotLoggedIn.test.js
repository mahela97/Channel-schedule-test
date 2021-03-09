const { isNotLoggedIn } = require("../../../middleware/isNotLoggedIn");
let server;

describe("isNotLoggedIn Middleware", () => {
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

  it("Should call next if there is no session user_id ", () => {
    isNotLoggedIn(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("Should redirect to login page if there is a user_id", () => {
    req.session.user_id = "test@gmail.com";
    isNotLoggedIn(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});
