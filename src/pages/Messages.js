import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { Container, Grid, List, ListItem, ListItemText, Box, TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import axios from "../api/axios";

let stompClient = null;
export const Messages = () => {
  const authUserName = useSelector((state) => state.auth.userName);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("");
  const [userData, setUserData] = useState({ username: "", receivername: "", connected: false, message: "" });

  useEffect(() => {
    setUserData((prevState) => ({ ...prevState, username: authUserName }));
    // setTab(authUserName);
  }, [authUserName]);

  useEffect(() => {
    console.log("new", privateChats);
  }, [privateChats]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log("message");
  }, [privateChats]);

  useEffect(() => {
    console.log(tab, "tab");
  }, [tab]);

  const getRoomNumber = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        "http://localhost:4000/chat",
        {
          nickname: userData.receivername,
        },
        {
          headers: {
            ACCESS_HEADER: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (e) {
      alert(e, "ERROR");
    }
  };

  const connect = async () => {
    const token = Cookies.get("token");
    const room = await getRoomNumber();
    console.log("roomId:", room.roomId);
    console.log("roomName:", room.roomName);
    setTab(room.roomName);
    let Sock = new SockJS("http://localhost:4000/ws-edit");
    stompClient = over(Sock);

    stompClient.connect({ ACCESS_HEADER: `Bearer ${token}` }, () => onConnected(room), onError);
  };

  const onError = (err) => {
    console.log(err, "에러!");
  };

  const onConnected = async (room) => {
    setUserData({ ...userData, connected: true });
    await stompClient.subscribe("/sub/chat/room" + room.roomId, onPrivateMessage);

    userJoin(room);
    privateChats.set(room.roomId, { targetName: userData.receivername, messages: [] });
  };

  const userJoin = (room) => {
    let chatMessage = {
      type: "ENTER",
      sender: userData.username,
      roomId: room.roomId,
      roomName: room.roomName,
      message: "",
    };

    stompClient.send("/pub/chat/enter", {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    console.log("PAYLOAD DATA", payloadData);

    if (privateChats.has(payloadData.roomId)) {
      privateChats.get(payloadData.roomId).messages.push(payloadData);
      setPrivateChats(new Map(privateChats));
      console.log("new:", privateChats.get(payloadData.roomId));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.roomId, { targetName: userData.receivername, messages: list });
      setPrivateChats(new Map(privateChats));
      console.log("add:", privateChats.get(payloadData.roomId));
    }
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const getPrivateRoom = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        "http://localhost:4000/chat/find",
        { nickname: userData.receivername },
        {
          headers: {
            ACCESS_HEADER: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "findChatRoom");
      return response.data.data;
    } catch (err) {
      alert(err);
    }
  };

  const sendPrivateValue = async () => {
    if (stompClient) {
      const room = await getPrivateRoom();

      let chatMessage = {
        type: "TALK",
        sender: userData.username,
        roomId: room.roomId,
        roomName: room.roomName,
        message: userData.message,
      };

      await stompClient.send("/pub/chat/send", {}, JSON.stringify(chatMessage));
      console.log("room", chatMessage);

      // const updatedPrivateChats = new Map(privateChats);
      // if (updatedPrivateChats.get(roomNumber)) {
      //   updatedPrivateChats.get(roomNumber).messages.push(chatMessage);
      // } else {
      //   updatedPrivateChats.set(roomNumber, { targetName: userData.receivername, messages: [chatMessage] });
      //   console.log("new", updatedPrivateChats);
      // }
      // setPrivateChats(updatedPrivateChats);
      setUserData({ ...userData, message: "" });
    }
  };

  const handlereceivername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, receivername: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <Container>
      {userData.connected ? (
        <Grid container spacing={0}>
          <Grid item xs={3} sx={{ borderRight: "1px solid grey" }}>
            <List>
              {Array.from(privateChats.values()).map((chat, index) => (
                <ListItem
                  button
                  onClick={() => {
                    setTab(chat.targetName);
                  }}
                  key={index}
                >
                  <ListItemText primary={chat.targetName} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={9}>
            <List>
              {Array.from(privateChats.values()).map((chats, i) =>
                chats.messages.map((chat, index) => (
                  <ListItem key={index} alignItems="flex-end">
                    <ListItemText
                      primary={chat.sender === userData.username ? "You" : chat.sender}
                      secondary={chat.message}
                      sx={{ textAlign: chat.sender === userData.username ? "right" : "left" }}
                    />
                  </ListItem>
                ))
              )}
            </List>

            <Box sx={{ display: "flex", marginTop: "auto" }}>
              <TextField
                label="Enter the message"
                variant="outlined"
                size="small"
                value={userData.message}
                onChange={handleMessage}
                sx={{ flexGrow: 1, marginRight: "10px" }}
              />
              <Button variant="contained" color="primary" onClick={sendPrivateValue}>
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TextField
            label="Target User"
            variant="outlined"
            margin="normal"
            name="userName"
            value={userData.receivername}
            onChange={handlereceivername}
          />
          <Button variant="contained" color="primary" onClick={registerUser}>
            Connect
          </Button>
        </Box>
      )}
    </Container>
  );
};
