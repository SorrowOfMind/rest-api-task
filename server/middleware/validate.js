module.exports = (req, res, next) => {
    const {email, password} = req.body;

    function validateEmail(userEmail){
        const rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return rgx.test(userEmail);
    }

    if(![email, password].every(Boolean)){
        return res.status(401).json({
            status: "failed",
            message: "Missing credentials"
        });
    } else if (!validateEmail(email)){
        return res.status(401).json({
            status: "failed",
            message: "Invalid email"
        });
    }

    next();
}