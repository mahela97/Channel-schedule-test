const { isAdminNotLogged } = require("../../../middleware/isAdminNotLogged");
let server;

describe("isAdminNotLogged Middleware", () => {
  const res = {
    redirect: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    server = require("../../../index").server;
  });

  afterEach(() => {
    server.close();
  });

  it("Should call next if session does not have an user_Id", () => {
    const req = {
      session: {
        user_id: false,
      },
    };
    isAdminNotLogged(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("Should call next if session user_id is not admin", () => {
    const req = {
      session: {
        user_id: "staff",
      },
    };
    isAdminNotLogged(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("Should redirect to admin home page if seesion user_id is admin", () => {
    const req = {
      session: {
        user_id: "admin",
      },
    };
    isAdminNotLogged(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("admin/home");
  });
});
