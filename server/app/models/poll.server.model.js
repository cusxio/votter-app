var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    creator: String,
    choices: Array
});


mongoose.model('Poll', PollSchema);
