function group(rows) {
    this.Name = rows.NameGroup;
    this.SubGroups = rows.Groups;
    this.USC = rows.USC;
    this.FSCV = rows.FSCV;
    this.DateGroupe = rows.DateGroups;
    this.DateUSC = rows.DateUSC;
    this.DateFSCV = rows.DateFSCV;


}

module.exports = group;