module.exports = (sequelize, Sequelize) => {
    const UserCreedian = sequelize.define("UserCreedian", {
        user_id: {
            type: Sequelize.STRING
        },
        user_no: {
            type: Sequelize.STRING
        },
        creedian: {
            type: Sequelize.INTEGER
        },
        log_date: {
            type: Sequelize.DATE
        }
    });

    return UserCreedian;
};