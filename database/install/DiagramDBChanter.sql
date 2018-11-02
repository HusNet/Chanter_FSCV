-- -----------------------------------------------------
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
-- Table `chanter-dev`.`Location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Location` (
  `LocationId` INT(10) NOT NULL AUTO_INCREMENT,
  `Address` VARCHAR(20) NOT NULL,
  `NPA`  INT(11) NULL DEFAULT NULL,
  `City` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`LocationId`),
  UNIQUE INDEX `LocationId` (`LocationId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


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
  `Newsletter` TINYINT(1) NULL DEFAULT 0,
  `LocationId` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE INDEX `UserId` (`UserId` ASC),
  INDEX `fk_User_Location1_idx` (`LocationId` ASC),
  CONSTRAINT `fk_User_Location1`
    FOREIGN KEY (`LocationId`)
    REFERENCES `chanter-dev`.`Location` (`LocationId`) ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Admin_Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Admin_Login` (
  `AdminId` INT(10) NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(32) NOT NULL,
  `Password` VARCHAR(32) NOT NULL,
  `UserId` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`AdminId`),
  UNIQUE INDEX `AdminId` (`AdminId` ASC),
  UNIQUE INDEX `Username` (`Username` ASC),
  INDEX `FKAdminLogin256912` (`UserId` ASC),
  CONSTRAINT `FKAdminLogin256912`
    FOREIGN KEY (`UserId`)
    REFERENCES `chanter-dev`.`User` (`UserId`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
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
AUTO_INCREMENT = 26
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
  `LocationId` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`ChoirId`),
  UNIQUE INDEX `ChoirId` (`ChoirId` ASC),
  INDEX `FKChoir605558` (`EffectifId` ASC),
  INDEX `FKChoir973543` (`RoleId` ASC),
  INDEX `fk_Choir_Location1_idx` (`LocationId` ASC),
  CONSTRAINT `FKChoir605558`
    FOREIGN KEY (`EffectifId`)
    REFERENCES `chanter-dev`.`Effectif` (`EffectifId`),
  CONSTRAINT `FKChoir973543`
    FOREIGN KEY (`RoleId`)
    REFERENCES `chanter-dev`.`Role` (`RoleId`),
  CONSTRAINT `fk_Choir_Location1`
    FOREIGN KEY (`LocationId`)
    REFERENCES `chanter-dev`.`Location` (`LocationId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Table `chanter-dev`.`Menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Menu` (
  `idMenu` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMenu`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Config`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Config` (
  `idConfig` INT(11) NOT NULL,
  `MainMenuId` INT(11) NOT NULL,
  `HomePageId` INT(10) NOT NULL,
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
-- Table `chanter-dev`.`Menu_has_Page`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Menu_has_Page` (
  `Menu_idMenu` INT(11) NOT NULL,
  `Page_PageId` INT(10) NULL,
  `Menu_SubMenu` INT(10) NULL,
  `Order` INT(10) NOT NULL,
  PRIMARY KEY (`Menu_idMenu`),
  CONSTRAINT `fk_Menu_has_Page_Menu1`
    FOREIGN KEY (`Menu_idMenu`)
    REFERENCES `chanter-dev`.`Menu` (`idMenu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Menu_has_Page_Page1`
    FOREIGN KEY (`Page_PageId`)
    REFERENCES `chanter-dev`.`Page` (`PageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Menu_has_Page_SubMenu1`
    FOREIGN KEY (`Menu_SubMenu`)
    REFERENCES `chanter-dev`.`Menu` (`idMenu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chanter-dev`.`Translations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chanter-dev`.`Translations` (
  `idFR` INT(11) NOT NULL,
  `idDE` INT(11) NOT NULL,
  INDEX `fk_Translations_1_idx` (`idFR` ASC),
  INDEX `fk_Translations_DE_idx` (`idDE` ASC),
  CONSTRAINT `fk_Translations_DE`
    FOREIGN KEY (`idDE`)
    REFERENCES `chanter-dev`.`Page` (`PageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Translations_FR`
    FOREIGN KEY (`idFR`)
    REFERENCES `chanter-dev`.`Page` (`PageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Data for table `chanter-dev`.`Admin_Login`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Admin_Login` (`AdminId`, `Username`, `Password`, `UserId`) VALUES (1, 'root', 'unlucky', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Menu`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Menu` (`idMenu`, `Name`) VALUES (1, 'Main Menu');

COMMIT;

-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Role`
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


-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Page`
-- -----------------------------------------------------

START TRANSACTION;
USE `chanter-dev`;

INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (1, 'Page d\'accueil', '<h3>Bienvenue sur <a href="Chanter.ch" target="_blank">Chanter.ch</a></h3><p><br></p><p>La vie du monde choral en <strong>Valais</strong>!</p>', '2018-01-01 00:00:00', '2018-10-26 00:00:00', 'fr', 38, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (6, 'Présentation', '<h1><strong>Présentation</strong></h1><p>La Fédération des Sociétés de Chant du Valais (FSCV) est une association membre de l’Union Suisse des Chorales (USC) regroupant des chœurs d’adultes, de jeunes et d’enfants du Valais Romand et du Haut-Valais.</p><p>Fondée en 1906, elle chapeaute l’Association Valaisanne des Chefs de Chœurs (AVCC) et 4 groupements régionaux : le Groupement des Sociétés de Chant du Bas-Valais (GSCBV), l’Union Chorale du Centre (UCC), le Groupement des Chanteurs du Valais Central (GCVC) et le Oberwalliser Chor- und Cäcilien Verband (OCV).</p><p>A ce jour, plus de 160 chorales d’adultes avec plus de 5000 chanteurs sont réunis au sein de la Fédération. Les chœurs de jeunes et d’enfants sont également membres de la Fédération, ce qui leur permet d’accéder aux offres de formation et au soutien des chorales d’adultes.</p><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/carte_valais.gif" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/carte_valais.gif?resize=400%2C272" alt="Carte des groupements" height="216" width="318"></a></p><h4><strong>Organisation</strong></h4><p>La FSCV est présidée avec compétence et enthousiasme par&nbsp;Laurent Bovier. Elle est composée d’un comité directeur, d’un comité cantonal et de la commission de musique. Les présidents des groupements régionaux et de l’AVCC sont également membres d’office du comité directeur.</p><p>&nbsp;</p><p>&nbsp;</p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/organigrammeFSCV.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/organigrammeFSCV.png?resize=600%2C464" alt="organigrammeFSCV" height="246" width="318"></a></p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2015/03/statuts_FSCV_mars_2014_final.pdf" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/05/pdflogo.jpg?resize=68%2C68" alt="pdflogo" height="56" width="56"></a>Vous pouvez télécharger les&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2015/03/statuts_FSCV_mars_2014_final.pdf" target="_blank" style="color: rgb(170, 49, 35);">statuts de la FSCV</a>&nbsp;tels qu’adoptés pour l’Assemblée Générale du 22 mars 2014 à Brigue.</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 7, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (7, 'Präsentation', '<h1><strong>Präsentation</strong></h1><p>Der Verband Walliser Gesangvereine (VWG) ist Mitglied der Schweizerischen Chorvereinigung (SCV) und vereinigt Erwachsenen-, Jugend- und Kinderchöre aus dem Unter- und Oberwallis.</p><p>Der Verband ist 1906 gegründet worden. Ihm gehören die Association Valaisanne des Chefs de Choeurs (AVCC) sowie 4 regionale Gruppierungen an: le Groupement des Sociétés de Chant du Bas-Valais (GSCBV), l’Union Chorale du Centre (UCC), le Groupement des Chanteurs du Valais Central (GCVC) und der Oberwalliser Chor- und Cäcilien Verband (OCV).</p><p>Der Verband besteht heute aus über 160 Erwachsenenchören mit mehr als 5000 Sängerinnen und Sängern. Auch die Jugend- und Kinderchöre sind Mitglieder des Verbands, was ihnen Zugang zum Ausbildungsangebot verschafft und die Unterstützung durch Erwachsenenchöre ermöglicht.</p><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/carte_valais.gif" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/carte_valais.gif?resize=400%2C272" alt="Carte des groupements" height="216" width="318"></a></p><h4><strong>Organisation</strong></h4><p>Der VWG wird von Laurent Bovier mit Kompetenz und Begeisterung präsidiert. Die Organisation besteht aus einem Leitenden Ausschuss, einem Kantonalvorstand und der Musikkommission. Die Präsidenten der regionalen Gruppierungen und der AVCC gehören ebenfalls dem Leitenden Ausschuss an.</p><p>&nbsp;</p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/organigrammeFSCV.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2012/09/organigrammeFSCV.png?resize=600%2C464" alt="organigrammeFSCV" height="246" width="318"></a></p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2015/03/statuts_FSCV_mars_2014_final.pdf" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/05/pdflogo.jpg?resize=68%2C68" alt="pdflogo" height="56" width="56"></a>Sie können die&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2015/03/statuts_FSCV_mars_2014_final.pdf" target="_blank" style="color: rgb(170, 49, 35);">Statuten des VWG</a>, die an der Generalversammlung vom 22. März 2014 in Brig angenommen worden sind, herunterladen (deutscher Text im 2. Teil).</p><p><br></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 6, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (8, 'Groupement', '<h1><strong>Groupements</strong></h1><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="http://www.chanter.ch/web/img/carte_valais.gif" height="272" width="400"></span></p><p>4 groupements régionaux et l’AVCC&nbsp;</p><ul><li>Groupement des Sociétés de Chant du Bas-Valais (GSCBV)&nbsp;</li><li>Union Chorale du Centre (UCC)&nbsp;</li><li>Groupement des Chanteurs du Valais Central&nbsp;(GCVC)&nbsp;</li><li>Oberwalliser Chor- und Cäcilien Verband (OCV)</li><li>Association Valaisanne des chefs de choeurs (AVCC)</li></ul>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 9, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (9, 'Gruppierung', '<p>&lt;h1&gt;Groupement&lt;/h1&gt;<span style="background-color: rgba(255, 255, 255, 0.8);"><img src="http://www.chanter.ch/web/img/carte_valais.gif" height="272" width="400"></span></p><p>&lt;p&gt;4 groupements régionaux et l’AVCC&amp;nbsp;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Groupement des Sociétés de Chant du Bas-Valais (GSCBV)&amp;nbsp;&lt;/li&gt;&lt;li&gt;Union Chorale du Centre (UCC)&amp;nbsp;&lt;/li&gt;&lt;li&gt;Groupement des Chanteurs du Valais Central&amp;nbsp;(GCVC)&amp;nbsp;&lt;/li&gt;&lt;li&gt;Oberwalliser Chor- und Cäcilien Verband (OCV)&lt;/li&gt;&lt;li&gt;Association Valaisanne des chefs de choeurs (AVCC)&lt;/li&gt;&lt;/ul&gt;</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 8, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (10, 'Fête cantonale 2018', '<h1><strong>Fête cantonale 2018</strong></h1><h2>Fête des enfants</h2><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2017/08/f%C3%AAte-de-chant-2018-inscriptions.doc" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/08/telecharger.png?resize=52%2C52" height="40" width="40"></a><a href="http://www.chanter.ch/wp/wp-content/uploads/2017/08/f%C3%AAte-de-chant-2018-inscriptions.doc" target="_blank" style="color: rgb(170, 49, 35);">Inscription pour la fête des enfants</a></p><p>&nbsp;</p><p>Cliquer ci-dessous pour voir les ateliers pour la fête des enfants :<a href="http://www.chanter.ch/wp/wp-content/uploads/2017/08/Atelier-2.pdf" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/08/Atelier-2-page-001.jpg?resize=300%2C212" height="204" width="288"></a></p><p><strong>Informations pour les transports – RegionAlps</strong></p><p><br></p><p>En 2018, à l’occasion de la 30ème Fête Cantonale de Chant, du 4 au 6 mai 2018, RegionAlps a le plaisir d’offrir le retour aux Sociétés qui choisissent de prendre les<u>trains régionaux</u>&nbsp;de Brigue à St-Gingolph et Martigny – Orsières/Le Châble (RER Valais | Wallis et St-Bernard Express) pour se rendre à Châteauneuf-Conthey. Cette offre est valable le 4&nbsp;mai 2018,&nbsp;<u>uniquement pour les participants</u>.</p><p>Votre contact pour les réservations :</p><p>Secrétariat RegionAlps</p><p>Frédérique Theytaz</p><p>&nbsp;</p><p><a href="mailto:info@regionalps.ch" target="_blank" style="color: rgb(170, 49, 35);">info@regionalps.ch</a></p><p><a href="tel:027%20720%2047%2047" target="_blank" style="color: rgb(170, 49, 35);">027 720 47 47</a></p><p>A la réservation, nous vous ferons parvenir une contremarque à présenter au contrôleur. Le port de la casquette officiel de la fête est obligatoire pour pouvoir voyager avec cette contremarque. La casquette fera office de titre de transport pour le retour.</p><p>Une facture vous sera ensuite établie sur la base du nombre de participants annoncés.</p><p>Vous pouvez consulter les horaires sur&nbsp;<a href="http://%20www.regionalps.ch/" target="_blank" style="color: rgb(170, 49, 35);"><u>&nbsp;</u></a><a href="http://www.regionalps.ch/login.php" target="_blank" style="color: rgb(170, 49, 35);"><u>www.regionalps.ch</u></a>. Attention de bien choisir les trains régionaux /<strong>&nbsp;R</strong>&nbsp;/.</p><p>Nous restons à votre disposition pour tout complément d’information.</p><p>Avec nos meilleures salutations.</p><p>&nbsp;</p><p>Region Alps&nbsp;</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 11, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (11, 'Kantonale Gesangsfest 2018', '<h1><strong>Fête cantonale 2018</strong></h1><h2>Fête des enfants</h2><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2017/08/f%C3%AAte-de-chant-2018-inscriptions.doc" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/08/telecharger.png?resize=52%2C52" height="40" width="40"></a><a href="http://www.chanter.ch/wp/wp-content/uploads/2017/08/f%C3%AAte-de-chant-2018-inscriptions.doc" target="_blank" style="color: rgb(170, 49, 35);">Inscription pour la fête des enfants</a></p><p>&nbsp;</p><p>Cliquer ci-dessous pour voir les ateliers pour la fête des enfants :<a href="http://www.chanter.ch/wp/wp-content/uploads/2017/08/Atelier-2.pdf" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/08/Atelier-2-page-001.jpg?resize=300%2C212" height="204" width="288"></a></p><p><strong>Informations pour les transports – RegionAlps</strong></p><p><br></p><p>En 2018, à l’occasion de la 30ème Fête Cantonale de Chant, du 4 au 6 mai 2018, RegionAlps a le plaisir d’offrir le retour aux Sociétés qui choisissent de prendre les<u>trains régionaux</u>&nbsp;de Brigue à St-Gingolph et Martigny – Orsières/Le Châble (RER Valais | Wallis et St-Bernard Express) pour se rendre à Châteauneuf-Conthey. Cette offre est valable le 4&nbsp;mai 2018,&nbsp;<u>uniquement pour les participants</u>.</p><p>Votre contact pour les réservations :</p><p>Secrétariat RegionAlps</p><p>Frédérique Theytaz</p><p>&nbsp;</p><p><a href="mailto:info@regionalps.ch" target="_blank" style="color: rgb(170, 49, 35);">info@regionalps.ch</a></p><p><a href="tel:027%20720%2047%2047" target="_blank" style="color: rgb(170, 49, 35);">027 720 47 47</a></p><p>A la réservation, nous vous ferons parvenir une contremarque à présenter au contrôleur. Le port de la casquette officiel de la fête est obligatoire pour pouvoir voyager avec cette contremarque. La casquette fera office de titre de transport pour le retour.</p><p>Une facture vous sera ensuite établie sur la base du nombre de participants annoncés.</p><p>Vous pouvez consulter les horaires sur&nbsp;<a href="http://%20www.regionalps.ch/" target="_blank" style="color: rgb(170, 49, 35);"><u>&nbsp;</u></a><a href="http://www.regionalps.ch/login.php" target="_blank" style="color: rgb(170, 49, 35);"><u>www.regionalps.ch</u></a>. Attention de bien choisir les trains régionaux /<strong>&nbsp;R</strong>&nbsp;/.</p><p>Nous restons à votre disposition pour tout complément d’information.</p><p>Avec nos meilleures salutations.</p><p>&nbsp;</p><p>Region Alps&nbsp;</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 10, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (12, 'Informations Fête Cantonale 2018', '<h1><strong>Informations Fête Cantonale 2018</strong></h1><p><a href="http://www.ucc-vs.ch/wp/fete-cantonale-2018-2/" target="_blank" style="color: rgb(170, 49, 35);">Visitez le site de l’UCC pour de plus amples informations : http://www.ucc-vs.ch/wp/fete-cantonale-2018-2/</a></p><h2>Les concerts d’annonces</h2><p>– Vendredi 13 avril 2018 à Grône</p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-vendredi-13-avril-2018.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-vendredi-13-avril-2018.png?resize=300%2C180" height="173" width="288"></a></p><p>– Samedi 14 avril 2018 à La Souste</p><p><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-samedi-14-avril-2018.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-samedi-14-avril-2018.png?resize=300%2C169" height="162" width="288"></a></p><p>– Dimanche 15 avril à St-Maurice</p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-dimanche-15-avril-2018.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-dimanche-15-avril-2018.png?resize=300%2C169" height="162" width="288"></a></p><h2>Fête cantonale du 4 au 6 mai 2018</h2><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-des-ateliers-du-4-mai-au-6-mai-2018.pdf" target="_blank" style="color: rgb(170, 49, 35);">Cliquer ici pour voir les horaires des concerts d’ateliers lors de la fête cantonale.</a></p><h2>Les passages devant jury</h2><p>Vous pouvez télécharger le planning des passage devant jury (samedi)&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2018/02/F18-Concerts-devant-jury-horaires-.pdf" target="_blank" style="color: rgb(170, 49, 35);">dans ce document.</a></p><h2>Les aubades</h2><p>Vous pouvez télécharger le planning des aubades (samedi et dimanche)&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2018/01/F18-Aubades-samedi-et-dimanche-1.pdf" target="_blank" style="color: rgb(170, 49, 35);">dans ce document.</a></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_general.jpg?resize=421%2C596" height="450" width="318"></span></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_ven13.jpg?resize=421%2C596" height="450" width="318"></span></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_sam14.jpg?resize=421%2C596" height="450" width="318"></span></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_dim15.jpg?resize=421%2C596" height="450" width="318"></span></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 13, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (13, 'Informationen kantonales Gesangsfest 2018', '<h1><strong>Informations Fête Cantonale 2018</strong></h1><p><a href="http://www.ucc-vs.ch/wp/fete-cantonale-2018-2/" target="_blank" style="color: rgb(170, 49, 35);">Visitez le site de l’UCC pour de plus amples informations : http://www.ucc-vs.ch/wp/fete-cantonale-2018-2/</a></p><h2>Les concerts d’annonces</h2><p>– Vendredi 13 avril 2018 à Grône</p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-vendredi-13-avril-2018.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-vendredi-13-avril-2018.png?resize=300%2C180" height="173" width="288"></a></p><p>– Samedi 14 avril 2018 à La Souste</p><p><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-samedi-14-avril-2018.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-samedi-14-avril-2018.png?resize=300%2C169" height="162" width="288"></a></p><p>– Dimanche 15 avril à St-Maurice</p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-dimanche-15-avril-2018.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-du-dimanche-15-avril-2018.png?resize=300%2C169" height="162" width="288"></a></p><h2>Fête cantonale du 4 au 6 mai 2018</h2><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2017/12/Programme-des-ateliers-du-4-mai-au-6-mai-2018.pdf" target="_blank" style="color: rgb(170, 49, 35);">Cliquer ici pour voir les horaires des concerts d’ateliers lors de la fête cantonale.</a></p><h2>Les passages devant jury</h2><p>Vous pouvez télécharger le planning des passage devant jury (samedi)&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2018/02/F18-Concerts-devant-jury-horaires-.pdf" target="_blank" style="color: rgb(170, 49, 35);">dans ce document.</a></p><h2>Les aubades</h2><p>Vous pouvez télécharger le planning des aubades (samedi et dimanche)&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2018/01/F18-Aubades-samedi-et-dimanche-1.pdf" target="_blank" style="color: rgb(170, 49, 35);">dans ce document.</a></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_general.jpg?resize=421%2C596" height="450" width="318"></span></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_ven13.jpg?resize=421%2C596" height="450" width="318"></span></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_sam14.jpg?resize=421%2C596" height="450" width="318"></span></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/FC2018_concertannonce_dim15.jpg?resize=421%2C596" height="450" width="318"></span></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 12, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (14, 'Choeur en Herbe', '<h1><strong>Choeur en Herbe</strong></h1><h2>Choeur en Herbe 2018</h2><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/06/ch2018-affiche.png?resize=610%2C875" height="456" width="318"></span></p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/01/flyerbackprint1.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/01/flyerbackprint1.jpg?resize=610%2C864" height="450" width="318"></a></p><p><a href="http://www.chanter.ch/wp/inscription-pour-le-camp-2017-choeur-en-herbe/" target="_blank" style="color: rgb(170, 49, 35);">Formulaire d’inscription (nouveau délai : 20 mai)</a></p><h4>Archives : Choeur en Herbe 2016</h4><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/08/DSCN7240.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/08/DSCN7240.jpg?resize=1%2C1" alt="DSCN7240" height="1" width="1"></a></p><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/08/DSCN7239.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/08/DSCN7239.jpg?resize=1%2C1" alt="DSCN7239" height="1" width="1"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/08/DSCN7223.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/08/DSCN7223.jpg?resize=300%2C225" alt="DSCN7223" height="216" width="288"></a></p><h5>Flyers 2016 (cliquer pour agrandir)</h5><h5><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016.jpg?resize=212%2C300" alt="ChoeurenHerbe2016" height="283" width="200"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016_verso.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016_verso.jpg?resize=212%2C300" alt="ChoeurenHerbe2016_verso" height="283" width="200"></a></h5><p>&nbsp;</p><h2>Souvenir de l’édition 2015</h2><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="http://www.youtube.com/embed/9BDiX4TyrqI?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent" height="344" width="610"></iframe><p><br></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 15, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (15, 'Lager 2018', '<h1><strong>Lager 2018</strong></h1><p><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/01/flyerfrontprint1.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/01/flyerfrontprint1.jpg?resize=610%2C864" height="450" width="318"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/01/flyerbackprint1.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2017/01/flyerbackprint1.jpg?resize=610%2C864" height="450" width="318"></a></p><p><a href="http://www.chanter.ch/wp/inscription-pour-le-camp-2017-choeur-en-herbe/" target="_blank" style="color: rgb(170, 49, 35);">Formulaire d’inscription</a></p><p>&nbsp;</p><p>&nbsp;</p><h3>Lager 2016</h3><p><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/07/13767234_1239449256065598_7272746716508354542_o-1.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/07/13767234_1239449256065598_7272746716508354542_o-1.jpg?resize=610%2C866" alt="13767234_1239449256065598_7272746716508354542_o" height="451" width="318"></a></p><p>Das tolle Team von Dominique Tille, Aude Gilliéron und Timothée Haller wird wieder dabei sein, und zwar kreativer denn je! Die jungen Leute von 15 bis 30 Jahren, mit oder ohne Gesangserfahrung, sind vom 1. bis 6. August nach Blatten eingeladen! Geben Sie diese Information in Ihrem Umfeld weiter! Unterstützen Sie diese jungen Leute am Schlusskonzert des Lagers am Samstag, den 6. August. Ort und Zeit werden später bekanntgegeben.</p><p>&nbsp;</p><h4>Flyers 2016</h4><h5><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016.jpg?resize=212%2C300" alt="ChoeurenHerbe2016" height="283" width="200"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016_verso.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/02/ChoeurenHerbe2016_verso.jpg?resize=212%2C300" alt="ChoeurenHerbe2016_verso" height="283" width="200"></a></h5><p>&nbsp;</p><h3>Lager 2015</h3><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="http://www.youtube.com/embed/9BDiX4TyrqI?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent" height="344" width="610"></iframe><p><br></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 14, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (16, 'Un air de montagne 2018', '<h1><strong>Un air de montagne 2018</strong></h1><h1>Liste des inscrits</h1><blockquote><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/06/liste-inscrits-2018.png?resize=270%2C697" height="666" width="258"></span></blockquote><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2018/04/papillon_montagne2018_FRA_print.pdf" target="_blank" style="color: rgb(170, 49, 35);">Bulletin d’inscription disponible en cliquant ici.</a></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/uadm2018.png?resize=610%2C885" height="461" width="318"></span></p><p>Auf Deutsch :<a href="http://www.chanter.ch/wp/de/eine-bergmelodie/" target="_blank" style="color: rgb(170, 49, 35);">http://www.chanter.ch/wp/de/eine-bergmelodie/</a></p><p>&nbsp;</p><h1>Archives : Un air de montagne 2016</h1><h4>Article intéressant sur «&nbsp;Un Air de montagne&nbsp;» de l’Union Suisses des Chorales.&nbsp;<a href="http://www.usc-scv.ch/index.php?pid=2&amp;l=fr&amp;id=563" target="_blank" style="color: rgb(170, 49, 35);">Pour le voir, cliquer ici !</a></h4><h4>Article du nouvelliste</h4><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/07/2016-07-23-10.48.54.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/07/2016-07-23-10.48.54-e1470042713409-576x1024.jpg?resize=576%2C1024" alt="2016-07-23-10.48.54" height="179" width="318"></a></p><p>&nbsp;</p><h2>Un Air de montagne 2015</h2><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="http://www.youtube.com/embed/NZ9fX3toPwg?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent" height="344" width="610"></iframe><p><br></p><h2>Un Air de montagne 2014</h2><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_3.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_3.jpg?resize=300%2C225" alt="AirMontagne2014_3" height="216" width="288"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_4.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_4.jpg?resize=336%2C224" alt="AirMontagne2014_4" height="212" width="318"></a></p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014.jpg?resize=300%2C225" alt="AirMontagne2014" height="216" width="288"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_2.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_2.jpg?resize=339%2C224" alt="AirMontagne2014_2" height="210" width="318"></a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 17, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (17, 'Eine Bergmelodie 2018', '<h1><strong>Un air de montagne 2018</strong></h1><h1>Liste des inscrits</h1><blockquote><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/06/liste-inscrits-2018.png?resize=270%2C697" height="666" width="258"></span></blockquote><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2018/04/papillon_montagne2018_FRA_print.pdf" target="_blank" style="color: rgb(170, 49, 35);">Bulletin d’inscription disponible en cliquant ici.</a></p><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/04/uadm2018.png?resize=610%2C885" height="461" width="318"></span></p><p>Auf Deutsch :<a href="http://www.chanter.ch/wp/de/eine-bergmelodie/" target="_blank" style="color: rgb(170, 49, 35);">http://www.chanter.ch/wp/de/eine-bergmelodie/</a></p><p>&nbsp;</p><h1>Archives : Un air de montagne 2016</h1><h4>Article intéressant sur «&nbsp;Un Air de montagne&nbsp;» de l’Union Suisses des Chorales.&nbsp;<a href="http://www.usc-scv.ch/index.php?pid=2&amp;l=fr&amp;id=563" target="_blank" style="color: rgb(170, 49, 35);">Pour le voir, cliquer ici !</a></h4><h4>Article du nouvelliste</h4><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/07/2016-07-23-10.48.54.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/07/2016-07-23-10.48.54-e1470042713409-576x1024.jpg?resize=576%2C1024" alt="2016-07-23-10.48.54" height="179" width="318"></a></p><p>&nbsp;</p><h2>Un Air de montagne 2015</h2><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="http://www.youtube.com/embed/NZ9fX3toPwg?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent" height="344" width="610"></iframe><p><br></p><h2>Un Air de montagne 2014</h2><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_3.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_3.jpg?resize=300%2C225" alt="AirMontagne2014_3" height="216" width="288"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_4.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_4.jpg?resize=336%2C224" alt="AirMontagne2014_4" height="212" width="318"></a></p><p><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014.jpg?resize=300%2C225" alt="AirMontagne2014" height="216" width="288"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_2.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2014/03/AirMontagne2014_2.jpg?resize=339%2C224" alt="AirMontagne2014_2" height="210" width="318"></a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 16, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (18, 'Frapp’Festival', '<h1><strong>Frapp’Festival</strong></h1><blockquote>La Fédération des Sociétés de chant du Valais ainsi que sa commission de musique ont engagé il y a quelques années réflexions et études autour de la relève des chorales valaisannes. Des projets ont été mis sur pied ces dernières années avec succès. Le Frapp’Festival en est un. Né de la volonté de créer une activité chorale pour les jeunes, ce festival se place avant tout sous les signes de la&nbsp;découverte&nbsp;et de la&nbsp;rencontre&nbsp;entre les jeunes chanteurs valaisans.</blockquote><blockquote>La première édition a eu lieu à Chermignon en 2012, la deuxième le 12 mars 2016 à Orsières. Lors de cette dernière édition, 9 chœurs valaisans ont répondu à l’appel de la Commission de musique de la Fédération des Sociétés de Chant du Valais. Un chœur fribourgeois est venu enrichir le panel présent.</blockquote><blockquote>Trois ateliers avec 3 chefs renommés ont été au programme de l’après-midi afin de découvrir des facettes originales de la musique vocale. Le premier avec Stéphane Cosandey (bodypercussion), le deuxième avec Thierry Dagon (musique graphique), et le troisième avec Gonzague Monney (musique vocale).</blockquote><blockquote>Les chœurs présents&nbsp;:</blockquote><blockquote>Ganea,&nbsp;<strong>Chermignon,&nbsp;</strong>GénérationS,&nbsp;<strong>Sierre,&nbsp;</strong>Chœur des jeunes de St-Martin,&nbsp;<strong>St-Martin,&nbsp;</strong>Chœur des jeunes «&nbsp;Flamme&nbsp;»,&nbsp;<strong>Fully,&nbsp;</strong>Chœur des jeunes de St-Guérin,&nbsp;<strong>Sion,&nbsp;</strong>Chœur des CO,&nbsp;<strong>Martigny-Fully-Saxon,&nbsp;</strong>L’Annonciade – maîtrise de la Glâne,&nbsp;<strong>Romont,&nbsp;</strong>Chœur des jeunes du Bouveret,&nbsp;<strong>Bouveret,&nbsp;</strong>Chœur des jeunes de Bramois,&nbsp;<strong>Bramois&nbsp;</strong>et Chœur des jeunes de Nendaz,&nbsp;<strong>Nendaz</strong></blockquote><blockquote>Le concert final avec tous les chœurs s’est déroulé le soir à la salle polyvalente d’Orsières, avec la présence du groupe valaisan Wanted’s en deuxième partie.</blockquote><h2>Souvenirs de l’édition 2016</h2><p>A l’heure du bilan, il ne reste que des bons souvenirs. Voici le résumé de la journée dressé par le Nouvelliste du lundi 14 mars 2016.</p><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/03/FrappFestival.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/03/FrappFestival.png?resize=202%2C300" alt="Frapp\'Festival" height="282" width="190"></a></p><h2>Souvenirs de la 1e édition en 2012 (photographe : Philippe Martin)</h2><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo1.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo1.jpg?resize=199%2C300" alt="photo(1)" height="282" width="187"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo7.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo7.jpg?resize=300%2C199" alt="photo(7)" height="191" width="288"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo8.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo8.jpg?resize=300%2C199" alt="photo(8)" height="191" width="288"></a><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo6.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo6.jpg?resize=300%2C199" alt="photo(6)" height="191" width="288"></a><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo5.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo5.jpg?resize=300%2C199" alt="photo(5)" height="191" width="288"></a><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo4.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo4.jpg?resize=300%2C199" alt="photo(4)" height="191" width="288"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo3.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo3.jpg?resize=300%2C199" alt="photo(3)" height="191" width="288"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo.jpg?resize=300%2C199" alt="photo" height="191" width="288"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo2.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo2.jpg?resize=300%2C199" alt="photo(2)" height="191" width="288"></a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 19, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (19, 'Frapp’Festival', '<h1><strong>Frapp’Festival</strong></h1><blockquote>La Fédération des Sociétés de chant du Valais ainsi que sa commission de musique ont engagé il y a quelques années réflexions et études autour de la relève des chorales valaisannes. Des projets ont été mis sur pied ces dernières années avec succès. Le Frapp’Festival en est un. Né de la volonté de créer une activité chorale pour les jeunes, ce festival se place avant tout sous les signes de la&nbsp;découverte&nbsp;et de la&nbsp;rencontre&nbsp;entre les jeunes chanteurs valaisans.</blockquote><blockquote>La première édition a eu lieu à Chermignon en 2012, la deuxième le 12 mars 2016 à Orsières. Lors de cette dernière édition, 9 chœurs valaisans ont répondu à l’appel de la Commission de musique de la Fédération des Sociétés de Chant du Valais. Un chœur fribourgeois est venu enrichir le panel présent.</blockquote><blockquote>Trois ateliers avec 3 chefs renommés ont été au programme de l’après-midi afin de découvrir des facettes originales de la musique vocale. Le premier avec Stéphane Cosandey (bodypercussion), le deuxième avec Thierry Dagon (musique graphique), et le troisième avec Gonzague Monney (musique vocale).</blockquote><blockquote>Les chœurs présents&nbsp;:</blockquote><blockquote>Ganea,&nbsp;<strong>Chermignon,&nbsp;</strong>GénérationS,&nbsp;<strong>Sierre,&nbsp;</strong>Chœur des jeunes de St-Martin,&nbsp;<strong>St-Martin,&nbsp;</strong>Chœur des jeunes «&nbsp;Flamme&nbsp;»,&nbsp;<strong>Fully,&nbsp;</strong>Chœur des jeunes de St-Guérin,&nbsp;<strong>Sion,&nbsp;</strong>Chœur des CO,&nbsp;<strong>Martigny-Fully-Saxon,&nbsp;</strong>L’Annonciade – maîtrise de la Glâne,&nbsp;<strong>Romont,&nbsp;</strong>Chœur des jeunes du Bouveret,&nbsp;<strong>Bouveret,&nbsp;</strong>Chœur des jeunes de Bramois,&nbsp;<strong>Bramois&nbsp;</strong>et Chœur des jeunes de Nendaz,&nbsp;<strong>Nendaz</strong></blockquote><blockquote>Le concert final avec tous les chœurs s’est déroulé le soir à la salle polyvalente d’Orsières, avec la présence du groupe valaisan Wanted’s en deuxième partie.</blockquote><h2>Souvenirs de l’édition 2016</h2><p>A l’heure du bilan, il ne reste que des bons souvenirs. Voici le résumé de la journée dressé par le Nouvelliste du lundi 14 mars 2016.</p><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/03/FrappFestival.png" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2016/03/FrappFestival.png?resize=202%2C300" alt="Frapp\'Festival" height="282" width="190"></a></p><h2>Souvenirs de la 1e édition en 2012 (photographe : Philippe Martin)</h2><p><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo1.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo1.jpg?resize=199%2C300" alt="photo(1)" height="282" width="187"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo7.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo7.jpg?resize=300%2C199" alt="photo(7)" height="191" width="288"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo8.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo8.jpg?resize=300%2C199" alt="photo(8)" height="191" width="288"></a><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo6.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo6.jpg?resize=300%2C199" alt="photo(6)" height="191" width="288"></a><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo5.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo5.jpg?resize=300%2C199" alt="photo(5)" height="191" width="288"></a><a href="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo4.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo4.jpg?resize=300%2C199" alt="photo(4)" height="191" width="288"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo3.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo3.jpg?resize=300%2C199" alt="photo(3)" height="191" width="288"></a><a href="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo.jpg?resize=300%2C199" alt="photo" height="191" width="288"></a><a href="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo2.jpg" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2015/03/photo2.jpg?resize=300%2C199" alt="photo(2)" height="191" width="288"></a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 18, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (20, 'Formation 2014-15', '<h1><strong>Formation 2014-15</strong></h1><p>Voici le programme de Formation 2014-15 de la FSCV et des groupements.</p><ul><li><a href="http://www.chanter.ch/wp/wp-content/uploads/2013/10/tableau_formation_2014.pdf" target="_blank" style="color: rgb(170, 49, 35);">Plan général Formation 2014-15</a></li><li><a href="http://www.chanter.ch/wp/wp-content/uploads/2013/10/Travail-vocal-en-chorale-2013.docx" target="_blank" style="color: rgb(170, 49, 35);">Travail vocal en chorale 2014-15</a></li><li><a href="http://www.chanter.ch/wp/wp-content/uploads/2013/10/Travail-vocal-en-chorale-2013-D.docx" target="_blank" style="color: rgb(170, 49, 35);">Stimmbildung in der Chöre 2014-15</a></li></ul>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 21, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (21, 'Schulung 2014-15', '<h1><strong>Formation 2014-15</strong></h1><p>Voici le programme de Formation 2014-15 de la FSCV et des groupements.</p><ul><li><a href="http://www.chanter.ch/wp/wp-content/uploads/2013/10/tableau_formation_2014.pdf" target="_blank" style="color: rgb(170, 49, 35);">Plan général Formation 2014-15</a></li><li><a href="http://www.chanter.ch/wp/wp-content/uploads/2013/10/Travail-vocal-en-chorale-2013.docx" target="_blank" style="color: rgb(170, 49, 35);">Travail vocal en chorale 2014-15</a></li><li><a href="http://www.chanter.ch/wp/wp-content/uploads/2013/10/Travail-vocal-en-chorale-2013-D.docx" target="_blank" style="color: rgb(170, 49, 35);">Stimmbildung in der Chöre 2014-15</a></li></ul>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 20, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (22, 'Plan général de formation 2018-2019', '<h1><strong>Plan général de formation 2018-2019</strong></h1><p>Voici le programme de formation pour la saison 2018-2019. Il est ouvert à tous les membres de la Fédération, tous groupements confondus.</p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2018/09/Formation-2018-2019-B.pdf" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/formation-2018-2019.png?resize=300%2C238" height="228" width="288"></a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 23, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (23, 'Ausbildungen 2018-2019', '<h1><strong>Plan général de formation 2018-2019</strong></h1><p>Voici le programme de formation pour la saison 2018-2019. Il est ouvert à tous les membres de la Fédération, tous groupements confondus.</p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2018/09/Formation-2018-2019-B.pdf" target="_blank" style="color: rgb(170, 49, 35); background-color: rgba(255, 255, 255, 0.8);"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/formation-2018-2019.png?resize=300%2C238" height="228" width="288"></a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 22, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (24, 'Conférence – Mouvement et musique', '<h1><strong>Conférence – Mouvement et musique</strong></h1><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/affiche_conference_290918_p1.jpg?resize=610%2C863" height="450" width="318"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/affiche_conference_290918_p2.jpg?resize=610%2C863" height="450" width="318"></span></p><p>Le lien réciproque entre le mouvement et la musique, du geste corporel à l’expression musicale. Conférence du Dr Philippe Vuadens, Neurologue, Médecin adjoint à la Suva/Sion, chanteur.</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 25, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (25, 'Konferenz - Bewegung und Musik', '<h1><strong>Conférence – Mouvement et musique</strong></h1><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i0.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/affiche_conference_290918_p1.jpg?resize=610%2C863" height="450" width="318"><img src="https://i2.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/affiche_conference_290918_p2.jpg?resize=610%2C863" height="450" width="318"></span></p><p>Le lien réciproque entre le mouvement et la musique, du geste corporel à l’expression musicale. Conférence du Dr Philippe Vuadens, Neurologue, Médecin adjoint à la Suva/Sion, chanteur.</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 24, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (26, 'Travail vocal en chorale', '<h1><strong>Travail vocal en chorale</strong></h1><p>Des exercices ludiques de mise en voix, des conseils avisés pour améliorer la fusion au sein du chœur et pour développer une couleur vocale agréable&nbsp;: les spécialistes de la voix dont vous trouvez ci-dessous les coordonnées sont prêts à venir travailler dans votre chorale selon vos besoins, soit dans le courant de la saison musicale, soit à l’approche du concert annuel ou du festival.</p><p>La rémunération horaire recommandée est de Fr 80.- et de Fr 100.- pour les formateurs au bénéfice d’un diplôme professionnel. Sur présentation de la facture, la Fédération alloue à ses sociétés membres un subside correspondant au 20 % du coût de la formation (maximum de 200 francs).</p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2018/01/Liste-des-formateurs.pdf" target="_blank" style="color: rgb(170, 49, 35);">Cliquer ici pour obtenir la liste des contacts au format PDF.</a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 27, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (27, 'Stimmbildung im Chor', '<h1><strong>Travail vocal en chorale</strong></h1><p>Des exercices ludiques de mise en voix, des conseils avisés pour améliorer la fusion au sein du chœur et pour développer une couleur vocale agréable&nbsp;: les spécialistes de la voix dont vous trouvez ci-dessous les coordonnées sont prêts à venir travailler dans votre chorale selon vos besoins, soit dans le courant de la saison musicale, soit à l’approche du concert annuel ou du festival.</p><p>La rémunération horaire recommandée est de Fr 80.- et de Fr 100.- pour les formateurs au bénéfice d’un diplôme professionnel. Sur présentation de la facture, la Fédération alloue à ses sociétés membres un subside correspondant au 20 % du coût de la formation (maximum de 200 francs).</p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2018/01/Liste-des-formateurs.pdf" target="_blank" style="color: rgb(170, 49, 35);">Cliquer ici pour obtenir la liste des contacts au format PDF.</a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 26, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (28, 'Présentation AVCC', '<h1><strong>Présentation AVCC</strong></h1><p>L’Association Valaisanne des Chefs de Choeurs (AVCC) est une association qui, depuis plus de&nbsp;40 ans, veut promouvoir la formation continue des chefs de chœur grâce à des cours donnés par des intervenants réputés et de qualité.&nbsp;Elle tient à défendre les intérêts des chefs de chœurs, à promouvoir une formation continue de qualité, à favoriser les contacts entre ses sociétaires et les organes officiels, à offrir à ses membres une documentation spécialisée dans le domaine du chant choral.</p><p><br></p><p>Elle organise chaque année, seule ou en collaboration avec la Fédération des Sociétés de Chant du Valais, des séminaires avec des chefs renommés :</p><ul><li>des journées de formation</li><li>des soirées à thème</li><li>des journées spéciales pour chefs de chœurs de jeunes ou d’enfants</li><li>des&nbsp;activités autour du fonds choral déposé auprès de la Médiathèque Valais</li></ul><p><br></p><p>Elle favorise également la rencontre et les échanges entre chefs et propose un vaste choix de plus de 20’000 partitions.</p><p>Merci de nous aider à faire connaître l’AVCC&nbsp;! N’hésitez pas à nous communiquer vos souhaits, vos soucis, vos coups de cœur ou vos questions.&nbsp;Nous essayons de tout mettre en œuvre pour répondre à vos besoins.</p><p><br></p><p>N’hésitez pas à découvrir :</p><ul><li><a href="http://www.chanter.ch/wp/avcc/historique/" target="_blank" style="color: rgb(170, 49, 35);">l’historique AVCC</a></li><li><a href="http://www.chanter.ch/wp/avcc/comite-avcc/" target="_blank" style="color: rgb(170, 49, 35);">notre comité</a></li><li><a href="http://www.chanter.ch/wp/avcc/formation-avcc/" target="_blank" style="color: rgb(170, 49, 35);">notre offre de formation</a></li><li><a href="http://www.chanter.ch/wp/avcc/fonds-choral-avcc/" target="_blank" style="color: rgb(170, 49, 35);">notre fonds de partitions</a></li><li><a href="http://www.chanter.ch/wp/avcc/photos-avcc-3/" target="_blank" style="color: rgb(170, 49, 35);">les photos de nos activités passées</a></li></ul>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 29, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (29, 'AVCC-Präsentation', '<h1><strong>Présentation AVCC</strong></h1><p>L’Association Valaisanne des Chefs de Choeurs (AVCC) est une association qui, depuis plus de&nbsp;40 ans, veut promouvoir la formation continue des chefs de chœur grâce à des cours donnés par des intervenants réputés et de qualité.&nbsp;Elle tient à défendre les intérêts des chefs de chœurs, à promouvoir une formation continue de qualité, à favoriser les contacts entre ses sociétaires et les organes officiels, à offrir à ses membres une documentation spécialisée dans le domaine du chant choral.</p><p>Elle organise chaque année, seule ou en collaboration avec la Fédération des Sociétés de Chant du Valais, des séminaires avec des chefs renommés :</p><ul><li>des journées de formation</li><li>des soirées à thème</li><li>des journées spéciales pour chefs de chœurs de jeunes ou d’enfants</li><li>des&nbsp;activités autour du fonds choral déposé auprès de la Médiathèque Valais</li></ul><p>Elle favorise également la rencontre et les échanges entre chefs et propose un vaste choix de plus de 20’000 partitions.</p><p>Merci de nous aider à faire connaître l’AVCC&nbsp;! N’hésitez pas à nous communiquer vos souhaits, vos soucis, vos coups de cœur ou vos questions.&nbsp;Nous essayons de tout mettre en œuvre pour répondre à vos besoins.</p><p>N’hésitez pas à découvrir :</p><ul><li><a href="http://www.chanter.ch/wp/avcc/historique/" target="_blank" style="color: rgb(170, 49, 35);">l’historique AVCC</a></li><li><a href="http://www.chanter.ch/wp/avcc/comite-avcc/" target="_blank" style="color: rgb(170, 49, 35);">notre comité</a></li><li><a href="http://www.chanter.ch/wp/avcc/formation-avcc/" target="_blank" style="color: rgb(170, 49, 35);">notre offre de formation</a></li><li><a href="http://www.chanter.ch/wp/avcc/fonds-choral-avcc/" target="_blank" style="color: rgb(170, 49, 35);">notre fonds de partitions</a></li><li><a href="http://www.chanter.ch/wp/avcc/photos-avcc-3/" target="_blank" style="color: rgb(170, 49, 35);">les photos de nos activités passées</a></li></ul>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 28, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (30, 'Historique AVCC', '<h1><strong>Historique AVCC</strong></h1><p><strong>Objectif</strong></p><p>Soucieuse d’offrir aux responsables de la musique chorale l’occasion de parfaire leur formation auprès d’animateurs compétents ou de partager soucis et joies entre collègues, l’AVCC poursuit son activité initiale en proposant ses encouragements et ses services.</p><p><strong>Fondation</strong></p><p>A la suite d’un week-end de l’AVDC (Association Vaudoise des Directeurs de Chœurs) à Vérossaz, une dizaine de chefs de chœur valaisans décidèrent de la fondation de l’AVCC, l’Association Valaisanne des Chefs de Chœur. Cette fondation eut lieu le 11 octobre 1969 autour de M. Fernand Dubois, le regretté président de la Fédération Cantonale de Chant.&nbsp;L’assemblée&nbsp;fondatrice eut lieu à Sion le 13 décembre 1969 en présence d’une trentaine de chefs qui répondirent à l’appel.</p><p><strong>Présidents</strong></p><p>Présidée successivement par MM. Armand Blanc, Jean-Pierre Salamin, Pierre-Louis Nanchen, Pierre-Alain Barras, Samuel Emery et, depuis 2014, Jean-David Waeber, l’AVCC n’a cessé de poursuivre, tout en les adaptant aux goûts et aux besoins du moment, les objectifs que s’étaient fixés les initiateurs et fondateurs.</p><p><strong>Foyer</strong></p><p>Le Foyer Musical, ouvert par l’AVCC le 28 août 1979 en la Maison Supersaxo à Martigny fut déplacé à Sion en 1981, au Foyer Don Bosco, puis au home de Mazerette jusqu’en 2009. Cette année-là, l’AVCC a légué à la Médiathèque Valais son fonds de partitions afin de lui donner une plus grande visibilité auprès du public. Année après année ce fonds s’est étoffé pour rassembler et proposer aujourd’hui près de 20’000 partitions et de nombreux recueils, collections ou supports audio, le tout répertorié par M. Edouard Delaloye, premier animateur, puis par Mme Anne-Françoise Andenmatten-Sierro, actuelle archiviste de l’association, en activité depuis 1985.</p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2015/02/historique_jordan.pdf" target="_blank" style="color: rgb(170, 49, 35);">Historique complet de Léon Jordan</a>&nbsp;(Format PDF)</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 31, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (31, 'AVCC-Historie', '<h1><strong>Historique AVCC</strong></h1><p><strong>Objectif</strong></p><p>Soucieuse d’offrir aux responsables de la musique chorale l’occasion de parfaire leur formation auprès d’animateurs compétents ou de partager soucis et joies entre collègues, l’AVCC poursuit son activité initiale en proposant ses encouragements et ses services.</p><p><strong>Fondation</strong></p><p>A la suite d’un week-end de l’AVDC (Association Vaudoise des Directeurs de Chœurs) à Vérossaz, une dizaine de chefs de chœur valaisans décidèrent de la fondation de l’AVCC, l’Association Valaisanne des Chefs de Chœur. Cette fondation eut lieu le 11 octobre 1969 autour de M. Fernand Dubois, le regretté président de la Fédération Cantonale de Chant.&nbsp;L’assemblée&nbsp;fondatrice eut lieu à Sion le 13 décembre 1969 en présence d’une trentaine de chefs qui répondirent à l’appel.</p><p><strong>Présidents</strong></p><p>Présidée successivement par MM. Armand Blanc, Jean-Pierre Salamin, Pierre-Louis Nanchen, Pierre-Alain Barras, Samuel Emery et, depuis 2014, Jean-David Waeber, l’AVCC n’a cessé de poursuivre, tout en les adaptant aux goûts et aux besoins du moment, les objectifs que s’étaient fixés les initiateurs et fondateurs.</p><p><strong>Foyer</strong></p><p>Le Foyer Musical, ouvert par l’AVCC le 28 août 1979 en la Maison Supersaxo à Martigny fut déplacé à Sion en 1981, au Foyer Don Bosco, puis au home de Mazerette jusqu’en 2009. Cette année-là, l’AVCC a légué à la Médiathèque Valais son fonds de partitions afin de lui donner une plus grande visibilité auprès du public. Année après année ce fonds s’est étoffé pour rassembler et proposer aujourd’hui près de 20’000 partitions et de nombreux recueils, collections ou supports audio, le tout répertorié par M. Edouard Delaloye, premier animateur, puis par Mme Anne-Françoise Andenmatten-Sierro, actuelle archiviste de l’association, en activité depuis 1985.</p><p><a href="http://www.chanter.ch/wp/wp-content/uploads/2015/02/historique_jordan.pdf" target="_blank" style="color: rgb(170, 49, 35);">Historique complet de Léon Jordan</a>&nbsp;(Format PDF)</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 30, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (32, 'Comité AVCC', '<h1><strong>Comité AVCC</strong></h1><p>Coordonnées des membres du&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2015/02/Comit%C3%A9-AVCC-2017-2018.pdf" target="_blank" style="color: rgb(170, 49, 35);">Comité AVCC 2018-2019</a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 33, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (33, 'AVCC-Komitee', '<h1><strong>Comité AVCC</strong></h1><p>Coordonnées des membres du&nbsp;<a href="http://www.chanter.ch/wp/wp-content/uploads/2015/02/Comit%C3%A9-AVCC-2017-2018.pdf" target="_blank" style="color: rgb(170, 49, 35);">Comité AVCC 2018-2019</a></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 32, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (34, 'Fonds choral et Foyer AVCC', '<h1><strong>Fonds choral et Foyer AVCC</strong></h1><p class="ql-align-justify">Le Foyer AVCC est un lieu de rencontre convivial où venir seul, avec sa commission de musique ou avec son comité pour consulter des partitions et des documents avant de bâtir un programme. Tous les documents sont à consulter sur place. Ils sont visibles dans le catalogue RERO, avec une multitude de renseignements utiles aux chefs de chœurs. Dès le début 2018, une partie de cette musique a été placée au libre accès de la Médiathèque-Valais pour être consultée librement. Cependant, il sera encore possible de prendre rendez-vous avec l’archiviste pour une recherche spécifique ou des conseils.</p><p>La Médiathèque Valais à Sion se trouve à la Rue de Lausanne 45.</p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2759.96401561557!2d7.355258599999989!3d46.23106029999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478edc3a1032361b%3A0xdf5a79b2d38baf0b!2sRue+de+Lausanne+45%2C+1950+Sion!5e0!3m2!1sfr!2sch!4v1424960408731" height="300" width="400"></iframe><p><br></p><p>Pour la recherche et la consultation des partitions, prendre préalablement contact avec :</p><p>Anne-Françoise Andenmatten Sierro</p><p>Tél. privé : 027 323 19 28 ou 079 232 54 02</p><p>E-mail&nbsp;:&nbsp;<a href="mailto:annef-vociamici@bluewin.ch" target="_blank" style="color: rgb(170, 49, 35);">annef-vociamici@bluewin.ch</a></p><p>Près de 20’000 partitions</p><ul><li>Profanes</li><li>Religieuses</li><li>De toutes époques et de tous genres</li><li>De différentes maisons d’édition</li><li>Pour tous types de choeurs: mixtes, dames, hommes, jeunes, enfants</li></ul><p>Des livres et des documentaires</p><ul><li>Théorie musicale</li><li>Musique chorale et compositeurs</li><li>Direction chorale</li><li>Pose de voix</li><li>Enregistrements</li><li>Revues liturgiques (Choristes, Voix Nouvelles, Signes Musiques, Chantons en Eglise, etc.)</li><li>Documents sur la liturgie, ses acteurs, ses rites, etc.</li></ul><p><br></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 35, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (35, 'Chorfonds und AVCC Home', '<h1><strong>Fonds choral et Foyer AVCC</strong></h1><p class="ql-align-justify">Le Foyer AVCC est un lieu de rencontre convivial où venir seul, avec sa commission de musique ou avec son comité pour consulter des partitions et des documents avant de bâtir un programme. Tous les documents sont à consulter sur place. Ils sont visibles dans le catalogue RERO, avec une multitude de renseignements utiles aux chefs de chœurs. Dès le début 2018, une partie de cette musique a été placée au libre accès de la Médiathèque-Valais pour être consultée librement. Cependant, il sera encore possible de prendre rendez-vous avec l’archiviste pour une recherche spécifique ou des conseils.</p><p>La Médiathèque Valais à Sion se trouve à la Rue de Lausanne 45.</p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2759.96401561557!2d7.355258599999989!3d46.23106029999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478edc3a1032361b%3A0xdf5a79b2d38baf0b!2sRue+de+Lausanne+45%2C+1950+Sion!5e0!3m2!1sfr!2sch!4v1424960408731" height="300" width="400"></iframe><p><br></p><p>Pour la recherche et la consultation des partitions, prendre préalablement contact avec :</p><p>Anne-Françoise Andenmatten Sierro</p><p>Tél. privé : 027 323 19 28 ou 079 232 54 02</p><p>E-mail&nbsp;:&nbsp;<a href="mailto:annef-vociamici@bluewin.ch" target="_blank" style="color: rgb(170, 49, 35);">annef-vociamici@bluewin.ch</a></p><p>Près de 20’000 partitions</p><ul><li>Profanes</li><li>Religieuses</li><li>De toutes époques et de tous genres</li><li>De différentes maisons d’édition</li><li>Pour tous types de choeurs: mixtes, dames, hommes, jeunes, enfants</li></ul><p>Des livres et des documentaires</p><ul><li>Théorie musicale</li><li>Musique chorale et compositeurs</li><li>Direction chorale</li><li>Pose de voix</li><li>Enregistrements</li><li>Revues liturgiques (Choristes, Voix Nouvelles, Signes Musiques, Chantons en Eglise, etc.)</li><li>Documents sur la liturgie, ses acteurs, ses rites, etc.</li></ul><p><br></p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 34, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (36, 'Prochaine formation AVCC', '<h1><strong>Prochaine formation AVCC</strong></h1><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/41659987_2126518937358621_2910742788683333632_n.jpg?resize=150%2C150" height="138" width="138"></span>Cette journée animée par Charles Barbier se veut interactive et propose de réfléchir aux aspects cachés de notre pratique de chefs de chœur, notamment la communication non verbale et les choix que nous faisons avant même d’être face au chœur. En choisissant comme fil rouge la prise de risque, nous aurons l’occasion de partager des regards neufs sur nos pratiques. Quels risques prend-on en élaborant un programme de concert ? Sans faire de mise en voix fait-on courir un risque aux chanteurs ? Y a-t-il un risque à ne pas prêter attention au choix de ses mots, en répétition ?</p><p>Cours gratuit pour les membres cotisants AVCC, 40.- CHF pour les non cotisants à l’AVCC / Repas : 25.- CHF / Encaissement sur place.</p><p>Inscriptions jusqu’au 10 novembre 2018 à associationavcc@gmail.com ou au 079 930 25 43. Merci d’indiquer si vous souhaitez partager le repas avec les autres participants.</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'fr', 37, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (37, 'Nächste AVCC-Schulung', '<h1><strong>Prochaine formation AVCC</strong></h1><p><span style="background-color: rgba(255, 255, 255, 0.8);"><img src="https://i1.wp.com/www.chanter.ch/wp/wp-content/uploads/2018/09/41659987_2126518937358621_2910742788683333632_n.jpg?resize=150%2C150" height="138" width="138"></span>Cette journée animée par Charles Barbier se veut interactive et propose de réfléchir aux aspects cachés de notre pratique de chefs de chœur, notamment la communication non verbale et les choix que nous faisons avant même d’être face au chœur. En choisissant comme fil rouge la prise de risque, nous aurons l’occasion de partager des regards neufs sur nos pratiques. Quels risques prend-on en élaborant un programme de concert ? Sans faire de mise en voix fait-on courir un risque aux chanteurs ? Y a-t-il un risque à ne pas prêter attention au choix de ses mots, en répétition ?</p><p>Cours gratuit pour les membres cotisants AVCC, 40.- CHF pour les non cotisants à l’AVCC / Repas : 25.- CHF / Encaissement sur place.</p><p>Inscriptions jusqu’au 10 novembre 2018 à associationavcc@gmail.com ou au 079 930 25 43. Merci d’indiquer si vous souhaitez partager le repas avec les autres participants.</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 36, 0, 1);
INSERT INTO `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)VALUES (38, 'Startseite', '<h3>Willkommen bei <a href="Chanter.ch" target="_blank">Chanter.ch</a></h3><p><br></p><p><p><p>Das Leben der Chorwelt in <strong>Valais</strong>!</p>', '2018-10-26 00:00:00', '2018-10-26 00:00:00', 'de', 1, 0, 1);

COMMIT;

-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Menu_has_Page`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Menu_has_Page` (`Menu_idMenu`, `Page_PageId`, `Order`) VALUES (1, 1, 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `chanter-dev`.`Config`
-- -----------------------------------------------------
START TRANSACTION;
USE `chanter-dev`;
INSERT INTO `chanter-dev`.`Config` (`idConfig`, `MainMenuId`, `HomePageId`) VALUES (1, 1, 1);

COMMIT;

-- -----------------------------------------------------
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
