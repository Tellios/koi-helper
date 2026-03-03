import * as React from 'react';
import { AreaChart, ResponsiveContainer, XAxis, YAxis, Area, Tooltip } from 'recharts';

import { useAppState } from '@app/state';
import { t } from '@app/i18n';
import { formatDate } from '@app/ui';

export const MeasurementsGraphView: React.FC = () => {
  const { measurements } = useAppState();

  if (measurements.length < 2) {
    return null;
  }

  const data = measurements
    .map((m) => ({
      date: formatDate(m.date),
      length: m.length,
      weight: m.weight,
    }))
    .reverse();

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <Area dataKey="length" stroke="#78CAD2" fill="#78CAD2" fillOpacity={0.7} />
        <Area dataKey="weight" stroke="#357266" fill="#357266" fillOpacity={0.7} />
        <XAxis
          dataKey="date"
          padding={{
            right: 8,
          }}
        />
        <YAxis
          padding={{
            top: 8,
          }}
        />
        <Tooltip
          formatter={(value, name) => {
            return [
              value,
              name === 'weight' ? t.measurement.weightLabel : t.measurement.lengthLabel,
            ];
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
