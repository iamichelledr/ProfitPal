import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowRight, 
  Linkedin,
  Mail,
  Sparkles,
  Target,
  Code,
  BarChart3,
  CheckCircle2,
  FileText,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
}

export default function Team() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const teamMembers: TeamMember[] = [
    {
      name: 'Aaron John Bulambao',
      role: 'Project Leader',
      description: 'Leads project direction, planning, and coordination.',
      image: '/assets/team-aaron.png',
      icon: Target,
      color: 'from-pp-blue to-pp-blue-light'
    },
    {
      name: 'Michelle P. Del Rosario',
      role: 'Lead Developer',
      description: 'Builds and refines the platform\'s core functionality.',
      image: '/assets/team-michelle.jpg',
      icon: Code,
      color: 'from-pp-violet to-pp-violet-light'
    },
    {
      name: 'Ernelyn O. Perez',
      role: 'Business Analyst',
      description: 'Ensures the solution fits real user needs and business goals.',
      image: '/assets/team-ernelyn.png',
      icon: BarChart3,
      color: 'from-pp-green to-pp-green-light'
    },
    {
      name: 'Alyssa Mae J. De Lima',
      role: 'Quality Assurance',
      description: 'Checks accuracy, usability, and system reliability.',
      image: '/assets/team-alyssa.jpg',
      icon: CheckCircle2,
      color: 'from-amber-500 to-amber-400'
    },
    {
      name: 'Julie Anne P. Herbas',
      role: 'Content Strategist',
      description: 'Develops clear, user-friendly content and messaging.',
      image: '/assets/team-julie.jpg',
      icon: FileText,
      color: 'from-rose-500 to-rose-400'
    },
    {
      name: 'Regine R. Parabolos',
      role: 'UI/UX Designer',
      description: 'Designs the visual interface and user experience.',
      image: '/assets/team-regine.jpg',
      icon: Palette,
      color: 'from-cyan-500 to-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-soft relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-pp-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pp-violet/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pp-blue/10 text-pp-blue text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>Our Team</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-pp-dark mb-6">
              Meet the Team Behind{' '}
              <span className="text-gradient">ProfitPal</span>
            </h1>
            
            <p className="text-lg text-pp-slate">
              We are a multidisciplinary team building a simpler and smarter way 
              for micro-entrepreneurs to price with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="reveal-on-scroll group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-pp-light rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-pp-slate/10 to-pp-slate/5">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pp-dark/60 via-transparent to-transparent" />
                    
                    {/* Role Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${member.color} text-white text-sm font-medium`}>
                        <member.icon className="w-4 h-4" />
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-pp-dark mb-2">
                      {member.name}
                    </h3>
                    <p className="text-pp-slate text-sm mb-4">
                      {member.description}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-pp-blue/10 text-pp-blue hover:bg-pp-blue hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-pp-blue/10 text-pp-blue hover:bg-pp-blue hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-pp-blue/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-on-scroll text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pp-green/10 text-pp-green text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-6">
              Empowering Small Business Owners
            </h2>
            
            <p className="text-lg text-pp-slate mb-8">
              We believe that every entrepreneur deserves access to professional pricing tools. 
              Our mission is to democratize pricing intelligence and help micro-entrepreneurs 
              earn what they deserve.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { number: '10,000+', label: 'Calculations Made' },
                { number: '5,000+', label: 'Happy Users' },
                { number: '₱2M+', label: 'Profit Tracked' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                  <p className="text-3xl font-bold text-gradient mb-1">{stat.number}</p>
                  <p className="text-sm text-pp-slate">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <h2 className="font-heading text-3xl font-bold text-pp-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-pp-slate max-w-2xl mx-auto">
              The principles that guide everything we do at ProfitPal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Simplicity',
                description: 'We make complex pricing simple and accessible for everyone.',
                icon: Sparkles,
                color: 'pp-blue'
              },
              {
                title: 'Accuracy',
                description: 'Every calculation is precise and reliable, giving you confidence.',
                icon: CheckCircle2,
                color: 'pp-green'
              },
              {
                title: 'Accessibility',
                description: 'Professional tools should be available to all entrepreneurs.',
                icon: Users,
                color: 'pp-violet'
              },
              {
                title: 'Empowerment',
                description: 'We help you take control of your business finances.',
                icon: Target,
                color: 'amber-500'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="reveal-on-scroll text-center p-6 rounded-2xl bg-pp-light hover:shadow-soft transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-${value.color}/10 flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`w-7 h-7 text-${value.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-pp-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-pp-slate">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,white_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,white_0%,transparent_50%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Join Us in Our Mission
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Start using ProfitPal today and be part of a community of entrepreneurs 
              who price with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button 
                  size="lg" 
                  className="bg-white text-pp-blue hover:bg-white/90 px-8"
                >
                  Try Free Calculator
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
