function choir(rows) {
    this.ChoirId = rows.ChoirId;
    this.Name = rows.Name;
    this.FundationYear = rows.DateFoundation;
    this.Church = rows.Church;
    this.Gospel = rows.Gospel;
    this.Language = rows.Language;
    this.Remarks = rows.Comments;
    this.WebPage = rows.Homepage;
    this.EffectifId = rows.EffectifId;
    this.Mailing = rows.Mailing;
    this.LocationId = rows.LocationId;
    this.NamePresident = rows.NamePresident;
    this.NameDirector = rows.NameDirector;
    this.NameSecretary = rows.NameSecretary;
    this.NameCashier = rows.NameCashier;
}

module.exports = choir;