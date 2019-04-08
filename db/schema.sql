
DROP DATABASE IF EXISTS planIt_db;
CREATE DATABASE planIt_db;
USE planIt_db;

-- Create the tables
CREATE TABLE users
(
userId int NOT NULL AUTO_INCREMENT,
userName varchar(255) NOT NULL,
userType varchar(255) NOT NULL,
PRIMARY KEY (userId),
FOREIGN KEY (eventId) REFERENCES events(eventId),
FOREIGN KEY (taskId) REFERENCES tasks(taskId)
);

CREATE TABLE events
(
eventId int NOT NULL AUTO_INCREMENT,
eventName varchar(255) NOT NULL,
eventType varchar(255) NOT NULL,
eventDate DATE NOT NULL,
eventStatus BOOLEAN DEFAULT true,
PRIMARY KEY (eventId),
FOREIGN KEY (userId) REFERENCES users(userId),
FOREIGN KEY (taskId) REFERENCES tasks(taskId)
);

CREATE TABLE tasks
(
taskId int NOT NULL AUTO_INCREMENT,
tasktName varchar(255) NOT NULL,
taskType BOOLEAN DEFAULT false,
taskDate DATE NOT NULL,
importance varchar,
eventStatus BOOLEAN DEFAULT true,
PRIMARY KEY (taskId),
FOREIGN KEY (userId) REFERENCES users(userId),
FOREIGN KEY (eventId) REFERENCES events(eventId)
);