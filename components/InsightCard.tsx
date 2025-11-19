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
        { day: 'Mon', hours: ['low', 'medium', 'medium', 'high', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Tue', hours: ['low', 'medium', 'medium', 'high', 'medium', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Wed', hours: ['low', 'medium', 'high', 'peak', 'high', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'medium', 'high', 'peak', 'high', 'medium', 'medium', 'low', 'low', 'low', 'medium', 'medium', 'low', 'low'] },
        { day: 'Fri', hours: ['medium', 'high', 'peak', 'peak', 'peak', 'high', 'medium', 'medium', 'medium', 'high', 'high', 'medium', 'low', 'low'] },
        { day: 'Sat', hours: ['high', 'peak', 'peak', 'peak', 'peak', 'high', 'medium', 'medium', 'high', 'high', 'high', 'medium', 'medium', 'low'] },
        { day: 'Sun', hours: ['medium', 'high', 'high', 'high', 'medium', 'medium', 'low', 'low', 'low', 'medium', 'medium', 'low', 'low', 'low'] },
      ],
      local: [
        { day: 'Mon', hours: ['low', 'medium', 'medium', 'high', 'high', 'medium', 'low', 'low', 'low', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Tue', hours: ['low', 'medium', 'high', 'high', 'medium', 'medium', 'low', 'low', 'low', 'low', 'low', 'low', 'low', 'low'] },
        { day: 'Wed', hours: ['low', 'high', 'peak', 'peak', 'high', 'medium', 'medium', 'low', 'low', 'low', 'medium', 'low', 'low', 'low'] },
        { day: 'Thu', hours: ['medium', 'high', 'peak', 'peak', 'peak', 'high', 'medium', 'low', 'low', 'medium', 'high', 'medium', 'low', 'low'] },
        { day: 'Fri', hours: ['high', 'peak', 'peak', 'peak', 'peak', 'peak', 'high', 'medium', 'high', 'peak', 'peak', 'high', 'medium', 'low'] },
        { day: 'Sat', hours: ['high', 'peak', 'peak', 'peak', 'peak', 'peak', 'high', 'medium', 'high', 'peak', 'peak', 'high', 'medium', 'low'] },
        { day: 'Sun', hours: ['medium', 'high', 'peak', 'high', 'high', 'medium', 'low', 'low', 'medium', 'high', 'medium', 'low', 'low', 'low'] },
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
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editableLocation, setEditableLocation] = useState('Greenpoint, NYC');
  const [tempLocation, setTempLocation] = useState('Greenpoint, NYC');
  const [showConversionForm, setShowConversionForm] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [isBusinessTypeDropdownOpen, setIsBusinessTypeDropdownOpen] = useState(false);
  const [flowersScrollY, setFlowersScrollY] = useState(0);
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
      case 'peak':
        return 'bg-black';
      case 'high':
        return 'bg-[#666666]';
      case 'medium':
        return 'bg-[#999999]';
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
        // Scrolling up - animate flowers background and show conversion form
        handleShowConversionForm();
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

  const handleShowConversionForm = () => {
    // Animate the flowers background scrolling up
    let startTime: number | null = null;
    const duration = 1200; // 1.2 second animation for better visibility

    const animateFlowersScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setFlowersScrollY(easeProgress * 800); // Animate from 0 to 800

      if (progress < 1) {
        requestAnimationFrame(animateFlowersScroll);
      } else {
        // Show the form after animation completes with a small delay
        setTimeout(() => {
          setShowConversionForm(true);
        }, 200);
      }
    };

    requestAnimationFrame(animateFlowersScroll);
  };

  const handleStartOver = () => {
    setIsExpanded(false);
    setHideRightPanel(false);
    setMapRevealed(false);
    setShowCTA(false);
    setShowConversionForm(false);
    setFlowersScrollY(0);
    setScrollY(0);
    setCurrentIndex(0);
    // Reset metric based on business type - retailers default to Peak sales hours (1), others to Average order value (0)
    setSelectedMetric(currentBusinessType === 'retailers' ? 1 : 0);
    setLocationInput('');
    setIsDropdownOpen(false);
    setIsChartDropdownOpen(false);
    setIsLocationDropdownOpen(false);
  };
  return (
    <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
      {/* Start Over button - upper left corner */}
      {isExpanded && (
        <button
          onClick={handleStartOver}
          className="absolute top-8 left-8 z-50 bg-white border border-[#d3d3d3] rounded-full px-6 py-3 flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2L4 8l6 6" />
          </svg>
          <span className="font-medium text-sm text-[rgba(0,0,0,0.9)]">Start over</span>
        </button>
      )}

      {/* Flowers background - scrolls up from bottom */}
      {isExpanded && flowersScrollY > 0 && (
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden z-10">
          <img
            src="/flowers-background.png"
            alt="Background"
            className="absolute w-full h-full object-cover"
            style={{
              transform: `translateY(${100 - Math.min(100, (flowersScrollY / 800) * 100)}%)`,
            }}
          />
        </div>
      )}

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
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden z-10">
          <img
            src="/map-neighborhood.png"
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
        onClick={() => {
          if (isExpanded && !mapRevealed) {
            handleRevealMap();
          }
        }}
        className={`absolute bg-white rounded-[10px] flex flex-col transition-all duration-700 ${
          hideRightPanel
            ? 'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[591px] p-10 gap-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1),0px_2px_16px_0px_rgba(0,0,0,0.1)] z-20'
            : 'left-[25%] -translate-x-1/2 w-[360px] p-5 gap-[30px] top-1/2 -translate-y-1/2 shadow-lg'
        } ${isExpanded && !mapRevealed ? 'cursor-pointer' : ''}`}
      >
        {/* Metric dropdown - only in expanded view, shown as eyebrow */}
        {isExpanded && (
          <>
            <div className="flex items-start justify-between w-full">
              <div className="relative flex items-center gap-[10px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsChartDropdownOpen(!isChartDropdownOpen);
                    setIsLocationDropdownOpen(false);
                  }}
                  className="flex items-center gap-[10px] hover:opacity-70 transition-opacity"
                >
                  <span className="font-medium text-xs uppercase tracking-[1.08px] text-black">
                    {metrics[selectedMetric]}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`transition-transform duration-200 ${
                      isChartDropdownOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M13.5 5.5L8 11L2.5 5.5"
                      stroke="#101010"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Metric Dropdown Menu */}
                {isChartDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-[#d3d3d3] rounded-2xl shadow-lg overflow-hidden z-30">
                    {metrics.map((metric, index) => (
                      <button
                        key={metric}
                        onClick={() => {
                          setSelectedMetric(index);
                          setIsChartDropdownOpen(false);
                        }}
                        className={`w-full px-5 py-3 text-left font-medium text-base hover:bg-gray-50 transition-colors whitespace-nowrap ${
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

              {/* Location indicator - only when map is revealed */}
              {mapRevealed && (
                <div className="flex items-center gap-[10px]">
                  {isEditingLocation ? (
                    <input
                      type="text"
                      value={tempLocation}
                      onChange={(e) => setTempLocation(e.target.value)}
                      onBlur={() => {
                        setEditableLocation(tempLocation);
                        setIsEditingLocation(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setEditableLocation(tempLocation);
                          setIsEditingLocation(false);
                        }
                      }}
                      autoFocus
                      className="font-medium text-xs uppercase tracking-[1.08px] text-black bg-transparent border-b border-black focus:outline-none min-w-[120px]"
                    />
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTempLocation(editableLocation);
                        setIsEditingLocation(true);
                      }}
                      className="font-medium text-xs uppercase tracking-[1.08px] text-black hover:opacity-70 transition-opacity"
                    >
                      {editableLocation}
                    </button>
                  )}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1.33334C5.42267 1.33334 3.33334 3.42267 3.33334 6.00001C3.33334 9.50001 8 14.6667 8 14.6667C8 14.6667 12.6667 9.50001 12.6667 6.00001C12.6667 3.42267 10.5773 1.33334 8 1.33334ZM8 7.66668C7.08 7.66668 6.33334 6.92001 6.33334 6.00001C6.33334 5.08001 7.08 4.33334 8 4.33334C8.92 4.33334 9.66667 5.08001 9.66667 6.00001C9.66667 6.92001 8.92 7.66668 8 7.66668Z"
                      fill="black"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Insight Text */}
            <div className="flex flex-col gap-[10px] w-full text-[#101010]">
              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px]">
                {currentMetric === 'Average order value' ? (
                  currentBusinessType === 'retailers'
                    ? (mapRevealed
                        ? `In ${editableLocation.split(',')[0]}, weekend lunch hours drive the highest order values`
                        : "Weekend shoppers consistently spend 28% more than weekday customers")
                    : (mapRevealed
                        ? `In ${editableLocation.split(',')[0]}, 7am hits peak order value at $24.20`
                        : "Our data shows morning rush between 7-9am beats lunch by 31%")
                ) : currentMetric === 'Peak sales hours' ? (
                  currentBusinessType === 'retailers'
                    ? (mapRevealed
                        ? `In ${editableLocation.split(',')[0]}, Friday and Saturday afternoons see peak traffic`
                        : "Weekend shopping drives 45% of weekly revenue in concentrated windows")
                    : (mapRevealed
                        ? `In ${editableLocation.split(',')[0]}, Thursday and Friday mornings are busiest`
                        : "Weekday mornings between 7-9am see the highest customer volume")
                ) : (
                  currentBusinessType === 'retailers'
                    ? (mapRevealed
                        ? `In ${editableLocation.split(',')[0]}, retailers see 21% year-over-year growth`
                        : "Spring and early summer months show the strongest growth trends")
                    : (mapRevealed
                        ? `In ${editableLocation.split(',')[0]}, coffee shops average 18% growth in Q2`
                        : "Early spring shows 22% higher growth compared to winter months")
                )}
              </p>
              <p className="font-normal text-base leading-[1.5]">
                {currentMetric === 'Average order value' ? (
                  currentBusinessType === 'retailers'
                    ? (mapRevealed
                        ? "Saturday 12pm-2pm shows the highest concentration of premium purchases."
                        : "Friday and Saturday between 11am-3pm consistently outperform other periods.")
                    : (mapRevealed
                        ? "That's 31% higher than the city-wide average of $18.50."
                        : "The average order value jumps from $18.50 to $24.20.")
                ) : currentMetric === 'Peak sales hours' ? (
                  currentBusinessType === 'retailers'
                    ? (mapRevealed
                        ? "Friday 10am-2pm and Saturday 11am-3pm show the densest traffic patterns."
                        : "Thursday-Saturday 10am-2pm consistently outperform all other time windows.")
                    : (mapRevealed
                        ? "Thursday and Friday 7-9am account for 35% of weekly morning revenue."
                        : "These hours generate 40% more transactions than afternoon periods.")
                ) : (
                  currentBusinessType === 'retailers'
                    ? (mapRevealed
                        ? "March through June drives the majority of annual growth acceleration."
                        : "Q2 growth rates are 45% higher than Q4 holiday-adjusted numbers.")
                    : (mapRevealed
                        ? "March and April show the steepest growth curves for local coffee shops."
                        : "The spring surge begins in March and peaks in late April.")
                )}
              </p>
            </div>
          </>
        )}

        {/* Metric eyebrow - Only in collapsed view */}
        {!isExpanded && (
          <div className="flex items-start justify-start w-full">
            <span className="font-medium text-xs uppercase tracking-[1.08px] text-black">
              {metrics[selectedMetric]}
            </span>
          </div>
        )}

        {/* Chart */}
        <div className="flex flex-col gap-[40px] w-full">
          <div className={`flex gap-[10px] h-[320px] transition-all duration-700 ${
            hideRightPanel ? 'w-full' : 'w-[320px]'
          }`}>
            {/* Y Axis Labels - Always visible */}
            <div className="flex flex-col justify-between pb-[25px] text-xs text-[#666666] tracking-[0.12px]">
              {currentMetric === 'Peak sales hours' && isExpanded ? (
                <>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </>
              ) : currentMetric === 'Peak sales hours' && currentBusinessType === 'retailers' ? (
                <>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </>
              ) : currentMetric === 'Sales growth' ? (
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
                {currentMetric === 'Peak sales hours' && isExpanded ? (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-full h-[1px] bg-[#f0f0f0] transition-all duration-700" />
                    ))}
                  </>
                ) : currentMetric === 'Peak sales hours' && currentBusinessType === 'retailers' ? (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-full h-[1px] bg-[#f0f0f0] transition-all duration-700" />
                    ))}
                  </>
                ) : (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-full h-[1px] bg-[#f0f0f0] transition-all duration-700" />
                    ))}
                  </>
                )}
              </div>

              {/* Bars - Fade out old, fade in new */}
              <div className="flex gap-[12px] items-end justify-end h-[295px] px-[10px] pb-px relative z-10">
                {isExpanded ? (
                  <>
                    {/* Expanded view: Dynamic rendering based on metric type */}
                    {currentMetric === 'Peak sales hours' ? (
                      <div className="w-full h-full flex flex-col gap-[2px] opacity-0 animate-[fadeIn_500ms_ease-in-out_forwards]">
                        {/* Heatmap grid visualization for Peak sales hours */}
                        {dataToDisplay.map((dayData: any, dayIndex: number) => (
                          <div key={dayIndex} className="flex gap-[2px] flex-1">
                            {dayData.hours.map((intensity: string, hourIndex: number) => {
                              const intensityColor = getIntensityColor(intensity);
                              return (
                                <div
                                  key={hourIndex}
                                  className={`flex-1 ${intensityColor} rounded-[1px] transition-all duration-300 hover:brightness-110 cursor-pointer`}
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
                        {/* Retailers: 4-day heatmap preview (Thu, Fri, Sat, Sun) with abbreviated hours */}
                        <div className="w-full h-full flex flex-col gap-[2px]">
                          {/* Get Thu-Sun data (indices 3-6 from the general data) */}
                          {chartDataByBusinessType['retailers']['Peak sales hours'].general.slice(3, 7).map((dayData: any, dayIndex: number) => (
                            <div key={dayIndex} className="flex gap-[2px] flex-1">
                              {/* Show only hours 9am-5pm (indices 0-8) for abbreviated view */}
                              {dayData.hours.slice(0, 9).map((intensity: string, hourIndex: number) => {
                                const intensityColor = getIntensityColor(intensity);
                                return (
                                  <div
                                    key={hourIndex}
                                    className={`flex-1 ${intensityColor} rounded-[1px] transition-all duration-200 hover:brightness-110 cursor-pointer`}
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
                        {['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm'].map((hour, index) => (
                          <div
                            key={index}
                            className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_forwards]"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {index === 0 || index === 3 || index === 6 || index === 9 || index === 13 ? hour : ''}
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
                        {['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'].map((hour, index) => (
                          <div key={index} className="flex-1 text-center transition-opacity duration-300">
                            {index === 0 || index === 4 || index === 8 ? hour : ''}
                          </div>
                        ))}
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
      </div>

      {/* Neighborhood Insights Card */}
      {showConversionForm && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 bg-white rounded-[10px] w-[591px] p-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1),0px_2px_16px_0px_rgba(0,0,0,0.1)] flex flex-col gap-10">
          {/* Heading */}
          <div className="flex flex-col gap-[10px]">
            <h2 className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-[#101010]">
              See your neighborhood insights
            </h2>
          </div>

          {/* Business Type Dropdown */}
          <div className="relative w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsBusinessTypeDropdownOpen(!isBusinessTypeDropdownOpen);
              }}
              className="w-full border border-[#959595] rounded-[100px] h-[64px] px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-[#666666]">
                {selectedBusinessType || 'Bakery'}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform duration-200 ${
                  isBusinessTypeDropdownOpen ? 'rotate-180' : ''
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
            </button>

            {/* Business Type Dropdown Menu */}
            {isBusinessTypeDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#d3d3d3] rounded-2xl shadow-lg overflow-hidden z-30">
                {['Bakery', 'Coffee shop', 'Restaurant', 'Retail store', 'Bar'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedBusinessType(type);
                      setIsBusinessTypeDropdownOpen(false);
                    }}
                    className={`w-full px-5 py-3 text-left font-medium text-base hover:bg-gray-50 transition-colors ${
                      selectedBusinessType === type
                        ? 'bg-gray-100 text-black'
                        : 'text-[rgba(0,0,0,0.9)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metric and Location Row */}
          <div className="flex items-center justify-between w-full">
            <div className="relative flex items-center gap-[10px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChartDropdownOpen(!isChartDropdownOpen);
                  setIsLocationDropdownOpen(false);
                }}
                className="flex items-center gap-[10px] hover:opacity-70 transition-opacity"
              >
                <span className="font-medium text-xs uppercase tracking-[1.08px] text-black">
                  {metrics[selectedMetric]}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${
                    isChartDropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M13.5 5.5L8 11L2.5 5.5"
                    stroke="#101010"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Metric Dropdown Menu */}
              {isChartDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-[#d3d3d3] rounded-2xl shadow-lg overflow-hidden z-40">
                  {metrics.map((metric, index) => (
                    <button
                      key={metric}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMetric(index);
                        setIsChartDropdownOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left font-medium text-base hover:bg-gray-50 transition-colors whitespace-nowrap ${
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
            <div className="flex items-center gap-[10px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTempLocation(editableLocation);
                  setIsEditingLocation(true);
                }}
                className="font-medium text-xs uppercase tracking-[1.08px] text-black hover:opacity-70 transition-opacity"
              >
                {editableLocation}
              </button>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.33334C5.42267 1.33334 3.33334 3.42267 3.33334 6.00001C3.33334 9.50001 8 14.6667 8 14.6667C8 14.6667 12.6667 9.50001 12.6667 6.00001C12.6667 3.42267 10.5773 1.33334 8 1.33334ZM8 7.66668C7.08 7.66668 6.33334 6.92001 6.33334 6.00001C6.33334 5.08001 7.08 4.33334 8 4.33334C8.92 4.33334 9.66667 5.08001 9.66667 6.00001C9.66667 6.92001 8.92 7.66668 8 7.66668Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          {/* Chart */}
          <div className="flex flex-col gap-[40px] w-full">
            <div className="flex gap-[10px] h-[320px]">
              {/* Y Axis Labels */}
              <div className="flex flex-col justify-between pb-[25px] text-xs text-[#666666] tracking-[0.12px]">
                {currentMetric === 'Peak sales hours' ? (
                  <>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </>
                ) : currentMetric === 'Sales growth' ? (
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
                {/* Grid Lines */}
                <div className="absolute left-[3px] right-0 top-0 bottom-[24px] flex flex-col justify-between z-0">
                  {currentMetric === 'Peak sales hours' ? (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-[#f0f0f0]" />
                      ))}
                    </>
                  ) : (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-[#f0f0f0]" />
                      ))}
                    </>
                  )}
                </div>

                {/* Bars/Chart Content */}
                <div className="flex gap-[12px] items-end justify-end h-[295px] px-[10px] pb-px relative z-10">
                  {currentMetric === 'Peak sales hours' ? (
                    <div className="w-full h-full flex flex-col gap-[2px]">
                      {/* Heatmap grid visualization for Peak sales hours */}
                      {dataToDisplay.map((dayData: any, dayIndex: number) => (
                        <div key={dayIndex} className="flex gap-[2px] flex-1">
                          {dayData.hours.map((intensity: string, hourIndex: number) => {
                            const intensityColor = getIntensityColor(intensity);
                            return (
                              <div
                                key={hourIndex}
                                className={`flex-1 ${intensityColor} rounded-[1px] transition-all duration-300 hover:brightness-110 cursor-pointer`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : currentMetric === 'Sales growth' ? (
                    <div className="w-full h-full relative">
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
                              {/* Invisible larger hover area */}
                              <circle cx={x} cy={y} r="12" fill="transparent" className="cursor-pointer" />
                              {/* Outer ring on hover */}
                              <circle
                                cx={x} cy={y} r="7"
                                fill="none" stroke="black" strokeWidth="1.5"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                              />
                              {/* Main dot */}
                              <circle cx={x} cy={y} r="4" fill="black" className="transition-all duration-200 pointer-events-none" />
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
                        const displayValue = `$${item.value}`;

                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col justify-end h-[294px] group relative"
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
                </div>

                {/* X Axis Labels */}
                <div className="flex gap-[12px] items-start justify-start px-[10px] text-xs text-[#666666] tracking-[0.12px]">
                  {currentMetric === 'Peak sales hours' ? (
                    <>
                      {['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm'].map((hour, index) => (
                        <div key={index} className="flex-1 text-center">
                          {index === 0 || index === 3 || index === 6 || index === 9 || index === 13 ? hour : ''}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {dataToDisplay.map((item: any, index: number) => (
                        <div key={index} className="flex-1 text-center">
                          {item.time}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-black text-white rounded-[30px] h-[56px] flex items-center justify-center px-5 py-3 hover:bg-gray-800 transition-colors font-medium text-base">
            Get my insights
          </button>
        </div>
      )}

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
