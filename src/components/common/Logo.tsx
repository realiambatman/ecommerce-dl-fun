interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 32 32" className="h-9 w-9 flex-shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-accent-600" />
      <rect x="10.5" y="5.5" width="11" height="21" rx="3" fill="none" stroke="#fff" strokeWidth="2" />
      <path
        d="M13.5 16.2l1.8 1.8 3.4-3.6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="leading-none">
      <span className="block font-display text-[1.15rem] font-semibold tracking-tight text-ink-900">
        Dreamland Gadgets
      </span>
      <span className="mt-1 hidden text-xs text-gray-500 sm:block">Premium Refurbished Phones</span>
    </span>
  </span>
);

export default Logo;
