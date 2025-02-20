import React from 'react';


function CustomCard({ front,back,isFlipped, textColor, logo, companyName, name, subtitle, QRCodeCanvas,home }) {
  console.log(back)
  return (
    <div
    className={`relative h-48 rounded-lg shadow-lg border p-4 perspective-1000 ${home ? 'w-100' : 'w-80'}`}
      style={{ backgroundImage: `url(${home ? "https://unifeed.s3.ap-south-1.amazonaws.com/" + front : front})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        className={`absolute inset-0 flex flex-col justify-between p-6 ${isFlipped ? 'hidden' : 'block'}`}
        style={{
          color: textColor,
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex items-center gap-3">
        {
    home
      ? (logo && <img src={`https://unifeed.s3.ap-south-1.amazonaws.com/${logo}`} alt="Logo" className="w-14 h-14" />)
      : (logo && <img src={logo} alt="Logo" className="w-14 h-14" />)
      }
          {companyName && <h3 className="text-lg font-bold">{companyName}</h3>}
        </div>
        <div className="absolute bottom-6">
          <h3 className="text-lg font-bold">{name || 'Your Name'}</h3>
          <p className="text-sm">{subtitle || 'Subtitle'}</p>
        </div>
      </div>

      
      <div
        className={`absolute inset-0 rounded-lg flex justify-center items-center font-bold ${isFlipped ? 'block' : 'hidden'}`}
        style={{
          color: textColor,
          transform: 'rotateY(180deg)',
          backgroundImage: `url(${home ? "https://unifeed.s3.ap-south-1.amazonaws.com/" + back : back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <QRCodeCanvas
            value="https://examples.com"
            size={80}
            className="self-center"
            fgColor={textColor}
            bgColor="transparent" 
            />
      </div>
    </div>
  );
}

export default CustomCard;