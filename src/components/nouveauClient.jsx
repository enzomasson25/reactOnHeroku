import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import ReactDOM from 'react-dom';

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
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [telephone, setTelephone] = React.useState("");


  const alertFormError = (
    <Alert className={classes.Alert} severity="error">Erreur lors de l'ajout du client !</Alert>
  );
  const alertFormIncomplet = (
    <Alert className={classes.Alert} severity="error">Attention le formulaire n'est pas complet !</Alert>
  );
  
  const handleSubmit = (event) => {
    var user = {
        nom: nom,
        prenom: prenom,
        telephone: telephone
    }
    
    const alertFormSuccess =(
      <Alert severity="success">{user.nom} {user.prenom} a bien été ajouté !</Alert>
      );
    
    console.log(user);
    event.preventDefault();

    if(user.nom == "" || user.prenom == "" || user.telephone == ""){
      //si le formulaire est mal rempli 
      ReactDOM.render(alertFormIncomplet, document.getElementById('alert'));
    }
    else{
      axios.post('https://morning-ravine-89608.herokuapp.com/user', user)
      .then((response) => {
          console.log(response);
          if(response.status == 200){
            //si la reponse à la requete est OK 
            ReactDOM.render(alertFormSuccess, document.getElementById('alert'));
          }
          else{
            ReactDOM.render(alertFormError, document.getElementById('alert'));
          } 
      }, (error) => {
          console.log(error);
          ReactDOM.render(alertFormError, document.getElementById('alert'));
      });
    }  
  }

  return (
    <div>
        <p>Pour les nouveaux clients :</p>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit} >
            <TextField className={classes.TextField} id="outlined-basic" label="Nom" id="nom" variant="outlined" required="required" onChange={e => setNom(e.target.value)}/>
            <TextField className={classes.TextField} id="outlined-basic" label="Prénom" id="prenom" variant="outlined" required="required" onChange={e => setPrenom(e.target.value)}/>
            <TextField className={classes.TextField} id="outlined-basic" label="Téléphone" id="telephone" variant="outlined" required="required" onChange={e => setTelephone(e.target.value)}/>
            <Button className={classes.Button} variant="contained" type="submit" color="primary">
                Valider
            </Button>
            <div id="alert">

            </div>
        </form>
    </div> 
  );
}
