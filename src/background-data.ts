type UserInfo = {
  name: string;
  lastName: string;
  profilePhotoUrl: string;
  urls: string[];
};

export type Project = {
  url: string;
  name: string;
};

export type Background = {
  id: string;
  year: number;
  title: string;
  description: string;
  location?: string;
  durationInMonths?: number;
  isCurrent?: boolean;
  month?: number;
  projects?: Project[];
  isInactive?: boolean;
};

type UserBackground = Background[];

export const listOfYears = [
  1997, 2016, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

export const userData: UserInfo = {
  name: "Alek",
  lastName: "Lima",
  profilePhotoUrl: "https://github.com/AlekLima.png",
  urls: [
    "https://github.com/AlekLima",
    "https://www.linkedin.com/in/alekteles/",
    // "https://www.turma.dev",
  ],
};

export const contentData: UserBackground = [
  {
    id: "bg-1997-09",
    year: 2000,
    month: 7,
    title: "Nascimento🚩",
    description: "Brasileiro, Fortalezense",
    location: "Fortaleza/CE",
  },
  {
    id: "bg-2013-02",
    year: 2022,
    month: 9,
    title: "Primeiro contato com programação",
    description: "Primeiros projetos: Disney Clone, Fridge,  \n -  HTML e CSS",
    projects: [
      {
        url: "https://fireblogs-bdcc3.web.app",
        name: "Fire Blogs",
      },
      
      {
        url: "https://disney-clne.vercel.app",
        name: "Disney clone",
      },

      {
        url: "https://fridge-html-xi.vercel.app",
        name: "Projeto Fridge",
      },
      
    ],

  },
  {
    id: "bg-2016-03",
    year: 2023,
    month: 2,
    title: "Ingressou na Faculdade Estácio de Sá",
    description: "Bacharelado em Ciências da Computação",
    location: "Fortaleza/CE",
  },
  
 
 
  
  {
    id: "bg-2022-12b",
    year: 2024,
    month: 2,
    title: "Ingressou no Ignite 🚀",
    description: "início do programa de especialização em Node/Typescript da @Rocktseat",
    projects: [
      {
        url: "https://github.com/AlekLima/Design-de-software-e-DDD",
        name: "Design de software e DDD",
      },
      {
        url: "https://github.com/AlekLimaTeles/Gympass-Solid",
        name: "Gympass Clone usando os Principios Solid",
      },
      {
        url: "https://github.com/AlekLima/FindFriendAPI",
        name: "FindFriendAPI, desafio de coding da especialização",
      },
    ],
  },
  {
    id: "bg-2023-03",
    year: 2023,
    month: 3,
    title: "Primeiros Certificados da faculdade",
    description: "Fruto dos esforços de minha vida acadêmica",
    projects: [
      {
        url: "https://bucket-app-microcertificados.s3.amazonaws.com/ESTACIO/610/9188401/a163747fb9ab0df6c755a3557220d9a-724c-43b8-bfdd-4e7bec9dcf6a",
        name: "CONCEPÇÃO DE ALGORITMOS EFICIENTES, ESTÁVEIS E ESCALÁVEIS",
      },
      {
        url: "https://certificado.estacio.br/20c422467163e63f5e79611",
        name: "GERÊNCIA,ORGANIZAÇÃO E RECUPERAÇÃO DAS INFORMAÇÕES",
      },
      {
        url: "https://certificado.estacio.br/0971e7699bf437a3ac71fb1",
        name: "PROGRAMAÇÃO DE SISTEMAS DE INFORMAÇÃO",
      },
      {
        url: "https://certificado.estacio.br/21da208fa5adcd6886da76f",
        name: "PROGRAMAÇÃO PARA INTERNET",
      },
      {
       url: "https://certificado.estacio.br/d721cfcd472504f126d7deb",
        name: "CONEXÃO COMUNITÁRIA E PRÁTICA TRANSFORMADORA",
      }
    ],
  },
  {
    id: "bg-2023-06",
    year: 2023,
    month: 6,
    title: "Primeiro contato com freelance",
    description: "Site de venda de soluções referentes à ar condicionados e acessórios",
    projects: [
      {
        url: "https://github.com/AlekTeles/mwv",
        name: "mwrefrigerações",
      },
    ],
  },
  {
    id: "bg-2024-12",
    year: 2024,
    month: 12,
    title: "Especialista em React e Next.js🏅",
    description: "concluiu a especialização em Node e Typescript da @Rocktseat",
    projects: [
      {
        url: "https://app.rocketseat.com.br/certificates/cce107e9-abdf-49df-8e9d-2379d039efe7",
        name: "Fundamentos Node",
      },
      {
        url: "https://app.rocketseat.com.br/certificates/8eaecca1-f2b9-4161-9660-17edb9b14b1e",
        name: "DDD em Node",
      },
      {
        url: "https://app.rocketseat.com.br/certificates/ab930663-c6eb-4057-8c56-4c42f738afc1",
        name: "NestJS",
      },
      {
        url: "https://app.rocketseat.com.br/certificates/7c9f4311-ad15-4c5f-8028-d22b65b1705d",
        name: "Ignite - Certificado em Node",
      },
    ],
  },
  
  {
    id: "bg-2025-01",
    year: 2025,
    month: 1,
    title: "Iniciou os estudos em LLM e Open Source 🌐",
    description:
      "comecei a estudar RAG, CI pipelines for LLM outputs,Test generation & mutation testing",
  },

   {
    id: "bg-2021-04",
    year: 2025,
    month: 11,
    title: "Dev LLM expert na empresa Revelo 📲",
    description:
      "Avaliação/correção de codigo gerado por Agente Artificial",
    
  },
];
