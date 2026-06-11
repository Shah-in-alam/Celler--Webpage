// Simple stylised wine-bottle illustration, tinted per wine.
export default function Bottle({ color = '#7d1128' }) {
  return (
    <svg className="bottle" viewBox="0 0 50 150" role="img" aria-hidden="true" focusable="false">
      {/* cap */}
      <rect x="20" y="2" width="10" height="13" rx="1.5" fill="#181513" />
      {/* neck */}
      <rect x="21.5" y="14" width="7" height="22" fill={color} />
      {/* shoulders */}
      <path d="M14 64 C14 48 21.5 47 21.5 36 L28.5 36 C28.5 47 36 48 36 64 Z" fill={color} />
      {/* body */}
      <rect x="14" y="60" width="22" height="86" rx="5" fill={color} />
      {/* label */}
      <rect x="14" y="96" width="22" height="34" fill="#f5efe2" />
      <rect x="14" y="96" width="22" height="34" fill="none" stroke="#181513" strokeWidth="1" />
      <rect x="18" y="103" width="14" height="3" rx="1.5" fill="#6e2540" />
      <rect x="18" y="110" width="10" height="2" rx="1" fill="#181513" opacity="0.5" />
      {/* shine */}
      <rect x="17.5" y="66" width="3" height="70" rx="1.5" fill="#ffffff" opacity="0.18" />
    </svg>
  )
}
