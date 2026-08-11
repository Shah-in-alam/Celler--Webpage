// A shop photo with a WebP source and a JPEG fallback.
//
// Both files are produced by scripts/optimize-images.py and live in
// public/images/shop/. Pass the base name without extension, e.g. "shop-counter".
export default function Photo({
  name,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority,
}) {
  // React 18 only forwards this hint spelled all-lowercase; the camelCase prop
  // landed in React 19 and would be dropped here with a console warning.
  const hint = priority ? { fetchpriority: 'high' } : {}

  return (
    <picture>
      <source srcSet={`/images/shop/${name}.webp`} type="image/webp" />
      <img
        className={className}
        src={`/images/shop/${name}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        {...hint}
      />
    </picture>
  )
}
