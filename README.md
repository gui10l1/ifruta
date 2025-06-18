
# 📱 iFruta

Foi desenvolvido com [React Native](https://reactnative.dev/) utilizando o [Expo](https://expo.dev/), com suporte para execução diretamente no aplicativo **Expo Go**. 

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado: - [Node.js](https://nodejs.org/) (versão LTS recomendada) - [Expo CLI](https://docs.expo.dev/get-started/installation/) - [Git](https://git-scm.com/) - Um smartphone com o app [Expo Go](https://expo.dev/client) instalado (Android ou iOS)

## 🚀 Como rodar o projeto

Siga os passos abaixo para rodar o app localmente no seu dispositivo com **Expo Go**: 

### 1. Clone o repositório 

```bash
git clone https://github.com/gui10l1/ifruta.git && cd ifruta
```

2. Instale as dependências
```bash
npm install
```

3. Variáveis de ambiente

Este projeto faz uso de variáveis de ambiente, isso porque os valores dessas variáveis
são considerados sensíveis e definem como o aplicativo vai funcionar.

Na raiz deste projeto existe um arquivo chamado `.env.example` que serve como uma orientação
para criar o arquivo definitivo `.env` que define essas variáveis para o projeto.

Copie o conteúdo do arquivo `.env.example` e crie um novo na raiz do projeto chamado `.env`
e cole o seguinte conteúdo:

```txt
EXPO_PUBLIC_SUPABASE_URL='https://fijbrzhvaggnbuzvakzw.supabase.co'
EXPO_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpamJyemh2YWdnbmJ1enZha3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODQwNTAsImV4cCI6MjA2NTY2MDA1MH0.VojOLXXpOTr1ecsfY1tbCWGOJD2SdeN0xEn7incRS_M'
```

**As informações do Supabase são de autoria de Guilherme Ribeiro Soares. Após a avaliação deste projeto as informações acima serão revogadas**

O conteúdo acima é referente ao Supabase, que é o serviço que vai forcener dados e atuará como backend para o aplicativo.

4. Inicie o servidor de desenvolvimento
```bash
npm start
```

Isso abrirá uma aba no navegador com o Expo DevTools. Você verá um QR Code que pode ser escaneado com o app Expo Go no seu celular para rodar o app.

## Fluxos

Todo o aplicativo foi testado durante o desenvolvimento e deve funcionar corretamente em qualquer fluxo que o usuário deseja testar.

Abaixo está um sumário de todos os fluxos possíveis e testados pelo time de desenvolvimento:

1. Login
2. Cadastro
3. Home -> Filtros -> Aplicar filtros
4. Home -> Filtros -> Resetar filtros
5. Home -> Produto -> Vendedor -> Ligar para o telefone
6. Home -> Produto -> Vendedor -> Enviar email
7. Home -> Produto -> Vendedor -> Avaliar produto
8. Home -> Produto -> Salvar nos favoritos
8. Home -> Produto -> Contatar vendedor -> Conversa
9. Home -> Produtos -> Atualizar lista
10. Home -> Perfil -> Editar perfil -> Confirmar alterações
11. Home -> Perfil -> Atualizar tela
12. Home -> Perfil -> Sair
13. Favoritos -> Filtrar por categoria
14. Favoritos -> Atualizar lista
15. Favoritos -> Produto -> ...
16. Criar postagem -> Categorias -> Selecionar categoria
17. Criar postagem -> Tipo -> Selecionar tipo de postagem
18. Criar postagem -> Fotos -> Adicionar foto -> Selecionar da galeria -> Selecionar imagem -> Editar imagem -> Confirmar
19. Criar postagem -> Fotos -> Adicionar foto -> Tirar foto -> Pedir permissão (se necessário)
20. Criar postagem -> Fotos -> Adicionar foto -> Tirar foto -> Capturar fotografia
21. Criar postagem -> Continuar -> Mais detalhes -> Condição do produto -> Selecionar condição do produto
22. Criar postagem -> Continuar -> Mais detalhes -> Publicar
23. Chat -> Conversas -> Conversa
24. Chat -> Perfil -> Editar perfil -> Confirmar alterações
25. Chat -> Perfil -> Sair

# Alunos

- Eduarda Santos Diniz - uc2310132
- Lucas Seidii Shinohara Moura - Uc23101630
- Arthur Henrique dos Santos Sousa Alves de Godoy - UC23102220
- Ana Clara Clímaco Marinho -uc22201233
- Pedro Vinicius Silva Gomes de Souza - UC23201033
- Guilherme Ribeiro Soares - uc21200089
- GABRIEL VIEIRA FERREIRA - UC23100292
