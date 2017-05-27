var app = {};
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages/';

app.init = function() {
  app.fetch();
  return true;
};

app.send = function(messageObj) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(messageObj),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received', data);
      var roomArr = [];
      for (var i = 0; i < data.results.length; i++) {
        app.renderMessage(data.results[i]);
        if (!roomArr.includes(data.results[i].roomname)) {
          roomArr.push(data.results[i].roomname);
          app.renderRoom(data.results[i].roomname);
        } 
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get the message', data);
    }
  });
};

app.clearMessages = function() {
  document.getElementById('chats').innerHTML = '';
};

app.renderMessage = function(message) {
  var messageDiv = $('<div class="message">');
  var usernameTitle = $('<h3>');
  var textContent = $('<p>');
  usernameTitle.text(message.username);
  textContent.text(message.text);
  messageDiv.append(usernameTitle);
  messageDiv.append(textContent);
  $('#chats').append(messageDiv);
};

app.renderRoom = function(roomName) {
  var room = $('<option />');
  room.text(roomName);
  $('#roomSelect').append(room);
};