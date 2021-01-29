interface HeaderContentProps {
  path: string;
  lang: string;
  orderPath: OrderPath;
  cutOrderPath(value: string): void;
  isAuth?: boolean;
  activeGarment?: string;
}
