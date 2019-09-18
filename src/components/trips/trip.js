import React from "react";

const trip = () => {
  useEffect(() => {
    getTrip();
    // eslint-disable-next-line
  }, []);
  getTrip = async () => {
    const res = await fetch("/logs");
    const data = await res.json();
    console.log(data);
  };
  return <div />;
};

export default trip;
