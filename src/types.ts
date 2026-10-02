export const CATEGORIAS = ['alimentação', 'transporte', 'saúde', 'lazer', 'outros'] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Despesa = {
  id: string;
  titulo: string;
  valor: number;
  categoria: Categoria;
};

export type FieldName = 'titulo' | 'valor' | 'categoria';

export type FormErrors = Partial<Record<FieldName, string>>;
