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
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { removeWeather, getUser } from '../state/reducers/userReducer';
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
      minHeight : "1000px",
      // backgroundImage: `url(${"https://i1.wp.com/myengineeringprojects.in/wp-content/uploads/2020/02/travel.png?fit=774%2C541&ssl=1"})`,
      backgroundImage: `url(${"https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"})`,
      backgroundSize: "100%",
      backgroundRepeat  : 'no-repeat',
      backgroundPosition: 'center'

  },

  headingStyle : {
    margin: 'auto',
    marginLeft : '0'
  },
  ourCard : {
    background : "rgb(0 0 0 / 48%)",
    border: '2px #93b1e7 solid'
  }
};
export default function BasicCard(props) {
  const dispatch = useDispatch();
  const getUserStoreData = useSelector((data) => data.userReducer);
  const [deafultData, setDeafultData] = useState(null);
  const getWeather = async (data) => {
    if(getUserStoreData.value !== null){
      setDeafultData({
        data : getUserStoreData.value.weather
      })
    }else{
      
      await axios.get('http://localhost:2929/getWeather').then((response) => {
        console.log(response);
        setDeafultData(response.data);
      }).catch((e) => {
        console.log(e);
      });
    }
  }

  useEffect(() => {
    getWeather()
  },[getUserStoreData])

  const deleteWeather = (index) => {
    dispatch(removeWeather({index : index, token : localStorage.getItem('token')}))
  }

  return (
    <>
      <Navbar />
        {/* <Grid style={styles.cardContainer} container rowSpacing={1} sx={{ width: '100%' }}> */}
        <Grid container rowSpacing={1} sx={{ width: '100%' }} style={ styles.cardContainer }>
          {
            deafultData !== null ?
            deafultData.data[0].weather.map((data, index) => {
              return(
                <Grid xs={12} md={4} >
                    <Item>
                      <Card style={styles.ourCard}>
                      <CardContent>
                        <Typography variant="" component="h5">
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
                        <Typography variant="h3" style={styles.headingStyle}>
                          {`${data.query.current.temp_c} ℃` }
                        </Typography>
                        <AspectRatio ratio="1" sx={{ minWidth: 115 }}>
                        <img
                          src={`${data.query.current.condition.icon}`}
                          srcSet={`${data.query.current.condition.icon}`}
                          alt={"item.title"}
                        />
                      </AspectRatio>
                      </Grid>
                      {
                        localStorage.getItem('token') ?
                          <Button variant="contained" onClick={ (e) =>  {deleteWeather(index)}}>
                          Delete
                          </Button>
                        :
                        ''
                      }
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