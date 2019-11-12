const { Sequelize, Model, DataTypes } = require('sequelize');
let sequelize = new Sequelize('postgres://pathwayhelper:pathwayhelper123@localhost:5432/pathwayhelperdb',{logging: false});

var passwordHash = require('password-hash');


export class User extends Model {
    static newUser(username, passwordPlaintext, cb) {//returns user if successful, otherwise returns undefined

        this.findOrCreate({where:{username:username}, defaults:{password:passwordHash.generate(passwordPlaintext),transcriptData:{}}})
        .then(([user, created]) => {
            if (created) {
                console.log("Created a new User");
                cb(user);
            }
            else{//username already existed
                cb(undefined);
            }

        })

    }

    //pre: usernames are unique
    static login(username, passwordPlaintext, cb) {//returns user if successful, otherwise returns undefined
        this.findOne({where:{username:username} })
        .then(user => {
            if (user) {

                if(user.validatePassword(passwordPlaintext)){//check password
                    cb(user);
                }
                else{
                    cb(undefined)
                }

            }
            else{//no user found of that name
                cb(undefined);
            }

        })

    }

    validatePassword(providedPassword) {
        return passwordHash.verify(providedPassword, this.password)
    }

}
User.init({
    username: {type: Sequelize.STRING, unique: true},
    password: Sequelize.STRING,
    transcriptData:Sequelize.JSONB//will break non postgres builds (this makes it fast to parse after read)
},{sequelize,modelName:'pathwayuser',timestamps: true});

exports.sequelize = sequelize;



