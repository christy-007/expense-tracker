import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { v4 as uuid } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Dashboard() {
  const navigate = useNavigate();
  const [openAddExpense, setopenAddExpense] = useState(false);
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: moment(),
    description: "",
    category: "Health",
    amount: 0,
  });
  const [mode, setMode] = useState("add");
  const [deleteMode, setDeleteMode] = useState({
    status: false,
    _id: "",
  });

  useEffect(() => {
    const flag = localStorage.getItem("login");
    if (!flag) {
      navigate("/login");
    }
  }, []);

  return (
    <Box p={2} border="1px solid black">
      <Box>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <TextField placeholder="Search by name..." />

          <TextField placeholder="Search by Date in DD.MM.YYYY" />

          <Button
            onClick={() => setopenAddExpense(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Expense
          </Button>
        </Box>
        <br />

        <Dialog fullWidth open={openAddExpense}>
          <DialogTitle>
            {mode === "add" ? <>Create New Expense</> : <>Edit Expense</>}
          </DialogTitle>
          <DialogContent>
            <label for="name">name</label>
            <br></br>
            <TextField
              fullWidth
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
            <br />
            <br />
            <label for="date">Date Of Expense</label>
            <br></br>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                format="DD.MM.YYYY"
                value={formData.date}
                onAccept={(value) =>
                  setFormData({
                    ...formData,
                    date: value,
                  })
                }
                fullWidth
              />
            </LocalizationProvider>
            <br />
            <br />

            <label for="description">Description</label>
            <br></br>
            <TextField
              type="text"
              fullWidth
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
            <br />
            <br />
            <label for="category">Category</label>
            <br></br>
            <Select
              value={formData.category}
              fullWidth
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            >
              <MenuItem value={"Health"}>Health</MenuItem>
              <MenuItem value={"Electronics"}>Electronics</MenuItem>
              <MenuItem value={"Education"}>Education</MenuItem>
              <MenuItem value={"Books"}>Books</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
            <br />
            <br />
            <label for="amount">Amount</label>
            <br></br>
            <TextField
              fullWidth
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                if (mode === "edit") {
                  setMode("add");
                }
                setFormData({
                  name: "",
                  date: moment(),
                  description: "",
                  category: "Health",
                  amount: 0,
                });
                setopenAddExpense(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (mode === "add") {
                  const payload = {
                    ...formData,
                    _id: uuid(),
                    date: moment(),
                    updated: moment(),
                  };
                  setRows((prev) => [...prev, payload]);
                } else {
                  const newState = rows.map((obj) => {
                    if (obj._id === formData._id) {
                      return { ...formData };
                    }
                    return obj;
                  });

                  setRows(newState);
                }
                setopenAddExpense(false);
                setFormData({
                  name: "",
                  date: moment(),
                  description: "",
                  category: "Health",
                  amount: 0,
                });
              }}
            >
              {mode === "add" ? <>Add</> : <>Edit</>}
            </Button>
          </DialogActions>
        </Dialog>

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Date Of Expense</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Updated At</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">
                      {moment(row.date).format("DD.MM.YYYY")}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">
                      {moment(row.updated).format("DD.MM.YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      {
                        <Box>
                          <Button
                            onClick={() => {
                              setMode("edit");
                              setFormData({
                                name: row.name,
                                date: row.date,
                                description: row.description,
                                category: row.category,
                                amount: row.amount,
                                _id: row._id,
                              });
                              setopenAddExpense(true);
                            }}
                            startIcon={<EditIcon />}
                          ></Button>
                          <Button
                            onClick={() => {
                              setDeleteMode({
                                status: true,
                                _id: row._id,
                              });
                            }}
                            startIcon={<DeleteIcon />}
                          ></Button>
                        </Box>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Dialog open={deleteMode.status}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>Are you sure Want to delete?</DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setDeleteMode({
                  status: false,
                  _id: "",
                });
              }}
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const updateValues = rows.filter((each) => {
                  return each._id !== deleteMode._id;
                });
                setRows(updateValues);
                setDeleteMode({
                  status: false,
                  _id: "",
                });
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Dashboard;
