# Especificações do Projeto de Gerenciamento de Tarefas

## RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar usuários.
- [x] Deve ser possível criar tarefas com título e descrição.
- [x] Deve ser possível atualizar tarefas.
- [x] Deve ser possível excluir tarefas.
- [x] Deve ser possível visualizar todas as tarefas em uma lista.
- [x] Deve ser possível implementar paginação na listagem de tarefas.
- [x] Deve ser possível buscar tarefas por título.
- [x] Deve ser possível filtrar tarefas na listagem.
- [x] Deve ser possível implementar autenticação de usuários.

## RNs (Regras de Negócio)

- [x] A tarefa só pode ser atualizada ou excluída pelo usuário que a criou.
- [x] Tarefas devem ter um título e uma descrição para serem criadas.
- [x] O acesso para criar, atualizar e excluir tarefas é restrito a usuários autenticados.
- [x] A paginação da listagem de tarefas deve conter 20 itens por página.
- [x] A busca e os filtros na listagem de tarefas devem ser insensíveis a maiúsculas e minúsculas.

## RNFs (Requisitos Não Funcionais)

- [x] A interface do usuário deve ser desenvolvida utilizando React.js e Material UI.
- [x] O sistema deve validar os dados do usuário tanto no front-end quanto no back-end.
- [x] A aplicação deve implementar segurança na autenticação dos usuários com JWT (JSON WEB TOKEN).
- [x] O back-end deve ser desenvolvido em Node.js, TypeScript, utilizando o Banco de Dados Acebasse e Express.
- [x] A senha do usuário precisa estar criptografada.
- [x] Os dados da aplicação precisam estar persistidos em um banco Acebase.
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página.
- [x] O usuário deve ser identificado por um JWT(JSON WEB TOKEN).
