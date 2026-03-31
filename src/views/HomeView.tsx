import Hero from '../components/home/Hero';
import Introduction from '../components/home/Introduction';
import TruthSection from '../components/home/TruthSection';
import Achievements from '../components/home/Achievements';
import JoinSection from '../components/home/JoinSection';
import SectionDivider from '../components/common/SectionDivider';

const HomeView = () => {
  return (
    <div className="relative ed-vignette" style={{ background: '#F5EDE0' }}>
      {/* Hero + Introduction: warm tonal background, editorial feel */}
      <div className="relative">
        {/* Ambient radial warmth — replaces galaxy for editorial style */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 55% at 50% 10%, rgba(194,123,32,0.14) 0%, transparent 60%),
                radial-gradient(ellipse 60% 40% at 20% 60%, rgba(61,37,16,0.07) 0%, transparent 55%),
                radial-gradient(ellipse 50% 40% at 80% 40%, rgba(194,123,32,0.08) 0%, transparent 55%),
                #F5EDE0
              `,
            }}
          />
          {/* Decorative soft rings for depth */}
          <div
            className="absolute"
            style={{
              top: '8%', right: '5%',
              width: 'min(520px, 55vw)', height: 'min(520px, 55vw)',
              borderRadius: '50%',
              border: '1px solid rgba(194,123,32,0.1)',
              pointerEvents: 'none',
            }}
          />
          <div
            className="absolute"
            style={{
              top: 'calc(8% + 40px)', right: 'calc(5% + 40px)',
              width: 'min(440px, 47vw)', height: 'min(440px, 47vw)',
              borderRadius: '50%',
              border: '1px solid rgba(194,123,32,0.06)',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div className="relative z-10">
          <Hero />
          <Introduction />
        </div>
      </div>

      <SectionDivider compact />
      <TruthSection />
      <SectionDivider />
      <Achievements />
      <SectionDivider />
      <JoinSection />
    </div>
  );
};

export default HomeView;
