import { Button, Typography, message } from "antd";
import { GeoLocation } from "../../types";
import React from "react";
import { checkInAttendanceApi } from "../../apis/attendance";
import Webcam from "react-webcam";
interface Props {
  onSuccess: () => void;
}

export const CheckInForm: React.FC<Props> = ({ onSuccess }) => {
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const [location, setLocation] = React.useState<GeoLocation>({
    lat: 0,
    long: 0,
  });
  const [loader, setLoader] = React.useState(false);
  // const body: CheckInAttendanceBody = { latitude: 0, longitude: 0 };
  const fetchLocation = () => {
    if (window !== undefined) {
      // check is location is allowed
      //   const status = window.navigator.permissions.query("geolocation");
      window.navigator.geolocation.getCurrentPosition(
        (a) => {
          setLocation({ lat: a.coords.latitude, long: a.coords.longitude });
        },
        (e) => {
          console.log("Error", e);
        }
      );
    }
  };
  React.useEffect(() => {
    fetchLocation();
  }, []);
  const submitRequest = () => {
    if (!imgSrc) {
      message.warning("ok");
      return;
    }

    setLoader(true);
    // console.log(imgSrc);
    // return;
    const obj = {
      image: imgSrc,
      latitude: location.lat,
      longitude: location.long,
    };
    checkInAttendanceApi(obj)
      .then(() => {
        // console.log(a);
        message.success("Marked success");
        onSuccess();
      })
      .catch((e) => {
        console.log("Error", e);
      })
      .finally(() => setLoader(false));
  };
  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);
  return (
    <>
      <Typography.Text>{`Location - Latitude - ${location.lat} : Longitude - ${location.long}`}</Typography.Text>
      <Button
        type="text"
        onClick={() => fetchLocation()}
        disabled={location.lat && location.long ? true : false}
      >
        Fetch location
      </Button>

      {imgSrc ? (
        <>
          <img src={imgSrc} />
        </>
      ) : (
        <Webcam
          // scrolling={false}
          style={{ maxWidth: "100%" }}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}
      {imgSrc ? (
        <>
          <Button danger type="text" onClick={() => setImgSrc(null)}>
            Clear image
          </Button>
        </>
      ) : (
        <Button type="text" onClick={capture}>
          Capture image
        </Button>
      )}
      <Button
        disabled={!imgSrc || !location.lat || !location.long}
        loading={loader}
        onClick={() => submitRequest()}
      >
        Submit
      </Button>
    </>
  );
};
