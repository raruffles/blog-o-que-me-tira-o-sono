export const posts = {
  'primeiro-dia': {
    title: 'Primeiro dia',
    readTime: '0,7 min read',
    color: 'tone-forest',
    paragraphs: [
      'Depois das férias, agora em uma escola nova. Francisco vinha contando os dias. Hoje, no escuro da madrugada, levantou duas vezes, guiado por uma ansiedade maior que ele. Pela manhã, cuidou de tudo com uma precisão quase ritual: organizou o material, conferiu a agenda que criamos juntos, separou o uniforme com a solenidade de quem sabe que os pequenos atos também são grandes.',
      'Fiquei observando. A alegria dele era tão simples, tão pura, que era impossível não me emocionar. Porque a felicidade de um filho faz a gente acreditar em milagres cotidianos.',
      'Me emocionei com as coisas pequenas, com aquilo que faz a vida parecer possível: rotinas, horários, expectativas.',
      'A vida segue generosa. Não porque precise ser, mas porque, às vezes, apesar de tudo, ela simplesmente é. Basta olhar.',
    ],
  },
  'o-dia-comum': {
    title: 'O dia comum',
    readTime: '1,2 min read',
    color: 'tone-sky',
    paragraphs: [
      'Há dias em que tudo parece suspenso, como se o tempo estivesse apenas passando por dentro da casa sem fazer barulho.',
      'O comum também guarda beleza. A mesa posta, a janela aberta, o gesto que se repete e ainda assim parece novo.',
      'Quando escrevo sobre o simples, eu tento preservar a delicadeza do que existe antes de virar lembrança.',
    ],
  },
  'depois-das-ferias': {
    title: 'Depois das férias',
    readTime: '2 min read',
    color: 'tone-paper',
    paragraphs: [
      'Voltar é sempre um tipo de tradução. A rotina reaparece com sua gramática própria e a casa aprende de novo os nossos passos.',
      'Tem algo de doce no recomeço quando ele chega sem alarde, só com a coragem de continuar.',
      'Escrever também é isso: reorganizar os dias para que eles caibam dentro de uma página.',
    ],
  },
  'a-noite-em-branco': {
    title: 'A noite em branco',
    readTime: '3 min read',
    color: 'tone-amber',
    paragraphs: [
      'A noite em branco não é sobre ausência de sono apenas. É sobre tudo que volta quando o mundo reduz o volume.',
      'Algumas ideias insistem em ficar acordadas conosco até o amanhecer, como se quisessem ser ditas com mais cuidado.',
      'No fim, o que me tira o sono às vezes é o mesmo que me empurra para a página.',
    ],
  },
};

export const postList = Object.entries(posts).map(([slug, post]) => ({
  slug,
  ...post,
}));