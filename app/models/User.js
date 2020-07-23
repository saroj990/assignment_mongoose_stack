var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }]
});
module.exports = mongoose.model("User", userSchema)