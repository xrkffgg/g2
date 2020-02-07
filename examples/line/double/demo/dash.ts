import { Chart } from '@antv/g2';

const second = 1000;
const minute = 1000 * 60;
const hour = 60 * minute;
const day = 24 * hour;

function toInteger(number, fix = 1) {
  if (Math.round(number) === number) {
    return '' + number;
  }
  return '' + Number(number).toFixed(fix);
}

function humanizeDuration(duration, fix = 1) {
  if (duration === 0) {
    return '0';
  }
  if (duration < minute) {
    return toInteger(duration / second, fix) + ' 秒';
  }
  if (duration < hour) {
    return toInteger(duration / minute, fix) + ' 分';
  }
  if (duration < day) {
    return toInteger(duration / hour, fix) + '小时';
  }
  return toInteger(duration / hour / 24, fix) + ' 天';
}

function pick(originData, field) {
  return originData.map((item) => {
    const result = {};
    for (const key in item) {
      if (item.hasOwnProperty(key) && field.indexOf(key) !== -1) {
        result[key] = item[key];
      }
    }
    return result;
  });
}

const data = [
  { date: 1489593600000, pv: 17, successRate: 0.23529411764705882, time: 12351000, count: 4 },
  { date: 1489680000000, pv: 10, successRate: 0.6, time: 18000, count: 6 },
  { date: 1489766400000, pv: 3, successRate: 0, time: 0, count: 0 },
  { date: 1489852800000, pv: 3, successRate: 0, time: 0, count: 0 },
  { date: 1489939200000, pv: 18, successRate: 0.2222222222222222, time: 21157000, count: 4 },
  { date: 1490025600000, pv: 32, successRate: 0.25, time: 3543000, count: 8 },
  { date: 1490112000000, pv: 25, successRate: 0.56, time: 10000, count: 14 },
  { date: 1490198400000, pv: 23, successRate: 0.43478260869565216, time: 24000, count: 10 },
  { date: 1490284800000, pv: 7, successRate: 0.2857142857142857, time: 0, count: 2 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(pick(data, ['pv', 'time', 'date']));
chart.scale({
  date: {
    alias: '日期',
    type: 'time',
  },
  pv: {
    alias: '进入次数',
    min: 0,
    sync: true,
    nice: true,
  },
  time: {
    alias: '平均时长',
    formatter: (value) => {
      return humanizeDuration(value, 0);
    },
    sync: true,
    nice: true,
  },
  count: {
    alias: '次数',
  },
});
chart.axis('time', {
  grid: null,
});
chart.axis('pv', {
  title: {},
});
chart.tooltip({
  showCrosshairs: true,
  shared: true,
});
chart
  .line()
  .position('date*pv')
  .color('#4FAAEB');
chart
  .line()
  .position('date*time')
  .color('#9AD681')
  .style({
    lineDash: [4, 4],
  });
chart.render();