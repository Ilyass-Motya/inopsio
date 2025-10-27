'use client'

export default function IndustrySolutions() {
  const industries = [
    {
      name: 'Manufacturing',
      icon: '🏭',
      description: 'Protect industrial control systems and production lines from cyber threats',
      features: ['OT Security', 'Supply Chain Protection', 'IoT Device Security']
    },
    {
      name: 'Government',
      icon: '🏛️',
      description: 'Secure critical infrastructure and sensitive government data',
      features: ['Classified Data Protection', 'National Security', 'Compliance Standards']
    },
    {
      name: 'Enterprise',
      icon: '🏢',
      description: 'Comprehensive security solutions for large-scale business operations',
      features: ['Enterprise Integration', 'Scalable Architecture', '24/7 Support']
    }
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className="bg-white rounded-xl shadow-lg border border-slate-200"
          style={{
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="p-6 sm:p-8 lg:p-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6">
            Industry Solutions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Tailored security solutions for your industry's unique challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{industry.name}</h3>
                <p className="text-slate-600 mb-6">{industry.description}</p>
              </div>
              
              <div className="space-y-3">
                {industry.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}
