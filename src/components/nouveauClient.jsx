import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    TextField: {
      margin: theme.spacing(1),
      width: '25ch',
      height: '55px',
    },
    Button: {
      margin: theme.spacing(1),
      width: '25ch',
      height: '55px',
    }
}));

export default function NouveauClient() {
  const classes = useStyles();
  const [user, setUser] = useState({
    nom : "",
    prenom : "",
    telephone : "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [incomplete, setIncomplete] = useState(false);

  const handleChange = event => {
    const {name,value} = event.currentTarget
    setUser({
      ...user,
      [name]:value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(user.nom == "" || user.prenom == "" || user.telephone == ""){
      setIncomplete(true);
      setSuccess("");
      setError(false);
    }
    else{
      console.log(user);
      axios.post('https://morning-ravine-89608.herokuapp.com/user', user)
      .then((response) => {
          console.log(response);
          setSuccess(`${user.nom} ${user.prenom}`);
          setError(false);
          setIncomplete(false);
          
      }, (error) => {
          console.log(error);
          setSuccess("");
          setError(true);
          setIncomplete(false);
          
      });
    }
    
  }

  return (
    <div>
        <p>Pour les nouveaux clients :</p>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit} >
            <TextField className={classes.TextField} id="outlined-basic" label="Nom" name="nom" variant="outlined" required onChange={handleChange}/>
            <TextField className={classes.TextField} id="outlined-basic1" label="Prénom" name="prenom" variant="outlined" required onChange={handleChange}/>
            <TextField className={classes.TextField} id="outlined-basic2" label="Téléphone" name="telephone" variant="outlined" required onChange={handleChange}/>
            <Button className={classes.Button} variant="contained" type="submit" color="primary">
                Valider
            </Button>
            {success?<Alert severity="success">{success} a bien été ajouté !</Alert>:null}
            {incomplete?<Alert className={classes.Alert} severity="error">Attention le formulaire n'est pas complet !</Alert>:null}
            {error?<Alert className={classes.Alert} severity="error">Erreur lors de l'ajout du client !</Alert>:null}
        </form>
    </div> 
  );
}
