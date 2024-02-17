import { useNavigate } from "react-router-dom";
import "./subheader.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Subheader = ({text,route}) =>{
  const navigate = useNavigate();
  return (
    <div className="SubHeader">
      <div className="container">
        <div className="content">
          <div className="back-button" onClick={e=>navigate(route)}>
            <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
          </div>
          <div className="heading">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
