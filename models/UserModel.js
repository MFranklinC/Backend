// models/UserModel.js
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";


export const UserModel = {

    

    async isEmailTaken(email) {
        const [user] = await pool.query('SELECT email FROM usertbl WHERE email = ?', [email]);
        return user.length > 0;
    },

    async createUser(name, email, password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const [newUser] = await pool.query(
            "INSERT INTO usertbl (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );
        return newUser;
    },

    validateEmail(email) {
        return validator.isEmail(email);
    },


    validatePassword(password) {
        return validator.isStrongPassword(password);
    },


    validateInputs(name, email, password) {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            const error = new TypeError('Name, Email, and Password are required.');
            error.statusCode = 400;
            throw error;
        }

        
    }

};

    export const login = async (email, password) => {
            if(email.trim() === '' || password.trim() === ''){
                const error = new Error('Email and password is required.')
                error.statusCode = 400;
                throw error;
            }

            const [user] = await pool.query(
                "SELECT * FROM user WHERE email = ?", [email]);
            if(user.length === 0){
                const error = new error(
                    `An account with the email: ${email} does not exist.`)
                    error.statusCode = 400;
                    throw error;
            }

            if(!bcrypt.compareSync(password, user [0].password)){
                const error = new Error('Incorrect Password.')
                error.statusCode = 400;
                throw error;
            }

            const token = jwt.sign(
                {id: user[0].id},
                process.env.SECRET,
                {expiresIn: 'id'});

            return token;
    };

    export const getUser = async (id) =>{
        if(parseInt(id) === NaN){
            throw new Error('Invalid id');
        }

        const [user] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        return user;
    }


