const jose = require('jose')
let dotenv = require('dotenv')
dotenv.config()
let base64PrivateKey = process.env.PRIVATE_KEY_B64
let base64PublicKey = process.env.PUBLIC_KEY_B64
const issuer = 'https://perricone-student.com'
const audience = 'https://perricone-student.com'
const AuthDao = require('../daos/auth')
const Token = require('../models/token')
 class TokenService {
   async isUserLoggedInMiddleware(req, res, next){
         const tokenIn = req.headers.authorization
         if(!tokenIn){
            if(!res.headersSent){
              if( req.originalUrl === '/auth/logout'){
                res.status(404)
                res.json({error: 'No token provided'})
                res.send()
                return
              }
                console.log('No token provided')
              res.status(401)
              res.json({error: 'No token provided'})
              return
            }
              
         }
         try{
              const tokenPayload = await this.isUserLoggedIn(tokenIn)
              req.tokenPayload = tokenPayload
              const isLoggedIn = await Token.findOne({ email:tokenPayload.email})
              if(!isLoggedIn){
                throw new Error('Not Logged In')
              }
              next()
              return
         } catch(e){
            if(!res.headersSent){
              res.status(401)
              res.json({error: e.message})
              res.send()
              return
            }
         }
    
   }
   async roleCheckInsides(allowedRolesOnThisRoute, returnOnReq=false, req, res,next) {
    const rolesOnRoute = new Set(allowedRolesOnThisRoute);
    for (let tokenRole of req.tokenPayload.roles){
      if(rolesOnRoute.has(tokenRole)){
        if(returnOnReq){
          req.roleCheckPassed = true
        }
        console.log('role check passed', tokenRole)
        next();
        return;
      }
    }
    if(returnOnReq){
      req.roleCheckPassed = false
      next()
      return
    }
    if(!res.headersSent){
        res.status(403)
        res.json({error: 'Forbidden'})
       
    }
   }
   /**
    * checks if the user has the role required to access the route
    * @param {*} allowedRolesOnThisRoute array of roles that are allowed to access this route
    * @param {*} returnOnReq  returns on request object instead of sending response
    * @returns 
    */
  async roleCheck(allowedRolesOnThisRoute, returnOnReq=false,req,res,next) {
    console.log('role check hit')
      return this.roleCheckInsides(allowedRolesOnThisRoute, returnOnReq, req, res, next)
  
  };
  async isUserLoggedIn(tokenIn){
       if(tokenIn.includes('Bearer')){
              tokenIn = tokenIn.split(' ')[1]
       }
    //throws error. 
        const alg = 'RS256'
        const spki = Buffer.from(base64PublicKey, 'base64').toString('utf-8');
        const publicKey = await jose.importSPKI(spki, alg)
        const { payload } = await jose.jwtVerify(tokenIn, publicKey, {
          issuer: issuer,
          audience: audience,
        })
        
        return payload
    }
    async createToken(userObj){
        const alg = 'RS256'
        
        const pkcs8 =  Buffer.from(base64PrivateKey, 'base64').toString('utf-8')
        const privateKey = await jose.importPKCS8(pkcs8, alg)
       
       
        const token = await new jose.SignJWT({email:userObj.email, _id:userObj._id, roles: userObj.roles})
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer(issuer)
            .setAudience(audience)
            
            .setExpirationTime('1000m')
            .sign(privateKey)
            return token
    }
}
module.exports= TokenService