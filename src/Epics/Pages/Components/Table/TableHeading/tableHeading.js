import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";

export const tableHeading = () => {
  return (
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
  );
};

export default tableHeading;
