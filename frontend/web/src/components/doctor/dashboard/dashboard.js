import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import './dashboard.scss';
import Logo from '../../../assets/logo.svg';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Insights from '../insight/insight';
import Appointments from '../appointments/appointments';
import Profile from '../../profile/profile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PaymentIcon from '@mui/icons-material/Payment';
import MedicationIcon from '@mui/icons-material/Medication';
import PatientCard from '../prescriptions';
import ChatRoom from '../../chatroom';
import Payments from '../payments/payments';
import Patients from '../patient/patient';
import ForumIcon from '@mui/icons-material/Forum';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../actions/userActions';
import { Avatar } from '@mui/material';
import Records from '../../records';
import { fetchPrescriptions } from '../../../actions/prescriptionActions';
import { fetchAppointmentsDoctor } from '../../../actions/bookingActions';
import { getPayments } from '../../../actions/paymentActions';
import AddSymptoms from '../addSymptoms/addSymptoms';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import BookingDetail from '../../patient/booking-detail/booking-detail';
import MedicalRecords from '../../medical-records/medical-records';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `0px`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(

    ({ theme, open }) => ({

        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
        width: '0px',
        [theme.breakpoints.up('sm')]: {
            width: '84px',
        },
    }),
);

const sideNav = [
    { name: 'Dashboard', route: '', icon: <DashboardIcon /> },
    { name: 'Appointments', route: 'appointments', icon: <InsertInvitationIcon /> },
    { name: 'Patients', route: 'patients', icon: <AccessibleIcon /> },
    // { name: 'Chat', route: 'chat', icon: <ForumIcon /> },
    { name: 'Prescriptions', route: 'prescriptions', icon: <MedicationIcon /> },
    { name: 'Payments', route: 'payments', icon: <PaymentIcon /> },
    { name: 'Add symptoms', route: 'addSymptoms', icon: <ManageSearchIcon /> },

];


export default function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const userFromStore = useSelector((state) => {
        console.log(state, 'state from profile')
        return state?.user?.user
    });

    const [user, setUser] = React.useState(userFromStore || {});

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!userFromStore) {
            dispatch(getCurrentUser());
        }
    }, [userFromStore]);

    const callDispatch = (value) => {
        switch (value.name) {
            case 'Dashboard':
                dispatch(fetchAppointmentsDoctor())
                dispatch(getCurrentUser())
            case 'Appointments':
                dispatch(fetchAppointmentsDoctor())
            case 'Patients':
                dispatch(fetchAppointmentsDoctor())
            // case 'Chat':
            //   return { route: 'chat', icon: <ForumIcon /> };
            case 'Prescriptions':
                dispatch(fetchPrescriptions());
            case 'Payments':
                dispatch(getPayments())
          }
    }

    return (
        <div className="Dashboard">
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box component="main" className="dashboard-components" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/" element={<Insights />} />
                        <Route path="appointments" element={<Appointments />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="prescriptions" element={<PatientCard />} />
                        <Route path="chat" element={<ChatRoom />} />
                        <Route path="patients" element={<Patients />} />
                        <Route path="appointment/:id" element={<BookingDetail />} />
                        <Route path="medical-records/:id" element={<MedicalRecords />} />
                        <Route path="payments" element={<Payments />} />
                        <Route path="record" element={<Records />} />
                        <Route path="addSymptoms" element={<AddSymptoms />} />
                        <Route path="record/:id" element={<Records />} />
                    </Routes>
                </Box>
            </Box>
        </div>
    );
}
