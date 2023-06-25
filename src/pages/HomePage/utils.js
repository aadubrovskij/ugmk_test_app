import {ALL_OPTIONS_ID, LOCAL_STORAGE_KEY, MONTHS_NAMES} from "./constants";

const isNumber = (value) => typeof value === 'number' && isFinite(value);

const parseMonth = (dateString) => {
  const parts = dateString.split('/');
  const currentDateString = [
    parts[1],
    parts[0],
    parts[2],
  ].join('/');
  return new Date(currentDateString).getMonth();
}

export const parseData = (data) => {
  const resultObj = {
    1: {
      product1: Array(12).fill(0),
      product2: Array(12).fill(0),
    },
    2: {
      product1: Array(12).fill(0),
      product2: Array(12).fill(0),
    },
  };

  data.forEach((item) => {
    // Поскольку мы ВИДИМО не можем доверять данным и можем получить null килограмм и пустую дату - делаем проверки

    if (!item.date) {
      return;
    }
    const productMonth = parseMonth(item.date);
    const product1Value = item.product1;
    const product2Value = item.product2;
    if (isNumber(product1Value)) {
      resultObj[item.factory_id].product1[productMonth] += product1Value;
    }
    if (isNumber(product2Value)) {
      resultObj[item.factory_id].product2[productMonth] += product2Value;
    }
  }, resultObj);

  return resultObj;
}

export const getChartData = (parsedData, selectValue) => {
  const monthsArray = Array(12).fill(null);

  return monthsArray.map((item, index) => {
    const obj = {};

    switch (selectValue.value) {
      case 'product1': {
        obj.factoryA = (parsedData[1].product1[index]) / 1000;
        obj.factoryB = (parsedData[2].product1[index]) / 1000;
        break;
      }
      case 'product2': {
        obj.factoryA = (parsedData[1].product2[index]) / 1000;
        obj.factoryB = (parsedData[2].product2[index]) / 1000;
        break;
      }
      case ALL_OPTIONS_ID:
      default: {
        obj.factoryA = (parsedData[1].product1[index] + parsedData[1].product2[index]) / 1000;
        obj.factoryB = (parsedData[2].product1[index] + parsedData[2].product2[index]) / 1000;
        break;
      }
    }

    obj.name = MONTHS_NAMES[index];

    return obj;
  });
}

export const saveToLocalStorage = (value) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, value);
}