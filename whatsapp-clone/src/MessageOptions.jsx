import React, { useState } from "react";
import { ArrowBackIos } from "@material-ui/icons";
import { Menu, MenuItem, Button } from "@material-ui/core";

function MessageOptions({ idRing }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { messageId, roomId } = idRing;

  const messageOperations = {
    info: () => {
      console.log(`More Info ${messageId} in room ${roomId}`);
    },
    reply: () => {},
    forward: () => {},
    star: () => {},
    delete: () => {},
  };

  function handleOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose(e) {
    setAnchorEl(null);
  }

  return (
    <div className="MessageOptions__Container">
      <ArrowBackIos
        aria-haspopup="true"
        aria-controls="messageOptions__Menu"
        transform="rotate(-90 0 0)"
        onClick={handleOpen}
      />

      <Menu
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: "center",
        //   horizontal: "right",
        // }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        id="messageOptions__Menu"
      >
        <MenuItem onClick={() => handleClose() || messageOperations.info()}>
          Message info
        </MenuItem>
        <MenuItem onClick={() => handleClose() || messageOperations.reply()}>
          Reply
        </MenuItem>
        <MenuItem onClick={() => handleClose() || messageOperations.forward()}>
          Forward message
        </MenuItem>
        <MenuItem onClick={() => handleClose() || messageOperations.star()}>
          Star message
        </MenuItem>
        <MenuItem onClick={() => handleClose() || messageOperations.delete()}>
          Delete message
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MessageOptions;
