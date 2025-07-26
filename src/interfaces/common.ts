export interface DomainSuggestion {
  name: string;
  available: boolean;
  price?: string;
  renewal?: string;
}

export interface HeaderProps {
  setDrawerOpen: (open: boolean) => void;
  cart: DomainSuggestion[];
}
export interface CartDrawerProps {
  cart: DomainSuggestion[];
  removeFromCart: (name: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export interface DomainSuggestionsProps {
  suggestions: DomainSuggestion[];
  cart: DomainSuggestion[];
  toggleCart: (domain: DomainSuggestion) => void;
  removeFromCart: (name: string) => void;
  searchedDomain: string | null;
  domainAvailability: boolean | null;
  isLoading: boolean;
}

export interface SearchFormProps {
  search: string;
  setSearch: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  error: string;
  isLoading?: boolean;
}

export interface DomainAvailabilityProps {
  searchedDomain: string | null;
  isAvailable: boolean | null;
  toggleCart: (domain: DomainSuggestion) => void;
  cart: DomainSuggestion[];
  suggestion: DomainSuggestion | undefined;
  removeFromCart: (name: string) => void;
}

export type SearchDomainResponse = {
  searchedDomain: string;
  suggestions: DomainSuggestion[];
  isAvailable: boolean;
};
