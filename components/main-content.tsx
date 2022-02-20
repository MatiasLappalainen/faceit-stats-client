import { useState } from "react";
import { MatchTable } from "./table";

export const Content = ({ initialItems }: { initialItems: Match[] }) => {
  return initialItems && <MatchTable items={initialItems} />;
};

export default Content;
