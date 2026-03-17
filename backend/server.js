const express = require("express");
const bcrypt = require("bcrypt");


const http = require("http");

const { Server } = require("socket.io");
const app = express();
app.use(express.json());
const server = http.createServer(app);
  app.use(express.json());
 

app.post("/signup", async (req, res) => {

  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  console.log("Hashed password:", hash);

  res.json({
    message: "User registered",
    password: hash
  });
});


// app.post ("/Login",req,res)=>{
//   console.log(req.body);
//    res.json({ message: "User logged in successfully" }); 
// };
app.post("/send_message", (req, res) => {
  console.log(req.body);
   res.json({ message: "Message sent successfully" });
});
app.get("/get_messages", (req, res) => {
  console.log("Fetching messages");
   res.json({ messages: [] });
});
app.post("/join_room", (req, res) => {
  console.log(req.body);
   res.json({ message: "Joined room successfully" });
});
app.post("/leave_room", (req, res) => {
  console.log(req.body);
   res.json({ message: "Left room successfully" });
}  );
app.post("/get_rooms", (req, res) => {
  console.log("Fetching rooms");
   res.json({ rooms: [] });
});
app.post("/get_users", (req, res) => {
  console.log("Fetching users");
   res.json({ users: [] });
});
app.post("/get_user_info", (req, res) => {
  console.log(req.body);
   res.json({ user: {} });
}  );
app.post("/update_user_info", (req, res) => {
  console.log(req.body);
   res.json({ message: "User info updated successfully" });
} );
app.post("/delete_user", (req, res) => {
  console.log(req.body);
   res.json({ message: "User deleted successfully" });
} );
// app.createRouter().post("/create_room", (req, res) => {
//   console.log(req.body);
//    res.json({ message: "Room created successfully" });
// } );
// 



const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Send message
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});