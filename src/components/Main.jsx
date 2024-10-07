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
import moment from "moment";
import "moment/dist/locale/ar-dz";

moment.locale("ar");

export default function Main() {
  // States
  let [today, setToday] = useState("");
  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);

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

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/07-10-2024?country=&city=${selectedCity.apiName}`
    )
      .then((resp) => resp.json())
      .then((data) => setTimings(data.data.timings));

    const t = moment();
    setToday(t.format("MMM Do YYYY | hh:mm"));
  }, [selectedCity]);

  const [remainingTime, setRemainingTime] = useState("");

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);

    // Now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDifference = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDifference;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const handleCityChange = (event) => {
    let cityObject = availableCities.find(
      (city) => city.apiName === event.target.value
    );
    setSelectedCity(cityObject);
  };

  return (
    <>
      <Grid2 container spacing={100}>
        {/* Adjust the spacing value for desired space */}
        <Grid2 xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1> {/* Display selected city */}
          </div>
        </Grid2>
        <Grid2 xs={6}>
          <div>
            <h2>
              متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}
            </h2>
            <h1>{remainingTime}</h1>
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
            {availableCities.map((city) => (
              <MenuItem key={city.apiName} value={city.apiName}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
