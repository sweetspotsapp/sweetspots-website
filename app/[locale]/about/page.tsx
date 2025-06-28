import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useTranslations } from "next-intl";
import {
  Briefcase,
  GraduationCap,
  Linkedin,
  Globe,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const t = useTranslations("about");

  const founders = [
    {
      key: "razak",
      image: "/images/about-us/razak.png",
      linkedin: "https://www.linkedin.com/in/muhammad-ilham-razak",
    },
    {
      key: "farizio",
      image: "/images/about-us/zio.png",
      linkedin: "https://www.linkedin.com/in/farizio-kautsar-heruzy/",
      website: "https://farizio.io",
    },
    {
      key: "kasipang",
      image: "/images/about-us/kao.png",
      linkedin: "https://www.linkedin.com/in/kao-kasipang/",
      website: "https://kaokasi.github.io/",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-100 via-rose-50 to-rose-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {founders.map((founder, index) => (
              <div
                key={founder.key}
                className="text-center space-y-6 animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Profile Image */}
                <Image
                  src={founder.image}
                  alt={t(`founders.${founder.key}.name`)}
                  width={200}
                  height={200}
                  objectFit="contain"
                  className="w-full object-contain h-96 rounded-2xl"
                  priority={index === 0}
                />
                {/* <div className="relative mx-auto w-64 h-64 bg-gradient-to-br from-emerald-50 to-rose-50 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 hover:shadow-lg">
                  <User className="h-24 w-24 text-gray-400" />
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Profile Photo</span>
                  </div>
                </div> */}

                {/* Founder Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-gray-900">
                      {t(`founders.${founder.key}.name`)}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <Briefcase className="h-4 w-4" />
                      <p className="font-semibold">
                        {t(`founders.${founder.key}.role`)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                    {founder.website && (
                      <a
                        href={founder.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        <Globe className="h-6 w-6" />
                      </a>
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed text-left max-w-md mx-auto">
                    {t(`founders.${founder.key}.bio`)}
                  </p>

                  {/* Education/Experience Icons */}
                  <div className="flex justify-center space-x-4 pt-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-sm">Monash University</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-100 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-serif text-gray-900">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe travel planning should be exciting, not exhausting. Our
              diverse team brings together expertise in business development,
              technology, and design to create a platform that makes discovering
              and planning your perfect trip effortless and enjoyable.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From our studies at Monash University to our combined experience
              in startups across Australia, Indonesia, and Thailand, we
              understand the challenges travelers face and are passionate about
              solving them.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
