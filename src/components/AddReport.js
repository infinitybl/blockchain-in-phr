import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon, DateRange } from "@mui/icons-material";
import { Box } from "@mui/system";

import DateUtils from "@date-io/moment"; // choose your lib
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const AddReport = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

  return !open ? (
    <Tooltip
      onClick={(e) => setOpen(true)}
      title="Add"
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
      }}
    >
      <Fab color="primary" aria-label="add" variant="extended">
        <AddIcon />
        <Typography variant="span">Add Incident Report</Typography>
      </Fab>
    </Tooltip>
  ) : (
    <SytledModal
      open={open}
      onClose={(e) => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        width={400}
        height={280}
        bgcolor={"background.default"}
        color={"text.primary"}
        p={3}
        borderRadius={5}
      >
        <Typography variant="h6" color="gray" textAlign="center">
          Create new incident report
        </Typography>
        <UserBox>
          <Typography fontWeight={600} variant="span">
            Reporter:
          </Typography>
          <Avatar sx={{ width: 30, height: 30 }} />
          <Typography fontWeight={500} variant="span">
            John Doe
          </Typography>
        </UserBox>
        <TextField
          sx={{ width: "100%", bottom: 20 }}
          id="standard-multiline-static"
          multiline
          rows={3}
          placeholder="Enter Description"
          variant="standard"
        />
        <MuiPickersUtilsProvider utils={DateUtils}>
          <KeyboardDateTimePicker
            value={selectedDate}
            onChange={handleDateChange}
            label="Date of incident"
            onError={console.log}
            format="yyyy/MM/DD hh:mm a"
          />
        </MuiPickersUtilsProvider>
        <ButtonGroup
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Create</Button>
        </ButtonGroup>
      </Box>
    </SytledModal>
  );
};

export default AddReport;
