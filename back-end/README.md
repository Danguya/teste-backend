# Especificações do Projeto de Gerenciamento de Tarefas

## RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar usuários.
- [x] Deve ser possível criar tarefas com título e descrição.
- [x] Deve ser possível atualizar tarefas.
- [x] Deve ser possível excluir tarefas.
- [x] Deve ser possível visualizar todas as tarefas em uma lista.
- [x] Deve ser possível implementar paginação na listagem de tarefas.
- [x] Deve ser possível buscar tarefas por título.
- [ ] Deve ser possível filtrar tarefas na listagem.
- [ ] Deve ser possível implementar autenticação de usuários.

## RNs (Regras de Negócio)

- [ ] A tarefa só pode ser atualizada ou excluída pelo usuário que a criou.
- [x] Tarefas devem ter um título e uma descrição para serem criadas.
- [ ] O acesso para criar, atualizar e excluir tarefas é restrito a usuários autenticados.
- [x] A paginação da listagem de tarefas deve conter 20 itens por página.
- [x] A busca e os filtros na listagem de tarefas devem ser insensíveis a maiúsculas e minúsculas.

## RNFs (Requisitos Não Funcionais)

- [ ] A interface do usuário deve ser desenvolvida utilizando React.js e Material UI.
- [ ] O sistema deve validar os dados do usuário tanto no front-end quanto no back-end.
- [ ] A aplicação deve implementar segurança na autenticação dos usuários com JWT (JSON WEB TOKEN).
- [x] O back-end deve ser desenvolvido em Node.js, TypeScript, utilizando o Banco de Dados Acebasse e Express.
- [ ] A senha do usuário precisa estar criptografada.
- [ ] Os dados da aplicação precisam estar persistidos em um banco Acebase.
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um JWT(JSON WEB TOKEN).
