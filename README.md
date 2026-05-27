#  StickerLy — Gerenciador de Álbum de Figurinhas Digital

O **StickerLy** é um aplicativo web moderno para gerenciamento de álbuns de figurinhas, inspirado na Copa do Mundo 2026.

O objetivo é permitir que usuários acompanhem suas figurinhas, vejam progresso, gerenciem repetidas e controlem seus gastos, tudo de forma simples, rápida e com experiência de app nativo.

---

##  Funcionalidades

###  Álbum de Figurinhas
- Visualização completa do álbum
- Organização por seleções e grupos
- Marcação de figurinhas:
  -  Faltando
  -  Possui
  -  Repetida

---

###  Busca Inteligente
- Busca por seleções
- Navegação rápida entre páginas do álbum

---

###  Estatísticas
- Progresso total do álbum (%)
- Quantidade:
  - Figurinhas coletadas
  - Figurinhas faltantes
  - Figurinhas repetidas

---

###  Controle de Gastos
- Adicionar valores de compras
- Soma automática dos gastos
- Histórico salvo na nuvem

---

###  Figurinhas Repetidas
- Visualização separada
- Organização por seleção
- Gerenciamento fácil para troca

---

###  Sistema de Conta
- Login com:
  - Email e senha
  - Google
- Dados sincronizados em tempo real

---

###  Sincronização em Nuvem
- Firebase Firestore
- Dados salvos por usuário
- Acesso em qualquer dispositivo

---

###  PWA (App Instalável)
- Pode ser instalado como aplicativo
- Funciona como app mobile
- Experiência semelhante à App Store

---

##  Tecnologias Utilizadas

- **React + Vite**
- **TypeScript**
- **Tailwind CSS**
- **Firebase**
  - Authentication
  - Firestore
- **Framer Motion** (animações)
- **PWA (vite-plugin-pwa)**

---

##  Estrutura do Projeto

```bash
src/
├── components/        # Componentes da interface
├── lib/               # Lógica, Firebase e utilitários
├── pages/             # Páginas do app
├── main.tsx           # Entrada do app
├── App.tsx            # Rotas
