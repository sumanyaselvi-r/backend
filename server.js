

require('dotenv').config();
const cors = require('cors');
const nodemailer=require('nodemailer')

const express =require('express')
const bodyParser=require('body-parser')

const app=express();

app.use(cors());
const corsOptions = {
  origin: '*',
  methods: 'POST',
  credentials: true, // Include cookies in the CORS request
};

app.use(cors(corsOptions));

const PORT =process.env.PORT ||3001
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.post('/send-email',(req,res)=>{
   
    
    
    try{
        const data= req.body;
        console.log(data)
        const transporter=nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
        const options={
            from: 'Company',
            to: process.env.SEND_TO,
            subject:'Enqueries from website',
            html:`<html>
            <head>
             
              <style>
              body {
                font-family: PT Serif;
                background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);
                background-blend-mode: normal, lighten, soft-light;
                padding: 0;
              }
      
              .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
              background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
                box-shadow: 0 0 35px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              }
      
              h1 {
                  text-align: center;
                color: #333333;
              }
      
              p {
                padding-left: 80px;
                margin-bottom: 10px;
              }
      
              strong {
                font-weight: bold;
              }
              </style>
            </head>
            <body>
            <div class=container>
              <h1>Enqueries from Website</h1>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phoneno:</strong> ${data.phone}</p>
              <p><strong>Message:</strong> ${data.message}</p>
            </div>
            </body>
          </html>`
        }

        transporter.sendMail(options,(err,info)=>{
            if(err)
            {
                console.log(err)
                return
            }
            else{
                console.log(`Email sent:${info.res}`)
            }
        
         })

        res.json({msg:'your message sent successfully'})

    }catch(error){
        res.status(404).json({msg:"error"})

    }
 

  
    });
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
})
