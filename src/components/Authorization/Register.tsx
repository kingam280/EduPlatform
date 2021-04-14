import React from "react"
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styleComponents } from "./authorizationStyles";

export const RegisterBox: React.FC = () => {
    const classes = styleComponents();

    const submitHandler = () => {

    }

    return(
        <form className={classes.formRegister} method="POST">
            <div className={classes.formDiv}>
                <TextField
                    label="First Name"
                    className={classes.textField}
                />
                <TextField
                    label="Last Name"
                    className={classes.textField}
                />   
                <TextField
                    label="E-mail"
                    className={classes.textField}
                />  
                <TextField
                    label="Login"
                    className={classes.textField}
                />
                <TextField
                    label="Password"
                    type="password"
                    className={classes.textField}
                /> 
                <TextField
                    label="Confirm Password"
                    type="password"
                    className={classes.textField}
                /> 
                <TextField
                    label="Role"
                    className={classes.textField}
                />   
                <Button
                    variant="outlined"
                    startIcon={<AccountCircleIcon />}
                    className={classes.button}
                    type="submit"
                    onSubmit={submitHandler}
                >
                    Register
                </Button>
            </div>
        </form>
    );
}