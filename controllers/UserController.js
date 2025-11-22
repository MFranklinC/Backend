import { UserModel } from "../models/UserModel.js";

export const createUserController = async (req, res, ) => {
    const { name, email, password } = req.body;

    try {
        UserModel.validateInputs(name, email, password);

        if (!UserModel.validateEmail(email)) {
            const error = new TypeError('Invalid email address.');
            error.statusCode = 400;
            throw error;
        }

        if (!UserModel.validatePassword(password)) {
            const error = new TypeError('Password is not strong enough.');
            error.statusCode = 400;
            throw error;
        }

        const isTaken = await UserModel.isEmailTaken(email);
        if (isTaken) {
            const error = new Error(`The email ${email} is already in use.`);
            error.statusCode = 400;
            throw error;
        }

        const newUser = await UserModel.createUser(name, email, password);

        return res.status(201).json({
            message: 'User created successfully!',
            user: {
                id: newUser.insertId,
                name,
                email
            }
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const token = await UserModel.login(email, password);
        res.status(200).json({
            success: true,
            message: [{result: "Login successfull", token},

            ]
        });
    }catch(e){
        next(e);
    }
}
