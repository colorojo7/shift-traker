import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


//SHIFT BUTTONS

export function CreateShiftBtn() {
  return (
    <Link
      href="/shiftForm"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-lg font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className=" md:block">Create Shift</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateShiftBtn({ id }) {
  return (
    <Link
      href={`/shiftForm/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilSquareIcon className="w-5 text-blue-500" />
    </Link>
  );
}

export function DeleteShiftBtn({ id }) {
//  importar funcion de delete y pasarsela el form
  return (
    <form >
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-red-500" />
      </button>
    </form>
  );
}