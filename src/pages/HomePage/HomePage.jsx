import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import {Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip} from 'recharts';
import {getChartData, saveToLocalStorage} from "./utils";
import {DEFAULT_SELECT_OPTION, LOCAL_STORAGE_KEY, SELECT_OPTIONS} from "./constants";
import {useNavigate} from "react-router-dom";
import {Content, PageContainer, SelectContainer, SelectWrapper} from "./components";
import {DataContext} from "../../App";

export const HomePage = () => {
  const loadedSelectOptionId = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [selectValue, setSelectValue] = useState(loadedSelectOptionId
    ? SELECT_OPTIONS.find(item => item.value === loadedSelectOptionId)
    : DEFAULT_SELECT_OPTION);

  useEffect(() => {
    if (!loadedSelectOptionId) {
      saveToLocalStorage(DEFAULT_SELECT_OPTION.value);
    }
  }, []);

  const navigate = useNavigate();

  const handleSelectChange = (selectOption) => {
    setSelectValue(selectOption);
    saveToLocalStorage(selectOption.value);
  }

  const handleFactoryAClick = useCallback((data, index) => {
    navigate(`/details/1/${index + 1}`);
  }, [navigate]);

  const handleFactoryBClick = useCallback((data, index) => {
    navigate(`/details/2/${index + 1}`);
  }, [navigate]);

  const parsedData = useContext(DataContext);

  const chartData = useMemo(() => getChartData(parsedData, selectValue), [parsedData, selectValue]);

  return (
    <PageContainer>
      <SelectContainer>
        <span>
          Фильтр по типу продукции
        </span>
        <SelectWrapper
          options={SELECT_OPTIONS}
          defaultValue={selectValue}
          onChange={handleSelectChange}
        />
      </SelectContainer>
      <Content>
        <BarChart
          data={chartData}
          height={400}
          width={800}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="factoryA"
            fill="#fb0200"
            name="Фабрика А"
            onClick={handleFactoryAClick}
          />
          <Bar
            dataKey="factoryB"
            fill="#0001fa"
            name="Фабрика Б"
            onClick={handleFactoryBClick}
          />
        </BarChart>
      </Content>
    </PageContainer>
  )
};
