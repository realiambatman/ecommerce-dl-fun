import { useId } from 'react';

type CameraLayout = 'square' | 'column' | 'bar' | 'ring' | 'fold';

interface Finish {
  body: string;
  edge: string;
  layout: CameraLayout;
  lenses: number;
}

// Illustrated finishes per catalogue item, so listings never depend on remote photos
const FINISHES: Record<string, Finish> = {
  '1': { body: '#A9C0D4', edge: '#7E98AE', layout: 'square', lenses: 3 },
  '2': { body: '#3E524D', edge: '#273632', layout: 'column', lenses: 4 },
  '3': { body: '#D8D2C3', edge: '#ACA596', layout: 'bar', lenses: 3 },
  '4': { body: '#34506F', edge: '#22384F', layout: 'square', lenses: 2 },
  '5': { body: '#C7CDD0', edge: '#9BA3A7', layout: 'square', lenses: 4 },
  '6': { body: '#E6DFCD', edge: '#B9B19C', layout: 'fold', lenses: 2 },
  '7': { body: '#5B5064', edge: '#3F3647', layout: 'square', lenses: 3 },
  '8': { body: '#CDC3D6', edge: '#A297AD', layout: 'column', lenses: 3 },
  '9': { body: '#D5D9B1', edge: '#A8AD82', layout: 'bar', lenses: 2 },
  '10': { body: '#234A40', edge: '#14302A', layout: 'ring', lenses: 3 },
};

const DEFAULT_FINISH: Finish = { body: '#C9CCCB', edge: '#9DA1A0', layout: 'column', lenses: 2 };

const LENS = '#161B1E';

const Lens = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={LENS} />
    <circle cx={cx} cy={cy} r={r * 0.55} fill="#2C353A" />
    <circle cx={cx - r * 0.25} cy={cy - r * 0.25} r={r * 0.16} fill="#fff" opacity="0.55" />
  </g>
);

const Camera = ({ finish, x, y }: { finish: Finish; x: number; y: number }) => {
  const { layout, lenses, edge } = finish;

  if (layout === 'square') {
    const grid = [
      [22, 22],
      [22, 50],
      [50, 36],
      [50, 60],
    ].slice(0, lenses);
    const twoUp = lenses === 2;
    return (
      <g transform={`translate(${x + 10} ${y + 10})`}>
        <rect width={twoUp ? 44 : 72} height={72} rx="18" fill={edge} opacity="0.55" />
        {(twoUp ? [[22, 21], [22, 51]] : grid).map(([cx, cy], i) => (
          <Lens key={i} cx={cx} cy={cy} r={twoUp ? 12 : 11} />
        ))}
      </g>
    );
  }

  if (layout === 'column') {
    return (
      <g transform={`translate(${x + 26} ${y + 26})`}>
        {Array.from({ length: Math.min(lenses, 3) }).map((_, i) => (
          <Lens key={i} cx={0} cy={i * 30} r={11} />
        ))}
        {lenses > 3 && <Lens cx={30} cy={15} r={7} />}
      </g>
    );
  }

  if (layout === 'bar') {
    return (
      <g transform={`translate(${x} ${y + 34})`}>
        <rect width="150" height="34" fill={LENS} />
        {Array.from({ length: lenses }).map((_, i) => (
          <circle key={i} cx={26 + i * 24} cy={17} r={8} fill="#2C353A" />
        ))}
      </g>
    );
  }

  if (layout === 'ring') {
    return (
      <g transform={`translate(${x + 46} ${y + 50})`}>
        <circle r="36" fill={LENS} />
        <circle r="36" fill="none" stroke={edge} strokeWidth="3" />
        <Lens cx={-13} cy={-11} r={9} />
        <Lens cx={13} cy={-11} r={9} />
        <Lens cx={-13} cy={13} r={9} />
        <circle cx={13} cy={13} r={4} fill="#E9E4D4" />
      </g>
    );
  }

  // fold: cover-screen band with two lenses, hinge line across the middle
  return (
    <g>
      <rect x={x + 10} y={y + 10} width="130" height="64" rx="16" fill={LENS} />
      <Lens cx={x + 34} cy={y + 30} r={9} />
      <Lens cx={x + 34} cy={y + 54} r={9} />
      <rect x={x} y={y + 148} width="150" height="3" fill={edge} />
    </g>
  );
};

interface DeviceArtProps {
  productId: string;
  view?: 'back' | 'front' | 'pair';
  className?: string;
  title?: string;
}

const DeviceArt = ({ productId, view = 'back', className = '', title }: DeviceArtProps) => {
  const uid = useId().replace(/:/g, '');
  const finish = FINISHES[productId] ?? DEFAULT_FINISH;
  const W = 150;
  const H = 300;

  const Back = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width={W} height={H} rx="30" fill={finish.edge} />
      <g clipPath={`url(#clip-${uid})`} transform={`translate(${x} ${y})`}>
        <rect x="3" y="3" width={W - 6} height={H - 6} rx="27" fill={`url(#body-${uid})`} />
        <Camera finish={finish} x={3} y={3} />
      </g>
    </g>
  );

  const Front = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width={W} height={H} rx="30" fill={finish.edge} />
      <rect x={x + 3} y={y + 3} width={W - 6} height={H - 6} rx="27" fill="#12191C" />
      <rect x={x + 8} y={y + 8} width={W - 16} height={H - 16} rx="22" fill={`url(#screen-${uid})`} />
      <rect x={x + W / 2 - 18} y={y + 16} width="36" height="10" rx="5" fill="#12191C" />
      <rect x={x + 24} y={y + 108} width="64" height="12" rx="6" fill="#fff" opacity="0.85" />
      <rect x={x + 24} y={y + 128} width="40" height="6" rx="3" fill="#fff" opacity="0.5" />
      <rect x={x + W / 2 - 24} y={y + H - 20} width="48" height="4" rx="2" fill="#fff" opacity="0.6" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 320 360"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`screen-${uid}`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={finish.body} />
          <stop offset="1" stopColor="#0F5F5C" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect x="3" y="3" width={W - 6} height={H - 6} rx="27" />
        </clipPath>
      </defs>
      <ellipse cx="160" cy="338" rx={view === 'pair' ? 120 : 78} ry="9" fill="#12191C" opacity="0.1" />
      {/* base colour sits under the gradient sheen */}
      {view === 'pair' ? (
        <>
          <g transform="rotate(-7 110 180)">
            <rect x={41} y={33} width={W - 6} height={H - 6} rx="27" fill={finish.body} />
            <Back x={38} y={30} />
          </g>
          <g transform="rotate(5 215 180)">
            <Front x={138} y={30} />
          </g>
        </>
      ) : view === 'front' ? (
        <Front x={85} y={28} />
      ) : (
        <>
          <rect x={88} y={31} width={W - 6} height={H - 6} rx="27" fill={finish.body} />
          <Back x={85} y={28} />
        </>
      )}
    </svg>
  );
};

export default DeviceArt;
