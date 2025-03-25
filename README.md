<img loading="lazy" src="./public/logo_to_do.png" width="100" height="100"/>

# Make It Work - Defina suas metas através de IA 

<img loading="lazy" src="./public/system_print.png" width="900" height="600"/>

## Domínio do Problema (Escopo)

Este aplicativo tem como objetivo ajudar os usuários a atingirem suas metas e objetivos de aprendizado, seja para desenvolver uma nova habilidade, praticar um hobby ou atingir qualquer tipo de meta pessoal. O sistema gera tarefas diárias baseadas no objetivo do usuário, acompanha o progresso e ajusta o cronograma automaticamente em caso de atrasos. O usuário é mantido motivado por meio de feedbacks, e o sistema garante que ele só inicie um novo objetivo após concluir o atual.

## Objetivo do Software e Problema Resolvido

O objetivo do software é simplificar o processo de definição e acompanhamento de metas, através de Inteligência Artificial, automatizando a criação de cronogramas personalizados e ajustando-os conforme o progresso do usuário. Ele resolve o problema de falta de organização e motivação, que muitas vezes impede as pessoas de atingirem seus objetivos. Além disso, o sistema garante que o usuário mantenha o foco em um objetivo por vez, promovendo maior comprometimento e eficiência.

## Público-Alvo

O público-alvo do "Make It Work" inclui estudantes, profissionais, autodidatas e qualquer pessoa que deseje alcançar metas pessoais ou profissionais de forma estruturada. As principais funcionalidades incluem:

### Funcionalidades principais:

- **Objetivos personalizados**: O usuário define um objetivo (ex: aprender a tocar violão) para a IA e o aplicativo gera um cronograma com tarefas diárias específicas.
- **Acompanhamento de progresso**: O usuário pode marcar as tarefas como concluídas e visualizar seu progresso através de um heatmap interativo.
- **Previsão de tempo restante**: O heatmap exibe a previsão de tempo restante para concluir o objetivo.
- **Motivação**: O sistema oferece mensagens motivacionais.
- **Conquista e novos objetivos**: Quando o usuário completa um objetivo, ele é parabenizado e o histórico de objetivos concluídos é armazenado.
- **Impedimento de novos objetivos**: O usuário não pode iniciar um novo objetivo antes de completar o atual.

## Tecnologias Utilizadas

- **NEXTJ**: Para construção da interface de usuário dinâmica e responsiva e criação de API.
- **SUPABASE**: Para armazenamento de dados.

## Requisitos Funcionais

### 1. Gestão de Objetivos

- **RF-01**: O sistema deve permitir que o usuário defina um objetivo de aprendizado.
- **RF-02**: O sistema deve permitir que o usuário edite um objetivo ativo antes de iniciá-lo.
- **RF-03**: O sistema deve impedir que o usuário crie um novo objetivo antes de concluir o objetivo atual.
- **RF-04**: O sistema deve armazenar um histórico de objetivos concluídos.

### 2. Geração e Gerenciamento de Tarefas

- **RF-05**: O sistema deve gerar automaticamente um cronograma com tarefas diárias com base no objetivo definido pelo usuário.
- **RF-06**: O sistema deve permitir que o usuário visualize as tarefas do dia.
- **RF-07**: O sistema deve permitir que o usuário marque uma tarefa como concluída.
- **RF-08**: O sistema deve exibir um resumo do progresso do usuário.

### 3. Acompanhamento de Progresso

- **RF-09**: O sistema deve exibir um heatmap para visualização do progresso do usuário.
- **RF-10**: O sistema deve exibir a previsão de tempo restante para conclusão do objetivo.

### 4. Autenticação e Gestão de Usuários

- **RF-11**: O sistema deve permitir que o usuário crie uma conta e faça login.

## Requisitos Não Funcionais (RNF)

### 1. Segurança

- **RNF-01**: O sistema deve armazenar senhas de forma criptografada.
- **RNF-02**: O sistema deve utilizar autenticação segura para login e gerenciamento de usuários.
- **RNF-03**: O acesso ao banco de dados deve ser protegido contra SQL Injection e outras vulnerabilidades.

### 2. Usabilidade

- **RNF-04**: O sistema deve possuir uma interface intuitiva e responsiva.
- **RNF-05**: O sistema deve funcionar corretamente tanto em desktops quanto em dispositivos móveis.
