const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({ //create user schema
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pic: {
        type: String,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" //default profile picture
    },
}, { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) { //create a method to compare password
    return await bcrypt.compare(enteredPassword, this.password
    ); //check if password matches
};

userSchema.pre('save', async function (next) { //before saving user to database, run this function
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); // Before sends user to database, hash/encrypt the password



const User = mongoose.model("User", userSchema);

module.exports = User;
