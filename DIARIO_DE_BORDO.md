# 🛸 Diário de Bordo: Projeto Fênix (Estoque Orbital)

**Piloto/Desenvolvedor:** Nicholas
**Status da Missão:** Sistema Fullstack Operacional 🚀

---

### 🏛️ Arquitetura: Por que separar o Service da rota do Express facilita a manutenção?
A separação deixou o código muito mais limpo e profissional. A rota do Express se tornou apenas um "guichê de atendimento": ela recebe o pedido da nave (Frontend) e entrega a resposta. Toda a "inteligência" (regras de negócio, buscar os itens, validar se a quantidade é maior que zero) ficou isolada no Service. Quando precisei implementar o PUT e o DELETE, foi muito mais fácil saber exatamente onde mexer sem quebrar a comunicação HTTP, deixando o sistema preparado para o futuro.

### 🔌 Frontend/Backend: Qual foi a maior dificuldade na comunicação entre Front e Back?
O batismo de fogo real foi alinhar as portas e as permissões. No começo, o projeto do Vite (Frontend) acabou sendo gerado dentro da pasta do Backend, o que exigiu uma manobra tática de refatoração no terminal. Depois, esbarrei na barreira de segurança do navegador: o famoso erro de **CORS**. Foi preciso configurar o backend para aceitar requisições externas antes mesmo de as rotas serem chamadas. Outro desafio interessante foi lidar com o rigor do TypeScript no Vite (o erro do `type FormEvent` e a sintaxe das chaves perdidas), mas que no fim serviu para deixar o código blindado.

### 🌳 Git: Como se sente ao manter um histórico impecável na main?
Ver o `git log` limpo, com commits semânticos como `feat:`, `chore:` e `refactor:`, dá uma sensação de controle absoluto sobre a missão. Cada commit conta uma etapa exata do desenvolvimento: desde mover a pasta pro lugar certo, passando pela liberação do CORS, até a integração total do CRUD com inputs reativos. Se algo der errado no futuro, é fácil voltar para uma versão estável. É como ter uma caixa-preta perfeita da aplicação.

### 📈 Auto-análise: O que mudaria na sua organização se o projeto escalasse para 100 tipos de itens?
Com 100 itens ou mais, o array em memória e a listagem simples na tela não dariam conta. Seria necessário evoluir em três frentes:
1. **Banco de Dados:** Trocar o armazenamento em memória por um banco real (como PostgreSQL), possivelmente usando TypeORM para gerenciar as entidades de forma robusta.
2. **Backend:** Implementar paginação na rota `GET /items` para não sobrecarregar a rede mandando 100 itens de uma vez.
3. **Frontend:** Criar uma barra de pesquisa e filtros (ex: buscar apenas pela categoria "Suprimento" ou "Ferramenta"), além de melhorar o visual da grid para lidar com muitos cards ao mesmo tempo.

---
*Fim do registro.*