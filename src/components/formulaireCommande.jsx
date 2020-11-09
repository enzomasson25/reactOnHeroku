import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

async function makeGetRequest() {

  let res = await axios.get('https://morning-ravine-89608.herokuapp.com/users');

  let data = res.data;

  return data;
}



const columns = [
  { field: 'id', headerName: 'ID', width: 70 ,hide: true ,headerAlign: 'center'},
  { field: 'nom', headerName: 'Nom', width: 130 ,headerAlign: 'center'},
  { field: 'prenom', headerName: 'Prenom', width: 130 ,headerAlign: 'center'}, 
  { field: 'telephone', headerName: 'Téléphone', width: 130 ,headerAlign: 'center'},
  
];

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
  media: {
    height: 140,
  },
  root: {
      flexGrow: 1,
  }
});


export default function DataGridDemo() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    makeGetRequest()
      .then((data) => setUsers(data))
      .catch((err) => console.log(err))
  }

  console.log(users);
  const rows = []
  users.map((value,index)=> (
    rows.push({"id" : value._id, "nom": value.nom, "prenom": value.prenom, "telephone": value.telephone})
  )); 

  const sortModel = [
    {
      field: 'nom',
      sort: 'asc',
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>      
        <DataGrid sortModel={sortModel} rows={rows} columns={columns} pageSize={5}  />
    </div>
    
  );
}