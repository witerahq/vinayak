import "./patient.scss";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsDoctor } from "../../../actions/bookingActions";
import moment from "moment";
import { createSearchParams, useNavigate } from "react-router-dom";
import Subheader from "../../sub-header/subheader";
import noAppointmentImage from "../../../assets/no-appointments.avif";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

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
  createData(
    "Wm Halvorson",
    "Online",
    "550",
    "9 Aug",
    "Checked",
    "View",
    "Actions"
  ),
  createData(
    "Wm Halvorson",
    "Online",
    "550",
    "9 Aug",
    "Checked",
    "View",
    "Actions"
  ),
  createData(
    "Wm Halvorson",
    "Online",
    "550",
    "9 Aug",
    "Checked",
    "View",
    "Actions"
  ),
  createData(
    "Wm Halvorson",
    "Online",
    "550",
    "9 Aug",
    "Checked",
    "View",
    "Actions"
  ),
  createData(
    "Wm Halvorson",
    "Online",
    "550",
    "9 Aug",
    "Checked",
    "View",
    "Actions"
  ),
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
  return order === "desc"
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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Patients",
  },
  {
    id: "age",
    numeric: false,
    disablePadding: true,
    label: "Age",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: true,
    label: "Gender",
  },
  {
    id: "mode",
    numeric: false,
    disablePadding: false,
    label: "Mode",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "date_time",
    numeric: false,
    disablePadding: false,
    label: "Date & Time",
  },

  {
    id: "medical_records",
    numeric: false,
    disablePadding: false,
    label: "Medical records",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Patients() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
        selected.slice(selectedIndex + 1)
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

  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.

  const bookingFromStore = useSelector((state) => {
    console.log(state);
    return state.booking.appointments;
  });
  const [booking, setBooking] = React.useState(bookingFromStore || []);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!bookingFromStore) dispatch(fetchAppointmentsDoctor());
  }, [bookingFromStore]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(booking, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const gotoRecords = (item) => {
    console.log("item", item);
    if (item?.medicalRecords?.length) {
      // navigate(')
      navigate({
        pathname: "/dashboard/record/" + item.medicalRecords,
        search: createSearchParams({
          id: item._id,
          name: item?.patientId?.fullName,
          age: item.patientId.age,
          gender: item.patientId.gender,
          image: item.patientId.image,
          patientId: item.patientId._id,
        }).toString(),
      });
    } else {
      navigate({
        pathname: "/dashboard/record",
        search: createSearchParams({
          id: item._id,
          name: item?.patientId?.fullName,
          age: item.patientId.age,
          gender: item.patientId.gender,
          image: item.patientId.image,
          patientId: item.patientId._id,
        }).toString(),
      });
    }
    console.log("records", item);
  };

  return (
    <>
      <Subheader text={"Patients list"} route={"/dashboard/"}></Subheader>
      <div className="Patients">
        <div className="container">
          {bookingFromStore?.length ? (
            bookingFromStore?.map((item, index) => {
              return (
                <Card className="booking-card">
                  <CardHeader
                    className="header"
                    subheader={
                      <>
                        <div className="date">
                          <IconButton color="primary">
                            <CalendarTodayIcon fontSize="small" />
                          </IconButton>
                          <p>{moment(item?.date).format("Do MMM YY")}</p>
                        </div>
                        <div className="time">
                          <IconButton color="primary">
                            <AccessTimeIcon fontSize="small" />
                          </IconButton>
                          <p>{item?.time}</p>
                        </div>
                      </>
                    }
                  />
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="doctor-detail"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ width: 50, height: 50 }}>
                        {item?.patientId?.fullName?.slice(0, 1) +
                          item?.patientId?.fullName?.split(" ")[1]?.slice(0, 1)}
                      </Avatar>
                      <div style={{ marginLeft: "10px" }}>
                        <Typography variant="body1" color="textPrimary">
                          {item.patientId.fullName}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="gender"
                          color="textSecondary"
                        >
                          {item.patientId.gender}
                        </Typography>
                      </div>
                    </div>
                    <Chip label={item.status} color="primary" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                    className="checkout-type"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton color="primary">
                        <a href={"https://wa.me/" + item.patientId.phoneNumber}>
                          <WhatsAppIcon/>
                        </a>
                        <a href={"tel:" + item.patientId.phoneNumber}>
                          <PhoneIcon />
                        </a>
                      </IconButton>
                    </div>
                    <Button
                      variant="text"
                      color="primary"
                      sx={{ fontSize: 14, textTransform: "unset" }}
                      endIcon={<KeyboardArrowRightIcon />}
                      onClick={(e) =>
                        navigate("/dashboard/medical-records/" + item?._id)
                      }
                    >
                      Medical Records
                    </Button>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="no-appointments">
              <div className="image">
                <img src={noAppointmentImage} alt="" />
              </div>
              <p>No patients available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
