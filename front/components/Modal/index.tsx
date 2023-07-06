"use client";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useModal } from "@/store/modal";
import { PhotoIcon } from "@heroicons/react/24/solid";

const Modal = (): JSX.Element => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { isOpen, closeModal } = useModal();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" className="relative z-10" onClose={closeModal}>
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
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 pb-2"
                >
                  Add note
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter a note here..."
                    className="w-full border border-gray-300 rounded-md p-5"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Upload image
                  </button>
                  {/* image preview */}
                  <input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={(e) => {
                      if (!e.target.files[0].type.startsWith("image/")) return;
                      //   setImage(e.target.files[0]);
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
