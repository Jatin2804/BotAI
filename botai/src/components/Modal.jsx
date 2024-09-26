import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
// import Textarea from "./Textarea";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function TransitionsModal({ isOpen, setIsOpen,feedback, setFeedback }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };
  const textareaRef = React.useRef(null);

  const handleSubmit = () => {
    setFeedback(content)
    handleClose();
  };
  React.useEffect(() => {
    // console.log("Hii iam from modal",isOpen);
    if (isOpen) setOpen(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Give Feedback
            </Typography>

            <TextField
              inputRef={textareaRef}
              label="Your Feedback"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              sx={{marginY:"10px"}}
              onChange={(e) => setContent(e.target.value)}
            />

            <Button
              onClick={handleSubmit}
              variant="outlined"
              color="typography.body1.color"
            >
              Give Feedback
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
