import { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@rendiriz-ecosystem/shared/components';

export type TEvidenceDialog = {
  data: any;
  showDialog: boolean;
  closeDialog: () => void;
  generateEvidence: ({
    id,
    documentTask,
  }: {
    id: string;
    documentTask: string;
  }) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export const EvidenceDialog: React.FC<TEvidenceDialog> = (props) => {
  const { data } = props;

  useEffect(() => {
    if (props.isSuccess) {
      props.closeDialog();
    }
  }, [props.isSuccess]);

  const closeDialog = () => {
    props.closeDialog();
  };

  const handleGenerate = () => {
    props.generateEvidence({
      id: data.id,
      documentTask: data.documentTask,
    });
  };

  return (
    <Transition appear show={props.showDialog} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {data && data.evidenceTask ? 'Evidence' : 'Generate Evidence'}
                </Dialog.Title>
                {data && !data.evidenceTask ? (
                  <div className="mt-4">
                    <div className="mb-4">
                      <label className="block mb-2">URL Evidence:</label>
                      <div className="wrap-line">
                        {data && data.documentTask}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Generate Evidence:</label>
                      <div className="flex items-center gap-6">
                        <Button
                          type="button"
                          onClick={handleGenerate}
                          disabled={props.isLoading}
                        >
                          {props.isLoading ? 'Loading...' : 'Generate'}
                        </Button>
                        {props.isError && <span>Error...</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    {data && (
                      <Image
                        alt={data && data.id}
                        src={data && data.evidenceTask}
                        width={1280}
                        height={720}
                      />
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EvidenceDialog;
