
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const port = 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fieldmate-da2ff-default-rtdb.firebaseio.com/'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the fieldmate0 directory
app.use('/fieldmate0', express.static(path.join(__dirname, 'fieldmate0')));

// Sign up route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: name,
        });

        res.send('Account created successfully!');
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).send('Error creating account');
    }
});

// Sign in route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verify the email and password
        const userRecord = await admin.auth().getUserByEmail(email);

        // Since Firebase Admin SDK does not support password verification directly, use Firebase Authentication on client side
        res.redirect('/fieldmate0/index.html'); // Redirect after successful sign-in
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).send('Error signing in');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});








// ///////////////////////////////////////added security using bcrypt (salting)
// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');
// const bcrypt = require('bcrypt');

// const app = express();
// const port = 3000;

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'secrets',
//     password: 'shiv868',
//     port: 5432,
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// const hashPassword = async (password) => {
//     const saltRounds = 10;
//     return bcrypt.hash(password, saltRounds);
// };

// app.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const hashedPassword = await hashPassword(password);

//         const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
//         console.log(result.rows);
//         res.send('Account created successfully!');
//     } catch (error) {
//         console.error('Error in query execution:', error);
//         res.status(500).send('Error creating account');
//     }
// });

// app.post('/signin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (result.rows.length > 0) {
//             const hashedPassword = result.rows[0].password;

//             const passwordMatch = await bcrypt.compare(password, hashedPassword);

//             if (passwordMatch) {
//                 res.redirect('/fieldmate0/index.html');
//             } else {
//                 res.send('Invalid email or password');
//             }
//         } else {
//             res.send('Invalid email or password');
//         }
//     } catch (error) {
//         console.error('Error in query execution:', error);
//         res.status(500).send('Error in query execution');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });






/////////////////////////////////////////////////without security///////////////////////////////////////////////////////////////////////////////////////////

// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');

// const app = express();
// const port = 3000;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'secrets',
//   password: 'shiv868',
//   port: 5432,
// });





// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));


// /////////////////////////////////////////////
// app.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
//         console.log(result.rows);
//         res.send('Account created successfully!');
//     } catch (error) {
//         console.error('Error in query execution:', error);
//         res.status(500).send('Error creating account');
//     }
// });

// /////////////////////////////////////////////

// app.post('/signin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

//       if (result.rows.length > 0) {

//           res.redirect('/fieldmate0/index.html'); 
//       } else {
//           res.send('Invalid email or password');
//       }
//   } catch (error) {
//       console.error('Error in query execution:', error);
//       res.status(500).send('Error in query execution');
//   }
// });


// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
