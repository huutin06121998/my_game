const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Call service
const createRoomService = require("./src/services/Room/functions/create");
const findCodeService = require("./src/services/Room/functions/find_code");
const playService = require("./src/services/Score/play");
const checkUserEndPlayService = require("./src/services/Room_Player/player_end");
const roomPlayerService = require("./src/services/Room_Player/create_room_player");
const infoPlayerEndPlayService = require("./src/services/Room_Player/info_player_end");

require("dotenv").config();

const PORT = process.env.PORT || 8000;
server.listen(PORT, "localhost", () => {
  console.log(`Server running in port ${PORT}`);
});

// Create room
io.on("connection", (socket) => {
  socket.on("create", (room) => {
    async function createRoom() {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      const { name } = room;
      try {
        const room = await createRoomService(randomCode, name);
        if (room) {
          socket.emit("created", {
            room_id: room.id,
            code: room.code,
            room_name: room.name,
            status: room.status,
          });
        }
      } catch (error) {
        socket.emit("created", { status: "Failed" });
      }
    }
    createRoom();
  });

  // Join room
  socket.on("join_room", (room) => {
    const { code } = room;
    const playerId = socket.id;
    const dataNow = Date.now();

    async function joinRoom() {
      try {
        const room = await findCodeService(code);
        const roomCode = room.code;
        await roomPlayerService(roomCode, playerId);

        // Join room id
        socket.join(roomCode);

        // Emits all user join room it
        io.sockets.in(roomCode).emit("room_connect", {
          status: "connected",
          name: room.name,
          code: roomCode,
          created: dataNow,
        });

        // Emit
        socket.emit("join_room", {
          room_id: room.id,
          player_id: playerId,
        });

        // Emits all user disconnect room it
        socket.on("disconnect", () => {
          io.sockets.in(room).emit({
            status: "disconnected",
            name: room.name,
            code: roomCode,
            created: dataNow,
          });
        });
      } catch (error) {
        socket.emit("join_room", { status: "Failed" });
      }
    }
    joinRoom();
  });

  // Play
  socket.on("play", (room) => {
    const { time, score, code, room_player_id } = room;
    async function play() {
      try {
        if (time != 0) await playService(time, score, room_player_id);
        if (time == 0) {
          const checkUserEndPlay = await checkUserEndPlayService(time);
          const infoUserEndPlay = await infoPlayerEndPlayService(code);
          if (checkUserEndPlay >= 2) {
            if (infoUserEndPlay) {
              io.sockets.to(infoUserEndPlay.room_code).emit("user_played", {
                player_id: infoUserEndPlay.player_id,
                score: infoUserEndPlay["scores.scores"],
              });
            }
          }
        }
      } catch (error) {
        socket.emit("play", { status: "Failed" });
      }
    }
    play();
  });
  // TODO: play (time, score)
  // inteval 3s:
});
