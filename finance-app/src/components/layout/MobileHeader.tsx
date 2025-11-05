'use client';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';

const MobileHeader = () => {
    const pathname = usePathname();
    const title = pathname.split('/').pop()?.replace('-', ' ') || 'Overview';

    return (
        <AppBar position="fixed" color="inherit" elevation={1} sx={{ display: { xs: 'block', md: 'none' } }}>
            <Toolbar>
                <Typography variant="h6" sx={{ textTransform: 'capitalize', flexGrow: 1 }}>
                    {title}
                </Typography>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default MobileHeader;
