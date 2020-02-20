import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Icon } from "antd";
import { connect } from "react-redux";

class SimpleTable extends React.Component {
  render() {
    const {getData, isLoading } = this.props;
    return (
      <Paper >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Favourites</TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>IFSC</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Bank ID</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData.map(row => {
              if (row.isSelected) {
                return (
                  <TableRow>
                    <TableCell>
                      <Icon type="star" theme="filled" />
                    </TableCell>
                    <TableCell>{row.bank_id}</TableCell>
                    <TableCell>{row.ifsc}</TableCell>
                    <TableCell>{row.branch}</TableCell>
                    <TableCell>{row.bank_id}</TableCell>
                    <TableCell>{row.address}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  getData: state.simpleReducer.FirstData,
  isLoading: state.simpleReducer.isLoading
});

export default connect(
  mapStateToProps,
  null
)(SimpleTable);
