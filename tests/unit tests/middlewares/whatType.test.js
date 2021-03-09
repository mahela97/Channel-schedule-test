const { whatType } = require("../../../middleware/whatType");
let server;

describe("whatType Middleware", () => {
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

  it("Should redirect to user home page if session type is user", () => {
    req.session.type = "user";
    whatType(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("user/home");
  });
  it("Should redirect to staff home page if session type is staff", () => {
    req.session.type = "staff";
    whatType(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("staff/home");
  });
  it("Should redirect tologin page if there is no session type  ", () => {
    whatType(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});
