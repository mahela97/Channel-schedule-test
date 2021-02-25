const pool = require("../config/database");

module.exports = {
  findAdmin: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT email,type,password FROM ADMIN WHERE email=?;`,
        [email],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },

  createAdmin: (data, callBack) => {
    pool.query(
      `
        INSERT INTO admin (email, password,type) VALUES (?,?, ?);
        `,
      [data.email, data.password, "admin"],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },

  getChannel: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from channel where channel_name=?`,
        [data],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getChannelById: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from channel where channel_id=?`,
        [data],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },

  addChannel: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into channel (channel_id,channel_name) values (?,?);`,
        [data.channelname + 123, data.channelname],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
  getAllchannel: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT channel_name,channel_id FROM channel;`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            var ch = {};
            for (j = 0; j < result.length; j++) {
              var trendprod = j;
              var prodValue = { channelname: result[j].channel_name };
              //result_len=result_len-1;
              ch[trendprod] = {
                channel_name: result[j].channel_name,
                channel_id: result[j].channel_id,
              };
            }

            resolve(ch);
          }
        }
      );
    });
  },
};
