const port = 3000; // Cambiar el puerto a 3000 u otro puerto disponible
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const emailjs = require('emailjs-com');
const { v4: uuid } = require('uuid');
const nodemailer = require('nodemailer');



app.use(express.json());
app.use(cors());


//DB CONEXION
mongoose.connect("mongodb+srv://jleiva21082004:Ca3Ca3@clusterecommerce.lck8npv.mongodb.net/e-commerce")

//API CREATION

app.get('/', (req, res) => {
    res.send("API E-COMMERCE");
})

// Image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }

})



const upload = multer({storage: storage})


//endpoint para imagenes

app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//ESQUEMA PARA PRODS

const Product = mongoose.model('Product', {
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    avilable:{
        type: Boolean,
        default: true
    }
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({})
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id=1;
    }
    const product = new Product({
        id:id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price

    })

    console.log(product);
    await product.save();
    console.log("Product saved");
    res.json({
        success: true,
        name: req.body.name
    })

})


//API PARA BORRAR PRODUCTOS
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log('eliminado')
    res.json({
        success: true,
        name: req.body.name
    })
})


//API PARA OBTENER TODOS LOS PRODUCTOS
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("Products: ");
    res.send(products);
})


//ESQUEMA PARA USUARIOS
const Users = mongoose.model('Users', { 
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    cartData:{
        type:Object,
    },
    date:{
        type: Date,
        default: Date.now
    }
})



//crear usuario
app.post('/signup' , async (req, res) => {
    let check = await Users.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false ,errors: "Email ya en uso"});
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save()

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data , 'secret_ecom');
    res.json({success: true, token})

})


//endpoint para login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email})
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token})
        }
        else {
            res.json({success: false, errors: "Contraseña incorrecta"})
        }
    }
    else{
        res.json({success: false, errors: "Usuario no encontrado"})
    }
})


//endpoint para "new collection"
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    res.send(newCollection);
})

//endpoint para "destacados"
app.get('/destacado', async (req, res) => {
    let products = await Product.find({});
    let destacado = products.slice(0,4);
    res.send(destacado);
})


//middleware to fetch user
const fetchUser = (req, res, next) => {
    const token = req.header('token');
    if(!token) {
        res.status(401).json({errors: "No token provided"})
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors: "Invalid token"})
        }
    }

}

//añadir productos en el carrito
app.post('/addtocart', fetchUser ,async (req, res) => {
    console.log("added" , req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Añadido");
})


//remove productos del cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed" , req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Eliminado");
})

//obtener los datos del cart
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("get cart")
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
    
})


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'jleiva21082004@gmail.com',
      pass: 'cioy tmde dcsz ytnr' 
    }
  });

  

const sendRecoveryEmail = async (email, resetLink) => {
    try {
        await transporter.sendMail({
            from: 'jleiva21082004@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Hola, ${email}. Para recuperar tu contraseña, haz clic en el siguiente enlace: ${resetLink}`,
        });

        console.log('Correo electrónico de recuperación enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico de recuperación:', error);
    }
};



// Ruta para recuperar contraseña
app.post('/recover-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).send({
                ok: false,
                message: 'No se encontró ningún usuario con ese correo electrónico',
            });
        }

        const token = uuid();

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        await user.save();

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        await sendRecoveryEmail(email, resetLink);

        return res.status(200).send({
            ok: true,
            message: 'Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña',
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            ok: false,
            message: 'Error en la petición',
            error: err,
        });
    }
});

// Ruta para restablecer la contraseña
app.get('/reset-password', async (req, res) => {
    const { token } = req.query;

    try {
        const user = await Users.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send('El enlace de restablecimiento de contraseña no es válido o ha caducado.');
        }

        // Aquí puedes mostrar un formulario para que el usuario ingrese una nueva contraseña

        res.send('Formulario para restablecer la contraseña');
    } catch (err) {
        console.error('Error al restablecer la contraseña:', err);
        res.status(500).send('Ha ocurrido un error al procesar la solicitud.');
    }
});


app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    Users.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ errors: "Usuario no encontrado" });
            }
            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: '1d' });
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                  user: 'jleiva21082004@gmail.com',
                  pass: 'cioy tmde dcsz ytnr' 
                }
            });
            var mailOptions = {
                from: 'jleiva21082004',
                to: email ,
                subject: 'Password Reset',
                text: `http://localhost:3000/reset-password/${user._id}/${token}`
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json({ message: "Email sent" });
                }
            });
        })
});


app.listen(port ,(error) => {
    if(!error){
        console.log("Server running on port: " + port);
    }
    else{
        console.log("Error: " + error);
    }
})