const Admin = require('models/Admin');
const passport = require('passport');

exports.checkName = async (ctx, res) => {
    const {
        name
    } = ctx.params;

    if (!name) {
        ctx.status = 400;
        return;
    }

    try {
        const account = await Admin.findByUserName(name);
        res.send({
            exists: !!account
        });
        return;
    } catch (e) {
        console.log(e);
        res.status(500, e).json(e);
    }
};

exports.register = async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    try{
        const exists = await Admin.findByUserName(username);
        if(exists){
            res.status(409).json({conflict:'username', username});
            return;
        }

        let admin = new Admin({username});
 
        admin = await Admin.register(
            admin,
            password
        );
        
        res.status(201).json({
            username,
            _id: admin._id
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e});
    }
}

exports.login = async (req, res) => {
    try{
        req.session.save((err)=>{
            if(err) throw(err);
            res.status(200).send('OK');
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e});
    }
}

exports.logout = async (req, res, next) => {
    req.logout();
    return res.redirect('/');
}

exports.myInfo = async (req, res) => {
    try {
        const { user } = req;
        res.status(200).json({user});
    } catch(e){
        console.log(e);
        res.status(500).json({error: e});
    }
}