--------------------------------------------
-- Schema chanter-dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chanter-dev` DEFAULT CHARACTER SET utf8 ;
USE `chanter-dev` ;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Admin_Login`;
DROP TABLE IF EXISTS `Choir`;
DROP TABLE IF EXISTS `Choir_Committee`;
DROP TABLE IF EXISTS `Choir_Groups`;
DROP TABLE IF EXISTS `Config`;
DROP TABLE IF EXISTS `Effectif`;
DROP TABLE IF EXISTS `Group_Committee`;
DROP TABLE IF EXISTS `Groups`;
DROP TABLE IF EXISTS `Location`;
DROP TABLE IF EXISTS `Loggin`;
DROP TABLE IF EXISTS `Loggin_Choir`;
DROP TABLE IF EXISTS `Menu`;
DROP TABLE IF EXISTS `Menu_has_Page`;
DROP TABLE IF EXISTS `Page`;
DROP TABLE IF EXISTS `Role`;
DROP TABLE IF EXISTS `TypeChoir`;
DROP TABLE IF EXISTS `Translations`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `User_Choir`;
DROP TABLE IF EXISTS `User_Role`;

SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------
-- Table `chanter-dev`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`User` (
  `UserId` INT(10) NOT NULL AUTO_INCREMENT,
  `MemberId` INT(10) NULL DEFAULT NULL,
  `Lastname` VARCHAR(128) NOT NULL,
  `Firstname` VARCHAR(128) NOT NULL,
  `Phone` VARCHAR(20) NULL DEFAULT NULL,
  `PhoneProf` VARCHAR(20) NULL DEFAULT NULL,
  `Email` VARCHAR(64) NULL DEFAULT NULL,
  `StartAbo` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE INDEX `UserId` (`UserId` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Admin_Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Admin_Login` (
  `AdminId` INT(10) NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(32) NOT NULL,
  `Password` VARCHAR(32) NOT NULL,
  `UserId` INT(10) NULL,
  PRIMARY KEY (`AdminId`),
  UNIQUE INDEX `AdminId` (`AdminId` ASC),
  UNIQUE INDEX `Username` (`Username` ASC),
  INDEX `FKAdminLogin256912` (`UserId` ASC),
  CONSTRAINT `FKAdminLogin256912`
    FOREIGN KEY (`UserId`)
    REFERENCES `chanter-dev`.`User` (`UserId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Effectif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Effectif` (
  `EffectifId` INT(10) NOT NULL AUTO_INCREMENT,
  `Year` DATE NOT NULL,
  `NbMembers` INT(10) NOT NULL,
  PRIMARY KEY (`EffectifId`),
  UNIQUE INDEX `EffectifId` (`EffectifId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Role` (
  `RoleId` INT(10) NOT NULL AUTO_INCREMENT,
  `Name` ENUM('Director', 'Director_2', 'President', 'Cashier', 'Secretary', 'SuperAdmin', 'Admin', 'WebMaster', 'Translator', 'Editor', 'DataManager', 'NewsletterManager', 'Committee', 'Other') NULL DEFAULT NULL,
  `Picture` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`RoleId`),
  UNIQUE INDEX `RoleId` (`RoleId` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Choir`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Choir` (
  `ChoirId` INT(10) NOT NULL AUTO_INCREMENT,
  `RoleId` INT(10) NULL DEFAULT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `FundationYear` DATE NULL DEFAULT NULL,
  `Church` TINYINT(1) NOT NULL DEFAULT 0,
  `Gospel` TINYINT(1) NOT NULL DEFAULT 0,
  `Language` ENUM('Français', 'Deutsch') NOT NULL,
  `Remarks` VARCHAR(255) NULL DEFAULT NULL,
  `WebPage` VARCHAR(128) NULL DEFAULT NULL,
  `EffectifId` INT(10) NOT NULL,
  `Mailing` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`ChoirId`),
  UNIQUE INDEX `ChoirId` (`ChoirId` ASC),
  INDEX `FKChoir605558` (`EffectifId` ASC),
  INDEX `FKChoir973543` (`RoleId` ASC),
  CONSTRAINT `FKChoir605558`
    FOREIGN KEY (`EffectifId`)
    REFERENCES `chanter-dev`.`Effectif` (`EffectifId`),
  CONSTRAINT `FKChoir973543`
    FOREIGN KEY (`RoleId`)
    REFERENCES `chanter-dev`.`Role` (`RoleId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Choir_Committee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Choir_Committee` (
  `ChoirId` INT(10) NOT NULL,
  `RoleId` INT(10) NOT NULL,
  `Year` DATE NOT NULL,
  INDEX `FKChoir_Comm832697` (`ChoirId` ASC),
  INDEX `FKChoir_Comm363630` (`RoleId` ASC),
  CONSTRAINT `FKChoir_Comm363630`
    FOREIGN KEY (`RoleId`)
    REFERENCES `chanter-dev`.`Role` (`RoleId`),
  CONSTRAINT `FKChoir_Comm832697`
    FOREIGN KEY (`ChoirId`)
    REFERENCES `chanter-dev`.`Choir` (`ChoirId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Groups` (
  `GroupsId` INT(10) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(64) NOT NULL,
  `SubGroupsId` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`GroupsId`),
  UNIQUE INDEX `GroupsId` (`GroupsId` ASC),
  INDEX `FKGroups401105` (`SubGroupsId` ASC),
  CONSTRAINT `FKGroups401105`
    FOREIGN KEY (`SubGroupsId`)
    REFERENCES `chanter-dev`.`Groups` (`GroupsId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Choir_Groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Choir_Groups` (
  `ChoirId` INT(10) NOT NULL,
  `GroupsId` INT(10) NOT NULL,
  `MembershipDate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`ChoirId`, `GroupsId`),
  INDEX `FKChoir_Grou123541` (`GroupsId` ASC),
  CONSTRAINT `FKChoir_Grou123541`
    FOREIGN KEY (`GroupsId`)
    REFERENCES `chanter-dev`.`Groups` (`GroupsId`),
  CONSTRAINT `FKChoir_Grou410022`
    FOREIGN KEY (`ChoirId`)
    REFERENCES `chanter-dev`.`Choir` (`ChoirId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Group_Committee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Group_Committee` (
  `GroupsId` INT(10) NOT NULL,
  `RoleId` INT(10) NOT NULL,
  `Year` DATE NOT NULL,
  INDEX `FKGroup_Comm945528` (`GroupsId` ASC),
  INDEX `FKGroup_Comm914488` (`RoleId` ASC),
  CONSTRAINT `FKGroup_Comm914488`
    FOREIGN KEY (`RoleId`)
    REFERENCES `chanter-dev`.`Role` (`RoleId`),
  CONSTRAINT `FKGroup_Comm945528`
    FOREIGN KEY (`GroupsId`)
    REFERENCES `chanter-dev`.`Groups` (`GroupsId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Location` (
  `LocationId` INT(10) NOT NULL,
  `Address` INT(11) NULL DEFAULT NULL,
  `NPA` VARCHAR(20) NOT NULL,
  `City` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`LocationId`),
  UNIQUE INDEX `LocationId` (`LocationId` ASC),
  CONSTRAINT `FKLocation474649`
    FOREIGN KEY (`LocationId`)
    REFERENCES `chanter-dev`.`Choir` (`ChoirId`),
  CONSTRAINT `FKLocation496233`
    FOREIGN KEY (`LocationId`)
    REFERENCES `chanter-dev`.`User` (`UserId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Loggin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Loggin` (
  `LogginId` INT(10) NOT NULL AUTO_INCREMENT,
  `Domain` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`LogginId`),
  UNIQUE INDEX `LogginId` (`LogginId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Loggin_Choir`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Loggin_Choir` (
  `LogginId` INT(10) NOT NULL,
  `ChoirId` INT(10) NOT NULL,
  `Id` INT(10) NOT NULL,
  `Passowrd` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`LogginId`, `ChoirId`),
  INDEX `FKLoggin_Cho631059` (`ChoirId` ASC),
  CONSTRAINT `FKLoggin_Cho631059`
    FOREIGN KEY (`ChoirId`)
    REFERENCES `chanter-dev`.`Choir` (`ChoirId`),
  CONSTRAINT `FKLoggin_Cho852253`
    FOREIGN KEY (`LogginId`)
    REFERENCES `chanter-dev`.`Loggin` (`LogginId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Page`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Page` (
  `PageId` INT(10) NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NOT NULL,
  `Content` LONGTEXT NOT NULL,
  `Published_date` DATE NOT NULL,
  `Updated_date` DATE NULL DEFAULT NULL,
  `Lang` VARCHAR(2) NOT NULL,
  `IdPageLang` INT(11) NULL DEFAULT NULL,
  `IsNews` TINYINT(1) NOT NULL,
  `AdminId` INT(11) NOT NULL,
  PRIMARY KEY (`PageId`),
  UNIQUE INDEX `PageId` (`PageId` ASC),
  INDEX `FKPage265487` (`AdminId` ASC),
  CONSTRAINT `FKPage265487`
    FOREIGN KEY (`AdminId`)
    REFERENCES `chanter-dev`.`Admin_Login` (`AdminId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`TypeChoir`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`TypeChoir` (
  `TypeChoirId` INT(10) NOT NULL,
  `Name` VARCHAR(64) NOT NULL,
  `SubTypeId` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`TypeChoirId`),
  UNIQUE INDEX `TypeChoirId` (`TypeChoirId` ASC),
  INDEX `FKTypeChoir624557` (`SubTypeId` ASC),
  CONSTRAINT `FKTypeChoir591810`
    FOREIGN KEY (`TypeChoirId`)
    REFERENCES `chanter-dev`.`Choir` (`ChoirId`),
  CONSTRAINT `FKTypeChoir624557`
    FOREIGN KEY (`SubTypeId`)
    REFERENCES `chanter-dev`.`TypeChoir` (`TypeChoirId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`User_Choir`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`User_Choir` (
  `UserId` INT(10) NOT NULL,
  `ChoirId` INT(10) NOT NULL,
  PRIMARY KEY (`UserId`, `ChoirId`),
  INDEX `FKUser_Choir522093` (`ChoirId` ASC),
  CONSTRAINT `FKUser_Choir522093`
    FOREIGN KEY (`ChoirId`)
    REFERENCES `chanter-dev`.`Choir` (`ChoirId`),
  CONSTRAINT `FKUser_Choir917203`
    FOREIGN KEY (`UserId`)
    REFERENCES `chanter-dev`.`User` (`UserId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`User_Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`User_Role` (
  `UserId` INT(10) NOT NULL,
  `RoleId` INT(10) NOT NULL,
  INDEX `FKUser_Role194470` (`UserId` ASC),
  INDEX `FKUser_Role58648` (`RoleId` ASC),
  CONSTRAINT `FKUser_Role194470`
    FOREIGN KEY (`UserId`)
    REFERENCES `chanter-dev`.`User` (`UserId`),
  CONSTRAINT `FKUser_Role58648`
    FOREIGN KEY (`RoleId`)
    REFERENCES `chanter-dev`.`Role` (`RoleId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Menu` (
  `idMenu` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `idParentMenu` INT NULL,
  PRIMARY KEY (`idMenu`),
  CONSTRAINT `ParentMenuKey`
  FOREIGN KEY (`idParentMenu`)
  REFERENCES `Menu` (`idMenu`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `chanter-dev`.`Menu_has_Page`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Menu_has_Page` (
  `Menu_idMenu` INT NULL,
  `Page_PageId` INT(10) NULL,
  PRIMARY KEY (`Menu_idMenu`, `Page_PageId`),
  INDEX `fk_Menu_has_Page_Page1_idx` (`Page_PageId` ASC),
  CONSTRAINT `fk_Menu_has_Page_Menu1`
    FOREIGN KEY (`Menu_idMenu`)
    REFERENCES `chanter-dev`.`Menu` (`idMenu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Menu_has_Page_Page1`
    FOREIGN KEY (`Page_PageId`)
    REFERENCES `chanter-dev`.`Page` (`PageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Config`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Config` (
  `idConfig` INT NOT NULL,
  `MainMenuId` INT NULL DEFAULT NULL,
  `HomePageId` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`idConfig`, `MainMenuId`, `HomePageId`),
  INDEX `fk_Config_Menu1_idx` (`MainMenuId` ASC),
  INDEX `fk_Config_Page1_idx` (`HomePageId` ASC),
  CONSTRAINT `fk_Config_Menu1`
    FOREIGN KEY (`MainMenuId`)
    REFERENCES `chanter-dev`.`Menu` (`idMenu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Config_Page1`
    FOREIGN KEY (`HomePageId`)
    REFERENCES `chanter-dev`.`Page` (`PageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Translations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Translations` (
  `idFR` INT NOT NULL,
  `idDE` INT NOT NULL,
  INDEX `fk_Translations_1_idx` (`idFR` ASC),
  INDEX `fk_Translations_DE_idx` (`idDE` ASC),
  CONSTRAINT `fk_Translations_FR`
    FOREIGN KEY (`idFR`)
    REFERENCES `chanter-dev`.`Page` (`PageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Translations_DE`
    FOREIGN KEY (`idDE`)
    REFERENCES `chanter-dev`.`Page` (`PageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Admin_Login`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Admin_Login` (`AdminId`, `Username`, `Password`, `UserId`) VALUES (1, 'root', 'unlucky', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Page`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`) VALUES (1, 'Default', 'This is the default page', '2018-01-01', NULL, 'En', NULL, 0, 1);

COMMIT;

-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Admin_Login`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Menu` (`idMenu`, `Name`) VALUES (1, 'Main Menu');

COMMIT;

-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Config`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Config` (`idConfig`, `MainMenuId`, `HomePageId`) VALUES (1, 1, 1);

COMMIT;

-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Config`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Director');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Director_2');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('President');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Secretary');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Cashier');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Committee');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Other');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Admin');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('WebMaster');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Editor');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('Translator');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('DataManager');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('NewsletterManager');
INSERT INTO `chanter-dev`.`Role` (`Name`) VALUES ('SuperAdmin');

COMMIT;

------------------------------------
-- Insertions of test datas
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `User` (Firstname, Lastname) VALUES ('Juste', 'Le Blanc');
SET @userId = (SELECT UserId FROM `User` WHERE Firstname = 'Juste' AND Lastname = 'Le Blanc');
UPDATE `Admin_Login` SET UserId = UserId WHERE `AdminId` = 1;
SET @roleId = (SELECT RoleId FROM `Role` WHERE Name = 'SuperAdmin');
SET @userId = (SELECT UserId FROM `User` WHERE Firstname = 'Juste' AND Lastname = 'Le Blanc');
INSERT INTO `User_Role` (RoleId, UserId) VALUES (@roleId, @userId);

COMMIT;











