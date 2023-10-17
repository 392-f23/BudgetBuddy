import { Box, CircularProgress } from "@mui/material";

const LoadingContainer = (props) => {
  const { isLoading, children } = props;

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    children
  );
};

export default LoadingContainer;
