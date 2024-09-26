import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import React, { useState, useEffect, useRef } from "react";
import response from "../config/gemini";
import Feedback from "../components/Modal";
import Button from "@mui/material/Button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import Skeleton from '@mui/material/Skeleton';
import "./style.css";

const defaultMessages = {
  text: `Hello Iam Milo , You can ask me anything 😊!`,
  type: "res",
};

const AIBot = ({ savedChats, setSavedChats }) => {
  const [messages, setMessages] = useState([defaultMessages]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const messageBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    const storedChats = localStorage.getItem("savedChats");
  
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  
    if (storedChats) {
      setSavedChats(JSON.parse(storedChats));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);
  
  useEffect(() => {
    localStorage.setItem("savedChats", JSON.stringify(savedChats));
  }, [savedChats]);
  


  const handleSend = async () => {
    if (input.toLowerCase().replace(/\s+/g, "") === "thankyou") {
      setOpenFeedback(true);
      setInput("");
    } else if (input.trim() !== "") {
      // Append user message (type: "req")
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, type: "req" },
      ]);
       setLoading(true);
      try {
        const res = await response(input);
        setLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: res, type: "res" },
        ]);
      } catch (error) {
        console.error("Error getting response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Oops! Something went wrong.", type: "res" },
        ]);
      }
      setInput("");
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, type: "req" },
      ]);

      setTimeout(() => {
        const res = "Come on type something 🥱";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: res, type: "res" },
        ]);
      }, 1000);

      setInput("");
    }
  };

  function getTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0"); // Get the current day
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Get the current month (0-11, so add 1)
    const year = now.getFullYear(); // Get the current year
    const hours = String(now.getHours()).padStart(2, "0"); // Get the current hour (0-23)
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Get the current minute (0-59)
    const seconds = String(now.getSeconds()).padStart(2, "0"); // Get the current second (0-59)

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleSave = () => {
    const now = getTime();
    // console.log(getTime());
    setSavedChats((prevChats) => {
      const updatedChats = [
        { model: "AIBot", date: now, chats: messages, feedback: feedback },
        ...prevChats,
      ];

      if (updatedChats.length > 10) {
        updatedChats.shift();
      }
      return updatedChats;
    });

    setMessages([defaultMessages]);
    setFeedback("");
  };

  const handleReact = (index, reactionType) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, reaction: reactionType } : msg
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend(); // Trigger send function on Enter key press
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages box when a new message is added
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   if (feedback) console.log("Feedback is :", feedback);
  // }, [feedback]);

  useEffect(() => {
    // Focus on the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Box
      bgcolor="background.default"
      p={1}
      sx={{
        width: {
          xs: "90vw", // 100vw for small screens
          md: "70vw", // 70vw for medium screens and above
        },
        maxWidth: "100%", // Ensure the container doesn't exceed screen width
        overflowX: "hidden", // Prevent horizontal overflow
        borderRadius: "10px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ChatBot Header */}
      <Box
        sx={{
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
        }}
      >
        <img
          src="images/aibot.png"
          height="100px"
          width="100px"
          alt="ChatBot"
        />
        <Typography variant="h3">AIBot</Typography>
      </Box>

      {/* new chat & feedback button  */}
      <Box
        sx={{
          width: "100%", // Full width on small screens
          maxWidth: "900px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 0,
        }}
      >
        <Button
          variant="contained"
          sx={{
            margin: "5px",
            backgroundColor: "primary.dark",
            color: "white",
            boxShadow: 5,
          }}
          onClick={() => setMessages([defaultMessages])}
        >
          <AddIcon />
          New Chat
        </Button>
        <Button
          variant="contained"
          sx={{
            margin: "5px",
            backgroundColor: "primary.dark",
            color: "white",
            boxShadow: 5,
          }}
          onClick={() => setOpenFeedback(true)}
        >
          <ThumbsUpDownIcon sx={{ marginRight: "10px" }} />
          Feedback
        </Button>
      </Box>

      {/* Chat Box with background */}
      <Box
        sx={{
          backgroundColor: "primary.dark", // Background color for the chat box
          width: "100%", // Full width on small screens
          maxWidth: "900px", // Cap width on larger screens
          borderRadius: "10px",
          flexGrow: 1, // Take up available space
          minHeight: "75vh", // Ensure chat area takes up most of the height
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "5px",
          mt: 1, // Margin top for spacing
          boxSizing: "border-box", // Ensure padding is included in the width calculation
        }}
      >
        {/* Chat Messages Display */}
        <Box
          className="messages"
          ref={messageBoxRef}
          sx={{
            width: "100%",
            borderRadius: "10px",
            maxHeight: "60vh", // Maximum height for the message area
            overflowY: "auto", // Allow scrolling for overflow messages
            overflowX: "hidden", // Prevent horizontal overflow
            padding: "5px",
            boxSizing: "border-box", // Ensure padding doesn’t affect width
          }}
        >
          {messages.map((msg, index) => (
            <Box
              className="message"
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: msg.type === "req" ? "flex-end" : "flex-start", // Align based on message type
                alignItems: "flex-start",
                padding: "5px 0",
                overflowX: "hidden", // Prevent horizontal overflow for individual messages
              }}
            >
              {/* Display avatar based on the message type */}
              {msg.type === "res" && (
                <img
                  src="images/aibot.png"
                  height="70px"
                  width="70px"
                  alt="ChatBot"
                  style={{ marginRight: "px" }}
                />
              )}
              <Box
                sx={{
                  maxWidth: "70%",
                  marginBottom: "10px",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    backgroundColor:
                      msg.type === "req" ? "secondary.dark" : "secondary.main",
                    color: msg.type === "req" ? "" : "white",
                    padding: "10px",
                    borderRadius: "5px",
                    wordWrap: "break-word", // Ensure long text wraps properly
                    overflowX: "hidden", // Ensure no horizontal scrolling within the message
                  }}
                >
                  {msg.text}
                </Typography>

                {msg.type === "res" && (
                  <Box
                    sx={{
                      display: "flex",
                      width: "fit-content",
                      height: "fit-content",
                      marginTop: "5px",
                    }}
                  >
                    {msg.reaction && (
                      <Box
                        className="response"
                        sx={{
                          marginTop: "-25px",
                          padding: "5px",
                          width: "fit-content",
                          borderRadius: "10px",
                        }}
                      >
                        {msg.reaction === "up" && (
                          <ThumbUpIcon sx={{ margin: "5px" }} />
                        )}
                        {msg.reaction === "down" && (
                          <ThumbDownIcon sx={{ margin: "5px" }} />
                        )}
                      </Box>
                    )}

                    <Box
                      className="responseHover"
                      sx={{
                        backgroundColor: "background.default",
                        padding: "5px",
                        width: "fit-content",
                        borderRadius: "0px 20px 20px 20px",
                      }}
                    >
                      <ThumbUpIcon
                        sx={{ margin: "5px", cursor: "pointer" }}
                        onClick={() => handleReact(index, "up")}
                      />
                      <ThumbDownIcon
                        sx={{ margin: "5px", cursor: "pointer" }}
                        onClick={() => handleReact(index, "down")}
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Display user icon on the right side for requests */}
              {msg.type === "req" && (
                <img
                  src="images/user.png"
                  height="50px"
                  width="50px"
                  alt="User"
                  style={{ marginLeft: "10px" }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Input Field with Send Button */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "10px", // Spacing between messages and input field
            overflowX: "hidden", // Ensure no overflow on small screens
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Chat with ChatBot"
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state
            onKeyDown={handleKeyDown} // Trigger handleSend on pressing Enter
            fullWidth
            inputRef={inputRef} // Focus input field on component mount
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleSend} // Trigger handleSend on click
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "10px",
              width: "100%", // Full width for smaller screens
              maxWidth: "600px", // Cap width for larger screens
              boxSizing: "border-box", // Ensure padding and borders are included in width
            }}
          />
          <Button
            variant="contained"
            sx={{
              margin: "5px",
              backgroundColor: "background.default",
              boxShadow: 5,
            }}
            onClick={handleSave}
          >
            <BookmarkBorderIcon />
            Save
          </Button>
        </Box>
      </Box>
      <Feedback
        isOpen={openFeedback}
        setIsOpen={setOpenFeedback}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    </Box>
  );
};

export default AIBot;
