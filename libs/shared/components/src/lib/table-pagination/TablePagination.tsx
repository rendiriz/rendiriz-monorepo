/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Fragment, useState } from 'react';
import cn from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { HiSelector } from 'react-icons/hi';
import type { TPagination } from '@rendiriz-ecosystem/shared/types';
import { Button } from '../button/Button';

export type TPaginationTable = {
  pagination: TPagination;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
};

const perPageOption = [1, 10, 25];

export const TablePagination: React.FC<TPaginationTable> = (props) => {
  const {
    total_items,
    previous_page,
    next_page,
    total_pages,
    page_size,
    pages,
    current_page,
  } = props.pagination;

  const [selectedPerPage, setSelectedPerPage] = useState(
    perPageOption.find((value) => value === page_size),
  );
  const [selectedPage, setSelectedPage] = useState(
    pages.find((value: number) => value === current_page),
  );

  const handlePerPageChange = (perPage: number) => {
    setSelectedPerPage(perPage);
    setSelectedPage(1);
    props.handlePerPageChange(perPage);
  };

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
    props.handlePageChange(page);
  };

  return (
    <>
      <div className="flex flex-row md:flex-col lg:flex-row items-center justify-between text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
        <div className="hidden md:flex md:items-center">
          <div
            className={cn(
              'flex items-center',
              'lg:border-r lg:border-gray-200 lg:dark:border-gray-700',
            )}
          >
            <span className="px-3">Tampilkan</span>
            <div>
              <Listbox value={selectedPerPage} onChange={handlePerPageChange}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default bg-white py-3 pl-3 pr-10 text-left sm:text-sm">
                    <span className="block truncate">{selectedPerPage}</span>
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {perPageOption.map((value) => (
                        <Listbox.Option
                          key={value}
                          value={value}
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
                                {value}
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
            <span className="px-3">Item</span>
          </div>
          <div className={'pl-0 lg:pl-3 pr-3'}>dari total {total_items}</div>
        </div>
        <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto">
          <div className="flex lg:hidden">
            <div className="border-r border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="ghost"
                className="rounded-none px-4"
                disabled={previous_page! < 1}
                onClick={() => {
                  handlePageChange(previous_page!);
                }}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="flex items-center">
            <span className="px-3">Halaman</span>
            <div>
              <Listbox value={selectedPage} onChange={handlePageChange}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default bg-white py-3 pl-3 pr-10 text-left sm:text-sm">
                    <span className="block truncate">{selectedPage}</span>
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {pages.map((value: number) => (
                        <Listbox.Option
                          key={value}
                          value={value}
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
                                {value}
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
            <span className="px-3">dari {total_pages}</span>
          </div>
          <div className="flex">
            <div className="hidden lg:block border-l border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="ghost"
                className="rounded-none px-4"
                disabled={previous_page! < 1}
                onClick={() => {
                  handlePageChange(previous_page!);
                }}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
            <div className="border-l border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="ghost"
                className="rounded-none px-4"
                disabled={next_page! > total_pages!}
                onClick={() => {
                  handlePageChange(next_page!);
                }}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePagination;
