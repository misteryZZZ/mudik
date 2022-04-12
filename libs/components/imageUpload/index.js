export const ImageUpload = ({ onChange, preview, label, className }) => {
  return (
    <label className="block mt-4">
      <p>{label}</p>
      <input type="file" onChange={onChange} className={"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "+className}/>
      {preview &&  <img className="p-4 max-w-[300px] mx-auto" src={preview} /> }
    </label>
    )
}