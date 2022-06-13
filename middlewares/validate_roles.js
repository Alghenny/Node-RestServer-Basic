const { response } = require("express")


const isAdmin = ( req, res = response, next ) => {

    if( !req.user ){
        return res.status(500).json({
            msg: 'Trying to verify the role, without veryfying the token'
        });
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${name} is not an Admin`
        });
    }
    
    next();

}

const haveRole = ( ...roles ) => {    
    return ( req, res = response, next ) => {

        if( !req.user ){
            return res.status(500).json({
                msg: 'Trying to verify the role, without veryfying the token'
            });
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `The user must have one of these Roles: ${roles}`
            });
        }

        next()
    }

}

module.exports = {
    isAdmin,
    haveRole
}