const Signin = (req,res,bcrypt,database) => {
    database.select('email','password').from('users')
    .where('email','=',req.body.email)
    .then(data => {
        const  isvalid = bcrypt.compareSync(req.body.password,data[0].password);
        if(isvalid)
        {   
            return database.select('*').from('users')
                .where('email','=',req.body.email)
                .then(user => {
                    console.log(user);
                    res.status(200).json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
        }
        else
        {
            res.status(400).json('wrong credential')
        }

    })
    .catch(err => {
        res.status(400).json('wrong credentials')
    })
}
module.exports = {
    Signin :Signin
}