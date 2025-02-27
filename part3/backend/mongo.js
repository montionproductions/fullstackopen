const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const dbname = "phonebook"
const nameText = process.argv[3]
const numberText = process.argv[4]

const url =
  `mongodb+srv://jmontion:${password}@fullstack.bhdsg.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Fullstack`

mongoose.set('strictQuery',false)
mongoose.set('debug', true);

mongoose.connect(url)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phonebookSchema)

const generateNumericId = () => {
    const timestamp = Date.now(); // Obtiene la marca de tiempo actual en milisegundos
    const randomPart = Math.floor(Math.random() * 1000); // Número aleatorio entre 0 y 999
    return Number(`${timestamp}${randomPart}`); // Concatena y convierte en número
    }

if (process.argv.length === 5) {
    const person = new Person({
        name: nameText,
        number: numberText,
      })
    //console.log("entro")
    person.save().then(result => {
        console.log("added " + nameText + " number " + numberText + " to " + dbname)
        mongoose.connection.close()
      }).catch(err => {
        console.error("❌ Error al agregar un dato:", err.message);
        process.exit(1);
      });
  }

  if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook")
        result.forEach(p => {
          console.log(p.name +" " + p.number)
        })
        mongoose.connection.close()
      })
  }
/**/