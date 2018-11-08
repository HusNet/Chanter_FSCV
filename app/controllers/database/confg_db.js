exports.getConfig = function(){
    return "SELECT * FROM Config LIMIT 1;";
};

exports.getMainMenuId = function(){
    return "SELECT `MainMenuId` FROM Config LIMIT 1;";
};

exports.getMainPageId = function(){
    return "SELECT `HomePageId` FROM Config LIMIT 1;";
};

exports.updateMainMenu = function(id){
    return "UPDATE `Config` SET `MainMenuId` = " + id + " WHERE `idConfig` = 1;";
};

exports.updateHomePage = function(id){
    return "UPDATE `Config` SET `HomePageId` = " + id + " WHERE `idConfig` = 1;";
};