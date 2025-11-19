# Muutus - Plataforma de Troca de Conhecimento

## Sobre o Projeto

**Muutus** é uma plataforma web que conecta professores e alunos para troca de conhecimento. O site permite que professores ofereçam suas aulas e que alunos encontrem o professor ideal para aprender novas habilidades.

## Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e design responsivo
- **JavaScript** - Funcionalidades interativas
- **LocalStorage** - Armazenamento de dados do lado do cliente

## Estrutura do Projeto

```
muutus/
├── index.html              # Página inicial
├── professores.html        # Listagem de professores
├── professor-perfil.html   # Perfil detalhado do professor
├── login.html              # Página de login
├── cadastro.html           # Página de cadastro
├── css/
│   ├── styles.css          # Estilos globais
│   ├── professores.css     # Estilos da listagem
│   ├── professor-perfil.css # Estilos do perfil
│   └── auth.css            # Estilos de autenticação
├── js/
│   ├── main.js             # JavaScript principal
│   ├── professores.js      # Funcionalidades da listagem
│   ├── professor-perfil.js # Funcionalidades do perfil
│   └── auth.js             # Sistema de autenticação
└── README.md               # Documentação
```

## Funcionalidades

### Página Inicial
- Hero section com slogan inspirador
- Barra de busca para aulas e professores
- Grid de categorias (Arte, Tecnologia, Saúde, Ciências, Hobbies, Idiomas)
- Seção de professores em destaque
- Depoimentos de usuários
- Call-to-action para cadastro

### Listagem de Professores
- Busca por nome ou especialidade
- Filtros por:
  - Categoria
  - Faixa de preço
  - Avaliação mínima
- Ordenação por:
  - Melhor avaliação
  - Menor/maior preço
  - Mais avaliações
- Sistema de paginação
- Botão de favoritar professores

### Perfil do Professor
- Informações detalhadas do professor
- Biografia e especialidades
- Sistema de avaliações com estrelas
- Distribuição de avaliações
- Comentários de alunos
- Modal de agendamento de aulas
- Cálculo automático de preços e taxas
- Sistema de favoritos

### Sistema de Autenticação
- Cadastro de novos usuários
- Login com e-mail e senha
- Opção de "Lembrar de mim"
- Validação de formulários
- Escolha de tipo de usuário (Aluno/Professor/Ambos)
- Armazenamento de sessão

### Funcionalidades JavaScript
- Busca e filtros dinâmicos
- Sistema de favoritos (localStorage)
- Modal de agendamento
- Validação de formulários
- Sistema de avaliação com estrelas
- Navegação dinâmica entre páginas
- Cálculo de preços em tempo real

## Como Executar

1. Clone ou baixe o projeto
2. Navegue até a pasta do projeto
3. Execute um servidor HTTP local:

```bash
# Usando Python 3
python3 -m http.server 3000

# Ou usando Node.js
npx http-server -p 3000
```

4. Acesse no navegador: `http://localhost:3000`

## Design

### Paleta de Cores
- **Primária**: Azul (#2563eb)
- **Secundária**: Roxo (#7c3aed)
- **Texto**: Cinza escuro (#1f2937)
- **Fundo**: Branco e cinza claro (#f9fafb)
- **Destaque**: Amarelo (avaliações)

### Tipografia
- Fonte: **Inter** (Google Fonts)
- Pesos: 300, 400, 500, 600, 700

### Responsividade
- Mobile-first design
- Breakpoints:
  - Mobile: até 640px
  - Tablet: 641px - 968px
  - Desktop: 969px+

## Dados de Exemplo

O projeto utiliza dados simulados armazenados em `js/main.js`:

- **6 professores** com diferentes especialidades
- **Categorias**: Arte, Tecnologia, Saúde, Ciências, Hobbies, Idiomas
- **Avaliações** e comentários de exemplo
- **Preços** variando de R$ 80 a R$ 150 por hora

## Funcionalidades Futuras

- [ ] Dashboard do professor
- [ ] Dashboard do aluno
- [ ] Sistema de mensagens
- [ ] Integração com pagamento
- [ ] Calendário de disponibilidade
- [ ] Videoconferência integrada
- [ ] Certificados de conclusão
- [ ] Sistema de notificações
- [ ] Recuperação de senha
- [ ] Perfil editável

## Observações

⚠️ **Importante**: Este é um projeto de demonstração. Em um ambiente de produção:

1. **Nunca armazene senhas em texto puro** - Use hashing (bcrypt, argon2)
2. **Use um backend real** - Node.js, Python, PHP, etc.
3. **Implemente autenticação segura** - JWT, OAuth, etc.
4. **Use um banco de dados** - MySQL, PostgreSQL, MongoDB, etc.
5. **Adicione validação no servidor** - Nunca confie apenas na validação do cliente
6. **Implemente HTTPS** - Certificados SSL/TLS
7. **Proteja contra ataques** - XSS, CSRF, SQL Injection, etc.

## Licença

Este projeto é de código aberto e está disponível para fins educacionais.

## Contato

Para mais informações sobre a plataforma Muutus, entre em contato através do site.

---

**Muutus** - Aprenda o que quiser. Ensine o que ama. ❤️
