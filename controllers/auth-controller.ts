const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');
import { Request, Response } from "express";
import UserRepository from '../repositories/UserRepository';
import middlewareToken from '../middleware/middlewareToken'

let auth = async (req: Request, res: Response) => {
      try {
        const {correo, contrasena} = req.body;
        const result: any = await UserRepository.login(req.body)
        const token = middlewareToken.createToken(correo);
        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(contrasena, result[0][0].contrasena);
          if (isPasswordValid){
            return res.status(200).json({ 
              status: 'Successful authentication',
              AccesToken : token
            });
          }
        }
        return res.status(401).json({ 
          status: 'Incorrect username or password'
        });
      } catch (error) {
        return res.status(500).send({ errorInfo: "Ha ocurrido un error interno del servidor.", error });
      }
}


export default auth;

