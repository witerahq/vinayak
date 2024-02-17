import './appointments.scss';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button, Chip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import SettingsIcon from '@mui/icons-material/Settings';
import WeekTabsModal from './modal';
import { fetchAppointmentsDoctor } from '../../../actions/bookingActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Wm Halvorson', 'Online', '550', '9 Aug', 'Checked', 'View', 'Actions'),
    createData('Wm Halvorson', 'Online', '550', '9 Aug', 'Checked', 'View', 'Actions'),
    createData('Wm Halvorson', 'Online', '550', '9 Aug', 'Checked', 'View', 'Actions'),
    createData('Wm Halvorson', 'Online', '550', '9 Aug', 'Checked', 'View', 'Actions'),
    createData('Wm Halvorson', 'Online', '550', '9 Aug', 'Checked', 'View', 'Actions'),

];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Patients',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Booked by',
    },
    {
        id: 'mode',
        numeric: false,
        disablePadding: false,
        label: 'Mode',
    },
    {
        id: 'pay',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'date_time',
        numeric: false,
        disablePadding: false,
        label: 'Time',
    },
    {
        id: 'Status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



export default function Appointments() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('time');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const bookingFromStore = useSelector((state) => {
        console.log(state)
        return state.booking.appointments
    })
    const [booking, setBooking] = React.useState(bookingFromStore || [])
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!bookingFromStore)
            dispatch(fetchAppointmentsDoctor())
    }, [bookingFromStore])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - booking.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(booking, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <div className="Appointments">
            <div className="container">
                <div className="header">
                    <p>Appointments List</p>
                    <Button onClick={() => setIsModalOpen(true)} variant="text"><SettingsIcon style={{ marginRight: '4px' }} /> Appointment slots</Button>

                </div>
                <WeekTabsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}></WeekTabsModal>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={booking.length}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">

                                                </TableCell>
                                                <TableCell
                                                    className='name'
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.patientName?row.patientName:row.patientId.fullName}
                                                </TableCell>
                                                <TableCell
                                                    className='name'
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.patientId.fullName}
                                                </TableCell>
                                                <TableCell className='mode'>{row.mode}</TableCell>
                                                <TableCell className='pay' >{moment(row.date).format('MMMM, Do YYYY')}</TableCell>
                                                <TableCell className='time' >
                                                    {/* <Button variant='contained' sx={{background:'#D9EBF2',color:'black'}}>{row.carbs}</Button> */}
                                                    <Chip label={row.time} color="primary" />
                                                </TableCell>
                                                <TableCell className='status' >{row.status}</TableCell>
                                                {/* <TableCell className='records'> 
                                                <Button variant="outlined" size='small' style={{ borderRadius: 50 }}>View</Button> 
                                                <Chip label="View" color="primary" variant="outlined" />

                                                </TableCell> */}

                                                <TableCell className='actions' align='left'>
                                                    <ChatBubbleOutlineIcon htmlColor='#464F53' sx={{ marginRight: '10px', display:'none' }}></ChatBubbleOutlineIcon>
                                                    <a href={"https://wa.me/"+(row.patientPhoneNumber?row.patientPhoneNumber:row.patientId.phoneNumber)}>
                                                        <WhatsAppIcon htmlColor='#25D366'></WhatsAppIcon>
                                                    </a>
                                                    {/* <EdgesensorHighIcon htmlColor='#464F53'></EdgesensorHighIcon> */}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={booking.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                </Box>
            </div>
        </div>
    );
}