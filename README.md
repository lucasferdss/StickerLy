<div align="center">
  <img src="public/logo-removebg.png" alt="StickerLy Logo" width="200"/>
  
  # StickerLy
  
  **Gerenciador de Álbum de Figurinhas Digital**
  
  Uma aplicação web moderna para acompanhar o álbum de figurinhas da Copa do Mundo 2026 com controle de progresso, repetidas, gastos e sincronização em nuvem.
  
</div>

---

## Sobre o Projeto

StickerLy é uma Progressive Web App (PWA) desenvolvida para facilitar o gerenciamento de álbuns de figurinhas. A plataforma permite marcar figurinhas coletadas, controlar repetidas para troca, acompanhar estatísticas do álbum e registrar gastos, mantendo os dados sincronizados por usuário na nuvem.

### Principais Funcionalidades

- Controle completo do álbum de figurinhas da Copa do Mundo 2026
- Organização por seções especiais, seleções e grupos
- Marcação de figurinhas como faltando, coletada ou repetida
- Visualização separada de figurinhas repetidas para facilitar trocas
- Busca rápida por seleções e navegação por páginas do álbum
- Estatísticas de progresso geral do álbum
- Controle de gastos com histórico salvo na nuvem
- Login com e-mail e senha
- Login com Google
- Recuperação de senha
- Sincronização em tempo real por usuário
- Instalável como aplicativo nativo (PWA)

---

## Tecnologias Utilizadas

### Frontend

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Gerenciamento de rotas
- **TanStack Query** - Gerenciamento de estado e cache de dados
- **Framer Motion** - Animações e transições de interface
- **Lucide React** - Biblioteca de ícones

### Backend

- **Firebase** - Backend as a Service
  - Authentication para autenticação de usuários
  - Firestore para banco de dados em nuvem
  - Real-time listeners para sincronização automática
  - Dados organizados por usuário

### Infraestrutura

- **vite-plugin-pwa** - Geração de PWA e service worker
- **Web App Manifest** - Instalação como aplicativo nativo
- **Vercel** - Plataforma de deploy
- **ESLint** - Padronização e análise estática do código
- **Vitest** - Ambiente de testes automatizados

---

## Estrutura do Projeto

```text
StickerLy/
├── public/              # Arquivos estáticos, logo, ícones e manifest
├── src/
│   ├── components/      # Componentes React da interface
│   ├── lib/             # Firebase, lógica do álbum e utilitários
│   ├── pages/           # Páginas da aplicação
│   ├── App.tsx          # Configuração das rotas
│   ├── main.tsx         # Entrada da aplicação
│   └── index.css        # Estilos globais
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── vercel.json
```

---

## Características Técnicas

- **Design Responsivo**: Interface otimizada para uso em desktop e mobile
- **PWA**: Pode ser instalado e usado com experiência de aplicativo
- **Dark Mode**: Visual escuro focado em uso mobile
- **Sincronização em Nuvem**: Dados salvos no Firebase Firestore por usuário
- **Autenticação Completa**: Login com Google, e-mail e senha
- **Feedback Tátil**: Vibração em ações principais quando suportado pelo dispositivo
- **Interface Animada**: Transições suaves com Framer Motion
- **Performance**: Build otimizado com Vite
- **Organização Modular**: Separação clara entre componentes, lógica e páginas
