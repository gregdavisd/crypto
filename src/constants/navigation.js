export const SOCIAL = [
  {
    label: "Twitter",
    href: "https://twitter.com/",
    icon: "fab fa-twitter",
  },
  {
    label: "Mastodon",
    href: "https://indieweb.social/",
    icon: "fab fa-mastodon",
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/",
    icon: "fab fa-bluesky",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
  {
    label: "Threads",
    href: "https://www.threads.net/",
    icon: "fab fa-threads",
  },
];

export const NAVIGATION = [
  {
    label: "About",
    key: "about-header",
    children: [
      {
        label: "About this project",
        short: "About",
        path: "/about",
      },
      {
        label: "What is?",
        path: "/what",
      },
      { label: "FAQ", path: "/faq" },
      {
        label: "License and attribution",
        short: "License",
        path: "/attribution",
      },
    ],
  },
  {
    label: "Follow",
    key: "follow-header",
    children: [
      ...SOCIAL,
      {
        label: "RSS",
        path: "/feed.xml",
      },
    ],
  },
  {
    label: "Leaderboard",
    path: "/charts/top",
  },
  {
    label: "Glossary",
    path: "/glossary",
  },
  {
    label: "Contribute",
    path: "/contribute",
  },
  {
    label: "Newsletter",
    href: "https://localhost/news/",
  },
  {
    label: "Store",
    href: "https://localhost/store/",
  },
];
