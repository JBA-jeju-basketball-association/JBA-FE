export type Category = {
  id: number;
  list: string;
};

export type CategoryProps = {
  categorys: Category[];
};

export type AdminBasicFormProps = CategoryProps & {
  label: string;
};
export type AdminSearchFormProps = {
  label: string[];
  categorys: Category[][];
};
