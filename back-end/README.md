# Especificações do Projeto de Gerenciamento de Tarefas

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível criar tarefas com título e descrição.
- [ ] Deve ser possível atualizar tarefas.
- [ ] Deve ser possível excluir tarefas.
- [ ] Deve ser possível visualizar todas as tarefas em uma lista.
- [ ] Deve ser possível implementar paginação na listagem de tarefas.
- [ ] Deve ser possível buscar tarefas por título.
- [ ] Deve ser possível filtrar tarefas na listagem.
- [ ] Deve ser possível implementar autenticação de usuários.

## RNs (Regras de Negócio)

- [ ] A tarefa só pode ser atualizada ou excluída pelo usuário que a criou.
- [ ] Tarefas devem ter um título e uma descrição para serem criadas.
- [ ] O acesso para criar, atualizar e excluir tarefas é restrito a usuários autenticados.
- [ ] A paginação da listagem de tarefas deve conter 20 itens por página.
- [ ] A busca e os filtros na listagem de tarefas devem ser insensíveis a maiúsculas e minúsculas.

## RNFs (Requisitos Não Funcionais)

- [ ] A interface do usuário deve ser desenvolvida utilizando React.js e Material UI.
- [ ] O sistema deve validar os dados do usuário tanto no front-end quanto no back-end.
- [ ] As respostas das requisições ao servidor devem ocorrer em até 2 segundos.
- [ ] A aplicação deve implementar segurança na autenticação dos usuários com JWT (JSON WEB TOKEN).
- [ ] O back-end deve ser desenvolvido em Node.js, TypeScript, utilizando o Banco de Dados Acebasse e Express.
