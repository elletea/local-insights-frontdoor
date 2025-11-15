'use client';

import Image from 'next/image';

export default function MapGraphic() {
  return (
    <div className="w-[50%] max-w-md mx-auto">
      <img
        src="/map.svg"
        alt="Abstract neighborhood map"
        className="w-full h-auto"
      />
    </div>
  );
}
