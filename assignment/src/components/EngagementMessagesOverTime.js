import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import { messageCountList, channels } from "./JsonData";
import DarkUnica from "highcharts/themes/dark-unica";

const EngagementMessagesOverTime = () => {
  useEffect(() => DarkUnica(Highcharts), []);

  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
