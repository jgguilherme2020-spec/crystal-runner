# 🔮 Crystal Runner — Cyber 2D Platformer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-Canvas_2D-orange.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![CSS3](https://img.shields.io/badge/CSS3-Cyber_Neon-blueviolet.svg)

> **Crystal Runner** é um jogo de plataforma 2D cibernético side-scroller original construído com **HTML5 Canvas 2D**, **JavaScript puro (ES6)** e sintetizador de som nativo via **Web Audio API**.

---

## 🎮 Funcionalidades Principais

- **Mecânicas Especiais**:
  - ⚡ **Pulo Duplo (Double Jump)**: Pule novamente no ar para alcançar grandes alturas.
  - 💨 **Dash Cibernético**: Impulso violento para a frente que ignora gravidade momentaneamente e destrói inimigos no caminho.
- **Mundo & Objetivos**:
  - 💎 **Gemas de Cristal**: Coletáveis espalhados pelo mapa e flutuando em plataformas.
  - 🤖 **Drones Inimigos**: Inimigos cibernéticos patrulhando as plataformas.
  - ⚡ **Espinhos de Energia**: Perigos no solo que causam dano.
  - 🌀 **Portal Warp**: Alcance o portal de dobra no final de cada setor para avançar.
- **Trilha Sonora e Efeitos**:
  - Efeitos sonoros retrô sintetizados em tempo real via **Web Audio API** sem arquivos externos de áudio.
- **Controles Universais**:
  - Suporte completo a **Teclado (WASD / Setas)** e **Controles Touch nativos na tela** para celulares e tablets.
- **Persistência**:
  - Salva o recorde de pontuação máxima no `localStorage`.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, Vanilla CSS3 (tema Neon/Glassmorphism com fonte Orbitron).
- **Lógica de Jogo**: JavaScript ES6 Modules (sem frameworks ou bibliotecas pesadas).
- **Renderização**: Canvas 2D Context com atualização via `requestAnimationFrame`.
- **Áudio**: Web Audio API (Osciladores e Gain Nodes).
- **Backend / Dev Server**: Node.js HTTP Server nativo.

---

## 📁 Estrutura do Projeto

```text
crystal-runner/
├── index.html          # Shell principal, HUD, overlays e telas de menu
├── style.css           # Estilização Cyber Neon e botões touch
├── server.js           # Servidor local Node.js na porta 3001
├── package.json        # Configurações do projeto e scripts npm
├── .gitignore          # Filtro de versionamento
├── .env.example        # Modelo de variáveis de ambiente
└── src/
    ├── main.js         # Game loop principal e gerenciador de estado
    ├── levels.js       # Configuração dos setores/mapas
    ├── player.js       # Herói Astra (Física, Pulo Duplo e Dash)
    ├── enemy.js        # IA e física dos Drones cibernéticos
    ├── collectible.js  # Gemas flutuantes e Portal Warp
    ├── particle.js     # Sistema de partículas de brilho e explosão
    ├── renderer.js     # Renderizador de mapa, câmera e background
    ├── input.js        # Abstração de teclado e touch
    ├── audio.js        # Sintetizador Web Audio API
    ├── hud.js          # Gerenciamento de telas e interface de usuário
    └── savedata.js     # Persistência de alta pontuação no LocalStorage
```

---

## 🕹️ Controles

| Ação | Teclado | Touch (Mobile) |
| :--- | :--- | :--- |
| **Mover para Esquerda** | `A` ou `←` | Botão `◀` |
| **Mover para Direita** | `D` ou `→` | Botão `▶` |
| **Pulo / Pulo Duplo** | `Espaço` / `W` / `↑` | Botão `⚡ PULAR` |
| **Dash de Energia** | `Shift` ou `K` | Botão `💨 DASH` |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** (v14 ou superior) instalado no sistema.

### Passos
1. Clone este repositório:
   ```bash
   git clone https://github.com/jgguilherme2020-spec/crystal-runner.git
   cd crystal-runner
   ```

2. Inicie o servidor local:
   ```bash
   npm start
   ```

3. Acesse no navegador:
   ```text
   http://localhost:3001
   ```

---

## 🐙 Publicação no GitHub

Para conectar este repositório ao seu GitHub (`jgguilherme2020-spec`), execute no terminal da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: initial commit of Crystal Runner 2D platformer"
git branch -M main
git remote add origin https://github.com/jgguilherme2020-spec/crystal-runner.git
git push -u origin main
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](./LICENSE) — desenvolvido por **jgguilherme2020-spec**.
