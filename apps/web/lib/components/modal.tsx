import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, PropsWithChildren, useRef } from 'react';

type Props = {
	title?: string;
	description?: string;
	isOpen: boolean;
	closeModal: () => void;
	className?: string;
} & PropsWithChildren;

export function Modal({
	isOpen,
	closeModal,
	children,
	title,
	description,
	className,
}: Props) {
	const refDiv = useRef(null);

	return (
		<Transition
			show={isOpen}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
			as={Fragment}
		>
			<Dialog
				initialFocus={refDiv}
				onClose={closeModal}
				as="div"
				className="fixed inset-0 backdrop-brightness-90 backdrop-blur-sm z-[9999]"
			>
				<div
					ref={refDiv}
					className="absolute inset-0 flex items-center justify-center p-4"
				>
					<Dialog.Panel className={`${className} relative`}>
						{title && <Dialog.Title>{title}</Dialog.Title>}
						{description && (
							<Dialog.Description>{description}</Dialog.Description>
						)}
						<div
							onClick={() => closeModal()}
							className="absolute right-3 top-3 cursor-pointer z-50"
						>
							<Image
								src={'/assets/svg/close.svg'}
								alt="close"
								width={28}
								height={28}
							/>
						</div>
						{children}
					</Dialog.Panel>
				</div>
			</Dialog>
		</Transition>
	);
}
