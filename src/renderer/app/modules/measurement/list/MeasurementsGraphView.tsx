import * as React from "react";
import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Tooltip
} from "recharts";

import { useAppState } from "app/state";
import { t } from "app/i18n";
import { formatDate } from "app/ui";

export const MeasurementsGraphView: React.FC = () => {
  const {
    state: { measurements }
  } = useAppState();

  const data = measurements
    .map(m => ({
      date: formatDate(m.date),
      length: m.length,
      weight: m.weight
    }))
    .reverse();

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data}>
        <Area
          dataKey="length"
          stroke="#2196f3"
          fill="#2196f3"
          fillOpacity={0.3}
        />
        <Area
          dataKey="weight"
          stroke="#3f51b5"
          fill="#3f51b5"
          fillOpacity={0.3}
        />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            return [
              value,
              name === "weight"
                ? t.measurement.weightLabel
                : t.measurement.lengthLabel
            ];
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
