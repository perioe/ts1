import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DELIVERY_FEE_LIMIT = 50000;
const Main = () => {
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [list, setList] = useState();
  const [doColor, setDoColor] = useState("black");
  const [ovColor, setOoColor] = useState("black");

  const nv = useNavigate();

  const makeList = (data) => {
    const result = data.map((item) => {
      return (
        <div
          key={item.id}
          style={{
            display: "flex",
            gridTemplateColumns: "100px 200px 140px",
            gap: "10px",
            padding: "10px",
          }}
          onClick={() => {
            nv(`/detail/${item.id}`);
          }}
        >
            <div>{item.rank}</div>
            <div><img src={"/images/" + item.imageUrl} alt=""/></div>
            <div>{item.title}</div>
            <div>{item.singer}</div>
        </div>
      );
    });
    return result;
  };

  useEffect(() => {
    const value = total > DELIVERY_FEE_LIMIT ? 0 : 3000;
    setDelivery(value);
  }, [total]); // total 값이 변하면 실행됨

  //axios
  useEffect(() => {
    setDoColor('red');
    getList("domestic");
  }, []);//최초에만 실행됨

  function getList(type) {
    axios.get("http://localhost:3001/v1/chart/" + type).then((respose) => {
        console.log(respose?.data);
        if (respose?.data?.chartList) {
          const listData = respose?.data?.chartList;
          setList(makeList(listData));
        }
      });
      
      if (type === "domestic") {
        setDoColor('red');
        setOoColor('black');
      }
      else  {
        setDoColor('black');
        setOoColor('red');
      }
      
  }

  function getCurrentDate() {
    const a = new Date();
    const y = a.getFullYear(); 
    const m = a.getMonth() + 1;
    const d = a.getDate();
    const e = a.getHours();

    return y + "년 " + m +  "월 " + d + "일 " + e + ":00";
  }

  return (
    <div style={{ width: "480px", margin: "auto", border: "1px solid" }}>
      <div style={{ border: "1px solid", textAlign: "center", padding: "10px" }} >
        음악차트
        <br/>
        <span>{getCurrentDate()}</span>
      </div>
      <div style={{ display: "flex"}}>
          <div style={{ width: "50px", color: doColor}} onClick={() => {
            getList("domestic");
          }}>국내</div>
          <div style={{ width: "50px", color: ovColor}} onClick={() => {
            getList("overseas");
          }}>해외</div>
      </div>
      <div>{list}</div>
      
    </div>
  );
};

export default Main;
