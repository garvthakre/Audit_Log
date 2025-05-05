
const roleMiddlware = (requiredRole)=>{
    return(req,res,next)=>{
        if(req.user.role !== requiredRole)
            return res.status(403).json({error:'ACCESS DENIED'});
        next();

    }
}
export default roleMiddlware;
