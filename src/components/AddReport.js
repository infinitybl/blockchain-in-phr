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

import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import ChangeTheme from "../components/ChangeTheme";

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

const AddReport = ({ setMode, mode }) => {
  const [open, setOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <>
      {!open && (
        <>
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
              <Typography
                variant="span"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Add Incident Report
              </Typography>
            </Fab>
          </Tooltip>
          <ChangeTheme setMode={setMode} mode={mode} open={open} />
        </>
      )}
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          maxWidth={"500px"}
          maxHeight={"500px"}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography
            variant="h6"
            color="gray"
            textAlign="center"
            sx={{ marginBottom: 2 }}
          >
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
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="standard-multiline-static"
            multiline
            rows={3}
            name="incident-description"
            label="Incident Desciption"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DateTimePicker
            label="Incident Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="incident-category"
            label="Incident Category"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="care-setting"
            label="Care Setting"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="care-setting"
            label="Care Setting"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="email"
            label="Email"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
            sx={{ marginTop: 3 }}
          >
            <Button fullWidth>Create</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default AddReport;
