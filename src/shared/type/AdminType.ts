export type Category = {
  list: string;
};

export type CategoryProps = {
  categories?: Category[];
  selectedCategory?: Category;
  setSelectedCategory?: (category: Category) => void;
};

export type AdminBasicFormProps = CategoryProps & {
  label: string;
  showCategory?: boolean;
};

export type AdminSearchFormProps = {
  label: string[];
  categories: Category[][];
};

