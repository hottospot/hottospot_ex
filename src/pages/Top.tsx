import { useNavigate } from "react-router-dom";

import Background from "../layout/home/Background";
import Title from "../layout/home/Title";

function Top() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/map")}>
      <div
        style={{
          position: "absolute",
          top: "12rem",
          right: 0,
          left: 0,
          margin: "0 auto",
        }}
      >
        <Title />
      </div>
      <Background />
    </div>
  );
}

export default Top;
