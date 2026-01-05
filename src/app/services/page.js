export default function ServicesPage() {
  const services = [
    {
      icon: '🔧',
      title: 'Maintenance Service',
      description: 'Regular maintenance and servicing for optimal performance',
      features: ['Battery health check', 'Motor inspection', 'Brake system check', 'Software updates'],
    },
    {
      icon: '🔋',
      title: 'Battery Service',
      description: 'Comprehensive battery care and replacement services',
      features: ['Battery health diagnostics', 'Warranty claims', 'Battery replacement', 'Charging optimization'],
    },
    {
      icon: '🚗',
      title: 'Roadside Assistance',
      description: '24/7 emergency roadside assistance across India',
      features: ['Emergency charging', 'Towing service', 'On-spot repairs', 'Battery jump-start'],
    },
    {
      icon: '📱',
      title: 'Mobile Service',
      description: 'Doorstep service for your convenience',
      features: ['At-home servicing', 'Pickup & drop', 'Mobile diagnostics', 'Quick repairs'],
    },
    {
      icon: '🛡️',
      title: 'Extended Warranty',
      description: 'Comprehensive warranty packages for peace of mind',
      features: ['Extended coverage', 'Zero depreciation', 'Consumables included', 'Transferable warranty'],
    },
    {
      icon: '📊',
      title: 'Performance Monitoring',
      description: 'Real-time vehicle performance tracking and analytics',
      features: ['App-based monitoring', 'Usage analytics', 'Efficiency reports', 'Predictive maintenance'],
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      <div className="py-16 md:py-24 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-8">Our Services</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive service packages designed to keep your NextGen EV running smoothly and efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
