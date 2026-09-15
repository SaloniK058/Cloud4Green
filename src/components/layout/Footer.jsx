// // import Container from "./Container";

// // export default function Footer() {
// //   return (
// //     <footer className="border-t rounded-t-[50px] py-10 bg-black w-full h-screen ">
// //       <Container >
// //         © 2026 Cloud4Green
// //       </Container>
// //     </footer>
// //   );
// // }

// import Container from "./Container";
// import { ArrowUpRight } from "lucide-react";
// import Logo from "../navbar/Logo";

// export default function Footer() {
//   return (
//     <footer className="w-full rounded-t-[50px] bg-black text-white">
//       <Container>
//         <div className="flex min-h-[80vh] flex-col justify-between py-20 lg:py-24">

//           {/* =========================
//               TOP — BRAND
//           ========================== */}
//           <div>
//             <div className="max-w-3xl">

//               <Logo placement="footer"/>
//               <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
//                 Cloud4Green
//               </p>

//               <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
//                 Building cloud-ready
//                 <br />
//                 <span className="text-white/40">
//                   teams for the future.
//                 </span>
//               </h2>

//               <p className="mt-8 max-w-xl text-base leading-7 text-white/50">
//                 Hands-on Cloud and AI Labs, enterprise learning platforms,
//                 and certification programs designed to turn learning into
//                 real-world capability.
//               </p>
//             </div>
//           </div>

//           {/* =========================
//               MIDDLE — NAVIGATION
//           ========================== */}
//           <div className="mt-24 grid grid-cols-2 gap-12 border-t border-white/10 pt-12 sm:grid-cols-4">

//             {/* Platform */}
//             <div>
//               <p className="mb-5 text-sm font-medium text-white/40">
//                 Platform
//               </p>

//               <div className="flex flex-col gap-3 text-sm">
//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Cloud & AI Labs
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   E-Learning 
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Enterprise LMS
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Certifications
//                 </a>
//               </div>
//             </div>

//             {/* Solutions */}
//             <div>
//               <p className="mb-5 text-sm font-medium text-white/40">
//                 Solutions
//               </p>

//               <div className="flex flex-col gap-3 text-sm">
//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Enterprise Learning
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Cloud Training
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   AI Training
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Hands-On Labs
//                 </a>
//               </div>
//             </div>

//             {/* Company */}
//             <div>
//               <p className="mb-5 text-sm font-medium text-white/40">
//                 Company
//               </p>

//               <div className="flex flex-col gap-3 text-sm">
//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   About
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Resources
//                 </a>

//                 <a
//                   href="#"
//                   className="text-white/70 transition-colors hover:text-white"
//                 >
//                   Contact
//                 </a>
//               </div>
//             </div>

//             {/* Connect */}
//             <div>
//               <p className="mb-5 text-sm font-medium text-white/40">
//                 Connect
//               </p>

//               <div className="flex flex-col gap-3 text-sm">
//                 <a
//                   href="#"
//                   className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
//                 >
//                   LinkedIn
//                   <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//                 </a>

//                 <a
//                   href="mailto:info@cloud4green.com"
//                   className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
//                 >
//                   Email us
//                   <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* =========================
//               BOTTOM
//           ========================== */}
//           <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">

//             <p>© 2026 Cloud4Green. All rights reserved.</p>

//             <div className="flex gap-6">
//               <a
//                 href="#"
//                 className="transition-colors hover:text-white"
//               >
//                 Privacy Policy
//               </a>

//               <a
//                 href="#"
//                 className="transition-colors hover:text-white"
//               >
//                 Terms of Service
//               </a>
//             </div>

//           </div>
//         </div>
//       </Container>
//     </footer>
//   );
// }

// // background: linear-gradient(90deg,rgba(0, 8, 66, 1) 0%, rgba(8, 11, 32, 1) 7%, rgba(8, 11, 32, 1) 93%, rgba(0, 8, 66, 1) 100%);

import Container from "./Container";
import { ArrowUpRight } from "lucide-react";
import Logo from "../navbar/Logo";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden rounded-t-[50px] bg-black text-white">

      <Container>
        <div className="relative z-10 flex min-h-[80vh] flex-col justify-between py-20 lg:py-24">

          {/* =========================
              TOP — BRAND
          ========================== */}
          <div>
            <div className="max-w-3xl">

              <Logo placement="footer" />

              <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
                Cloud4Green
              </p>

              <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Building cloud-ready
                <br />
                <span className="text-white/40">
                  teams for the future.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-base leading-7 text-white/50">
                Hands-on Cloud and AI Labs, enterprise learning platforms,
                and certification programs designed to turn learning into
                real-world capability.
              </p>

            </div>
          </div>


          {/* =========================
              MIDDLE — NAVIGATION
          ========================== */}
          <div className="mt-24 grid grid-cols-2 gap-12 border-t border-white/10 pt-12 sm:grid-cols-4">

            {/* Platform */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Platform
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Cloud & AI Labs
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  E-Learning
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Enterprise LMS
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Certifications
                </a>

              </div>
            </div>


            {/* Solutions */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Solutions
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Enterprise Learning
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Cloud Training
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  AI Training
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Hands-On Labs
                </a>

              </div>
            </div>


            {/* Company */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Company
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  About
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Resources
                </a>

                <a
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Contact
                </a>

              </div>
            </div>


            {/* Connect */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Connect
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <a
                  href="#"
                  className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
                >
                  LinkedIn

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      opacity-50
                      transition-transform
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>

                <a
                  href="mailto:info@cloud4green.com"
                  className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
                >
                  Email us

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      opacity-50
                      transition-transform
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>

              </div>
            </div>

          </div>


          {/* =========================
              BOTTOM
          ========================== */}
          <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 Cloud4Green. All rights reserved.
            </p>

            <div className="flex gap-6">

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Terms of Service
              </a>

            </div>

          </div>

        </div>
      </Container>


      {/* =========================
          GIANT CLOUD4GREEN WORDMARK
      ========================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-2rem]
          left-1/2
          z-0
          -translate-x-1/2
          select-none
          whitespace-nowrap
          font-heading
          text-[clamp(5rem,12vw,15rem)]
          font-semibold
          leading-none
          tracking-[-0.04em]
          text-white/[0.06]
        "
      >
        CLOUD4GREEN
      </div>

    </footer>
  );
}