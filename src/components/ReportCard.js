import {
  MoreVert,
  MedicalServices,
  Edit,
  Summarize,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

const ReportCard = ({
  reporterFirstName,
  reporterLastName,
  incidentDescription,
  incidentDate,
  incidentCategory,
  careSetting,
  medicationTaken,
  medicalCompanyInvolved,
  file,
  addActionPlanModalOpen,
  setAddActionPlanModalOpen,
  editReportModalOpen,
  setEditReportModalOpen,
}) => {
  return (
    <Card
      sx={{
        marginLeft: { xs: 2, md: 10 },
        marginTop: { xs: 0, md: 2 },
        marginRight: { xs: 2, md: 0 },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="report">
            {reporterFirstName.charAt(0) + reporterLastName.charAt(0)}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVert />
        //   </IconButton>
        // }
        title={reporterFirstName + " " + reporterLastName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Incident Date:</strong> {incidentDate}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Incident Category:</strong> {incidentCategory}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Care Setting:</strong> {careSetting}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Medication Taken:</strong> {medicationTaken}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Medical Company Involved:</strong> {medicalCompanyInvolved}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Incident Description:</strong>
          <br />
          {incidentDescription}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>URL to Related File: </strong>
          <br />
          <a href={file} target="_blank">
            {file}
          </a>
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Tooltip title="Edit Report">
          <IconButton
            aria-label="edit report"
            onClick={(e) => setEditReportModalOpen(true)}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Create Action Plan"
          onClick={(e) => setAddActionPlanModalOpen(true)}
        >
          <IconButton aria-label="create action plan">
            <Summarize />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update Medication Status">
          <IconButton aria-label="update medication status">
            <MedicalServices />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ReportCard;
