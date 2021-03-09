const { allowEmail } = require("../../../middleware/allowEmail");
let server;

describe("allowEmail Middleware", () => {
  const res = {
    redirect: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    server = require("../../../index").server;
  });

  afterEach(async () => {
    server.close();
  });

  it("Should call next if request session has an email", () => {
    const req = {
      session: {
        email: "test@gmail.com",
      },
    };
    allowEmail(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("Should redirect to /login if session does not have a email", () => {
    const req = {
      session: {
        email: false,
      },
    };
    allowEmail(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/login");
  });
});
