import { User } from "../models/Users.model.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/JWT.js";
import { transporter } from "../utils/NodeMailer.js";

const registerUser = async (req, res) => {
  const { username, email, mobile, password, gender, qualification } = req.body;

  console.log(username, email, mobile, password, gender, qualification);

  //check userInput
  if (
    !username ||
    !email ||
    !mobile ||
    !password ||
    !gender ||
    !qualification
  ) {
    return res.status(400).json({ message: "all fields required" });
  }

  try {
    //check user pre existed
    const user = await User.findOne({ $or: [{ email }, { mobile }] });

    if (user) {
      return res
        .status(400)
        .json({ message: "user email or Mobile already registered" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user in DB

    const response = await User.create({
      username,
      email,
      mobile,
      password: hashedPassword,
      gender,
      qualification,
    });

    if (!response) {
      return res
        .status(500)
        .json({ message: "An Error Occured while register User" });
    }

    res.status(201).json({ message: "User registered Successfully", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error while registering",
      er: error?.errorResponse?.errmsg,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check user data
  if (!email || !password) {
    return res.status(400).json({ message: "all fields required" });
  }
  try {
    //find email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid user email" });
    }

    //chk password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "wrong password entered" });
    }

    //generate token
    const payload = {
      id: user._id,
      username: user.username,
      pass: user.password,
    };
    const Token = await genToken(payload);
    // console.log(Token);

    res.status(200).json({ message: "Login Successfully", Token });
  } catch (error) {
    console.log("Internal server error while login", error);
    res.status(500).json({ message: "Internal server error while Loging" });
  }
};

const allusers = async (req, res) => {
  try {
    const response = await User.find({}).select("-password -_id");
    if (!response) {
      return res
        .status(500)
        .json({ message: "Database Error while fetch Users api" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log("Internal server error while fetching all users", error);
    res
      .status(500)
      .json({ message: "Internal server error fetchin All user Api" });
  }
};

const singleUser = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await User.findOne({ _id: id });

    if (!response) {
      return res.status(401).json({ message: "No User found ..!" });
    }

    res.status(200).json({ message: "User Record found", response });
  } catch (error) {
    console.log("Internal server error while fetching  user", error);
    res
      .status(500)
      .json({ message: "Internal server error fetchin  user Api" });
  }
};

const sentOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checKEmail = await User.findOne({ email });

    if (!checKEmail) {
      return res.status(400).json({ message: "Email not found" });
    }

    const OTP = Math.round(Math.random() * 1000 + 1000, 4);

    // const email = "ajaysood295@gmail.com";
    // console.log(email);

    const text=`Dear ${email},
    Thank you for choosing us!

    To complete your verification, please use the following One-Time Password (OTP):

    Your OTP: ${OTP}

    This code is valid for the next [X minutes] and can only be used once. Please do not share this OTP with anyone to ensure your account's security.

    If you did not request this OTP, please ignore this email.

    Thank you for your cooperation!

    Best regards,
    Mobiles Castle

`
const emailText=` <div class="container">
        <h1>Dear ${email},</h1>
        <p>Thank you for choosing us!</p>
        <p>To complete your verification, please use the following One-Time Password (OTP):</p>
        <p class="otp"><b>Your OTP: ${OTP}<b></p>
        <p>This code is valid for the next [X minutes] and can only be used once. Please do not share this OTP with anyone to ensure your account's security.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Thank you for your cooperation!</p>
        <footer>
            Best regards,<br>
            Mobiles Castle
        </footer>
    </div>`

    const info = await transporter.sendMail({
      from: '"Ajay Sood" <cathryn5@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "OTP - Reset User Password ✔", // Subject line
      text: text, // plain text body
      html: emailText, // html body
    });

    res.status(200).json({ message: "OTP sent ", OTP });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("node mail error", error);
    res.status(500).json({ message: "OTP genration faild " });
  }
};


const changePassword = async(req,res)=>{

  const {email,currentPassword ,newPassword} = req.body;  

    //validate Data
    if(!email ||!currentPassword || !newPassword){
      return res.status(400).json({ message: "All fields required", });
    }

    //validate email with db
    try {
      const user=await User.findOne({email})
      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }
  
      //match password
      const isPasswordMatched= await bcrypt.compare(currentPassword,user.password);
      if (!isPasswordMatched) {
        return res.status(400).json({ message: "Entered wrong current password ..!" });
      }
  
      const hashedPasswpord=await bcrypt.hash(newPassword,10)
      const response=await User.findOneAndUpdate({email},{password:hashedPasswpord})
  
      // console.log(response);
      if(!response)
      {
          return res.status(400).json({ message: "An error occured while setting password  ..!" }); 
      }

      res.status(200).json({message:'password changed successfully ...!'})
      
  
    } catch (error) {
      console.log("change password error", error);
      res.status(500).json({ message: "Server error while changing password" });
    }

}

  const updateUser=async(req,res)=>{
      const id=req.params.id;
      const {username,mobile,gender}=req.body;
      console.log( id);

        if(!username|| !mobile|| !gender)
        {
          return res.status(400).json({ message: "Incomplete Data", });
        }

      try {
            const response=await User.findByIdAndUpdate({_id:id},{
              username,
              mobile,
              gender
            })
            console.log('sssdsd',response);

            if(!response)
              {
                  return res.status(400).json({ message: "Wrong current password entered ..!" });
              }
            
              res.status(200).json({message:'User Profile Updated successfully ...!'})

      } catch (error) {
        console.log("update user error", error);
        res.status(500).json({ message: "Server error while updating user profile" });
      }
      

  }


export { registerUser, loginUser, allusers, singleUser, sentOTP ,changePassword,updateUser };
