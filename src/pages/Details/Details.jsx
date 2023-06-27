import React, { useContext, useMemo } from 'react';
import { useParams, Navigate } from "react-router-dom";
import {PageContainer, ChartContainer, Header} from "./components";
import {DataContext} from "../../App";
import {PieChart, Pie, Cell, Legend} from 'recharts';
import {COLORS, FACTORY_LABEL} from "./constants";
import {MONTHS_NAMES} from "../HomePage/constants";

export const Details = ({id}) => {
  const { month } = useParams();
  const parsedId = +`${id}`;
  const parsedMonth = +`${month}`;

  const parsedData = useContext(DataContext);

  const chartData = useMemo(() => [
      {
        name: 'Продукт 1',
        value: parsedData[parsedId].product1[parsedMonth - 1],
      },
      {
        name: 'Продукт 2',
        value: parsedData[parsedId].product2[parsedMonth - 1],
      },
    ], [parsedData, parsedId]);

  if (parsedMonth < 1 || parsedMonth > 12) {
    return (
      <Navigate to='/' replace />
    )
  }

  const factoryLabel = FACTORY_LABEL[id];
  const monthText = MONTHS_NAMES[parsedMonth - 1];

  return (
    <PageContainer>
      <Header>Статистика по продукции фабрики {factoryLabel} за {monthText}</Header>
      <ChartContainer>
        <PieChart width={400} height={400}>
          <Legend />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </PageContainer>
  )
};
