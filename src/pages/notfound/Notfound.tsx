import { useMemo } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();
  const duration = useMemo(() => 3000, []);
  const [timeDescending, setTimeDescending] = useState<number>(duration / 1000);
  const timeInterval = useMemo(() => {
    return setInterval(() => {
      setTimeDescending((prevState) => prevState - 1);
    }, 1000);
  }, []);
  useMemo(() => {
    return setTimeout(() => {
      clearInterval(timeInterval);
      navigate("/", { replace: true });
    }, duration);
  }, []);

  return (
    <Container>
      <div className="box__notfound">
        <div>
          <img
            className="error__404"
            src={require("../../assets/images/404.png")}
            alt=""
          />
          <div className="text-center">
            <p className="fw-bold fs-5">
              Trang bạn truy cập không đúng, {timeDescending} giây nữa tự động
              trở về trang chủ
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
