const jose = require('jose')
// please note, I couldn't figure out how to save this in an environment variable and have the tests pass on github. 
// which is why it is hardcoded here.
// if you have any suggestions on how to get this into github, please let me know. 
let base64PrivateKey = 'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRFdRV3I4ZDRJdmVJaXQKb29wVlN1eDFYN1Z5eHBRUWdMSFIxN2prYXlWOWJRWktQZUtRUk9uYzg2endkVE9xVGcwaWc2SW9RTGFia1ZPdwpiSHVseERpL2dWcUQzVEVWTVUrSnFiUU1Eanord3gyVWRpRE8xK0J1K0thM2VGT0dMZWg3b3pCOTJuSHFtaHM5CkllcFN4T1Q1UDBTQjdQMnMxa3pyTlk3VTZZVjNUWjVWUStnSUsxd2l5czhqRVY0TDZaTC9qclNsaVFMbGkzNUIKTVZVQ3J6a2xuRE1xSUErLzM2MXRkVlpHK0k2QU9Xd2thVnNOUkx3Y3lDa3ZQS2NtV2Z2S0RqQkdiSDQ1MjNTUQpoUmlwWGFIYi9DamhBaGxLVVc3QlhzeHpaSjMxdFJ2UXlRN0ZJWmw0c1UrOVVCN3JtTVIzbkZGM0JSc3NBeE5ZCnlBYk9tTWNaQWdNQkFBRUNnZ0VBSEtKbUVNTk5GaGlURmJlaktzYUdaeUpwTHVOOHZ0N2dSUVlDYXg2cHhrTkgKbzZ6MUptaGJaQUQ2RkRIcHU0Rk9icFl1bWhnWi81MFMxUUdPbmVjbFdXekpndFdSUFg2WFhYUGRnUDMzSjJvKwp2Z3h5a29wVjc2YlNLek9NNENJckQ3a04za2dQVVBZVEhWNjJ3U1NZNEhuVTUxTmJ6TmxnTXRBMzNGc3dUL01FClVIMGNzV0pUWlpEeTRrZGdobkYrNDdvWWFELzlEN1VPSkh2TkpIV0dZRS82aGNjbzJES2dPQko3czNGZXByQkYKVjBRMTVGcm1rREJLSWZ6M1IwbTBKZlY4b2E3L1ZlZlppbmhNMHpZRHpFemRScE1OVTdMdkp6LzZmVHAya08wMwpvdVg5Q2NVdFhjUFFXVHRRNmEzZWZOTytJLzUzM1EweUQ3eTVvdUJzYlFLQmdRRHZSeldyenlucnFQVUx6TGNmCnM5ZGtsTWFpczlkRGZrVHdLV01EdXFRVXNLSHEvRTNqb0RXNEE0REJFNG1RSUhIN2U0UUxEMUU1MUZyNkVIaG4Kd0luODlJNTNEaWNSRDBIb21EWXpEcEJxU08yM2N4eHdsNlBUbXRJaTdFQzNIUVYyZUt4azhXZWgwQnRjcVp4dgp1MWFhV3ZsWEhCNE1seGV2cnZMRGczR3BoUUtCZ1FEbE9vcnFqWDBGZWNZVmJvOXFNczRJdE9Pc0JDdGUyNThJClIzYTBBWFhsRnBrQWJKeWhhMk1SbXhFbkJXbUN1eVhXakJOVm9ZMmZiMllmbVc3cWtFWWJlUHMzVTNNTEdFL3oKMG03M1Jjd0MzQ2h5UjFmYzFVNDdmVkxERk9lQ0hackVtM3hvbU85OHJ3d1NJVnFVTEx4TmxyeWdXdnl3bFl2Ugphb3ZXdDFoeGhRS0JnUURsdFhNdEVhQ3BBSGJmY1JTTWR0WmRWUWFzeEFId1paUkJDenBuSmhMSFdoclh3SWYxCjhxUWZtQjFQUGpaZUN3Zmg2ZDRGMEJxbWJkczVIZjY1ZS9uOHdiclRTTjd3WGJsa1Zsd1IvL1ZjVTg4Q3dwdVcKNjd6M05EWndHR2E0WkVBT1VDTVFkVUNMODRHUkg3TnpBR0pQcE82aVZmZnpGa3BDK3ExTVRUQWRFUUtCZ0dkUwpiL014T3owUW1ueG1qVFl0R0RsTWI2TEZibGNmWHh0NE9zVUFNNGZERzh2WktQQ0pXdXBBbndhYnBlZExPODdzCjdIb1lpNkZsc1A1bFJsMXNFbTJucG5SVnBQRkhVQ0p5bzVuSldCK2g1SWsrSnhoZS9SaExjTmFGd2FRZ2UvWksKcjFUbU9teFU2bmZ4bU1aWk03YzFUbWhwR3FUdGcwd3RYa0sxK2FPUkFvR0FFalkyd0pPSkNaMlFJOW1KRm1wWQpLaWhuY0tnMlVyZ0R4bFRJUldVN2pnbHZTdEIyMGdNem12SEZIdWg2Y1hNOVRYcmZnSU5rSEgva1FMTW9NeHpPCmJodjlXL3YxVG51V0g2aGJ3V3FmdHc5a1FNUS9lMDFxdWNZb1JzcldVUHNjNU9TM3p4dnU4Uk9UcjdNS21TUEEKa3kzcWJZMVZCQk5DWFFQMWtzNDZJQjA9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K'
let base64PublicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUExa0ZxL0hlQ0wzaUlyYUtLVlVycwpkVisxY3NhVUVJQ3gwZGU0NUdzbGZXMEdTajNpa0VUcDNQT3M4SFV6cWs0TklvT2lLRUMybTVGVHNHeDdwY1E0CnY0RmFnOTB4RlRGUGlhbTBEQTQ4L3NNZGxIWWd6dGZnYnZpbXQzaFRoaTNvZTZNd2ZkcHg2cG9iUFNIcVVzVGsKK1Q5RWdlejlyTlpNNnpXTzFPbUZkMDJlVlVQb0NDdGNJc3JQSXhGZUMrbVMvNDYwcFlrQzVZdCtRVEZWQXE4NQpKWnd6S2lBUHY5K3RiWFZXUnZpT2dEbHNKR2xiRFVTOEhNZ3BMenluSmxuN3lnNHdSbXgrT2R0MGtJVVlxVjJoCjIvd280UUlaU2xGdXdWN01jMlNkOWJVYjBNa094U0daZUxGUHZWQWU2NWpFZDV4UmR3VWJMQU1UV01nR3pwakgKR1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=='
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