
exports.addNews = function(title, content, author, publish_date, lang, idPageLang, isNews) {
    return  "INSERT INTO Page (`Title`, `Content`, `Author`, `Publish_date`, `Lang`, `IdPageLang`, `IsNews`) " +
            "VALUES ('" + title + "', '" + content + "', '" + author + "', '" + publish_date + "', '" + lang + "', '" + idPageLang + "', '" + isNews + "')";
};