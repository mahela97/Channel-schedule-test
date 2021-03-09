const { anyPage } = require("../../../middleware/anyRoute");
let server;

describe("anyPage Middleware", () => {
  const res = {
    redirect: jest.fn(),
  };
  const req = {
    session: {
      type: null,
    },
  };

  beforeEach(() => {
    server = require("../../../index").server;
    req.session.type = null;
  });

  afterEach(async () => {
    server.close();
  });

  it("Should redirect to admin home page if session type is admin", () => {
    req.session.type = "admin";
    anyPage(req, res);
    expect(res.redirect).toHaveBeenCalledWith(`/admin/home`);
  });

  it("Should redirect to user home page if session type is user", () => {
    req.session.type = "user";
    anyPage(req, res);
    expect(res.redirect).toHaveBeenCalledWith(`/user/home`);
  });

  it("Should redirect to staff home page if session type is staff", () => {
    req.session.type = "staff";
    anyPage(req, res);
    expect(res.redirect).toHaveBeenCalledWith(`/staff/home`);
  });

  it("Should redirect to login page if there is no session type", () => {
    anyPage(req, res);
    expect(res.redirect).toHaveBeenCalledWith(`/login`);
  });
});
