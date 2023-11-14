import { Box, Typography } from "@mui/material";

type ServiceCardProps = {
  title: string;
  description?: string;
  image?: string;
  onClick: () => void;
};

export function ServiceCard(props: ServiceCardProps) {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.10)",
        cursor: "pointer"
      }}
      onClick={props.onClick}
    >
      <Box
        component="img"
        src={props.image}
        alt="service logo"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center"
        }}
      />
      <Box
        sx={{
          bgcolor: "#fff",
          py: 1.25,
          px: 2.5
        }}
      >
        <Typography variant="title_S" mb={0.5}>
          {props.title}
        </Typography>
        <Typography variant="body_M" display="block">
          {props.description}
        </Typography>
      </Box>
    </Box>
  );
}
