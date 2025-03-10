import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Wawave')
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
    }
   
}
// mongodb+srv://wawave:waweb@cluster0.igppu.mongodb.net/