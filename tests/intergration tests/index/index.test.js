const adminController = require("../../../controllers/adminController");
const indexController = require("../../../controllers/indexController");

let server;
let pool;

describe("/Admin tests", () => {
  const res = {
    render: null,
    redirect: null,
  };

  beforeEach(async () => {
    server = await require("../../../index").server;
    pool = require("../../../config/database");

    res.render = jest.fn();
    res.redirect = jest.fn();
  });
  afterEach(async () => {
    server.close();
    res.render = null;
    res.redirect = null;
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("GET Render User and staff login page", () => {
    it("Should render user and staff login page", async () => {
      const req = {
        query: {},
        sessionID: "_o11KBIluXk_l6E61zT8OHkKJ1FFvUwF",
        body: {},
      };

      const expected = {
        error: undefined,
        email: undefined,
      };

      await indexController.loginPage(req, res);
      expect(res.render).toHaveBeenCalledWith("login", expected);
    });
  });

  describe("POST user and staff login functionalties", () => {
    beforeEach(() => {
      req = {
        body: {
          email: "testuser1@gmail.com",
          password: "123456",
        },
        session: { user_id: "testuser1@gmail.com", type: "user" },
      };
    });

    it("Should redirect to login if validation fails", async () => {
      req.body.email = "nothing";
      await indexController.loginUser(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        'login?error="EMAIL" MUST BE A VALID EMAIL&email=nothing'
      );
    });

    it("Should redirect to login if user is not registered", async () => {
      req.body.email = "notuser@gmail.com";
      await indexController.loginUser(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `login?error=User is not exist&email=${req.body.email}`
      );
    });

    it("Should redirect to login if password is incorrect", async () => {
      req.body.password = "wrong";
      await indexController.loginUser(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `login?error=Email or Password is incorrect
        &email=${req.body.email}`
      );
    });

    it("Should redirect to home if password and email is correct", async () => {
      await indexController.loginUser(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`/`);
    });
    it("Should redirect to login if other error occured", async () => {
      req = {
        body: {
          email: "testuser1@gmail.com",
          password: "123456",
        },
      };
      await indexController.loginUser(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `login?error=Cannot connect to the database. Try Again.&email=${req.body.email}`
      );
    });
  });

  describe("GET user and staff logout functionality", () => {
    beforeEach(() => {
      req = {
        session: { user_id: "testuser1@gmail.com", type: "user" },
      };
    });

    it("Should redirect to login page", async () => {
      await indexController.logOut(req, res);
      expect(res.redirect).toHaveBeenCalledWith("/login");
    });
  });

  describe("GET render recover page", () => {
    it("Should render the recover page", async () => {
      await indexController.recoverPage(req, res);
      expect(res.render).toHaveBeenCalledWith("forgotpw");
    });
  });

  describe("POST Submit recovery email functionality test", () => {
    beforeEach(() => {
      req = {
        body: {
          Uname: "testrecover@gmail.com",
        },
        session: {},
      };
    });

    it("Should redirect to forgotpw if email is not correct", async () => {
      req.body.Uname = "nothing@gmail.com";
      await indexController.getEmail(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `forgotpw?error=User is not exist&email=${req.body.Uname}`
      );
    });

    it("Should redirect to check page if email is exist", async () => {
      await indexController.getEmail(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`/check`);
    });

    it("Should redirect to check page if email is exist", async () => {
      req = {
        body: {
          Uname: "testrecover@gmail.com",
        },
      };

      await indexController.getEmail(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `forgotpw?error=Cannot connect to the database. Try Again&email=${req.body.Uname}`
      );
    });
  });

  describe("GET Render change password page", () => {
    it("Should render change password page", async () => {
      await indexController.changePasswordPage(req, res);
      expect(res.render).toHaveBeenCalledWith(`changepw`);
    });
  });

  describe("POST User change password functionality test", () => {
    beforeEach(() => {
      req = {
        body: {
          password: "654321",
          repassword: "654321",
        },
        session: {
          email: "testrecover@gmail.com",
          type: "user",
        },
      };
    });

    afterAll(async () => {
      await indexController.changePassword(req, res);
    });

    it("Should redirect to changepw if passwords do not match", async () => {
      req.body.password = "111111";
      await indexController.changePassword(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `changepw?error=Passwords do not match`
      );
    });

    it("Should redirect to changepw if error occured", async () => {
      req = {
        body: {
          password: "654321",
          repassword: "654321",
        },
      };
      await indexController.changePassword(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `changepw?error=Cannot connect to the database`
      );
    });

    it("Should redirect to login if password changed", async () => {
      await indexController.changePassword(req, res);
      expect(res.redirect).toHaveBeenCalledWith("/login");
    });
  });

  describe("GET Render security question check page", () => {
    it("Should render security question check page", () => {
      indexController.checkPage(req, res);
      expect(res.render).toHaveBeenCalledWith("securitycheck");
    });
  });

  describe("POST Match security questions functionality test", () => {
    beforeEach(() => {
      req = {
        body: {
          secq: "dog",
          firstq: "red",
        },
        session: {
          email: "testrecover@gmail.com",
          type: "user",
          valid: true,
        },
      };
    });

    it("Should redirect to changepw if answers are correct", async () => {
      await indexController.matchQuestions(req, res);
      expect(res.redirect).toHaveBeenCalledWith("/changepw");
    });

    it("Should redirect to forgotpw if answers are incorrect", async () => {
      req.body.firstq = "wrong";
      await indexController.matchQuestions(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        "forgotpw?error=Answers are not correct"
      );
    });

    it("Should redirect to changepw if error occured", async () => {
      req = {
        body: {
          secq: "dog",
          firstq: "red",
        },
      };
      await indexController.matchQuestions(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        "/changepw?error=Cannot connect to the database"
      );
    });
  });
});
