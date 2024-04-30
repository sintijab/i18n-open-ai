interface Items {
  label: string;
  href: string;
}

export interface INavigation {
  type?: "Navigation";
  theme?: string;
  items: Items[];
}

interface ISections extends INavigation {}

export interface IBlog {
  title: string;
  description: string;
  sections?: ISections[];
}