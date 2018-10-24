CREATE TABLE `User` (
  UserId     int(10) NOT NULL AUTO_INCREMENT, 
  MemberId   int(10), 
  Lastname   varchar(128) NOT NULL, 
  Firstname  varchar(128) NOT NULL, 
  Phone      varchar(20), 
  PhoneProf  varchar(20), 
  Email      varchar(64),
  StartAbo   date,
  PRIMARY KEY (UserId), 
  UNIQUE INDEX (UserId));
CREATE TABLE Choir (
  ChoirId       int(10) NOT NULL AUTO_INCREMENT, 
  RoleId	int(10),
  Name          varchar(255) NOT NULL,
  FundationYear date, 
  Church        tinyint(1) DEFAULT 0 NOT NULL, 
  Gospel        tinyint(1) DEFAULT 0 NOT NULL, 
  Language      enum('Français', 'Deutsch') NOT NULL, 
  Remarks       varchar(255), 
  WebPage       varchar(128), 
  EffectifId    int(10) NOT NULL, 
  Mailing	int(10),
  PRIMARY KEY (ChoirId), 
  UNIQUE INDEX (ChoirId));
CREATE TABLE Effectif (
  EffectifId int(10) NOT NULL AUTO_INCREMENT, 
  Year       date NOT NULL, 
  NbMembers  int(10) NOT NULL, 
  PRIMARY KEY (EffectifId), 
  UNIQUE INDEX (EffectifId));
CREATE TABLE TypeChoir (
  TypeChoirId int(10) NOT NULL, 
  Name        varchar(64) NOT NULL, 
  SubTypeId   int(10), 
  PRIMARY KEY (TypeChoirId), 
  UNIQUE INDEX (TypeChoirId));
CREATE TABLE Groups (
  GroupsId    int(10) NOT NULL AUTO_INCREMENT, 
  Name        varchar(64) NOT NULL, 
  SubGroupsId int(10), 
  PRIMARY KEY (GroupsId), 
  UNIQUE INDEX (GroupsId));
CREATE TABLE Choir_Groups (
  ChoirId        int(10) NOT NULL, 
  GroupsId       int(10) NOT NULL, 
  MembershipDate date, 
  PRIMARY KEY (ChoirId, 
  GroupsId));
CREATE TABLE Loggin (
  LogginId int(10) NOT NULL AUTO_INCREMENT, 
  Domain   varchar(64) NOT NULL, 
  PRIMARY KEY (LogginId), 
  UNIQUE INDEX (LogginId));
CREATE TABLE Loggin_Choir (
  LogginId int(10) NOT NULL, 
  ChoirId  int(10) NOT NULL, 
  Id       int(10) NOT NULL, 
  Passowrd int(10), 
  PRIMARY KEY (LogginId, 
  ChoirId));
CREATE TABLE User_Choir (
  UserId  int(10) NOT NULL, 
  ChoirId int(10) NOT NULL, 
  PRIMARY KEY (UserId, 
  ChoirId));
CREATE TABLE Role (
  RoleId  int(10) NOT NULL AUTO_INCREMENT, 
  Name    enum('Director', 'Director_2','President','Cashier','Secretary','SuperAdmin','Admin','WebMaster','Translator','Editor', 'DataManager', 'NewsletterManager'), 
  Picture varchar(64), 
  PRIMARY KEY (RoleId), 
  UNIQUE INDEX (RoleId));
CREATE TABLE Choir_Committee (
  ChoirId int(10) NOT NULL, 
  RoleId  int(10) NOT NULL, 
  Year    date NOT NULL);
CREATE TABLE Group_Committee (
  GroupsId int(10) NOT NULL, 
  RoleId   int(10) NOT NULL, 
  Year     date NOT NULL);
CREATE TABLE User_Role (
  UserId int(10) NOT NULL, 
  RoleId int(10) NOT NULL);
CREATE TABLE Location (
  LocationId int(10) NOT NULL, 
  Address    int(11), 
  NPA        varchar(20) NOT NULL, 
  City       varchar(64) NOT NULL, 
  PRIMARY KEY (LocationId), 
  UNIQUE INDEX (LocationId));
CREATE TABLE Admin_Login (
  AdminId int(10) NOT NULL AUTO_INCREMENT,
  Username varchar(32) NOT NULL,
  Password varchar(32) NOT NULL,
  UserId int(10) NOT NULL,
  PRIMARY KEY (AdminId),
  UNIQUE INDEX (AdminId),
  UNIQUE INDEX (Username));
CREATE TABLE Page (
  PageId int(10) NOT NULL AUTO_INCREMENT,
  Title VARCHAR(45) NOT NULL,
  Content LONGTEXT NOT NULL,
  Published_date date NOT NULL,
  Updated_date date DEFAULT NULL,
  Lang varchar(2) NOT NULL,
  IdPageLang int(11),
  IsNews tinyint(1) NOT NULL,
  AdminId int(11) NOT NULL,
  PRIMARY KEY (PageId),
  UNIQUE INDEX (PageId));
ALTER TABLE TypeChoir ADD CONSTRAINT FKTypeChoir624557 FOREIGN KEY (SubTypeId) REFERENCES TypeChoir (TypeChoirId);
ALTER TABLE Choir_Groups ADD CONSTRAINT FKChoir_Grou410022 FOREIGN KEY (ChoirId) REFERENCES Choir (ChoirId);
ALTER TABLE Choir_Groups ADD CONSTRAINT FKChoir_Grou123541 FOREIGN KEY (GroupsId) REFERENCES Groups (GroupsId);
ALTER TABLE Loggin_Choir ADD CONSTRAINT FKLoggin_Cho852253 FOREIGN KEY (LogginId) REFERENCES Loggin (LogginId);
ALTER TABLE Loggin_Choir ADD CONSTRAINT FKLoggin_Cho631059 FOREIGN KEY (ChoirId) REFERENCES Choir (ChoirId);
ALTER TABLE Choir ADD CONSTRAINT FKChoir605558 FOREIGN KEY (EffectifId) REFERENCES Effectif (EffectifId);
ALTER TABLE Choir ADD CONSTRAINT FKChoir973543 FOREIGN KEY (RoleId) REFERENCES Role (RoleId);
ALTER TABLE User_Choir ADD CONSTRAINT FKUser_Choir917203 FOREIGN KEY (UserId) REFERENCES `User` (UserId);
ALTER TABLE User_Choir ADD CONSTRAINT FKUser_Choir522093 FOREIGN KEY (ChoirId) REFERENCES Choir (ChoirId);
ALTER TABLE TypeChoir ADD CONSTRAINT FKTypeChoir591810 FOREIGN KEY (TypeChoirId) REFERENCES Choir (ChoirId);
ALTER TABLE Choir_Committee ADD CONSTRAINT FKChoir_Comm832697 FOREIGN KEY (ChoirId) REFERENCES Choir (ChoirId);
ALTER TABLE Choir_Committee ADD CONSTRAINT FKChoir_Comm363630 FOREIGN KEY (RoleId) REFERENCES Role (RoleId);
ALTER TABLE Groups ADD CONSTRAINT FKGroups401105 FOREIGN KEY (SubGroupsId) REFERENCES Groups (GroupsId);
ALTER TABLE Group_Committee ADD CONSTRAINT FKGroup_Comm945528 FOREIGN KEY (GroupsId) REFERENCES Groups (GroupsId);
ALTER TABLE Group_Committee ADD CONSTRAINT FKGroup_Comm914488 FOREIGN KEY (RoleId) REFERENCES Role (RoleId);
ALTER TABLE User_Role ADD CONSTRAINT FKUser_Role194470 FOREIGN KEY (UserId) REFERENCES `User` (UserId);
ALTER TABLE User_Role ADD CONSTRAINT FKUser_Role58648 FOREIGN KEY (RoleId) REFERENCES Role (RoleId);
ALTER TABLE Location ADD CONSTRAINT FKLocation496233 FOREIGN KEY (LocationId) REFERENCES `User` (UserId);
ALTER TABLE Location ADD CONSTRAINT FKLocation474649 FOREIGN KEY (LocationId) REFERENCES Choir (ChoirId);
ALTER TABLE Admin_Login ADD CONSTRAINT FKAdminLogin256912 FOREIGN KEY (UserId) REFERENCES `User` (UserId);
ALTER TABLE Page ADD CONSTRAINT FKPage265487 FOREIGN KEY (AdminId) REFERENCES `Admin_Login` (AdminId);


INSERT INTO `User` (Firstname, Lastname, Chorus) VALUES ('Juste', 'Le Blanc', 0);
INSERT INTO `Admin_Login` (Username, Password, UserId) SELECT 'root', 'unlucky', UserId FROM `User` WHERE Firstname = 'Juste' AND Lastname = 'Le Blanc';
INSERT INTO `Role` (Name) VALUES ('SuperAdmin');
SET @roleId = (SELECT RoleId FROM `Role` WHERE Name = 'SuperAdmin');
SET @userId = (SELECT UserId FROM `User` WHERE Firstname = 'Juste' AND Lastname = 'Le Blanc');
INSERT INTO `User_Role` (RoleId, UserId) VALUES (@roleId, @userId);



INSERT INTO `Role` (Name, Picture) VALUES ('Director', null);
INSERT INTO `Role` (Name, Picture) VALUES ('Director_2', null);
INSERT INTO `Role` (Name, Picture) VALUES ('President', null);
INSERT INTO `Role` (Name, Picture) VALUES ('Secretary', null);
INSERT INTO `Role` (Name, Picture) VALUES ('Admin', null);
INSERT INTO `Role` (Name, Picture) VALUES ('WebMaster', null);
INSERT INTO `Role` (Name, Picture) VALUES ('Editor', null);
INSERT INTO `Role` (Name, Picture) VALUES ('Translator', null);
INSERT INTO `Role` (Name, Picture) VALUES ('DataManager', null);
INSERT INTO `Role` (Name, Picture) VALUES ('NewsletterManager', null);















