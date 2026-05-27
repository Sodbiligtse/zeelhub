import { useState, useMemo } from 'react';
import {
  Calculator, Scale, Home, GraduationCap, Briefcase, Car, Wallet,
  Users, ChevronRight, Check, X, ArrowRight, ArrowLeft, Award, Clock,
  ExternalLink, Menu, Plus, Banknote, ChevronDown, ChevronUp,
  Info, ShieldCheck, Zap, Target, Globe, AlertTriangle, ShieldQuestion
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ════════════════════════════════════════════════════════════
// VERIFICATION METADATA
// ════════════════════════════════════════════════════════════
const AUDIT_DATE = '2026-05-27';
const VERIFIED_BY = 'ZeelHub Internal Review';

// ════════════════════════════════════════════════════════════
// TRANSLATIONS
// ════════════════════════════════════════════════════════════
const STRINGS = {
  mn: {
    // Disclaimer banner
    banner_warning: '⚠️ Туршилтын платформ',
    banner_text: 'Зөвхөн Голомт Банкны мэдээлэл албан ёсны эх сурвалжаас баталгаажсан. Бусад банкны зээлийн нөхцөлийг банктайгаа шууд холбоо барьж нягтлана уу.',
    // Nav
    nav_home: 'Нүүр', nav_banks: 'Банкууд', nav_compare: 'Харьцуулах', nav_calculator: 'Тооцоолуур',
    // Hero
    hero_title1: 'Монголын банкны зээлийн', hero_title2: 'албан ёсны мэдээлэл',
    hero_title3: 'нэг дор.',
    hero_sub: 'Зөвхөн банкны албан ёсны сайтаас баталгаажсан зээлийн нөхцөлүүд. Бид зээл олгодоггүй — зөвхөн мэдээллийг харьцуулна.',
    hero_cta1: 'Зээл харьцуулах', hero_cta2: 'Тооцоолуур нээх',
    hero_stat_banks: 'Бүртгэгдсэн банк',
    hero_stat_verified: 'Баталгаажсан бүтээгдэхүүн',
    hero_stat_audit: 'Сүүлд шинэчилсэн',
    // Banks
    banks_title: 'Банкаар харах',
    banks_sub: 'Аль ч банк дээр дарж дэлгэрэнгүй мэдээллийг үзнэ үү.',
    banks_from: 'Хүүгээс', banks_products: 'Баталгаажсан', banks_no_data: 'Мэдээлэл хүлээгдэж байна',
    bank_verified_label: 'Албан эх сурвалжаас баталгаажсан',
    bank_unverified_label: 'Албан эх сурвалж шалгагдаагүй',
    // Categories
    cat_title: 'Зээлийн төрлөөр харах',
    cat_all: 'Бүх зээл',
    cat_salary: 'Цалингийн', cat_pension: 'Тэтгэврийн', cat_mortgage: 'Орон сууцны',
    cat_business: 'Бизнесийн', cat_student: 'Оюутны', cat_car: 'Автомашины',
    // Loan card
    card_annual_rate: 'Жилийн хүү',
    card_loan_range: 'Зээлийн хэмжээ',
    card_term: 'Хугацаа',
    card_eligibility: 'Шаардлага',
    card_added: 'Нэмэгдсэн',
    card_compare: 'Харьцуулах',
    card_visit: 'Банк руу очих',
    card_view_source: 'Эх сурвалжийг харах',
    card_last_verified: 'Шалгасан',
    card_missing: 'Эх сурвалжид заагаагүй',
    // Compare
    cmp_title: 'Зэрэгцүүлэн харьцуулах',
    cmp_loan: 'зээл',
    cmp_clear: 'Цэвэрлэх',
    cmp_scenario: 'Тооцоолох нөхцөл',
    cmp_amount: 'Зээлийн дүн',
    cmp_term: 'Хугацаа',
    cmp_feature: 'Шинж чанар',
    cmp_rate: 'Хүүгийн хэмжээ',
    cmp_monthly: 'Сарын төлбөр (тооцоолол)',
    cmp_total: 'Нийт төлбөр (тооцоолол)',
    cmp_range: 'Зээлийн хязгаар',
    cmp_max_term: 'Дээд хугацаа',
    cmp_requirements: 'Шаардлага',
    cmp_visit: 'Банк руу очих',
    cmp_source: 'Эх сурвалж',
    cmp_empty_title: 'Харьцуулалт үүсгэх',
    cmp_empty_sub: 'Зээлийн жагсаалтаас "Харьцуулах" товчийг дарж 2–4 бүтээгдэхүүн сонгоно уу.',
    cmp_browse: 'Зээл харах',
    cmp_calc_note: 'Сарын болон нийт төлбөр нь хүүгийн доод хязгаараар тооцоологдсон. Бодит төлбөр банкны бодит хүү, нөхцөлөөс хамаарна.',
    // Calculator
    calc_title: 'Зээлийн тооцоолуур',
    calc_sub: 'Зөвхөн ерөнхий тооцоолол. Банкны бодит нөхцөлөөс ялгаатай байж болно.',
    calc_inputs: 'Оролт',
    calc_amount: 'Зээлийн дүн',
    calc_rate: 'Жилийн хүү (%)',
    calc_period: 'Зээлийн хугацаа',
    calc_months: 'сар', calc_years: 'жил',
    calc_eq_months: 'сар',
    calc_compounding: 'Хүү бодох давтамж',
    calc_monthly_comp: 'Сар тутам',
    calc_yearly_comp: 'Жил тутам',
    calc_monthly_pmt: 'Сарын төлбөр',
    calc_total_int: 'Нийт хүү',
    calc_total_rep: 'Нийт төлбөр',
    calc_chart_title: 'Үндсэн зээл ба хүүгийн задаргаа',
    calc_principal: 'Үндсэн зээл',
    calc_interest: 'Хүү',
    calc_formula: 'Тооцоолох томьёо',
    calc_formula_text: 'M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]. Энд P нь үндсэн зээл, r нь сарын хүү (жилийн ÷ 12), n нь сарын тоо. Энэхүү томьёо нь тэнцүү сарын төлбөрт зориулсан. Банкууд нэмэлт хураамж, даатгал авах магадлалтай.',
    // Empty states
    empty_no_products_title: 'Баталгаажсан бүтээгдэхүүн байхгүй',
    empty_no_products_body: 'Энэ банкны зээлийн нөхцөлийг бид одоогоор албан эх сурвалжаас баталгаажуулаагүй байна. Дэлгэрэнгүй мэдээлэл авахын тулд банкны албан сайт руу очно уу.',
    empty_filter: 'Энэ ангилалд бүтээгдэхүүн олдсонгүй.',
    // Verification UI
    verified_label: 'Баталгаажсан',
    unverified_label: 'Баталгаажаагүй',
    confidence_high: 'Өндөр итгэлцэлтэй',
    confidence_medium: 'Дунд итгэлцэлтэй',
    confidence_low: 'Бага итгэлцэлтэй',
    // Bank detail
    bank_back: 'Бүх банк',
    bank_official_site: 'Албан вэбсайт',
    bank_from_rate: 'Доод хүү',
    bank_verified_count: 'Баталгаажсан бүтээгдэхүүн',
    bank_audit_note: 'Бүтээгдэхүүн нэмэгдэх тутамд шинэчлэх болно.',
    // Footer
    footer_tagline: 'Зээл харьцуулах платформ',
    footer_desc: 'ZeelHub нь Монголын банкуудын зээлийн албан мэдээллийг харьцуулан үзэх боломжтой санхүүгийн платформ. Бид зээл олгодоггүй, зөвхөн мэдээлэл цуглуулдаг.',
    footer_methodology_title: 'Бидний арга',
    footer_methodology_text: 'Зөвхөн банкны албан сайтаас шууд харагдах мэдээллийг ашиглана. Бүх дүн, хүү, хугацаа нь эх сурвалжтайгаа холбогдсон.',
    footer_banks: 'Банкууд',
    footer_cats: 'Ангилал',
    footer_copy: '© 2026 ZeelHub. Мэдээллийн платформ.',
    footer_audit: 'Сүүлд аудит хийсэн',
    // Basket
    basket_selected: 'зээл сонгогдсон',
    basket_btn: 'Харьцуулах',
    // Misc
    needs_verification: 'Шаардлагатай гэрчилгээ',
    range_separator: '–',
  },
  en: {
    banner_warning: '⚠️ Pilot platform',
    banner_text: 'Only Golomt Bank data is verified from official source. For other banks, contact directly before borrowing.',
    nav_home: 'Home', nav_banks: 'Banks', nav_compare: 'Compare', nav_calculator: 'Calculator',
    hero_title1: 'Mongolian bank loan', hero_title2: 'official data',
    hero_title3: 'in one place.',
    hero_sub: 'Only loan terms verified from each bank\'s official website. We do not issue loans — we compare publicly published information.',
    hero_cta1: 'Compare loans', hero_cta2: 'Open calculator',
    hero_stat_banks: 'Registered banks',
    hero_stat_verified: 'Verified products',
    hero_stat_audit: 'Last audited',
    banks_title: 'Browse by bank',
    banks_sub: 'Click any bank to see details.',
    banks_from: 'From', banks_products: 'Verified', banks_no_data: 'Data pending',
    bank_verified_label: 'Verified from official source',
    bank_unverified_label: 'Official source not yet checked',
    cat_title: 'Browse by loan type',
    cat_all: 'All loans',
    cat_salary: 'Salary', cat_pension: 'Pension', cat_mortgage: 'Mortgage',
    cat_business: 'Business', cat_student: 'Student', cat_car: 'Car',
    card_annual_rate: 'Annual rate',
    card_loan_range: 'Loan range',
    card_term: 'Term',
    card_eligibility: 'Eligibility',
    card_added: 'Added',
    card_compare: 'Compare',
    card_visit: 'Visit Bank',
    card_view_source: 'View source',
    card_last_verified: 'Verified',
    card_missing: 'Not specified by source',
    cmp_title: 'Side-by-side comparison',
    cmp_loan: 'loan',
    cmp_clear: 'Clear',
    cmp_scenario: 'Calculation scenario',
    cmp_amount: 'Loan amount',
    cmp_term: 'Term',
    cmp_feature: 'Feature',
    cmp_rate: 'Interest rate',
    cmp_monthly: 'Monthly payment (estimate)',
    cmp_total: 'Total repayment (estimate)',
    cmp_range: 'Loan limits',
    cmp_max_term: 'Max term',
    cmp_requirements: 'Requirements',
    cmp_visit: 'Visit bank',
    cmp_source: 'Source',
    cmp_empty_title: 'Build a comparison',
    cmp_empty_sub: 'Click "Compare" on 2–4 loans from the list to see them side-by-side.',
    cmp_browse: 'Browse loans',
    cmp_calc_note: 'Monthly and total payments calculated at the rate floor. Actual amounts depend on the bank\'s specific terms.',
    calc_title: 'Loan calculator',
    calc_sub: 'Generic calculation only. Real terms may differ.',
    calc_inputs: 'Inputs',
    calc_amount: 'Loan amount',
    calc_rate: 'Annual rate (%)',
    calc_period: 'Term',
    calc_months: 'months', calc_years: 'years',
    calc_eq_months: 'months',
    calc_compounding: 'Compounding',
    calc_monthly_comp: 'Monthly',
    calc_yearly_comp: 'Yearly',
    calc_monthly_pmt: 'Monthly payment',
    calc_total_int: 'Total interest',
    calc_total_rep: 'Total repayment',
    calc_chart_title: 'Principal vs Interest',
    calc_principal: 'Principal',
    calc_interest: 'Interest',
    calc_formula: 'Formula',
    calc_formula_text: 'M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]. P is principal, r is monthly rate (annual ÷ 12), n is number of months. Standard amortization formula for equal monthly payments. Banks may add fees or insurance.',
    empty_no_products_title: 'No verified products yet',
    empty_no_products_body: 'We have not yet verified this bank\'s loan products from its official source. Visit the bank\'s website directly for current information.',
    empty_filter: 'No products in this category.',
    verified_label: 'Verified',
    unverified_label: 'Unverified',
    confidence_high: 'High confidence',
    confidence_medium: 'Medium confidence',
    confidence_low: 'Low confidence',
    bank_back: 'All banks',
    bank_official_site: 'Official website',
    bank_from_rate: 'From',
    bank_verified_count: 'Verified products',
    bank_audit_note: 'More products will be added as they are verified.',
    footer_tagline: 'Loan comparison platform',
    footer_desc: 'ZeelHub compares official loan information published by Mongolian banks. We do not issue loans — we aggregate information.',
    footer_methodology_title: 'Our method',
    footer_methodology_text: 'We use only information visible on each bank\'s official website. Every rate, term, and amount is linked to its source.',
    footer_banks: 'Banks',
    footer_cats: 'Categories',
    footer_copy: '© 2026 ZeelHub. Information platform.',
    footer_audit: 'Last audited',
    basket_selected: 'selected',
    basket_btn: 'Compare',
    needs_verification: 'Needs verification',
    range_separator: '–',
  }
};

const createT = (lang) => (key) => STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;

// ════════════════════════════════════════════════════════════
// BANKS — directory entries
// Only Golomt is verified at loan level. Others kept as directory entries
// per option (b) in operating contract.
// ════════════════════════════════════════════════════════════
const BANKS = [
  {
    id: 'khan-bank',
    name: 'Хаан Банк',
    nameEn: 'Khan Bank',
    monogram: 'KB',
    brandColor: '#0E6E3E', brandLight: '#E6F2EC',
    url: 'https://www.khanbank.com/personal/calculator/',
    bankVerified: false, // Source returned JS-rendered SPA; rates not extractable
    sourceStatus: 'js_rendered',
    notes: 'Албан сайт JS-ээр бүтээгдсэн тул автоматаар уншигдсангүй. Гар аргаар шалгах шаардлагатай.',
  },
  {
    id: 'golomt-bank',
    name: 'Голомт Банк',
    nameEn: 'Golomt Bank',
    monogram: 'G',
    brandColor: '#C8102E', brandLight: '#FBEAEC',
    url: 'https://www.golomtbank.com/retail/loans',
    bankVerified: true,
    sourceStatus: 'verified',
    notes: 'Албан зээлийн хуудаснаас бүх бүтээгдэхүүн харагдсан.',
  },
  {
    id: 'tdb',
    name: 'Худалдаа Хөгжлийн Банк',
    nameEn: 'Trade & Development Bank',
    monogram: 'TDB',
    brandColor: '#003D7A', brandLight: '#E6EEF7',
    url: 'https://www.tdbm.mn/mn/retail/loans',
    bankVerified: false,
    sourceStatus: 'directory_only',
    notes: 'Бүтээгдэхүүний нэрс харагдсан, хүү дэлгэрэнгүй хуудсанд байна. Хэсэгчлэн шалгана.',
  },
  {
    id: 'state-bank',
    name: 'Төрийн Банк',
    nameEn: 'State Bank',
    monogram: 'SB',
    brandColor: '#B91C1C', brandLight: '#FBEBEB',
    url: 'https://www.statebank.mn/personal/products/6',
    bankVerified: false,
    sourceStatus: 'directory_only',
    notes: 'Бүтээгдэхүүний нэрс харагдсан. Хүүгийн мэдээлэл дэлгэрэнгүй хуудсанд.',
  },
  {
    id: 'xac-bank',
    name: 'Хасбанк',
    nameEn: 'XacBank',
    monogram: 'XAC',
    brandColor: '#D97706', brandLight: '#FEF3C7',
    url: 'https://xacbank.mn',
    bankVerified: false,
    sourceStatus: 'blocked',
    notes: 'Албан сайт robots.txt-ээр блоклогдсон.',
  },
  {
    id: 'capitron-bank',
    name: 'Капитрон Банк',
    nameEn: 'Capitron Bank',
    monogram: 'CAP',
    brandColor: '#7C3AED', brandLight: '#EDE9FE',
    url: 'https://www.capitronbank.mn',
    bankVerified: false,
    sourceStatus: 'js_rendered',
    notes: 'JS-ээр бүтээгдсэн SPA, автоматаар уншигдсангүй.',
  },
  {
    id: 'ni-bank',
    name: 'Үндэсний Хөрөнгө Оруулалтын Банк',
    nameEn: 'National Investment Bank',
    monogram: 'NIB',
    brandColor: '#0369A1', brandLight: '#E0F2FE',
    url: 'https://www.nibank.mn',
    bankVerified: false,
    sourceStatus: 'unreachable',
    notes: 'SSL сертификатын алдаатай — холбогдох боломжгүй.',
  },
];

// ════════════════════════════════════════════════════════════
// CATEGORIES
// ════════════════════════════════════════════════════════════
const CATEGORIES = [
  { id: 'salary',   labelEn: 'Salary',   labelMn: 'Цалингийн',  icon: Wallet,        color: 'bg-blue-100 text-blue-700' },
  { id: 'pension',  labelEn: 'Pension',  labelMn: 'Тэтгэврийн', icon: Users,         color: 'bg-purple-100 text-purple-700' },
  { id: 'mortgage', labelEn: 'Mortgage', labelMn: 'Орон сууцны',icon: Home,          color: 'bg-amber-100 text-amber-700' },
  { id: 'business', labelEn: 'Business', labelMn: 'Бизнесийн',  icon: Briefcase,     color: 'bg-emerald-100 text-emerald-700' },
  { id: 'student',  labelEn: 'Student',  labelMn: 'Оюутны',     icon: GraduationCap, color: 'bg-pink-100 text-pink-700' },
  { id: 'car',      labelEn: 'Car',      labelMn: 'Автомашины', icon: Car,           color: 'bg-cyan-100 text-cyan-700' },
];

// ════════════════════════════════════════════════════════════
// LOANS — VERIFIED DATA ONLY
// Source: https://www.golomtbank.com/retail/loans (retrieved 2026-05-27)
// Every entry below has been directly observed on the official Golomt
// Bank loan listing page. Names, rates, terms, and amounts are verbatim
// from the source — no inference, no estimation.
// ════════════════════════════════════════════════════════════
const LOANS = [
  // ─── Salary / Consumer ───
  {
    id: 'golomt-salary',
    bankId: 'golomt-bank',
    category: 'salary',
    nameMn: 'Цалингийн зээл',
    nameEn: null,
    rateMin: 18.0, rateMax: 21.6,
    minAmount: null, maxAmount: 50000000,
    minTermMonths: null, maxTermMonths: 30,
    eligibility: ['Голомт банкаар цалингаа авдаг байгууллагын ажилтан'],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/400/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'minTermMonths'],
    notes: '',
  },
  {
    id: 'golomt-consumer',
    bankId: 'golomt-bank',
    category: 'salary',
    nameMn: 'Хэрэглээний зээл',
    nameEn: null,
    rateMin: 18.0, rateMax: 23.4,
    minAmount: null, maxAmount: 50000000,
    minTermMonths: null, maxTermMonths: 30,
    eligibility: [],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/6488/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'minTermMonths', 'eligibility'],
    notes: 'Гэр ахуйн хэрэгцээнд зориулагдсан.',
  },

  // ─── Pension ───
  {
    id: 'golomt-pension',
    bankId: 'golomt-bank',
    category: 'pension',
    nameMn: 'Тэтгэврийн зээл',
    nameEn: null,
    rateMin: 18.0, rateMax: 18.0,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 36,
    eligibility: ['Голомт банкаар тэтгэвэр авдаг өндөр насны иргэн'],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/6472/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths'],
    notes: '',
  },

  // ─── Mortgage ───
  {
    id: 'golomt-mortgage-6',
    bankId: 'golomt-bank',
    category: 'mortgage',
    nameMn: '6% хүүтэй орон сууцны зээл',
    nameEn: null,
    rateMin: 6.0, rateMax: 6.0,
    minAmount: null, maxAmount: 160000000,
    minTermMonths: null, maxTermMonths: 360,
    eligibility: [],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/784/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'minTermMonths', 'eligibility'],
    notes: 'Монгол банк болон арилжааны банкуудын хамтран хэрэгжүүлж буй хөтөлбөр.',
  },
  {
    id: 'golomt-mortgage-standard',
    bankId: 'golomt-bank',
    category: 'mortgage',
    nameMn: 'Голомт банкны орон сууцны зээл',
    nameEn: null,
    rateMin: 15.6, rateMax: 18.0,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 240,
    eligibility: [],
    rateNote: 'Дээд хэмжээ: ОСҮ-80%',
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/404/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths', 'eligibility'],
    notes: '',
  },
  {
    id: 'golomt-mortgage-private',
    bankId: 'golomt-bank',
    category: 'mortgage',
    nameMn: 'Амины орон сууц худалдан авах зээл',
    nameEn: null,
    rateMin: 15.0, rateMax: 18.6,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 240,
    eligibility: [],
    rateNote: 'Дээд хэмжээ: 100% хүртэл',
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/786/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths', 'eligibility'],
    notes: '',
  },
  {
    id: 'golomt-mortgage-green',
    bankId: 'golomt-bank',
    category: 'mortgage',
    nameMn: 'Ногоон Орон сууц, Амины орон сууцны зээл',
    nameEn: null,
    rateMin: 15.6, rateMax: 16.8,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 240,
    eligibility: ['Ногоон таксономийн шаардлагыг хангасан', 'EDGE, LEED эсвэл BESTGER гэрчилгээтэй'],
    rateNote: 'Дээд хэмжээ: ОСҮ-80%',
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/25398/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths'],
    notes: '',
  },
  {
    id: 'golomt-mortgage-energy',
    bankId: 'golomt-bank',
    category: 'mortgage',
    nameMn: 'Эрчим хүчний хэмнэлттэй зээл',
    nameEn: null,
    rateMin: 15.0, rateMax: 15.0,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 240,
    eligibility: ['20%-с дээш эрчим хүчний хэмнэлттэй орон сууц'],
    rateNote: 'Дээд хэмжээ: ОСҮ-80%',
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/47197/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths'],
    notes: '',
  },

  // ─── Car ───
  {
    id: 'golomt-auto',
    bankId: 'golomt-bank',
    category: 'car',
    nameMn: 'Автомашины зээл',
    nameEn: null,
    rateMin: 18.0, rateMax: 24.0,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 30,
    eligibility: [],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/22342/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths', 'eligibility'],
    notes: '',
  },
  {
    id: 'golomt-auto-green',
    bankId: 'golomt-bank',
    category: 'car',
    nameMn: 'Автомашины ногоон зээл',
    nameEn: null,
    rateMin: 15.6, rateMax: 19.2,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 30,
    eligibility: [],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/845/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths', 'eligibility'],
    notes: '',
  },

  // ─── Business ───
  {
    id: 'golomt-working-capital',
    bankId: 'golomt-bank',
    category: 'business',
    nameMn: 'Эргэлтийн хөрөнгийн зээл',
    nameEn: null,
    rateMin: 16.8, rateMax: 21.6,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: null,
    eligibility: [],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/31134/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths', 'maxTermMonths', 'eligibility'],
    notes: '',
  },
  {
    id: 'golomt-investment',
    bankId: 'golomt-bank',
    category: 'business',
    nameMn: 'Хөрөнгө оруулалтын зээл',
    nameEn: null,
    rateMin: 16.8, rateMax: 21.6,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: null,
    eligibility: [],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/31138/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths', 'maxTermMonths', 'eligibility'],
    notes: '',
  },
  {
    id: 'golomt-women-business',
    bankId: 'golomt-bank',
    category: 'business',
    nameMn: 'Бизнес эрхлэгч эмэгтэйчүүдийг дэмжих зээл',
    nameEn: null,
    rateMin: 16.2, rateMax: 19.8,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: null,
    eligibility: ['Хувиараа бизнес эрхлэгч эмэгтэй', 'эсвэл эмэгтэй удирдлагатай аж ахуйн нэгж'],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/19214/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths', 'maxTermMonths'],
    notes: '',
  },
  {
    id: 'golomt-pos',
    bankId: 'golomt-bank',
    category: 'business',
    nameMn: 'ПОС-ын орлого барьцаалсан зээл',
    nameEn: null,
    rateMin: 16.8, rateMax: 21.6,
    minAmount: null, maxAmount: 50000000,
    minTermMonths: null, maxTermMonths: 30,
    eligibility: ['ПОС төхөөрөмжөөр борлуулалт хийдэг бизнес'],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/6542/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'minTermMonths'],
    notes: '',
  },
  {
    id: 'golomt-quick',
    bankId: 'golomt-bank',
    category: 'business',
    nameMn: 'Шуурхай зээл',
    nameEn: null,
    rateMin: 21.6, rateMax: 24.0,
    minAmount: null, maxAmount: null,
    minTermMonths: null, maxTermMonths: 24,
    eligibility: ['Үл хөдлөх хөрөнгө барьцаалах'],
    verified: true,
    sourceUrl: 'https://www.golomtbank.com/loans/48855/',
    lastVerified: AUDIT_DATE, verifiedBy: VERIFIED_BY,
    verificationConfidence: 'high',
    missingFields: ['minAmount', 'maxAmount', 'minTermMonths'],
    notes: '',
  },
];

// ════════════════════════════════════════════════════════════
// FINANCE HELPERS (validated, edge cases handled)
// ════════════════════════════════════════════════════════════
const calcMonthlyPayment = (P, annualRate, n, compounding = 'monthly') => {
  const principal = parseFloat(P) || 0;
  const rate = parseFloat(annualRate) || 0;
  const periods = parseInt(n, 10) || 0;
  if (principal <= 0 || periods <= 0) return 0;
  if (rate <= 0) return principal / periods;
  const r = compounding === 'yearly'
    ? Math.pow(1 + rate / 100, 1 / 12) - 1
    : rate / 100 / 12;
  const factor = Math.pow(1 + r, periods);
  return principal * (r * factor) / (factor - 1);
};

const fmtMNT = (amount) => {
  if (amount == null || isNaN(amount)) return '—';
  const n = Math.abs(Math.round(amount));
  if (n >= 1e9) return `₮${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `₮${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `₮${(n / 1e3).toFixed(0)}K`;
  return `₮${n.toLocaleString()}`;
};

const fmtMNTFull = (amount) => {
  if (amount == null || isNaN(amount)) return '—';
  return `₮${Math.round(Math.abs(parseFloat(amount) || 0)).toLocaleString()}`;
};

const fmtTerm = (months, lang) => {
  if (months == null) return '—';
  const m = parseInt(months, 10) || 0;
  const yr = lang === 'mn' ? 'жил' : 'yr';
  const mo = lang === 'mn' ? 'сар' : 'mo';
  if (m >= 12 && m % 12 === 0) return `${m / 12} ${yr}`;
  return `${m} ${mo}`;
};

const fmtRate = (rateMin, rateMax) => {
  if (rateMin == null && rateMax == null) return '—';
  if (rateMin === rateMax || rateMax == null) return `${rateMin}%`;
  return `${rateMin}–${rateMax}%`;
};

const fmtRange = (min, max, formatter) => {
  if (min == null && max == null) return '—';
  if (min == null) return `≤ ${formatter(max)}`;
  if (max == null) return `≥ ${formatter(min)}`;
  return `${formatter(min)} – ${formatter(max)}`;
};

const fmtTermRange = (min, max, lang) => {
  if (min == null && max == null) return '—';
  if (min == null) return `≤ ${fmtTerm(max, lang)}`;
  if (max == null) return `≥ ${fmtTerm(min, lang)}`;
  return `${fmtTerm(min, lang)} – ${fmtTerm(max, lang)}`;
};

const generateAmortData = (P, annualRate, months, comp = 'monthly') => {
  const principal = parseFloat(P) || 0;
  const periods = parseInt(months, 10) || 0;
  if (principal <= 0 || periods <= 0) return [];
  const rate = parseFloat(annualRate) || 0;
  const r = rate <= 0 ? 0 :
            comp === 'yearly' ? Math.pow(1 + rate / 100, 1 / 12) - 1 :
            rate / 100 / 12;
  const M = r === 0 ? principal / periods : calcMonthlyPayment(principal, rate, periods, comp);
  const data = [];
  let balance = principal, cumP = 0, cumI = 0;
  const groupBy = periods > 60 ? 12 : periods > 24 ? 6 : periods > 12 ? 3 : 1;
  for (let m = 1; m <= periods; m++) {
    const interest = r === 0 ? 0 : Math.max(0, balance * r);
    cumP += M - interest;
    cumI += interest;
    balance = Math.max(0, balance - (M - interest));
    if (m % groupBy === 0 || m === periods) {
      data.push({
        period: groupBy >= 12 ? `${Math.ceil(m / 12)}` : `${m}`,
        Principal: Math.round(Math.max(0, cumP)),
        Interest: Math.round(Math.max(0, cumI)),
      });
    }
  }
  return data;
};

const getBank = (id) => BANKS.find(b => b.id === id);
const getLoan = (id) => LOANS.find(l => l.id === id);
const getCat  = (id) => CATEGORIES.find(c => c.id === id);
const countVerified = (bankId) => LOANS.filter(l => l.bankId === bankId && l.verified).length;
const minRateForBank = (bankId) => {
  const loans = LOANS.filter(l => l.bankId === bankId && l.verified && l.rateMin != null);
  return loans.length ? Math.min(...loans.map(l => l.rateMin)) : null;
};

// ════════════════════════════════════════════════════════════
// ATOMS
// ════════════════════════════════════════════════════════════
const BankLogo = ({ bank, size = 'md' }) => {
  const s = { xs: 'w-8 h-8 text-xs', sm: 'w-10 h-10 text-xs', md: 'w-14 h-14 text-sm', lg: 'w-20 h-20 text-base' };
  return (
    <div className={`${s[size]} rounded-xl flex items-center justify-center font-bold text-white shadow-sm shrink-0 leading-none`}
      style={{ backgroundColor: bank.brandColor }} aria-label={bank.name}>
      {bank.monogram}
    </div>
  );
};

const CategoryBadge = ({ categoryId, lang, size = 'sm' }) => {
  const cat = getCat(categoryId);
  if (!cat) return null;
  const Icon = cat.icon;
  const label = lang === 'mn' ? cat.labelMn : cat.labelEn;
  const sz = size === 'sm' ? 'px-2.5 py-1 text-xs gap-1' : 'px-3 py-1.5 text-sm gap-1.5';
  return (
    <span className={`inline-flex items-center ${sz} rounded-full font-medium ${cat.color}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} aria-hidden="true" />{label}
    </span>
  );
};

const VerifiedBadge = ({ t, sourceUrl, lastVerified, confidence }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700 border border-green-200">
    <ShieldCheck className="w-3 h-3" aria-hidden="true" />
    {t('verified_label')}
  </span>
);

const UnverifiedBadge = ({ t }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
    <ShieldQuestion className="w-3 h-3" aria-hidden="true" />
    {t('unverified_label')}
  </span>
);

const Stat = ({ label, value, sub }) => (
  <div>
    <div className="text-xs uppercase tracking-wide text-slate-500 font-medium">{label}</div>
    <div className="text-lg font-bold text-slate-800 mt-0.5">{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
  </div>
);

// ════════════════════════════════════════════════════════════
// DISCLAIMER BANNER — sticky at top above nav
// ════════════════════════════════════════════════════════════
const DisclaimerBanner = ({ t }) => (
  <div className="bg-amber-50 border-b border-amber-200 text-amber-900" role="alert">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-start gap-2.5 text-xs sm:text-sm">
      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <span className="font-semibold">{t('banner_warning')}</span>
        <span className="mx-1.5">·</span>
        <span>{t('banner_text')}</span>
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════
// LOAN CARD — with verification metadata visible
// ════════════════════════════════════════════════════════════
const LoanCard = ({ loan, isCompared, onCompare, t, lang }) => {
  const bank = getBank(loan.bankId);
  const [showElig, setShowElig] = useState(false);
  const name = lang === 'mn' && loan.nameMn ? loan.nameMn : (loan.nameEn || loan.nameMn);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <BankLogo bank={bank} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-slate-800 truncate">{name}</h3>
              {loan.verified && <VerifiedBadge t={t} />}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">{lang === 'mn' ? bank.name : bank.nameEn}</span>
              <CategoryBadge categoryId={loan.category} lang={lang} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_annual_rate')}</div>
            <div className="text-xl font-bold text-blue-600">{fmtRate(loan.rateMin, loan.rateMax)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_loan_range')}</div>
            <div className="text-sm font-semibold text-slate-800">
              {fmtRange(loan.minAmount, loan.maxAmount, fmtMNT)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_term')}</div>
            <div className="text-sm font-semibold text-slate-800">
              {fmtTermRange(loan.minTermMonths, loan.maxTermMonths, lang)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">{t('card_last_verified')}</div>
            <div className="text-sm font-semibold text-slate-800">{loan.lastVerified}</div>
          </div>
        </div>

        {loan.rateNote && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-blue-50 text-xs text-blue-900 border border-blue-100">
            <Info className="inline-block w-3 h-3 mr-1" aria-hidden="true" />{loan.rateNote}
          </div>
        )}

        {loan.eligibility.length > 0 && (
          <>
            <button onClick={() => setShowElig(!showElig)}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 mb-3 transition-colors"
              aria-expanded={showElig}>
              <Info className="w-3.5 h-3.5" aria-hidden="true" />
              {t('card_eligibility')} ({loan.eligibility.length})
              {showElig ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showElig && (
              <ul className="mb-4 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                {loan.eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {loan.missingFields.length > 0 && (
          <div className="mb-3 text-[10px] text-slate-500 italic">
            {t('card_missing')}: {loan.missingFields.length}
          </div>
        )}

        <div className="flex gap-2 mb-2">
          <button onClick={() => onCompare(loan.id)}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
              isCompared ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}>
            {isCompared ? <><Check className="w-4 h-4" />{t('card_added')}</> : <><Plus className="w-4 h-4" />{t('card_compare')}</>}
          </button>
          <a href={loan.sourceUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-1.5">
            {t('card_visit')} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <a href={loan.sourceUrl} target="_blank" rel="noopener noreferrer"
          className="block text-[10px] text-slate-500 hover:text-blue-600 underline truncate">
          {t('card_view_source')}: {loan.sourceUrl}
        </a>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════════════════════
const Nav = ({ currentView, onNavigate, lang, setLang, t }) => {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'home', label: t('nav_home') },
    { id: 'compare', label: t('nav_compare'), icon: Scale },
    { id: 'calculator', label: t('nav_calculator'), icon: Calculator },
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate({ view: 'home' })} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Banknote className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-800 leading-tight">ZeelHub</div>
              <div className="text-[10px] text-slate-500 leading-tight">{t('footer_tagline')}</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {items.map(item => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => onNavigate({ view: item.id })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}>
                  {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}{item.label}
                </button>
              );
            })}
            <button onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
              className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-200 hover:border-blue-400 hover:text-blue-700 transition-all duration-200"
              aria-label="Toggle language">
              <Globe className="w-4 h-4" aria-hidden="true" />{lang === 'mn' ? 'EN' : 'МН'}
            </button>
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(!open)}
            aria-expanded={open} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-3 space-y-1">
            {items.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id}
                  onClick={() => { onNavigate({ view: item.id }); setOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}{item.label}
                </button>
              );
            })}
            <button onClick={() => { setLang(lang === 'mn' ? 'en' : 'mn'); setOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 flex items-center gap-2">
              <Globe className="w-4 h-4" aria-hidden="true" />{lang === 'mn' ? 'Switch to English' : 'Монгол хэл рүү солих'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

// ════════════════════════════════════════════════════════════
// HOME PAGE
// ════════════════════════════════════════════════════════════
const HomePage = ({ onNavigate, compareList, onCompare, t, lang }) => {
  const [activeCat, setActiveCat] = useState('all');

  const filteredLoans = useMemo(() => {
    const list = activeCat === 'all' ? LOANS : LOANS.filter(l => l.category === activeCat);
    return list.filter(l => l.verified);
  }, [activeCat]);

  const verifiedTotal = LOANS.filter(l => l.verified).length;
  const verifiedBankCount = BANKS.filter(b => countVerified(b.id) > 0).length;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-white border border-green-200 rounded-full px-3 py-1 text-xs font-medium text-green-700 shadow-sm mb-5">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              {verifiedTotal} {lang === 'mn' ? 'баталгаажсан бүтээгдэхүүн · ' : 'verified products · '}
              {t('hero_stat_audit')} {AUDIT_DATE}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              {t('hero_title1')} <span className="text-blue-600">{t('hero_title2')}</span> {t('hero_title3')}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t('hero_sub')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => onNavigate({ view: 'compare' })}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2">
                {t('hero_cta1')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button onClick={() => onNavigate({ view: 'calculator' })}
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2">
                <Calculator className="w-4 h-4" aria-hidden="true" /> {t('hero_cta2')}
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800">{BANKS.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">{t('hero_stat_banks')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{verifiedTotal}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">{t('hero_stat_verified')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800">{verifiedBankCount}/{BANKS.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">{lang === 'mn' ? 'Шалгасан банк' : 'Audited banks'}</div>
              </div>
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
            const verifiedCount = countVerified(bank.id);
            const minRate = minRateForBank(bank.id);
            return (
              <button key={bank.id} onClick={() => onNavigate({ view: 'bank', bankId: bank.id })}
                className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <BankLogo bank={bank} size="md" />
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-0.5">{lang === 'mn' ? bank.name : bank.nameEn}</h3>
                <p className="text-xs text-slate-500 mb-3">{lang === 'mn' ? bank.nameEn : bank.name}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">{t('banks_from')}</div>
                    <div className="text-sm font-bold text-blue-600">{minRate != null ? `${minRate}%` : '—'}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">{t('banks_products')}</div>
                    <div className="text-sm font-bold text-slate-800">{verifiedCount}</div>
                  </div>
                </div>
                {verifiedCount === 0 && (
                  <div className="mt-3 text-[10px] text-amber-700 font-medium flex items-center gap-1">
                    <ShieldQuestion className="w-3 h-3" aria-hidden="true" />{t('banks_no_data')}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* CATEGORY FILTER + VERIFIED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{t('cat_title')}</h2>
        <p className="text-slate-600 mb-5">{verifiedTotal} {lang === 'mn' ? 'баталгаажсан бүтээгдэхүүн' : 'verified products'}</p>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-6">
          <button onClick={() => setActiveCat('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCat === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'}`}>
            {t('cat_all')}
          </button>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const label = lang === 'mn' ? cat.labelMn : cat.labelEn;
            const count = LOANS.filter(l => l.category === cat.id && l.verified).length;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                disabled={count === 0}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeCat === cat.id ? 'bg-slate-900 text-white' :
                  count === 0 ? 'bg-slate-50 border border-slate-200 text-slate-400 cursor-not-allowed' :
                  'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}>
                <Icon className="w-4 h-4" aria-hidden="true" />{label} ({count})
              </button>
            );
          })}
        </div>

        {filteredLoans.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <ShieldQuestion className="w-12 h-12 text-slate-300 mx-auto mb-3" aria-hidden="true" />
            <p className="text-slate-500">{t('empty_filter')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLoans.map(loan => (
              <LoanCard key={loan.id} loan={loan}
                isCompared={compareList.includes(loan.id)}
                onCompare={onCompare} t={t} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// BANK DETAIL PAGE
// ════════════════════════════════════════════════════════════
const BankPage = ({ bankId, onNavigate, compareList, onCompare, t, lang }) => {
  const bank = getBank(bankId);
  const [activeCat, setActiveCat] = useState('all');
  if (!bank) return null;

  const allBankLoans = LOANS.filter(l => l.bankId === bankId && l.verified);
  const loans = activeCat === 'all' ? allBankLoans : allBankLoans.filter(l => l.category === activeCat);
  const availableCats = CATEGORIES.filter(c => allBankLoans.some(l => l.category === c.id));
  const minRate = minRateForBank(bankId);

  return (
    <div>
      <section className="relative overflow-hidden" style={{ backgroundColor: bank.brandLight }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <button onClick={() => onNavigate({ view: 'home' })}
            className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {t('bank_back')}
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <BankLogo bank={bank} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{lang === 'mn' ? bank.name : bank.nameEn}</h1>
                {bank.bankVerified
                  ? <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                      <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />{t('bank_verified_label')}
                    </span>
                  : <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      <ShieldQuestion className="w-3.5 h-3.5" aria-hidden="true" />{t('bank_unverified_label')}
                    </span>}
              </div>
              <p className="text-slate-600 mt-1">{lang === 'mn' ? bank.nameEn : bank.name}</p>
              <div className="mt-4 flex flex-wrap gap-6">
                <Stat label={t('bank_from_rate')} value={minRate != null ? `${minRate}%` : '—'} />
                <Stat label={t('bank_verified_count')} value={allBankLoans.length} />
                <Stat label={t('hero_stat_audit')} value={AUDIT_DATE} />
              </div>
            </div>
            <a href={bank.url} target="_blank" rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:shadow text-slate-800 font-medium transition-all flex items-center gap-2 shadow-sm">
              {t('bank_official_site')} <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {allBankLoans.length === 0 ? (
          <div className="bg-white border border-amber-200 rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <ShieldQuestion className="w-14 h-14 text-amber-400 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">{t('empty_no_products_title')}</h2>
            <p className="text-slate-600 mb-5">{t('empty_no_products_body')}</p>
            {bank.notes && <p className="text-xs text-slate-500 italic mb-5">{bank.notes}</p>}
            <a href={bank.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all">
              {t('bank_official_site')} <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <>
            {availableCats.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
                <button onClick={() => setActiveCat('all')}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCat === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'}`}>
                  {t('cat_all')}
                </button>
                {availableCats.map(cat => {
                  const Icon = cat.icon;
                  const label = lang === 'mn' ? cat.labelMn : cat.labelEn;
                  return (
                    <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeCat === cat.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'}`}>
                      <Icon className="w-4 h-4" aria-hidden="true" /> {label}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loans.map(loan => (
                <LoanCard key={loan.id} loan={loan}
                  isCompared={compareList.includes(loan.id)}
                  onCompare={onCompare} t={t} lang={lang} />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6 text-center">{t('bank_audit_note')}</p>
          </>
        )}
      </section>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// COMPARE PAGE
// ════════════════════════════════════════════════════════════
const ComparePage = ({ compareList, onCompare, onClearCompare, onNavigate, t, lang }) => {
  const [scenario, setScenario] = useState({ amount: 20000000, months: 36 });
  const loans = compareList.map(getLoan).filter(Boolean);

  // Use rate floor for calculation
  const enriched = loans.map(loan => {
    const rate = loan.rateMin ?? 0;
    const M = calcMonthlyPayment(scenario.amount, rate, scenario.months);
    return { ...loan, calcRate: rate, monthly: M, total: M * scenario.months };
  });

  if (loans.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
          <Scale className="w-10 h-10 text-blue-600" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('cmp_empty_title')}</h1>
        <p className="text-slate-600 mb-7">{t('cmp_empty_sub')}</p>
        <button onClick={() => onNavigate({ view: 'home' })}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all inline-flex items-center gap-2">
          {t('cmp_browse')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{t('cmp_title')}</h1>
          <p className="text-slate-600 mt-1">{loans.length} {t('cmp_loan')}</p>
        </div>
        <button onClick={onClearCompare} className="text-sm text-slate-600 hover:text-red-600 transition-colors flex items-center gap-1">
          <X className="w-4 h-4" aria-hidden="true" /> {t('cmp_clear')}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-blue-600" aria-hidden="true" />
          <h3 className="font-semibold text-slate-800">{t('cmp_scenario')}</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">{t('cmp_amount')}</label>
              <span className="text-sm font-bold text-slate-900">{fmtMNTFull(scenario.amount)}</span>
            </div>
            <input type="range" min="500000" max="500000000" step="500000" value={scenario.amount}
              onChange={e => setScenario({ ...scenario, amount: +e.target.value })}
              className="w-full accent-blue-600" aria-label={t('cmp_amount')} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">{t('cmp_term')}</label>
              <span className="text-sm font-bold text-slate-900">{fmtTerm(scenario.months, lang)}</span>
            </div>
            <input type="range" min="3" max="360" step="3" value={scenario.months}
              onChange={e => setScenario({ ...scenario, months: +e.target.value })}
              className="w-full accent-blue-600" aria-label={t('cmp_term')} />
          </div>
        </div>
      </div>

      <div className="mb-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
        <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
        <span>{t('cmp_calc_note')}</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wide w-40 sticky left-0 z-10" scope="col">{t('cmp_feature')}</th>
                {enriched.map(loan => {
                  const bank = getBank(loan.bankId);
                  const name = lang === 'mn' && loan.nameMn ? loan.nameMn : loan.nameEn;
                  return (
                    <th key={loan.id} scope="col" className="p-4 bg-slate-50 min-w-[200px] text-left align-top">
                      <div className="flex items-start gap-2.5 mb-2">
                        <BankLogo bank={bank} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate">{lang === 'mn' ? bank.name : bank.nameEn}</div>
                          <div className="text-xs text-slate-500 truncate">{name}</div>
                        </div>
                        <button onClick={() => onCompare(loan.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Remove">
                          <X className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <CategoryBadge categoryId={loan.category} lang={lang} />
                        {loan.verified && <VerifiedBadge t={t} />}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-slate-100">
                <th scope="row" className="p-4 font-medium text-slate-700 bg-white sticky left-0 text-left">{t('cmp_rate')}</th>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4">
                    <span className="text-lg font-bold text-slate-900">{fmtRate(loan.rateMin, loan.rateMax)}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <th scope="row" className="p-4 font-medium text-slate-700 bg-white sticky left-0 text-left">{t('cmp_monthly')}</th>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4">
                    <div className="font-semibold text-slate-900">{fmtMNTFull(loan.monthly)}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">@ {loan.calcRate}%</div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <th scope="row" className="p-4 font-medium text-slate-700 bg-white sticky left-0 text-left">{t('cmp_total')}</th>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4">
                    <div className="font-semibold text-slate-900">{fmtMNTFull(loan.total)}</div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <th scope="row" className="p-4 font-medium text-slate-700 bg-white sticky left-0 text-left">{t('cmp_range')}</th>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4 text-slate-700">{fmtRange(loan.minAmount, loan.maxAmount, fmtMNT)}</td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <th scope="row" className="p-4 font-medium text-slate-700 bg-white sticky left-0 text-left">{t('cmp_max_term')}</th>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4">{fmtTermRange(loan.minTermMonths, loan.maxTermMonths, lang)}</td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <th scope="row" className="p-4 font-medium text-slate-700 bg-white sticky left-0 text-left">{t('cmp_source')}</th>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4">
                    <a href={loan.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      {loan.lastVerified} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// CALCULATOR PAGE
// ════════════════════════════════════════════════════════════
const CalculatorPage = ({ t, lang }) => {
  const [amount, setAmount] = useState(20000000);
  const [rate, setRate] = useState(15.6);
  const [termValue, setTermValue] = useState(3);
  const [termUnit, setTermUnit] = useState('years');
  const [comp, setComp] = useState('monthly');

  const months = termUnit === 'years' ? termValue * 12 : termValue;
  const M = calcMonthlyPayment(amount, rate, months, comp);
  const total = M * months;
  const interest = Math.max(0, total - amount);
  const data = useMemo(() => generateAmortData(amount, rate, months, comp), [amount, rate, months, comp]);

  const safeSetAmount = (v) => setAmount(Math.min(Math.max(0, parseFloat(v) || 0), 10000000000));
  const safeSetRate = (v) => setRate(Math.min(Math.max(0, parseFloat(v) || 0), 50));
  const safeSetTerm = (v) => {
    const n = parseInt(v, 10) || 1;
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
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
          <h3 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" aria-hidden="true" /> {t('calc_inputs')}
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{t('calc_amount')}</label>
                <span className="text-sm font-bold text-slate-900">{fmtMNTFull(amount)}</span>
              </div>
              <input type="range" min="100000" max="500000000" step="100000" value={amount}
                onChange={e => safeSetAmount(e.target.value)} className="w-full accent-blue-600 mb-2" aria-label={t('calc_amount')} />
              <input type="number" min="0" value={amount} onChange={e => safeSetAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t('calc_rate')}</label>
              <input type="number" step="0.1" min="0" max="50" value={rate}
                onChange={e => safeSetRate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2" />
              <input type="range" min="0" max="30" step="0.1" value={Math.min(rate, 30)}
                onChange={e => safeSetRate(e.target.value)} className="w-full accent-blue-600" aria-label={t('calc_rate')} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{t('calc_period')}</label>
                <div className="flex bg-slate-100 rounded-lg p-0.5" role="group">
                  {[['months', t('calc_months')], ['years', t('calc_years')]].map(([u, lbl]) => (
                    <button key={u}
                      onClick={() => {
                        if (u === termUnit) return;
                        setTermValue(u === 'years' ? Math.max(1, Math.round(termValue / 12)) : termValue * 12);
                        setTermUnit(u);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${termUnit === u ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                      aria-pressed={termUnit === u}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
              <input type="number" min="1" value={termValue} onChange={e => safeSetTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="range" min="1" max={termUnit === 'years' ? 30 : 360} step="1" value={termValue}
                onChange={e => safeSetTerm(e.target.value)} className="w-full accent-blue-600 mt-2" aria-label={t('calc_period')} />
              <div className="text-xs text-slate-500 mt-1">= {months} {t('calc_eq_months')}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">{t('calc_compounding')}</label>
              <div className="flex bg-slate-100 rounded-xl p-1 gap-1" role="group">
                {[['monthly', t('calc_monthly_comp')], ['yearly', t('calc_yearly_comp')]].map(([c, lbl]) => (
                  <button key={c} onClick={() => setComp(c)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${comp === c ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                    aria-pressed={comp === c}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-sm">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-1">{t('calc_monthly_pmt')}</div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">{fmtMNTFull(M)}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">{t('calc_total_int')}</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{fmtMNTFull(interest)}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">{t('calc_total_rep')}</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{fmtMNTFull(total)}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-semibold text-slate-800">{t('calc_chart_title')}</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" aria-hidden="true" /> {t('calc_principal')}</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400" aria-hidden="true" /> {t('calc_interest')}</span>
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
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} formatter={v => fmtMNTFull(v)} />
                  <Area type="monotone" dataKey="Principal" stackId="1" stroke="#3B82F6" strokeWidth={2} fill="url(#gP)" name={t('calc_principal')} />
                  <Area type="monotone" dataKey="Interest" stackId="1" stroke="#F59E0B" strokeWidth={2} fill="url(#gI)" name={t('calc_interest')} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" aria-hidden="true" />
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

// ════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════
const Footer = ({ t, lang }) => (
  <footer className="bg-slate-900 text-slate-300 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid sm:grid-cols-4 gap-8">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Banknote className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <div className="font-bold text-white">ZeelHub</div>
              <div className="text-[10px] text-slate-400">{t('footer_tagline')}</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-3">{t('footer_desc')}</p>
          <div className="text-xs text-slate-500">
            <strong className="text-slate-400">{t('footer_methodology_title')}:</strong> {t('footer_methodology_text')}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">{t('footer_banks')}</div>
          <ul className="space-y-1 text-sm">
            {BANKS.map(b => <li key={b.id}>{lang === 'mn' ? b.name : b.nameEn}</li>)}
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
        <span>{t('footer_audit')}: {AUDIT_DATE}</span>
      </div>
    </div>
  </footer>
);

// ════════════════════════════════════════════════════════════
// COMPARE BASKET
// ════════════════════════════════════════════════════════════
const CompareBasket = ({ compareList, onNavigate, onClear, t }) => {
  if (compareList.length === 0) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 w-full max-w-md sm:max-w-fit" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 px-4 py-3 border border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">{compareList.length} {t('basket_selected')}</div>
        </div>
        <button onClick={() => onNavigate({ view: 'compare' })}
          className="ml-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-all flex items-center gap-1.5">
          {t('basket_btn')} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        <button onClick={onClear} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all" aria-label="Clear">
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════
export default function App() {
  const [route, setRoute] = useState({ view: 'home' });
  const [compareList, setCompare] = useState([]);
  const [lang, setLang] = useState('mn');
  const t = useMemo(() => createT(lang), [lang]);

  const navigate = (r) => {
    setRoute(r);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompare = (loanId) => {
    setCompare(prev => prev.includes(loanId) ? prev.filter(id => id !== loanId) : (prev.length >= 4 ? prev : [...prev, loanId]));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <DisclaimerBanner t={t} />
      <Nav currentView={route.view} onNavigate={navigate} lang={lang} setLang={setLang} t={t} />
      <main>
        {route.view === 'home' && <HomePage onNavigate={navigate} compareList={compareList} onCompare={toggleCompare} t={t} lang={lang} />}
        {route.view === 'bank' && <BankPage bankId={route.bankId} onNavigate={navigate} compareList={compareList} onCompare={toggleCompare} t={t} lang={lang} />}
        {route.view === 'compare' && <ComparePage compareList={compareList} onCompare={toggleCompare} onClearCompare={() => setCompare([])} onNavigate={navigate} t={t} lang={lang} />}
        {route.view === 'calculator' && <CalculatorPage t={t} lang={lang} />}
      </main>
      <Footer t={t} lang={lang} />
      {route.view !== 'compare' && <CompareBasket compareList={compareList} onNavigate={navigate} onClear={() => setCompare([])} t={t} />}
    </div>
  );
}
