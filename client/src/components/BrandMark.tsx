/** Fireside Editorial design: a warm, compact visual anchor with a temporary text wordmark. */
import { siteConfig } from "@/config/site";
import { SoundPawMotif } from "@/components/SoundPawMotif";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="/#home" className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75836D] focus-visible:ring-offset-2" aria-label={`${siteConfig.brandName} home`}>
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-[#75836D]/25 bg-[#e6dfcf] shadow-[0_5px_14px_rgba(82,67,46,.12)] transition-transform duration-200 group-hover:rotate-3 group-hover:scale-105">
        <img src={siteConfig.assets.logo} alt="" className="relative z-10 size-8 object-contain" />
        <SoundPawMotif className="absolute -bottom-1 -right-8 w-20 text-[#75836D]/45" />
      </span>
      {!compact && (
        <span className="hidden min-[440px]:block">
          <span className="block font-display text-[1.15rem] leading-none tracking-[-0.035em] text-[#342E27] dark:text-[#f5f0e8]">{siteConfig.brandName}</span>
          <span className="mt-1 block text-[0.61rem] font-bold uppercase tracking-[0.18em] text-[#75836D]">A quieter place for pet people</span>
        </span>
      )}
    </a>
  );
}
