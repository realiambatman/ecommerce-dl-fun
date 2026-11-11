import { GRADES, Condition } from '../../data/grades';

interface GradeBadgeProps {
  condition: Condition;
  size?: 'sm' | 'md';
  className?: string;
}

// Condition shown the same way everywhere: grade letter, three-step meter, plain name
const GradeBadge = ({ condition, size = 'sm', className = '' }: GradeBadgeProps) => {
  const grade = GRADES[condition];
  const pad = size === 'md' ? 'py-1.5 pl-1.5 pr-3 text-sm' : 'py-1 pl-1 pr-2.5 text-xs';
  const chip = size === 'md' ? 'h-6 w-6 text-xs' : 'h-5 w-5 text-[0.68rem]';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white font-medium text-ink-900 ${pad} ${className}`}
    >
      <span
        className={`inline-flex items-center justify-center rounded-full bg-accent-600 font-display font-semibold text-white ${chip}`}
        aria-hidden="true"
      >
        {grade.letter}
      </span>
      <span>
        <span className="sr-only">Grade {grade.letter}, </span>
        {condition}
      </span>
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`w-1 rounded-full ${step <= grade.level ? 'bg-accent-600' : 'bg-gray-300'}`}
            style={{ height: `${4 + step * 3}px` }}
          />
        ))}
      </span>
    </span>
  );
};

export default GradeBadge;
