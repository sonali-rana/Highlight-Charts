import {
  formatDate,
  getDatesList,
  filtered_data_check,
  getHighightedSpots,
} from "./common";

//function to return chart options
const returnChartOptions = (messageCountList, channels) => {
  let dates = [];

  //format date as date-month "10-Oct" in JSON data for easy mapping
  const newMessageCountList = messageCountList?.map((obj) => {
    const date = formatDate(obj?.timeBucket);

    if (!dates.includes(date)) dates = [...dates, date];
    dates.sort();

    return { ...obj, timeBucket: date };
  });

  //get Date range for x-axis
  const dates_list = getDatesList(dates);

  //filter channel Ids from channels json
  const channel_ids = channels.map((channel) => channel?.id);

  //filter data where messageCountList have simmilar channel id in channels JSON
  const sorted_channel_data = newMessageCountList?.filter((obj) => {
    if (channel_ids?.includes(obj?.channelId)) return obj;
    else return null;
  });

  //filter data if channelId have messages for more than 1 dates
  const filtered_data = filtered_data_check(sorted_channel_data);

  // series data in format ["10-oct",count]
  const marked_spots = filtered_data?.map((obj) => [
    obj?.timeBucket,
    +obj?.count,
  ]);

  //added series data as 0 for dates which are not present in filtered data
  const highlighted_spots = getHighightedSpots(dates_list, marked_spots);

  const options = {
    chart: {
      type: "spline",
      style: {
        fontFamily: "Arial",
      },
    },

    tooltip: {
      formatter: function () {
        const { name, y } = this.point.options;
        return y !== 0
          ? `${this.point.series.name}<br />${y} messages on ${name}`
          : false;
      },
      borderWidth: 2,
      borderColor: "#2B908F",
      borderRadius: 5,
    },

    title: {
      text: "",
    },

    xAxis: {
      categories: dates_list,
    },

    yAxis: {
      title: {
        text: "",
      },
    },

    series: [
      {
        name: "general",
        data: highlighted_spots,
      },
    ],
  };

  return options;
};

const EngagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) =>
    returnChartOptions(messageCountList, channels),
};

export default EngagementHelper;
