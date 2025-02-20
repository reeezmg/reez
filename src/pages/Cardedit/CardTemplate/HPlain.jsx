import React from 'react'

function HPlain({isFlipped,textColor,bgColor,logo,companyName,name,subtitle,QRCodeCanvas,home}) {
  return (
    <div  className={`relative h-48 rounded-lg shadow-lg border p-4 perspective-1000 ${home ? 'w-100' : 'w-80'}`}
    style={{ backgroundColor: bgColor }}
    >
    <div
    className={`absolute inset-0 flex flex-col justify-between p-4 ${
      isFlipped ? "hidden" : "block"
    }`}
    style={{
      color: textColor,
      backfaceVisibility: "hidden",
    }}
  >
    <div className=" flex items-center gap-3">
    {
    home
      ? (logo && <img src={`https://unifeed.s3.ap-south-1.amazonaws.com/${logo}`} alt="Logo" className="w-14 h-14" />)
      : (logo && <img src={logo} alt="Logo" className="w-14 h-14" />)
      }

    {companyName &&  <h3 className="text-lg font-bold">{companyName}</h3> }
    </div>
    <div className="absolute bottom-4">
      <h3 className="text-lg font-bold">{name || "Your Name"}</h3>
      <p className="text-sm">{subtitle || "Subtitle"}</p>
    </div>
  </div>

  <div
    className={`absolute inset-0 flex justify-center items-center font-bold ${
      isFlipped ? "block" : "hidden"
    }`}
    style={{
      color: textColor,
      transform: "rotateY(180deg)",
    }}
  >
    <QRCodeCanvas
      value={'http://tapster.shop/response/hameed'}
      size={80}
      className="self-center"
      bgColor={bgColor}
      fgColor={textColor}
    />
    <p className="absolute bottom-2 right-2 text-[10px]"
     style={{
      color: textColor,
    }}
    >Tapster.shop</p>
  </div>
  </div>
  )
}

export default HPlain
