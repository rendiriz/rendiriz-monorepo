import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { trpc } from '../utils/trpc';
import { Container } from '@rendiriz-ecosystem/groupware/components';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function HomePage() {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);

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

  const { isLoading, isError, error, data, isPreviousData } = trpc.useQuery(
    [
      'logbook.getAll',
      {
        page: page,
      },
    ],
    {
      keepPreviousData: true,
    },
  );

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
            <div className="overflow-x-auto relative mt-6">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6 w-[10%]">
                      Tanggal
                    </th>
                    <th scope="col" className="py-3 px-6 w-[20%]">
                      Project
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Task
                    </th>
                    <th scope="col" className="py-3 px-6 w-[10%]">
                      Status Kirim
                    </th>
                    <th scope="col" className="py-3 px-6 w-[10%]">
                      Tanggal Kirim
                    </th>
                    <th scope="col" className="py-3 px-6 w-[10%]">
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
                      <td className="py-4 px-6">
                        {format(res.dateTask, 'MMMM dd, yyyy', { locale: id })}
                      </td>
                      <td className="py-4 px-6">{res.projectName}</td>
                      <td className="py-4 px-6">{res.nameTask}</td>
                      <td className="py-4 px-6">
                        {res.isStatus === 'draft' ? (
                          <span className="text-red-500">Draft</span>
                        ) : (
                          <span className="text-green-500">Terkirim</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {res.dateSend
                          ? format(res.dateSend, 'MMMM dd, yyyy', {
                              locale: id,
                            })
                          : '-'}
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav
                className="flex justify-end items-center pt-4"
                aria-label="Table navigation"
              >
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <button
                      className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => setPage((old) => Math.max(old - 1, 0))}
                      disabled={page === 0}
                    >
                      <span className="sr-only">Previous</span>
                      Sebelumnya
                    </button>
                  </li>
                  <li>
                    <button
                      className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => {
                        if (!isPreviousData && data.hasMore) {
                          setPage((old) => old + 1);
                        }
                      }}
                      disabled={isPreviousData || !data?.hasMore}
                    >
                      <span className="sr-only">Next</span>
                      Selanjutnya
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
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

export default HomePage;
