
const Accounts=require("../../app/models/accounts")
const crypto=require("crypto")
Accounts.findOne({username:"admin"}).then(account=>{
    if(!account){
        const hash=crypto.createHash("sha512")
        let pass='admin'
        pass=hash.update(pass).digest('hex')
        const acc_admin= new Accounts({
            email: 'admin@gmail.com',
            username: 'admin',
            password: pass,
            isAdmin: true
        })
        acc_admin.save()
    }
}).catch()