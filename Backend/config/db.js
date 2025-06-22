import mongoose from "mongoose";

export const connDB = async () => {
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/taskFlow")
        await mongoose.connect("mongodb+srv://santu700141:santu7001@cluster0.iodot87.mongodb.net/TaskPilot")
        // console.log("Connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}