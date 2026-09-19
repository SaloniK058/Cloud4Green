import customerStories from '@/assets/images/handshake.jpg'
import update from '@/assets/images/big.png'

export const navigation = [
  { label: "Home", href: "/" },
  {
  label: "Products",

  href: "/products",

  mega: {
    categories: [
      {
        id: "featured",

        label: "Featured Products",

        title: "Featured Products",

        subtitle:
          "Explore Cloud4Green's learning and development solutions for organizations and individuals.",

        browseHref: "/products",

        items: [
          {
            title: "Enterprise Labs",
            description:
              "Hands-on cloud and AI environments designed for enterprise teams and real-world learning.",
            href: "/products/enterprise-labs",
          },

          {
            title: "E-Learning",
            description:
              "Flexible digital learning experiences that help teams build skills anytime, anywhere.",
            href: "/products/e-learning",
          },

          {
            title: "Certifications",
            description:
              "Industry-aligned certification programs that validate skills and accelerate career growth.",
            href: "/products/certifications",
          },

          {
            title: "Enterprise Trainings",
            description:
              "Customized training programs that equip teams with the skills needed for today's technology landscape.",
            href: "/products/enterprise-training",
          },

          // {
          //   title: "Individual Trainings",
          //   description:
          //     "Practical learning programs designed to help individuals develop in-demand cloud and AI skills.",
          //   href: "/products/individual-training",
          // },
        ],

        promos: [
          {
            title: "What's new",
            description:
              "Explore new capabilities and the latest releases.",
            href: "/whats-new",
            image: update,
          },

          {
            title: "Customer stories",
            description:
              "See how organizations build skills and accelerate learning with Cloud4Green.",
            href: "/customers",
            image: customerStories,
          },
        ],
      },
    ],
  },
},
  { label: "Resources", href: "/resources" },
  { label: "Case study", href: "/about" },
];