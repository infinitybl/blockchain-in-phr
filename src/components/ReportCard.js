import {
  MoreVert,
  MedicalServices,
  Edit,
  Summarize,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";

const ReportCard = () => {
  return (
    <Card sx={{ marginLeft: 10, marginTop: 10 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="John Doe"
        subheader="September 14, 2022"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Report Description Placeholder
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit report">
          <Edit />
        </IconButton>
        <IconButton aria-label="create action plan">
          <Summarize />
        </IconButton>
        <IconButton aria-label="update medication status">
          <MedicalServices />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ReportCard;
