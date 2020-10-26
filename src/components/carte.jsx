import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Grid } from "@material-ui/core";



const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      flexGrow: 1,
    },
    media: {
      height: 140,
    },
    title: {
        textTransform: "uppercase"
    }
  });


  //Cours du prof :) 

  async function makeGetRequest() {
      
        let res = await axios.get('https://morning-ravine-89608.herokuapp.com/pizzas');

        let data = res.data;

        return data;
  }

  function Carte() {

    const classes = useStyles();
    const [pizzas, setPizzas] = useState([]);
    
    useEffect(() => {
        fetchPizzas();
    }, []);

    const fetchPizzas = () =>{
        makeGetRequest()
        .then(( data ) => setPizzas(data))
        .catch((err) => console.log(err))
    }

    console.log(pizzas);

      return (
            <div className="Carte">       
                <Grid container spacing={3}>     
                    {pizzas.map((value, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>                          
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={"/assets/img/"+value.nom+".png"}
                                        title={value.nom}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {value.nom}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.ingredients+", "}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>                   
                        </Grid>
                    ))}
                </Grid>

            </div>
      );
  }

  export default Carte;