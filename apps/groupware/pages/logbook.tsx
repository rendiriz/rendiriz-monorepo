import { Fragment, useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { trpc } from '../utils/trpc';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  Container,
  EvidenceDialog,
} from '@rendiriz-ecosystem/groupware/components';
import { TPaginationTableFilter } from '@rendiriz-ecosystem/shared/types';
import {
  TablePagination,
  useTablePagination,
  Button,
} from '@rendiriz-ecosystem/shared/components';
import { Listbox, Transition } from '@headlessui/react';
import { HiSelector, HiCheckCircle, HiXCircle } from 'react-icons/hi';

type TProject = {
  id: string;
  name: string;
  repo: string;
} | null;

const projectOption = new Map<string, TProject>([
  [
    '60170024fe6713001d100000',
    {
      id: '60170024fe6713001d100000',
      name: 'Next On-Demand ISR',
      repo: 'next-isr',
    },
  ],
  [
    '60170024fe6713001d160167',
    {
      id: '60170024fe6713001d160167',
      name: 'Satu Data Jawa Barat',
      repo: 'satudata-frontend',
    },
  ],
  [
    '602b9477621200001db91977',
    {
      id: '602b9477621200001db91977',
      name: 'Portal Data Jabar',
      repo: 'replikasi-pdj-frontend',
    },
  ],
]);

const paginationState: TPaginationTableFilter = { perPage: 10, page: 1 };

export function LogbookPage() {
  const { data: session } = useSession();
  const { state, dispatch } = useTablePagination(paginationState);
  const [bearer, setBearer] = useState<string | null>(null);
  const [project, setProject] = useState<string | null>(null);
  const inputBearer = useRef<HTMLInputElement>(null);
  const [isOpenEvidence, setOpenEvidence] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  if (typeof window === 'undefined') return null;

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">
          Access Denied
        </h1>
      </div>
    );
  }

  const { isLoading, isError, error, data } = trpc.useQuery(
    [
      'logbook.getAll',
      {
        perPage: state.perPage,
        page: state.page,
        project: project,
      },
    ],
    {
      keepPreviousData: true,
    },
  );
  const mutationGenerate = trpc.useMutation(['logbook.generateEvidence']);

  const handleBearer = () => {
    setBearer(inputBearer.current?.value || null);
  };

  const handleProject = (id: string) => {
    setProject(id);
  };

  const showDialogEvidence = (data: any) => {
    setSelectedData(data);
    setOpenEvidence(true);
  };

  const closeDialogEvidence = () => {
    setSelectedData(null);
    setOpenEvidence(false);
  };

  const generateEvidence = async ({
    id,
    documentTask,
  }: {
    id: string;
    documentTask: string;
  }) => {
    mutationGenerate.mutate({
      id,
      documentTask,
    });
  };

  return (
    <Container>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">Laporan</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data && (
            <>
              <div className="mt-6">
                <label htmlFor="bearer" className="sr-only">
                  Bearer
                </label>
                <div className="relative flex justify-between mb-4">
                  <input
                    ref={inputBearer}
                    type="text"
                    id="bearer"
                    className="block px-3 py-2 mr-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Bearer Token Groupware"
                  />
                  <Button type="button" onClick={() => handleBearer()}>
                    Set
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <Listbox value={project} onChange={handleProject}>
                      <div className="relative">
                        <Listbox.Button className="relative w-96 rounded-lg border border-gray-300 cursor-default bg-white py-2 pl-3 pr-10 text-left sm:text-sm">
                          {project ? (
                            <span className="block truncate">
                              {projectOption.get(project)?.name}
                            </span>
                          ) : (
                            <span className="block truncate text-gray-400">
                              Pilih Project
                            </span>
                          )}
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiSelector
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {[...projectOption].map(([key, res]) => (
                              <Listbox.Option
                                key={key}
                                value={res?.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 px-4 ${
                                    active
                                      ? 'bg-sky-100 text-sky-900'
                                      : 'text-gray-800'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {res?.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto relative mt-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                  <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-3 w-[10%]">
                        Tanggal
                      </th>
                      <th scope="col" className="py-3 px-3 w-[20%]">
                        Project
                      </th>
                      <th scope="col" className="py-3 px-3">
                        Task
                      </th>
                      <th scope="col" className="py-3 px-3 w-[10%]">
                        Status Kirim
                      </th>
                      <th scope="col" className="py-3 px-3 w-[10%]">
                        Tanggal Kirim
                      </th>
                      <th scope="col" className="py-3 px-3 w-[10%]">
                        Evidence
                      </th>
                      <th scope="col" className="py-3 px-3 w-[10%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.logbooks.map((res) => (
                      <tr
                        key={res.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="py-4 px-3">
                          {format(res.dateTask, 'MMMM dd, yyyy', {
                            locale: id,
                          })}
                        </td>
                        <td className="py-4 px-3">{res.projectName}</td>
                        <td className="py-4 px-3">{res.nameTask}</td>
                        <td className="py-4 px-3">
                          {res.isStatus === 'draft' ? (
                            <span className="text-red-500">Draft</span>
                          ) : (
                            <span className="text-green-500">Terkirim</span>
                          )}
                        </td>
                        <td className="py-4 px-3">
                          {res.dateSend
                            ? format(res.dateSend, 'MMMM dd, yyyy', {
                                locale: id,
                              })
                            : '-'}
                        </td>
                        <td className="py-4 px-3 flex gap-2">
                          {res.evidenceTask ? (
                            <HiCheckCircle
                              className="h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <HiXCircle
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          )}
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => showDialogEvidence(res)}
                          >
                            Evidence
                          </Button>
                          <EvidenceDialog
                            data={selectedData}
                            showDialog={isOpenEvidence}
                            closeDialog={() => closeDialogEvidence()}
                            generateEvidence={(res) => generateEvidence(res)}
                            isLoading={mutationGenerate.isLoading}
                            isError={mutationGenerate.isError}
                            isSuccess={mutationGenerate.isSuccess}
                          />
                        </td>
                        <td className="py-4 px-3">
                          <Button type="button" variant="link">
                            Kirim
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!data.pagination.empty && (
                <TablePagination
                  pagination={data.pagination}
                  handlePerPageChange={(perPage) =>
                    dispatch({ type: 'perPage', payload: { perPage } })
                  }
                  handlePageChange={(page) =>
                    dispatch({ type: 'page', payload: { page } })
                  }
                />
              )}
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
      ),
    },
  };
};

export default LogbookPage;
