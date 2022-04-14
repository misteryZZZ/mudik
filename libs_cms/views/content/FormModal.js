import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
// import { SelectWithLabel } from '../../../libs/components/select'
import { TextareaWithLabel } from '../../../libs/components/input/Textarea'
// import { FileUpload } from '../../../libs/components/fileUpload'

import { getContent, updateContent } from '../../models/contentModel'

const FormModal = ({ setShowModal, id, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    id: '',
    html: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('html', data.html);

    const response = await updateContent(id, formData);
    console.log(response);
    if (response && response.success) {
      onSuccess();
      setShowModal(false);
    } else {
      alert('Gagal menupdate content');
    }

    setLoading(false);
  }

  useEffect(() => {
    (async () => {
        const dataPre = await getContent(id)
        setData({
          id: dataPre.id,
          html: dataPre.html,
        })
    })()
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">Update Content</h1>
          <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
        </div>
        <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
          <TextareaWithLabel label="Kode HTML" value={data.html} onChange={e => setData({ ...data, html: e.target.value})} className="border-2 !text-base" rows="6"/>

          <Button text="Update" isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal