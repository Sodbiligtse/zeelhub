import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search, Calculator, Scale, Building2, Home, GraduationCap,
  Briefcase, Car, Wallet, Users, TrendingUp, ChevronRight,
  Check, X, ArrowRight, ArrowLeft, Award, Clock, ExternalLink,
  Filter, Menu, Plus, Minus, Banknote, Sparkles, ChevronDown,
  ChevronUp, Info, ShieldCheck, Zap, Target
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar
} from 'recharts';

// ============ DATA ============
const BANKS = [
  {
    id: 'khan-bank',
    name: 'Khan Bank',
    nameLocal: 'Хаан Банк',
    tagline: "Mongolia's largest commercial bank",
    monogram: 'KB',
    brandColor: '#0E6E3E',
    brandLight: '#E6F2EC',
    url: 'https://www.khanbank.com/personal/product/detail/8/',
    established: 1991,
    branches: '500+',
  },
  {
    id: 'golomt-bank',
    name: 'Golomt Bank',
    nameLocal: 'Голомт Банк',
    tagline: 'Innovative digital banking',
    monogram: 'G',
    brandColor: '#C8102E',
    brandLight: '#FBEAEC',
    url: 'https://www.golomtbank.com/retail/loans',
    established: 1995,
    branches: '154',
  },
  {
    id: 'tdb',
    name: 'Trade & Development Bank',
    nameLocal: 'Худалдаа Хөгжлийн Банк',
    tagline: "Mongolia's oldest commercial bank",
    monogram: 'TDB',
    brandColor: '#003D7A',
    brandLight: '#E6EEF7',
    url: 'https://www.tdbm.mn/mn/calculator',
    established: 1990,
    branches: '70+',
  },
  {
    id: 'state-bank',
    name: 'State Bank',
    nameLocal: 'Төрийн Банк',
    tagline: 'Trusted nationwide coverage',
    monogram: 'SB',
    brandColor: '#B91C1C',
    brandLight: '#FBEBEB',
    url: 'https://www.statebank.mn/personal/products/6',
    established: 2009,
    branches: '500+',
  },
];

const CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: Wallet, color: 'bg-blue-100 text-blue-700' },
  { id: 'pension', label: 'Pension', icon: Users, color: 'bg-purple-100 text-purple-700' },
  { id: 'mortgage', label: 'Mortgage', icon: Home, color: 'bg-amber-100 text-amber-700' },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'student', label: 'Student', icon: GraduationCap, color: 'bg-pink-100 text-pink-700' },
  { id: 'car', label: 'Car', icon: Car, color: 'bg-cyan-100 text-cyan-700' },
];

const LOANS = [
  // Khan Bank
  { id: 'khan-salary', bankId: 'khan-bank', name: 'Salary Loan', category: 'salary', annualRate: 21.6, minAmount: 500000, maxAmount: 30000000, minTermMonths: 3, maxTermMonths: 36, eligibility: ['Stable employment 6+ months', 'Salary via Khan Bank', 'Age 21–60', 'No bad credit history'] },
  { id: 'khan-pension', bankId: 'khan-bank', name: 'Pension Loan', category: 'pension', annualRate: 15.6, minAmount: 300000, maxAmount: 15000000, minTermMonths: 3, maxTermMonths: 48, eligibility: ['Pension received via Khan Bank', 'Age up to 70', 'Mongolian citizen'] },
  { id: 'khan-mortgage', bankId: 'khan-bank', name: 'Standard Mortgage', category: 'mortgage', annualRate: 14.4, minAmount: 20000000, maxAmount: 500000000, minTermMonths: 36, maxTermMonths: 360, eligibility: ['Stable income 12+ months', '30% down payment', 'Age 21–65 at maturity', 'Property as collateral'] },
  { id: 'khan-mortgage-8', bankId: 'khan-bank', name: '8% Housing Program', category: 'mortgage', annualRate: 8.0, minAmount: 30000000, maxAmount: 200000000, minTermMonths: 60, maxTermMonths: 360, eligibility: ['First-time buyer', 'Government 8% program qualified', 'Property up to 80m²', 'Income verification'] },
  { id: 'khan-business', bankId: 'khan-bank', name: 'SME Working Capital', category: 'business', annualRate: 19.2, minAmount: 5000000, maxAmount: 500000000, minTermMonths: 6, maxTermMonths: 60, eligibility: ['Registered business 12+ months', 'Audited financials', 'Collateral required', 'Cash flow analysis'] },
  { id: 'khan-student', bankId: 'khan-bank', name: 'Education Loan', category: 'student', annualRate: 11.4, minAmount: 1500000, maxAmount: 50000000, minTermMonths: 24, maxTermMonths: 96, eligibility: ['University admission letter', 'Co-signer required', 'Tuition invoice', 'Academic record'] },
  { id: 'khan-car', bankId: 'khan-bank', name: 'Auto Loan', category: 'car', annualRate: 18.0, minAmount: 3000000, maxAmount: 150000000, minTermMonths: 12, maxTermMonths: 60, eligibility: ['30% down payment', 'Vehicle as collateral', 'Comprehensive insurance', 'Age 21–65'] },

  // Golomt
  { id: 'golomt-salary', bankId: 'golomt-bank', name: 'Express Salary Loan', category: 'salary', annualRate: 22.8, minAmount: 500000, maxAmount: 25000000, minTermMonths: 3, maxTermMonths: 30, eligibility: ['Salary via Golomt 3+ months', 'Age 21–60', 'Stable employment'] },
  { id: 'golomt-pension', bankId: 'golomt-bank', name: 'Retiree Loan', category: 'pension', annualRate: 16.8, minAmount: 300000, maxAmount: 12000000, minTermMonths: 3, maxTermMonths: 36, eligibility: ['Pension via Golomt', 'Age up to 68', 'Co-signer optional'] },
  { id: 'golomt-mortgage', bankId: 'golomt-bank', name: 'Home Loan Premium', category: 'mortgage', annualRate: 13.8, minAmount: 25000000, maxAmount: 600000000, minTermMonths: 60, maxTermMonths: 300, eligibility: ['25% down payment', 'Income verification', 'Property valuation', 'Age 21–65'] },
  { id: 'golomt-business', bankId: 'golomt-bank', name: 'Business Growth Loan', category: 'business', annualRate: 18.0, minAmount: 10000000, maxAmount: 1000000000, minTermMonths: 12, maxTermMonths: 84, eligibility: ['Business 2+ years', 'Financial statements', 'Collateral 120%', 'Sector analysis'] },
  { id: 'golomt-student', bankId: 'golomt-bank', name: 'Student Education Loan', category: 'student', annualRate: 9.6, minAmount: 1000000, maxAmount: 40000000, minTermMonths: 12, maxTermMonths: 96, eligibility: ['University admission', 'Parent/guardian co-signer', 'Tuition invoice', 'Academic record'] },
  { id: 'golomt-car', bankId: 'golomt-bank', name: 'Auto Express', category: 'car', annualRate: 17.4, minAmount: 5000000, maxAmount: 120000000, minTermMonths: 12, maxTermMonths: 60, eligibility: ['25% down payment', 'Vehicle insurance', 'License 2+ years'] },

  // TDB
  { id: 'tdb-salary', bankId: 'tdb', name: 'Consumer Loan', category: 'salary', annualRate: 20.4, minAmount: 1000000, maxAmount: 40000000, minTermMonths: 6, maxTermMonths: 36, eligibility: ['Salary via TDB 6+ months', 'Age 21–60', 'No outstanding bad loans'] },
  { id: 'tdb-pension', bankId: 'tdb', name: 'Senior Citizen Loan', category: 'pension', annualRate: 14.4, minAmount: 500000, maxAmount: 20000000, minTermMonths: 6, maxTermMonths: 48, eligibility: ['Pension via TDB', 'Age up to 70', 'No collateral required'] },
  { id: 'tdb-mortgage', bankId: 'tdb', name: 'Premium Mortgage', category: 'mortgage', annualRate: 13.2, minAmount: 30000000, maxAmount: 800000000, minTermMonths: 60, maxTermMonths: 360, eligibility: ['30% down payment', 'Income 3× monthly payment', 'Property in UB or aimag center', 'Age 21–65'] },
  { id: 'tdb-business', bankId: 'tdb', name: 'Corporate Loan', category: 'business', annualRate: 17.4, minAmount: 20000000, maxAmount: 5000000000, minTermMonths: 12, maxTermMonths: 120, eligibility: ['Business 3+ years', 'Audited statements 2 years', 'Collateral required', 'Bank account history'] },
  { id: 'tdb-student', bankId: 'tdb', name: 'Education Finance', category: 'student', annualRate: 10.8, minAmount: 2000000, maxAmount: 60000000, minTermMonths: 24, maxTermMonths: 120, eligibility: ['Accredited institution', 'Guarantor required', 'Academic transcripts', 'Disbursement to school'] },
  { id: 'tdb-car', bankId: 'tdb', name: 'Vehicle Loan', category: 'car', annualRate: 16.8, minAmount: 5000000, maxAmount: 200000000, minTermMonths: 12, maxTermMonths: 72, eligibility: ['20% down payment', 'CASCO insurance', 'Vehicle age under 5 years'] },

  // State Bank
  { id: 'state-salary', bankId: 'state-bank', name: 'Salary-Backed Loan', category: 'salary', annualRate: 19.2, minAmount: 500000, maxAmount: 20000000, minTermMonths: 3, maxTermMonths: 36, eligibility: ['Government employees prioritized', 'Salary via State Bank', 'Age 21–60'] },
  { id: 'state-pension', bankId: 'state-bank', name: 'Pensioner Support Loan', category: 'pension', annualRate: 13.2, minAmount: 300000, maxAmount: 10000000, minTermMonths: 3, maxTermMonths: 48, eligibility: ['Pension via State Bank', 'Age up to 72', 'No collateral needed'] },
  { id: 'state-mortgage-8', bankId: 'state-bank', name: '8% Government Mortgage', category: 'mortgage', annualRate: 8.0, minAmount: 20000000, maxAmount: 200000000, minTermMonths: 60, maxTermMonths: 360, eligibility: ['First-time homebuyer', 'Government 8% qualified', 'Property up to 80m²', 'Mongolian citizen'] },
  { id: 'state-mortgage', bankId: 'state-bank', name: 'Standard Housing Loan', category: 'mortgage', annualRate: 15.0, minAmount: 15000000, maxAmount: 400000000, minTermMonths: 36, maxTermMonths: 300, eligibility: ['30% down payment', 'Income verification', 'Age 21–65 at maturity'] },
  { id: 'state-business', bankId: 'state-bank', name: 'Herder & Agriculture Loan', category: 'business', annualRate: 12.0, minAmount: 3000000, maxAmount: 100000000, minTermMonths: 6, maxTermMonths: 60, eligibility: ['Herder/farmer registration', 'Livestock or land collateral', 'Cooperative membership +'] },
  { id: 'state-student', bankId: 'state-bank', name: 'Student Loan Program', category: 'student', annualRate: 3.0, minAmount: 1000000, maxAmount: 30000000, minTermMonths: 24, maxTermMonths: 120, eligibility: ['Government student program', 'Approved by Ministry of Education', 'Domestic or foreign university', 'Academic standing required'] },
  { id: 'state-car', bankId: 'state-bank', name: 'Auto Financing', category: 'car', annualRate: 16.8, minAmount: 4000000, maxAmount: 80000000, minTermMonths: 12, maxTermMonths: 48, eligibility: ['25% down payment', 'Vehicle as collateral', 'Insurance required'] },
];

// ============ HELPERS ============
const monthlyPayment = (P, annualRate, n) => {
  if (n <= 0 || P <= 0) return 0;
  if (annualRate === 0) return P / n;
  const r = annualRate / 100 / 12;
  return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

const totalRepayment = (P, r, n) => monthlyPayment(P, r, n) * n;

const fmtMNT = (amount) => {
  if (amount >= 1e9) return `₮${(amount / 1e9).toFixed(1)}B`;
  if (amount >= 1e6) return `₮${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `₮${(amount / 1e3).toFixed(0)}K`;
  return `₮${Math.round(amount).toLocaleString()}`;
};

const fmtMNTFull = (amount) => `₮${Math.round(amount).toLocaleString()}`;

const fmtTerm = (months) => {
  if (months >= 12 && months % 12 === 0) return `${months / 12} yr`;
  if (months >= 12) return `${(months / 12).toFixed(1)} yr`;
  return `${months} mo`;
};

const getBank = (id) => BANKS.find(b => b.id === id);
const getLoan = (id) => LOANS.find(l => l.id === id);
const getCategory = (id) => CATEGORIES.find(c => c.id === id);

const generateAmortData = (P, annualRate, months) => {
  if (P <= 0 || months <= 0) return [];
  const r = annualRate / 100 / 12;
  const M = monthlyPayment(P, annualRate, months);
  const data = [];
  let balance = P;
  let cumP = 0, cumI = 0;
  const groupBy = months > 60 ? 12 : months > 24 ? 6 : months > 12 ? 3 : 1;
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPaid = M - interest;
    balance -= principalPaid;
    cumP += principalPaid;
    cumI += interest;
    if (m % groupBy === 0 || m === months) {
      data.push({
        period: groupBy >= 12 ? `Yr ${Math.ceil(m / 12)}` : `Mo ${m}`,
        Principal: Math.round(cumP),
        Interest: Math.round(cumI),
        Balance: Math.max(0, Math.round(balance)),
      });
    }
  }
  return data;
};

// ============ ATOMS ============
const BankLogo = ({ bank, size = 'md' }) => {
  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
  };
  return (
    <div
      className={`${sizes[size]} rounded-xl flex items-center justify-center font-bold text-white shadow-sm shrink-0`}
      style={{ backgroundColor: bank.brandColor }}
    >
      {bank.monogram}
    </div>
  );
};

const CategoryBadge = ({ categoryId, size = 'sm' }) => {
  const cat = getCategory(categoryId);
  if (!cat) return null;
  const Icon = cat.icon;
  const sizing = size === 'sm' ? 'px-2.5 py-1 text-xs gap-1' : 'px-3 py-1.5 text-sm gap-1.5';
  return (
    <span className={`inline-flex items-center ${sizing} rounded-full font-medium ${cat.color}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {cat.label}
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

// ============ LOAN CARD ============
const LoanCard = ({ loan, onCompare, isCompared, onView }) => {
  const bank = getBank(loan.bankId);
  const [showElig, setShowElig] = useState(false);
  const sampleAmount = Math.min(10000000, loan.maxAmount);
  const sampleTerm = Math.min(24, loan.maxTermMonths);
  const sampleMonthly = monthlyPayment(sampleAmount, loan.annualRate, sampleTerm);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <BankLogo bank={bank} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-slate-800 truncate">{loan.name}</h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">{bank.name}</span>
              <CategoryBadge categoryId={loan.category} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Annual rate</div>
            <div className="text-xl font-bold text-blue-600">{loan.annualRate}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Loan range</div>
            <div className="text-sm font-semibold text-slate-800">
              {fmtMNT(loan.minAmount)} – {fmtMNT(loan.maxAmount)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Term</div>
            <div className="text-sm font-semibold text-slate-800">
              {fmtTerm(loan.minTermMonths)} – {fmtTerm(loan.maxTermMonths)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">
              Est. monthly <span className="text-slate-400">({fmtMNT(sampleAmount)}/{fmtTerm(sampleTerm)})</span>
            </div>
            <div className="text-sm font-semibold text-slate-800">{fmtMNT(sampleMonthly)}</div>
          </div>
        </div>

        <button
          onClick={() => setShowElig(!showElig)}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 mb-3 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          Eligibility
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
              isCompared
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isCompared ? (<><Check className="w-4 h-4" />Added</>) : (<><Plus className="w-4 h-4" />Compare</>)}
          </button>
          <a
            href={bank.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            Visit Bank <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ============ NAV ============
const Nav = ({ currentView, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'banks', label: 'Banks' },
    { id: 'compare', label: 'Compare', icon: Scale },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
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
              <div className="text-[10px] text-slate-500 leading-tight">Mongolia loan compare</div>
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
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setOpen(!open)}
          >
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
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

// ============ FLOATING CALCULATOR (Home hero) ============
const MiniCalc = ({ onOpenFull }) => {
  const [amount, setAmount] = useState(10000000);
  const [rate, setRate] = useState(15);
  const [years, setYears] = useState(2);
  const months = years * 12;
  const M = monthlyPayment(amount, rate, months);
  const total = M * months;
  const interest = total - amount;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-800">Quick Calculator</div>
            <div className="text-xs text-slate-500">Live amortization</div>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">Live</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-600">Amount</label>
            <span className="text-xs font-semibold text-slate-800">{fmtMNTFull(amount)}</span>
          </div>
          <input
            type="range" min="500000" max="200000000" step="500000"
            value={amount}
            onChange={e => setAmount(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600">Rate (%)</label>
            <input
              type="number" step="0.1" min="0" max="50"
              value={rate}
              onChange={e => setRate(+e.target.value || 0)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600">Years</label>
            <input
              type="number" min="1" max="30"
              value={years}
              onChange={e => setYears(Math.max(1, +e.target.value || 1))}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-slate-600">Monthly payment</span>
          <span className="text-2xl font-bold text-blue-600">{fmtMNTFull(M)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Total interest</span>
          <span className="font-semibold text-slate-800">{fmtMNTFull(interest)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Total repayment</span>
          <span className="font-semibold text-slate-800">{fmtMNTFull(total)}</span>
        </div>
      </div>

      <button
        onClick={onOpenFull}
        className="mt-5 w-full px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
      >
        Open full calculator <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// ============ HOME ============
const HomePage = ({ onNavigate, compareList, onCompare }) => {
  const [activeCat, setActiveCat] = useState('all');

  const filteredLoans = useMemo(() => {
    if (activeCat === 'all') return LOANS;
    return LOANS.filter(l => l.category === activeCat);
  }, [activeCat]);

  // Featured: best rate per bank for active category (or mortgage default)
  const featured = useMemo(() => {
    const catFilter = activeCat === 'all' ? 'mortgage' : activeCat;
    return BANKS.map(bank => {
      const bankLoans = LOANS.filter(l => l.bankId === bank.id && l.category === catFilter);
      if (bankLoans.length === 0) return null;
      return bankLoans.reduce((best, l) => l.annualRate < best.annualRate ? l : best);
    }).filter(Boolean);
  }, [activeCat]);

  const bestRate = featured.length ? Math.min(...featured.map(l => l.annualRate)) : null;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 25% 30%, #2563EB22 0%, transparent 50%), radial-gradient(circle at 75% 70%, #16A34A22 0%, transparent 50%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-700 shadow-sm mb-5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                4 banks · {LOANS.length} loan products · Real-time math
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight">
                Compare Mongolia's <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">best loan rates</span>
                <br className="hidden sm:block" />
                <span className="text-slate-700">in one place.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Khan Bank, Golomt, TDB, and State Bank — side by side. Filter by loan type, calculate monthly payments instantly, and find the rate that saves you the most.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate({ view: 'compare' })}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  Compare Loans Now <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate({ view: 'calculator' })}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" /> Open calculator
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-800">4</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">Major banks</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-800">{LOANS.length}+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">Loan products</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">{bestRate ? `${bestRate}%` : '—'}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">Best rate today</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <MiniCalc onOpenFull={() => onNavigate({ view: 'calculator' })} />
            </div>
          </div>
        </div>
      </section>

      {/* BANKS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Browse by bank</h2>
            <p className="text-slate-600 mt-1">Tap any bank to see all their loan products.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BANKS.map(bank => {
            const count = LOANS.filter(l => l.bankId === bank.id).length;
            const minRate = Math.min(...LOANS.filter(l => l.bankId === bank.id).map(l => l.annualRate));
            return (
              <button
                key={bank.id}
                onClick={() => onNavigate({ view: 'bank', bankId: bank.id })}
                className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <BankLogo bank={bank} size="md" />
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-0.5">{bank.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{bank.nameLocal}</p>
                <p className="text-sm text-slate-600 mb-4 leading-snug">{bank.tagline}</p>
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">From</div>
                    <div className="text-sm font-bold text-blue-600">{minRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">Products</div>
                    <div className="text-sm font-bold text-slate-800">{count}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">Branches</div>
                    <div className="text-sm font-bold text-slate-800">{bank.branches}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CATEGORY FILTER + PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Browse by loan type</h2>
            <p className="text-slate-600 mt-1">Filter products across all banks.</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-6">
          <button
            onClick={() => setActiveCat('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCat === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            All loans
          </button>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeCat === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" /> {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured comparison preview table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-slate-800">Best {activeCat === 'all' ? 'Mortgage' : getCategory(activeCat)?.label} rates per bank</h3>
            </div>
            <button
              onClick={() => onNavigate({ view: 'compare' })}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Build a full comparison <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Bank</th>
                  <th className="text-left px-5 py-3 font-medium">Product</th>
                  <th className="text-right px-5 py-3 font-medium">Rate</th>
                  <th className="text-right px-5 py-3 font-medium hidden sm:table-cell">Max amount</th>
                  <th className="text-right px-5 py-3 font-medium hidden md:table-cell">Max term</th>
                  <th className="text-right px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {featured.length === 0 ? (
                  <tr><td colSpan="6" className="px-5 py-8 text-center text-slate-500">No {getCategory(activeCat)?.label.toLowerCase()} products available.</td></tr>
                ) : featured.sort((a, b) => a.annualRate - b.annualRate).map(loan => {
                  const bank = getBank(loan.bankId);
                  const isBest = loan.annualRate === Math.min(...featured.map(l => l.annualRate));
                  return (
                    <tr key={loan.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <BankLogo bank={bank} size="xs" />
                          <div>
                            <div className="font-medium text-slate-800">{bank.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{loan.name}</td>
                      <td className="px-5 py-4 text-right">
                        <span className={`font-bold ${isBest ? 'text-green-600' : 'text-slate-800'}`}>
                          {loan.annualRate}%
                        </span>
                        {isBest && <span className="ml-2 inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-semibold">BEST</span>}
                      </td>
                      <td className="px-5 py-4 text-right text-slate-700 hidden sm:table-cell">{fmtMNT(loan.maxAmount)}</td>
                      <td className="px-5 py-4 text-right text-slate-700 hidden md:table-cell">{fmtTerm(loan.maxTermMonths)}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => onCompare(loan.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                            compareList.includes(loan.id)
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {compareList.includes(loan.id) ? 'Added' : 'Add'}
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
              { icon: ShieldCheck, title: 'Trusted data', body: 'Loan products sourced directly from each bank\'s public offerings.' },
              { icon: Zap, title: 'Instant calculations', body: 'Standard amortization math runs live as you type. No submit button.' },
              { icon: Target, title: 'Find your best fit', body: 'Filter by category, compare 2–4 loans side by side, see who saves you most.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============ BANK DETAIL ============
const BankPage = ({ bankId, onNavigate, compareList, onCompare }) => {
  const bank = getBank(bankId);
  const [activeCat, setActiveCat] = useState('all');
  const loans = useMemo(() => {
    return LOANS.filter(l => l.bankId === bankId && (activeCat === 'all' || l.category === activeCat));
  }, [bankId, activeCat]);
  const minRate = Math.min(...LOANS.filter(l => l.bankId === bankId).map(l => l.annualRate));
  const availableCats = useMemo(() => {
    const set = new Set(LOANS.filter(l => l.bankId === bankId).map(l => l.category));
    return CATEGORIES.filter(c => set.has(c.id));
  }, [bankId]);

  if (!bank) return null;

  return (
    <div>
      {/* Header banner */}
      <section className="relative overflow-hidden" style={{ backgroundColor: bank.brandLight }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <button
            onClick={() => onNavigate({ view: 'home' })}
            className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All banks
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <BankLogo bank={bank} size="lg" />
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{bank.name}</h1>
              <p className="text-slate-600 mt-1">{bank.nameLocal} · {bank.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-6">
                <Stat label="From rate" value={`${minRate}%`} sub="lowest available" />
                <Stat label="Products" value={LOANS.filter(l => l.bankId === bankId).length} />
                <Stat label="Established" value={bank.established} />
                <Stat label="Branches" value={bank.branches} />
              </div>
            </div>
            <a
              href={bank.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:shadow text-slate-800 font-medium transition-all flex items-center gap-2 shadow-sm"
            >
              Official site <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
          <button
            onClick={() => setActiveCat('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCat === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            All
          </button>
          {availableCats.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeCat === cat.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" /> {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loans.map(loan => (
            <LoanCard
              key={loan.id}
              loan={loan}
              isCompared={compareList.includes(loan.id)}
              onCompare={onCompare}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

// ============ COMPARE ============
const ComparePage = ({ compareList, onCompare, onClearCompare, onNavigate }) => {
  const [scenario, setScenario] = useState({ amount: 20000000, months: 36 });
  const loans = compareList.map(getLoan).filter(Boolean);

  // Compute per-loan derived values
  const enriched = loans.map(loan => {
    const M = monthlyPayment(scenario.amount, loan.annualRate, scenario.months);
    return { ...loan, monthly: M, total: M * scenario.months };
  });

  const bestRate = enriched.length ? Math.min(...enriched.map(l => l.annualRate)) : null;
  const bestMonthly = enriched.length ? Math.min(...enriched.map(l => l.monthly)) : null;
  const longestTerm = enriched.length ? Math.max(...enriched.map(l => l.maxTermMonths)) : null;

  // Eligibility collapsible state
  const [showElig, setShowElig] = useState(false);

  if (loans.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
          <Scale className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Build a comparison</h1>
        <p className="text-slate-600 mb-7">Browse any bank's products and tap "Compare" on the loans you want to weigh side-by-side. You can compare 2–4 loans at a time.</p>
        <button
          onClick={() => onNavigate({ view: 'home' })}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all inline-flex items-center gap-2"
        >
          Browse loans <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Side-by-side comparison</h1>
          <p className="text-slate-600 mt-1">{loans.length} loan{loans.length === 1 ? '' : 's'} · Adjust the scenario below to recalculate.</p>
        </div>
        <button
          onClick={onClearCompare}
          className="text-sm text-slate-600 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <X className="w-4 h-4" /> Clear all
        </button>
      </div>

      {/* Scenario controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-slate-800">Comparison scenario</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Loan amount</label>
              <span className="text-sm font-bold text-slate-900">{fmtMNTFull(scenario.amount)}</span>
            </div>
            <input
              type="range" min="500000" max="500000000" step="500000"
              value={scenario.amount}
              onChange={e => setScenario({ ...scenario, amount: +e.target.value })}
              className="w-full accent-blue-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Term</label>
              <span className="text-sm font-bold text-slate-900">{fmtTerm(scenario.months)}</span>
            </div>
            <input
              type="range" min="3" max="360" step="3"
              value={scenario.months}
              onChange={e => setScenario({ ...scenario, months: +e.target.value })}
              className="w-full accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Comparison cards/table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wide w-44 sticky left-0 z-10">Feature</th>
                {enriched.map(loan => {
                  const bank = getBank(loan.bankId);
                  return (
                    <th key={loan.id} className="p-4 bg-slate-50 min-w-[220px] text-left align-top">
                      <div className="flex items-start gap-2.5 mb-2">
                        <BankLogo bank={bank} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate">{bank.name}</div>
                          <div className="text-xs text-slate-500 truncate">{loan.name}</div>
                        </div>
                        <button
                          onClick={() => onCompare(loan.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <CategoryBadge categoryId={loan.category} />
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">Interest rate</td>
                {enriched.map(loan => {
                  const isBest = loan.annualRate === bestRate;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{loan.annualRate}%</span>
                        {isBest && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold flex items-center gap-1"><Award className="w-3 h-3" />BEST</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">Monthly payment</td>
                {enriched.map(loan => {
                  const isBest = loan.monthly === bestMonthly;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{fmtMNTFull(loan.monthly)}</span>
                        {isBest && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold flex items-center gap-1"><Banknote className="w-3 h-3" />LOWEST</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">Total repayment</td>
                {enriched.map(loan => {
                  const minTotal = Math.min(...enriched.map(l => l.total));
                  const isBest = loan.total === minTotal;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className={`font-semibold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{fmtMNTFull(loan.total)}</div>
                      <div className="text-xs text-slate-500 mt-0.5">+{fmtMNTFull(loan.total - scenario.amount)} interest</div>
                    </td>
                  );
                })}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">Loan range</td>
                {enriched.map(loan => (
                  <td key={loan.id} className="p-4 text-slate-700">{fmtMNT(loan.minAmount)} – {fmtMNT(loan.maxAmount)}</td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0">Max term</td>
                {enriched.map(loan => {
                  const isBest = loan.maxTermMonths === longestTerm;
                  return (
                    <td key={loan.id} className={`p-4 ${isBest ? 'bg-green-50' : ''}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold ${isBest ? 'text-green-700' : 'text-slate-900'}`}>{fmtTerm(loan.maxTermMonths)}</span>
                        {isBest && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold flex items-center gap-1"><Clock className="w-3 h-3" />LONGEST</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-700 bg-white sticky left-0 align-top">
                  <button
                    onClick={() => setShowElig(!showElig)}
                    className="flex items-center gap-1 hover:text-slate-900"
                  >
                    Requirements {showElig ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
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
                      <span className="text-xs text-slate-500">{loan.eligibility.length} requirements — expand to view</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-slate-100">
                <td className="p-4 bg-white sticky left-0"></td>
                {enriched.map(loan => {
                  const bank = getBank(loan.bankId);
                  return (
                    <td key={loan.id} className="p-4">
                      <a
                        href={bank.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all"
                      >
                        Visit bank <ExternalLink className="w-3.5 h-3.5" />
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
            You can compare up to <strong>4 loans</strong> at once. <button onClick={() => onNavigate({ view: 'home' })} className="underline font-medium hover:text-blue-700">Add more from a bank page →</button>
          </p>
        </div>
      )}
    </div>
  );
};

// ============ CALCULATOR ============
const CalculatorPage = () => {
  const [amount, setAmount] = useState(20000000);
  const [rate, setRate] = useState(14.4);
  const [termValue, setTermValue] = useState(3);
  const [termUnit, setTermUnit] = useState('years'); // 'years' | 'months'
  const months = termUnit === 'years' ? termValue * 12 : termValue;

  const M = monthlyPayment(amount, rate, months);
  const total = M * months;
  const interest = total - amount;
  const data = useMemo(() => generateAmortData(amount, rate, months), [amount, rate, months]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-7">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Loan calculator</h1>
        <p className="text-slate-600 mt-1">Real-time amortization. All values update as you type.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
          <h3 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" /> Inputs
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Loan amount</label>
                <span className="text-sm font-bold text-slate-900">{fmtMNTFull(amount)}</span>
              </div>
              <input
                type="range" min="100000" max="500000000" step="100000"
                value={amount}
                onChange={e => setAmount(+e.target.value)}
                className="w-full accent-blue-600 mb-2"
              />
              <input
                type="number" min="0"
                value={amount}
                onChange={e => setAmount(Math.max(0, +e.target.value || 0))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Annual interest rate (%)</label>
              <input
                type="number" step="0.1" min="0" max="50"
                value={rate}
                onChange={e => setRate(Math.max(0, +e.target.value || 0))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="range" min="0" max="30" step="0.1"
                value={rate}
                onChange={e => setRate(+e.target.value)}
                className="w-full accent-blue-600 mt-2"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Loan period</label>
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  {['months', 'years'].map(u => (
                    <button
                      key={u}
                      onClick={() => {
                        if (u === termUnit) return;
                        if (u === 'years') setTermValue(Math.max(1, Math.round(termValue / 12)));
                        else setTermValue(termValue * 12);
                        setTermUnit(u);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        termUnit === u ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number" min="1"
                value={termValue}
                onChange={e => setTermValue(Math.max(1, +e.target.value || 1))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="range" min="1" max={termUnit === 'years' ? 30 : 360} step="1"
                value={termValue}
                onChange={e => setTermValue(+e.target.value)}
                className="w-full accent-blue-600 mt-2"
              />
              <div className="text-xs text-slate-500 mt-1">= {months} months</div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-sm">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Monthly payment</div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">{fmtMNTFull(M)}</div>
              <div className="text-xs opacity-80 mt-1">over {fmtTerm(months)}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Total interest</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{fmtMNTFull(interest)}</div>
              <div className="text-xs text-slate-500 mt-1">{((interest / amount) * 100).toFixed(0)}% of principal</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Total repayment</div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{fmtMNTFull(total)}</div>
              <div className="text-xs text-slate-500 mt-1">principal + interest</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Amortization breakdown</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" /> Principal</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400" /> Interest</span>
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gPrincipal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.45} />
                    </linearGradient>
                    <linearGradient id="gInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => fmtMNT(v)} width={55} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                    formatter={(value) => fmtMNTFull(value)}
                  />
                  <Area type="monotone" dataKey="Principal" stackId="1" stroke="#3B82F6" strokeWidth={2} fill="url(#gPrincipal)" />
                  <Area type="monotone" dataKey="Interest" stackId="1" stroke="#F59E0B" strokeWidth={2} fill="url(#gInterest)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-3">Cumulative principal paid vs cumulative interest paid over the loan lifetime.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Formula:</strong> M = P × [r(1+r)<sup>n</sup>] ÷ [(1+r)<sup>n</sup> − 1], where P is principal, r is monthly rate (annual ÷ 12), n is months. Results are indicative; banks may add fees, insurance, or processing charges not reflected here.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ FOOTER ============
const Footer = () => (
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
              <div className="text-[10px] text-slate-400">Зээл харьцуулах платформ</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-md">Independent loan comparison for Mongolian consumers. We don't issue loans — we help you find them.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Banks</div>
          <ul className="space-y-1.5 text-sm">
            {BANKS.map(b => <li key={b.id}>{b.name}</li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Categories</div>
          <ul className="space-y-1.5 text-sm">
            {CATEGORIES.map(c => <li key={c.id}>{c.label} loans</li>)}
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between flex-wrap gap-2 text-xs text-slate-500">
        <span>© 2026 ZeelHub. Demo prototype. Rates shown are indicative.</span>
        <span>Built for Mongolian borrowers · Ulaanbaatar</span>
      </div>
    </div>
  </footer>
);

// ============ COMPARE BASKET (Floating) ============
const CompareBasket = ({ compareList, onNavigate, onClear }) => {
  if (compareList.length === 0) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 w-full max-w-md sm:max-w-fit">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 px-4 py-3 border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">{compareList.length} loan{compareList.length === 1 ? '' : 's'} selected</div>
            <div className="text-[10px] text-slate-400 leading-tight">Compare up to 4</div>
          </div>
        </div>
        <button
          onClick={() => onNavigate({ view: 'compare' })}
          className="ml-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-all flex items-center gap-1.5"
        >
          Compare <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onClear}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          aria-label="Clear"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ============ APP ============
export default function App() {
  const [route, setRoute] = useState({ view: 'home' });
  const [compareList, setCompareList] = useState([]);
  const scrollRef = useRef(null);

  const navigate = (newRoute) => {
    setRoute(newRoute);
    // smooth scroll up on view change
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompare = (loanId) => {
    setCompareList(prev => {
      if (prev.includes(loanId)) return prev.filter(id => id !== loanId);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, loanId];
    });
  };

  const clearCompare = () => setCompareList([]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" ref={scrollRef}>
      <Nav currentView={route.view} onNavigate={navigate} />

      <main>
        {route.view === 'home' && (
          <HomePage onNavigate={navigate} compareList={compareList} onCompare={toggleCompare} />
        )}
        {route.view === 'bank' && (
          <BankPage bankId={route.bankId} onNavigate={navigate} compareList={compareList} onCompare={toggleCompare} />
        )}
        {route.view === 'compare' && (
          <ComparePage compareList={compareList} onCompare={toggleCompare} onClearCompare={clearCompare} onNavigate={navigate} />
        )}
        {route.view === 'calculator' && (
          <CalculatorPage />
        )}
      </main>

      <Footer />

      {route.view !== 'compare' && (
        <CompareBasket compareList={compareList} onNavigate={navigate} onClear={clearCompare} />
      )}
    </div>
  );
}
