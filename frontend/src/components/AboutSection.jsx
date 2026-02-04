import { Leaf, Truck, Medal } from "lucide-react";
import React from "react";

const AboutSection = () => {
  const sustainabilityFeatures = [
    {
      title: "Organic Growing",
      description: "Sustainably grown using organic methods",
      icon: <Leaf />
    },
    {
      title: "Fast Delivery",
      description: "Free shipping on orders over ₹1000",
      icon: <Truck />
    },
    {
      title: "Quality Guarantee",
      description: "30-day guarantee on all plants",
      icon: <Medal />
    }
  ];

  return (
    <section className="bg-white px-4 md:px-10 py-14">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-16">
          <div className="space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              About Us
            </span>

            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Growing together since 2003
            </h2>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We believe everyone deserves a little green in their life. Our mission
              is to make plant ownership simple, enjoyable, and sustainable for all.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Every plant is carefully selected and nurtured in our greenhouse before
              reaching your home. From eco-friendly packaging to responsible sourcing,
              sustainability is at the core of what we do.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  20+
                </h3>
                <p className="text-xs text-gray-500">Years Experience</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  5000+
                </h3>
                <p className="text-xs text-gray-500">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  150+
                </h3>
                <p className="text-xs text-gray-500">Plant Varieties</p>
              </div>
            </div>
          </div>

          <div>
            <img
              src="/outdoor.jpg"
              alt="Outdoor plants"
              className="w-full h-[300px] md:h-[420px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Features */}
        <div className="md:grid md:grid-cols-3 md:gap-8 flex gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {sustainabilityFeatures.map((data, index) => (
            <div
              key={index}
              className="min-w-[240px] md:min-w-0 flex items-start gap-4 border border-gray-200 rounded-xl p-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                {React.cloneElement(data.icon, { size: 20 })}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {data.title}
                </h4>
                <p className="text-xs text-gray-600 leading-snug">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
