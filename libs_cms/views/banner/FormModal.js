import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { SelectWithLabel } from '../../../libs/components/select'
import { TextareaWithLabel } from '../../../libs/components/input/Textarea'
import { FileUpload } from '../../../libs/components/fileUpload'

import { createBanner, getBannerDetail, updateBanner } from '../../models/bannerModel'

const FormModal = ({ setShowModal, type, id, dataSelect, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const dataType = [
    {label: 'HTML', value: 'html'},
    {label: 'File', value: 'file'},
  ]

  const [data, setData] = useState({
    id: '',
    type: 'html',
    html: '',
    file: '-',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('type', data.type);
    if (data.type == 'html') formData.append('html', data.html);
    if (data.type == 'file') formData.append('file', file);

    if (type == 'create') {
      const response = await createBanner(formData);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat banner');
      }
    } else {
      const response = await updateBanner(id, formData);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate banner');
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (type == 'update') {
        const dataPre = await getBannerDetail(id)
        console.log(dataPre);
        setData({
          id: dataPre.id,
          type: dataPre.type,
          html: dataPre.html,
          file: dataPre.file,
        })
      }
    })()
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">{(type === 'create') ? 'Buat banner baru' : 'Update banner'}</h1>
          <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
        </div>
        <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
          <SelectWithLabel label="Type" options={dataType} selected={data.type} onChange={e => setData({...data, type: e.target.value})} className="border-2" />
          
          {data.type == 'html' && (
            <TextareaWithLabel label="Kode HTML" value={data.html} onChange={e => setData({ ...data, html: e.target.value})} className="border-2 !text-base" rows="6"/>
          )}
          {data.type == 'file' && (
            <>
              <FileUpload label="File" onChange={handleFileChange} className="!border-2"/>
              {type == 'update' && <p>Stored filename: {data.file}</p>}
            </>
          )}

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal