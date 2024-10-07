/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import { Grid2 } from "@mui/material";

export default function Main() {
  // States
  let [timings, setTimings] = useState({});
  let [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });

  let availableCities = [
    {
      displayName: "القاهرة",
      apiName: "Cairo",
    },
    {
      displayName: "الإسكندرية",
      apiName: "Alexandria",
    },
    {
      displayName: "الجيزة",
      apiName: "Giza",
    },
    {
      displayName: "الأقصر",
      apiName: "Luxor",
    },
    {
      displayName: "أسوان",
      apiName: "Aswan",
    },
    {
      displayName: "برلين",
      apiName: "Berlin",
    },
    {
      displayName: "شتوتغارت",
      apiName: "Stuttgart",
    },
    {
      displayName: "ميونخ",
      apiName: "Munich",
    },
    {
      displayName: "هامبورغ",
      apiName: "Hamburg",
    },
    {
      displayName: "فرانكفورت",
      apiName: "Frankfurt",
    },
  ];

  let [today,setToday] = useState('');

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/07-10-2024?country=&city=${selectedCity.apiName}`
    )
      .then((resp) => resp.json())
      .then((data) => setToday(data.data.date.readable));
  }, [selectedCity]);


  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/07-10-2024?country=&city=${selectedCity.apiName}`
    )
      .then((resp) => resp.json())
      .then((data) => setTimings(data.data.timings));
  }, [selectedCity]);

  const handleCityChange = (event) => {
    let cityObject = availableCities.find(
      (city) => city.apiName === event.target.value
    );
    setSelectedCity(cityObject);
  };

  return (
    <>
      <Grid2 container spacing={100}>
        {" "}
        {/* Adjust the spacing value for desired space */}
        <Grid2 xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1> {/* Display selected city */}
          </div>
        </Grid2>
        <Grid2 xs={6}>
          <div>
            <h2>متبقي حتي صلاة العصر</h2>
            <h1>00:10:20</h1>
          </div>
        </Grid2>
      </Grid2>
      <Divider style={{ borderColor: "white", opacity: "0.2" }} />

      {/* Prayers Cards */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          img={
            "https://cdn.pixabay.com/photo/2018/09/28/19/07/islamic-3710002_640.jpg"
          }
        />
        <Prayer
          name="الشروق"
          time={timings.Sunrise}
          img={
            "https://images.pexels.com/photos/2349168/pexels-photo-2349168.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          img={
            "https://images.pexels.com/photos/2087389/pexels-photo-2087389.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          img={
            "https://cdn.pixabay.com/photo/2024/03/05/19/38/ai-generated-8615178_640.jpg"
          }
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          img={
            "https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          img={
            "https://images.pexels.com/photos/12598938/pexels-photo-12598938.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
        />
      </Stack>

      {/* Select City Section */}
      <Stack direction="row" justifyContent={"center"} marginTop={"50px"}>
        <FormControl style={{ width: "25%" }}>
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity.apiName}
            onChange={handleCityChange}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem key={city.apiName} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
