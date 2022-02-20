import type { NextPage } from "next";
import qs from "qs";
import { useState } from "react";
import { Filters, FiltersState } from "../components/filters";
import { MatchTable } from "../components/table";
import { StatsChart } from "../components/charts/line-chart";
import { Stack } from "@mui/material";
import CurrentPeriodStats from "../components/current-period-stats";

interface HomeProps {
  initialItems: Match[];
  error: unknown;
}

const Home: NextPage<HomeProps> = ({ initialItems, error }) => {
  const [items, setItems] = useState<Match[]>(initialItems);

  const handleFiltersSubmit = async (filters: FiltersState) => {
    delete filters.period;

    const query = qs.stringify(filters);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/matches?` + query
      );
      const json = await res.json();

      setItems(json.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <Stack spacing={2}>
        <Filters onSubmit={handleFiltersSubmit} />
        {items && <MatchTable items={items} />}
        {items && <CurrentPeriodStats items={items} />}
        {items && (
          <StatsChart
            data={items.map((el, i) => ({
              kills: el.kills,
              id: i + 1,
              kd: (el.kills / el.deaths).toPrecision(2),
              kr: (el.kills / el.rounds).toPrecision(2),
            }))}
          />
        )}
      </Stack>
    </main>
  );
};

export const getServerSideProps = async () => {
  try {
    const query = qs.stringify({
      limit: 1000,
      skip: 0,
      from: "2022-02-16",
      to: "2022-02-19",
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/matches?${query}`
    );
    const json = await res.json();
    return {
      props: {
        initialItems: json.items,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        error: err,
      },
    };
  }
};

export default Home;
