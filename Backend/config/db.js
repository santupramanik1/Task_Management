import mongoose from "mongoose";

export const connDB = async () => {
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/taskFlow")
        await mongoose.connect("mongodb+srv://santu700141:TVFDFmoO3oZFHMUH@cluster0.vqysbs9.mongodb.net/taskPilot?retryWrites=true&w=majority")
        console.log("Connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}