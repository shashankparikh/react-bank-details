import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHeading from "./TableHeading/tableHeading";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Icon } from "antd";
import { connect } from "react-redux";
import { simpleAction } from "../../../../actions/simpleAction";
import { saveStar } from "../../../../actions/saveStarAction";
import { removeStar } from "../../../../actions/removeStarAction";
import {
  LoaderComponent,
  Loader,
  InputContainer,
  SelectElement,
  SearchElement,
  Banks
} from "./style";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  formControl: {
    // margin: theme.spacing(5),
    minWidth: 180
  }
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    dataArr: "",
    open: false,
    city: ""
  };

  handleChange = event => {
    let value = event.target.value;
    this.setState({ city: value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderTableData = data => {
    const { rows, rowsPerPage, page } = this.state;

    let emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, i) => {
        return (
          <TableRow>
            {!row.isSelected ? (
              <TableCell>
                <Icon
                  type="star"
                  theme="outlined"
                  onClick={() => this.savedStar(row, i)}
                />
              </TableCell>
            ) : (
              <TableCell>
                <Icon
                  type="star"
                  theme="filled"
                  onClick={() => this.removedStar(row, i)}
                />
              </TableCell>
            )}
            <TableCell>{row.bank_name}</TableCell>
            <TableCell>{row.ifsc}</TableCell>
            <TableCell>{row.branch}</TableCell>
            <TableCell>{row.bank_id}</TableCell>
            <TableCell>{row.address}</TableCell>
          </TableRow>
        );
      });
  };

  savedStar = (data, i) => {
    this.props.saveStar(i);
  };

  removedStar = (data, i) => {
    this.props.removeStar(i);
  };

  componentDidMount() {
    this.props.simpleAction();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.fetchData(nextProps.getData);
    }
  }

  fetchData = data => {
    let arr = JSON.parse(JSON.stringify(data));
    this.setState({ dataArr: arr });
  };

  filteredData = e => {
    let val = e.target.value;
    const { getData } = this.props;
    let arr = JSON.parse(JSON.stringify(getData));
    let newArr = arr.filter((item, i) => item.bank_name.indexOf(val) > -1);
    this.setState({ dataArr: newArr });
  };

  render() {
    const { classes, getData, isLoading } = this.props;
    const { rows, rowsPerPage, page, dataArr, open, city } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, getData.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
        <Banks>Banks</Banks>
          <InputContainer>
            <SelectElement>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Select City
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={city}
                  onChange={this.handleChange}
                >
                  <MenuItem value={10}>Udaipur</MenuItem>
                  <MenuItem value={10}>Mumbai</MenuItem>
                  <MenuItem value={20}>Delhi</MenuItem>
                  <MenuItem value={30}>Bangalore</MenuItem>
                  <MenuItem value={30}>Chennai</MenuItem>
                </Select>
              </FormControl>
            </SelectElement>
            <SearchElement>
              <TextField
                id="standard-basic"
                label="Search By Bank Name"
                onChange={this.filteredData}
              />
            </SearchElement>
          </InputContainer>

          <Table className={classes.table}>
            <TableHeading />

            <TableBody>
              {dataArr ? (
                this.renderTableData(dataArr)
              ) : (
                <LoaderComponent>
                  <Loader />
                </LoaderComponent>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={5}
                  count={getData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  saveStar: data => dispatch(saveStar(data)),
  removeStar: data => dispatch(removeStar(data))
});

const mapStateToProps = state => ({
  getData: state.simpleReducer.FirstData,
  isLoading: state.simpleReducer.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomPaginationActionsTable));
