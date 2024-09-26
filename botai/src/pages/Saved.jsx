import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";

const Saved = ({ savedChats, setSavedChats }) => {
  useEffect(() => {
  }, [savedChats]);
  const logoSrc = "./logo.png";

  const deleteChat = (index) => {
    setSavedChats((prevChats) => prevChats.filter((chat, i) => i !== index));
  };

  useEffect(() => {
    const storedChats = localStorage.getItem("savedChats");

    if (storedChats) {
      setSavedChats(JSON.parse(storedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedChats", JSON.stringify(savedChats));
  }, [savedChats]);

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
        minHeight: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {savedChats.length ? null : (
        <Typography variant="h5">No Saved chats 😢</Typography>
      )}
      {savedChats.map((chat, index) => (
        <Box
          sx={{
            backgroundColor: "primary.dark", // Background color for the chat box
            width: "100%", // Full width on small screens
            // maxWidth: "900px", // Cap width on larger screens
            borderRadius: "10px",
            flexGrow: 1, // Take up available space
            minHeight: "fit-content", // Ensure chat area takes up most of the height
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: "5px",
            mt: 1, // Margin top for spacing
            boxSizing: "border-box", // Ensure padding is included in the width calculation
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body1" sx={{ margin: "10px" }}>
              {chat.date}
            </Typography>
            <DeleteIcon
              fontSize="large"
              sx={{ margin: "10px", cursor: "pointer" }}
              onClick={() => deleteChat(index)}
            />
          </Box>

          {/* Chat Messages Display */}
          <Box
            className="messages"
            sx={{
              width: "100%",
              borderRadius: "10px",
              maxHeight: "50vh", // Maximum height for the message area
              overflowY: "auto", // Allow scrolling for overflow messages
              overflowX: "hidden", // Prevent horizontal overflow
              padding: "5px",
              boxSizing: "border-box", // Ensure padding doesn’t affect width
            }}
          >
            {chat.chats.map((msg, index) => (
              <Box
                className="message"
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent:
                    msg.type === "req" ? "flex-end" : "flex-start", // Align based on message type
                  alignItems: "flex-start",
                  padding: "5px 0",
                  overflowX: "hidden", // Prevent horizontal overflow for individual messages
                }}
              >
                {/* Display avatar based on the message type */}
                {msg.type === "res" && (
                  <img
                    src={
                      chat.model === "AIBot"
                        ? "./images/aibot.png"
                        : chat.model === "ChatBot"
                        ? "./images/chatbot.png" // Assuming you have an image for ChatBot
                        : logoSrc
                    }
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
                        msg.type === "req"
                          ? "secondary.dark"
                          : "secondary.main",
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
          {chat.feedback ? (
            <Typography variant="body1" sx={{ margin: "10px" }}>
              Feedback : {chat.feedback}
            </Typography>
          ) : null}
        </Box>
      ))}
    </Box>
  );
};

export default Saved;
