import type { VisaTypeInfo, CountryEligibility } from "@/types/visa";

export const VISA_TYPES: VisaTypeInfo[] = [
  {
    id: "tourist",
    fee: 50,
    maxDays: 30,
    purposes: ["tourism"],
  },
  {
    id: "tourist90",
    fee: 70,
    maxDays: 90,
    purposes: ["tourism"],
  },
  {
    id: "business",
    fee: 70,
    maxDays: 90,
    purposes: ["business"],
  },
  {
    id: "group",
    fee: 40,
    maxDays: 30,
    purposes: ["groupTourism"],
  },
  {
    id: "transit",
    fee: 35,
    maxDays: 5,
    purposes: ["transit"],
  },
];

export const VISA_FREE_COUNTRIES: CountryEligibility[] = [
  { code: "US", name: "United States", type: "visa-free", days: 60 },
  { code: "GB", name: "United Kingdom", type: "visa-free", days: 60 },
  { code: "DE", name: "Germany", type: "visa-free", days: 60 },
  { code: "FR", name: "France", type: "visa-free", days: 60 },
  { code: "JP", name: "Japan", type: "visa-free", days: 60 },
  { code: "KR", name: "South Korea", type: "visa-free", days: 60 },
  { code: "AU", name: "Australia", type: "visa-free", days: 60 },
  { code: "CA", name: "Canada", type: "visa-free", days: 60 },
  { code: "IT", name: "Italy", type: "visa-free", days: 60 },
  { code: "ES", name: "Spain", type: "visa-free", days: 60 },
  { code: "NL", name: "Netherlands", type: "visa-free", days: 60 },
  { code: "SE", name: "Sweden", type: "visa-free", days: 60 },
  { code: "CH", name: "Switzerland", type: "visa-free", days: 60 },
  { code: "NO", name: "Norway", type: "visa-free", days: 60 },
  { code: "DK", name: "Denmark", type: "visa-free", days: 60 },
  { code: "FI", name: "Finland", type: "visa-free", days: 60 },
  { code: "AT", name: "Austria", type: "visa-free", days: 60 },
  { code: "BE", name: "Belgium", type: "visa-free", days: 60 },
  { code: "NZ", name: "New Zealand", type: "visa-free", days: 60 },
  { code: "SG", name: "Singapore", type: "visa-free", days: 60 },
  { code: "MY", name: "Malaysia", type: "visa-free", days: 30 },
  { code: "TR", name: "Turkey", type: "visa-free", days: 30 },
  { code: "RU", name: "Russia", type: "visa-free", days: 90 },
  { code: "KZ", name: "Kazakhstan", type: "visa-free", days: 90 },
  { code: "UZ", name: "Uzbekistan", type: "visa-free", days: 60 },
  { code: "TJ", name: "Tajikistan", type: "visa-free", days: 60 },
  { code: "AZ", name: "Azerbaijan", type: "visa-free", days: 30 },
  { code: "GE", name: "Georgia", type: "visa-free", days: 90 },
  { code: "UA", name: "Ukraine", type: "visa-free", days: 90 },
  { code: "BY", name: "Belarus", type: "visa-free", days: 90 },
  { code: "AM", name: "Armenia", type: "visa-free", days: 90 },
  { code: "MD", name: "Moldova", type: "visa-free", days: 90 },
  { code: "MN", name: "Mongolia", type: "visa-free", days: 30 },
  { code: "CU", name: "Cuba", type: "visa-free", days: 30 },
  { code: "BR", name: "Brazil", type: "visa-free", days: 90 },
];

export const EVISA_COUNTRIES: CountryEligibility[] = [
  { code: "CN", name: "China", type: "e-visa" },
  { code: "IN", name: "India", type: "e-visa" },
  { code: "ID", name: "Indonesia", type: "e-visa" },
  { code: "TH", name: "Thailand", type: "e-visa" },
  { code: "VN", name: "Vietnam", type: "e-visa" },
  { code: "PH", name: "Philippines", type: "e-visa" },
  { code: "BD", name: "Bangladesh", type: "e-visa" },
  { code: "PK", name: "Pakistan", type: "e-visa" },
  { code: "LK", name: "Sri Lanka", type: "e-visa" },
  { code: "NP", name: "Nepal", type: "e-visa" },
  { code: "EG", name: "Egypt", type: "e-visa" },
  { code: "NG", name: "Nigeria", type: "e-visa" },
  { code: "GH", name: "Ghana", type: "e-visa" },
  { code: "KE", name: "Kenya", type: "e-visa" },
  { code: "ZA", name: "South Africa", type: "e-visa" },
  { code: "SA", name: "Saudi Arabia", type: "e-visa" },
  { code: "AE", name: "United Arab Emirates", type: "e-visa" },
  { code: "QA", name: "Qatar", type: "e-visa" },
  { code: "MX", name: "Mexico", type: "e-visa" },
  { code: "CO", name: "Colombia", type: "e-visa" },
  { code: "AR", name: "Argentina", type: "e-visa" },
  { code: "PE", name: "Peru", type: "e-visa" },
  { code: "CL", name: "Chile", type: "e-visa" },
  { code: "TW", name: "Taiwan", type: "e-visa" },
  { code: "IL", name: "Israel", type: "e-visa" },
  { code: "JO", name: "Jordan", type: "e-visa" },
  { code: "MA", name: "Morocco", type: "e-visa" },
  { code: "TN", name: "Tunisia", type: "e-visa" },
  { code: "MM", name: "Myanmar", type: "e-visa" },
  { code: "KH", name: "Cambodia", type: "e-visa" },
];

export const ALL_COUNTRIES = [
  ...VISA_FREE_COUNTRIES,
  ...EVISA_COUNTRIES,
].sort((a, b) => a.name.localeCompare(b.name));

export function getEligibility(countryCode: string): CountryEligibility | null {
  return (
    VISA_FREE_COUNTRIES.find((c) => c.code === countryCode) ??
    EVISA_COUNTRIES.find((c) => c.code === countryCode) ??
    null
  );
}
