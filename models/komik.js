module.exports = (sequelize, DataTypes) => {
  const komik = sequelize.define(
    "komik",
    {
      id: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoincrement: true,
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penulis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "komik",
      freezeTableName: true,
      timestamps: true,
    }
  );
  return komik;
};
