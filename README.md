# 📍 Sistema de Pontos Turísticos

Este projeto é uma aplicação full-stack desenvolvida para o cadastro e listagem de pontos turísticos, permitindo a gestão de nomes, localizações e descrições detalhadas.

<br/>

## 🚀 Tecnologias Utilizadas

### **Backend (API)**

* **C# / .NET 8.0**: Linguagem e framework principal para a construção da Web API.

* **Entity Framework Core**: ORM utilizado para o mapeamento objeto-relacional e persistência de dados.

* **SQL Server**: Banco de dados relacional para armazenamento seguro das informações.

* **Swashbuckle / Swagger**: Documentação e testes dos endpoints.

* **Camadas do backend**:
  * **API** – expondo os controllers e endpoints.
  * **Domain** – entidades, DTOs e regras de negócio.
  * **Data** – contexto EF, Migrations e acesso ao banco.

* **Arquitetura em Camadas**: separação de responsabilidades entre API, Domínio e Dados, seguindo boas práticas de mercado.


### **Frontend (SPA)**

* **React (Vite)**: Biblioteca para a construção de uma interface de usuário dinâmica e performática.

* **CSS Modules**: Estilização modular para garantir componentes isolados e organizados.

* **Axios**: Cliente HTTP utilizado para a comunicação assíncrona (Ajax) com o backend.

* **React Router DOM**: Roteamento para navegação single‑page.

* **API externa do IBGE**: consumida para listagem de estados e cidades no cadastro de pontos turísticos.


<br/>

## 📦 Dependências Instaladas

### **Backend**

#### PontosTuristicosAPI

* **Microsoft.EntityFrameworkCore.Design** (8.0.24): Ferramentas de design para Entity Framework Core

* **Microsoft.EntityFrameworkCore.SqlServer** (8.0.24): Provider SQL Server para Entity Framework Core

* **Microsoft.EntityFrameworkCore.Tools** (8.0.24): Ferramentas CLI para Entity Framework Core (Migrations)

* **Swashbuckle.AspNetCore** (6.6.2): Gerador de documentação Swagger/OpenAPI para ASP.NET Core

#### PontosTuristicos.Data

* **Microsoft.EntityFrameworkCore.SqlServer** (8.0.24): Provider SQL Server para Entity Framework Core

* **Microsoft.EntityFrameworkCore.Tools** (8.0.24): Ferramentas CLI para Entity Framework Core

#### PontosTuristicos.Domain

* **System.ComponentModel.Annotations** (5.0.0): Anotações de validação e metadados de componentes


### **Frontend**

#### Dependências Principais

* **React** (^19.2.0): Biblioteca JavaScript para construção de interfaces

* **React DOM** (^19.2.0): Renderização de componentes React no DOM

* **React Router DOM** (^7.13.1): Roteamento para aplicação single-page

* **Axios** (^1.13.6): Cliente HTTP para requisições assíncronas à API

* **sweetalert2 (swal)**: Biblioteca para exibição de alertas bonitos e modais de confirmação no frontend

* **Vite** (^7.3.1): Bundler e dev server de alta performance


<br/>

## 🏛️ Estrutura do Projeto
A solução foi arquitetada seguindo o modelo **Em Camadas**:

1.  **PontosTuristicos.API**: Responsável pelo processamento de requisições e exposição dos endpoints.
2.  **PontosTuristicos.Domain**: Contém as entidades, DTOs e as regras de negócio fundamentais (ex: limite de 100 caracteres para descrição).
3.  **PontosTuristicos.Data**: Camada de infraestrutura que gerencia o contexto do banco de dados, a configuração do EF e as Migrations.

A aplicação também faz requisições a uma **API externa do IBGE** para obter listas de estados e cidades no frontend.

<br/>

## ⚙️ Como executar

Siga os passos abaixo para configurar e iniciar tanto o backend quanto o frontend.

### 🔧 Pré-requisitos

1. .NET 8.0 SDK instalado (pode ser usado qualquer pasta de projeto, preferencialmente na raiz do backend).

2. SQL Server (ou equivalente) disponível para criação do banco.

3. Node.js (v18+ recomendado) e npm.

4. `dotnet-ef` como ferramenta global:  
   ```powershell
   dotnet tool install --global dotnet-ef
   ```


> 📁 Algumas operações têm de ser feitas dentro de pastas específicas; detalhes na seção de configuração.

> ⚠️ O *PATH* do `dotnet` deve incluir a pasta de ferramentas globais para que `dotnet ef` funcione.

### 🗄️ Configurar o Backend

1. Abra um terminal e navegue até `Backend\PontosTuristicos.API`.

2. Copie ou crie o arquivo `appsettings.json` e insira a *connection string* do seu SQL Server na chave `DefaultConnection`.
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=SERVER_AQUI;Database=DATABASE_AQUI;Trusted_Connection=True;TrustServerCertificate=True;"
     }
   }
   ```

3. Restaure dependências e projetos. Execute este comando na raiz da solução (`Backend\PontosTuristicos.API` ou apenas `Backend` se quiser restaurar todos os projetos ao mesmo tempo):
   ```powershell
   dotnet restore
   ```

4. (Opcional) Para usar as ferramentas EF, navegue até o projeto da API (`Backend\PontosTuristicos.API`) antes de rodar os comandos. Por exemplo, para gerar uma migration:
   ```powershell
   cd Backend\PontosTuristicos.API
   dotnet ef migrations add InitialCreate
   ```

   Depois atualize o banco:
   ```powershell
   dotnet ef database update
   ```

   Se as migrations já existirem, basta executar `dotnet ef database update` para criar as tabelas.

5. Inicie a API (ainda na pasta `Backend\PontosTuristicos.API`):
   ```powershell
   dotnet run
   ```
   A saída mostrará a URL base. Por padrão a aplicação é configurada em `launchSettings.json`, então você pode ver várias portas possíveis:
   * **http**: `http://localhost:5220` (perfil `http`)
   * **https**: `https://localhost:7131` (perfil `https`, também responde em `http://localhost:5220`)
   * **IIS Express**: se usar o perfil `IIS Express` ele abre em `http://localhost:12510` com SSL em `https://localhost:44330`.
   
   Ajuste a variável `VITE_API_URL` do frontend para a porta que estiver rodando.


### 🌐 Configurar o Frontend

1. No diretório `Frontend`, crie um arquivo `.env` com a URL da API. **Não deixe espaços extras depois do `=`**, pois o Vite lê literalmente o valor:
   ```env
   # exemplo para perfil https
   VITE_API_URL=https://localhost:7131

   # ou para Http:
   VITE_API_URL=http://localhost:5220
   ```

   > Se a API estiver rodando em outra porta (consulte `launchSettings.json`), ajuste o valor aqui.

2. Instale as dependências:
   ```bash
   cd Frontend
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra o endereço informado pelo Vite (por exemplo, `http://localhost:5173`) no navegador.


> 💡 Certifique-se de que a API esteja rodando antes de iniciar o frontend; o aplicativo busca estados/cidades do IBGE e os pontos turísticos da sua API.

> ⚠️ Se usar `http://localhost:5220`, lembre‑se de atualizar `.env` sem espaços e reiniciar o servidor do Vite. CORS já está liberado para `http://localhost:*` no backend, mas a URL precisa bater exatamente.


### 📋 Observações finais

* O backend utiliza arquitetura em camadas para facilitar manutenções e testes.

* O frontend consome tanto a API local quanto a API pública do IBGE para preencher dropdowns de estados/cidades.

* Sempre atualize a connection string e a variável `VITE_API_URL` se alterar portas ou hosts.

---

### 🛠️ Solução de problemas de comunicação

Se o frontend não consegue falar com a API, verifique:

1. **API em execução** – olhe o terminal onde `dotnet run` foi iniciado; se houver falha (exit code 1) é porque o servidor não está ativo. Corrija erros de conexão com o banco, ports em uso, etc.

2. **URL correta no frontend** – confirme `Frontend/.env` sem espaços extras:
   ```env
   VITE_API_URL=http://localhost:5220
   ```
   e reinicie `npm run dev` sempre que editar.

3. **Porta de resposta** – abra a URL diretamente no navegador (`http://localhost:5220/swagger` ou a porta HTTPS) para garantir que o Swagger apareça.

4. **CORS** – a API permite somente origem `http://localhost:5173` (endereço padrão do Vite). Se o frontend estiver rodando em outra porta, atualize a política em `Program.cs` ou abra devtools e verifique mensagens de CORS.

5. **Redirecionamento HTTPS** – o backend executa `app.UseHttpsRedirection();`. Se estiver usando HTTP, faça a requisição pela porta HTTP correta (5220) ou force `https://localhost:7131` no `.env`.

6. **Verifique o console do navegador** – o painel de rede (network) e console exibem o URL usado e eventuais erros (404, 500, CORS, etc.).




