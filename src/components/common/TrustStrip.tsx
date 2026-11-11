import { Link } from 'react-router-dom';
import { ShieldCheck, ClipboardCheck, RotateCcw, Truck } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: '12-month warranty', text: 'Full coverage on all devices', to: '/returns' },
  { icon: ClipboardCheck, title: '30+ quality checks', text: 'Tested, graded and certified', to: '/faq' },
  { icon: RotateCcw, title: '30-day returns', text: 'Money-back guarantee', to: '/returns' },
  { icon: Truck, title: 'Free shipping', text: 'On orders over ₹15,000', to: '/shipping' },
];

interface TrustStripProps {
  variant?: 'row' | 'stack';
  className?: string;
}

// The shop's four promises, shown identically wherever a buyer needs reassurance
const TrustStrip = ({ variant = 'row', className = '' }: TrustStripProps) => {
  if (variant === 'stack') {
    return (
      <ul className={`divide-y divide-gray-200 ${className}`}>
        {items.slice(0, 3).map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <Icon className="h-5 w-5 flex-shrink-0 text-accent-600" aria-hidden="true" />
            <p className="text-sm">
              <span className="font-medium text-ink-900">{title}</span>
              <span className="block text-gray-500">{text}</span>
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-4 ${className}`}
    >
      {items.map(({ icon: Icon, title, text, to }, i) => (
        <li
          key={title}
          className={`border-gray-200 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${
            i === 1 ? 'lg:border-r' : ''
          } ${i === 2 ? 'lg:border-r' : ''}`}
        >
          <Link to={to} className="group flex h-full flex-col gap-3 p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:p-6">
            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display font-medium text-ink-900">{title}</span>
              <span className="block text-sm text-gray-500">{text}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TrustStrip;
