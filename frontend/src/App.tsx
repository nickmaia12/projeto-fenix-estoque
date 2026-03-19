import { useEffect, useState, type FormEvent } from 'react' // Adicionei o 'type' aqui
import api from "./services/api" 
import './App.css'

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
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState<number>(0);
  const [categoria, setCategoria] = useState('');

  // 🛰️ 1. Buscar itens do Backend (GET)
  async function fetchItems() {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao conectar com a base:", error);
      alert("Erro ao carregar inventário. O backend está rodando?");
    }
  }

  // 🚀 2. Adicionar novo item (POST)
  async function handleAddItem(e: FormEvent) {
    e.preventDefault(); // Impede a página de recarregar

    if (!nome || !categoria || quantidade <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      const response = await api.post('/items', {
        nome,
        quantidade,
        categoria
      });

      // Atualiza a lista local com o novo item que o backend retornou
      setItems([...items, response.data]);
      
      // Limpa o formulário
      setNome('');
      setQuantidade(0);
      setCategoria('');
    } catch (error) {
      console.error("Erro ao cadastrar item:", error);
    }
  }

  // 💥 3. Remover item (DELETE)
  async function handleDeleteItem(id: string) {
    try {
      await api.delete(`/items/${id}`);
      // Remove da tela sem precisar dar F5
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
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
        <h2>Novo Item</h2>
        <form onSubmit={handleAddItem}>
          <input 
            type="text" 
            placeholder="Nome do item (ex: Oxigênio)" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
          <button type="submit">Cadastrar no Sistema</button>
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
            items.map(item => (
              <div key={item.id} className="item-card">
                <h3>{item.nome}</h3>
                <p>Quantidade: <strong>{item.quantidade}</strong></p>
                <p>Categoria: <em>{item.categoria}</em></p>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default App