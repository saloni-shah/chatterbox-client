// YOUR CODE HERE:
var app = {};

app.init = function() {
  return true;
};

app.send = function(messageObj) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(messageObj),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};