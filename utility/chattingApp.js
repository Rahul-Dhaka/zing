let userMap = {};

module.exports = (socket, io) => {
    socket.on("saveuser", ({ username }) => {
      userMap[socket.id] = username;
      let activeUsers=[];
      for(let i in userMap){
          activeUsers.push(userMap[i]);
      }
      io.emit("joinedChat", { username, activeUsers });
      
      // console.log(userMap);
    });
  
    socket.on("chat", (msg, cb) => {
      // console.log(msg);
      cb({ status: "chat recieved" });
      io.emit("msg", {
        text: msg.msg,
        senderName: userMap[socket.id],
      });
    });
  
    socket.on("disconnect", () => {
      let username = userMap[socket.id];
      // console.log("user has disconnected:", username);
      if (username) {
          delete userMap[socket.id];
          let activeUsers=[];
          for(let i in userMap){
              activeUsers.push(userMap[i]);
          }
  
        io.emit("disconnectedUser", { username, activeUsers });
      }
    });
  }