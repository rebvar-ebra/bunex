// Tabler Icons (MIT), retrieved with Better Icons / Iconify.
// See docs/licenses/tabler-icons.txt for attribution.
const paths = {
  instagram: [
    "M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z",
    "M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0-7 0M17 7v.01",
  ],
  google: ["M20.945 11a9 9 0 1 1-3.284-5.997l-2.655 2.392A5.5 5.5 0 1 0 17.125 14H13v-3z"],
  mapPin: [
    "M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0",
    "M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0",
  ],
  shoppingBag: [
    "M6.331 8H17.67a2 2 0 0 1 1.977 2.304l-1.255 8.152A3 3 0 0 1 15.426 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8",
    "M9 11V6a3 3 0 0 1 6 0v5",
  ],
  arrowUpRight: ["M17 7L7 17M8 7h9v9"],
} as const;

// Decorative only: the surrounding link retains its visible, accessible label.
export function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      className="uiIcon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
