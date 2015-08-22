var polls = require('../controllers/poll.server.controller.js');
var users = require('../controllers/users.server.controller.js');

module.exports = function(app) {
    app.route('/:user/create')
        .post(polls.create);
    app.route('/get-polls')
        .get(polls.getPolls);
    app.route('/:user/:link')
        .get(users.ensureAuthenticated, polls.getPollByLink)
        .put(polls.updateVotes)
        .delete(polls.delete);
    app.route('/:user/:link/edit')
        .put(polls.edit);

};