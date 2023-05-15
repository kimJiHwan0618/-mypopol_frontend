const pie1 = {
  series: [80, 20],
  options: {
    chart: {
      // width: 380,
      height: '100%',
      type: 'donut',
    },
    colors: ['rgb(49, 130, 206)', 'rgb(99, 179, 237)'],
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: true,
          },
        },
      },
    ],
    legend: {
      // position: 'right',
      offsetY: 0,
      // height: 500,
      enabled: false,
      show: false,
    },
  },
};
const pie2 = {
  series: [55, 45],
  options: {
    chart: {
      // width: 380,
      height: '100%',
      type: 'donut',
    },
    colors: ['rgb(49, 151, 149)', 'rgb(79, 209, 197)'],
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: true,
          },
        },
      },
    ],
    legend: {
      // position: 'right',
      offsetY: 0,
      // height: 500,
      enabled: false,
      show: false,
    },
  },
};
const pie3 = {
  series: [80, 20],
  options: {
    chart: {
      // width: 380,
      height: '100%',
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['rgb(221, 107, 32)', 'rgb(246, 173, 85)'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: true,
          },
        },
      },
    ],
    legend: {
      // position: 'right',
      offsetY: 0,
      // height: 500,
      enabled: false,
      show: false,
    },
  },
};
const pie4 = {
  series: [60, 40],
  options: {
    chart: {
      // width: 380,
      height: '100%',
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['rgb(128, 90, 213)', 'rgb(183, 148, 244)'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: true,
          },
        },
      },
    ],
    legend: {
      // position: 'right',
      offsetY: 0,
      // height: 500,
      enabled: false,
      show: false,
    },
  },
};
const pie5 = {
  series: [80, 20],
  options: {
    chart: {
      // width: 380,
      height: '100%',
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['rgb(213, 90, 90)', 'rgb(244, 148, 148)'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: true,
          },
        },
      },
    ],
    legend: {
      // position: 'right',
      offsetY: 0,
      // height: 500,
      enabled: false,
      show: false,
    },
  },
};

const barChart = {
  series: [
    {
      name: '배터리 용량',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: '배터리 온도',
      data: [76, 85, 60, 98, 87, 95, 91, 100, 94],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        // text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return '$ ' + val + ' thousands';
    //     },
    //   },
    // },
  },
};

export { pie1, pie2, pie3, pie4, pie5, barChart };
