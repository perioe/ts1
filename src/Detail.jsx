import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Detail = () => {
  const param = useParams();
  console.log("param", param);

  const nv = useNavigate();

  const [list, setList] = useState();

  const makeList = (data) => {
    return (
      <div>
        <div
          style={{ border: "1px solid", textAlign: "center", padding: "10px" }}
        >
          {data.title}
          <br/>
          {data.singer}
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "210px 210px",
              gap: "20px",
            }}
          >
            <div style={{ textAlign: "right" }}>작사</div>
            <div style={{ textAlign: "left" }}>
              {data.lyricist}
            </div>
            <div style={{ textAlign: "right" }}>작곡</div>
            <div style={{ textAlign: "left" }}>{data.melodizer}</div>
            <div style={{ textAlign: "right" }}>장르</div>
            <div style={{ textAlign: "left" }}>{data.genre}</div>
          </div>
        </div>
      </div>
    );
  };

  //axios
  useEffect(() => {
    console.log(1);
    axios.get(`http://localhost:3001/v1/chart/detail/${param.id}`).then((respose) => {
      console.log(respose?.data);
      if (respose?.data?.chart) {
        const listData = respose?.data?.chart;
        setList(makeList(listData));
      }
    });
  }, []);

  return (
    <div style={{ width: "480px", margin: "auto", border: "1px solid" }}>
      <div
        style={{ padding: "10px" }}
        onClick={() => {
          nv("/");
        }}
      >
        <img src="/images/back_arrow.png" alt=""/>
      </div>
      {list}
    </div>
  );
};

export default Detail;
