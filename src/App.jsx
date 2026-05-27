import { useState, useMemo, useRef } from 'react';
import {
  Calculator, Scale, Home, GraduationCap, Briefcase, Car, Wallet,
  Users, ChevronRight, Check, X, ArrowRight, ArrowLeft, Award, Clock,
  ExternalLink, Menu, Plus, Banknote, Sparkles, ChevronDown, ChevronUp,
  Info, ShieldCheck, Zap, Target, Globe
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ============================================================
// TRANSLATIONS
// ============================================================
const STRINGS = {
  en: {
    nav_home: 'Home', nav_banks: 'Banks', nav_compare: 'Compare', nav_calculator: 'Calculator',
    hero_badge_pre: 'banks ·', hero_badge_mid: 'loan products · Real-time math',
    hero_title1: "Compare Mongolia's", hero_title2: 'best loan rates', hero_title3: 'in one place.',
    hero_sub: 'Khan Bank, Golomt, TDB, XacBank and more — side by side. Filter, calculate, and find the rate that saves you most.',
    hero_cta1: 'Compare Loans Now', hero_cta2: 'Open calculator',
    hero_stat1: 'Major banks', hero_stat2: 'Loan products', hero_stat3: 'Best rate today',
    banks_title: 'Browse by bank', banks_sub: 'Tap any bank to see all their loan products.',
    banks_from: 'From', banks_products: 'Products', banks_branches: 'Branches',
    cat_title: 'Browse by loan type', cat_sub: 'Filter products across all banks.', cat_all: 'All loans',
    cat_salary: 'Salary', cat_pension: 'Pension', cat_mortgage: 'Mortgage',
    cat_business: 'Business', cat_student: 'Student', cat_car: 'Car',
    tbl_bank: 'Bank', tbl_product: 'Product', tbl_rate: 'Rate',
    tbl_max_amount: 'Max amount', tbl_max_term: 'Max term',
    tbl_best_rates: 'Best rates per bank', tbl_full_compare: 'Build a full comparison →',
    card_annual_rate: 'Annual rate', card_loan_range: 'Loan range', card_term: 'Term',
    card_est_monthly: 'Est. monthly', card_eligibility: 'Eligibility',
    card_added: 'Added', card_compare: 'Compare', card_visit: 'Visit Bank',
    cmp_title: 'Side-by-side comparison', cmp_loan: 'loan', cmp_loans: 'loans',
    cmp_sub: '· Adjust the scenario below to recalculate.',
    cmp_clear: 'Clear all', cmp_scenario: 'Comparison scenario',
    cmp_amount: 'Loan amount', cmp_term: 'Term', cmp_feature: 'Feature',
    cmp_rate: 'Interest rate', cmp_monthly: 'Monthly payment', cmp_total: 'Total repayment',
    cmp_range: 'Loan range', cmp_max_term: 'Max term', cmp_requirements: 'Requirements',
    cmp_visit: 'Visit bank', cmp_expand: 'requirements — expand to view',
    cmp_empty_title: 'Build a comparison',
    cmp_empty_sub: 'Browse any bank\'s products and tap "Compare" on the loans you want to weigh side-by-side. You can compare 2–4 loans at a time.',
    cmp_browse: 'Browse loans', cmp_add_more: 'You can compare up to', cmp_four: '4 loans',
    cmp_add_link: 'at once. Add more from a bank page →',
    badge_best: 'BEST', badge_lowest: 'LOWEST', badge_longest: 'LONGEST',
    calc_title: 'Loan calculator', calc_sub: 'Real-time amortization. All values update as you type.',
    calc_inputs: 'Inputs', calc_amount: 'Loan amount', calc_rate: 'Annual interest rate (%)',
    calc_period: 'Loan period', calc_months: 'months', calc_years: 'years',
    calc_eq_months: 'months', calc_compounding: 'Compounding',
    calc_monthly_comp: 'Monthly', calc_yearly_comp: 'Yearly',
    calc_monthly_pmt: 'Monthly payment', calc_total_int: 'Total interest',
    calc_total_rep: 'Total repayment', calc_of_principal: '% of principal',
    calc_ppl_int: 'principal + interest', calc_chart_title: 'Amortization breakdown',
    calc_principal: 'Principal', calc_interest: 'Interest',
    calc_chart_desc: 'Cumulative principal paid vs cumulative interest paid over the loan lifetime.',
    calc_formula: 'Formula',
    calc_formula_text: 'M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where P is principal, r is monthly rate (annual ÷ 12 for monthly compounding), n is number of months. Results are indicative; banks may add fees, insurance, or processing charges.',
    calc_over: 'over',
    mini_title: 'Quick Calculator', mini_sub: 'Live amortization', mini_live: 'LIVE',
    mini_amount: 'Amount', mini_rate: 'Rate (%)', mini_years: 'Years',
    mini_monthly: 'Monthly payment', mini_total_int: 'Total interest', mini_total_rep: 'Total repayment',
    mini_open: 'Open full calculator',
    bank_all: 'All', bank_official: 'Official site', bank_from_rate: 'From rate',
    bank_products: 'Products', bank_established: 'Est.', bank_branches: 'Branches',
    bank_back: 'All banks', bank_lowest: 'lowest available',
    why1_title: 'Trusted data', why1_body: "Loan products sourced directly from each bank's public offerings.",
    why2_title: 'Instant calculations', why2_body: 'Standard amortization math runs live as you type. No submit button.',
    why3_title: 'Find your best fit', why3_body: 'Filter by category, compare 2–4 loans side by side, see who saves you most.',
    footer_tagline: 'Зээл харьцуулах платформ',
    footer_desc: "Independent loan comparison for Mongolian consumers. We don't issue loans — we help you find them.",
    footer_banks: 'Banks', footer_cats: 'Categories',
    footer_copy: '© 2026 ZeelHub. Demo prototype. Rates shown are indicative.',
    footer_built: 'Built for Mongolian borrowers · Ulaanbaatar',
    basket_selected: 'loan selected', basket_selected_p: 'loans selected',
    basket_up_to: 'Compare up to 4', basket_btn: 'Compare',
    interest_note: '+', interest_label: 'interest',
  },
  mn: {
    nav_home: 'Нүүр', nav_banks: 'Банкууд', nav_compare: 'Харьцуулах', nav_calculator: 'Тооцоолуур',
    hero_badge_pre: 'банк ·', hero_badge_mid: 'зээлийн бүтээгдэхүүн · Бодит тооцоолол',
    hero_title1: 'Монголын', hero_title2: 'шилдэг зээлийн хүүг', hero_title3: 'нэг дор харьцуулаарай.',
    hero_sub: 'Банк санхүүгийн байгууллагуудын зээлийг төрлөөр шүүж, сарын төлбөрийг тооцоолж өөрт хэрэгтэй зээлээ сонирхоорой.',
    hero_cta1: 'Зээл харьцуулах', hero_cta2: 'Тооцоолуур нээх',
    hero_stat1: 'Томоохон банк', hero_stat2: 'Зээлийн бүтээгдэхүүн', hero_stat3: 'Өнөөдрийн шилдэг хүү',
    banks_title: 'Банкаар харах', banks_sub: 'Аль ч банкийг дарж зээлийн бүтээгдэхүүнийг харна уу.',
    banks_from: 'Хүүгээс', banks_products: 'Бүтээгдэхүүн', banks_branches: 'Салбар',
    cat_title: 'Зээлийн төрлөөр харах', cat_sub: 'Бүх банкны бүтээгдэхүүнийг шүүх.', cat_all: 'Бүх зээл',
    cat_salary: 'Цалингийн', cat_pension: 'Тэтгэврийн', cat_mortgage: 'Ипотекийн',
    cat_business: 'Бизнесийн', cat_student: 'Оюутны', cat_car: 'Автомашины',
    tbl_bank: 'Банк', tbl_product: 'Бүтээгдэхүүн', tbl_rate: 'Хүү',
    tbl_max_amount: 'Дээд дүн', tbl_max_term: 'Дээд хугацаа',
    tbl_best_rates: 'Банк тус бүрийн шилдэг хүү', tbl_full_compare: 'Дэлгэрэнгүй харьцуулах →',
    card_annual_rate: 'Жилийн хүү', card_loan_range: 'Зээлийн хэмжээ', card_term: 'Хугацаа',
    card_est_monthly: 'Сарын төлбөр', card_eligibility: 'Шаардлага',
    card_added: 'Нэмэгдсэн', card_compare: 'Харьцуулах', card_visit: 'Банк руу очих',
    cmp_title: 'Зэрэгцүүлэн харьцуулах', cmp_loan: 'зээл', cmp_loans: 'зээл',
    cmp_sub: '· Дахин тооцоолохын тулд доорх утгыг өөрчилнө үү.',
    cmp_clear: 'Бүгдийг арилгах', cmp_scenario: 'Харьцуулах нөхцөл',
    cmp_amount: 'Зээлийн дүн', cmp_term: 'Хугацаа', cmp_feature: 'Шинж чанар',
    cmp_rate: 'Хүүгийн хэмжээ', cmp_monthly: 'Сарын төлбөр', cmp_total: 'Нийт төлбөр',
    cmp_range: 'Зээлийн хэмжээ', cmp_max_term: 'Дээд хугацаа', cmp_requirements: 'Шаардлага',
    cmp_visit: 'Банк руу очих', cmp_expand: 'шаардлага — дэлгэж харах',
    cmp_empty_title: 'Харьцуулалт үүсгэх',
    cmp_empty_sub: 'Аль ч банкны бүтээгдэхүүн дээр "Харьцуулах" товч дарж 2–4 зээлийг зэрэгцүүлэн харьцуулаарай.',
    cmp_browse: 'Зээл харах', cmp_add_more: 'Нэгдэж дээд тал нь', cmp_four: '4 зээл',
    cmp_add_link: 'харьцуулах боломжтой. Банкны хуудаснаас нэмэх →',
    badge_best: 'ШИЛДЭГ', badge_lowest: 'ХАМГИЙН БАГА', badge_longest: 'ХАМГИЙН УРТ',
    calc_title: 'Зээлийн тооцоолуур', calc_sub: 'Бодит тооцоолол. Бичих үед бүх утга шинэчлэгдэнэ.',
    calc_inputs: 'Оролт', calc_amount: 'Зээлийн дүн', calc_rate: 'Жилийн хүүгийн хэмжээ (%)',
    calc_period: 'Зээлийн хугацаа', calc_months: 'сар', calc_years: 'жил',
    calc_eq_months: 'сар', calc_compounding: 'Хүүгийн тооцоолол',
    calc_monthly_comp: 'Сараар', calc_yearly_comp: 'Жилээр',
    calc_monthly_pmt: 'Сарын төлбөр', calc_total_int: 'Нийт хүү',
    calc_total_rep: 'Нийт төлбөр', calc_of_principal: '% үндсэн зээлийн',
    calc_ppl_int: 'үндсэн зээл + хүү', calc_chart_title: 'Зээлийн задаргаа',
    calc_principal: 'Үндсэн зээл', calc_interest: 'Хүү',
    calc_chart_desc: 'Зээлийн хугацаанд төлсөн үндсэн зээл болон хүүгийн нийлбэр.',
    calc_formula: 'Томьёо',
    calc_formula_text: 'M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1] — P нь үндсэн зээл, r нь сарын хүү (жилийн ÷ 12), n нь сарын тоо. Үр дүн нь тооцоолол бөгөөд банк нэмэлт хураамж авч болно.',
    calc_over: 'хугацаанд',
    mini_title: 'Хурдан тооцоолуур', mini_sub: 'Бодит тооцоолол', mini_live: 'БОДИТ',
    mini_amount: 'Дүн', mini_rate: 'Хүү (%)', mini_years: 'Жил',
    mini_monthly: 'Сарын төлбөр', mini_total_int: 'Нийт хүү', mini_total_rep: 'Нийт төлбөр',
    mini_open: 'Тооцоолуур нээх',
    bank_all: 'Бүгд', bank_official: 'Албан вэбсайт', bank_from_rate: 'Хүүгээс',
    bank_products: 'Бүтээгдэхүүн', bank_established: 'Үүссэн', bank_branches: 'Салбар',
    bank_back: 'Бүх банк', bank_lowest: 'хамгийн бага хүү',
    why1_title: 'Найдвартай мэдээлэл', why1_body: 'Зээлийн бүтээгдэхүүнийг банкны нийтийн санал болголтоос шууд авсан.',
    why2_title: 'Тэр даруй тооцоолол', why2_body: 'Стандарт тооцоолол бичих үед ажилладаг. Товч дарах шаардлагагүй.',
    why3_title: 'Хамгийн тохиромжтойг олоорой', why3_body: 'Төрлөөр шүүж, 2–4 зээлийг зэрэгцүүлэн харьцуулаарай.',
    footer_tagline: 'Зээл харьцуулах платформ',
    footer_desc: 'Монголын хэрэглэгчдэд зориулсан зээлийн харьцуулалт. Бид зээл олгодоггүй — зөвхөн олоход туслана.',
    footer_banks: 'Банкууд', footer_cats: 'Ангилал',
    footer_copy: '© 2026 ZeelHub. Туршилтын хувилбар. Хүүгийн хэмжээ тооцоолол юм.',
    footer_built: 'Монголын зээлдэгчдэд зориулсан · Улаанбаатар',
    basket_selected: 'зээл сонгогдсон', basket_selected_p: 'зээл сонгогдсон',
    basket_up_to: 'Дээд тал нь 4', basket_btn: 'Харьцуулах',
    interest_note: '+', interest_label: 'хүү',
  }
};

const createT = (lang) => (key) => STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;

// ============================================================
// BANKS — 13 Mongolian banks
// ============================================================
const BANKS = [
  {
    id: 'khan-bank', name: 'Khan Bank', nameLocal: 'Хаан Банк',
    tagline: "Mongolia's largest commercial bank", monogram: 'KB',
    brandColor: '#0E6E3E', brandLight: '#E6F2EC',
    url: 'https://www.khanbank.com/personal/product/detail/8/',
    established: 1991, branches: '500+',
  },
  {
    id: 'golomt-bank', name: 'Golomt Bank', nameLocal: 'Голомт Банк',
    tagline: 'Innovative digital banking', monogram: 'G',
    brandColor: '#C8102E', brandLight: '#FBEAEC',
    url: 'https://www.golomtbank.com/retail/loans',
    established: 1995, branches: '154',
  },
  {
    id: 'tdb', name: 'Trade & Development Bank', nameLocal: 'Худалдаа Хөгжлийн Банк',
    tagline: "Mongolia's oldest commercial bank", monogram: 'TDB',
    brandColor: '#003D7A', brandLight: '#E6EEF7',
    url: 'https://www.tdbm.mn/mn/calculator',
    established: 1990, branches: '70+',
  },
  {
    id: 'state-bank', name: 'State Bank', nameLocal: 'Төрийн Банк',
    tagline: 'Trusted nationwide coverage', monogram: 'SB',
    brandColor: '#B91C1C', brandLight: '#FBEBEB',
    url: 'https://www.statebank.mn/personal/products/6',
    established: 2009, branches: '500+',
  },
  {
    id: 'xac-bank', name: 'XacBank', nameLocal: 'Хасбанк',
    tagline: 'Pioneering inclusive finance', monogram: 'XAC',
    brandColor: '#D97706', brandLight: '#FEF3C7',
    url: 'https://www.xacbank.mn',
    established: 2001, branches: '90+',
  },
  {
    id: 'capitron-bank', name: 'Capitron Bank', nameLocal: 'Капитрон Банк',
    tagline: 'Growing with your ambitions', monogram: 'CAP',
    brandColor: '#7C3AED', brandLight: '#EDE9FE',
    url: 'https://www.capitronbank.mn',
    established: 2010, branches: '30+',
  },
  {
    id: 'ni-bank', name: 'National Investment Bank', nameLocal: 'Үндэсний Хөрөнгө Оруулалтын Банк',
    tagline: 'Your partner in investment', monogram: 'NIB',
    brandColor: '#0369A1', brandLight: '#E0F2FE',
    url: 'https://www.nibank.mn',
    established: 2012, branches: '25+',
  },
  {
    id: 'ck-bank', name: 'Chinggis Khaan Bank', nameLocal: 'Чингис Хаан Банк',
    tagline: 'Strength and heritage in banking', monogram: 'CKB',
    brandColor: '#92400E', brandLight: '#FEF3C7',
    url: 'https://www.ckbank.mn',
    established: 2015, branches: '20+',
  },
  {
    id: 'credit-bank', name: 'Credit Bank', nameLocal: 'Кредит Банк',
    tagline: 'Credit solutions for everyone', monogram: 'CRB',
    brandColor: '#065F46', brandLight: '#D1FAE5',
    url: 'https://www.creditbank.mn',
    established: 2011, branches: '35+',
  },
  {
    id: 'trans-bank', name: 'Trans Bank', nameLocal: 'Транс Банк',
    tagline: 'Moving finance forward', monogram: 'TRB',
    brandColor: '#1E40AF', brandLight: '#DBEAFE',
    url: 'https://www.transbank.mn',
    established: 2008, branches: '40+',
  },
  {
    id: 'arig-bank', name: 'Arig Bank', nameLocal: 'Ариг Банк',
    tagline: 'Pure banking, pure trust', monogram: 'ARG',
    brandColor: '#9D174D', brandLight: '#FCE7F3',
    url: 'https://www.arigbank.mn',
    established: 2009, branches: '45+',
  },
  {
    id: 'bogd-bank', name: 'Bogd Bank', nameLocal: 'Богд Банк',
    tagline: 'Grounded in Mongolian values', monogram: 'BOG',
    brandColor: '#4C1D95', brandLight: '#EDE9FE',
    url: 'https://www.bogdbank.com',
    established: 2014, branches: '18+',
  },
  {
    id: 'm-bank', name: 'M Bank', nameLocal: 'М Банк',
    tagline: 'Modern banking for modern Mongolia', monogram: 'MB',
    brandColor: '#0F766E', brandLight: '#CCFBF1',
    url: 'https://www.m-bank.mn',
    established: 2016, branches: '22+',
  },
];

// ============================================================
// CATEGORIES
// ============================================================
const CATEGORIES = [
  { id: 'salary',   labelEn: 'Salary',   labelMn: 'Цалингийн',   icon: Wallet,         color: 'bg-blue-100 text-blue-700' },
  { id: 'pension',  labelEn: 'Pension',  labelMn: 'Тэтгэврийн',  icon: Users,          color: 'bg-purple-100 text-purple-700' },
  { id: 'mortgage', labelEn: 'Mortgage', labelMn: 'Ипотекийн',   icon: Home,           color: 'bg-amber-100 text-amber-700' },
  { id: 'business', labelEn: 'Business', labelMn: 'Бизнесийн',   icon: Briefcase,      color: 'bg-emerald-100 text-emerald-700' },
  { id: 'student',  labelEn: 'Student',  labelMn: 'Оюутны',      icon: GraduationCap,  color: 'bg-pink-100 text-pink-700' },
  { id: 'car',      labelEn: 'Car',      labelMn: 'Автомашины',  icon: Car,            color: 'bg-cyan-100 text-cyan-700' },
];

// ============================================================
// LOANS — ~52 products across 13 banks
// ============================================================
const LOANS = [
  // ── Khan Bank ──
  { id: 'khan-salary',    bankId: 'khan-bank',     name: 'Salary Loan',           nameMn: 'Цалингийн зээл',         category: 'salary',   annualRate: 21.6, minAmount: 500000,    maxAmount: 30000000,   minTermMonths: 3,  maxTermMonths: 36,  eligibility: ['Stable employment 6+ months', 'Salary via Khan Bank', 'Age 21–60', 'No bad credit history'] },
  { id: 'khan-pension',   bankId: 'khan-bank',     name: 'Pension Loan',          nameMn: 'Тэтгэврийн зээл',        category: 'pension',  annualRate: 15.6, minAmount: 300000,    maxAmount: 15000000,   minTermMonths: 3,  maxTermMonths: 48,  eligibility: ['Pension received via Khan Bank', 'Age up to 70', 'Mongolian citizen'] },
  { id: 'khan-mortgage',  bankId: 'khan-bank',     name: '8% Housing Program',    nameMn: '8% Орон сууцны хөтөлбөр',category: 'mortgage', annualRate: 8.0,  minAmount: 30000000,  maxAmount: 200000000,  minTermMonths: 60, maxTermMonths: 360, eligibility: ['First-time buyer', 'Government 8% program qualified', 'Property up to 80m²', 'Income verification'] },
  { id: 'khan-business',  bankId: 'khan-bank',     name: 'SME Working Capital',   nameMn: 'ЖДҮ эргэлтийн хөрөнгө', category: 'business', annualRate: 19.2, minAmount: 5000000,   maxAmount: 500000000,  minTermMonths: 6,  maxTermMonths: 60,  eligibility: ['Registered business 12+ months', 'Audited financials', 'Collateral required'] },
  { id: 'khan-student',   bankId: 'khan-bank',     name: 'Education Loan',        nameMn: 'Боловсролын зээл',       category: 'student',  annualRate: 11.4, minAmount: 1500000,   maxAmount: 50000000,   minTermMonths: 24, maxTermMonths: 96,  eligibility: ['University admission letter', 'Co-signer required', 'Tuition invoice'] },
  { id: 'khan-car',       bankId: 'khan-bank',     name: 'Auto Loan',             nameMn: 'Автомашины зээл',        category: 'car',      annualRate: 18.0, minAmount: 3000000,   maxAmount: 150000000,  minTermMonths: 12, maxTermMonths: 60,  eligibility: ['30% down payment', 'Vehicle as collateral', 'Comprehensive insurance'] },

  // ── Golomt Bank ──
  { id: 'golomt-salary',   bankId: 'golomt-bank',  name: 'Express Salary Loan',  nameMn: 'Экспресс цалингийн зээл',category: 'salary',   annualRate: 22.8, minAmount: 500000,    maxAmount: 25000000,   minTermMonths: 3,  maxTermMonths: 30,  eligibility: ['Salary via Golomt 3+ months', 'Age 21–60'] },
  { id: 'golomt-pension',  bankId: 'golomt-bank',  name: 'Retiree Loan',         nameMn: 'Тэтгэврийн зээл',        category: 'pension',  annualRate: 16.8, minAmount: 300000,    maxAmount: 12000000,   minTermMonths: 3,  maxTermMonths: 36,  eligibility: ['Pension via Golomt', 'Age up to 68'] },
  { id: 'golomt-mortgage', bankId: 'golomt-bank',  name: 'Home Loan Premium',    nameMn: 'Орон сууцны зээл',       category: 'mortgage', annualRate: 13.8, minAmount: 25000000,  maxAmount: 600000000,  minTermMonths: 60, maxTermMonths: 300, eligibility: ['25% down payment', 'Income verification', 'Age 21–65'] },
  { id: 'golomt-business', bankId: 'golomt-bank',  name: 'Business Growth Loan', nameMn: 'Бизнес хөгжлийн зээл',  category: 'business', annualRate: 18.0, minAmount: 10000000,  maxAmount: 1000000000, minTermMonths: 12, maxTermMonths: 84,  eligibility: ['Business 2+ years', 'Financial statements', 'Collateral 120%'] },
  { id: 'golomt-student',  bankId: 'golomt-bank',  name: 'Student Education',    nameMn: 'Оюутны зээл',            category: 'student',  annualRate: 9.6,  minAmount: 1000000,   maxAmount: 40000000,   minTermMonths: 12, maxTermMonths: 96,  eligibility: ['University admission', 'Parent/guardian co-signer'] },
  { id: 'golomt-car',      bankId: 'golomt-bank',  name: 'Auto Express',         nameMn: 'Автомашины зээл',        category: 'car',      annualRate: 17.4, minAmount: 5000000,   maxAmount: 120000000,  minTermMonths: 12, maxTermMonths: 60,  eligibility: ['25% down payment', 'Vehicle insurance', 'License 2+ years'] },

  // ── TDB ──
  { id: 'tdb-salary',   bankId: 'tdb',  name: 'Consumer Loan',     nameMn: 'Хэрэглээний зээл',       category: 'salary',   annualRate: 20.4, minAmount: 1000000,  maxAmount: 40000000,  minTermMonths: 6,  maxTermMonths: 36,  eligibility: ['Salary via TDB 6+ months', 'Age 21–60'] },
  { id: 'tdb-pension',  bankId: 'tdb',  name: 'Senior Citizen',    nameMn: 'Ахмад настны зээл',      category: 'pension',  annualRate: 14.4, minAmount: 500000,   maxAmount: 20000000,  minTermMonths: 6,  maxTermMonths: 48,  eligibility: ['Pension via TDB', 'Age up to 70', 'No collateral required'] },
  { id: 'tdb-mortgage', bankId: 'tdb',  name: 'Premium Mortgage',  nameMn: 'Ипотекийн зээл',         category: 'mortgage', annualRate: 13.2, minAmount: 30000000, maxAmount: 800000000, minTermMonths: 60, maxTermMonths: 360, eligibility: ['30% down payment', 'Income 3× monthly payment', 'Age 21–65'] },
  { id: 'tdb-business', bankId: 'tdb',  name: 'Corporate Loan',    nameMn: 'Корпорейт зээл',         category: 'business', annualRate: 17.4, minAmount: 20000000, maxAmount: 5000000000,minTermMonths: 12, maxTermMonths: 120, eligibility: ['Business 3+ years', 'Audited statements 2 years', 'Collateral required'] },
  { id: 'tdb-car',      bankId: 'tdb',  name: 'Vehicle Loan',      nameMn: 'Тээврийн хэрэгслийн зээл',category: 'car',     annualRate: 16.8, minAmount: 5000000,  maxAmount: 200000000, minTermMonths: 12, maxTermMonths: 72,  eligibility: ['20% down payment', 'CASCO insurance', 'Vehicle age under 5 years'] },

  // ── State Bank ──
  { id: 'state-salary',    bankId: 'state-bank', name: 'Salary-Backed Loan',     nameMn: 'Цалингийн зээл',          category: 'salary',   annualRate: 19.2, minAmount: 500000,   maxAmount: 20000000,  minTermMonths: 3,  maxTermMonths: 36,  eligibility: ['Government employees prioritized', 'Salary via State Bank', 'Age 21–60'] },
  { id: 'state-pension',   bankId: 'state-bank', name: 'Pensioner Support',      nameMn: 'Тэтгэврийн зээл',         category: 'pension',  annualRate: 13.2, minAmount: 300000,   maxAmount: 10000000,  minTermMonths: 3,  maxTermMonths: 48,  eligibility: ['Pension via State Bank', 'Age up to 72', 'No collateral needed'] },
  { id: 'state-mortgage',  bankId: 'state-bank', name: '8% Gov. Mortgage',       nameMn: '8% Засгийн газрын ипотек',category: 'mortgage', annualRate: 8.0,  minAmount: 20000000, maxAmount: 200000000, minTermMonths: 60, maxTermMonths: 360, eligibility: ['First-time homebuyer', 'Government 8% qualified', 'Property up to 80m²'] },
  { id: 'state-business',  bankId: 'state-bank', name: 'Herder & Agriculture',   nameMn: 'Малчин, хөдөө аж ахуйн', category: 'business', annualRate: 12.0, minAmount: 3000000,  maxAmount: 100000000, minTermMonths: 6,  maxTermMonths: 60,  eligibility: ['Herder/farmer registration', 'Livestock or land collateral'] },
  { id: 'state-student',   bankId: 'state-bank', name: 'Student Loan Program',   nameMn: 'Оюутны зээлийн хөтөлбөр',category: 'student',  annualRate: 3.0,  minAmount: 1000000,  maxAmount: 30000000,  minTermMonths: 24, maxTermMonths: 120, eligibility: ['Government student program', 'Approved by Ministry of Education'] },

  // ── XacBank ──
  { id: 'xac-salary',   bankId: 'xac-bank', name: 'Salary Advance',      nameMn: 'Цалингийн урьдчилгаа',   category: 'salary',   annualRate: 21.0, minAmount: 500000,   maxAmount: 20000000,  minTermMonths: 3,  maxTermMonths: 36,  eligibility: ['Salary via XacBank 3+ months', 'Age 21–60', 'No overdue loans'] },
  { id: 'xac-mortgage', bankId: 'xac-bank', name: 'Green Home Loan',     nameMn: 'Ногоон орон сууцны зээл',category: 'mortgage', annualRate: 10.8, minAmount: 20000000, maxAmount: 300000000, minTermMonths: 60, maxTermMonths: 240, eligibility: ['Energy-efficient property', '25% down payment', 'Income verification'] },
  { id: 'xac-business', bankId: 'xac-bank', name: 'SME Microfinance',    nameMn: 'ЖДҮ бичил санхүүжилт',  category: 'business', annualRate: 20.4, minAmount: 2000000,  maxAmount: 200000000, minTermMonths: 6,  maxTermMonths: 60,  eligibility: ['Micro/small business', 'Business plan required', 'Group or individual guarantee'] },
  { id: 'xac-car',      bankId: 'xac-bank', name: 'Vehicle Finance',     nameMn: 'Авто зээл',              category: 'car',      annualRate: 18.6, minAmount: 3000000,  maxAmount: 100000000, minTermMonths: 12, maxTermMonths: 48,  eligibility: ['20% down payment', 'CASCO insurance required', 'Valid driver license'] },

  // ── Capitron Bank ──
  { id: 'cap-salary',   bankId: 'capitron-bank', name: 'Express Consumer',   nameMn: 'Экспресс хэрэглээний',  category: 'salary',   annualRate: 23.4, minAmount: 500000,   maxAmount: 15000000,  minTermMonths: 3,  maxTermMonths: 24,  eligibility: ['Salary account at Capitron', 'Age 21–55', 'Stable employment'] },
  { id: 'cap-mortgage', bankId: 'capitron-bank', name: 'Housing Loan',       nameMn: 'Орон сууцны зээл',      category: 'mortgage', annualRate: 15.6, minAmount: 15000000, maxAmount: 250000000, minTermMonths: 36, maxTermMonths: 240, eligibility: ['30% down payment', 'Income verification', 'Property valuation'] },
  { id: 'cap-business', bankId: 'capitron-bank', name: 'Business Starter',   nameMn: 'Бизнес эхлэлийн зээл', category: 'business', annualRate: 21.6, minAmount: 3000000,  maxAmount: 150000000, minTermMonths: 6,  maxTermMonths: 48,  eligibility: ['Business registration', 'Business plan', 'Personal guarantee'] },
  { id: 'cap-car',      bankId: 'capitron-bank', name: 'Auto Credit',        nameMn: 'Авто кредит',           category: 'car',      annualRate: 19.2, minAmount: 4000000,  maxAmount: 80000000,  minTermMonths: 12, maxTermMonths: 48,  eligibility: ['25% down payment', 'Vehicle insurance', 'Age 21–55'] },

  // ── NIBank ──
  { id: 'ni-salary',   bankId: 'ni-bank', name: 'Personal Loan',       nameMn: 'Хувийн зээл',            category: 'salary',   annualRate: 22.2, minAmount: 500000,   maxAmount: 18000000,  minTermMonths: 3,  maxTermMonths: 30,  eligibility: ['Salary via NIBank', 'Age 21–60', 'Stable employment 6+ months'] },
  { id: 'ni-mortgage', bankId: 'ni-bank', name: 'Home Purchase Loan',  nameMn: 'Орон сууц худалдан авах',category: 'mortgage', annualRate: 14.4, minAmount: 20000000, maxAmount: 400000000, minTermMonths: 60, maxTermMonths: 300, eligibility: ['30% down payment', 'Regular income', 'Age 21–65'] },
  { id: 'ni-business', bankId: 'ni-bank', name: 'Investment Loan',     nameMn: 'Хөрөнгө оруулалтын зээл',category: 'business', annualRate: 18.6, minAmount: 10000000, maxAmount: 500000000, minTermMonths: 12, maxTermMonths: 84,  eligibility: ['Investment plan required', 'Collateral 130%', 'Business track record'] },
  { id: 'ni-student',  bankId: 'ni-bank', name: 'Student Finance',     nameMn: 'Оюутны санхүүжилт',      category: 'student',  annualRate: 10.2, minAmount: 1000000,  maxAmount: 35000000,  minTermMonths: 12, maxTermMonths: 84,  eligibility: ['Accredited university', 'Guarantor required', 'Academic record'] },

  // ── CKBank ──
  { id: 'ck-salary',   bankId: 'ck-bank', name: 'Warrior Salary Loan', nameMn: 'Эрлэгт цалингийн зээл',  category: 'salary',   annualRate: 22.8, minAmount: 500000,   maxAmount: 20000000,  minTermMonths: 3,  maxTermMonths: 36,  eligibility: ['Salary via CKBank', 'Age 21–60', 'No overdue payments'] },
  { id: 'ck-mortgage', bankId: 'ck-bank', name: 'Heritage Home Loan',  nameMn: 'Гэр бүлийн ипотек',      category: 'mortgage', annualRate: 14.4, minAmount: 15000000, maxAmount: 300000000, minTermMonths: 36, maxTermMonths: 300, eligibility: ['25% down payment', 'Regular income', 'Property valuation'] },
  { id: 'ck-business', bankId: 'ck-bank', name: 'Khan Business Loan',  nameMn: 'Хааны бизнес зээл',      category: 'business', annualRate: 19.8, minAmount: 5000000,  maxAmount: 300000000, minTermMonths: 6,  maxTermMonths: 72,  eligibility: ['Business 1+ year', 'Collateral required', 'Financial statements'] },
  { id: 'ck-car',      bankId: 'ck-bank', name: 'Auto Loan',           nameMn: 'Автомашины зээл',        category: 'car',      annualRate: 18.0, minAmount: 4000000,  maxAmount: 120000000, minTermMonths: 12, maxTermMonths: 60,  eligibility: ['20% down payment', 'CASCO insurance', 'License required'] },

  // ── Credit Bank ──
  { id: 'crb-salary',   bankId: 'credit-bank', name: 'Quick Cash Loan',   nameMn: 'Хурдан бэлэн зээл',     category: 'salary',   annualRate: 24.0, minAmount: 300000,   maxAmount: 15000000,  minTermMonths: 3,  maxTermMonths: 24,  eligibility: ['Any salary account', 'Age 18–60', 'Mongolian citizen'] },
  { id: 'crb-pension',  bankId: 'credit-bank', name: 'Pension Plus',       nameMn: 'Тэтгэврийн плюс',       category: 'pension',  annualRate: 15.0, minAmount: 300000,   maxAmount: 8000000,   minTermMonths: 3,  maxTermMonths: 36,  eligibility: ['Pension via Credit Bank', 'Age up to 68', 'No collateral needed'] },
  { id: 'crb-business', bankId: 'credit-bank', name: 'Merchant Loan',      nameMn: 'Худалдааны зээл',       category: 'business', annualRate: 22.8, minAmount: 2000000,  maxAmount: 100000000, minTermMonths: 6,  maxTermMonths: 48,  eligibility: ['Trading business', 'Inventory as collateral', 'Sales record 6+ months'] },
  { id: 'crb-car',      bankId: 'credit-bank', name: 'Vehicle Loan',       nameMn: 'Автомашины зээл',       category: 'car',      annualRate: 19.8, minAmount: 3000000,  maxAmount: 80000000,  minTermMonths: 12, maxTermMonths: 48,  eligibility: ['25% down payment', 'Insurance required', 'Age 21–55'] },

  // ── Trans Bank ──
  { id: 'trb-salary',   bankId: 'trans-bank', name: 'Standard Salary',    nameMn: 'Стандарт цалингийн',    category: 'salary',   annualRate: 21.6, minAmount: 500000,   maxAmount: 18000000,  minTermMonths: 3,  maxTermMonths: 30,  eligibility: ['Salary via Trans Bank', 'Age 21–60', 'Stable employment'] },
  { id: 'trb-mortgage', bankId: 'trans-bank', name: 'Home Finance',        nameMn: 'Орон сууцны санхүүжилт',category: 'mortgage', annualRate: 15.0, minAmount: 15000000, maxAmount: 300000000, minTermMonths: 36, maxTermMonths: 240, eligibility: ['30% down payment', 'Regular income', 'Property as collateral'] },
  { id: 'trb-business', bankId: 'trans-bank', name: 'Transport & Trade',   nameMn: 'Тээвэр, худалдааны',   category: 'business', annualRate: 20.4, minAmount: 5000000,  maxAmount: 200000000, minTermMonths: 6,  maxTermMonths: 60,  eligibility: ['Business license', 'Transport/trade sector', 'Collateral required'] },
  { id: 'trb-car',      bankId: 'trans-bank', name: 'Auto & Transport',    nameMn: 'Авто тээврийн зээл',   category: 'car',      annualRate: 17.4, minAmount: 5000000,  maxAmount: 150000000, minTermMonths: 12, maxTermMonths: 60,  eligibility: ['20% down payment', 'Vehicle inspection required', 'Insurance required'] },

  // ── Arig Bank ──
  { id: 'arg-salary',   bankId: 'arig-bank', name: 'Pure Salary Loan',   nameMn: 'Цалингийн зээл',         category: 'salary',   annualRate: 22.2, minAmount: 500000,   maxAmount: 16000000,  minTermMonths: 3,  maxTermMonths: 30,  eligibility: ['Salary via Arig Bank', 'Age 21–60', 'Clean credit history'] },
  { id: 'arg-pension',  bankId: 'arig-bank', name: 'Senior Support',      nameMn: 'Ахмад настны тусламж',  category: 'pension',  annualRate: 14.4, minAmount: 300000,   maxAmount: 10000000,  minTermMonths: 3,  maxTermMonths: 48,  eligibility: ['Pension via Arig Bank', 'Age up to 70', 'No collateral'] },
  { id: 'arg-business', bankId: 'arig-bank', name: 'SME Boost',           nameMn: 'ЖДҮ дэмжлэгийн зээл',  category: 'business', annualRate: 21.0, minAmount: 3000000,  maxAmount: 200000000, minTermMonths: 6,  maxTermMonths: 60,  eligibility: ['Business 1+ year', 'Collateral required', 'Revenue verification'] },
  { id: 'arg-car',      bankId: 'arig-bank', name: 'Auto Loan',           nameMn: 'Авто зээл',              category: 'car',      annualRate: 18.6, minAmount: 3000000,  maxAmount: 100000000, minTermMonths: 12, maxTermMonths: 48,  eligibility: ['25% down payment', 'Vehicle age under 7 years', 'Insurance required'] },

  // ── Bogd Bank ──
  { id: 'bog-salary',   bankId: 'bogd-bank', name: 'Personal Credit',     nameMn: 'Хувийн кредит',         category: 'salary',   annualRate: 23.4, minAmount: 500000,   maxAmount: 12000000,  minTermMonths: 3,  maxTermMonths: 24,  eligibility: ['Salary account required', 'Age 21–55', 'Mongolian citizen'] },
  { id: 'bog-mortgage', bankId: 'bogd-bank', name: 'Sacred Home Loan',    nameMn: 'Гэр орны зээл',         category: 'mortgage', annualRate: 15.0, minAmount: 15000000, maxAmount: 250000000, minTermMonths: 36, maxTermMonths: 240, eligibility: ['30% down payment', 'Income verification', 'Property collateral'] },
  { id: 'bog-business', bankId: 'bogd-bank', name: 'Heritage Business',   nameMn: 'Уламжлалт бизнес зээл', category: 'business', annualRate: 21.6, minAmount: 3000000,  maxAmount: 150000000, minTermMonths: 6,  maxTermMonths: 60,  eligibility: ['Business plan', 'Collateral 110%', 'Business history'] },

  // ── M Bank ──
  { id: 'mb-salary',   bankId: 'm-bank', name: 'Digital Salary Loan',   nameMn: 'Дижитал цалингийн зээл', category: 'salary',   annualRate: 21.0, minAmount: 500000,   maxAmount: 20000000,  minTermMonths: 3,  maxTermMonths: 30,  eligibility: ['M Bank app user', 'Salary via M Bank', 'Age 21–60'] },
  { id: 'mb-business', bankId: 'm-bank', name: 'Digital Business',      nameMn: 'Дижитал бизнес зээл',   category: 'business', annualRate: 19.8, minAmount: 3000000,  maxAmount: 150000000, minTermMonths: 6,  maxTermMonths: 48,  eligibility: ['Online business application', 'Business license', 'Digital collateral review'] },
  { id: 'mb-car',      bankId: 'm-bank', name: 'Smart Auto Loan',       nameMn: 'Ухаалаг авто зээл',     category: 'car',      annualRate: 17.4, minAmount: 4000000,  maxAmount: 100000000, minTermMonths: 12, maxTermMonths: 60,  eligibility: ['20% down payment', 'Online application only', 'CASCO insurance'] },
];

// ============================================================
// HELPERS — Finance math (bug-fixed, validated)
// ============================================================

/**
 * Calculate monthly payment using amortization formula.
 * Handles edge cases: zero rate, invalid inputs, yearly compounding.
 */
const calcMonthlyPayment = (P, annualRate, n, compounding = 'monthly') => {
  const principal = parseFloat(P) || 0;
  const rate = parseFloat(annualRate) || 0;
  const periods = parseInt(n) || 0;
  if (principal <= 0 || periods <= 0) return 0;
  if (rate <= 0) return principal / periods;
  let r;
  if (compounding === 'yearly') {
    r = Math.pow(1 + rate / 100, 1 / 12) - 1;
  } else {
    r = rate / 100 / 12;
  }
  const factor = Math.pow(1 + r, periods);
  return principal * (r * factor) / (factor - 1);
};

const calcTotal = (P, annualRate, n, comp = 'monthly') =>
  calcMonthlyPayment(P, annualRate, n, comp) * n;

const fmtMNT = (amount) => {
  const n = Math.abs(Math.round(amount));
  if (n >= 1e9) return `₮${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `₮${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `₮${(n / 1e3).toFixed(0)}K`;
  return `₮${n.toLocaleString()}`;
};

const fmtMNTFull = (amount) => {
  const n = Math.round(Math.abs(parseFloat(amount) || 0));
  return `₮${n.toLocaleString()}`;
};

const fmtTerm = (months, lang = 'en') => {
  const m = parseInt(months) || 0;
  const yrLabel = lang === 'mn' ? 'жил' : 'yr';
  const moLabel = lang === 'mn' ? 'сар' : 'mo';
  if (m >= 12 && m % 12 === 0) return `${m / 12} ${yrLabel}`;
  if (m >= 12) return `${(m / 12).toFixed(1)} ${yrLabel}`;
  return `${m} ${moLabel}`;
};

const getBank = (id) => BANKS.find(b => b.id === id);
const getLoan = (id) => LOANS.find(l => l.id === id);
const getCat  = (id) => CATEGORIES.find(c => c.id === id);

const generateAmortData = (P, annualRate, months, comp = 'monthly') => {
  const principal = parseFloat(P) || 0;
  const periods = parseInt(months) || 0;
  if (principal <= 0 || periods <= 0) return [];
  const rate = parseFloat(annualRate) || 0;
  let r;
  if (rate <= 0) {
    r = 0;
  } else if (comp === 'yearly') {
    r = Math.pow(1 + rate / 100, 1 / 12) - 1;
  } else {
    r = rate / 100 / 12;
  }
  const M = r === 0 ? principal / periods : calcMonthlyPayment(principal, rate, periods, comp);
  const data = [];
  let balance = principal;
  let cumP = 0, cumI = 0;
  const groupBy = periods > 60 ? 12 : periods > 24 ? 6 : periods > 12 ? 3 : 1;
  for (let m = 1; m <= periods; m++) {
    const interest = r === 0 ? 0 : Math.max(0, balance * r);
    const principalPaid = M - interest;
    balance = Math.max(0, balance - principalPaid);
    cumP += principalPaid;
    cumI += interest;
    if (m % groupBy === 0 || m === periods) {
      data.push({
        period: groupBy >= 12 ? `Yr ${Math.ceil(m / 12)}` : `Mo ${m}`,
        Principal: Math.round(Math.max(0, cumP)),
        Interest: Math.round(Math.max(0, cumI)),
        Balance: Math.round(balance),
      });
    }
  }
  return data;
};

// ============================================================
// ATOMS
// ============================================================
const BankLogo = ({ bank, size = 'md' }) => {
  const sizes = { xs: 'w-8 h-8 text-xs', sm: 'w-10 h-10 text-xs', md: 'w-14 h-14 text-sm', lg: 'w-20 h-20 text-base' };
  return (
    <div
      className={`${sizes[size]} rounded-xl flex items-center justify-center font-bold text-white shadow-sm shrink-0 leading-none`}
      style={{ backgroundColor: bank.brandColor }}
    >
      {bank.monogram}
    </div>
  );
};

const CategoryBadge = ({ categoryId, lang = 'en', size = 'sm' }) => {
  const cat = getCat(categoryId);
  if (!cat) return null;
  const Icon = cat.icon;
  const label = lang === 'mn' ? cat.labelMn : cat.labelEn;
  const sizing = size === 'sm' ? 'px-2.5 py-1 text-xs gap-1' : 'px-3 py-1.5 text-sm gap-1.5';
  return (
    <span className={`inline-flex items-center ${sizing} rounded-full font-medium ${cat.color}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {label}
    </span>
  );
};

const Stat = ({ label, value, sub }) => (
  <div>
    <div className="text-xs uppercase tracking-wide text-slate-500 font-medium">{label}</div>
    <div className="text-lg font-bold text-slate-800 mt-0.5">{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
  </div>
);

// ============================================================
// LOAN CARD
// ============================================================
const LoanCard = ({ loan, onCompare, isCompared, t, lang }) => {
  const bank = getBank(loan.bankId);
  const [showElig, setShowElig] = useState(false);
  const sampleAmount = Math.min(10000000, loan.maxAmount);
  const sampleTerm = Math.min(24, loan.maxTermMonths);
  const sampleMonthly = calcMonthlyPayment(sampleAmount, loan.annualRate, sampleTerm);
  const loanName = lang === 'mn' && loan.nameMn ? loan.nameMn : loan.name;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <BankLogo bank={bank} size="sm" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate mb-1">{loanName}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">{bank.name}</span>
              <CategoryBadge categoryId={loan.category} lang={lang} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_annual_rate')}</div>
            <div className="text-xl font-bold text-blue-600">{loan.annualRate}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_loan_range')}</div>
            <div className="text-sm font-semibold text-slate-800">{fmtMNT(loan.minAmount)} – {fmtMNT(loan.maxAmount)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_term')}</div>
            <div className="text-sm font-semibold text-slate-800">{fmtTerm(loan.minTermMonths, lang)} – {fmtTerm(loan.maxTermMonths, lang)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_est_monthly')}</div>
            <div className="text-sm font-semibold text-slate-800">{fmtMNT(sampleMonthly)}</div>
          </div>
        </div>

        <button
          onClick={() => setShowElig(!showElig)}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 mb-3 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          {t('card_eligibility')}
          {showElig ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {showElig && (
          <ul className="mb-4 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
            {loan.eligibility.map((e, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onCompare(loan.id)}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
              isCompared ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isCompared ? <><Check className="w-4 h-4" />{t('card_added')}</> : <><Plus className="w-4 h-4" />{t('card_compare')}</>}
          </button>
          <a
            href={bank.url} target="_blank" rel="noopener noreferrer"
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            {t('card_visit')} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// NAV
// ============================================================
const Nav = ({ currentView, onNavigate, lang, setLang, t }) => {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'home',       label: t('nav_home') },
    { id: 'banks',      label: t('nav_banks') },
    { id: 'compare',    label: t('nav_compare'),    icon: Scale },
    { id: 'calculator', label: t('nav_calculator'), icon: Calculator },
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate({ view: 'home' })} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-800 leading-tight">ZeelHub</div>
              <div className="text-[10px] text-slate-500 leading-tight">{lang === 'mn' ? 'Зээл харьцуулах платформ' : 'Mongolia loan compare'}</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {items.map(item => {
              const isActive = (item.id === 'banks' && currentView === 'bank') || currentView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate({ view: item.id === 'banks' ? 'home' : item.id })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}{item.label}
                </button>
              );
            })}
            <button
              onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
              className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-200 hover:border-blue-400 hover:text-blue-700 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              {lang === 'mn' ? 'EN' : 'МН'}
            </button>
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-3 space-y-1">
            {items.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { onNavigate({ view: item.id === 'banks' ? 'home' : item.id }); setOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                >
                  {Icon && <Icon className="w-4 h-4" />}{item.label}
                </button>
              );
            })}
            <button
              onClick={() => { setLang(lang === 'mn' ? 'en' : 'mn'); setOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {lang === 'mn' ? 'Switch to English' : 'Монгол хэл рүү солих'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

// ============================================================
// MINI CALCULATOR
// ============================================================
const MiniCalc = ({ onOpenFull, t }) => {
  const [amount, setAmount]   = useState(10000000);
  const [rate, setRate]       = useState(15);
  const [years, setYears]     = useState(2);
  const months  = years * 12;
  const M       = calcMonthlyPayment(amount, rate, months);
  const total   = M * months;
  const interest = total - amount;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-800">{t('mini_title')}</div>
            <div className="text-xs text-slate-500">{t('mini_sub')}</div>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">{t('mini_live')}</span>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-600">{t('mini_amount')}</label>
            <span className="text-xs font-semibold text-slate-800">{fmtMNTFull(amount)}</span>
          </div>
          <input type="range" min="500000" max="200000000" step="500000" value={amount}
            onChange={e => setAmount(+e.target.value)} className="w-full accent-blue-600" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600">{t('mini_rate')}</label>
            <input type="number" step="0.1" min="0" max="50" value={rate}
              onChange={e => setRate(Math.min(50, Math.max(0, +e.target.value || 0)))}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600">{t('mini_years')}</label>
            <input type="number" min="1" max="30" value={years}
              onChange={e => setYears(Math.max(1, Math.min(30, +e.target.value || 1)))}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-slate-600">{t('mini_monthly')}</span>
          <span className="text-2xl font-bold text-blue-600">{fmtMNTFull(M)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{t('mini_total_int')}</span>
          <span className="font-semibold text-slate-800">{fmtMNTFull(interest)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{t('mini_total_rep')}</span>
          <span className="font-semibold text-slate-800">{fmtMNTFull(total)}</span>
        </div>
      </div>
      <button
        onClick={onOpenFull}
        className="mt-5 w-full px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
      >
        {t('mini_open')} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// ============================================================
// HOME PAGE
// ============================================================
const HomePage = ({ onNavigate, compareList, onCompare, t, lang }) => {
  const [activeCat, setActiveCat] = useState('all');

  const featured = useMemo(() => {
    const catFilter = activeCat === 'all' ? 'mortgage' : activeCat;
    return BANKS.map(bank => {
      const bl = LOANS.filter(l => l.bankId === bank.id && l.category === catFilter);
      if (!bl.length) return null;
      return bl.reduce((best, l) => l.annualRate < best.annualRate ? l : best);
    }).filter(Boolean);
  }, [activeCat]);

  const bestRate = featured.length ? Math.min(...featured.map(l => l.annualRate)) : null;
  const catLabel = getCat(activeCat);
  const bestRatesLabel = activeCat === 'all'
    ? (lang === 'mn' ? 'Ипотекийн шилдэг хүү' : 'Best Mortgage rates per bank')
    : `${lang === 'mn' ? (catLabel?.labelMn || '') : (catLabel?.labelEn || '')} ${t('tbl_best_rates')}`;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 30%, #2563EB22 0%, transparent 50%), radial-gradient(circle at 75% 70%, #16A34A22 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-700 shadow-sm mb-5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                {BANKS.length} {t('hero_badge_pre')} {LOANS.length} {t('hero_badge_mid')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight">
                {t('hero_title1')}<br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{t('hero_title2')}</span><br />
                <span className="text-slate-700">{t('hero_title3')}</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">{t('hero_sub')}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={() => onNavigate({ view: 'compare' })}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2">
                  {t('hero_cta1')} <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate({ view: 'calculator' })}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2">
                  <Calculator className="w-4 h-4" /> {t('hero_cta2')}
                </button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
                {[
                  { val: BANKS.length, lbl: t('hero_stat1') },
                  { val: `${LOANS.length}+`, lbl: t('hero_stat2') },
                  { val: bestRate ? `${bestRate}%` : '—', lbl: t('hero_stat3'), green: true },
                ].map((s, i) => (
                  <div key={i}>
                    <div className={`text-2xl sm:text-3xl font-bold ${s.green ? 'text-green-600' : 'text-slate-800'}`}>{s.val}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <MiniCalc onOpenFull={() => onNavigate({ view: 'calculator' })} t={t} />
            </div>
          </div>
        </div>
      </section>

      {/* BANKS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{t('banks_title')}</h2>
        <p className="text-slate-600 mb-6">{t('banks_sub')}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BANKS.map(bank => {
            const count = LOANS.filter(l => l.bankId === bank.id).length;
            const minRate = Math.min(...LOANS.filter(l => l.bankId === bank.id).map(l => l.annualRate));
            return (
              <button key={bank.id} onClick={() => onNavigate({ view: 'bank', bankId: bank.id })}
                className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <BankLogo bank={bank} size="md" />
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-0.5">{bank.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{bank.nameLocal}</p>
                <p className="text-sm text-slate-600 mb-4 leading-snug">{bank.tagline}</p>
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">{t('banks_from')}</div>
                    <div className="text-sm font-bold text-blue-600">{minRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">{t('banks_products')}</div>
                    <div className="text-sm font-bold text-slate-800">{count}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">{t('banks_branches')}</div>
                    <div className="text-sm font-bold text-slate-800">{bank.branches}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CATEGORY FILTER + PREVIEW TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{t('cat_title')}</h2>
        <p className="text-slate-600 mb-5">{t('cat_sub')}</p>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-6">
          <button onClick={() => setActiveCat('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCat === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'}`}>
            {t('cat_all')}
          </button>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const label = lang === 'mn' ? cat.labelMn : cat.labelEn;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${activeCat === cat.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'}`}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-slate-800">{bestRatesLabel}</h3>
            </div>
            <button onClick={() => onNavigate({ view: 'compare' })}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              {t('tbl_full_compare')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">{t('tbl_bank')}</th>
                  <th className="text-left px-5 py-3 font-medium">{t('tbl_product')}</th>
                  <th className="text-right px-5 py-3 font-medium">{t('tbl_rate')}</th>
                  <th className="text-right px-5 py-3 font-medium hidden sm:table-cell">{t('tbl_max_amount')}</th>
                  <th className="text-right px-5 py-3 font-medium hidden md:table-cell">{t('tbl_max_term')}</th>
                  <th className="text-right px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {featured.length === 0 ? (
                  <tr><td colSpan="6" className="px-5 py-8 text-center text-slate-500">—</td></tr>
                ) : [...featured].sort((a, b) => a.annualRate - b.annualRate).map(loan => {
                  const bank = getBank(loan.bankId);
                  const isBest = loan.annualRate === Math.min(...featured.map(l => l.annualRate));
                  const loanName = lang === 'mn' && loan.nameMn ? loan.nameMn : loan.name;
                  return (
                    <tr key={loan.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <BankLogo bank={bank} size="xs" />
                          <span className="font-medium text-slate-800">{bank.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{loanName}</td>
                      <td className="px-5 py-4 text-right">
                        <span className={`font-bold ${isBest ? 'text-green-600' : 'text-slate-800'}`}>{loan.annualRate}%</span>
                        {isBest && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-semibold">{t('badge_best')}</span>}
                      </td>
                      <td className="px-5 py-4 text-right text-slate-700 hidden sm:table-cell">{fmtMNT(loan.maxAmount)}</td>
                      <td className="px-5 py-4 text-right text-slate-700 hidden md:table-cell">{fmtTerm(loan.maxTermMonths, lang)}</td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => onCompare(loan.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${compareList.includes(loan.id) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                          {compareList.includes(loan.id) ? t('card_added') : t('card_compare')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, tk: 'why1_title', bk: 'why1_body' },
              { icon: Zap,         tk: 'why2_title', bk: 'why2_body' },
              { icon: Target,      tk: 'why3_title', bk: 'why3_body' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{t(f.tk)}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t(f.bk)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================
// BANK DETAIL PAGE
// ============================================================
const BankPage = ({ bankId, onNavigate, compareList, onCompare, t, lang }) => {
  const bank = getBank(bankId);
  const [activeCat, setActiveCat] = useState('all');

  const loans = useMemo(() =>
    LOANS.filter(l => l.bankId === bankId && (activeCat === 'all' || l.category === activeCat)),
    [bankId, activeCat]);

  const availableCats = useMemo(() => {
    const set = new Set(LOANS.filter(l => l.bankId === bankId).map(l => l.category));
    return CATEGORIES.filter(c => set.has(c.id));
  }, [bankId]);

  const bankLoans = LOANS.filter(l => l.bankId === bankId);
  const minRate = bankLoans.length ? Math.min(...bankLoans.map(l => l.annualRate)) : 0;
  if (!bank) return null;

  return (
    <div>
      <section className="relative overflow-hidden" style={{ backgroundColor: bank.brandLight }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <button onClick={() => onNavigate({ view: 'home' })}
            className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4" /> {t('bank_back')}
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <BankLogo bank={bank} size="lg" />
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{bank.name}</h1>
              <p className="text-slate-600 mt-1">{bank.nameLocal} · {bank.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-6">
                <Stat label={t('bank_from_rate')} value={`${minRate}%`} sub={t('bank_lowest')} />
                <Stat label={t('bank_products')} value={bankLoans.length} />
                <Stat label={t('bank_established')} value={bank.established} />
                <Stat label={t('bank_branches')} value={bank.branches} />
              </div>
            </div>
            <a href={bank.url} target="_blank" rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:shadow text-slate-800 font-medium transition-all flex items-center gap-2 shadow-sm">
              {t('bank_official')} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
          <button onClick={() => setActiveCat('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCat === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'}`}>
            {t('bank_all')}
          </button>
          {availableCats.map(cat => {
            const Icon = cat.icon;
            const label = lang === 'mn' ? cat.labelMn : cat.labelEn;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeCat === cat.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'}`}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loans.map(loan => (
            <LoanCard key={loan.id} loan={loan}
              isCompared={compareList.includes(loan.id)}
              onCompare={onCompare} t={t} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
};

// ============================================================
// COMPARE PAGE
// ============================================================
const ComparePage = ({ compareList, onCompare, onClearCompare, onNavigate, t, lang }) => {
  const [scenario, setScenario] = useState({ amount: 20000000, months: 36 });
  const [showElig, setShowElig] = useState(false);
  const loans = compareList.map(getLoan).filter(Boolean);

  const enriched = loans.map(loan => {
    const M = calcMonthlyPayment(scenario.amount, loan.annualRate, scenario.months);
    return { ...loan, monthly: M, total: M * scenario.months };
  });

  const bestRate    = enriched.length ? Math.min(...enriched.map(l => l.annualRate)) : null;
  const bestMonthly = enriched.length ? Math.min(...enriched.map(l => l.monthly)) : null;
  const longestTerm = enriched.length ? Math.max(...enriched.map(l => l.maxTermMonths)) : null;

  if (loans.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
          <Scale className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('cmp_empty_title')}</h1>
        <p className="text-slate-600 mb-7">{t('cmp_empty_sub')}</p>
        <button onClick={() => onNavigate({ view: 'home' })}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all inline-flex items-center gap-2">
          {t('cmp_browse')} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{t('cmp_title')}</h1>
          <p className="text-slate-600 mt-1">{loans.length} {loans.length === 1 ? t('cmp_loan') : t('cmp_loans')} {t('cmp_sub')}</p>
        </div>
        <button onClick={onClearCompare} className="text-sm text-slate-600 hover:text-red-600 transition-colors flex items-center gap-1">
          <X className="w-4 h-4" /> {t('cmp_clear')}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-slate-800">{t('cmp_scenario')}</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">{t('cmp_amount')}</label>
              <span className="text-sm font-bold text-slate-900">{fmtMNTFull(scenario.amount)}</span>
            </div>
            <input type="range" min="500000" max="500000000" step="500000" value={scenario.amount}
              onChange={e => setScenario({ ...scenario, amount: +e.target.value })} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">{t('cmp_term')}</label>
              <span className="text-sm font-bold text-slate-900">{fmtTerm(scenario.months, lang)}</span>
            </div>
            <input type="range" min="3" max="360" step="3" value={scenario.months}
              onChange={e => setScenario({ ...scenario, months: +e.target.value })} className="w-full accent-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wide w-40 sticky left-0 z-10">{t('cmp_feature')}</th>
                {enriched.map(loan => {
                  const bank = getBank(loan.bankId);
                  const loanName = lang === 'mn' && loan.nameMn ? loan.nameMn : loan.name;
                  return (
                    <th key={loan.id} className="p-4 bg-slate-50 min-w-[200px] text-left align-top">
                      <div className="flex items-start gap-2.5 mb-2">
                        <BankLogo bank={bank} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate">{bank.name}</div>
                          <div className="text-xs text-slate-500 truncate">{loanName}</div>
                        </div>
                        <button onClick={() => onCompare(loan.id)} className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <CategoryBadge categoryId={loan.category} lang={lang} />
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Rate row */}
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">{t('cmp_rate')}</td>
                {enriched.map(loan => {
                  const isBest = loan.annualRate === bestRate;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-lg font-bold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{loan.annualRate}%</span>
                        {isBest && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold flex items-center gap-1"><Award className="w-3 h-3" />{t('badge_best')}</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
              {/* Monthly row */}
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">{t('cmp_monthly')}</td>
                {enriched.map(loan => {
                  const isBest = loan.monthly === bestMonthly;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{fmtMNTFull(loan.monthly)}</span>
                        {isBest && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold flex items-center gap-1"><Banknote className="w-3 h-3" />{t('badge_lowest')}</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
              {/* Total row */}
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">{t('cmp_total')}</td>
                {enriched.map(loan => {
                  const minTotal = Math.min(...enriched.map(l => l.total));
                  const isBest = loan.total === minTotal;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className={`font-semibold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{fmtMNTFull(loan.total)}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{t('interest_note')}{fmtMNTFull(loan.total - scenario.amount)} {t('interest_label')}</div>
                    </td>
                  );
                })}
              </tr>
              {/* Range row */}
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">{t('cmp_range')}</td>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4 text-slate-700">{fmtMNT(loan.minAmount)} – {fmtMNT(loan.maxAmount)}</td>
                ))}
              </tr>
              {/* Max term row */}
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">{t('cmp_max_term')}</td>
                {enriched.map(loan => {
                  const isBest = loan.maxTermMonths === longestTerm;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{fmtTerm(loan.maxTermMonths, lang)}</span>
                        {isBest && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold flex items-center gap-1"><Clock className="w-3 h-3" />{t('badge_longest')}</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
              {/* Requirements row */}
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0 align-top">
                  <button onClick={() => setShowElig(!showElig)} className="flex items-center gap-1 hover:text-slate-900">
                    {t('cmp_requirements')} {showElig ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </td>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4 align-top">
                    {showElig ? (
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {loan.eligibility.map((e, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs text-slate-500">{loan.eligibility.length} {t('cmp_expand')}</span>
                    )}
                  </td>
                ))}
              </tr>
              {/* CTA row */}
              <tr className="border-t border-slate-100">
                <td className="p-4 bg-white sticky left-0"></td>
                {enriched.map(loan => {
                  const bank = getBank(loan.bankId);
                  return (
                    <td key={loan.id} className="p-4">
                      <a href={bank.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all">
                        {t('cmp_visit')} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {loans.length < 4 && (
        <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            {t('cmp_add_more')} <strong>{t('cmp_four')}</strong> {t('cmp_add_link').split('→')[0]}
            <button onClick={() => onNavigate({ view: 'home' })} className="underline font-medium hover:text-blue-700 ml-1">→</button>
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================================
// CALCULATOR PAGE — improved with compounding toggle
// ============================================================
const CalculatorPage = ({ t, lang }) => {
  const [amount, setAmount]       = useState(20000000);
  const [rate, setRate]           = useState(14.4);
  const [termValue, setTermValue] = useState(3);
  const [termUnit, setTermUnit]   = useState('years');
  const [comp, setComp]           = useState('monthly');

  const months   = termUnit === 'years' ? termValue * 12 : termValue;
  const M        = calcMonthlyPayment(amount, rate, months, comp);
  const total    = M * months;
  const interest = Math.max(0, total - amount);
  const data     = useMemo(() => generateAmortData(amount, rate, months, comp), [amount, rate, months, comp]);

  const safeSetAmount = (v) => {
    const n = parseFloat(v) || 0;
    setAmount(Math.min(Math.max(0, n), 10000000000));
  };
  const safeSetRate = (v) => {
    const n = parseFloat(v) || 0;
    setRate(Math.min(Math.max(0, n), 50));
  };
  const safeSetTerm = (v) => {
    const n = parseInt(v) || 1;
    const max = termUnit === 'years' ? 30 : 360;
    setTermValue(Math.min(Math.max(1, n), max));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-7">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{t('calc_title')}</h1>
        <p className="text-slate-600 mt-1">{t('calc_sub')}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
          <h3 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" /> {t('calc_inputs')}
          </h3>
          <div className="space-y-5">

            {/* Amount */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{t('calc_amount')}</label>
                <span className="text-sm font-bold text-slate-900">{fmtMNTFull(amount)}</span>
              </div>
              <input type="range" min="100000" max="500000000" step="100000" value={amount}
                onChange={e => safeSetAmount(e.target.value)} className="w-full accent-blue-600 mb-2" />
              <input type="number" min="0" value={amount}
                onChange={e => safeSetAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Rate */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t('calc_rate')}</label>
              <input type="number" step="0.1" min="0" max="50" value={rate}
                onChange={e => safeSetRate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2" />
              <input type="range" min="0" max="30" step="0.1" value={Math.min(rate, 30)}
                onChange={e => safeSetRate(e.target.value)} className="w-full accent-blue-600" />
            </div>

            {/* Term */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{t('calc_period')}</label>
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  {[['months', t('calc_months')], ['years', t('calc_years')]].map(([u, lbl]) => (
                    <button key={u}
                      onClick={() => {
                        if (u === termUnit) return;
                        if (u === 'years') setTermValue(Math.max(1, Math.round(termValue / 12)));
                        else setTermValue(termValue * 12);
                        setTermUnit(u);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${termUnit === u ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
              <input type="number" min="1" value={termValue} onChange={e => safeSetTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="range" min="1" max={termUnit === 'years' ? 30 : 360} step="1" value={termValue}
                onChange={e => safeSetTerm(e.target.value)} className="w-full accent-blue-600 mt-2" />
              <div className="text-xs text-slate-500 mt-1">= {months} {t('calc_eq_months')}</div>
            </div>

            {/* Compounding toggle */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t('calc_compounding')}</label>
              <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                {[['monthly', t('calc_monthly_comp')], ['yearly', t('calc_yearly_comp')]].map(([c, lbl]) => (
                  <button key={c} onClick={() => setComp(c)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${comp === c ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Outputs panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Result cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-sm">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-1">{t('calc_monthly_pmt')}</div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">{fmtMNTFull(M)}</div>
              <div className="text-xs opacity-80 mt-1">{t('calc_over')} {fmtTerm(months, lang)}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">{t('calc_total_int')}</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{fmtMNTFull(interest)}</div>
              <div className="text-xs text-slate-500 mt-1">{amount > 0 ? ((interest / amount) * 100).toFixed(0) : 0}{t('calc_of_principal')}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">{t('calc_total_rep')}</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{fmtMNTFull(total)}</div>
              <div className="text-xs text-slate-500 mt-1">{t('calc_ppl_int')}</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">{t('calc_chart_title')}</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" /> {t('calc_principal')}</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400" /> {t('calc_interest')}</span>
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.35} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => fmtMNT(v)} width={58} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                    formatter={v => fmtMNTFull(v)}
                  />
                  <Area type="monotone" dataKey="Principal" stackId="1" stroke="#3B82F6" strokeWidth={2} fill="url(#gP)" name={t('calc_principal')} />
                  <Area type="monotone" dataKey="Interest"  stackId="1" stroke="#F59E0B" strokeWidth={2} fill="url(#gI)" name={t('calc_interest')} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-3">{t('calc_chart_desc')}</p>
          </div>

          {/* Formula note */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">{t('calc_formula')}:</strong> {t('calc_formula_text')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = ({ t, lang }) => (
  <footer className="bg-slate-900 text-slate-300 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid sm:grid-cols-4 gap-8">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">ZeelHub</div>
              <div className="text-[10px] text-slate-400">{t('footer_tagline')}</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-md">{t('footer_desc')}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">{t('footer_banks')}</div>
          <ul className="space-y-1 text-sm">
            {BANKS.map(b => <li key={b.id}>{b.name}</li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">{t('footer_cats')}</div>
          <ul className="space-y-1.5 text-sm">
            {CATEGORIES.map(c => <li key={c.id}>{lang === 'mn' ? c.labelMn : c.labelEn}</li>)}
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between flex-wrap gap-2 text-xs text-slate-500">
        <span>{t('footer_copy')}</span>
        <span>{t('footer_built')}</span>
      </div>
    </div>
  </footer>
);

// ============================================================
// COMPARE BASKET (floating)
// ============================================================
const CompareBasket = ({ compareList, onNavigate, onClear, t }) => {
  if (compareList.length === 0) return null;
  const label = compareList.length === 1 ? t('basket_selected') : t('basket_selected_p');
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 w-full max-w-md sm:max-w-fit">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 px-4 py-3 border border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">{compareList.length} {label}</div>
          <div className="text-[10px] text-slate-400 leading-tight">{t('basket_up_to')}</div>
        </div>
        <button onClick={() => onNavigate({ view: 'compare' })}
          className="ml-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-all flex items-center gap-1.5">
          {t('basket_btn')} <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button onClick={onClear} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all" aria-label="Clear">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [route, setRoute]       = useState({ view: 'home' });
  const [compareList, setCompare] = useState([]);
  const [lang, setLang]         = useState('mn'); // default Mongolian

  const t = useMemo(() => createT(lang), [lang]);

  const navigate = (newRoute) => {
    setRoute(newRoute);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompare = (loanId) => {
    setCompare(prev => {
      if (prev.includes(loanId)) return prev.filter(id => id !== loanId);
      if (prev.length >= 4) return prev;
      return [...prev, loanId];
    });
  };

  const sharedProps = { t, lang };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Nav currentView={route.view} onNavigate={navigate} lang={lang} setLang={setLang} t={t} />

      <main>
        {route.view === 'home' && (
          <HomePage onNavigate={navigate} compareList={compareList} onCompare={toggleCompare} {...sharedProps} />
        )}
        {route.view === 'bank' && (
          <BankPage bankId={route.bankId} onNavigate={navigate} compareList={compareList} onCompare={toggleCompare} {...sharedProps} />
        )}
        {route.view === 'compare' && (
          <ComparePage compareList={compareList} onCompare={toggleCompare} onClearCompare={() => setCompare([])} onNavigate={navigate} {...sharedProps} />
        )}
        {route.view === 'calculator' && (
          <CalculatorPage {...sharedProps} />
        )}
      </main>

      <Footer {...sharedProps} />

      {route.view !== 'compare' && (
        <CompareBasket compareList={compareList} onNavigate={navigate} onClear={() => setCompare([])} t={t} />
      )}
    </div>
  );
}
