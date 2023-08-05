//format date as date-month "10-Oct"
export const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let d = new Date(date).getDate();
  let m = new Date(date).getMonth();

  return `${d}-${months[m]}`;
};

//get Date range for x-axis
export const getDatesList = (list) => {
  const date_list = [];

  for (
    let i = +list[0]?.split("-")[0];
    i <= +list[list.length - 1]?.split("-")[0];
    i += 1
  ) {
    date_list.push(`${i}-${list[0]?.split("-")[1]}`);
  }

  return date_list;
};

//filter data if channelId have messages for more than 1 dates
export const filtered_data_check = (sorted_channel_data) => {
  let object = {};

  sorted_channel_data?.forEach((obj) => {
    object = {
      ...object,
      [obj?.channelId]: !object[obj?.channelId]
        ? 1
        : object[obj?.channelId] + 1,
    };
  });

  Object.keys(object).forEach((key) => {
    if (object[key] <= 1) delete object[key];
  });

  const filtered_data = sorted_channel_data?.filter((obj) =>
    Object.keys(object)?.includes(obj?.channelId)
  );

  return filtered_data;
};

//get series data in format ["10-oct",count]
export const getHighightedSpots = (dates_list, marked_spots) => {
  const list = [];

  dates_list.forEach((elem) => {
    let existing_value = [];

    marked_spots.forEach((array) => {
      if (array[0] === elem) {
        existing_value = array;
      }
    });

    if (existing_value?.length) {
      list.push(existing_value);
    } else {
      list.push([elem, 0]);
    }
  });

  return list;
};
