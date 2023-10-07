import { createTheme } from "@mui/material";

const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
};

export const theme = createTheme({
    palette: {
        text: {
            primary: "#000000",
            secondary: "#000000",
            1: "#FEFEE3",
        },
        primary: {
            main: "#2C6E49",
            1: "#4C956C",
            2: "#FEFEE3",
            3: "#FFC9B9",
            4: "#D68C45",
        }
    },
    breakpoints: {
        values: {...breakpoints},
        unit: "px",
    },
});