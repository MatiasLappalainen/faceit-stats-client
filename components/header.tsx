import { AppBar, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

export const Header = () => (
  <AppBar position="static" color="inherit">
    <Container>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Link href="/" passHref>
            <Typography
              component="h1"
              sx={{
                fontWeight: "500",
                fontSize: "22px",
                p: "7px",
                color: "text.primary",
              }}
            >
              Faceit-tracker
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Container>
  </AppBar>
);

export default Header;
