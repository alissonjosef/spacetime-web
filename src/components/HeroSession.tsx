import Image from 'next/image'
import nlwLogo from '../assets/logo-nlw.svg'

export function HeroSession() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="NLW SpaceTime" />
      <div className="spacey-1 max-w-[420px]">
        <h1 className=" text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <a
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        href=""
      >
        CADASTRAR LEMBRANçA
      </a>
    </div>
  )
}
