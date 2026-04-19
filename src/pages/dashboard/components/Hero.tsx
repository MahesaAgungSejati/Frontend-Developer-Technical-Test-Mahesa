import heroImg from "../../../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden mb-10 group shadow-sm">
      
      <img
        src={heroImg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
          Beli Paket Data Lebih Cepat. <br className="hidden md:block" />
          Semuanya Ada Di Sini.
        </h1>
        <p className="text-sm md:text-lg text-gray-200 mb-8 max-w-2xl font-medium">
          Nikmati pengalaman internet tanpa batas dan temukan paket terbaik dari berbagai provider
        </p>
      </div>
    </div>
  );
};

export default Hero;