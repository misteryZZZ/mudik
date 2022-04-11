export const SectionImage = () => {
  return (
    <div className="flex md:w-1/2 min-h-full relative">
      <img className="w-full h-full object-contain px-3 pb-20" src="/images/map-illustration.png" alt="ilustrasi peta mudik" />
      <div className="flex items-center w-full absolute top-10 -ml-3 md:pr-8">
        <svg width="88" height="31" viewBox="0 0 88 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 15H62" stroke="#007474" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="72.5" cy="15.5" r="12.5" fill="white" stroke="#FE852A" strokeWidth="5"/>
          <circle cx="72.5" cy="15.5" r="5.5" fill="#FE852A"/>
        </svg>
        <h1 className="text-maincolor text-7xl">17</h1>
        <p className="text-maincolor text-2xl mt-1.5">Kota<br/>Tujuan</p>
        <p className="text-maincolor text-2xl text-right grow">Mudik Gratis<br/>DKI Jakarta<br/>2022</p>
      </div>
    </div>
  )
}

export default SectionImage;