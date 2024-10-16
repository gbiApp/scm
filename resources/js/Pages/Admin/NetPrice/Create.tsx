import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import AsnycSelect from 'react-select/async';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IMaterialNetPrice } from '@/types';
import Select from 'react-select';

export default function Create({ p_plants }) {
  const [showModal, setShowModal] = useState(false);
  const [altUom, setAltUom] = useState([]);

  const { data, setData, post, processing, reset, errors } = useForm<IMaterialNetPrice>({
    vendor: '',
    plant: '',
    mat_code: '',
    currency: 'PHP',
    price: 0,
    per_unit: 0,
    uom: '',
    valid_from: new Date().toLocaleDateString(),
    valid_to: new Date('9999-12-31').toLocaleDateString(),
    min_order_qty: 0,
  });

  const createNetPrice: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('net_price.store'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      //   onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setShowModal(false);

    reset();
  };

  const fetchVendor = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await window.axios.get(route('vendor.search', { search: inputValue }));
      return response.data.data.map((item) => ({
        value: item.supplier,
        label: `${item.supplier} - ${item.name_1}`,
      }));
    } catch (e) {
      console.log('Error fetching data:', e);
      return [];
    }
  };

  const fetchMaterial = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await window.axios.get(route('material.search', { search: inputValue }));

      return response.data.data.map((item) => ({
        value: item.mat_code,
        label: `${item.mat_code} - ${item.mat_desc}`,
      }));
    } catch (e) {
      console.log('Error fetching data:', e);
      return [];
    }
  };

  const fetchAltUom = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await window.axios.get(route('uom.search', { search: inputValue }));
      console.log(response.data.data);

      const m_altuom = response.data.data.map((item) => ({ value: item.alt_uom, label: item.alt_uom }));

      setAltUom(m_altuom);
    } catch (e) {
      console.log('Error fetching data:', e);
      // return [];
    }
  };

  return (
    <section className={`space-y-6`}>
      <Button onClick={() => setShowModal(true)}>Add</Button>

      <Modal show={showModal} onClose={closeModal} maxWidth="lg">
        <form onSubmit={createNetPrice}>
          <div className="m-2">
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="vendor">
                Vendor
              </Label>
              <AsnycSelect
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchVendor}
                value={data.vendorChoice}
                onChange={(option: any) => setData({ ...data, vendor: option?.value, vendorChoice: option })}
                placeholder="Select Vendor"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="plant">
                Plant
              </Label>
              <Select
                id="plant"
                className="m-2 w-full border-gray-500"
                value={data.plantChoice}
                options={p_plants}
                onChange={(option: any) => setData({ ...data, plant: option?.value, plantChoice: option })}
                placeholder="Select Plant"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="material">
                Material
              </Label>
              <AsnycSelect
                className="m-2 w-full border-gray-500"
                cacheOptions
                defaultOptions
                loadOptions={fetchMaterial}
                value={data.mat_codeChoice}
                onChange={(option: any) => {
                  setData({ ...data, mat_code: option?.value, mat_codeChoice: option });
                  fetchAltUom(option?.value);
                }}
                placeholder="Select Material"
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="uom">
                Unit of Measure
              </Label>
              <Select
                id="uom"
                className="m-2 w-full border-gray-500"
                value={data.uomChoice}
                options={altUom}
                onChange={(option: any) => setData({ ...data, uom: option?.value, uomChoice: option })}
                placeholder="Select UOM"
                required={true}
              />
            </div>

            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="currency">
                Currency
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="text"
                id="currency"
                defaultValue={data.currency}
                onChange={(e) => setData('currency', e.target.value)}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="price">
                Price
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="price"
                onChange={(e) => setData('price', parseFloat(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="price">
                Per Unit
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="price"
                onChange={(e) => setData('per_unit', parseFloat(e.target.value))}
                required={true}
              />
            </div>
            <div className="flex ">
              <Label className="p-3 w-3/12 text-sm content-center text-right" htmlFor="validFrom">
                Min Order Qty
              </Label>
              <Input
                className="m-2 w-full border-gray-300 h-10 "
                type="number"
                id="minOrderQty"
                onChange={(e) => setData('min_order_qty', parseFloat(e.target.value))}
                required={true}
              />
            </div>

            <div className="flex ">
              <Label className="p-3 w-1/5 text-sm content-center text-right" htmlFor="validFrom">
                Valid From
              </Label>
              <Input
                className="m-2 w-4/12 border-gray-300 h-10 "
                type="date"
                id="validFrom"
                defaultValue={data.valid_from}
                onChange={(e) => setData('valid_from', e.target.value)}
                required={true}
              />
            </div>

            <div className="flex ">
              <Label className="p-3 w-1/5 text-sm content-center text-right" htmlFor="validTo">
                Valid To
              </Label>
              <Input
                className="m-2 w-4/12 border-gray-300 h-10 "
                type="date"
                id="validTo"
                defaultValue={data.valid_to}
                onChange={(e) => setData('valid_to', e.target.value)}
                required={true}
              />
            </div>

            <div className="grid justify-items-center m-3">
              <Button
                variant="outline"
                disabled={processing}
                className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
}
