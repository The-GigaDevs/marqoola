// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://marqoola.com" target="_blank" underline="hover">
            marqoola.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://marqoola.com" target="_blank" underline="hover">
            &copy; marqoola.com
        </Typography>
    </Stack>
);

export default AuthFooter;
