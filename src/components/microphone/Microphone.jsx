import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import "./microphone.css";
import { Box, Modal, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router";

function Microphone({ inputShow, setSearchData, searchData }) {
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
  let navigate = useNavigate();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    stopSpeechToText();
    setSearchData(results[results.length - 1].transcript);
    navigate(`search/${results[results.length - 1].transcript}/1`);
  }

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  function handleMic() {
    isRecording ? stopSpeechToText() : startSpeechToText();
    handleOpen();
  }

  return (
    <>
      <FontAwesomeIcon
        onClick={handleMic}
        className="search_microphone"
        icon={faMicrophone}
        style={inputShow ? { display: "inline-block" } : { display: "none" }}
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

export default memo(Microphone);
