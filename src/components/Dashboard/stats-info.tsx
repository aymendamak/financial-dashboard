import React, { useEffect } from "react";
import StatsCard from "../Card/stats-card";
import { Stats } from "../../models/stats";

const StatsData = () => {
  const [statsData, setStatsData] = React.useState<Stats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/v1/stats");
      const data = await response.json();
      setStatsData(data);
    };
    fetchData();
  });

  return (
    <>
      {statsData.map((data) => (
        <StatsCard
          title={data.title}
          value={data.value.toString()}
          pillText="2.75%"
          trend={data.trend}
          period="From Jan 1st - Jul 31st"
        />
      ))}
    </>
  );
};

export default StatsData;
