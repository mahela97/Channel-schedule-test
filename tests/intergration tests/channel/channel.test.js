const channelController = require("../../../controllers/channel");
const request = require("supertest");

let server;
let pool;

describe("/Channel tests", () => {
  const res = {
    render: null,
    redirect: null,
  };

  beforeEach(async () => {
    server = require("../../../index").server;
    pool = require("../../../config/database");
    res.render = jest.fn();
    res.redirect = jest.fn();
  });
  afterEach(async () => {
    res.render = null;
    res.redirect = null;
    server.close();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("GET /timetable Timetable page view render test", () => {
    it("Should return Timetable Page", async () => {
        const req = {
            query: {},
            params: {
                id:"test1"
            },
        session: {
          user_id: null,
          type: null,
        },
      };
        res.locals = {
            channel: undefined,
            ch:undefined,
        };
      

      await channelController.get_channel(req, res);
      expect(res.render).toHaveBeenCalledWith("user/timetable");
    });
  });
    
    describe("GET /schedule Timetable page view render test", () => {
    it("Should return schedule Timetable Page", async () => {
        const req = {
            query: {},
        session: {
          user_id: "test1@gmail.com",
          type: "staff",
        },
      };
        res.locals = {
            channel: undefined,
        };
      

      await channelController.getschedulel(req, res);
      expect(res.render).toHaveBeenCalledWith("staff/schedule");
    });
    it("Should redirect to loginPage if usertype isnt staff fails", async () => {
        const req = {
            query: {},
        session: {
          user_id: null,
          type: null,
        },
      };
        res.locals = {
            channel: undefined,
        };
      

      await channelController.getschedulel(req, res);
      expect(res.redirect).toHaveBeenCalledWith("/login");
    });
  });

    describe("/POST schedule Functionality test", () => {
    let req;
    beforeEach(() => {
      req = {
        body: {
          programme_id: "0",
          day: "0",
          time: "0",
        },
        query: {},
        session: {
          user_id: "test1@gmail.com",
          type: "staff",
        },
      };
    });

    
    it("Should redirect to schedule if user type is staff", async () => {
      await channelController.schedulel(req, res);
      expect(res.redirect).toHaveBeenCalledWith("schedule");
    });
  });

   describe("/POST add feedback Functionality test", () => {
    let req;
    beforeEach(() => {
      req = {
        body: {
          addfeedback: "good program",
          proid: "0",
          fav:"fav",
        },
        url:"/user/addfeedback/test1",
        query: {},
        session: {
          user_id: "testrecover@gmail.com",
          type: "user",
        },
      };
    });

    
    it("Should redirect to addfeedback if user type is user", async () => {
      await channelController.addfeedback(req, res);
      expect(res.redirect).toHaveBeenCalledWith("/user/" + req.url);
    });
   });
  
   describe("/POST add program Functionality test", () => {
    let req;
    beforeEach(() => {
      req = {
        url:"/user/addfeedback/test1",
        query: {},
        session: {
           user_id: "test1@gmail.com",
          type: "staff",
        },
      };
    });

    
    it("Should redirect to schedule if user type is staff", async () => {
      await channelController.AddProgram(req, res);
      expect(res.redirect).toHaveBeenCalledWith("schedule");
    });
   });
  
   describe("GET /addfeedback addfeedback page view render test", () => {
    it("Should return addfeedback Page", async () => {
        const req = {
            query: {},
        session: {
          user_id: "test1@gmail.com",
          type: "staff",
          },
          url: "/user/addfeedback/test1",
        params: {
                id:"test1"
            },
      };
        res.locals = {
            channel: undefined,
        };
      

      await channelController.get_program(req, res);
      expect(res.render).toHaveBeenCalledWith("user/addfeedback");
    });
    it("Should redirect to loginPage if usertype isnt user", async () => {
        const req = {
            query: {},
        session: {
          user_id: null,
          type: null,
        },
      };
        res.locals = {
            channel: undefined,
        };
      

      await channelController.get_program(req, res);
      expect(res.redirect).toHaveBeenCalledWith("/login");
    });
  });

 
});
