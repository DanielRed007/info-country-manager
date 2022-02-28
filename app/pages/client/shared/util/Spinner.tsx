import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export const getSpinner = () => (
    <Stack sx={{ color: 'grey.500', display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
        <CircularProgress size={100} color="inherit" />
    </Stack>
);