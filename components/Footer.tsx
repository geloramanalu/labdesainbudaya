import React from 'react'
import { Instagram, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#2D2D2D] text-white pt-16 pb-8 px-6 flex flex-col items-center text-center overflow-hidden">
      
      <div className="mb-8 ">
        <svg 
            width="56" 
            height="44" 
            viewBox="0 0 28 22" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
        >
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M8.26095 0.151944C8.01634 0.271332 7.89179 0.416117 7.80175 0.685537C7.6909 1.01756 7.71392 1.24275 8.02746 2.88776C8.77768 6.82393 8.85774 7.42481 8.87136 9.21835C8.88641 11.1998 8.84863 11.3205 7.94002 12.1949C7.53787 12.5819 7.11961 12.86 6.49875 13.1533C5.4045 13.6705 4.54986 13.9015 2.84338 14.1413C1.3324 14.3537 1.04081 14.4396 0.655252 14.7857C0.191258 15.2022 -0.00396625 15.5983 6.09763e-05 16.1146C0.00533472 16.7748 0.316294 17.3498 1.06334 18.0809C3.92037 20.877 11.03 22.9788 12.7214 21.5274C13.3548 20.9838 13.4293 21.6059 11.4767 11.1345C10.5016 5.90574 9.65321 1.35586 9.59127 1.02365C9.41264 0.0653542 8.99659 -0.207253 8.26095 0.151944ZM23.2656 0.180619C22.3277 0.447416 20.6578 1.74101 18.3739 3.96994C16.2237 6.06852 15.4253 7.01876 14.7782 8.24938C12.54 12.506 12.9425 17.4473 15.7529 20.2148C17.0003 21.4432 18.5906 21.8916 22.0241 21.9832C25.296 22.0704 27.4934 21.6902 27.8739 20.9712C28.3217 20.1249 27.5945 19.0595 25.4096 17.3608C22.4724 15.0772 19.4499 12.3154 18.5877 11.1274C17.8407 10.0977 17.6244 9.53716 17.6166 8.60923C17.6104 7.88062 17.6382 7.75748 17.9424 7.16476C18.3517 6.36727 19.3768 5.28734 20.9094 4.0391C21.5206 3.5413 22.0422 3.1107 22.0686 3.08221C22.0949 3.05363 22.5187 2.69368 23.0102 2.2822C24.2593 1.23637 24.5375 0.713932 24.0822 0.268896C23.8766 0.0679781 23.721 0.0511099 23.2656 0.180619ZM21.4964 7.54101C20.4102 7.82627 19.7673 8.44523 19.7673 9.20561C19.7673 10.3129 21.1714 12.195 22.7326 13.1806C23.7704 13.8357 24.4481 13.6463 25.0179 12.5417C25.47 11.6653 25.7361 10.5924 25.7492 9.5932C25.7589 8.84744 25.734 8.71391 25.5342 8.44008C24.8845 7.54982 23.0327 7.13749 21.4964 7.54101ZM3.94089 9.34224C3.43653 9.65505 2.66215 10.4726 2.40671 10.962C1.62974 12.4504 2.62533 13.2399 4.69427 12.7759C6.32491 12.4103 7.06141 11.529 6.5745 10.5262C6.38119 10.128 5.57719 9.38891 5.1457 9.21273C4.66819 9.01772 4.42109 9.04433 3.94089 9.34224Z" 
                fill="currentColor" 
            />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-8 mb-16 w-full max-w-md">
        
        <div>
            <h4 className="font-bold text-sm mb-2 tracking-wide">Fakultas Seni Rupa dan Desain</h4>
            <p className="text-sm font-light leading-relaxed opacity-90">
            Jl. Ir Sutami No.36A, Jebres, Kec. Jebres,<br />
            Kota Surakarta, Jawa Tengah 57126
            </p>
        </div>

        <div className="flex items-center gap-0">
            <a 
                href="https://instagram.com/labdesainbudaya" target='_blank'
                className=" rounded-lg "
                aria-label="Instagram"
            >
                <Instagram size={64} strokeWidth={0.5} />
            </a>
            <a 
                href="mailto:labdesainbudaya@gmail.com" 
                className=" rounded-lg "
                aria-label="Email"
            >
                <Mail size={64} strokeWidth={0.5} />
            </a>
        </div>

        <a 
            href="mailto:labdesainbudaya@gmail.com" 
            className="text-sm font-light hover:underline underline-offset-4 decoration-1 opacity-80"
        >
            labdesainbudaya@gmail.com
        </a>
      </div>

      <div className="w-full mt-auto">
        <h1 className="text-5xl md:text-6xl font-thin text-white opacity-90 tracking-tight ">
            Lab Desain Budaya
        </h1>
      </div>

    </footer>
  )
}

export default Footer