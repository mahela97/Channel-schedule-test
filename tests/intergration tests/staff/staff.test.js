const staffController = require("../../../controllers/staffController");
const request = require("supertest");


let pool;

describe("/staff tests",  () => {
  let res;

  
  beforeEach(async () => {
    res = {
      render: null,
      redirect: null,
    };
   
    pool = require("../../../config/database");
    res.render = jest.fn();
    res.redirect = jest.fn();
  });
  afterEach(async () => {
    
    res.render = null;
    res.redirect = null;
  });

  afterAll(async () => {
    //await pool.end();
    
  });
  //User Homepage
  describe("/staffController userHomePage",  () => {
    it("should return staff/home-staff Page", async () => {
    
      const req = {
        query: {},
        session: {
          user_id: null,
          type: null,
        },
      };

      await staffController.staffHomepage(req, res);
      expect(res.render).toHaveBeenCalledWith("staff/home-staff");
    });
    
  });

  //ACCOUNT UPDATE PAGE
  describe("/staffController accountUpdatePage",  () => {
    it("should return staff/accountupdates page with status", async () => {
    
      req = {
        body: {},
        query: {
          status: "200"
        },
        session: {
          user_id: null,
          type: null,
        },
      };

      const expected = {
        status:"200"
      };

      await staffController.accountUpdatePage(req, res);
      expect(res.render).toHaveBeenCalledWith(`staff/accountupdates`,expected);
    });
    
  });

  //CHANGE PASSWORD
  describe("/staffController accountUpdate",  () => {

    beforeAll(async ()=>{
      await pool.query(
        `INSERT INTO user (first_name,last_name,type,pet,color,email, password) VALUES (?,?,?,?,?,?,?);`,
          [
            'fname',
            'lname',
            "staff",
            'dog',
            'black',
            'staff@gmail.com',
            'PWD123'
          ]
        );
    });

    
    beforeEach(async () => {
      

      req = {
        body: {
          password: 'PWD123',
          repassword: 'PWD123'
        },
        query: {
        },
        session: {
          user_id: 'staff@gmail.com',
          type: 'user',
        },
      };
    });


    afterAll(async () => {
       await pool.query("DELETE FROM user WHERE email=?;", ["staff@gmail.com"]);
    });


    it("should return error and staff/accountupdates-user passwords do not match", async () => {
    
      req.body.repassword='PWD1234';

      await staffController.accountUpdate(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`accountupdate?error=Passwords do not match`);
    });


   
    it("should return staff/accountupdates-user if successfully updated", async () => {
      await staffController.accountUpdate(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`accountupdates-user?status=Success`);
      
    });

    it("should return error and staff/accountupdates-user if error occurred", async () => {
    
      req.session.user_id = "notanEmail";
      await staffController.accountUpdate(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`accountupdates-user?status=Error`);
     
    });
    
  });


});