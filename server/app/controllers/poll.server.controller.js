var Poll = require('mongoose').model('Poll');

exports.create = function(req, res) {
    var postPoll = req.body;
    console.log(req.user);
    var newPoll = new Poll({
        title: postPoll.question,
        link: postPoll.question.replace(/\s+/g, '-').toLowerCase().replace(/\?/g, ''),
        creator: postPoll.creator,
        choices: postPoll.choices
    });
    newPoll.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.status(200).send(newPoll);
        }
    });
};

exports.getPolls = function(req, res) {
    var creator = req.query.creator;
    Poll.find({
        creator: creator
    }, function(err, polls) {
        if (err) {
            return res.status(400).send({
                message: 'Error'
            });
        } else {
            res.send(polls);
        }
    });
};

exports.getPollByLink = function(req, res) {
    var link = req.params.link;
    Poll.find({
        link: link
    }, function(err, link) {
        if (err) {
            return res.status(400).send({
                message: 'Error'
            });
        } else {
            res.send(link);
        }
    });
};


exports.updateVotes = function(req, res) {
    var link = req.params.link;
    var selection = req.body.selection;
    console.log(selection);
    Poll.update({
            "choices.text": selection
        }, {
            "$inc": {
                "choices.$.votes": 1
            }
        },
        function(err, numAffected) {

        }
    );
    res.status(200).send({
        message: 'Success'
    });
};

exports.edit = function(req, res) {
    var link = req.params.link;
    var selection = req.body;
    console.log(selection.choices);

    Poll.findOne({
        link: link
    }, function(err, found) {
        if (err) {
            res.status(400).send({
                message: 'Something happaned'
            });
        }
        if (found) {

            if (found.title !== selection.question) {
                var newTitle = selection.question;
                var newLink = newTitle.replace(/\s+/g, '-').toLowerCase();
                // found.title = newTitle;
                // found.link = newLink;
                // found.choices = [{
                //     text: selection.choices[0].text
                // }];
                found.choices = selection.choices;


                found.save(function(err) {
                    if (err) {
                        throw err;
                    }
                });


            } else {
                found.choices = selection.choices;
                found.save(function(err) {
                    if (err) {
                        throw err;
                    }
                });
            }
            res.status(200).send({
                message: 'Edit Success'
            });
        }

    });
};

exports.delete = function(req, res) {
    var link = req.params.link;
    Poll.findOne({
        link: link
    }, function(err, found) {
        if (err) return res.status(200).send({
            message: err
        });
        found.remove();
        res.status(200).send({
            message: 'User Deleted!'
        });
    });
};
