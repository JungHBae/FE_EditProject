import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { Box, ListItemAvatar, Container, Typography, List, ListItem, ListItemText, TextField, Button, Avatar } from "@mui/material";

let stompClient = null;
export const Messages = () => {
  const authUserName = useSelector((state) => state.auth.userName);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({ username: "", receivername: "", connected: false, message: "" });
  useEffect(() => {
    setUserData((prevState) => ({ ...prevState, username: authUserName }));
  }, [authUserName]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log("message");
  }, [privateChats]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/user/" + userData.username + "/private", onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    let payloadData = JSON.parse(payload.body);
    if (privateChats.has(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
      console.log("new:", [...privateChats.get(userData.receivername)]);
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
      console.log("add:", [...privateChats.get(userData.receivername)]);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: tab || userData.receivername,
        message: userData.message,
        status: "MESSAGE",
      };

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

      // update privateChats state with new message
      const updatedPrivateChats = new Map(privateChats);
      if (updatedPrivateChats.get(tab)) {
        updatedPrivateChats.get(tab).push(chatMessage);
      } else {
        updatedPrivateChats.set(tab, [chatMessage]);
        console.log("new", updatedPrivateChats);
      }
      setPrivateChats(updatedPrivateChats);
      setUserData({ ...userData, message: "" });
    }
  };
  useEffect(() => {
    console.log("new", privateChats);
  }, [privateChats]);

  const handlereceivername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, receivername: value });
  };

  const registerUser = () => {
    privateChats.set(userData.receivername, []);
    connect();
  };

  return (
    <Container>
      {userData.connected ? (
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "30%", borderRight: "1px solid grey" }}>
            <List>
              {[...privateChats.keys()].map((name, index) => (
                <ListItem
                  button
                  onClick={() => {
                    setTab(name);
                  }}
                  key={index}
                >
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ width: "70%" }}>
            <List>
              {privateChats.get(tab) &&
                [...privateChats.get(tab)].map((chat, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    {chat.senderName !== userData.username && (
                      <ListItemAvatar>
                        <Avatar>{chat.senderName.charAt(0)}</Avatar>
                      </ListItemAvatar>
                    )}
                    <ListItemText primary={chat.senderName === userData.username ? "You" : chat.senderName} secondary={chat.message} />
                  </ListItem>
                ))}
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
          </Box>
        </Box>
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
