import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import { useTheme } from "./context/ThemeContext";
import 'aos/dist/aos.css';

AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { isDark } = useTheme();

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      const baseUrl = window.location.origin + "/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500">
        <Aurora
          key={isDark ? "dark-aurora" : "light-aurora"}
          colorStops={isDark ? ["#577870", "#1F97A6", "#127B99"] : ["#c4b5fd", "#93c5fd", "#67e8f9"]}
          blend={isDark ? 0.5 : 0.65}
          amplitude={isDark ? 1.0 : 0.85}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="hero grid md:grid-cols-2 items-center pt-8 md:pt-14 xl:gap-0 gap-8 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <div className="flex items-center gap-3 mb-6 bg-white/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700 w-fit p-3 px-4 rounded-2xl shadow-sm backdrop-blur-md transition-colors duration-300">
              <img src="/assets/farhan1.png" alt="Farhan" className="w-9 h-9 rounded-md object-cover" />
              <q className="font-medium text-sm sm:text-base">Commit And Push</q>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-zinc-900 dark:text-white transition-colors duration-300">
              <ShinyText text="Halo, Saya Farhan Maulana" disabled={false} speed={3} className="custom-class" />
            </h1>
            <BlurText
              text="Pengembang aplikasi dan web yang bersemangat dalam mengubah ide menjadi pengalaman digital yang modern, berkinerja tinggi, dan berpusat pada pengguna."
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-8 text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed transition-colors duration-300"
            />
            <div className="flex items-center sm:gap-4 gap-3 flex-wrap">
              <a 
                href="./assets/CV.pdf" 
                download="Farhan_maulana_CV.pdf" 
                className="font-semibold bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white p-3.5 sm:p-4 px-6 rounded-full border border-zinc-300 dark:border-gray-700 hover:bg-zinc-100 dark:hover:bg-[#222] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ShinyText text="Unduh CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a 
                href="#project" 
                className="font-semibold bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white p-3.5 sm:p-4 px-6 rounded-full border border-zinc-300 dark:border-gray-700 hover:bg-zinc-100 dark:hover:bg-[#222] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ShinyText text="Jelajahi Proyek Saya" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="md:ml-auto flex items-center justify-center animate__animated animate__fadeInUp animate__delay-4s">
            <ProfileCard
              name="Farhan Maulana"
              title="Pengembang Web Dan Mobile"
              handle="farhanmaulana"
              status="Online"
              contactText="Hubungi Saya"
              avatarUrl="./assets/farhan.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </div>

        {/* Tentang */}
        <div 
          ref={aboutRef}
          className="mt-20 sm:mt-28 mx-auto w-full max-w-[1600px] rounded-3xl border-[4px] border-violet-400/30 dark:border-violet-500/40 shadow-[0_10px_35px_rgba(168,85,247,0.12)] dark:shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-white via-violet-50/40 to-slate-50 dark:from-[#0a0a0a] dark:via-[#111111] dark:to-[#1a1a1a] p-6 sm:p-8 transition-colors duration-300" 
          id="about"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-2 sm:px-6" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-300/40 dark:border-violet-500/30 pb-8 md:pb-0">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-5 transition-colors duration-300">
                  Tentang Saya
                </h2>

                <BlurText
                  text="Saya Farhan Maulana, seorang pengembang full-stack yang berfokus pada pembuatan aplikasi modern dan berkinerja tinggi dengan pengalaman pengguna yang intuitif. Saya bekerja dengan berbagai macam teknologi, memanfaatkan teknologi terbaru seperti Kecerdasan Buatan (AI), Pembelajaran Mesin (Machine Learning), dan platform cloud untuk membangun solusi digital yang terukur dan berdampak. Dengan pengalaman lebih dari tiga tahun dan 10+ proyek yang telah diselesaikan, saya membantu bisnis dan pengguna berkembang melalui produk yang fungsional, efisien, dan disempurnakan secara visual."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-zinc-600 dark:text-gray-300 transition-colors duration-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-6 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1 font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                      10<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Proyek Selesai</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1 font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                      3<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Tahun Pengalaman</p>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
                    <h1 className="text-3xl md:text-4xl mb-1 font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                      3.90<span className="text-violet-500">/4.00</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">IPK</p>
                  </div>
                </div>

                <div className="pt-2">
                  <ShinyText
                    text="Bekerja dengan hati, berkreasi dengan pikiran."
                    disabled={false}
                    speed={3}
                    className="text-sm md:text-base font-semibold text-violet-600 dark:text-violet-400"
                  />
                </div>
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>

        {/* Alat & Teknologi */}
        <div className="tools mt-28 sm:mt-32">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-zinc-900 dark:text-white transition-colors duration-300" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            Alat & Teknologi
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-md transition-colors duration-300" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
            Keahlian Profesional Saya
          </p>
          <div className="tools-box mt-10 sm:mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {listTools.map((tool) => (
              <div
                key={tool.id} 
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay={tool.dad} 
                data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-800/80 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <img
                  src={tool.gambar}
                  alt={tool.nama}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-200 dark:group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-base sm:text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proyek */}
        <div className="proyek mt-28 sm:mt-32" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          <h1 className="text-center text-3xl sm:text-4xl font-bold mb-3 text-zinc-900 dark:text-white transition-colors duration-300" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            Proyek
          </h1>
          <p className="text-base text-center text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto transition-colors duration-300" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
            Menampilkan pilihan proyek yang mencerminkan keterampilan, kreativitas, dan hasrat saya dalam membangun pengalaman digital yang bermakna.
          </p>
          <div className="proyek-box mt-10 sm:mt-14">
            <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ChromaGrid
                items={listProyek}
                onItemClick={handleProjectClick}
                radius={500}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
              />
            </div>
          </div>
        </div>

        {/* Kontak & Obrolan */}
        <div className="kontak mt-28 sm:mt-32" id="contact">
          <h1
            className="text-3xl sm:text-4xl mb-3 font-bold text-center text-zinc-900 dark:text-white transition-colors duration-300"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Kontak & Obrolan
          </h1>
          <p
            className="text-base text-center mb-10 text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Hubungi saya atau mengobrol secara langsung (real-time)
          </p>

          {/* Container dua kolom */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Chat Room di kiri */}
            <div className="flex-1 w-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ChatRoom />
            </div>

            {/* Contact Form di kanan */}
            <div className="flex-1 w-full">
              <form
                action="https://formsubmit.co/farhancafe802@gmail.com"
                method="POST"
                className="bg-white/90 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 p-6 sm:p-10 w-full rounded-2xl shadow-md backdrop-blur-md transition-colors duration-300"
                autoComplete="off"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-zinc-700 dark:text-zinc-200">Nama Lengkap</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Masukkan Nama..."
                      className="border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-zinc-700 dark:text-zinc-200">Email</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder="Masukkan Email..."
                      className="border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold text-sm text-zinc-700 dark:text-zinc-200">Pesan</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="45"
                      rows="6"
                      placeholder="Tulis Pesan..."
                      className="border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors resize-none"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      className="font-semibold bg-violet-600 hover:bg-violet-700 text-white p-4 px-6 rounded-full w-full cursor-pointer shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 active:scale-98"
                    >
                      <ShinyText text="Kirim Pesan" disabled={false} speed={3} className="text-white" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}

export default App;
