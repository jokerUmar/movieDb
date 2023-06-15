import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import "./microphone.css";
import { Box, Button, Modal, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

export default function Microphone({ hideBool }) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    useLegacyResult: false,
  });

  const styleMicBox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "300px",
    width: "90%",
    bgcolor: "#fff",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };

  const styleMic = {
    color: "#ff4757",
    fontSize: "42px",
  };

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
    stopSpeechToText();
  }

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  function handleMic() {
    isRecording ? stopSpeechToText() : startSpeechToText();
    setOpen(true);
  }

  // console.log(results[results.length - 1].transcript);

  return (
    <>
      <FontAwesomeIcon
        onClick={handleMic}
        className="search_microphone"
        style={hideBool ? { display: "none" } : { display: "inline-block" }}
        icon={faMicrophone}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMicBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <MicIcon sx={styleMic} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {results.length > 0 ? results[results.length - 1].transcript : ""}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
