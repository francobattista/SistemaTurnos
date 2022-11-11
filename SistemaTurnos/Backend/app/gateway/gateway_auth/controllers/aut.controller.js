

export const verifyToken = (req,res,next) =>{
    const token = req.headers['x-acces-token']

    if(!token) return res.status(403).json({message : 'No token provided'})

    const decoded = jwt.verify(token, 'palabra clave')

    const user = 

    
}

