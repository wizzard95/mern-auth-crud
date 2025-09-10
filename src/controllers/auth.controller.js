import User from "../models/user.Models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";



export const register = async (req, res) =>{
/*  console.log(req.body); */
    const {email, password, username} = req.body
try{

    const userFound = await User.findOne({email})
    if (userFound) return res.status(400).json(["The email is already in use"]);
        
           
        
    

  const passwordHash =  await bcrypt.hash(password, 10) //

   const newUser =  new User({
        username,
        email,
        password: passwordHash,
    })

    const userSaved = await newUser.save();
    const token = await createAccessToken({id: userSaved._id});

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.json({
            /* message: "User created Succefully", */
           
        id: userSaved._id,
        username:userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updateAt: userSaved.updatedAt,
    }) 
}catch(error){
    /* console.log(error); */
    res.status(500).json({ message: error.message })
}

};


export const login = async (req, res) =>{
    console.log('🚀 Login endpoint llamado');
    console.log('📥 Body recibido:', req.body);
    console.log('🌐 Headers:', req.headers);
    const {email, password} = req.body
try{

  const userFound =   await User.findOne({email})
    
  if(!userFound) return res.status(400).json({ message: "user not found" })
  
  const isMatch =  await bcrypt.compare(password, userFound.password); //
  if(!isMatch) return res.status(400).json({ message: "Incorrect password damian" })


    const token = await createAccessToken({id: userFound._id});

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    const userData = {
        id: userFound._id,
        username:userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
    }
    console.log('✅ Enviando respuesta JSON:', userData);
    res.json(userData) 
}catch(error){
    /* console.log(error); */
    res.status(500).json({ message: error.message })
}
};


export const logout = async(req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async(req, res) => {
    /* console.log(req.user); */
    const userFound = await User.findById(req.user.id);
    if(!userFound) return res.status(400).json({message: "USER NOT FOUND"})
    
        return res.json( {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt,
        })
    
       /*  res.send('profile') */
}
export const verifyToken = async (req, res) => {
   const {token} = req.cookies

   if (!token) return res.status(401).json({message:"unauthorized"})

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message:"Unauthorized"})
        
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({message:"Unauthorized"})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}
