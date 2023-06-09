import mongoose from 'mongoose'

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_blog_dev')
        console.log('connect successfully');
    } catch (error) {
        console.log('connect failure !!!');
    }
}

export { connect }