import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const CheatingTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      // 🔥 FORCE FULL URL (for debugging)
      const res = await axios.get("http://localhost:5000/api/exam-logs");

      console.log("DATA:", res.data);

      setLogs(res.data || []);
    } catch (err) {
      console.error("ERROR:", err.response || err);
    }
  };

  if (!logs || logs.length === 0) {
    return (
      <Typography color="#94a3b8">
        No data available
      </Typography>
    );
  }

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Exam Name</TableCell>
            <TableCell sx={{ color: "#fff" }}>Student Name</TableCell>
            <TableCell sx={{ color: "#fff" }}>Violation Count</TableCell>
            <TableCell sx={{ color: "#fff" }}>Violation Type</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {logs.map((log, i) => (
            <TableRow key={i}>
              <TableCell sx={{ color: "#cbd5e1" }}>
                {log.examName}
              </TableCell>

              <TableCell sx={{ color: "#cbd5e1" }}>
                {log.studentName}
              </TableCell>

              <TableCell sx={{ color: "#cbd5e1" }}>
                {log.violationCount}
              </TableCell>

              <TableCell sx={{ color: "#cbd5e1" }}>
                {log.violationTypes?.join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CheatingTable;