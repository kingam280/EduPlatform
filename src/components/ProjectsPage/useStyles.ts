import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    projectsPage: {
        padding: "2.5%",
        "& h2" : {
            textAlign: "center",
            textTransform: "uppercase",
        }
    },
    projectsList: {
        margin: "2.5% auto"
    },
    projectsItem: {
        position: "relative",
        margin: "20px auto",
        padding: "20px 15% 20px 2.5%",
        display: "flex",
        justifyContent: "space-between"
    },
    addProjectBtn: {
        display: "block",
        margin: "0 0 0 auto"
    },
    removeBtn: {
        position: "absolute",
        top: "52.5%",
        right: 0,
        margin: "0 2.5%",
    },
    infoBtn: {
        position: "absolute",
        bottom: "52.5%",
        right: 0,
        margin: "0 2.5%"
    },
    projectsForm: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        padding: '10px',
        backgroundColor: 'white',
        "& h2": {
            textAlign: "center"
        },
        "& button": {
            display: "block",
            margin: "10px auto"
        }
    },
    formInput: {
        margin: "5px 0"
    },
    projectCard: {
        position: "relative",
        width: "90%",
        margin: "25px auto",
        padding: "50px 5% 40px",
        "& h2": {
            textAlign: 'center'
        },
        "& p": {
            textAlign: "justify",
            lineHeight: 1.5
        }
    },
    goBackBtn: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    editBtn: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    bold: {
        fontWeight: "bold"
    }
})

export default useStyles