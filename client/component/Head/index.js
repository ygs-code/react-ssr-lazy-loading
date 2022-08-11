/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 19:08:39
 * @FilePath: /react-loading-ssr/client/component/Head/index.js
 * @Description:
 */
import React from "react";
import PropTypes from "prop-types";
import { mapRedux } from "@/redux";
import "./index.less";

function Index(props) {
  const { state: { baseInitState: { weather = {} } = {} } = {} } = props;

  const { city, province, casts = [] } = weather;

  // const menu = useMemo(() => {}, []);
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
}
Index.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  state: PropTypes.object
};
export default mapRedux()(Index);
