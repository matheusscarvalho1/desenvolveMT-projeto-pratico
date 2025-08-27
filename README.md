# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 🧹 Padrões de Código

Este projeto utiliza **ESLint** e **Prettier** para manter a qualidade e consistência do código.

### 📦 ESLint

O projeto está configurado com o plugin [`eslint-plugin-simple-import-sort`](https://github.com/lydell/eslint-plugin-simple-import-sort) para garantir que os **imports e exports** estejam sempre organizados automaticamente.

#### Configuração

```javascript
// eslint.config.js
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config([
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
]);
```

#### Como funciona

O plugin organiza automaticamente os imports em grupos:

1. **Imports de terceiros** (bibliotecas externas)
2. **Imports internos** (arquivos do próprio projeto)
3. **Imports relativos** (arquivos locais)

#### Exemplo de organização automática

```typescript
// Antes (desorganizado)
import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import axios from "axios";
import { Header } from "@/components/Header";

// Depois (organizado automaticamente)
import axios from "axios";
import { useState } from "react";

import { Header } from "@/components/Header";
import { Button } from "./components/Button";
import "./App.css";
```

#### Comandos úteis

```bash
npm run lint        # verifica erros de lint
npx eslint . --fix  # corrige automaticamente
```

### 🎨 Prettier

Foi configurado o plugin `prettier-plugin-tailwindcss` para ordenar automaticamente as classes do Tailwind CSS.

#### Configuração

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### ⚙️ Configuração do VS Code

Para que o Prettier funcione automaticamente ao salvar arquivos, configure o VS Code:

#### 📦 Extensões necessárias para melhor experiência, instale primeiro:

1. **Prettier - Code formatter**
   - Abra o VS Code
   - Vá em **Extensions** (`Ctrl + Shift + X`)
   - Procure por: `Prettier - Code formatter`
   - Clique em **Install**

2. **ESLint** (opcional, mas recomendado)
   - Procure por: `ESLint`
   - Clique em **Install**

#### Como configurar "Format on Save":

1. **Abra as Preferências do VS Code:**
   - Windows/Linux: `Ctrl + ,`
   - Mac: `Cmd + ,`

2. **Procure por "format on save":**
   - Digite na barra de pesquisa: `format on save`
   - Marque a caixa ✅ **"Editor: Format On Save"**

3. **Configure o Prettier como formatador padrão:**
   - Digite na barra de pesquisa: `default formatter`
   - Selecione **"Prettier - Code formatter"** em **"Editor: Default Formatter"**

#### Configuração manual no settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

#### Extensão necessária:

- Instale a extensão **"Prettier - Code formatter"** no VS Code

#### Como funciona

O plugin analisa e reorganiza automaticamente as classes do Tailwind CSS seguindo a ordem oficial recomendada pela documentação do Tailwind.

#### Exemplo de ordenação automática

```tsx
// Antes (desordenado)
<div className="p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">

// Depois (ordenado pelo Prettier)
<div className="rounded-lg bg-blue-500 p-4 text-white transition-colors hover:bg-blue-600">
```

A ordenação é mais por gosto pessoal para mandar o projeto em um padrão em todos os componentes.

### 🔧 Scripts disponíveis

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera build de produção
npm run lint     # executa verificação de lint
npm run preview  # visualiza o build de produção
```

### 📋 Dependências de desenvolvimento

- **ESLint**: `eslint-plugin-simple-import-sort` - Organização automática de imports
- **Prettier**: `prettier-plugin-tailwindcss` - Ordenação automática de classes Tailwind
- **TypeScript**: Configuração completa com ESLint
- **React**: Hooks e Refresh configurados

---

_Esta documentação será expandida conforme o projeto evolui._
