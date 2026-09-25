

import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import Footer from "@/components/layout/Footer";
import EnterpriseHubVisual from "@/components/EnterpriseSections/EnterpriseHubVisual";
// import EnterpriseEcosystem from "@/components/EnterpriseSections/EnterpriseEcosystem";
import EnterpriseEcosystemFinal from "@/components/EnterpriseSections/EnterpriseEcosystemFinal";

import Image from '@/assets/images/lms2.png'

export default function Enterprise() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
  {/* Background image */}
  <div
    className="
      absolute
      inset-0
      scale-110
      bg-cover
      bg-center
      bg-no-repeat
      opacity-50

      
    "
    style={{
      backgroundImage: `url(${Image})`,
    }}
  />

  {/* Soft veil over the image */}
  <div className="absolute inset-0 bg-background/10" />

  {/* The corner grid, in this page's diagonal — PageGrid picks it from the
      URL. At 0 it sits on the photo and its veil (both unpositioned in the
      stack) and under the hero content, which is z-10. */}
  <PageGrid z={0} />

  {/* Hero content */}
  <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
    <Container>
      <div className="flex justify-center items-center gap-16 py-20  lg:gap-24">

        {/* Left — Content */}
        <div className="max-w-2xl backdrop-blur-sm">

          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#08243F]/10 bg-white/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-blue-900 " />
            Enterprise Learning
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl font-semibold tracking-[-0.04em] text-[#08243F] sm:text-6xl lg:text-7xl">
            Learning built for
            <span className="block text-[blue-900]">
              modern enterprises.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A powerful enterprise learning platform that brings
            training, cloud labs, certifications, and hands-on
            learning into one place.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="
                rounded-full
                bg-[#08243F]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#0d3153]
              "
            >
              Explore Enterprise
            </button>

            <button
              className="
                rounded-full
                border
                border-[#08243F]/15
                bg-white/70
                px-6
                py-3
                text-sm
                font-medium
                text-[#08243F]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white
              "
            >
              Talk to us
            </button>
          </div>
        </div>

        {/* Right — Platform hub animation */}
        {/* <div className="flex items-center justify-center">
          <EnterpriseHubVisual />
        </div> */}

      </div>
    </Container>
  </div>
</section>

 {/* Enterprise animated box */}

 {/* ===================================================== */}
{/* ENTERPRISE PLATFORM */}
{/* ===================================================== */}

<section className="relative overflow-hidden bg-blue-300 text-white">

  <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-2">

    {/* ================================================= */}
    {/* LEFT — TEXT */}
    {/* ================================================= */}

    <div className="relative flex items-center">

      {/* Subtle ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-[500px]
          w-[500px]
          -translate-y-1/2
          rounded-full
          bg-[#159447]/10
          blur-3xl
        "
      />

      <Container className="flex justify-center">
        <div className="relative z-10 max-w-xl py-24 lg:py-32">

          {/* Eyebrow */}
          {/* <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/5
              px-4
              py-2
              text-sm
              text-white/70
            "
          >
            <span className="h-2 w-2 rounded-full bg-blue-800" />

            One connected platform
          </div> */}
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            One connected platform
          </span>


          {/* Heading */}
          <h2
            className="
              font-heading
              text-4xl
              font-semibold
              leading-[1.05]
              tracking-[-0.04em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Everything your
            <span className="block text-blue-900">
              enterprise needs.
            </span>
          </h2>


          {/* Description */}
          <p
            className="
              mt-7
              max-w-lg
              text-lg
              leading-8
              text-white/65
            "
          >
            Connect enterprise learning, cloud labs, AI labs,
            certifications, and analytics through one unified
            learning ecosystem.
          </p>


          {/* Small supporting statement */}
          <div className="mt-10 flex items-center gap-4">

            <div className="h-px w-12 bg-[#159447]" />

            <p className="text-sm font-medium text-white/50">
              Built for modern enterprise learning
            </p>

          </div>

        </div>
      </Container>
    </div>


    {/* ================================================= */}
    {/* RIGHT — HUB VISUAL */}
    {/* ================================================= */}

    <div
      className="
        relative
        flex
        min-h-[560px]
        items-center
        justify-center
        overflow-hidden
        bg-white
        
        px-8
        py-20
        lg:min-h-0
      "
    >

      {/* Ambient green glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#159447]/10
          blur-[100px]
        "
      />


      {/* Ambient blue glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[400px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-400/10
          blur-[90px]
        "
      />


      {/* Hub */}
      <div className="relative z-10 w-full max-w-[560px]">
        <EnterpriseHubVisual />
      </div>

    </div>

  </div>

</section>

        {/* Learning tracks — tap or auto-advancing accordion */}
        <Container>
          {/* <EnterpriseEcosystem /> */}
          <EnterpriseEcosystemFinal/>
        </Container>
      </main>

      <Footer/>
    </>
  );
}

