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
  reporterName,
  incidentDescription,
  incidentDate,
  incidentCategory,
  careSetting,
  medicationTaken,
  medicalCompanyInvolved,
  files,
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
            J
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVert />
        //   </IconButton>
        // }
        title={reporterName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Incident Date:</strong> {incidentDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Incident Category:</strong> {incidentCategory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Care Setting:</strong> {careSetting}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Medication Taken:</strong> {medicationTaken}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Medical Company Involved:</strong> {medicalCompanyInvolved}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Incident Description:</strong> {incidentDescription}
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
