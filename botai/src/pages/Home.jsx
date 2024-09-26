import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      bgcolor="background.default"
      p={1}
      sx={{
        borderRadius: "10px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box className="hero">
        <img src="./images/hero.png" height="300px" width="300px" alt="Hero" />
      </Box>

      <Box
        className="tools"
        p={1}
        sx={{
          backgroundColor: "secondary.dark",
          borderRadius: "10px",
          width: "95%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* ChatBot Tool */}
        <Box
          className="tool"
          p={2}
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "10px",
            height: "200px",
            width: "40%",
            minWidth: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
            cursor: "pointer", // Added cursor for better UX
          }}
          onClick={() => navigate("/chatbot")}
        >
          <Box>
            <img src="images/chatbot.png" height="100px" width="100px" alt="ChatBot" />
          </Box>
          <Typography variant="h5">ChatBot</Typography>
        </Box>

        {/* AIBot Tool */}
        <Box
          className="tool"
          
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "10px",
            height: "200px",
            width: "40%",
            minWidth: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
          onClick={() => navigate("/")}
        >
          <Box>
            <img src="images/aibot.png" height="80px" width="80px" alt="AIBot" />
          </Box>
          <Typography variant="h5">AIBot</Typography>
        </Box>
      </Box>

      {/* About Section */}
      <Box
        className="about"
        p={1}
        sx={{
          backgroundColor: "secondary.dark",
          borderRadius: "10px",
          width: "95%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5">About Milo.AI</Typography>
        <Box
          sx={{
            backgroundColor: "secondary.dark",
            borderRadius: "10px",
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: "5px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              backgroundColor: "primary.main",
              height: "200px",
              width: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <img
              src="images/robo.jpg"
              style={{
                borderRadius: "50%",
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="Robo"
            />
          </Box>

          <Box
          p={1}
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "10px",
              minWidth: "250px",
              maxWidth: "70%",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "5px",
              
            }}
          >
            <Typography variant="body1">
              Milo.AI is a powerful AI chatbot designed to assist with various types of queries. It features two tools: the ChatBot, which specializes in providing answers related to web development technologies such as React, Node.js, and JavaScript, and the AIBot, which can answer a wide range of questions on any topic. Whether you're diving deep into tech or seeking general knowledge, Milo.AI has you covered.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
