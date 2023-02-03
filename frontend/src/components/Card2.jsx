import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Grid from '@mui/joy/Grid';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import AspectRatio from '@mui/joy/AspectRatio';
import Navbar from './Navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  // textAlign: 'center',
  color: theme.vars.palette.text.tertiary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const styles = {
  cardContainer: {
      backgroundImage: `url(${"https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"})`,
      backgroundSize: "100%"

  },
  ourCard : {
    background : "rgba(255, 255, 255, 0.3)"
  }
};
export default function BasicCard(props) {
  const getUserStoreData = useSelector((data) => data.userReducer);
  const [deafultData, setDeafultData] = useState(null);
  const [test, setTest] = useState(null);
  var reversedArray = null;
  const getWeather = (data) => {
    if(getUserStoreData.value !== null){
      setDeafultData({
        data : getUserStoreData.value.weather
      })
    }else{
      setDeafultData(data);
      // await axios.get('http://localhost:2929/getWeather').then((respnse) => {
      // }).catch((e) => {
      //   console.log(e);
      // });
    }
  }
  if(deafultData !== null){
    reversedArray = [...deafultData.data[0].weather].reverse();
  }

  
useEffect(()=>{
  getWeather(props.data)
  console.log("props.data: ",props.data)
},[props.data])
// console.log('test',test)

  useEffect(() => {
    getWeather()
  },[getUserStoreData])
  return (
    <>
      <Navbar />
        <Grid style={styles.cardContainer} container rowSpacing={1} sx={{ width: '100%' }}>
          {
            deafultData !== null ?
            reversedArray.map((data, index) => {
              return(
                <Grid xs={4} >
                    <Item>
                      <Card style={styles.ourCard}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {data.query.location.name}
                        </Typography>
                        <Typography variant='' component="p">
                          {`${data.query.location.country}(${data.query.location.region})`}
                        </Typography>
                        <Typography >
                          {data.query.current.condition.text}
                        </Typography>
                        <Typography >
                          {`Wind : ${data.query.current.wind_kph} km/h`}
                        </Typography>
                        <Typography  sx={{ mb: 1.5 }}>
                          {`Humidity : ${data.query.current.humidity}`}
                        </Typography>
                        <Grid container justifyContent="space-between">
                        <Typography variant="h1">
                          {`${data.query.current.temp_c} ℃`}
                        </Typography>
                        <AspectRatio ratio="1" sx={{ minWidth: 115 }}>
                        <img
                          src={`${data.query.current.condition.icon}`}
                          srcSet={`${data.query.current.condition.icon}`}
                          alt={"item.title"}
                        />
                      </AspectRatio>
                      </Grid>
                      <Button >
                        Delete
                      </Button>
                      </CardContent>
                      <CardActions>
                      </CardActions>
                    </Card></Item>
                </Grid>
              )
            }): 'Record not found.'
          }
        </Grid>
    </>
  );
}