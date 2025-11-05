'use client';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';

const navItems = [
  { label: 'Overview', value: '/overview', icon: <HomeOutlinedIcon /> },
  { label: 'Transactions', value: '/transactions', icon: <SyncAltOutlinedIcon /> },
  { label: 'Budgets', value: '/budgets', icon: <PieChartOutlineOutlinedIcon /> },
  { label: 'Pots', value: '/pots', icon: <SavingsOutlinedIcon /> },
  { label: 'Recurring', value: '/recurring-bills', icon: <EventRepeatOutlinedIcon /> },
];

const BottomNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        router.push(newValue);
    };
  
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={pathname}
                onChange={handleChange}
                sx={{ backgroundColor: 'var(--color-White)'}}
            >
                {navItems.map((item) => (
                    <BottomNavigationAction 
                        key={item.value}
                        label={item.label} 
                        value={item.value} 
                        icon={item.icon}
                        sx={{
                            color: 'var(--color-Grey500)',
                            '&.Mui-selected': {
                                color: 'var(--color-Grey900)'
                            }
                        }}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
