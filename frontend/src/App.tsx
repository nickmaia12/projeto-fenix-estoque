import { useEffect, useState, type FormEvent } from "react";
import api from "./services/api";
import "./App.css";

// O "Contrato" do nosso item de Marte
interface Item {
  id: string;
  nome: string;
  quantidade: number;
  categoria: string;
}

function App() {
  // Estados para a lista e para o formulário
  const [items, setItems] = useState<Item[]>([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [categoria, setCategoria] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🛰️ 1. Buscar itens do Backend (GET)
  async function fetchItems() {
    try {
      const response = await api.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao conectar com a base:", error);
      alert("Erro ao carregar inventário. O backend está rodando?");
    }
  } // <--- ESSA CHAVE ESTAVA FALTANDO AQUI!

  // 🚀 2. Enviar formulário (POST ou PUT)
  async function handleAddItem(e: FormEvent) {
    e.preventDefault();

    if (!nome || !categoria || quantidade <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      if (editingId) {
        // Modo Edição (PUT)
        await api.put(`/items/${editingId}`, {
          nome,
          quantidade,
          categoria,
        });

        await fetchItems();
        setEditingId(null);
        alert("Item atualizado com sucesso!");
      } else {
        // Modo Cadastro (POST)
        const response = await api.post("/items", {
          nome,
          quantidade,
          categoria,
        });
        setItems([...items, response.data]);
      }

      // Limpa os campos
      setNome("");
      setQuantidade(0);
      setCategoria("");
    } catch (error) {
      console.error("Erro na operação orbital:", error);
      alert("Ocorreu um erro ao processar a requisição.");
    }
  }

  // 💥 3. Remover item (DELETE)
  async function handleDeleteItem(id: string) {
    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  // 📝 4. Preparar edição
  function handleEditClick(item: Item) {
    setEditingId(item.id);
    setNome(item.nome);
    setQuantidade(item.quantidade);
    setCategoria(item.categoria);
  }

  // Roda uma vez quando o App abre
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>🛰️ Projeto Fênix: Estoque Orbital</h1>
        <p>Monitoramento de Suprimentos em Tempo Real</p>
      </header>

      {/* Formulário de Cadastro */}
      <section className="form-section">
        <h2>{editingId ? "Editando Item" : "Novo Item"}</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Nome do item"
            value={nome} // <-- Isso aqui faz o texto aparecer quando você clica em Editar
            onChange={(e) => setNome(e.target.value)} // <-- Isso aqui deixa você digitar
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
          <button type="submit">
            {editingId ? "Salvar Alterações" : "Cadastrar no Sistema"}
          </button>
        </form>
      </section>

      <hr />

      {/* Listagem do Inventário */}
      <section className="inventory-section">
        <h2>Inventário Atual</h2>
        <div className="item-grid">
          {items.length === 0 ? (
            <p>Nenhum item detectado no radar.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="item-card">
                <h3>{item.nome}</h3>
                <p>
                  Quantidade: <strong>{item.quantidade}</strong>
                </p>
                <p>
                  Categoria: <em>{item.categoria}</em>
                </p>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  <button
                    onClick={() => handleEditClick(item)}
                    style={{ backgroundColor: "#ffa500", flex: 1 }}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteItem(item.id)}
                    style={{ flex: 1 }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
