import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      owner: "Ailton Nunes",
      techs: "SAPui5"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    var index = repositories.findIndex(function (o) {
      return o.id === id;
    });

    if (index !== -1) {
      repositories.splice(index, 1)
    };

    const response = await api.delete('repositories/'+id);

    console.log(response);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <>
        <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        
        </>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
