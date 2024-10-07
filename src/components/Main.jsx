/* eslint-disable no-unused-vars */
import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function Main() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Grid container spacing={3}> {/* Adjust the spacing value for desired space */}
        <Grid xs={6}>
          <div>
            <h2>سبتمبر 4:20 | 10 2024</h2>
            <h1>القاهرة</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي حتي صلاة العصر</h2>
            <h1>00:10:20</h1>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white", opacity: "0.2" }} />

      {/* Prayers Cards */}
      <Stack direction='row' justifyContent={"space-around"} style={{ marginTop: "50px" }}>
        <Prayer name="الفجر" time="04-0" img={"https://cdn.pixabay.com/photo/2018/09/28/19/07/islamic-3710002_640.jpg"} />
         <Prayer name="الشروق" time="04-0" img={"https://images.pexels.com/photos/2349168/pexels-photo-2349168.jpeg?auto=compress&cs=tinysrgb&w=400"} />
        <Prayer name="الظهر" time="04-10" img={"https://images.pexels.com/photos/2087389/pexels-photo-2087389.jpeg?auto=compress&cs=tinysrgb&w=400"} />
        <Prayer name="العصر" time="04-10" img={"https://cdn.pixabay.com/photo/2024/03/05/19/38/ai-generated-8615178_640.jpg"} />
        <Prayer name="المغرب" time="04-10" img={"https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?auto=compress&cs=tinysrgb&w=400"} />
        <Prayer name="العشاء" time="04-10" img={"https://images.pexels.com/photos/12598938/pexels-photo-12598938.jpeg?auto=compress&cs=tinysrgb&w=400"} />
      </Stack>

      {/* Select City Section */}
      <Stack direction='row' justifyContent={"center"} marginTop={"50px"}>
        <FormControl style={{ width: "25%" }}>
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
