import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  NativeSelect,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Add as AddIcon,
  Close,
  DateRange,
  FilePresent,
} from "@mui/icons-material";
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

const AddActionPlan = ({ open, setOpen }) => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          maxWidth={"600px"}
          maxHeight={"600px"}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={1}
          sx={{ overflow: "auto" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              color="gray"
              textAlign="center"
              sx={{ marginBottom: 2 }}
            >
              Create New Action Plan
            </Typography>
            <IconButton onClick={(e) => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
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
            name="action-plan-description"
            label="Action Plan Desciption"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DateTimePicker
            label="Action Plan Creation Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="clinical-outcome"
            label="Clinical Outcome"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="contributing-factors"
            label="Contributing Factors"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="suspected-medication"
            label="Suspected Medication"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="standard-multiline-static"
            multiline
            rows={3}
            name="action-to-take-by-medical-company"
            label="Action To Take By Medical Company"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Medical Company Involved
            </InputLabel>
            <NativeSelect
              defaultValue={"rexall"}
              inputProps={{
                name: "medical-company-involved",
                id: "uncontrolled-native",
              }}
            >
              <option value={"rexall"}>Rexall Pharmacy</option>
            </NativeSelect>
          </FormControl>
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            <FilePresent />
            Upload Files
            <input hidden multiple type="file" />
          </Button>
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

export default AddActionPlan;
