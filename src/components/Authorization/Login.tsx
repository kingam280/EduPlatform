import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styleComponents } from "./authorizationStyles";
import { submitLogin } from "../../app/authorizationReducer"
import { RootState } from "../../app/rootReducer";

export const LoginBox: React.FC = () => {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { token } = useSelector((state: RootState) => state.authorization);
    const classes = styleComponents();
    const dispatch = useDispatch();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(submitLogin({login, password}));
        if(window && (token !== "" && token !== undefined)) { 
            window.localStorage.setItem("token", JSON.stringify(token));
            window.setTimeout(() => {
                window.location.href = "http://localhost:3000/EduPlatform";
            }, 2000);
        }
    }
 
    return(
        <form className={classes.formLogin} method="POST" onSubmit={e => submitHandler(e)}>
            <div className={classes.formDiv}>
                <TextField
                    label="Login"
                    className={classes.textField}
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
                <TextField
                    label="Password"
                    type="password"
                    className={classes.textField}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />   
                <Button
                    variant="outlined"
                    startIcon={<AccountCircleIcon />}
                    className={classes.button}
                    type="submit"
                >
                    Log In
                </Button>
            </div>
        </form>
    );
}