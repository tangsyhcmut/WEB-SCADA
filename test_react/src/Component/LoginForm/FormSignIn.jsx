import{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import isEmpty from "validator/lib/isEmpty"
import isEmail from "validator/lib/isEmail"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SignInGG from '../../features/Auth/SignInGG'
const Login=()=>{
    const history = useHistory()
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [validationMsg, setValidationMsg] = useState({})
    
    
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
   
    const btnstyle={margin:'8px 0'}
    
    
    
    const onChangeEmail=(e) => {
        const value = e.target.value;
        setEmail(value)
        console.log(email)
    }
    const onChangePassword=(e) => {
        const value = e.target.value;
        setPassword(value)
        console.log(password)

    }
    const validateAll = () => {
        
        const msg = {}
        if (isEmpty(email)) {
            msg.email = "Please input your Email"
        } else if (!isEmail(email)) {
            msg.email = "Your email is incorrect"
        }

        if (isEmpty(password)) {
            msg.password = "Please input your Password"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const onSubmitLogin  = (e) => {
        const isValid = validateAll()
        if (!isValid) return
        // Call API LOGIN
        history.replace('/home')
    }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                    <h2>Sign In</h2>
                </Grid>
                <TextField type='email' name='email' id = 'email' autoComplete="email"  label='Username' placeholder='Enter your email' onChange={onChangeEmail}  />
                <p className="text-red-400 text-xs italic">{validationMsg.email}</p>
                <input type='password' name='password' id = 'password' autoComplete="email" label='Password' placeholder='Enter password' onChange={onChangePassword} /> 
                <p className="text-red-400 text-xs italic">{validationMsg.password}</p>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <button type='submit' color='primary' variant="contained" style={btnstyle} onclick={onSubmitLogin} >Sign in</button>
                <Typography >
                    <SignInGG/>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="/signup" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login