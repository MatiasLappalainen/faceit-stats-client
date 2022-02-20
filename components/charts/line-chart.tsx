import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const StatsChart = ({ data }: { data: any[] }) => {
  const [dataKey, setDataKey] = useState<string>("kills");

  return (
    <Paper sx={{ padding: "1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="period-select-label">Period</InputLabel>
        <Select
          labelId="period-select-label"
          id="period-select"
          label="Period"
          name="period"
          onChange={(e) => setDataKey(e.target.value as string)}
        >
          <MenuItem value={"kills"}>Kills</MenuItem>
          <MenuItem value={"kd"}>k/d</MenuItem>
          <MenuItem value={"kr"}>k/r</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="green" />
              <stop offset="66%" stopColor="green" />
              <stop offset="66%" stopColor="red" />
              <stop offset="100%" stopColor="red" />
            </linearGradient>
          </defs>
          <XAxis dataKey="id" />
          {(dataKey === "kd" || dataKey === "kr") && (
            <ReferenceLine
              y={dataKey === "kd" ? 1 : 0.8}
              label="1"
              strokeDasharray="3 3"
            />
          )}
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="url(#colorUv)"
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
