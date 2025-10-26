'use client'

export default function SecurityBadges() {
  const badges = [
    {
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality controls',
      icon: '🔒'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system',
      icon: '🛡️'
    },
    {
      name: 'GDPR Compliant',
      description: 'General Data Protection Regulation compliance',
      icon: '📋'
    },
    {
      name: 'FedRAMP Ready',
      description: 'Federal Risk and Authorization Management Program',
      icon: '🏛️'
    },
    {
      name: 'HIPAA Compliant',
      description: 'Health Insurance Portability and Accountability Act',
      icon: '🏥'
    },
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      icon: '💳'
    }
  ]

  return (
    <section 
      className="py-16 sm:py-20 lg:py-24 bg-white rounded-xl shadow-lg border border-slate-200"
      style={{
        marginLeft: '50px',
        marginRight: '50px',
        marginBottom: '20px'
      }}
    >
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6">
            Security & Compliance
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Certified security standards and compliance frameworks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{badge.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{badge.name}</h3>
                </div>
              </div>
              <p className="text-slate-600 text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
