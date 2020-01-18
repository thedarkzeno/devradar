import React, { useState, useEffect } from "react";
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

import "./global.css";
import "./app.css";
import "./main.css";
import "./sidebar.css";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);
  async function handleAddDev(dados) {
    const response = await api.post("/devs", dados);

    setDevs([...devs, response.data]);
    // console.log(response.data);
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
