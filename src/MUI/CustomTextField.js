import { TextField, styled } from '@mui/material';

export const CustomTextField = styled(TextField)({
    '& label': {
        transformOrigin: "right !important",
        left: "inherit !important",
        right: "1.75rem !important",
        fontSize: "small",
        color: "#807D7B",
        fontWeight: 400,
        overflow: "unset"
    },
    "& legend": {  textAlign: "right", },
});