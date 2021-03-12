const channel = require("../../../controllers/channel");

const request = require("supertest");

const {
  getchannel,
  gettimeslot,
  getday,
  scheduleChannel,
  getTimeTable,
  getprogramTable,
  addfeedback,
  getuserId,
  addProgram,
} = require("../../../models/userModel");

let pool;

describe("/channel tests",  () => {
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

  //GET CHANNEL
  describe("/channel get_channel",  () => {

   
    beforeEach(async () => {
       
        req = {
            url : '/timetable',
            query: {},
            session: {
              user_id: null,
              type: null,
            },
            params:{
              id:"channel_id"
            }
          };

          res ={
            locals:{
              channel:null,
              ch:null
            },
            render:jest.fn()
          };
    
      });

    it("should return user/timetable and empty timetable", async () => {
      
      
     
      await channel.get_channel(req, res);
      expect(res.render).toHaveBeenCalledWith(`user/timetable`);
      expect(res.locals.channel.timetable).toEqual("");
      
    });


    it("should return user/timetable and timetable", async () => {
      
      req.url = "/nottimetable";
      expected ={timetable:await getTimeTable(req.params.id)};

     
      await channel.get_channel(req, res);
      expect(res.render).toHaveBeenCalledWith(`user/timetable`);
      expect(res.locals.channel.timetable).toEqual(expected.timetable);
      
    });
    
  });

  describe("/channel getschedulel",  () => {

    // beforeAll(async ()=>{
    //   await pool.query(
    //     `INSERT INTO user (first_name,last_name,type,pet,color,email, password) VALUES (?,?,?,?,?,?,?);`,
    //       [
    //         'fname',
    //         'lname',
    //         "staff",
    //         'dog',
    //         'black',
    //         'staff@gmail.com',
    //         'PWD123'
    //       ]
    //     );
    //     await pool.query(
    //       `INSERT INTO staff(user_id, channeld_id) VALUES (?,?);`,['staff@gmail.com','channel_id'],(err,result)=>{
    //         console.log(result,err);
    //       }
    //     );
    //     await pool.query(
    //       'INSERT INTO `channel`(`channeld_id`, `channel_name`) VALUES (?,?)',['channel_id','channel_name']
    //     );
    //     console.log(await pool.query('SELECT * FROM channel WHERE channel_id=(select channeld_id from staff where user_id=staff@gmail.com);'))
    // });
    beforeEach(async () => {
       
        req = {
           
            query: {},
            session: {
              user_id: 'staff@gmail.com',
              type: null,
            },
            
          };

      });

      afterAll(async () => {
    //     await pool.query("DELETE FROM user WHERE email=?;", ["staff@gmail.com"]);
    //     await pool.query("DELETE FROM staff WHERE channel_id=?;", ["channel_id"]);
    //     await pool.query("DELETE FROM channel WHERE channel_id=?;", ["channel_id"]);
    // 
   });

    it("should return login to login ", async () => {
    
      await channel.getschedulel(req, res);
      expect(res.redirect).toHaveBeenCalledWith(`/login`);
      
    });


    // it("should return staff/schedule ", async () => {
    //   req.session.user_id='staff@gmail.com';
    //   req.session.type='staff';
    //   await channel.getschedulel(req, res);
    //   expect(res.render).toHaveBeenCalledWith(`staff/schedule`);
     
    // });
    
  });
  
  

  

});
