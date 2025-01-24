# Jogo do Número Secreto

## Descrição
O "Jogo do Número Secreto" é um jogo interativo onde o jogador tenta adivinhar um número aleatório gerado pelo sistema entre 1 e 10. O jogo fornece feedback sobre os palpites do jogador, ajudando-o a descobrir o número correto. A lógica do jogo é implementada em JavaScript, utilizando funções para modularizar o código e melhorar a legibilidade.

## Lógica do Jogo

### Estrutura Básica
O jogo é construído em torno de algumas funções principais:

1. **Geração de Número Aleatório**: 
   - A função `gerarNumeroAleatorio` cria um número aleatório entre 1 e 10. Se todos os números dentro desse intervalo já tiverem sido gerados, a lista de números sorteados é reiniciada.
   - Para garantir que o número gerado seja único em uma rodada, a função verifica se o número já foi sorteado, chamando-se recursivamente até encontrar um número inédito.

2. **Interação com o Jogador**:
   - A função `exibirMensagemInicial` apresenta ao jogador o objetivo do jogo e instruções.
   - A função `verificarChute` é chamada quando o jogador faz um palpite. Ela compara o palpite com o número secreto e fornece feedback:
     - Se o palpite estiver correto, exibe uma mensagem de sucesso e permite que o jogador reinicie o jogo.
     - Se o palpite estiver incorreto, informa se o número secreto é maior ou menor que o palpite, e incrementa o contador de tentativas.

3. **Reinicialização do Jogo**:
   - A função `reiniciarJogo` permite que o jogador comece uma nova rodada. Ela reseta as variáveis relevantes, exibe a mensagem inicial novamente e gera um novo número secreto.

### Fluxo do Jogo
1. O jogo inicia chamando `exibirMensagemInicial`, que orienta o jogador a escolher um número.
2. O número secreto é gerado e armazenado.
3. O jogador faz um palpite que é verificado pela função `verificarChute`.
4. O jogo continua até que o jogador acerte o número ou escolha reiniciar.

### Tecnologias Utilizadas
- **HTML** para a estrutura da página.
- **CSS** para o estilo visual.
- **JavaScript** para a lógica do jogo.

## Como Jogar
1. Acesse o jogo em um navegador web.
2. Insira um número entre 1 e 10.
3. Receba feedback sobre seu palpite e continue até acertar o número.
4. Após acertar, você pode reiniciar o jogo.

## Acesso
Você pode jogar o "Jogo do Número Secreto" acessando [aqui](https://mireiatorres.github.io/jogo_numero_secreto/).
