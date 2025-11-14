// components/Text.tsx
interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function Title({ children, className = "" }: TextProps) {
  return <h1 className={`text-2xl font-bold text-sky-600 ${className}`}>{children}</h1>;
}

export function Subtitle({ children, className = "" }: TextProps) {
  return <h2 className={`text-xl font-semibold text-gray-700 ${className}`}>{children}</h2>;
}

export function Paragraph({ children, className = "" }: TextProps) {
  return <p className={`text-base text-gray-600 leading-relaxed ${className}`}>{children}</p>;
}
export function SmallText({ children, className = "" }: TextProps) {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  );
}