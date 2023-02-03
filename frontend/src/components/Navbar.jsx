import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { addWeather, logout } from '../state/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid rgb(0 0 0 / 48%)',
  borderRadius : '5px',
  boxShadow: 24,
  p: 2,

  forAnchor : {
    textDecoration: 'none',
    color: '#ffffff',
  }
};
const buttonStyle = {
  color : 'white',
  marginLeft : 45
}

const settings = ['Logout'];
const theme = createTheme({
    palette: {
      primary: {
        main: "#026ca0"
      },
      secondary: {
        main: '#026ca0',
      },
    }

    // backgroundColor: "#3178bd"
  });

export default function Navbar() {
  const [getCityName, setGetCityName] = useState({
    cityName : ''
  })
  const getDataFromStor = useSelector((data) => data.userReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear('token');
    dispatch(logout());
    navigate('/');
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addWeatherHandle = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if(!formData.get('cityName')){
      alert('City not provided please select city name.')
    }else if(formData.get('cityName')){
      let passObject = {
        cityName : formData.get('cityName'),
        token : localStorage.getItem('token')
      }
      dispatch(addWeather(passObject));
      setOpen(false)
    }
  }

  const cities = [
    { label :"Abbottabad" },
    { label :"Adezai" },
    { label :"Ali Bandar"  },
    { label :"Amir Chah" },
    { label :"Attock" },
    { label :"Ayubia" },
    { label :"Bahawalpur"  },
    { label :"Baden"},
    { label :"Bagh" },
    { label :"Bahawalnagar" },
    { label :"Burewala"},
    { label :"Banda Daud Shah"},
    { label :"Bannu district|Bannu"},
    { label :"Batagram"},
    { label :"Bazdar" },
    { label :"Bela" },
    { label :"Bellpat"  },
    { label :"Bhag" },
    { label :"Bhakkar"  },
    { label :"Bhalwal"  },
    { label :"Bhimber"  },
    { label :"Birote" },
    { label :"Buner"},
    { label :"Burj" },
    { label :"Chiniot"  },
    { label :"Chachro"  },
    { label :"Chagai" },
    { label :"Chah Sandan"},
    { label :"Chailianwala" },
    { label :"Chakdara"},
    { label :"Chakku" },
    { label :"Chakwal"  },
    { label :"Chaman" },
    { label :"Charsadda" },
    { label :"Chhatr" },
    { label :"Chichawatni"},
    { label :"Chitral"  },
    { label :"Dadu" },
    { label :"Dera Ghazi Khan"},
    { label :"Dera Ismail Khan" },
     { label :"Dalbandin" },
    { label :"Dargai" },
    { label :"Darya Khan"  },
    { label :"Daska"},
    { label :"Dera Bugti"  },
    { label :"Dhana Sar" },
    { label :"Digri"},
    { label :"Dina City|Dina" },
    { label :"Dinga"},
    { label :"Diplo, Pakistan|Diplo"},
    { label :"Diwana" },
    { label :"Dokri"},
    { label :"Drosh"},
    { label :"Duki" },
    { label :"Dushi"},
    { label :"Duzab"},
    { label :"Faisalabad"  },
    { label :"Fateh Jang"  },
    { label :"Ghotki" },
    { label :"Gwadar" },
    { label :"Gujranwala"  },
    { label :"Gujrat" },
    { label :"Gadra"},
    { label :"Gajar"},
    { label :"Gandava"  },
    { label :"Garhi Khairo" },
    { label :"Garruck"  },
    { label :"Ghakhar Mandi"  },
    { label :"Ghanian"  },
    { label :"Ghauspur"},
    { label :"Ghazluna"},
    { label :"Girdan" },
    { label :"Gulistan"},
    { label :"Gwash"},
    { label :"Hyderabad" },
    { label :"Hala" },
    { label :"Haripur"  },
    { label :"Hab Chauki"  },
    { label :"Hafizabad" },
    { label :"Hameedabad"  },
    { label :"Hangu"},
    { label :"Harnai" },
    { label :"Hasilpur"},
    { label :"Haveli Lakha" },
    { label :"Hinglaj"  },
    { label :"Hoshab" },
    { label :"Islamabad" },
    { label :"Islamkot"},
    { label :"Ispikan"  },
    { label :"Jacobabad" },
    { label :"Jamshoro"},
    { label :"Jhang"},
    { label :"Jhelum" },
    { label :"Jamesabad" },
    { label :"Jampur" },
    { label :"Janghar"  },
    { label :"Jati, Jati(Mughalbhin)" },
    { label :"Jauharabad"  },
    { label :"Jhal" },
    { label :"Jhal Jhao" },
    { label :"Jhatpat"  },
    { label :"Jhudo"},
    { label :"Jiwani" },
    { label :"Jungshahi" },
    { label :"Karachi"  },
    { label :"Kotri"},
    { label :"Kalam"},
    { label :"Kalandi"  },
    { label :"Kalat"},
    { label :"Kamalia"  },
    { label :"Kamararod" },
    { label :"Kamber" },
    { label :"Kamokey"  },
    { label :"Kanak"},
    { label :"Kandi"},
    { label :"Kandiaro"},
    { label :"Kanpur" },
    { label :"Kapip"},
    { label :"Kappar" },
    { label :"Karak City"  },
    { label :"Karodi" },
    { label :"Kashmor"  },
    { label :"Kasur"},
    { label :"Katuri" },
    { label :"Keti Bandar"},
    { label :"Khairpur"},
    { label :"Khanaspur" },
    { label :"Khanewal"},
    { label :"Kharan" },
    { label :"kharian"  },
    { label :"Khokhropur"  },
    { label :"Khora"},
    { label :"Khushab"  },
    { label :"Khuzdar"  },
    { label :"Kikki"},
    { label :"Klupro" },
    { label :"Kohan"},
    { label :"Kohat"},
    { label :"Kohistan"},
    { label :"Kohlu"},
    { label :"Korak"},
    { label :"Korangi"  },
    { label :"Kot Sarae" },
    { label :"Kotli"},
    { label :"Lahore" },
    { label :"Larkana"  },
    { label :"Lahri"},
    { label :"Lakki Marwat" },
    { label :"Lasbela"  },
    { label :"Latamber"},
    { label :"Layyah" },
    { label :"Leiah"},
    { label :"Liari"},
    { label :"Lodhran"  },
    { label :"Loralai"  },
    { label :"Lower Dir" },
    { label :"Shadan Lund"},
    { label :"Multan" },
    { label :"Mandi Bahauddin"},
    { label :"Mansehra"},
    { label :"Mian Chanu"  },
    { label :"Mirpur" },
    { label :"Moro, Pakistan|Moro" },
    { label :"Mardan" },
    { label :"Mach" },
    { label :"Madyan" },
    { label :"Malakand"},
    { label :"Mand" },
    { label :"Manguchar" },
    { label :"Mashki Chah"},
    { label :"Maslti" },
    { label :"Mastuj" },
    { label :"Mastung"  },
    { label :"Mathi"},
    { label :"Matiari"  },
    { label :"Mehar"},
    { label :"Mekhtar"  },
    { label :"Merui"},
    { label :"Mianwali"},
    { label :"Mianez" },
    { label :"Mirpur Batoro"  },
    { label :"Mirpur Khas"},
    { label :"Mirpur Sakro" },
    { label :"Mithi"},
    { label :"Mongora"  },
    { label :"Murgha Kibzai"  },
    { label :"Muridke"  },
    { label :"Musa Khel Bazar"},
    { label :"Muzaffar Garh"  },
    { label :"Muzaffarabad" },
    { label :"Nawabshah" },
    { label :"Nazimabad" },
    { label :"Nowshera"},
    { label :"Nagar Parkar" },
    { label :"Nagha Kalat"},
    { label :"Nal"},
    { label :"Naokot" },
    { label :"Nasirabad" },
    { label :"Nauroz Kalat" },
    { label :"Naushara"},
    { label :"Nur Gamma" },
    { label :"Nushki" },
    { label :"Nuttal" },
    { label :"Okara"},
    { label :"Ormara" },
    { label :"Peshawar"},
    { label :"Panjgur"  },
    { label :"Pasni City"  },
    { label :"Paharpur"},
    { label :"Palantuk"},
    { label :"Pendoo" },
    { label :"Piharak"  },
    { label :"Pirmahal"},
    { label :"Pishin" },
    { label :"Plandri"  },
    { label :"Pokran" },
    { label :"Pounch" },
    { label :"Quetta" },
    { label :"Qambar" },
    { label :"Qamruddin Karez"},
    { label :"Qazi Ahmad"  },
    { label :"Qila Abdullah"  },
    { label :"Qila Ladgasht"  },
    { label :"Qila Safed"  },
    { label :"Qila Saifullah"},
    { label :"Rawalpindi"  },
    { label :"Rabwah" },
    { label :"Rahim Yar Khan"},
    { label :"Rajan Pur" },
    { label :"Rakhni" },
    { label :"Ranipur"  },
    { label :"Ratodero"},
    { label :"Rawalakot" },
    { label :"Renala Khurd" },
    { label :"Robat Thana"},
    { label :"Rodkhan"  },
    { label :"Rohri"},
    { label :"Sialkot"  },
    { label :"Sadiqabad" },
    { label :"Safdar Abad- (Dhaban Singh)"  },
    { label :"Sahiwal"  },
    { label :"Saidu Sharif" },
    { label :"Saindak"  },
    { label :"Sakrand"  },
    { label :"Sanjawi"  },
    { label :"Sargodha"},
    { label :"Saruna" },
    { label :"Shabaz Kalat" },
    { label :"Shadadkhot"  },
    { label :"Shahbandar"  },
    { label :"Shahpur"  },
    { label :"Shahpur Chakar"},
    { label :"Shakargarh"  },
    { label :"Shangla"  },
    { label :"Sharam Jogizai"},
    { label :"Sheikhupura"},
    { label :"Shikarpur" },
    { label :"Shingar"  },
    { label :"Shorap" },
    { label :"Sibi" },
    { label :"Sohawa" },
    { label :"Sonmiani"},
    { label :"Sooianwala"  },
    { label :"Spezand"  },
    { label :"Spintangi" },
    { label :"Sui"},
    { label :"Sujawal"  },
    { label :"Sukkur" },
    { label :"Suntsar"  },
    { label :"Surab"},
    { label :"Swabi"},
    { label :"Swat" },
    { label :"Tando Adam"  },
    { label :"Tando Bago"  },
    { label :"Tangi"},
    { label :"Tank City" },
    { label :"Tar Ahamd Rind"},
    { label :"Thalo"},
    { label :"Thatta" },
    { label :"Toba Tek Singh"},
    { label :"Tordher"  },
    { label :"Tujal"},
    { label :"Tump" },
    { label :"Turbat" },
    { label :"Umarao" },
    { label :"Umarkot"  },
    { label :"Upper Dir" },
    { label :"Uthal"},
    { label :"Vehari" },
    { label :"Veirwaro"},
    { label :"Vitakri"  },
    { label :"Wadh" },
    { label :"Wah Cantt" },
    { label :"Warah"},
    { label :"Washap" },
    { label :"Wasjuk" },
    { label :"Wazirabad" },
    { label :"Yakmach"  },
    { label :"Zhob" },
    { label :"Other"},
   ];
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Typography variant="" component="span" sx={{ ml: '10px' }} >
            Travel Management System
          </Typography>
            {/* <Button variant="outlined" sx={{ ml: '45px' }}><Link to="/">Home</Link></Button> */}
            {
              getDataFromStor.message === 'active' ? 
                <>
                <Typography variant="" component="span" sx={{ ml: '10px' }} >
                  <Link to='#' onClick={handleOpen} style={style.forAnchor}>Add</Link>
                  {/* <Button onClick={handleOpen}>Add</Button> */}
                </Typography>
                <Typography variant="" component="span" sx={{ ml: '10px' }} >
                  <Link to="/" style={style.forAnchor}>Home</Link>
                </Typography>
                <Typography variant="" component="span" sx={{ ml: '10px' }} >
                  <Link to="/dashboard" style={style.forAnchor}>Dashboard</Link>
                </Typography>
                </>
                : ''
            }
          </Typography>
          {
            getDataFromStor.message === 'active' ? 
            <>
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "white", color: "#026ca0" }}>Z</Avatar>
                </IconButton>
              </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
              </Box> 
            </>:
            <Link to="/signin" style={style.forAnchor}>Sign in</Link>
          }
        </Toolbar>
      </AppBar>
    </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component='form' onSubmit={addWeatherHandle}>
          <Typography variant='h5' style={{color:'#000000'}}>Add Weather</Typography>
          <Box component='div' sx={{width: 400, marginTop : 2}}>
            <Autocomplete
              sx={{width: 400,}}
              disablePortal
              id="combo-box-demo"
              options={cities}
              renderInput={(params) => <TextField {...params}  required name='cityName' label="City Name" />}
            />
            {/* <TextField id="outlined-basic" sx={{width: 400,}} label="City Name" variant="outlined" /> */}
            <Box component='div' sx={{marginTop: 2}}>
              <Button variant="contained" type='submit' >Add</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}