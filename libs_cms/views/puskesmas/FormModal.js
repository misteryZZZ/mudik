import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { Modal } from '../../../libs/components/modal';

import { createPuskesmas, getPuskesmasDetail, updatePuskesmas } from '../../models/puskesmasModel'

const FormModal = ({ setShowModal, type, id, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    name: '',
    address: '',
    kecamatan: '',
    kabupaten: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type == 'create') {
      const response = await createPuskesmas(data);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat puskesmas');
      }
    } else {
      const response = await updatePuskesmas(id, data);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate puskesmas');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (type == 'update') {
        const dataPre = await getPuskesmasDetail(id)
        console.log(dataPre);
        setData({
          name: dataPre.name,
          address: dataPre.address,
          kecamatan: dataPre.kecamatan,
          kabupaten: dataPre.kabupaten,
          phone: dataPre.phone,
        })
      }
    })()
  }, [])

  return (
    <Modal title={(type === 'create') ? 'Buat puskesmas baru' : 'Update puskesmas'} onClose={() => setShowModal(false)}>
      <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
        <InputWithLabel required label="Nama Puskesmas" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2"/>
        <InputWithLabel required label="Alamat" value={data.address} onChange={e => setData({...data, address: e.target.value})} className="border-2"/>
        <InputWithLabel required label="Kecamatan" value={data.kecamatan} onChange={e => setData({...data, kecamatan: e.target.value})} className="border-2"/>
        <InputWithLabel required label="Kabupaten" value={data.kabupaten} onChange={e => setData({...data, kabupaten: e.target.value})} className="border-2"/>
        <InputWithLabel required label="No. Telpon" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} className="border-2"/>

        <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
      </form>
    </Modal>
  )
}

export default FormModal