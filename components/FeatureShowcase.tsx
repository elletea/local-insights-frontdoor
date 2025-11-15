'use client';

export default function FeatureShowcase() {
  const features = [
    {
      title: 'AI-powered suggestions',
      description: 'Get instant answers about your local market with conversational AI insights tailored to your neighborhood.',
      image: 'ai-chat',
    },
    {
      title: 'Revenue analytics',
      description: 'Track your performance with detailed charts showing trends over time and compare against local benchmarks.',
      image: 'analytics',
    },
    {
      title: 'Smart prompts',
      description: 'Quick-start questions help you discover the insights that matter most to growing your business.',
      image: 'prompts',
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-normal text-black mb-4 tracking-tight-2">
            Local insights, powered by AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understand your neighborhood market with data from millions of Square businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Feature Image Placeholder */}
              <div className="aspect-[4/3] bg-gray-100 relative">
                {feature.image === 'ai-chat' && (
                  <div className="absolute inset-0 p-8 flex flex-col justify-center">
                    <div className="bg-white rounded-2xl p-4 shadow-lg mb-3">
                      <p className="text-sm text-gray-600">What are the most popular menu items in my area?</p>
                    </div>
                    <div className="bg-black text-white rounded-2xl p-4 shadow-lg">
                      <p className="text-sm mb-2">Here's a list based on reviews:</p>
                      <ul className="text-xs space-y-1 text-gray-300">
                        <li>• Spaghetti Carbonara</li>
                        <li>• Lasagna al Forno</li>
                        <li>• Tagliatelle al Ragù</li>
                      </ul>
                    </div>
                  </div>
                )}

                {feature.image === 'analytics' && (
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <div className="w-full">
                      <div className="flex items-end justify-between h-32 gap-2">
                        <div className="bg-gray-300 w-full rounded-t" style={{ height: '40%' }}></div>
                        <div className="bg-gray-300 w-full rounded-t" style={{ height: '60%' }}></div>
                        <div className="bg-gray-300 w-full rounded-t" style={{ height: '80%' }}></div>
                        <div className="bg-black w-full rounded-t" style={{ height: '100%' }}></div>
                        <div className="bg-black w-full rounded-t" style={{ height: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {feature.image === 'prompts' && (
                  <div className="absolute inset-0 p-8 flex flex-col justify-center gap-3">
                    <button className="bg-white border-2 border-gray-200 rounded-xl p-3 text-left text-sm hover:border-black transition-colors">
                      What are my top selling items?
                    </button>
                    <button className="bg-white border-2 border-gray-200 rounded-xl p-3 text-left text-sm hover:border-black transition-colors">
                      When do customers visit most?
                    </button>
                    <button className="bg-white border-2 border-gray-200 rounded-xl p-3 text-left text-sm hover:border-black transition-colors">
                      How do my costs compare?
                    </button>
                  </div>
                )}
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
