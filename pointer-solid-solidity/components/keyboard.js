/* eslint-disable @next/next/no-img-element */
const KEYBOARD_KINDS = ['sixty-percent', 'seventy-five-percent', 'eighty-percent', 'iso-105' ]

const Keyboard = ({kind, isPBT, filter})=> {

  const kindDir = KEYBOARD_KINDS[kind]
  const fileName = isPBT ? 'PBT' : 'ABS'

  const imagePath = `keyboards/${kindDir}/${fileName}.png`;
  const alt = `${kindDir} keyboard with ${isPBT? "PBT" : "ABS"} keys ${filter? `with ${filter}` : ""}`;

  return (
    <div className="rounded-lg p-2 border border-white">
      <img className={"h-[230px] w-[360px] " + filter} src={imagePath} alt={alt} />
    </div>
  )}

  export default Keyboard