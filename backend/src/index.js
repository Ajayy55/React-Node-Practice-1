import {app} from './app.js'
import { dbConnection } from './db/dbConnection.js'

dbConnection()
.then(()=>{
    const port = process.env.PORT || 3000
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
.catch((error)=>{
    console.log('Mongo DB Connection Failed',error);  
})