import {mongoose} from 'mongoose';

//Connecting to the Cluster
mongoose.connect('mongodb+srv://prashasst-admin:WqZzOUWWYzRM6w5j@cluster-p.08kekm3.mongodb.net/file_fusion_app');


//Defing user table schema
const UsersSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
//Creating user table

export const Users = mongoose.model('users',UsersSchema);

// testing a user
const user1= new Users({
    name:"Prashasst",
    email:"pra@gmail.com",
    password:"1234"
})
const user2= new Users({
    name:"HARKI",
    email:"HARK@gmail.com",
    password:"1234"
})

// user1.save()
//     .then(
//         (user)=>{
//             console.log(user.name,"is registered");
//         }
//     )
//     .catch(
//         (err)=>{
//             console.log("user adding failed \n",err);
//         }
//     );



