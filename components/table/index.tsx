import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  TableFooter,
  Typography,
} from "@mui/material";
import TablePaginationActions from "./pagination-controls";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

const header = [
  "map",
  "date",
  "kills",
  "assists",
  "deaths",
  "headshots",
  "triple",
  "quadro",
  "penta",
  "rounds",
  "win",
];

type Map =
  | "de_dust2"
  | "de_mirage"
  | "de_nuke"
  | "de_vertigo"
  | "de_ancient"
  | "de_overpass"
  | "de_inferno";

const getMap = (map: Map) => {
  const baseUrl = "https://static.wikia.nocookie.net/cswikia/images";
  if (map === "de_mirage") {
    return baseUrl + "/1/1e/CSGO_Mirage_latest_version.jpg";
  }

  if (map === "de_dust2") {
    return baseUrl + "/4/42/Dust2_asite1.png";
  }

  if (map === "de_inferno") {
    return baseUrl + "/f/f0/Inferno.jpg";
  }

  if (map === "de_ancient") {
    return baseUrl + "/9/94/De_ancient.png";
  }

  if (map === "de_nuke") {
    return baseUrl + "/9/93/CSGO_Nuke_22_Nov_2019_update_picture_1.jpg";
  }

  if (map === "de_overpass") {
    return baseUrl + "/6/6e/Csgo-de-overpass.png";
  }

  if (map === "de_vertigo") {
    return baseUrl + "/a/a5/Vertigo-b-site-overview.png";
  }
};

const getCell = (type: string, match: Match) => {
  if (type === "map") {
    return (
      <TableCell align="left" sx={{ padding: "0" }}>
        <Box
          component="img"
          sx={{ maxHeight: "60px", height: "100%" }}
          src={getMap(match.map as Map)}
        />
      </TableCell>
    );
  }

  // en-GB is selected here to keep en as main locale,
  // until other languages are supported
  if (type === "date") {
    return (
      <TableCell align="center">
        {new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
          new Date(match[type])
        )}
      </TableCell>
    );
  }

  if (type === "win") {
    return (
      <TableCell align="center">
        {match.win ? (
          <Typography color="green">Win</Typography>
        ) : (
          <Typography color="red">Lose</Typography>
        )}
      </TableCell>
    );
  }
  return <TableCell align="center">{match[type as keyof Match]}</TableCell>;
};

// TODO: Virtualize
export const MatchTable = ({ items }: { items: Match[] }) => {
  return (
    <Paper>
      <TableContainer sx={{ maxHeight: "350px" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {header.map((el) => (
                <TableCell key={el} align="center">
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((match) => (
              <TableRow key={match.match_id}>
                {header.map((el) => getCell(el, match))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Table;
