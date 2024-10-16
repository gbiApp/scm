import { useRef, useState, FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

import { ButtonProps, Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Head, router, useForm, Link } from '@inertiajs/react';

export default function Discard({ p_id, p_title, p_url , p_disable = false,  }: { p_id?: number, p_title: string, p_url: string , p_disable?: boolean }) {
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  // const { data, setData, post, processing, reset, errors } = useForm({
  //   pr_number: p_pr_number,
  // });

  const confirmUserDiscard = () => {
    setConfirmDiscard(true);
  };

  // const approvePr: FormEventHandler = (e) => {
  //   e.preventDefault();

  //   post(route('pr.discard'), {
  //     preserveScroll: true,
  //     onSuccess: () => closeModal(),
  //   });
  // };

  const closeModal = () => {
    setConfirmDiscard(false);
  };

  return (
    <>
      <Button onClick={confirmUserDiscard} variant="outline" type="button" disabled={p_disable} className='disabled:opacity-100 disabled:bg-gray-100'>
        Discard
      </Button>

      <Modal show={confirmDiscard} onClose={closeModal}  maxWidth='sm' >
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
           {p_title}
          </h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal} className='mx-5'>No</SecondaryButton>

            {/* <PrimaryButton className="ms-3" disabled={processing}>
              Discard
            </PrimaryButton> */}

            <Link
              preserveScroll
              href={route(p_url, p_id)}
              as="button"
              type="button"
              className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
              Yes
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
