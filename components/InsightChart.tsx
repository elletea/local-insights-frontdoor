'use client';

import { useState } from 'react';

const hourlyData = [
  { hour: '6am', value: 16.2, orders: 45, label: '6-7am' },
  { hour: '7am', value: 24.2, orders: 189, label: '7-8am', highlight: true },
  { hour: '8am', value: 23.8, orders: 156, label: '8-9am', highlight: true },
  { hour: '9am', value: 19.4, orders: 98, label: '9-10am' },
  { hour: '10am', value: 18.1, orders: 67, label: '10-11am' },
  { hour: '11am', value: 17.8, orders: 72, label: '11am-12pm' },
  { hour: '12pm', value: 19.2, orders: 134, label: '12-1pm' },
  { hour: '1pm', value: 18.9, orders: 112, label: '1-2pm' },
  { hour: '2pm', value: 16.5, orders: 89, label: '2-3pm' },
  { hour: '3pm', value: 15.2, orders: 78, label: '3-4pm' },
  { hour: '4pm', value: 16.8, orders: 94, label: '4-5pm' },
  { hour: '5pm', value: 18.3, orders: 103, label: '5-6pm' },
];

export default function InsightChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const maxValue = Math.max(...hourlyData.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Average Order Value by Hour
        </h3>
        <p className="text-slate-600">
          San Francisco Coffee Shops • Based on 127,000+ transactions
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-80 mb-8">
        <div className="absolute inset-0 flex items-end justify-between gap-2 px-4">
          {hourlyData.map((data, index) => {
            const heightPercent = (data.value / maxValue) * 100;
            const isHovered = hoveredBar === index;
            const isHighlight = data.highlight;

            return (
              <div
                key={data.hour}
                className="relative flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl z-10 whitespace-nowrap">
                    <div className="text-sm font-semibold mb-1">{data.label}</div>
                    <div className="text-2xl font-bold text-blue-400">
                      ${data.value.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      {data.orders} orders
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isHighlight
                      ? 'bg-gradient-to-t from-orange-500 to-red-500'
                      : 'bg-gradient-to-t from-blue-400 to-blue-600'
                  } ${isHovered ? 'opacity-100 scale-105' : 'opacity-90'}`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {isHighlight && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                      Peak Hours
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="mt-2 text-xs text-slate-600 font-medium -rotate-45 origin-top-left">
                  {data.hour}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight Callout */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Why This Matters</h4>
            <p className="text-slate-700 mb-3">
              Morning commuters spend <strong>31% more per order</strong> than the daily
              average. They're ordering premium drinks, adding food, and tipping higher.
            </p>
            <p className="text-sm text-slate-600">
              <strong>Action:</strong> Coffee shops that optimize staffing and inventory
              for 7-9am see 23% higher daily revenue. Most don't realize this opportunity
              exists.
            </p>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live data updated hourly</span>
        </div>
        <div>Source: Square Network</div>
      </div>
    </div>
  );
}
