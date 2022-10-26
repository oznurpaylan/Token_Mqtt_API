var mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

var userSchema=new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Lütfen bir email giriniz.'],
        unique: true, 
        lowercase:true, 
        validate: [isEmail, 'Lütfen geçerli bir email giriniz.'] 
    },
    password: {
        type: String, 
        require: [true,'Lütfen bir şifre girin.'], 
        minLength: [6,'Lütfen en az 6 karakterli bir şifre girin.']
    }
});
 
//yeni kullanıcı oluşturduktan sonra 
// userSchema.post('save',function(doc,next){
//     console.log('yeni kullanıcı kaydedildi',doc);
//     next();
// });

//doc dbye kaydedilmeden önce 
userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();     //hash algorithm bcrypt
    this.password=await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };


//model olusturma 
var User=mongoose.model('user', userSchema);
module.exports=User;