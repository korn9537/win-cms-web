import { Box, Typography } from "@mui/material";

type ImageCardProps = {
  src: string;
  title: string;
  description: string;
  onClick: () => void;
};

export default function ImageCard(props: ImageCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingBottom: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.10)",
        backgroundImage: `url(${props.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "lightgray 50%",
        // background: `url(${props.src}), lightgray 50% / cover no-repeat`,
        cursor: "pointer"
      }}
      onClick={props.onClick}
    >
      {/* <Box
        component="img"
        src={props.src}
        alt="company logo"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          inset: 0,
          border: "none"
        }}
      /> */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.86)",
          backdropFilter: "blur(3px)",
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

// export default function ImageCard(props: ImageCardProps) {
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         borderRadius: "12px",
//         overflow: "hidden",
//         boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.10)",
//         cursor: "pointer"
//       }}
//       onClick={props.onClick}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           height: "100%",
//           paddingBottom: "100%",
//           backgroundImage: `url(${props.src})`,
//           backgroundSize: "contain",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           backgroundColor: "lightgray 50%"
//         }}
//       ></Box>
//       <Box
//         sx={{
//           bgcolor: "rgba(255, 255, 255, 1)",
//           // backgroundColor: "lightgray 50%",
//           py: 1.25,
//           px: 2.5
//         }}
//       >
//         <Typography variant="title_S" mb={0.5}>
//           {props.title}
//         </Typography>
//         <Typography variant="body_M" display="block">
//           {props.description}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }
