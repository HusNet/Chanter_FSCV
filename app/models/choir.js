function choir(rows) {
    this.ChoirId = rows.ChoirId;
    this.Name = rows.Name;
    this.FundationYear = rows.DateFoundation;
    this.TypeChoir = rows.Type;
    this.Church = rows.Church;
    this.Gospel = rows.Gospel;
    this.Language = rows.Language;
    this.Remarks = rows.Comment;
    this.WebPage = rows.Homepages;
    this.EffectifId = rows.EffectifId;
    this.Mailing = rows.Mailing;
    this.LocationId = rows.LocationId;
    this.GroupsId = rows.GroupsId;
    this.NamePresident = rows.NamePresident;
    this.NameDirector = rows.NameDirector;
    this.NameSecretary = rows.NameSecretary;
    this.NameCashier = rows.NameCashier;
}

module.exports = choir;