import clsxm from '@app/utils/clsxm';
import Image from 'next/legacy/image';
import { PropsWithChildren } from 'react';

type Props = {
	className?: string;
	size: number;
	imageUrl?: string;
	shape?: 'circle' | 'square';
} & PropsWithChildren;
export function Avatar({
	className,
	imageUrl,
	size,
	shape = 'circle',
	children,
}: Props) {
	return (
		<div
			className={clsxm(
				'bg-slate-400 relative',
				shape === 'circle' && ['rounded-full'],
				shape === 'square' && ['rounded-md'],
				className
			)}
			style={{ width: size, height: size }}
		>
			{imageUrl && (
				<Image
					layout="fill"
					src={imageUrl}
					className="w-full h-full"
					objectFit="cover"
				/>
			)}
			{children}
		</div>
	);
}
