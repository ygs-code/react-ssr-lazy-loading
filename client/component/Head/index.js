/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-15 13:01:26
 * @FilePath: /react-ssr-lazy-loading/client/component/Head/index.js
 * @Description:
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { mapRedux } from "client/redux";
import "./index.less";
import { getWeather } from "client/assets/js/request/requestApi";
const Index = (props) => {
  const { state: { head: { weather = {} } = {} } = {} } = props;
  useEffect(() => {
    if (Object.keys(weather).length === 0) {
      Index.getInitPropsState();
    }
  }, []);
  const { city, province, casts = [] } = weather;
  return (
    <div className=" head-box">
      <div className="head center-box">
        <dl>
          <dt>
            {province}-{city}
          </dt>

          {casts.map((item, index) => {
            const {
              date,
              nighttemp,
              daytemp,
              nightpower,
              nightweather,
              dayweather
            } = item;
            return (
              <dd key={index}>
                <div>
                  日期：
                  {date}
                </div>
                <div>
                  气温：
                  {nighttemp}~{daytemp}
                </div>
                <div>无持续风向：{nightpower}级</div>
                <div>{nightweather}</div>
                <div>
                  {dayweather}转{nightweather}
                </div>
              </dd>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

Index.getInitPropsState = async (props = {}) => {
  const {
    dispatch: { head: { setWeather } = {} } = {},
    match: { params: { page = 1, size = 10 } = {} } = {}
  } = props;

  return await getWeather({
    key: "2d935fc56c5f9ab2ef2165822cedff56",
    city: "440300",
    extensions: "all"
  })
    .then((data) => {
      setWeather({
        weather: data.forecasts[0]
      });
      return data;
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
};

Index.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  state: PropTypes.object
};
export default mapRedux()(Index);
