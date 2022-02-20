import {
  Paper,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { subtractMonth, toDateTimeFormat } from "../utils/date";

interface FiltersProps {
  onSubmit(filters: FiltersState): Promise<void>;
}

export interface FiltersState {
  from: string;
  to: string;
  period?: number;
}

export const Filters = ({ onSubmit }: FiltersProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    from: toDateTimeFormat(subtractMonth(new Date(), 1)),
    to: toDateTimeFormat(new Date()),
  });

  useEffect(() => {
    if (!filters.period) return;
    setFilters({
      ...filters,
      from: toDateTimeFormat(subtractMonth(new Date(), filters.period)),
    });
  }, [filters.period]);

  type FiltersChangeEvent =
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent<string>;

  const onChange = ({ target }: FiltersChangeEvent) =>
    setFilters({
      ...filters,
      [target.name]: target.value,
    });

  return (
    <Paper sx={{ margin: "1rem 0", padding: "1rem" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center" }}
        spacing={2}
        component="form"
      >
        <TextField
          id="datetime-local"
          name="from"
          label="Start date"
          type="datetime-local"
          value={filters.from}
          onChange={onChange}
          sx={{ maxWidth: 350, width: "100%" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="datetime-local"
          name="to"
          label="End date"
          type="datetime-local"
          value={filters.to}
          sx={{ maxWidth: 350, width: "100%" }}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="period-select-label">Period</InputLabel>
          <Select
            labelId="period-select-label"
            id="period-select"
            label="Period"
            name="period"
            onChange={onChange}
          >
            <MenuItem value={1}>Last month</MenuItem>
            <MenuItem value={3}>Last three months</MenuItem>
            <MenuItem value={6}>Last six months</MenuItem>
            <MenuItem value={12}>Last year</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ maxWidth: 350, width: "100%", height: "100%" }}
          onClick={() => onSubmit(filters)}
        >
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};
