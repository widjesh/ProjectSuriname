const mongoose = require('mongoose');
const dbString = `mongodb+srv://suriname:test@cluster0-nnlim.mongodb.net/users?retryWrites=true&w=majority`;
mongoose.connect(dbString,(err)=>{
    if(!err){
        console.log('Database Connected Successfully');
    }else{
        console.log(`Connection failed due to ${err}`);
    }
});

module.exports = mongoose;