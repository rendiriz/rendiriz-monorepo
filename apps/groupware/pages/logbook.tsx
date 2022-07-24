import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { trpc } from '../utils/trpc';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Container } from '@rendiriz-ecosystem/groupware/components';
import { TPaginationTableFilter } from '@rendiriz-ecosystem/shared/types';
import {
  TablePagination,
  useTablePagination,
} from '@rendiriz-ecosystem/shared/components';

const paginationState: TPaginationTableFilter = { perPage: 1, page: 1 };

export function LogbookPage() {
  const { data: session } = useSession();
  const { state, dispatch } = useTablePagination(paginationState);

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
            <>
              <div className="overflow-x-auto relative mt-6">
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
                        <td className="py-4 px-3">
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
