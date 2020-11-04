import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      height: '55px',
    }
  },
}));




export default function NouveauClient() {
  const classes = useStyles();
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [telephone, setTelephone] = React.useState("");

  const handleSubmit = (event) => {
    var user = {
        nom: nom,
        prenom: prenom,
        telephone: telephone
    }
    
    console.log(user);
    event.preventDefault();

  
    axios.post('https://morning-ravine-89608.herokuapp.com/user', user)
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });


    
  }

  return (
    <div>
        <p>Pour les nouveaux clients :</p>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} noValidate>
            <TextField id="outlined-basic" label="Nom" id="nom" variant="outlined" required="true" onChange={e => setNom(e.target.value)}/>
            <TextField id="outlined-basic" label="Prénom" id="prenom" variant="outlined" required="true" onChange={e => setPrenom(e.target.value)}/>
            <TextField id="outlined-basic" label="Téléphone" id="telephone" variant="outlined" required="true" onChange={e => setTelephone(e.target.value)}/>
            <Button variant="contained" type="submit" color="primary">
                Valider
            </Button>
        </form>
    </div> 
  );
}
