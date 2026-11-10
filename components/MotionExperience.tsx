"use client";

import { useEffect, useState } from "react";

export function MotionExperience() {
  const [introVisible, setIntroVisible] = useState(true);
  const introParticles = Array.from({ length: 28 }, (_, index) => ({
    id: index,
    x: `${(index * 37) % 100}%`,
    y: `${(index * 61) % 100}%`,
    size: `${2 + (index % 3)}px`,
    delay: `${(index % 9) * 0.18}s`,
    duration: `${2.8 + (index % 5) * 0.45}s`,
  }));
  const introLines = Array.from({ length: 7 }, (_, index) => index);

  useEffect(() => {
    const root = document.documentElement;
    const updateMotion = (event?: MouseEvent) => {
      root.style.setProperty("--page-shift", `${Math.min(window.scrollY * -0.08, 0)}px`);
      if (event) {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
      }
    };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-revealed"); });
    }, { threshold: 0.12 });
    const observedRevealItems = new WeakSet<Element>();
    const observeRevealItems = (scope: ParentNode = document) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
        if (!observedRevealItems.has(item)) {
          observedRevealItems.add(item);
          revealObserver.observe(item);
        }
      });
    };
    observeRevealItems();
    const pageMutationObserver = new MutationObserver(() => observeRevealItems());
    pageMutationObserver.observe(document.body, { childList: true, subtree: true });
    updateMotion();
    const onScroll = () => updateMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", updateMotion);
    const intro = window.setTimeout(() => setIntroVisible(false), 2500);
    return () => {
      window.clearTimeout(intro);
      revealObserver.disconnect();
      pageMutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", updateMotion);
    };
  }, []);

  return <>
    <div className="site-grain" aria-hidden="true" />
    <div className="cursor-orbit" aria-hidden="true"><span /></div>
    {introVisible && <div className="cinematic-intro" aria-label="Crown & Cavalier"><div className="intro-particle-field" aria-hidden="true">{introParticles.map((particle) => <span key={particle.id} style={{ "--particle-x": particle.x, "--particle-y": particle.y, "--particle-size": particle.size, "--particle-delay": particle.delay, "--particle-duration": particle.duration } as React.CSSProperties} />)}</div><div className="intro-line-field" aria-hidden="true">{introLines.map((line) => <span key={line} />)}</div><div className="intro-line" /><p>HYDERABAD · INDIA</p><strong className="intro-type" aria-label="Crown & Cavalier">{Array.from("CROWN & CAVALIER").map((character, index) => <span key={`${character}-${index}`}>{character === " " ? "\u00a0" : character}</span>)}</strong><small>LEGACY WOVEN INTO EVERY STITCH</small><i /></div>}
  </>;
}
