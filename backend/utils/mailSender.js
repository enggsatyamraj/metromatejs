const nodemailer = require('nodemailer');

const mailSender = async(email,title,body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_SENDER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from:'Metromate -by Satyam Raj',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        //console.log(info);
        return info;
    }catch(err){
        //console.log(err.message);
    }
}