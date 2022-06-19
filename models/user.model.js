import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: String,
    },
    profilePic: {
      type: String,
      required: true,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const hash = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, hash);
  }
});

userSchema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password).catch(() => {
    return false;
  });
};

const userModel = mongoose.model("users", userSchema);
export default userModel;
