require('dotenv').config();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
  console.log("DB Connected")
});

const personSchema = new  mongoose.Schema({
  name:{
    required:true,
    type:String
  },
  age:{
    type:Number
  },
  favoriteFoods:{
    type:Array
  }
})

let Person = mongoose.model('Person',personSchema)

const createAndSavePerson = (done) => {
  const data = {
    name:"Aityan",
    age:21,
    favoriteFoods:["Porotta","beef"]
  }
  let person = new Person(data)
  person.save((err,data)=>{
    if(err) return console.log(err)
    console.log(data);
    done(null,data);
  })
};


var arrayOfPeople = [
  {name:"kiran",age:25,favoriteFoods:["shavarma","sharja"]},
  {name:"anu",age:25,favoriteFoods:["spigetty","burgur"]},
  {name:"amru",age:25,favoriteFoods:["puttu","kadala"]},
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err, data)=>{
    if (err) return console.log(err);
    done(null, data);
  });

};

const personName = "kiran"
const findPeopleByName = (personName, done) => {
  Person.find({"name":personName},(err,data)=>{
    if(err) return console.log(err)
    done(null,data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err) return console.log(err)
    done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,data)=>{
    if(err) return console.log(err)
    done(null,data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId},(err,data)=>{
    if(err) return console.log(err)
    data.favoriteFoods.push(foodToAdd)
    data.save((err,updatedData)=>{
      if(err) return console.log(err)
      done(null,updatedData)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
    if(err) return console.log(err)
    console.log(data)
    done(null,data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(err,data)=>{
    if(err) return console.log(err)
    done(null,data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err) return console.log(err)
    done(null,data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec((err,data)=>{
    if(err) return console.log(err)
    console.log(data);
    done(null,data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
