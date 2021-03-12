const userController = require("../../../controllers/userController");
const {userRegisterValidation} = require("../../../controllers/validator/validate");
const request = require("supertest");


let pool;

describe("/user tests",  () => {
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
  describe("/userController userHomePage",  () => {
    it("should return user/home-user Page", async () => {
    
      const req = {
        query: {},
        session: {
          user_id: null,
          type: null,
        },
      };

      await userController.userHomePage(req, res);
      expect(res.render).toHaveBeenCalledWith("user/home-user");
    });
    
  });

  //Rendering the register page
  describe("/userController registerPage",  () => {
    it("should return /user/register Page ", async () => {
    
      const req = {
        query: {
          error: null,
          email: 'user@gmail.com',
        },
        session: {
          user_id: null,
          type: null,
        },
      };

      const expected = {
        error:null,
        username: 'user@gmail.com',
        email:'user@gmail.com'
      };


      await userController.registerPage(req, res);
      expect(res.render).toHaveBeenCalledWith('register',expected);
    });
    
  });

  //ACCOUNT UPDATE PAGE
  describe("/userController accountUpdatePage",  () => {
    it("should return user/accountupdates-user page with status", async () => {
    
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

      await userController.accountUpdatePage(req, res);
      expect(res.render).toHaveBeenCalledWith('user/accountupdates-user',expected);
    });
    
  });

 

  //Registering a user
  describe("/userController createUser",  () => {
    
   
    beforeEach(async () => {
      await pool.query("DELETE FROM user WHERE email=?;", ["user_1@gmail.com"]);
      
      req = {
        body: {
          user_id: 'user_id',
          email: 'user_1@gmail.com',
          firstname: 'fname',
          lastname: 'lname',
          secq:'dog',
          firstq: 'black',
          password: 'PWD123',
          password_repeat: 'PWD123',
        },
        query: {},
        Session: {
          user_id: null,
          type: null,
        },
      };
    });

    afterAll(async () => {
      await pool.query("DELETE FROM user WHERE email=?;", ["user_1@gmail.com"]);
    });

    it("should return login page if successful", async () => {
      
      await userController.createUser(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`/login`);
      
     });  
      

      it("should return error and redirect to register Page if validation failed", async () => {
        req = {
        body: {
          user_id: 'user_id',
          email: 'user_1@gmail.com',
          firstname: 'fname',
          lastname: 'lname',
          
          firstq: 'black',
          password: 'PWD123',
          password_repeat: 'PWD123',
        },
        query: {},
        Session: {
          user_id: null,
          type: null,
        },
      };
        
      const {error} = userRegisterValidation(req.body);
    
      await userController.createUser(req, res);
      expect(res.redirect).toHaveBeenCalledWith(
        `register?error=${error.details[0].message.toUpperCase()}
        &email=${req.body.email}
        &user_id=${req.body.user_id}`
            );
    });
      
    

     it("should return error and redirect to register Page if error occured", async () => {
        
      req = {
        body: {
          user_id: 'user_id',
          email: 'user_1@gmail.com',
          firstname: 'fname',
          lastname: 'lname',
          secq:'dog',
          firstq: 'black',
          password: 'PWD123',
          password_repeat: 'PWD123',
        },
        query: {},
        Session: {
          user_id: null,
          type: null,
        },
      };
      await pool.query(
        `
            INSERT INTO user (first_name,last_name,type,pet,color,email, password) VALUES (?,?,?,?,?,?,?);
            `,
          [
            'fname',
            'lname',
            "user",
            'dog',
            'black',
            'user_1@gmail.com',
            'PWD123'
          ],(err,result)=>{
            
          }
        );
  
      await userController.createUser(req, res);

      
      expect(res.redirect).toHaveBeenCalledWith(
        `register?error=Email is already exist&email=${req.body.email}&user_id=${req.body.user_id}`);
      });
    
     });


      //CHANGE PASSWORD
  describe("/userController accountUpdate",  () => {

    
    beforeEach(async () => {
      await pool.query(
        `INSERT INTO user (first_name,last_name,type,pet,color,email, password) VALUES (?,?,?,?,?,?,?);`,
          [
            'fname',
            'lname',
            "user",
            'dog',
            'black',
            'user@gmail.com',
            'PWD123'
          ]
        );

      req = {
        body: {
          password: 'PWD123',
          repassword: 'PWD123'
        },
        query: {
        },
        session: {
          user_id: 'user@gmail.com',
          type: 'user',
        },
      };
    });


    afterAll(async () => {
       await pool.query("DELETE FROM user WHERE email=?;", ["user@gmail.com"]);
    });

    it("should return error and user/accountupdates-user passwords do not match", async () => {
    
      req.body.repassword='PWD1234';

      await userController.accountUpdate(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`accountupdates-user?error=Passwords do not match`);
    });


   
    it("should return user/accountupdates-user if successfully updated", async () => {
      await userController.accountUpdate(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`accountupdates-user?status=Success`);
      
    });

    it("should return error and user/accountupdates-user if error occurred", async () => {
    
      req.session.user_id = "notanEmail";
      await userController.accountUpdate(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`accountupdates-user?status=Error`);
     
    });

    
  });
    
  });




