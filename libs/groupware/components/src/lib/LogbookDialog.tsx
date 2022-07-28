import { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@rendiriz-ecosystem/shared/components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export type TLogbookDialog = {
  data: any;
  showDialog: boolean;
  closeDialog: () => void;
  updateLogbook: (formValues: any) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
  projectId: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  nameTask: Yup.string().required('Required'),
  tupoksiJabatanId: Yup.string().required('Required'),
  dateTask: Yup.date().required('Required'),
  dateSend: Yup.date().required('Required'),
  difficultyTask: Yup.number().required('Required'),
  documentTask: Yup.string().required('Required'),
  workPlace: Yup.string().required('Required'),
  organizerTask: Yup.string().required('Required'),
  evidenceTask: Yup.string().required('Required'),
});

export const LogbookDialog: React.FC<TLogbookDialog> = (props) => {
  const { data } = props;

  useEffect(() => {
    if (props.isSuccess) {
      props.closeDialog();
    }
  }, [props.isSuccess]);

  const closeDialog = () => {
    props.closeDialog();
  };

  const handleUpdate = (formValues: any) => {
    props.updateLogbook(formValues);
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
                  Laporan
                </Dialog.Title>
                <div className="mt-4">
                  <Formik
                    initialValues={{
                      id: data ? (data.id as string) : '',
                      projectId: data ? (data.projectId as string) : '',
                      projectName: data ? (data.projectName as string) : '',
                      nameTask: data ? (data.nameTask as string) : '',
                      tupoksiJabatanId: data
                        ? (data.tupoksiJabatanId as string)
                        : '',
                      dateTask: data
                        ? format(data.dateTask, 'yyyy-MM-dd HH:mm:ss', {
                            locale: id,
                          })
                        : '',
                      dateSend: data
                        ? format(data.dateTask, 'yyyy-MM-dd HH:mm:ss', {
                            locale: id,
                          })
                        : '',
                      difficultyTask: data
                        ? (data.difficultyTask as number)
                        : '',
                      documentTask: data ? (data.documentTask as string) : '',
                      workPlace: data ? (data.workPlace as string) : '',
                      organizerTask: data ? (data.organizerTask as string) : '',
                      evidenceTask: data ? (data.evidenceTask as string) : '',
                    }}
                    validationSchema={DisplayingErrorMessagesSchema}
                    onSubmit={(values) => {
                      handleUpdate(values);
                    }}
                  >
                    {({ setFieldValue, errors, touched }) => (
                      <Form>
                        <div className="mb-4">
                          <label className="block mb-2">ID:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ID"
                            name="id"
                          />
                          {touched.id && errors.id && (
                            <div className="text-red-500 text-sm">
                              {errors.id}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Project ID:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Project ID"
                            name="projectId"
                          />
                          {touched.projectId && errors.projectId && (
                            <div className="text-red-500 text-sm">
                              {errors.projectId}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Project Name:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Project Name"
                            name="projectName"
                          />
                          {touched.projectName && errors.projectName && (
                            <div className="text-red-500 text-sm">
                              {errors.projectName}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Name Task:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Name Task"
                            name="nameTask"
                          />
                          {touched.nameTask && errors.nameTask && (
                            <div className="text-red-500 text-sm">
                              {errors.nameTask}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">
                            Tupoksi Jabatan ID:
                          </label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Tupoksi Jabatan ID"
                            name="tupoksiJabatanId"
                          />
                          {touched.tupoksiJabatanId &&
                            errors.tupoksiJabatanId && (
                              <div className="text-red-500 text-sm">
                                {errors.tupoksiJabatanId}
                              </div>
                            )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Date Task:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Date Task"
                            name="dateTask"
                          />
                          {touched.dateTask && errors.dateTask && (
                            <div className="text-red-500 text-sm">
                              {errors.dateTask}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Date Send:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Date Send"
                            name="dateSend"
                          />
                          {touched.dateSend && errors.dateSend && (
                            <div className="text-red-500 text-sm">
                              {errors.dateSend}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Difficulty Task:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Difficulty Task"
                            name="difficultyTask"
                          />
                          {touched.difficultyTask && errors.difficultyTask && (
                            <div className="text-red-500 text-sm">
                              {errors.difficultyTask}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Evidence Task:</label>
                          {data && (
                            <>
                              <Image
                                alt={data && data.id}
                                src={data && data.evidenceTask}
                                width={1280}
                                height={720}
                              />
                              <Field
                                className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Evidence Task"
                                name="evidenceTask"
                              />
                            </>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Document Task:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Document Task"
                            name="documentTask"
                          />
                          {touched.documentTask && errors.documentTask && (
                            <div className="text-red-500 text-sm">
                              {errors.documentTask}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Work Place:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Work Place"
                            name="workPlace"
                          />
                          {touched.workPlace && errors.workPlace && (
                            <div className="text-red-500 text-sm">
                              {errors.workPlace}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Organizer Task:</label>
                          <Field
                            className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Organizer Task"
                            name="organizerTask"
                          />
                          {touched.organizerTask && errors.organizerTask && (
                            <div className="text-red-500 text-sm">
                              {errors.organizerTask}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-6">
                          <Button type="submit" disabled={props.isLoading}>
                            {props.isLoading ? 'Loading...' : 'Kirim'}
                          </Button>
                          {props.isError && <span>Error...</span>}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LogbookDialog;
