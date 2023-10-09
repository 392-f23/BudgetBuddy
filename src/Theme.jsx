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
            secondary: "#1E1E1E",
            1: "#FEFEE3",
        },
        primary: {
            main: "#4C956C",
            1: "#2C6E49",
            2: "#FEFEE3",
            3: "#FFC9B9",
            4: "#D68C45",
            5: "#26382F",
        }
    },
    breakpoints: {
        values: {...breakpoints},
        unit: "px",
    },
    typography: {
        h1: {
            fontFamily: "Lato",
            fontSize: "2.3rem",
            fontWeight: 900,
        },
        h2: {
            fontFamily: "Lato",
            fontSize: "1.8rem",
            fontWeight: 900,
        },
        h3: {
            fontFamily: "Lato",
            fontSize: "1.4rem",
            fontWeight: 900,
        },
        h4: {
            fontFamily: "Lato",
            fontSize: "1.3rem",
            fontWeight: 700,
        },
        h5: {
            fontFamily: "Lato",
            fontSize: "1.2rem",
            fontWeight: 500,
        },
        h6: {
            fontFamily: "Lato",
            fontSize: "1.1rem",
            fontWeight: 500,
        },
        body1: {
            fontFamily: "Lato",
            fontSize: "1rem",
            fontWeight: 500,
        },
    }
});