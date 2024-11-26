const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Publisher = sequelize.define("publisher", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Book = sequelize.define("book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    imagePath: {
        type: DataTypes.STRING,  
        allowNull: true,       
    },
});

const Reader = sequelize.define("reader", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Модель Issue (выдача книги)
const Issue = sequelize.define("issue", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    signature: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Модель Token (для хранения токенов)
const Token = sequelize.define("token", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});


// Publisher и Book (один ко многим)
Publisher.hasMany(Book);  
Book.belongsTo(Publisher); 

// Reader и Issue (один ко многим)
Reader.hasMany(Issue);  
Issue.belongsTo(Reader);  

// Book и Issue (один ко многим)
Book.hasMany(Issue); 
Issue.belongsTo(Book); 

// Reader и Token (один ко многим)
Reader.hasMany(Token); 
Token.belongsTo(Reader); 

module.exports = { Publisher, Book, Reader, Issue, Token };
