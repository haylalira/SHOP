import { globalCss } from ".";


export const globalStyle = globalCss({
 '*':{
  margin:0,
  padding:0,
  boxSizing:"border-box",
 },
 
  body:{
    backgroundColor:"$gray900",
  color:"#fff",
   ' -webikit-foont-smoothing':'antialise'
  },

  'body,input,textarea,button':{

    fontFamily:"roboto",
    fontWeight:400,
  }

})
