import React from 'react';

export const fallbackDataUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192">
       <rect width="100%" height="100%" fill="#e5e7eb"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             font-family="Arial, sans-serif" font-size="14" fill="#6b7280">
         No Image
       </text>
     </svg>`
  );

export function useImageFallback() {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    if (img.src !== fallbackDataUrl) img.src = fallbackDataUrl;
  };
}

export function featherRectMask(edge: string = '6%'): React.CSSProperties {
  const horiz = `linear-gradient(to right,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.2) calc(${edge} * 0.5),
    rgba(0,0,0,1) ${edge},
    rgba(0,0,0,1) calc(100% - ${edge}),
    rgba(0,0,0,0.2) calc(100% - (${edge} * 0.5)),
    rgba(0,0,0,0) 100%)`;
  const vert = `linear-gradient(to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.2) calc(${edge} * 0.5),
    rgba(0,0,0,1) ${edge},
    rgba(0,0,0,1) calc(100% - ${edge}),
    rgba(0,0,0,0.2) calc(100% - (${edge} * 0.5)),
    rgba(0,0,0,0) 100%)`;

  return {
    WebkitMaskImage: `${horiz}, ${vert}`,
    maskImage: `${horiz}, ${vert}`,
    WebkitMaskComposite: 'source-in' as React.CSSProperties['WebkitMaskComposite'],
    maskComposite: 'intersect' as React.CSSProperties['maskComposite'],
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  };
}
