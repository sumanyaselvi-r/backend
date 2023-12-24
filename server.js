

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
            service:'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
        const options={
            from: 'Company',
            to: process.env.SEND_TO,
            subject:'message from client',
            html:`<html>
            <head>
              <style>
                body {
                  font-family: PT serif;
                  background-color: #f4f4f4;
                  color: #333;
                }
                h1 {
                  color: #007bff;
                }
                p {
                  margin-bottom: 10px;
                }
              </style>
            </head>
            <body>
              <h1>Contact Form Submission</h1>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phoneno:</strong> ${data.phone}</p>
              <p><strong>Message:</strong> ${data.message}</p>
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
