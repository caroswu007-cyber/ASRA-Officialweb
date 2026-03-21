import Hero from '../components/home/Hero';
import Introduction from '../components/home/Introduction';
import TruthSection from '../components/home/TruthSection';
import Achievements from '../components/home/Achievements';
import JoinSection from '../components/home/JoinSection';
import SectionDivider from '../components/common/SectionDivider';
import GalaxyBackground from '../components/common/GalaxyBackground';
import { warmImagery } from '../content/visualTheme';
import { useI18n } from '../i18n/LocaleProvider';

const HomeView = () => {
  const { t } = useI18n();
  return (
    <div className="relative bg-[#120e0c]">
      {/* Hero + Introduction: one column so galaxy + nebula fill the full scroll height */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-[#120e0c]" />
          <GalaxyBackground />
          {/* Warm golden-hour wash over soft light spiral */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(0,0,0,0) 0%,
                rgba(40,24,16,0.08) 22%,
                rgba(55,28,18,0.14) 45%,
                rgba(45,22,28,0.2) 68%,
                rgba(28,14,22,0.28) 100%
              )`,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${warmImagery.homeAtmosphere})`,
              opacity: 0.42,
              mixBlendMode: 'soft-light',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, transparent 26%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.82) 76%, black 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, transparent 26%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.82) 76%, black 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(18,12,10,0.28) 0%,
                rgba(18,12,10,0.08) 28%,
                transparent 46%,
                transparent 52%,
                rgba(20,14,12,0.12) 72%,
                rgba(18,12,10,0.55) 88%,
                rgba(18,12,10,0.85) 100%
              )`,
            }}
          />
        </div>

        <div className="relative z-10">
          <Hero />
          <Introduction />
        </div>
      </div>

      <SectionDivider label={t('home.divider.documentary')} compact />
      <TruthSection />
      <SectionDivider label={t('home.divider.discoveries')} />
      <Achievements />
      <SectionDivider label={t('home.divider.join')} />
      <JoinSection />
    </div>
  );
};

export default HomeView;
