export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16 bg-[#FAF8F1]">
      {/* Hero Section - Charcoal text on Ivory */}
      <div className="py-16 md:py-24 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#212529]">About NextGen EV</h1>
          <div className="w-24 h-1 bg-[#212529] mx-auto mb-8"></div>
          <p className="text-xl text-[#212529] max-w-3xl mx-auto">
            Pioneering the future of electric mobility in India with innovation, sustainability, and cutting-edge technology
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#212529]">Our Story</h2>
          <div className="w-24 h-1 bg-[#A8E600] mx-auto mb-12"></div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-[#212529]">
            <p>
              NextGen EV is a pioneering electric vehicle manufacturer based in India, committed to 
              revolutionizing the future of sustainable transportation. Founded with a vision to create 
              eco-friendly mobility solutions tailored for Indian road conditions, we combine cutting-edge 
              technology with practical design.
            </p>
            
            <p>
              Our state-of-the-art manufacturing facility employs advanced engineering techniques to 
              produce high-performance electric vehicles that are both affordable and reliable. Every 
              vehicle undergoes rigorous testing to ensure it meets our strict quality standards.
            </p>
            
            <p>
              With a dedicated team of engineers, designers, and customer support professionals, NextGen EV 
              is more than just a vehicle manufacturer—we're building a sustainable future for India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-[#FAF8F1] p-8 rounded-xl text-center border-2 border-[#007BFF] shadow-lg hover:shadow-xl transition">
              <div className="text-5xl font-bold text-[#007BFF] mb-2">10+</div>
              <p className="text-[#212529] font-semibold">Years Experience</p>
            </div>
            <div className="bg-[#FAF8F1] p-8 rounded-xl text-center border-2 border-[#A8E600] shadow-lg hover:shadow-xl transition">
              <div className="text-5xl font-bold text-[#A8E600] mb-2">50+</div>
              <p className="text-[#212529] font-semibold">Cities Covered</p>
            </div>
            <div className="bg-[#FAF8F1] p-8 rounded-xl text-center border-2 border-[#007BFF] shadow-lg hover:shadow-xl transition">
              <div className="text-5xl font-bold text-[#007BFF] mb-2">80K+</div>
              <p className="text-[#212529] font-semibold">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Wheeler Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-6xl mr-4">🛵</div>
            <h2 className="text-4xl font-bold text-[#212529]">2-Wheeler Electric Scooters</h2>
          </div>
          <div className="w-24 h-1 bg-[#007BFF] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#007BFF]">
              <h3 className="text-2xl font-bold mb-4 text-[#007BFF]">Design & Performance</h3>
              <ul className="space-y-3 text-[#212529]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Lightweight Chassis:</strong> Aluminum alloy frame for better handling</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Powerful Motor:</strong> 2500W-3000W BLDC hub motor</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Top Speed:</strong> Up to 75 km/h</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Range:</strong> 100-120 km per charge</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Smart Features:</strong> Digital display, mobile app connectivity</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#A8E600]">
              <h3 className="text-2xl font-bold mb-4 text-[#A8E600]">Safety Features</h3>
              <ul className="space-y-3 text-[#212529]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Advanced Braking:</strong> Combined braking system (CBS)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>LED Lighting:</strong> Bright LED headlamps and taillights</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Anti-Theft:</strong> GPS tracking and remote immobilization</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Tubeless Tires:</strong> Better grip and puncture resistance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>IP67 Rating:</strong> Water and dust resistant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Wheeler Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-6xl mr-4">🚛</div>
            <h2 className="text-4xl font-bold text-[#212529]">3-Wheeler Cargo Vehicles</h2>
          </div>
          <div className="w-24 h-1 bg-[#A8E600] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF8F1] p-8 rounded-xl shadow-lg border-2 border-[#A8E600]">
              <h3 className="text-2xl font-bold mb-4 text-[#A8E600]">Commercial Excellence</h3>
              <ul className="space-y-3 text-[#212529]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Payload Capacity:</strong> 500-700 kg</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Cargo Volume:</strong> 2.5-3 cubic meters</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Range:</strong> 120-150 km per charge</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Motor Power:</strong> 5000W BLDC motor</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#007BFF] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Durability:</strong> Heavy-duty steel chassis</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAF8F1] p-8 rounded-xl shadow-lg border-2 border-[#007BFF]">
              <h3 className="text-2xl font-bold mb-4 text-[#007BFF]">Business Benefits</h3>
              <ul className="space-y-3 text-[#212529]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Cost Savings:</strong> 80% lower running cost vs diesel</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Low Maintenance:</strong> Minimal moving parts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Fleet Management:</strong> Real-time tracking and analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Zero Emissions:</strong> Eligible for government subsidies</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Fast ROI:</strong> Payback within 18-24 months</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Battery Technology Section - Charcoal Background with Off-White Text */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#212529] text-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-6xl mr-4">🔋</div>
            <h2 className="text-4xl font-bold">Advanced Battery Technology</h2>
          </div>
          <div className="w-24 h-1 bg-[#A8E600] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#007BFF]/20 p-8 rounded-xl border-2 border-[#007BFF]">
              <h3 className="text-2xl font-bold mb-4 text-[#A8E600]">Lithium-Ion Battery</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Capacity:</strong> 48V/60V/72V options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Energy Density:</strong> 150-200 Wh/kg</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Cycle Life:</strong> 1500-2000 cycles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Temperature Range:</strong> -20°C to 60°C</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Weight:</strong> 20-30 kg (removable)</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#A8E600]/20 p-8 rounded-xl border-2 border-[#A8E600]">
              <h3 className="text-2xl font-bold mb-4 text-[#007BFF]">Battery Management System</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#007BFF] mr-2">•</span>
                  <span><strong>Smart BMS:</strong> Real-time monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#007BFF] mr-2">•</span>
                  <span><strong>Overcharge Protection:</strong> Automatic cutoff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#007BFF] mr-2">•</span>
                  <span><strong>Temperature Control:</strong> Thermal management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#007BFF] mr-2">•</span>
                  <span><strong>Cell Balancing:</strong> Extended battery life</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#007BFF] mr-2">•</span>
                  <span><strong>Safety Certified:</strong> BIS and AIS certified</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#007BFF]/20 p-8 rounded-xl border-2 border-[#007BFF]">
              <h3 className="text-2xl font-bold mb-4 text-[#A8E600]">Warranty & Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Battery Warranty:</strong> 3 years / 50,000 km</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Performance:</strong> 70% capacity guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Free Service:</strong> First 2 services free</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Replacement:</strong> Battery swap program</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2">•</span>
                  <span><strong>Recycling:</strong> 100% recyclable components</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Charging Details Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-6xl mr-4">⚡</div>
            <h2 className="text-4xl font-bold text-[#212529]">Charging Infrastructure</h2>
          </div>
          <div className="w-24 h-1 bg-[#007BFF] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#007BFF]">
              <h3 className="text-2xl font-bold mb-6 text-[#007BFF]">Home Charging</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#A8E600] pl-4">
                  <h4 className="font-bold text-lg text-[#212529] mb-2">Standard Charger (3A)</h4>
                  <p className="text-[#212529]">Charging Time: 6-8 hours | Input: 230V AC | Portable</p>
                </div>
                <div className="border-l-4 border-[#A8E600] pl-4">
                  <h4 className="font-bold text-lg text-[#212529] mb-2">Fast Charger (10A)</h4>
                  <p className="text-[#212529]">Charging Time: 3-4 hours | Input: 230V AC | Wall-mounted</p>
                </div>
                <div className="bg-[#FAF8F1] p-4 rounded-lg mt-4 border-l-4 border-[#007BFF]">
                  <p className="text-[#212529]"><strong>💡 Home Setup:</strong> Simply plug into any standard 15A socket. No special installation required for basic charging.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#A8E600]">
              <h3 className="text-2xl font-bold mb-6 text-[#A8E600]">Public Charging</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#007BFF] pl-4">
                  <h4 className="font-bold text-lg text-[#212529] mb-2">DC Fast Charging</h4>
                  <p className="text-[#212529]">Charging Time: 45-60 minutes | 0-80% charge | Available at stations</p>
                </div>
                <div className="border-l-4 border-[#007BFF] pl-4">
                  <h4 className="font-bold text-lg text-[#212529] mb-2">Battery Swapping</h4>
                  <p className="text-[#212529]">Swap Time: 2-3 minutes | Full battery exchange | Coming soon</p>
                </div>
                <div className="bg-[#FAF8F1] p-4 rounded-lg mt-4 border-l-4 border-[#A8E600]">
                  <p className="text-[#212529]"><strong>🔍 Station Finder:</strong> Use our mobile app to locate 500+ charging stations across India.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charging Features - Electric Blue to Lime Green Gradient */}
          <div className="bg-gradient-to-r from-[#007BFF] to-[#A8E600] p-8 rounded-xl text-[#F8F9FA] shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Smart Charging Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <h4 className="font-bold mb-2">App Control</h4>
                <p className="text-sm opacity-90">Start/stop charging remotely</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⏰</div>
                <h4 className="font-bold mb-2">Scheduled Charging</h4>
                <p className="text-sm opacity-90">Set charging times for off-peak rates</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <h4 className="font-bold mb-2">Usage Analytics</h4>
                <p className="text-sm opacity-90">Track charging costs and patterns</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔔</div>
                <h4 className="font-bold mb-2">Notifications</h4>
                <p className="text-sm opacity-90">Alerts when charging complete</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
