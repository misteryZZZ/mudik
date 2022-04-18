export default function CardStatistic({
  title,
  penumpangMudik,
  penumpangBalik,
  motorMudik,
  motorBalik,
}) {
  return (
    <div  className="grow">
      <h1 className="text-maincolor font-semibold">{title}</h1>
      <div className="rounded-lg bg-gray-100 p-4 mb-4 last:mb-0">
        <hr className="my-px"/>
        <div className="flex items-center gap-2">
          <p className="text-xs grow text-gray-500">Penumpang Arus Mudik</p>
          <p className="text-xl font-semibold">{penumpangMudik}</p>
        </div>
        <hr className="my-px"/>
        <div className="flex items-center gap-2">
          <p className="text-xs grow text-gray-500">Penumpang Arus Balik</p>
          <p className="text-xl font-semibold">{penumpangBalik}</p>
        </div>
        <hr className="my-px"/>
        <div className="flex items-center gap-2">
          <p className="text-xs grow text-gray-500">Motor Arus Mudik</p>
          <p className="text-xl font-semibold">{motorMudik}</p>
        </div>
        <hr className="my-px"/>
        <div className="flex items-center gap-2">
          <p className="text-xs grow text-gray-500">Motor Arus Balik</p>
          <p className="text-xl font-semibold">{motorBalik}</p>
        </div>
        <hr className="my-px"/>
      </div>
    </div>
  )
}