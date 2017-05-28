var app = {};
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
  app.fetch();
  app.handleSubmit();
  app.handleUsernameClick();
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
    data: {limit: 20, order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received', data);
      var roomArr = [];
      $.each(data['results'], function (objectIndex, objectVal) {
        app.renderMessage(objectVal);
        if (!roomArr.includes(objectVal.roomname)) {
          roomArr.push(objectVal.roomname);
          app.renderRoom(objectVal.roomname);
        }
      });
      var users = [];
      app.handleUsernameClick(users);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get the message', data);
    }
  });
};

app.handleSubmit = function() {
  $( '#send' ).submit(function( event ) {
    event.preventDefault();
    if ( $( '#message' ).val() !== '' ) {
      var path = document.URL;
      var pathArray = path.split('/');
      var lastegment = pathArray[pathArray.length - 1];
      var user = lastegment.substring(lastegment.lastIndexOf('=') + 1);
      var messageObj = {
        username: user,
        text: $( '#message' ).val(),
        roomname: $('#roomSelect').val()
      };
      console.log(messageObj);
      app.send(messageObj);
      app.fetch();
    }
  });
};

app.filterMessages = function(data) {
  //add an event listener to #roomSelect
  $('#roomSelect').change(function() {
    //filter rooms based on room class
      //remove messages
      //app.clearMessags();
      //make a fetch call
    console.log(data);
    $('#chats').find('".' + data.roomname + '"');
  });
  
}; 


app.clearMessages = function() {
  document.getElementById('chats').innerHTML = '';
};

app.renderMessage = function(message) {
  var messageDiv = $('<div class="chat"' + 'id="' + message.username + '">');
  var usernameTitle = $('<div class="username">');
  var textContent = $('<p>');
  usernameTitle.text(message.username);
  textContent.text(message.text);
  messageDiv.append(usernameTitle);
  messageDiv.append(textContent);
  $('#chats').prepend(messageDiv);
};

app.renderRoom = function(roomName) {
  var room = $('<option />');
  room.text(roomName);
  $('#roomSelect').append(room);
};

app.handleUsernameClick = function(users) {
  users = users || [];
  $('.username').click(function(event) {
    if (!users.includes(event.target.innerText)) {
      users.push(event.target.innerText);
      var friendname = `<div class="friend"> ${event.target.innerText} </div>`;
      $('#friend').append(friendname);
    }
  });
};

