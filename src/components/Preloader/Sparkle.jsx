import {
  GLINT_CORE,
  GLINT_HALO,
  GLINT_HALO_OPACITY,
  glintPath,
} from "@/lib/glint";

/**
 * Sparkle — the 4-point glint used across the hero map and the preloader.
 *
 * Two stacked paths: a soft blurred halo underneath, a crisp core on top.
 * On the light (#FAFAF7) backdrop the halo reads as a gentle bloom rather
 * than a glow, which keeps it consistent with the map's markers.
 *
 * The curve itself is in src/lib/glint.js, because the map draws the same star
 * from the same numbers — see the note there on why it stopped being a literal
 * pasted into two files.
 */

/* viewBox units. The path is built once at module load, not per render: it is
   the same string for every instance, since size is applied by the viewBox. */
const D = glintPath(12, 12, 12);

export default function Sparkle({
  size = 16,
  color = GLINT_CORE,
  halo = GLINT_HALO,
  haloOpacity = GLINT_HALO_OPACITY,
  /* The halo is a CSS blur, and a blur is a raster pass. On one big mark that
     is nothing; on forty travelling particles it is forty offscreen buffers
     that have to be re-rasterised whenever their layer changes scale. The
     preloader's field turns it off — at 5-15px the bloom is invisible anyway. */
  glow = true,
  className = "",
  style,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {glow && (
        <path
          d={D}
          fill={halo}
          opacity={haloOpacity}
          style={{ filter: `blur(${Math.max(1, size * 0.09)}px)` }}
        />
      )}
      <path d={D} fill={color} />
    </svg>
  );
}
