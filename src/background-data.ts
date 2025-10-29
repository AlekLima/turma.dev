type UserInfo = {
  name: string;
  lastName: string;
  profilePhotoUrl: string;
  urls: string[];
}

export type Project = {
  url: string;
  name: string;
}

export type Background = {
  year: number;
  title: string;
  description: string;
  location?: string;
  durationInMonths?: number;
  isCurrent?: boolean;
  month?: number;
  projects?: Project[];
}

type UserBackground = Background[];

export const listOfYears = [1997, 2016, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export const userData: UserInfo = {
  name: "Jemimma",
  lastName: "Luz",
  profilePhotoUrl: "https://github.com/jemluz.png",
  urls: [
    "https://github.com/jemluz",
    "https://www.linkedin.com/in/jemluz",
    "https://www.turma.dev"
  ]
}

export const contentData: UserBackground = [
  {
    year: 1997,
    title: "Era uma vez 🚩",
    description: "Brasileira, Soteropolitana, 28 anos",
    location: "Salvador/BA",
  },
  {
    year: 2013,
    title: "Ensino médio",
    description: "primeiro contato com programação \n - HTML e CSS",
  },
  {
    year: 2016,
    title: "Ingressou na UFC ✈️",
    description: "Bacharelado em Sistemas e Mídias Digitais",
    location: "Fortaleza/CE",
    month: 3,
  },
  {
    year: 2016,
    title: "Trainee CoDi Jr. ❤️💚💙",
    description: "entrou na empresa júnior do SMD",
    month: 6,
  },
  {
    year: 2018,
    title: "Entrou para a diretoria 🥸",
    description: "eleita como Diretora de Projetos da CoDi Jr.",
    durationInMonths: 8,
    month: 4,
  },
  {
    year: 2018,
    title: "Estágio frontend - JGV",
    description: "o primeiro bug em produção a gente nunca esquece ;)",
    durationInMonths: 12,
    month: 8,
  },
  {
    year: 2019,
    title: "Jr. Developer - JGV 🤓",
    description: "o estágio rendeu muitos frutos como um app mobile com + 100K downloads!",
    location: "Salvador/BA",
    month: 8,
    projects: [
      {
        url: "https://www.turma.dev",
        name: "Turma.dev"
      }
    ]
  },
  {
    year: 2020,
    title: "UX Developer - Ootz 🛍️",
    description: "atuei em um e-commerce com Next.js",
    location: "Curitiba/PR",
    durationInMonths: 6,
  },
  {
    year: 2021,
    title: "Dev Jr Flutter / Designer UI - bHave 📲",
    description: "redesign e implementação em um app Flutter de terapia para autismo.",
    location: "Recife/PE",
    durationInMonths: 11,
    month: 4,
    projects: [
      {
        url: "",
        name: "bHave App"
      },
      {
        url: "https://www.turma.dev",
        name: "Minha geladeira"
      }
    ]
  },
  {
    year: 2021,
    title: "Software Engineer - Levva 💛🖤💛",
    description: "atuei com angular e react, em projetos nacionais e internacionais, para fábricas de cervejaria, e para deliverys, com milhões de usuários ativos. Em clientes como AmbevTech, BEES e Zé Delivery",
    location: "Campinas/SP",
    isCurrent: true,
    month: 8,
    projects: [
      {
        url: "",
        name: "Frontend Artesanal"
      }
    ]
  },
  {
    year: 2022,
    title: "O diploma veio aí! 🎓",
    description: "conclusão do bacharelado em Sístemas e Mídias Digitais!",
    location: "Fortaleza/CE",
    month: 12,
    projects: [
      {
        url: "",
        name: "Diplomata"
      },
      {
        url: "",
        name: "TCC UFC - Diplomata"
      }
    ]
  },
  {
    year: 2022,
    title: "Ingressou no Ignite 🚀",
    description: "início do programa de especialização em React da @Rocktseat",
    month: 12,
    projects: [
      {
        url: "",
        name: "Ignite - Especialização em React"
      },
    ]
  },
  {
    year: 2023,
    title: "Primeira produção de conteúdo 🎥",
    description: "gravei uma série de 9h para introdução em frontend",
    month: 3,
    projects: [
      {
        url: "",
        name: "Frontend Artesanal"
      },
      {
        url: "",
        name: "Material complementar"
      }
    ]
  },
  {
    year: 2023,
    title: "Ingressou no curso.dev 📝",
    description: "estudando full cycle com o Filipe Deschamps",
    month: 6,
    projects: [
      {
        url: "",
        name: "Clone tabnews"
      },
    ]
  },
  {
    year: 2024,
    title: "Especialista em React e Next.js🏅",
    description: "concluiu a especialização em React e Next.js da @Rocktseat",
    month: 12,
    projects: [
      {
        url: "",
        name: "Ignite - Especialização em React"
      },
      {
        url: "",
        name: "Ignite - Certificado"
      },
    ]
  },
  {
    year: 2025,
    title: "Iniciou os estudos em Web3 e Open Source 🌐",
    description: "comecei a estudar blockchain, DAOs, DApps, Smart Contracts, e abrir meus olhos para o mundo open source.",
    month: 1,
  },
];