'use client';

import { useState, useEffect, useRef } from 'react';

const businessTypes = ['coffee shops', 'retailers', 'salons', 'services'];

// Different images for each business type
const businessImages = [
  '/coffee-machine.png', // coffee shops
  '/plants.jpg', // retailers
  '/salon-tools.jpg', // salons
  '/services-desk.jpg', // services
];

// Different insights for each business type
const insights = [
  'lunch hour drives the highest order value.',
  'weekend shopping generates peak sales.',
  'Friday appointments command premium pricing.',
  'appointment scheduling drives consistent revenue.',
];

// Metrics for the chart dropdown
const metrics = [
  'Average order value',
  'Peak sales hours',
  'Sales growth',
];

// Chart data for each business type and metric
const chartDataByBusinessType = {
  'coffee shops': {
    'Average order value': {
      general: [
        { time: '6am', value: 17.50, height: 219 },
        { time: '7am', value: 22.50, height: 281 },
        { time: '8am', value: 22.00, height: 275 },
        { time: '9am', value: 21.80, height: 273 },
        { time: '10am', value: 17.10, height: 214 },
        { time: '11am', value: 17.80, height: 223 },
        { time: '12pm', value: 16.20, height: 202 },
        { time: '1pm', value: 19.40, height: 243 },
        { time: '2pm', value: 18.60, height: 233 },
      ],
      local: [
        { time: '6am', value: 14.40, height: 180 },
        { time: '7am', value: 24.20, height: 294 },
        { time: '8am', value: 23.80, height: 289 },
        { time: '9am', value: 21.40, height: 260 },
        { time: '10am', value: 16.00, height: 200 },
        { time: '11am', value: 16.80, height: 210 },
        { time: '12pm', value: 15.60, height: 195 },
        { time: '1pm', value: 18.80, height: 235 },
        { time: '2pm', value: 18.00, height: 225 },
      ],
    },
    'Peak sales hours': {
      general: [
        { day: 'Mon', hours: ['low', 'low', 'medium', 'medium', 'low', 'low', 'low', 'medium', 'low'] },
        { day: 'Tue', hours: ['low', 'low', 'medium', 'medium', 'low', 'medium', 'medium', 'medium', 'low'] },
        { day: 'Wed', hours: ['medium', 'medium', 'medium', 'low', 'medium', 'medium', 'medium', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'high', 'medium', 'medium', 'low', 'low', 'medium', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'high', 'medium', 'low', 'low', 'medium', 'medium', 'medium'] },
        { day: 'Sat', hours: ['medium', 'medium', 'medium', 'low', 'low', 'medium', 'medium', 'low', 'low'] },
        { day: 'Sun', hours: ['low', 'medium', 'medium', 'medium', 'low', 'low', 'medium', 'medium', 'low'] },
      ],
      local: [
        { day: 'Mon', hours: ['low', 'low', 'medium', 'medium', 'medium', 'low', 'low', 'medium', 'low'] },
        { day: 'Tue', hours: ['low', 'low', 'medium', 'medium', 'low', 'medium', 'low', 'medium', 'low'] },
        { day: 'Wed', hours: ['medium', 'medium', 'medium', 'medium', 'low', 'medium', 'medium', 'medium', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'high', 'medium', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'high', 'medium', 'low', 'low', 'medium', 'medium', 'low'] },
        { day: 'Sat', hours: ['medium', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Sun', hours: ['low', 'low', 'low', 'low', 'low', 'low', 'medium', 'low', 'low'] },
      ],
    },
    'Sales growth': {
      general: [
        { time: 'Jan', value: 8.2, height: 120 },
        { time: 'Feb', value: 12.5, height: 180 },
        { time: 'Mar', value: 15.3, height: 220 },
        { time: 'Apr', value: 11.8, height: 170 },
        { time: 'May', value: 9.4, height: 135 },
        { time: 'Jun', value: 14.2, height: 205 },
        { time: 'Jul', value: 18.6, height: 270 },
        { time: 'Aug', value: 16.9, height: 245 },
        { time: 'Sep', value: 13.7, height: 198 },
      ],
      local: [
        { time: 'Jan', value: 6.5, height: 95 },
        { time: 'Feb', value: 10.2, height: 148 },
        { time: 'Mar', value: 18.5, height: 268 },
        { time: 'Apr', value: 22.3, height: 294 },
        { time: 'May', value: 19.7, height: 285 },
        { time: 'Jun', value: 16.4, height: 237 },
        { time: 'Jul', value: 14.8, height: 214 },
        { time: 'Aug', value: 12.1, height: 175 },
        { time: 'Sep', value: 15.3, height: 221 },
      ],
    },
  },
  'retailers': {
    'Average order value': {
      general: [
        { time: '9am', value: 28.30, height: 200 },
        { time: '10am', value: 32.50, height: 230 },
        { time: '11am', value: 35.20, height: 248 },
        { time: '12pm', value: 41.80, height: 294 },
        { time: '1pm', value: 38.60, height: 272 },
        { time: '2pm', value: 36.40, height: 257 },
        { time: '3pm', value: 34.20, height: 241 },
        { time: '4pm', value: 39.10, height: 276 },
        { time: '5pm', value: 33.80, height: 238 },
      ],
      local: [
        { time: '9am', value: 24.50, height: 173 },
        { time: '10am', value: 29.30, height: 207 },
        { time: '11am', value: 32.80, height: 231 },
        { time: '12pm', value: 45.20, height: 294 },
        { time: '1pm', value: 42.10, height: 280 },
        { time: '2pm', value: 38.90, height: 274 },
        { time: '3pm', value: 35.70, height: 252 },
        { time: '4pm', value: 41.30, height: 291 },
        { time: '5pm', value: 36.20, height: 255 },
      ],
    },
    'Peak sales hours': {
      general: [
        { day: 'Mon', hours: ['low', 'medium', 'medium', 'high', 'medium', 'medium', 'low', 'low', 'low'] },
        { day: 'Tue', hours: ['low', 'medium', 'medium', 'high', 'medium', 'medium', 'medium', 'low', 'low'] },
        { day: 'Wed', hours: ['low', 'medium', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'medium', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'high', 'high', 'high', 'high', 'medium', 'medium', 'low'] },
        { day: 'Sat', hours: ['high', 'high', 'high', 'high', 'high', 'high', 'medium', 'medium', 'low'] },
        { day: 'Sun', hours: ['medium', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low', 'low'] },
      ],
      local: [
        { day: 'Mon', hours: ['low', 'medium', 'medium', 'high', 'high', 'medium', 'low', 'low', 'low'] },
        { day: 'Tue', hours: ['low', 'medium', 'high', 'high', 'medium', 'medium', 'low', 'low', 'low'] },
        { day: 'Wed', hours: ['low', 'high', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'high', 'high', 'high', 'high', 'medium', 'low', 'low'] },
        { day: 'Fri', hours: ['high', 'high', 'high', 'high', 'high', 'high', 'high', 'medium', 'low'] },
        { day: 'Sat', hours: ['high', 'high', 'high', 'high', 'high', 'high', 'high', 'medium', 'low'] },
        { day: 'Sun', hours: ['medium', 'high', 'high', 'high', 'high', 'medium', 'low', 'low', 'low'] },
      ],
    },
    'Sales growth': {
      general: [
        { time: 'Jan', value: 5.8, height: 85 },
        { time: 'Feb', value: 9.2, height: 133 },
        { time: 'Mar', value: 11.5, height: 166 },
        { time: 'Apr', value: 14.3, height: 207 },
        { time: 'May', value: 16.8, height: 243 },
        { time: 'Jun', value: 19.4, height: 281 },
        { time: 'Jul', value: 17.2, height: 249 },
        { time: 'Aug', value: 15.6, height: 226 },
        { time: 'Sep', value: 18.9, height: 273 },
      ],
      local: [
        { time: 'Jan', value: 7.2, height: 104 },
        { time: 'Feb', value: 11.8, height: 171 },
        { time: 'Mar', value: 15.4, height: 223 },
        { time: 'Apr', value: 18.9, height: 273 },
        { time: 'May', value: 21.3, height: 294 },
        { time: 'Jun', value: 19.8, height: 286 },
        { time: 'Jul', value: 17.5, height: 253 },
        { time: 'Aug', value: 14.2, height: 205 },
        { time: 'Sep', value: 16.7, height: 241 },
      ],
    },
  },
  'salons': {
    'Average order value': {
      general: [
        { time: '6am', value: 17.50, height: 219 },
        { time: '7am', value: 22.50, height: 281 },
        { time: '8am', value: 22.00, height: 275 },
        { time: '9am', value: 21.80, height: 273 },
        { time: '10am', value: 17.10, height: 214 },
        { time: '11am', value: 17.80, height: 223 },
        { time: '12pm', value: 16.20, height: 202 },
        { time: '1pm', value: 19.40, height: 243 },
        { time: '2pm', value: 18.60, height: 233 },
      ],
      local: [
        { time: '6am', value: 14.40, height: 180 },
        { time: '7am', value: 24.20, height: 294 },
        { time: '8am', value: 23.80, height: 289 },
        { time: '9am', value: 21.40, height: 260 },
        { time: '10am', value: 16.00, height: 200 },
        { time: '11am', value: 16.80, height: 210 },
        { time: '12pm', value: 15.60, height: 195 },
        { time: '1pm', value: 18.80, height: 235 },
        { time: '2pm', value: 18.00, height: 225 },
      ],
    },
    'Peak sales hours': {
      general: [
        { day: 'Mon', hours: ['low', 'low', 'medium', 'medium', 'low', 'low', 'low', 'medium', 'low'] },
        { day: 'Tue', hours: ['low', 'low', 'medium', 'medium', 'low', 'medium', 'medium', 'medium', 'low'] },
        { day: 'Wed', hours: ['medium', 'medium', 'medium', 'low', 'medium', 'medium', 'medium', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'high', 'medium', 'medium', 'low', 'low', 'medium', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'high', 'medium', 'low', 'low', 'medium', 'medium', 'medium'] },
        { day: 'Sat', hours: ['medium', 'medium', 'medium', 'low', 'low', 'medium', 'medium', 'low', 'low'] },
        { day: 'Sun', hours: ['low', 'medium', 'medium', 'medium', 'low', 'low', 'medium', 'medium', 'low'] },
      ],
      local: [
        { day: 'Mon', hours: ['low', 'low', 'medium', 'medium', 'medium', 'low', 'low', 'medium', 'low'] },
        { day: 'Tue', hours: ['low', 'low', 'medium', 'medium', 'low', 'medium', 'low', 'medium', 'low'] },
        { day: 'Wed', hours: ['medium', 'medium', 'medium', 'medium', 'low', 'medium', 'medium', 'medium', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'high', 'medium', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'high', 'medium', 'low', 'low', 'medium', 'medium', 'low'] },
        { day: 'Sat', hours: ['medium', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Sun', hours: ['low', 'low', 'low', 'low', 'low', 'low', 'medium', 'low', 'low'] },
      ],
    },
    'Sales growth': {
      general: [
        { time: 'Jan', value: 8.2, height: 120 },
        { time: 'Feb', value: 12.5, height: 180 },
        { time: 'Mar', value: 15.3, height: 220 },
        { time: 'Apr', value: 11.8, height: 170 },
        { time: 'May', value: 9.4, height: 135 },
        { time: 'Jun', value: 14.2, height: 205 },
        { time: 'Jul', value: 18.6, height: 270 },
        { time: 'Aug', value: 16.9, height: 245 },
        { time: 'Sep', value: 13.7, height: 198 },
      ],
      local: [
        { time: 'Jan', value: 6.5, height: 95 },
        { time: 'Feb', value: 10.2, height: 148 },
        { time: 'Mar', value: 18.5, height: 268 },
        { time: 'Apr', value: 22.3, height: 294 },
        { time: 'May', value: 19.7, height: 285 },
        { time: 'Jun', value: 16.4, height: 237 },
        { time: 'Jul', value: 14.8, height: 214 },
        { time: 'Aug', value: 12.1, height: 175 },
        { time: 'Sep', value: 15.3, height: 221 },
      ],
    },
  },
  'services': {
    'Average order value': {
      general: [
        { time: '8am', value: 45.50, height: 185 },
        { time: '9am', value: 52.30, height: 213 },
        { time: '10am', value: 68.20, height: 278 },
        { time: '11am', value: 71.40, height: 291 },
        { time: '12pm', height: 294, value: 72.50 },
        { time: '1pm', value: 65.80, height: 268 },
        { time: '2pm', value: 58.90, height: 240 },
        { time: '3pm', value: 61.20, height: 249 },
        { time: '4pm', value: 55.40, height: 226 },
      ],
      local: [
        { time: '8am', value: 48.20, height: 196 },
        { time: '9am', value: 56.70, height: 231 },
        { time: '10am', value: 72.40, height: 294 },
        { time: '11am', value: 69.80, height: 284 },
        { time: '12pm', value: 68.90, height: 281 },
        { time: '1pm', value: 62.50, height: 254 },
        { time: '2pm', value: 59.30, height: 242 },
        { time: '3pm', value: 64.10, height: 261 },
        { time: '4pm', value: 57.80, height: 236 },
      ],
    },
    'Peak sales hours': {
      general: [
        { day: 'Mon', hours: ['low', 'medium', 'high', 'high', 'medium', 'medium', 'low', 'low', 'low'] },
        { day: 'Tue', hours: ['low', 'medium', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low'] },
        { day: 'Wed', hours: ['low', 'high', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'high', 'high', 'medium', 'low', 'low', 'low', 'low'] },
        { day: 'Sat', hours: ['low', 'medium', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Sun', hours: ['low', 'low', 'low', 'low', 'low', 'low', 'low', 'low', 'low'] },
      ],
      local: [
        { day: 'Mon', hours: ['low', 'high', 'high', 'high', 'high', 'medium', 'low', 'low', 'low'] },
        { day: 'Tue', hours: ['low', 'high', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low'] },
        { day: 'Wed', hours: ['medium', 'high', 'high', 'high', 'high', 'high', 'medium', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'high', 'high', 'high', 'medium', 'low', 'low', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'high', 'high', 'medium', 'low', 'low', 'low', 'low'] },
        { day: 'Sat', hours: ['low', 'low', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Sun', hours: ['low', 'low', 'low', 'low', 'low', 'low', 'low', 'low', 'low'] },
      ],
    },
    'Sales growth': {
      general: [
        { time: 'Jan', value: 4.5, height: 65 },
        { time: 'Feb', value: 7.8, height: 113 },
        { time: 'Mar', value: 10.2, height: 148 },
        { time: 'Apr', value: 13.6, height: 197 },
        { time: 'May', value: 17.9, height: 259 },
        { time: 'Jun', value: 20.4, height: 294 },
        { time: 'Jul', value: 18.7, height: 270 },
        { time: 'Aug', value: 16.3, height: 236 },
        { time: 'Sep', value: 19.1, height: 276 },
      ],
      local: [
        { time: 'Jan', value: 5.2, height: 75 },
        { time: 'Feb', value: 9.4, height: 136 },
        { time: 'Mar', value: 13.8, height: 200 },
        { time: 'Apr', value: 17.2, height: 249 },
        { time: 'May', value: 21.5, height: 294 },
        { time: 'Jun', value: 19.9, height: 288 },
        { time: 'Jul', value: 17.6, height: 255 },
        { time: 'Aug', value: 15.1, height: 219 },
        { time: 'Sep', value: 18.3, height: 265 },
      ],
    },
  },
};

// Locations for the location dropdown (pre-canned neighborhoods only)
const locations = [
  'Mission District',
  'Hayes Valley',
  'Castro',
  'Marina',
];

export default function InsightCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChartDropdownOpen, setIsChartDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hideRightPanel, setHideRightPanel] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mapRevealed, setMapRevealed] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [locationInput, setLocationInput] = useState('');
  const [showCTA, setShowCTA] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    zipCode: '',
    email: '',
    businessType: '',
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLDivElement>(null);

  // Get current business type, metric name and data
  const currentBusinessType = businessTypes[currentIndex];
  const currentMetric = metrics[selectedMetric];
  const currentData = chartDataByBusinessType[currentBusinessType as keyof typeof chartDataByBusinessType][currentMetric as keyof typeof chartDataByBusinessType['coffee shops']];
  const dataToDisplay = mapRevealed ? currentData.local : currentData.general;

  // Update selected metric when business type changes to retailers
  useEffect(() => {
    if (currentBusinessType === 'retailers') {
      setSelectedMetric(1); // Peak sales hours
    } else {
      setSelectedMetric(0); // Average order value
    }
  }, [currentBusinessType]);

  // Helper function to get bar color based on value/intensity
  const getBarColor = (index: number, data: any) => {
    if (currentMetric === 'Average order value') {
      // Highlight top 4 values in black
      const sortedIndices = data
        .map((d: any, i: number) => ({ value: d.value, index: i }))
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 4)
        .map((d: any) => d.index);
      return sortedIndices.includes(index) ? 'bg-black' : 'bg-[#dadada]';
    } else if (currentMetric === 'Sales growth') {
      // Top 3 values in black, rest in gray shades
      const sortedIndices = data
        .map((d: any, i: number) => ({ value: d.value, index: i }))
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 3)
        .map((d: any) => d.index);
      return sortedIndices.includes(index) ? 'bg-black' : 'bg-[#dadada]';
    }
    return 'bg-black';
  };

  // Helper function to get brightness class for hover
  const getHoverBrightness = (color: string) => {
    return color === 'bg-black' ? 'group-hover:brightness-125' : 'group-hover:brightness-90';
  };

  // Helper function to render intensity-based heatmap
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return 'bg-black';
      case 'medium':
        return 'bg-[#666666]';
      case 'low':
        return 'bg-[#dadada]';
      default:
        return 'bg-[#dadada]';
    }
  };

  const handleRevealMap = () => {
    setMapRevealed(true);

    // Animate the scroll to reveal the map
    let startTime: number | null = null;
    const duration = 1000; // 1 second animation

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setScrollY(easeProgress * 800); // Animate from 0 to 800

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleBusinessTypeClick = (index: number) => {
    if (index === currentIndex) return;

    setIsAnimating(true);
    setIsDropdownOpen(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 400);
  };

  const handleExpand = () => {
    // 1. Hide right panel and move/grow card immediately
    setHideRightPanel(true);

    // 2. Wait for panel slide & card movement (700ms), then show expanded content
    setTimeout(() => {
      setIsExpanded(true);
    }, 700);

    // 3. Show CTA after chart data loads (2200ms = 700ms + 1500ms)
    setTimeout(() => {
      setShowCTA(true);
    }, 2200);
  };

  // Handle scroll to reveal/hide the map
  useEffect(() => {
    if (!isExpanded || !containerRef.current) return;

    const handleRevealMapScroll = () => {
      setMapRevealed(true);

      // Animate the scroll to reveal the map
      let startTime: number | null = null;
      const duration = 1000; // 1 second animation

      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        setScrollY(easeProgress * 800); // Animate from 0 to 800

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleHideMapScroll = () => {
      // Animate the scroll to hide the map
      let startTime: number | null = null;
      const duration = 600; // 0.6 second animation
      const startScrollY = 800;

      const animateScrollDown = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out quad for quicker, smoother deceleration
        const easeProgress = 1 - (1 - progress) * (1 - progress);

        setScrollY(startScrollY * (1 - easeProgress)); // Animate from 800 to 0

        if (progress < 1) {
          requestAnimationFrame(animateScrollDown);
        } else {
          setScrollY(0);
          setMapRevealed(false);
        }
      };

      requestAnimationFrame(animateScrollDown);
    };

    const handleScroll = (e: WheelEvent) => {
      if (!mapRevealed && e.deltaY > 0) {
        // Scrolling down - reveal map
        handleRevealMapScroll();
      } else if (mapRevealed && e.deltaY < 0) {
        // Scrolling up - hide map
        handleHideMapScroll();
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, [isExpanded, mapRevealed]);

  // Close location dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false);
      }
    };

    if (isLocationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isLocationDropdownOpen]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
      {/* Coffee shop image - always full width */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <img
          src={businessImages[currentIndex]}
          alt={`${businessTypes[currentIndex]} background`}
          className={`absolute left-0 top-0 w-full h-full object-cover transition-opacity duration-500 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Map that slides up from bottom on scroll - only when expanded and revealed */}
      {isExpanded && mapRevealed && (
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <img
            src="/map-streets.png"
            alt="Interactive neighborhood map"
            className="absolute w-full h-full object-cover transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${100 - Math.min(100, (scrollY / 800) * 100)}%)`,
            }}
          />
        </div>
      )}

      {/* Chart Card Overlay */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 bg-white rounded-[10px] shadow-lg flex flex-col transition-all duration-700 ${
          hideRightPanel
            ? 'left-1/2 -translate-x-1/2 w-[591px] p-10 gap-10'
            : 'left-[25%] -translate-x-1/2 w-[360px] p-5 gap-[30px]'
        }`}
      >
        {/* Dropdowns - Metric and Location */}
        <div className="flex gap-5 w-full">
          <div className="relative flex-1">
            <button
              onClick={() => {
                setIsChartDropdownOpen(!isChartDropdownOpen);
                setIsLocationDropdownOpen(false);
              }}
              className="w-full bg-white border border-[#d3d3d3] rounded-[30px] h-[56px] flex items-center justify-center px-5 py-[10px] hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-base text-[rgba(0,0,0,0.9)]">
                {metrics[selectedMetric]}
              </span>
            </button>

            {/* Metric Dropdown Menu */}
            {isChartDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#d3d3d3] rounded-2xl shadow-lg overflow-hidden z-30">
                {metrics.map((metric, index) => (
                  <button
                    key={metric}
                    onClick={() => {
                      setSelectedMetric(index);
                      setIsChartDropdownOpen(false);
                    }}
                    className={`w-full px-5 py-3 text-left font-medium text-base hover:bg-gray-50 transition-colors ${
                      selectedMetric === index
                        ? 'bg-gray-100 text-black'
                        : 'text-[rgba(0,0,0,0.9)]'
                    }`}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location matters CTA button - appears when showCTA is true */}
          {isExpanded && showCTA && !mapRevealed && (
            <div className="flex-1">
              <button
                onClick={handleRevealMap}
                className="w-full bg-black text-white rounded-[30px] h-[56px] flex items-center justify-center px-5 py-[10px] hover:bg-gray-800 transition-colors font-medium text-base animate-[popIn_800ms_ease-in-out_forwards]"
              >
                <span className="opacity-0 animate-[fadeIn_200ms_ease-in-out_800ms_forwards]">
                  ... and location matters
                </span>
              </button>
            </div>
          )}

          {/* Location input field - only appears when map is revealed */}
          {isExpanded && mapRevealed && (
            <div ref={locationInputRef} className="relative flex-1 animate-[fadeIn_500ms_ease-in-out_forwards]">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setIsLocationDropdownOpen(true);
                  setIsChartDropdownOpen(false);
                }}
                onFocus={() => {
                  setIsLocationDropdownOpen(true);
                  setIsChartDropdownOpen(false);
                }}
                placeholder="Enter location..."
                className="w-full bg-white border border-[#d3d3d3] rounded-[30px] h-[56px] px-5 py-[10px] font-medium text-base text-[rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-10 transition-all"
              />

              {/* Location Suggestions Dropdown */}
              {isLocationDropdownOpen && locationInput.trim() !== '' && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#d3d3d3] rounded-2xl shadow-lg overflow-hidden z-30">
                  {locations
                    .filter((location) =>
                      location.toLowerCase().includes(locationInput.toLowerCase())
                    )
                    .map((location, index) => (
                      <button
                        key={location}
                        onClick={() => {
                          setLocationInput(location);
                          setIsLocationDropdownOpen(false);
                        }}
                        className="w-full px-5 py-3 text-left font-medium text-base hover:bg-gray-50 transition-colors text-[rgba(0,0,0,0.9)]"
                      >
                        {location}
                      </button>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="flex flex-col gap-[40px] w-full">
          <div className={`flex gap-[10px] h-[320px] transition-all duration-700 ${
            hideRightPanel ? 'w-full' : 'w-[320px]'
          }`}>
            {/* Y Axis Labels - Always visible */}
            <div className="flex flex-col justify-between pb-[25px] text-xs text-[#666666] tracking-[0.12px]">
              {currentMetric === 'Sales growth' || currentMetric === 'Peak sales hours' ? (
                <>
                  <span>20%</span>
                  <span>15%</span>
                  <span>10%</span>
                  <span>5%</span>
                  <span>0%</span>
                </>
              ) : (
                <>
                  <span>$20</span>
                  <span>$15</span>
                  <span>$10</span>
                  <span>$5</span>
                  <span>0</span>
                </>
              )}
            </div>

            {/* Chart Area */}
            <div className="flex-1 flex flex-col gap-[10px] relative">
              {/* Grid Lines - Always visible, grows with card */}
              <div className="absolute left-[3px] right-0 top-0 bottom-[24px] flex flex-col justify-between z-0">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-[1px] bg-[#f0f0f0] transition-all duration-700" />
                ))}
              </div>

              {/* Bars - Fade out old, fade in new */}
              <div className="flex gap-[12px] items-end justify-end h-[295px] px-[10px] pb-px relative z-10">
                {isExpanded ? (
                  <>
                    {/* Expanded view: Dynamic rendering based on metric type */}
                    {currentMetric === 'Peak sales hours' ? (
                      <div className="w-full h-full flex flex-col gap-[3px] opacity-0 animate-[fadeIn_500ms_ease-in-out_forwards]">
                        {/* Heatmap grid visualization for Peak sales hours */}
                        {dataToDisplay.map((dayData: any, dayIndex: number) => (
                          <div key={dayIndex} className="flex gap-[3px] flex-1">
                            {dayData.hours.map((intensity: string, hourIndex: number) => {
                              const intensityColor = getIntensityColor(intensity);
                              return (
                                <div
                                  key={hourIndex}
                                  className={`flex-1 ${intensityColor} rounded-[2px] transition-all duration-300 hover:brightness-110 cursor-pointer`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ) : currentMetric === 'Sales growth' ? (
                      <div className="w-full h-full relative opacity-0 animate-[fadeIn_500ms_ease-in-out_forwards]">
                        {/* Line graph for Sales growth */}
                        <svg className="w-full h-full" viewBox="-8 -8 516 310" preserveAspectRatio="none">
                          {/* Generate line path */}
                          <path
                            d={dataToDisplay.map((item: any, index: number) => {
                              const x = (index / (dataToDisplay.length - 1)) * 500;
                              const y = 294 - item.height;
                              return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Data points with hover states */}
                          {dataToDisplay.map((item: any, index: number) => {
                            const x = (index / (dataToDisplay.length - 1)) * 500;
                            const y = 294 - item.height;
                            return (
                              <g key={index} className="group cursor-pointer">
                                {/* Invisible larger hover area for easier interaction */}
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="12"
                                  fill="transparent"
                                  className="cursor-pointer"
                                />
                                {/* Outer ring on hover */}
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="7"
                                  fill="none"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                                />
                                {/* Main dot */}
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="4"
                                  fill="black"
                                  className="transition-all duration-200 pointer-events-none"
                                />
                                {/* Tooltip in SVG */}
                                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                  <text
                                    x={x}
                                    y={y - 20}
                                    textAnchor="middle"
                                    className="text-xs fill-white"
                                    style={{ paintOrder: 'stroke', stroke: 'black', strokeWidth: 3 }}
                                  >
                                    {item.time}: {item.value}%
                                  </text>
                                  <rect
                                    x={x - 30}
                                    y={y - 35}
                                    width="60"
                                    height="20"
                                    rx="4"
                                    fill="black"
                                    className="opacity-90"
                                  />
                                  <text
                                    x={x}
                                    y={y - 22}
                                    textAnchor="middle"
                                    className="text-xs fill-white font-medium"
                                  >
                                    {item.time}: {item.value}%
                                  </text>
                                </g>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    ) : (
                      <>
                        {/* Bar chart for Average order value */}
                        {dataToDisplay.map((item: any, index: number) => {
                          const barColor = getBarColor(index, dataToDisplay);
                          const hoverClass = getHoverBrightness(barColor);
                          const delay = index * 50;
                          const displayValue = `$${item.value}`;

                          return (
                            <div
                              key={index}
                              className="flex-1 flex flex-col justify-end h-[294px] opacity-0 group relative"
                              style={{ animation: `fadeIn 500ms ease-in-out ${delay}ms forwards` }}
                            >
                              <div className={`w-full ${barColor} rounded-t-[6px] transition-all duration-500 ${hoverClass} cursor-pointer`} style={{ height: `${item.height}px` }} />
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {displayValue}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Collapsed view: 4 bars - Different heights for retailers */}
                    {currentBusinessType === 'retailers' ? (
                      <>
                        {/* Retailers: 4-column heatmap preview (Thu, Fri, Sat, Sun) */}
                        <div className="w-full h-full flex gap-[12px]">
                          {/* Get Thu-Sun data (indices 3-6 from the general data) */}
                          {chartDataByBusinessType['retailers']['Peak sales hours'].general.slice(3, 7).map((dayData: any, dayIndex: number) => (
                            <div key={dayIndex} className="flex-1 flex flex-col gap-[3px]">
                              {dayData.hours.map((intensity: string, hourIndex: number) => {
                                const intensityColor = getIntensityColor(intensity);
                                return (
                                  <div
                                    key={hourIndex}
                                    className={`flex-1 ${intensityColor} rounded-[2px] transition-all duration-200 hover:brightness-110 cursor-pointer`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Coffee shops and others: Original bars */}
                        <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                          <div className="w-full h-[241px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$19.30</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                          <div className="w-full h-[223px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$17.80</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                          <div className="w-full h-[219px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$17.50</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                          <div className="w-full h-[273px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$21.80</div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* X Axis Labels - Fade transition */}
              <div className="flex gap-[12px] items-start justify-start px-[10px] text-xs text-[#666666] tracking-[0.12px]">
                {isExpanded ? (
                  <>
                    {currentMetric === 'Peak sales hours' ? (
                      <>
                        {['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'].map((hour, index) => (
                          <div
                            key={index}
                            className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_forwards]"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {hour}
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {dataToDisplay.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_forwards]"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {item.time}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {currentBusinessType === 'retailers' ? (
                      <>
                        <div className="flex-1 text-center transition-opacity duration-300">Thu</div>
                        <div className="flex-1 text-center transition-opacity duration-300">Fri</div>
                        <div className="flex-1 text-center transition-opacity duration-300">Sat</div>
                        <div className="flex-1 text-center transition-opacity duration-300">Sun</div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 text-center transition-opacity duration-300">11am</div>
                        <div className="flex-1 text-center transition-opacity duration-300">12pm</div>
                        <div className="flex-1 text-center transition-opacity duration-300">1pm</div>
                        <div className="flex-1 text-center transition-opacity duration-300">2pm</div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Insight Text - Only visible when expanded */}
        {isExpanded && (
          <div className="flex flex-col gap-[20px] w-full text-[#101010]">
            <div className="flex flex-col gap-[10px]">
              <p className="font-serif text-[24px] leading-[1.2] tracking-[-0.48px]">
                {currentBusinessType === 'retailers'
                  ? (mapRevealed
                      ? "In San Francisco, Friday midday sees the most consistent high traffic"
                      : "While weekends see traffic, weekday lunch hours show sustained peak sales")
                  : (mapRevealed
                      ? "In San Francisco, 7am hits peak order value at $24.20"
                      : "Our data shows morning rush between 7-9am beats lunch by 31%")
                }
              </p>
              <p className="font-normal text-[18px] leading-[1.5] tracking-[-0.36px]">
                {currentBusinessType === 'retailers'
                  ? (mapRevealed
                      ? "Thursday through Saturday, 10am-2pm shows the densest concentration of high-traffic periods."
                      : "Thursday-Friday 10am-2pm consistently outperform weekend shopping windows.")
                  : (mapRevealed
                      ? "That's 31% higher than the city-wide average of $18.50."
                      : "Average order value jumps from $18.50 to 24.20 during these hours.")
                }
              </p>
            </div>

            {/* Get Personalized Insights CTA */}
            <button
              onClick={() => {
                setFormData({ ...formData, businessType: currentBusinessType });
                setShowModal(true);
              }}
              className="w-full bg-black text-white rounded-[30px] h-[56px] flex items-center justify-center px-5 py-[10px] hover:bg-gray-800 transition-colors font-medium text-base"
            >
              Get personalized insights for my business
            </button>
          </div>
        )}
      </div>



      {/* Content Card - Right Side */}
      <div className={`absolute top-0 w-[50%] h-full bg-white overflow-hidden flex items-center justify-center transition-all duration-700 ${
        hideRightPanel ? 'right-[-50%] opacity-0 pointer-events-none' : 'right-0 opacity-100'
      }`}>
        <div className="w-[589px] flex flex-col items-center gap-16">
          {/* Heading */}
          <div className="w-full text-center flex flex-col gap-12">
            {/* Text with Dropdown */}
            <div className="flex items-center justify-center gap-[10px]">
              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black">
                Most
              </p>

              {/* Dropdown Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="border border-[#959595] rounded-full pl-6 pr-4 py-4 flex items-center gap-[8px] hover:bg-gray-50 transition-colors"
                >
                  <span className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black whitespace-nowrap">
                    {businessTypes[currentIndex]}
                  </span>
                  <div className="flex items-center justify-center p-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M13.5 5.5L8 11L2.5 5.5"
                        stroke="#959595"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-[#959595] rounded-2xl shadow-lg overflow-hidden z-10 min-w-full">
                    {businessTypes.map((type, index) => (
                      <button
                        key={type}
                        onClick={() => handleBusinessTypeClick(index)}
                        className={`w-full px-6 py-3 text-left font-serif text-[20px] hover:bg-gray-50 transition-colors ${
                          currentIndex === index
                            ? 'bg-gray-100 text-black'
                            : 'text-[#666666]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black">
                think
              </p>
            </div>

            {/* Insight Text */}
            <p className="font-serif text-[48px] leading-[1.2] tracking-[-0.96px] text-black">
              <span
                className={`inline-block transition-opacity duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {insights[currentIndex]}
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleExpand}
            className="bg-black text-white px-10 py-6 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors"
          >
            See what the data reveals
          </button>
        </div>
      </div>

      {/* Personalized Insights Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-[fadeIn_300ms_ease-in-out_forwards]">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-serif text-[28px] leading-[1.2] tracking-[-0.56px] text-black mb-2">
                  Get hyper-local insights
                </h3>
                <p className="text-gray-600 text-sm">
                  See data within 0.5 miles of your business and get weekly insights delivered to your inbox.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: Handle form submission
                  console.log('Form submitted:', formData);
                  setShowModal(false);
                }}
                className="flex flex-col gap-4"
              >
                {/* Zip Code */}
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="94110"
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-10 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@business.com"
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-10 transition-all"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-10 transition-all bg-white"
                  >
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white rounded-[30px] h-[56px] flex items-center justify-center px-5 py-3 hover:bg-gray-800 transition-colors font-medium text-base mt-2"
                >
                  Get my personalized insights
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
