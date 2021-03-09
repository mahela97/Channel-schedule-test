 USE TV_TEST;
 
 INSERT INTO `admin` (`email`, `password`, `type`) VALUES ('admin@gmail.com', '$2a$10$R21KJErJ/4F3X34HJiKRFObkdijQbfNnhaepqiqxNhozTxaOWoH56', 'admin');
  
---------------------------------------------
--TEST CHANNEL--
insert into channel (channel_id,channel_name) values ('test1123','test1');



----------------------------------------------
--TEST STAFF USER --
INSERT INTO user (first_name,last_name,type,pet,color,email, password) VALUES ( "testFirstName1","testLastName2","staff","red","blue","test1@gmail.com",'$2a$10$R21KJErJ/4F3X34HJiKRFObkdijQbfNnhaepqiqxNhozTxaOWoH56');
INSERT INTO STAFF (user_id,channeld_id) VALUES ((SELECT USER_ID FROM USER WHERE email="test1@gmail.com"),"test1123");
-----------------------------------------------
--TEST USER--
INSERT INTO user (first_name,last_name,type,pet,color,email, password) VALUES ( "User1Recover","User1Last","user","$2a$10$1mE0nPTqxO7aDsPauppvh.GO1zDpIdBXdK8L9931m7xnTxWkloe82","$2a$10$1mE0nPTqxO7aDsPauppvh.50Ck2XEWH8XJuq4I4n4gZXVQmoGgGLu","testrecover@gmail.com",'$2a$10$Tv3lPEyDnzTMnX7wR/O6xeBNAJ9gPDdoiAk4fLHtZzNFXO9gibKK.');


--------------------------------------------------


  INSERT INTO `timeslot` (`timeslot_id`, `start_time`, `end_time`) VALUES
(2, '00:00:00', '05:30:00'),
(3, '05:30:00', '06:30:00'),
(4, '06:30:00', '06:45:00'),
(5, '06:45:00', '08:00:00'),
(6, '08:00:00', '11:00:00'),
(7, '11:00:00', '12:00:00'),
(8, '12:00:00', '12:30:00'),
(9, '12:30:00', '15:30:00'),
(10, '15:30:00', '18:00:00'),
(11, '18:00:00', '19:00:00'),
(12, '19:00:00', '19:30:00'),
(13, '19:30:00', '20:00:00'),
(14, '20:00:00', '20:30:00'),
(15, '20:30:00', '21:00:00'),
(16, '21:00:00', '21:30:00'),
(17, '21:30:00', '22:00:00'),
(18, '22:00:00', '22:30:00'),
(19, '22:30:00', '00:00:00');

