import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AuthRoute from './component/layout/AuthRoute';
import {Switch, Route} from 'react-router-dom';

// material ui styling
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './component/layout/theme';

// redux component
import {Provider} from 'react-redux';
import store from './component/redux/store';
import tokenDecoder from 'jwt-decode';
import {logout , getUserData} from './component/redux/actions/userActions';
import { SET_AUTHENTICATED} from './component/redux/types';
import {responsiveFontSizes} from '@material-ui/core/styles';

// components//pages
import NavBar from './component/layout/navbar';
import Login from './component/pages/login'
import Sign from './component/pages/sign';
import Home from './component/pages/home';
import User from './component/user/user';
import Footer from './component/layout/footer';

let theme = createTheme(themeObject);

const Theme = {
  ...theme,
  overrides:{
    MuiListItem:{
      root:{
        [theme.breakpoints.up('sm')]:{
          paddingTop:'8px',
          paddingBottom:'8px'
        },
        [theme.breakpoints.down('sm')]:{
          paddingTop:'4px',
          paddingBottom:'4px'
        }
      }
    },
    MuiListSubheader:{
      root:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'0.8rem'
        }
      }
    },
    MuiFormHelperText:{
      root:{
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.65rem'
      }
      }
    },
    MuiDialog:{
      paper:{
        display:'flex',
        textAlign:'center',
        flexDirection:'column',
        justifyContent:'center',
        borderRadius:10,
        margin:0,
        padding:theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
          // padding:theme.spacing(2)
        }
      }
    },
    MuiCardContent:{
      root:{
        padding:0,
        "&:last-child":{
          paddingBottom:theme.spacing(2)
        }
      }
    },
    MuiInputBase:{
      input:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'0.8rem'
        }
      }
    },
    MuiButton:{
      outlinedSizeSmall:{
      [theme.breakpoints.down('sm')]:{
        padding:'5px 15px'
      }
      },
      label:{
        [theme.breakpoints.down('sm')]:{
          padding:0,
          fontSize:'0.8rem'
        }
      }
    },
    MuiTypography:{
      h4:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'1.5rem'
        }
      },
      h5:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'1rem'
        }
      },
      h6:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'1rem'
        }
      },
      subtitle1:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'0.9rem'
        }
      },
      body1:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'0.8rem'
        }
      },
      body2:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'0.7rem'
        }
      },
      caption:{
        [theme.breakpoints.down('sm')]:{
          fontSize:'0.7rem'
        }
      }
    }
  }
}
theme = responsiveFontSizes(theme);

axios.defaults.baseURL = 'https://asia-east2-soulmedia-webapp.cloudfunctions.net/api'

let token = localStorage.FBIdToken;
if(token){
  const decodedToken = tokenDecoder(token);
  if(decodedToken.exp*1000<Date.now()){
    store.dispatch(logout());
    window.location.href = '/login';
  }
  else{
    store.dispatch({type:SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isConnected : true
    }
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if(condition === 'online') {
      this.setState({isConnected:true});
    }
    else {
      this.setState({isConnected:false});
    }
  }
  render() {
    return (
      <div className='App'>
      <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
{/* navigation bar */}
      <div className='header'>
        <div className='navbar'>
          <NavBar/>
        </div>
{/* mid contents */}
        <div className="container">

          <Switch>
            <Route exact path='/' component={Home}/>
            <AuthRoute path='/login' component={Login}/>
            <AuthRoute path='/signup' component={Sign}/>
            <Route exact path='/users/:handle' component={User}/>
            <Route exact path='/users/:handle/screams/:screamid' component={User}/>
          </Switch>
        </div>
        </div>
{/* footer */}
        <div className='footer'>
          <Footer/>
        </div>

        </Provider>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;