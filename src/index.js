import React from 'react';
import ReactDOM from 'react-dom';
import Carte from './components/carte';
import FormulaireCommande from './components/formulaireCommande';
import VisualisationCommande from './components/visualisationCommande';

ReactDOM.render(
  <React.StrictMode>
    <Carte />
  </React.StrictMode>,
  document.getElementById('carteApp')
);

ReactDOM.render(
  <React.StrictMode>
    <FormulaireCommande />
  </React.StrictMode>,
  document.getElementById('formulaireCommandeApp')
);

ReactDOM.render(
  <React.StrictMode>
    <VisualisationCommande />
  </React.StrictMode>,
  document.getElementById('visualisationCommandeApp')
);