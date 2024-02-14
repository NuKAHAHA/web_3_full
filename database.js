const mongoose = require('mongoose');

// Connection to MongoDB Atlas cloud database
mongoose.connect('mongodb+srv://nurkhaimuldin:kukanku@cluster0.b9kwzvh.mongodb.net/')
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(err => console.error('Connection error:', err));

const { Schema, ObjectId } = mongoose;

// User schema
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    is_admin: { type: Boolean, default: false }
});

// Logs schema
const logsSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    request_type: String,
    request_data: String,
    status_code: String,
    timestamp: { type: Date, default: Date.now },
    response_data: String
});

// User IP schema
const userIpSchema = new Schema({
    ip: String,
    user: { type: ObjectId, ref: 'User' }
});

// Define models
const UserModel = mongoose.model('User', userSchema);
const LogsModel = mongoose.model('Logs', logsSchema);
const UserIpModel = mongoose.model('UserIp', userIpSchema);

// Exports
module.exports = {
    UserModel,
    LogsModel,
    UserIpModel
};
