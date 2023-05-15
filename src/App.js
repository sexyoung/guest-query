import { useState } from "react";

import data from "./data.json"
import './App.css';


const filerList = (keyword) => {
  const result = data.filter((item) => {
    return item.name.includes(keyword) || item.table.includes(keyword);
  });
  return result;
}

const getSameTableList = (name, tid) => {
  const result = data.filter((item) => {
    return item.tid === tid && item.name !== name;
  });
  return result;
}

const Guest = ({ guest }) => (
  <div className="guest">
    <div className="info">
      <span className="table">{guest.table}</span>
      <span className="name">
        {guest.cookie &&
          <span className={`cookie ${guest.cookie === '中' ? 'c': 'w'}`}>{guest.cookie}</span>
        }
        {guest.name}
      </span>
    </div>
    <div className="relationship">
      {guest.relationship}
    </div>
  </div>
);

function App() {
  const [keyword, setKeyword] = useState("");
  const handleChange = ({ target: {value}}) => {
    setKeyword(value);
  }

  const list = filerList(keyword);

  const sameTableList = list.length === 1 ? getSameTableList(list[0].name, list[0].tid) : [];

  return (
    <div className="App">
      <div className="title">賓客查詢</div>
      <div className='p20'>
        <input
          className='input'
          placeholder='輸入姓名或桌名'
          value={keyword}
          onChange={handleChange}
        />
      </div>
      {keyword.trim() ?
          <div className="p20">
            {list.length ?
              <>
                <strong>查詢結果</strong>
                {list.map((guest, i) =>
                  <Guest {...{ guest }} key={i} />
                )}
              </>
              : "查無資料"
            }
            {list.length === 1 &&
              <div className="py20 same-table">
                <strong>同桌者</strong>
                {sameTableList.map((guest, i) =>
                  <Guest {...{ guest }} key={i} />
                )}
              </div>
            }
          </div>:
        ""
      }
    </div>
  );
}

export default App;
