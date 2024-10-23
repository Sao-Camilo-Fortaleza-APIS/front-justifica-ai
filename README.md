# Justifica aí

  ## O que é?
    É uma aplicação web que permite a criação de justificativas de ponto de forma rápida e fácil, sem a necessidade de preencher folhas de ponto manualmente ou planilhas.
    
  ## Como funciona?
    O colaborador acessa o sistema, e cria uma justificativa de ponto, informando o dia, horário de entrada e saída, e o motivo da justificativa. O gerente recebe uma notificação de que uma justificativa foi criada, e pode visualizar a justificativa, e aprovar ou rejeitar a justificativa, informando um motivo para a rejeição. O Departamento Pessoal pode visualizar todas as justificativas de ponto, e atender a solicitação do colaborador, caso a justificativa seja aprovada.

  ## Por que usar?
    - **Rapidez**: Criação de justificativas de ponto de forma rápida e fácil.
    - **Facilidade**: Não é necessário preencher folhas de ponto manualmente ou planilhas.
    - **Organização**: Todas as justificativas de ponto ficam armazenadas em um único local, facilitando a visualização e controle.

  ## Requisitos Funcionais (RF)

  ### Colaborador (RFC)
  - **RFC 01**: O colaborador deve poder criar uma justificativa de ponto, informando o dia, horário (entrada/almoço/saída), e o motivo da justificativa.
  - **RFC 02**: O colaborador deve poder visualizar as suas justificativas de ponto dos últimos 3 meses.

  ### Gerente (RFG)
  - **RFG 01**: O gerente deve receber uma notificação quando uma justificativa de ponto for criada.
  - **RFG 02**: O gerente deve poder visualizar todas as justificativas de ponto criadas pelos colaboradores do seu setor.
  - **RFG 03**: O gerente deve poder aprovar ou rejeitar uma justificativa de ponto, informando um motivo para a rejeição.
  - **RFG 04**: O gerente deve poder escolher se a justificativa será abonada ou não.
  - **RFG 05**: O gerente deve poder visualizar todas as justificativas de ponto aprovadas e rejeitadas.
  - **RFG 06**: O gerente deve poder visualizar todas as justificativas de ponto pendentes de aprovação.

  ### Departamento Pessoal (RFD)
  - **RFD 01**: O Departamento Pessoal deve poder visualizar todas as justificativas de ponto aprovadas e rejeitadas.
  - **RFD 02**: O Departamento Pessoal deve poder atender a solicitação do colaborador, caso a justificativa seja aprovada pelo gerente.
  - **RFD 03**: O Departamento Pessoal deve poder visualizar todas as justificativas de ponto pendentes de atendimento.
  - **RFD 04**: O Departamento Pessoal deve enviar um histórico na justificativa de ponto.
  - **RFD 05**: O Departamento Pessoal deve poder visualizar todas as justificativas de ponto com histórico.


  ## Requisitos Não Funcionais (RNF)
  - **RNF 01**: O sistema deve ser responsivo, funcionando em dispositivos móveis e desktop.
  - **RNF 02**: O sistema deve ser seguro, com autenticação de usuários.
  - **RNF 03**: O sistema deve ser intuitivo, com uma interface amigável e fácil de usar.
  - **RNF 04**: O sistema deve ser escalável, suportando um grande número de usuários.
  - **RNF 05**: O sistema deve manter um registro de todas as ações realizadas pelos usuários.
  - **RNF 06**: O sistema deve ser de fácil integração com outros sistemas.

  ## Regras de Negócio (RN)
  ### Sistema (RNS)
  - **RNS 01**: O sistema não deve realizar cadastros de pessoas.
  - **RNS 02**: O sistema deve utilizar os cadastros já existentes na empresa.
  - **RNS 03**: O sistema deve ser acessado por colaboradores, gerentes e Departamento Pessoal.
  - **RNS 04**: O sistema só pode ser acessado por usuários autenticados.
  - **RNS 05**: O sistema deve utilizar um token JWT para autenticação.
  - **RNS 06**: O sistema deve armazenar as justificativas de ponto em um banco de dados.
  - **RNS 07**: O sistema não deve permitir a criação de justificativas de ponto para dias futuros.	

  ### Colaborador (RNC)
  - **RNC 01**: O colaborador só pode criar uma justificativa de ponto para si mesmo.
  - **RNC 02**: O colaborador só pode editar uma justificativa de ponto se a mesma estiver pendente de aprovação pelo gerente.
  - **RNC 03**: O colaborador só pode visualizar suas próprias justificativas de ponto.
  - **RNC 04**: O colaborador só pode criar uma justificativa de ponto por vez.
  - **RNC 05**: O colaborador só pode criar uma justificativa de ponto para o dia atual ou dias anteriores.

  ### Gerente (RNG)
  - **RNG 01**: O gerente só pode visualizar as justificativas de ponto dos colaboradores do seu setor.
  - **RNG 02**: O gerente só pode aprovar ou rejeitar uma justificativa de ponto se a mesma estiver pendente de aprovação.
  - **RNG 03**: O gerente só pode abonar uma justificativa de ponto se a mesma estiver aprovada.

  ### Departamento Pessoal (RND)
  - **RND 01**: O Departamento Pessoal só pode visualizar as justificativas de ponto aprovadas pelo gerente.
  - **RND 02**: O Departamento Pessoal só pode atender a solicitação do colaborador se a justificativa estiver aprovada pelo gerente.

  ## Tecnologias Utilizadas
  - **Frontend**: React, TypeScript, Tailwind CSS, Axios, React Hook Form, Shadcn-ui e npm.
  - **Backend**: Python, Flask, 
  - **Banco de Dados**: 
  - **Autenticação**: JWT

  ## Telas

  ### Colaborador
  - **Tela de Login**
  - **Tela de Visualização de Justificativas de Ponto**
  - **Tela de Criação de Justificativa de Ponto**
  - **Tela de Edição de Justificativa de Ponto**

  ### Gerente
  - **Tela de Login**
  - **Tela de Visualização de Justificativas de Ponto Pendentes**
  - **Tela de Visualização de Justificativas de Ponto Aprovadas**
  - **Tela de Visualização de Justificativas de Ponto Rejeitadas**
  - **Tela de Aprovação de Justificativa de Ponto**
  - **Tela de Rejeição de Justificativa de Ponto**

  ### Departamento Pessoal
  - **Tela de Login**
  - **Tela de Visualização de Justificativas de Ponto Pendentes de Atendimento**
  - **Tela de Visualização de Justificativas de Ponto Atendidas**

  
