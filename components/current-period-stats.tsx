import { Stack, Paper, Typography } from "@mui/material";
import { useMemo } from "react";

export const CurrentPeriodStats = ({ items }: { items: Match[] }) => {
  const getKd = useMemo(() => {
    const kills = items.reduce((a, b) => a + b.kills, 0);
    const deaths = items.reduce((a, b) => a + b.deaths, 0);

    return (kills / deaths).toPrecision(2);
  }, [items]);

  const getKr: string = useMemo(() => {
    const kills = items.reduce((a, b) => a + b.kills, 0);
    const rounds = items.reduce((a, b) => a + b.rounds, 0);

    return (kills / rounds).toPrecision(2);
  }, [items]);

  const getHS: string = useMemo(() => {
    const kills = items.reduce((a, b) => a + b.kills, 0);
    const headshots = items.reduce((a, b) => a + b.headshots, 0);

    return ((headshots / kills) * 100).toPrecision(2);
  }, [items]);

  const getWin: string = useMemo(() => {
    const win = items.reduce((a, b) => a + b.win, 0);

    return ((win / items.length) * 100).toPrecision(2);
  }, [items]);

  return (
    <Stack direction="row" spacing={2}>
      <Paper sx={{ padding: "1rem 2rem" }}>
        <Typography variant="caption">k/d</Typography>
        <Typography variant="h3" color={Number(getKd) > 1 ? "green" : "red"}>
          {getKd}
        </Typography>
        <Typography variant="caption">(reference 1)</Typography>
      </Paper>
      <Paper sx={{ padding: "1rem 2rem" }}>
        <Typography variant="caption">k/r</Typography>
        <Typography variant="h3" color={Number(getKr) > 0.8 ? "green" : "red"}>
          {getKr}
        </Typography>
        <Typography variant="caption">(reference 0.8)</Typography>
      </Paper>
      <Paper sx={{ padding: "1rem 2rem" }}>
        <Typography variant="caption">hs%</Typography>
        <Typography variant="h3" color={Number(getHS) > 60 ? "green" : "red"}>
          {getHS}
        </Typography>
        <Typography variant="caption">(reference 60)</Typography>
      </Paper>
      <Paper sx={{ padding: "1rem 2rem" }}>
        <Typography variant="caption">win%</Typography>
        <Typography variant="h3" color={Number(getWin) > 60 ? "green" : "red"}>
          {getWin}
        </Typography>
        <Typography variant="caption">(reference 60)</Typography>
      </Paper>
    </Stack>
  );
};

export default CurrentPeriodStats;
