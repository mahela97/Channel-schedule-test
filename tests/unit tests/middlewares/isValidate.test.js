const { isValidate } = require("../../../middleware/isValidate");
let server;

describe("isValidate Middleware", () => {
  const res = {
    redirect: jest.fn(),
  };

  const next = jest.fn();

  const req = {
    session: {
      valid: null,
    },
  };

  beforeEach(() => {
    server = require("../../../index").server;
    req.session.valid = null;
  });

  afterEach(() => {
    server.close();
  });

  it("Should call next if session valid is true ", () => {
    req.session.valid = true;
    isValidate(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("Should redirect to login page if session valid is false", () => {
    isValidate(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/login");
  });
});
