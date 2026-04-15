import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showTagline = false, className = '' }: LogoProps) {
  const sizes = {
    sm: { img: 'h-8', text: 'text-lg', tagline: 'text-[10px]' },
    md: { img: 'h-10', text: 'text-xl', tagline: 'text-xs' },
    lg: { img: 'h-16', text: 'text-3xl', tagline: 'text-sm' },
  };

  const { img, text, tagline } = sizes[size];

  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/assets/logo.jpg" 
        alt="ProfitPal Logo" 
        className={`${img} w-auto object-contain`}
      />
      <div className="flex flex-col">
        <span className={`font-heading font-bold text-gradient ${text}`}>
          ProfitPal
        </span>
        {showTagline && (
          <span className={`text-pp-slate ${tagline}`}>
            Helping you earn, one price at a time.
          </span>
        )}
      </div>
    </Link>
  );
}
