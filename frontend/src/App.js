import "./App.css";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/superheroes";

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    superpower: "",
    humilityScore: "",
  });

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSuperheroes(data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHero = {
      name: formData.name,
      superpower: formData.superpower,
      humilityScore: Number(formData.humilityScore),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHero),
      });

      if (response.ok) {
        setFormData({ name: "", superpower: "", humilityScore: "" });
        fetchSuperheroes();
      } else {
        console.error("Failed to add superhero");
      }
    } catch (error) {
      console.error("Error adding superhero:", error);
    }
  };

  return (
    <div className="App">
      <h1>🦸‍♂️ Humble Superheroes</h1>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Superhero Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="superpower"
            placeholder="Superpower"
            value={formData.superpower}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="humilityScore"
            placeholder="Humility Score (1-10)"
            value={formData.humilityScore}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
          <button type="submit">Add Superhero</button>
        </form>

        <div className="superheroes-list">
          {superheroes.map((hero, index) => (
            <div key={index} className="superhero-card">
              <h2>{hero.name}</h2>
              <p>
                🦸‍♂️ Superpower: <strong>{hero.superpower}</strong>
              </p>
              <p>
                🌟 Humility Score: <strong>{hero.humilityScore}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
