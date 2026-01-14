export default function ZoomText({ text, className = "" }) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-200 hover:scale-150"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
