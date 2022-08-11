import React, { useEffect } from "react";
import "./index.less";

function Index(props) {
  const { columns = [], dataSource = [], rowKey } = props;

  return (
    <div className="table">
      <dl>
        <dt>
          <ul>
            {columns.map((item, index) => {
              const { title } = item;
              return <li key={`${index}_${rowKey || ""}`}>{title}</li>;
            })}
          </ul>
        </dt>
        <dd>
          {dataSource.map((item, index) => {
            const { title } = item;
            return (
              <ul key={`${index}_${rowKey || ""}`}>
                {columns.map(($item, $index) => {
                  const { key, render } = $item;
                  return (
                    <li key={`${index}_${$index}_${rowKey || ""}`}>
                      {render ? render(item[key], item, index) : item[key]}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </dd>
      </dl>
    </div>
  );
}

export default Index;
