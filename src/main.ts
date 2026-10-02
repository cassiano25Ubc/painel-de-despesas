import './style.css';
import { CATEGORIAS, type Categoria, type Despesa, type FieldName, type FormErrors } from './types';

const form = document.querySelector<HTMLFormElement>('#expense-form')!;
const titleInput = document.querySelector<HTMLInputElement>('#titulo')!;
const valueInput = document.querySelector<HTMLInputElement>('#valor')!;
const categoryInput = document.querySelector<HTMLSelectElement>('#categoria')!;
const totalGeralElement = document.querySelector<HTMLElement>('#total-geral')!;
const emptyState = document.querySelector<HTMLElement>('#empty-state')!;
const expenseList = document.querySelector<HTMLUListElement>('#expense-list')!;
const expenseTemplate = document.querySelector<HTMLTemplateElement>('#expense-item-template')!;

const categorySummaryMap: Record<Categoria, HTMLElement> = {
  alimentação: document.querySelector<HTMLElement>('#total-alimentacao')!,
  transporte: document.querySelector<HTMLElement>('#total-transporte')!,
  saúde: document.querySelector<HTMLElement>('#total-saude')!,
  lazer: document.querySelector<HTMLElement>('#total-lazer')!,
  outros: document.querySelector<HTMLElement>('#total-outros')!,
};

let despesas: Despesa[] = [];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function formatCategoryLabel(category: Categoria): string {
  const labels: Record<Categoria, string> = {
    alimentação: 'Alimentação',
    transporte: 'Transporte',
    saúde: 'Saúde',
    lazer: 'Lazer',
    outros: 'Outros',
  };

  return labels[category];
}

function createExpenseId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `despesa-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getFormErrors(): FormErrors {
  const errors: FormErrors = {};

  const titleValue = titleInput.value.trim();
  if (!titleValue) {
    errors.titulo = 'O título é obrigatório.';
  }

  const rawValue = valueInput.value.trim();
  if (!rawValue) {
    errors.valor = 'O valor é obrigatório.';
  } else {
    const parsedValue = Number(rawValue.replace(',', '.'));

    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
      errors.valor = 'O valor deve ser numérico e maior que zero.';
    }
  }

  const selectedCategory = categoryInput.value as Categoria | '';
  if (!selectedCategory || !CATEGORIAS.includes(selectedCategory as Categoria)) {
    errors.categoria = 'Selecione uma categoria válida.';
  }

  return errors;
}

function setFieldError(field: FieldName, message: string): void {
  const errorElement = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
  const inputElement = form.querySelector<HTMLInputElement | HTMLSelectElement>(`#${field}`);

  if (!errorElement || !inputElement) {
    return;
  }

  errorElement.textContent = message;
  inputElement.setAttribute('aria-invalid', String(Boolean(message)));
  inputElement.classList.toggle('invalid', Boolean(message));
}

function clearFieldError(field: FieldName): void {
  setFieldError(field, '');
}

function validateField(field: FieldName): void {
  const errors = getFormErrors();
  const message = errors[field] ?? '';
  setFieldError(field, message);
}

function resetFieldErrors(): void {
  (['titulo', 'valor', 'categoria'] as FieldName[]).forEach((field) => clearFieldError(field));
}

function updateSummary(): void {
  const totalGeral = despesas.reduce((sum, despesa) => sum + despesa.valor, 0);
  totalGeralElement.textContent = formatCurrency(totalGeral);

  const totalsByCategory: Record<Categoria, number> = {
    alimentação: 0,
    transporte: 0,
    saúde: 0,
    lazer: 0,
    outros: 0,
  };

  despesas.forEach((despesa) => {
    totalsByCategory[despesa.categoria] += despesa.valor;
  });

  for (const categoria of CATEGORIAS) {
    categorySummaryMap[categoria].textContent = formatCurrency(totalsByCategory[categoria]);
  }
}

function renderExpenseList(): void {
  expenseList.replaceChildren();

  if (despesas.length === 0) {
    emptyState.hidden = false;
    expenseList.hidden = true;
    return;
  }

  emptyState.hidden = true;
  expenseList.hidden = false;

  despesas.forEach((despesa) => {
    const fragment = expenseTemplate.content.cloneNode(true) as DocumentFragment;
    const item = fragment.querySelector<HTMLLIElement>('.expense-item');
    const titleElement = fragment.querySelector<HTMLElement>('.expense-title');
    const categoryElement = fragment.querySelector<HTMLElement>('.expense-category');
    const valueElement = fragment.querySelector<HTMLElement>('.expense-value');

    if (!item || !titleElement || !categoryElement || !valueElement) {
      return;
    }

    titleElement.textContent = despesa.titulo;
    categoryElement.textContent = formatCategoryLabel(despesa.categoria);
    valueElement.textContent = formatCurrency(despesa.valor);

    expenseList.appendChild(fragment);
  });
}

function render(): void {
  updateSummary();
  renderExpenseList();
}

function handleSubmit(event: SubmitEvent): void {
  event.preventDefault();

  resetFieldErrors();

  const errors = getFormErrors();
  const fieldsWithError = Object.keys(errors) as FieldName[];

  if (fieldsWithError.length > 0) {
    fieldsWithError.forEach((field) => setFieldError(field, errors[field] ?? ''));
    return;
  }

  const novaDespesa: Despesa = {
    id: createExpenseId(),
    titulo: titleInput.value.trim(),
    valor: Number(valueInput.value.replace(',', '.')),
    categoria: categoryInput.value as Categoria,
  };

  despesas = [...despesas, novaDespesa];
  form.reset();
  resetFieldErrors();
  render();
  titleInput.focus();
}

[titleInput, valueInput, categoryInput].forEach((field) => {
  field.addEventListener('input', () => {
    if (!field.value.trim()) {
      clearFieldError(field.name as FieldName);
      return;
    }

    validateField(field.name as FieldName);
  });

  field.addEventListener('blur', () => {
    validateField(field.name as FieldName);
  });
});

form.addEventListener('submit', handleSubmit);
render();
