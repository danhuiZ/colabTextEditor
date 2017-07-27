module.exports = function(app, io) {
  io.on('connection', function(socket) {
    socket.on('sayHello', function(message) {
      console.log(message);
    });

    socket.on('joinRoom', function(roomID) {
      socket.join(roomID);
      console.log('A user joined the room :)');
    });

    socket.on('onChange', function(updateObj) {
      console.log('lit we get here');
      socket.to(updateObj.roomName).emit('updateOnChange', updateObj.editorState);
    });
  });
};
