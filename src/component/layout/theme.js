export default{
    palette: {
        primary: {
          light: '#e0f7fa',
          main: '#0097a7',
          dark: '#006064',
          contrastText: '#fff',
        },
        secondary: {
          light: '#bbdefb',
          main: '#2196f3',
          dark: '#0d47a1',
          contrastText: '#fff',
        },
      },
      typography:{
        fontFamily:'Quicksand'
      },
        spreadThis:{
          profileGrid:{
          
          },
          toolbar:{
            justifyContent:'space-evenly'
          },
            navGrid:{
                display:'flex',
                justifyContent:'space-between'
            },
            navGridItem:{
              // border:'1px solid white',\
              width:'auto'
            },
            navGridItem2:{
              display:'flex',
              alignItems:'center',
              justifyContent:'space-evenly'
            },
            navlogoImg:{
              height:35,
              width:35,
            },
            navTitle:{
              display:'flex',
              alignItems:'center',
              fontWeight:'bold',
              textShadow:'5px 5px 7px black'
            },
          form:{
              textAlign:'center',
              justifyContent:'center',
              
              padding:'0 0 24px 0'
          },
          itemform:{
            // backgroundColor:'#e1f5fe'
            // backgroundImage:`url(${Image})`,
            //   backgroundSize:'cover',
            //   backgroundPosition:'center',

          },
          loginTitle:{
              fontWeight:'bold',
              color:'#4db6ac'
          },
          logo:{
              // boxShadow:'0 0 0.4rem #4caf50',
              padding:'10px',
              margin:'20px auto',
              height:80,
              width:80,
              borderRadius:'50%',
          },
          textField:{
              margin:'0.8rem 0',
          },
          button:{
              borderColor:'#4caf50',
              marginTop:'1rem',
              color:'#4db6ac',
              fontWeight:'bold',
              position:'relative',
              "&:hover": {
                borderColor:'#2196f3',
                    color:'#2196f3'
              }
          },
          cancel:{
            borderColor:'#4caf50',
            marginTop:'1rem',
            color:'#4db6ac',
            fontWeight:'bold',
            position:'relative',
            "&:hover": {
                  color:'#f44336',
                  borderColor:'#f44336'
            }
        },
          loading:{
              position:'absolute',
              opacity:'0.5',
          },
          signuplink:{
              marginTop:'1rem',
              color:'red'
          },
          link:{
              color:'#03a9f4'
          }
        }
      
}