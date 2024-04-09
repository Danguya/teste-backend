# Especificações do Projeto de Gerenciamento de Tarefas

## Requisitos Funcionais

[ ] - **RF1:** Usuários podem criar, atualizar e excluir tarefas.
  [ ] - **RF1.1:** Usuários podem criar tarefas.
  [ ] - **RF1.2:** Usuários podem atualizar tarefas.
  [ ] - **RF1.3:** Usuários podem excluir tarefas.
  [ ] - **RF1.4:** Cada tarefa deve ter um título e uma descrição.

[ ] - **RF2:** Usuários podem visualizar todas as tarefas em uma lista.
  [ ] - **RF2.1:** Implementar paginação na listagem de tarefas.

[ ] - **RF3:** Usuários podem buscar e filtrar tarefas na listagem.
  [ ] - **RF3.1:** Busca por título.
  [ ] - **RF3.2:** Filtros aplicáveis na listagem.

[ ] - **RF4:** Implementar autenticação de usuários.


## Regras de Negócio

[ ] - **RN1:** Validação de dados obrigatórios e formatação para tarefas.
  [ ] - **RN1.1:** Título (mínimo de 3 caracteres) e descrição são obrigatórios.

[ ] - **RN2:** Acesso às funcionalidades conforme autenticação.
  [ ] - **RN2.1:** Somente usuários autenticados podem criar, atualizar ou excluir tarefas.
  [ ] - **RN2.2:** Visualização de tarefas disponível para não autenticados.

[ ] - **RN3:** Armazenamento de tarefas no Banco de Dados Acebasse com ID único.

[ ] - **RN4:** Suporte a paginação e busca insensível a maiúsculas/minúsculas na listagem de tarefas.


## Requisitos Não Funcionais

[ ] - **RNF1:** Interface do usuário com React.js e Material UI.
[ ] - **RNF2:** Segurança na autenticação e na validação de dados.
[ ] - **RNF3:** Desempenho: respostas em até 2 segundos.
[ ] - **RNF4:** Uso de Node.js, TypeScript, Banco de Dados Acebasse, e Express no back-end.