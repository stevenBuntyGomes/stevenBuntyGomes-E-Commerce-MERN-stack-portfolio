const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtTokens');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');


// register a user
exports.registerUser = catchAsyncErrors(
    async (req, res, next) => {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        const {name, email, password} = req.body;
        const user = await User.create({
            name, email, password,
            avatar:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        });

        const token = user.getJWTToken();

        res.status(201).json({
            success: true,
            token,
            user,
        });
    }
);

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    // check if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("email or pssword not given", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("invalid email or password", 401));
    }

    const isPasswordMatch = user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("pssword doesnt match", 401));
    }


    sendToken(user, 200, res);
    // const token = user.getJWTToken();

    //     res.status(200).json({
    //         success: true,
    //         token,
    //     });
});

// logout user
exports.logout = catchAsyncErrors(
    async (req, res, next) => {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "logged out successfully",
        });
        // next();
    }
);


// forgot password
exports.forgotPassword = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findOne({
            email: req.body.email
        });

        if(!user) {
            return next(new ErrorHandler("user not found", 404));
        }

        // get reset password token
        // user.getResetPasswordToken();
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        // const resetPasswordUrl = `${req.protocol}://${req.get(
        //     "host")}/password/reset/${resetToken}`;
        // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
        const resetPasswordUrl = `${req.protocol}://${req.get(
            "host"
        )}/password/reset/${resetToken}`;
        const message = `your pssword reset token is :- \n\n ${resetPasswordUrl} \n\n if you haven't requested this email, then please ignore it`;

        try{
            await sendEmail({
                email: user.email,
                subject: `Ecommerce password recovery`,
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email} successfully`
            });
        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(error.message, 500));
        }
    }
);


exports.resetPassword = catchAsyncErrors(
    async (req, res, next) => {

        // creating token hash
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        });

        if(!user){
            return next(new ErrorHandler("reset password token is invalid or has been expired", 404));
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("password does not mtch", 404));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendToken(user, 200, res);
    }
);


// user routes functions starts
exports.getUserDetails = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        });
    }
);

// update user password
exports.updatePassword = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.user.id).select("+password");
        const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatch){
            return next(new ErrorHandler("old pssword is incorrect", 400));
        }

        if(req.body.newPassword !== req.body.confirmPassword){
            return next(new ErrorHandler("new and confirm password does not match.", 401));
        }

        user.password = req.body.newPassword;
        await user.save();

        sendToken(user, 200, res);
    }
);

// update user profile admin
exports.updateProfile = catchAsyncErrors(
    async (req, res, next) => {
        
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        };
        if(req.body.avatar !== ""){
            const user = await User.findById(req.user.id); 
            const imageId = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(imageId);
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }

        // we will add cloudinary letter
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        
        const updatedUser = await User.findById(req.user.id); 


        res.status(200).json({
            success: true,
        });
        // sendToken(user, 200, res);
    }
);

exports.getAllUsers = catchAsyncErrors(
    async (req, res, next) => {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        });
    }
);

// get user details for admin
exports.getSingleUser = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`user does not exist with id:- ${req.params.id}`, 400));
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
);


// update user role admin
exports.updateUserRole = catchAsyncErrors(
    async (req, res, next) => {

        
        
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };

        // we will add cloudinary letter
        await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });


        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });
        // sendToken(user, 200, res);
    }
);


// delete user admin

exports.deleteUser = catchAsyncErrors(
    async (req, res, next) => {
        

        // we will remove cloudinary letter
        

        const user = await User.findById(req.params.id);



        if(!user){
            return next(new ErrorHandler(`error does not exist with id:- ${req.params.id}`, 400));
        }

        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        await user.remove();

        res.status(200).json({
            success: true,
            message: "user deleted successfully."
        });
        // sendToken(user, 200, res);
    }
);





// user routes functions ends


